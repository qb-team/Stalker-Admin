import {Component, OnInit, Predicate} from '@angular/core';
import {
  AdministratorService,
  Organization,
  OrganizationAuthenticationServerInformation,
  Permission
} from '../../../index';
import {AdministratorOrganizationDataService} from '../../services/AdministratorOrganizationData.service';
import {AdministratorPermissionDataService} from '../../services/AdministratorPermissionData.service';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {stringify} from "querystring";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LdapService} from "../../services/ldap.service";


export enum permissionLevel {
  Visualizzatore,
  Gestore,
  Proprietario
}

@Component({
  selector: 'app-manage-administrators-content.component.ts',
  templateUrl: './administrator-management.component.html',
  styleUrls: ['./administrator-management.component.css']
})


// this component is exclusively visible to the owner administrator
export class AdministratorManagementComponent implements OnInit {
  /*
  * A collection of the permissions of the administrators of the current organization
   */
  private permissions: Array<Permission>;

  private _dataHasArrived = false;

  private permissionLevel: permissionLevel;

  /*
  * A collection of the permissions to be modified
   */
  private permissionModifications: Array<Permission> = new Array<Permission>();

  permissionModificationsTableText: string[];

  private currentOrganization: Organization;


  // ldap
  private Submitted = false;
  isLoggedIn: boolean;
  contactForm: FormGroup;
  incorrectCredentials = false;
  private username: string;
  private password: string;
  private ldapUsers: Array<OrganizationAuthenticationServerInformation>;

  constructor(private ads: AdministratorOrganizationDataService, private as: AdministratorService, private ldapS: LdapService) { }

  ngOnInit(): void {
    this.subscribeToOrganization();
    this.setupLoginForm();
  }

  subscribeToOrganization() {
    this.ads.getOrganization.subscribe((o: Organization) => {
        if (o !== undefined) {
          this.currentOrganization = o;
          this.subscribeToAdministratorPermissions();
          this._dataHasArrived = false;
          // ldap begin
          if (this.currentOrganization.trackingMode === 'authenticated') {
            this.ldapS.clearUsersToGet();
            this.ldapS.isAdminLoggedInLdap.subscribe(b => {
              this.isLoggedIn = b;
              if (this.isLoggedIn) {
                this.ldapS.getUsersInstances.subscribe((us: Array<OrganizationAuthenticationServerInformation>) => this.ldapUsers = us);
              }
            });
          }
          // ldap end
        }
    });
  }

  // login section
  loginLDAP() {
    this.ldapS.setCredentials(this.username, this.password);
    this.ldapS.addUserToGet('*');
    this.ldapS.getUsersLdap(this.currentOrganization.id).subscribe((info: Array<OrganizationAuthenticationServerInformation>) => {
      if (info === undefined || info === null || info.length === 0) {
        this.incorrectCredentials = true;
      } else {
        this.ldapUsers = info;
        this.incorrectCredentials = false;
        this.ldapS.isAdminLoggedInLdap.next(true);
        this.ldapS.getUsersInstances.next(this.ldapUsers);
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 500) {
        this.incorrectCredentials = true;
      }
    });
  }

  onSubmit(): void {
    this.Submitted = true;
  }

  get submitted(): boolean {
    return this.Submitted;
  }

  set submitted(value: boolean) {
    this.Submitted = value;
  }


  get getUsername(): string {
    return this.username;
  }

  set setUsername(value: string) {
    this.username = value;
  }

  get getPassword(): string {
    return this.password;
  }

  set setPassword(value: string) {
    this.password = value;
  }

  private setupLoginForm() {
    this.contactForm = new FormGroup({
      username: new FormControl(this.username, [
        Validators.required
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(5)
      ]),
    });
  }

  get getLdapUsers() {
    return this.ldapUsers;
  }
  // end login section

  subscribeToAdministratorPermissions() {
    this.as.getAdministratorListOfOrganization(this.currentOrganization.id).subscribe((permArr: Array<Permission>) => {
      permArr.splice(permArr.findIndex(org => org.administratorId === localStorage.getItem('uid')), 1);
      this.permissions = permArr;
      this.permissionModifications = new Array<Permission>();
      this.permissionModificationsTableText = new Array<string>(this.permissions.length);
      this._dataHasArrived = true;
    });
  }

