import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratorBindingRequest, AdministratorService, Organization} from '../../..';
import {AdministratorOrganizationDataService} from '../../services/AdministratorOrganizationData.service';
import {HttpErrorResponse} from '@angular/common/http';

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
  private contactForm: FormGroup;
  private emailAlreadyRegistered = false;
  private selectedPriviledges: string;

  constructor(private as: AdministratorService, private aods: AdministratorOrganizationDataService) { }

  ngOnInit(): void {
    this.subscribeToOrganization();
    this.setupLoginForm();
  }

  subscribeToOrganization(): void {
    this.aods.getOrganization.subscribe((o: Organization) => { this.currentOrganization = o; });
  }

  private setupLoginForm() {
    this.contactForm = new FormGroup({
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
      /*
       * Administrator unique identifier from the authentication server of the organization.
      orgAuthServerId?: string;*/
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
    this.as.createNewAdministratorInOrganization(br).subscribe(() => { alert('Amministratore creato e aggiunto correttamente.'); }, (err: HttpErrorResponse) => {
      if (err.status === 400) {
        alert('Errore. L\'amministratore risulta già registrato presso il sitema. Inserire un\'altra mail');
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

  get getContactForm() {
    return this.contactForm;
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

  get getCurrentOrganizationName() {
    return this.currentOrganization.name;
  }

}
