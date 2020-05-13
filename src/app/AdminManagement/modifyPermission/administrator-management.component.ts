import { Component, OnInit } from '@angular/core';
import {AdministratorService, Organization, Permission} from '../../../index';
import {AdministratorOrganizationDataService} from '../../services/AdministratorOrganizationData.service';
import {AdministratorPermissionDataService} from '../../services/AdministratorPermissionData.service';


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

  constructor(private ads: AdministratorOrganizationDataService, private as: AdministratorService) { }

  ngOnInit(): void {
    this.subscribeToOrganziation();
  }

  subscribeToOrganziation() {
    this.ads.getOrganization.subscribe((o: Organization) => {
      if (o !== undefined) {
        this.currentOrganization = o;
        this.subscribeToAdministratorPermissions();
        this._dataHasArrived = false;
      }
    });
  }

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
    if (newPriviledge !== this.getPermissionTierOf(adminId)) {
      if (this.alreadyModified(adminId) === -1) {
        const p: Permission = {
          administratorId: adminId,
          organizationId: this.currentOrganization.id,
          /*Administrator unique identifier from the authentication server of the organization.
          orgAuthServerId?: string;*/
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

  /*
  * Compares the permissions from the permissionModifications with the ones from permissions. The permissions of administrators that has recieved new priviledges
  * will replace the old ones in permissions using modifyPriviledgesOf(adminId, newPriviledgeLevel)
   */
  public updatePermissionList(): void {
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
        this.as.updateAdministratorPermission(this.permissions[it1]).subscribe();
        it1++;
        it2++;
      }
    }
    this.permissionModifications = new Array<Permission>();
    this.permissionModificationsTableText = new Array<string>(this.permissions.length);
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
    return this.permissions[this.permissions.findIndex((p: Permission) => p.administratorId === adminId)].permission;
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