  /*
  * Adds a permission with the new administrator's priviledge level to permissionModifications.
  * If permissionModifications already conains a modification for that administrator, the old one will be replaced with the new one of this method
   */
  addPermissionModificationInstance(click: any, newPriviledge: number): void {
    const adminId = click.target.parentNode.id;
    const idx = this.permissions.findIndex(p => p.administratorId === adminId);
    const email = this.permissions[idx].mail;
    if (typeof adminId === typeof 'string' && newPriviledge !== this.getPermissionTierOf(adminId)) {
      if (this.alreadyModified(adminId) === -1) {
        const p: Permission = {
          administratorId: adminId,
          mail: email,
          organizationId: this.currentOrganization.id,
          permission: newPriviledge,
          nominatedBy: localStorage.getItem('uid')
        };
        this.permissionModifications.push(p);
      } else {
        this.permissionModifications[this.permissionModifications.findIndex((p: Permission) => p.administratorId === adminId)].permission = newPriviledge;
      }
    }
  }

  updateModifiedPermissionOnTable(ind: number, perm: string) {
    this.permissionModificationsTableText[ind] = perm;
  }

  getNameOfLdapUser(ldapID: string) {
    const userIdx = this.ldapUsers.findIndex((us) => us.orgAuthServerId === ldapID);
    return this.ldapUsers[userIdx].surname + ' ' + this.ldapUsers[userIdx].name;
  }

  /*
  * Compares the permissions from the permissionModifications with the ones from permissions. The permissions of administrators that has recieved new priviledges
  * will replace the old ones in permissions using modifyPriviledgesOf(adminId, newPriviledgeLevel)
   */
  public updatePermissionList(): void {
    if(this.permissionModifications.length !== 0) {
      this.sortModificationList();
      let it1 = 0;
      let it2 = 0;
      while (it1 < this.permissions.length && it2 < this.permissionModifications.length) {
        if (this.permissions[it1].administratorId > this.permissionModifications[it2].administratorId) {
          it2++;
        } else if (this.permissions[it1].administratorId < this.permissionModifications[it2].administratorId) {
          it1++;
        } else {
          this.permissions[it1].permission = this.permissionModifications[it2].permission;
          this.as.updateAdministratorPermission(this.permissions[it1]).subscribe(() => {}, (err: HttpErrorResponse) => {
            alert(err.message);
          });
          it1++;
          it2++;
        }
      }
      this.permissionModifications = new Array<Permission>();
      this.permissionModificationsTableText = new Array<string>(this.permissions.length);
    }
  }

  public eraseModificationList() {
    this.permissionModifications = new Array<Permission>();
    this.permissionModificationsTableText = new Array<string>(this.permissions.length);
  }

  private sortModificationList() {
    this.permissionModifications.sort((p1: Permission, p2: Permission) => {
      if (p1.administratorId > p2.administratorId) {
        return 1;
      }
      if (p1.administratorId < p2.administratorId) {
        return -1;
      }
      return 0;
    });
  }

  removeAdministrator(email: string) {
    if (confirm('Sei sicuro di voler rimuovere l\'amministratore associato a ' + email + '?')) {
      const mailPredicate = p => p.mail === email;
      const index = this.permissions.findIndex(mailPredicate);
      this.as.unbindAdministratorFromOrganization(this.permissions[index]).subscribe();
      this.permissions.splice(index, 1);
      this.permissionModificationsTableText.splice(index, 1);
      const indexMod = this.permissionModifications.findIndex(mailPredicate);
      if (indexMod !== -1) {
        this.permissionModifications.splice(indexMod, 1);
      }
    }
  }

  get getPermissions() {
    return this.permissions;
  }

  get getPermissionModifications() {
    return this.permissionModifications;
  }

  get getCurrentOrganization() {
    return this.currentOrganization;
  }

  getPermissionLevelNoun(permission: number) {
    return permissionLevel[permission - 1]; // we subtract 1 as the permission levels goes from 1 to 3, but in the enum they goes from 0 to 2
  }

  private getPermissionTierOf(adminId: string) {
    if (this.permissions.length > 0) {
      const foundIdx = this.permissions.findIndex((p: Permission) => p.administratorId === adminId);
      if (foundIdx !== -1) {
        return this.permissions[foundIdx].permission;
      }
    }
  }


  /*
  * returns the index of the admin modification instance or -1 if the admin has not been modified yet
   */
  private alreadyModified(adminId: string) {
    return this.permissionModifications.findIndex((p: Permission) => p.administratorId === adminId);
  }

  canDeactivate() {
    if (this.permissionModifications.length > 0) {
      return confirm('Uscendo dalla pagina attuale le modifiche verranno perse. Continuare?');
    } else {
      return true;
    }
  }

  get dataHasArrived() {
    return this._dataHasArrived;
  }
}
