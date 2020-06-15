import { Component, OnInit } from '@angular/core';
import {
  AdministratorBindingRequest,
  AdministratorService,
  Organization,
  OrganizationAuthenticationServerInformation
} from '../../..';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratorOrganizationDataService} from '../../services/AdministratorOrganizationData.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LdapService} from "../../services/ldap.service";

@Component({
  selector: 'app-bind-administrator',
  templateUrl: './bind-administrator.component.html',
  styleUrls: ['./bind-administrator.component.css']
})
export class BindAdministratorComponent implements OnInit {

  private currentOrganization: Organization;
  private adminEmail: string;
  private adminPermissions: number;
  private selectedPriviledges: string;
  private adminForm: FormGroup;
  newAdminLdapId = null;
  newAdminLdapNameStr = '';

  // ldap
  private Submitted = false;
  isLoggedIn: boolean;
  contactForm: FormGroup;
  incorrectCredentials = false;
  private username: string;
  private password: string;
  private ldapUsers: Array<OrganizationAuthenticationServerInformation>;

  constructor(private as: AdministratorService, private aods: AdministratorOrganizationDataService, private ldapS: LdapService) { }

  ngOnInit(): void {
    this.subscribeToOrganization();
    this.setupLoginForm();
    this.setupAdminForm();
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

  setNewAdminLdapId(index: number) {
    this.newAdminLdapId = this.ldapUsers[index].orgAuthServerId;
    this.newAdminLdapNameStr = this.ldapUsers[index].name + ' ' + this.ldapUsers[index].surname;
  }

  subscribeToOrganization() {
    this.aods.getOrganization.subscribe((o: Organization) => {
      this.currentOrganization = o;
      // ldap begin
      if (this.currentOrganization && this.currentOrganization.trackingMode === 'authenticated') {
        this.ldapS.clearUsersToGet();
        this.ldapS.isAdminLoggedInLdap.subscribe(b => {
          this.isLoggedIn = b;
          if (this.isLoggedIn) {
            this.ldapS.getUsersInstances.subscribe((us: Array<OrganizationAuthenticationServerInformation>) => this.ldapUsers = us);
          }
        });
      }
        // ldap end
    });
  }

  private setupAdminForm() {
    this.adminForm = new FormGroup({
      email: new FormControl(this.adminEmail, [
        Validators.required,
        Validators.email
      ]),
    });
  }

  bindAdministrator() {
    const br: AdministratorBindingRequest = {
      organizationId: this.currentOrganization.id,

      orgAuthServerId: this.newAdminLdapId,
      /**
       * Administrator\'s e-mail address.
       */
      mail: this.adminEmail,
      /**
       * What can or cannot do an organization\'s administrator. The permission levels are: - Owner: 3 (higher level) - Manager: 2 - Viewer: 1 (lowest level)
       */
      permission: this.adminPermissions
    };
    this.as.bindAdministratorToOrganization(br).subscribe(() => { alert('Amministratore associato correttamente.'); }, (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Errore. L\'email inserita non è registrata presso il sistema. Se si vuole associare un amministratore con l\'email inserita selezionare la funzionalità \'Crea un amministratore\'');
        } else if(err.status === 400) {
          alert('Errore. L\'amministratore identificato da questa email risulta già associato all\'organizzazione corrente.');
        } else {
          alert(err.message);
        }
    } );
  }


  setAdminPermissions(privilegeLevel: number) {
    this.adminPermissions = privilegeLevel;
  }

  get getAdminEmail() {
    return this.adminEmail;
  }

  set setAdminEmail(email) {
    this.adminEmail = email;
  }

  get getAdminForm() {
    return this.adminForm;
  }

  setSelectedPriviledges(priv: string) {
    this.selectedPriviledges = priv;
  }

  get getSelectedPriviledges() {
    return this.selectedPriviledges;
  }

  get getCurrentOrganization() {
    return this.currentOrganization;
  }

  get getCurrentOrganizationName() {
    return this.currentOrganization.name;
  }
}
