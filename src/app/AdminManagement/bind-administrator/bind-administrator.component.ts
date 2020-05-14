import { Component, OnInit } from '@angular/core';
import {AdministratorBindingRequest, AdministratorService, Organization} from '../../..';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratorOrganizationDataService} from '../../services/AdministratorOrganizationData.service';
import {HttpErrorResponse} from '@angular/common/http';

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
  private contactForm: FormGroup;

  constructor(private as: AdministratorService, private aods: AdministratorOrganizationDataService) { }

  ngOnInit(): void {
    this.subscribeToOrganization();
    this.setupLoginForm();
  }

  subscribeToOrganization() {
    this.aods.getOrganization.subscribe((o: Organization) => { this.currentOrganization = o; });
  }

  private setupLoginForm() {
    this.contactForm = new FormGroup({
      email: new FormControl(this.adminEmail, [
        Validators.required,
        Validators.email
      ]),
    });
  }

  bindAdministrator() {
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
       * What can or cannot do an organization\'s administrator. The permission levels are: - Owner: 3 (higher level) - Manager: 2 - Viewer: 1 (lowest level)
       */
      permission: this.adminPermissions
    };
    this.as.bindAdministratorToOrganization(br).subscribe(() => { alert('Amministratore associato correttamente.'); }, (err: HttpErrorResponse) => {
        alert(err.message);
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

  get getContactForm() {
    return this.contactForm;
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
