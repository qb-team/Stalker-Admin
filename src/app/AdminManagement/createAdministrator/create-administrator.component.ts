import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  AdministratorBindingRequest,
  AdministratorService,
  Organization,
  OrganizationAuthenticationServerInformation
} from '../../..';
import {AdministratorOrganizationDataService} from '../../services/AdministratorOrganizationData.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LdapService} from '../../services/ldap.service';

@Component({
  selector: 'app-create-administrator',
  templateUrl: './create-administrator.component.html',
  styleUrls: ['./create-administrator.component.css']
})
export class CreateAdministratorComponent implements OnInit {

  private currentOrganization: Organization;
  private adminEmail: string;
  private adminPsw: string;
  private adminConfirmPsw: string;
  private adminPermissions: number;
  adminForm: FormGroup;
  private emailAlreadyRegistered = false;
  private selectedPriviledges: string;
  newAdminLdapId = null;
  newAdminLdapNameStr = '';
  loading = false;
  confirmBox = false;

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
    this.setupAdminForm();
    this.setupLoginForm();
  }

  subscribeToOrganization(): void {
    this.aods.getOrganization.subscribe((o: Organization) => {
      this.currentOrganization = o;
      // ldap begin
      if (this.currentOrganization && this.currentOrganization.trackingMode === 'authenticated') {
        this.ldapS.clearUsersToGet();
        this.ldapS.isAdminLoggedInLdap.subscribe(b => {
          this.isLoggedIn = b;
          if (this.isLoggedIn) {
            this.ldapS.getUsersInstances.subscribe((us: Array<OrganizationAuthenticationServerInformation>) => this.ldapUsers = us );
          }
        });
      }
        // ldap end
    });
  }

  closeConfirmBox() {
    this.confirmBox = false;
  }

  private setupAdminForm() {
    this.adminForm = new FormGroup({
      email: new FormControl(this.adminEmail, [
        Validators.required,
        Validators.email
      ]),
      pwd: new FormControl(this.adminPsw, [
        Validators.required,
        Validators.minLength(6)
      ]),
      confPwd: new FormControl(this.adminConfirmPsw, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  registerAdministrator() {
    const br: AdministratorBindingRequest = {
      organizationId: this.currentOrganization.id,

      orgAuthServerId: this.newAdminLdapId,
      /**
       * Administrator\'s e-mail address.
       */
      mail: this.adminEmail,
      /**
       * Administrator\'s new password.
       */
      password: this.adminPsw,
      /**
       * What can or cannot do an organization\'s administrator. The permission levels are: - Owner: 3 (higher level) - Manager: 2 - Viewer: 1 (lowest level)
       */
      permission: this.adminPermissions
    };
    this.loading = true;
    this.as.createNewAdministratorInOrganization(br).subscribe(() => { this.loading = false; this.confirmBox = true; }, (err: HttpErrorResponse) => {
      if (err.status === 400) {
        this.loading = false;
        alert('Errore. L\'amministratore risulta già registrato presso il sitema. Inserire un\'altra mail');
      } else {
        this.loading = false;
        alert(err.message);
      }
    } );
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

  setAdminPermissions(privilegeLevel: number) {
    this.adminPermissions = privilegeLevel;
  }

  get getAdminEmail() {
    return this.adminEmail;
  }

  set setAdminEmail(email) {
    this.adminEmail = email;
  }

  get getAdminPsw() {
    return this.adminPsw;
  }

  set setAdminPsw(psw) {
    this.adminPsw = psw;
  }

  get getAdminConfirmPsw() {
    return this.adminConfirmPsw;
  }

  set setAdminConfirmPsw(confPsw) {
    this.adminConfirmPsw = confPsw;
  }

  get getAdminForm() {
    return this.adminForm;
  }

  get getEmailAlreadyRegistered() {
    return this.emailAlreadyRegistered;
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
