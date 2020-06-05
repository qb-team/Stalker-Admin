import { Component, OnInit } from '@angular/core';
import {AccessService, Organization, OrganizationAccess, OrganizationAuthenticationServerInformation} from '../../..';
import {AdministratorOrganizationDataService} from '../../services/AdministratorOrganizationData.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LdapService} from '../../services/ldap.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-single-user-authenticated-accesses',
  templateUrl: './authenticated-user-accesses.component.html',
  styleUrls: ['./authenticated-user-accesses.component.css']
})
export class AuthenticatedUserAccessesComponent implements OnInit {

  private organization: Organization;
  private hasLDAP: boolean;
  isLoggedIn = false;
  private ldapUsers: Array<OrganizationAuthenticationServerInformation>;
  contactForm: FormGroup;
  private Submitted = false;
  viewingAccesses = false;
  private usersOrganizationAccesses: Array<OrganizationAccess>;
  /*
  * The username of the user that is logging in
  */
  private username: string;

  /*
  * The password of the user that is logging in
  */
  private password: string;


  constructor(private aods: AdministratorOrganizationDataService, private ldapS: LdapService, private as: AccessService) { }

  ngOnInit(): void {
    this.aods.getOrganization.subscribe((o: Organization) => {
      this.organization = o;
      this.ldapS.clearUsersToGet();
      // this.
      // this.as.getAuthenticatedAccessListInOrganization(, this.organization.id).subscribe();
    });
    this.setupForm();
  }


  private setupForm() {
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

  closeLdapForm(): void {
    /*let found = false;
    let i = 0;
    for (i = 0; !found && i < this.OrgArr.length; i++) {
      console.log(i);
      if (this.OrgArr[i].trackingMode === Organization.TrackingModeEnum.Anonymous) {
        found = true;
      }
    }
    if (found) {
      this.Organization = this.OrgArr[i - 1];
      this.ads.getOrganization.next(this.OrgArr[i - 1]);
    } else {
      alert('riselezionare un\'organizzazione per continuare');
      this.Organization = this.OrgArr[-1];
      this.ads.getOrganization.next(this.Organization);
    }*/
  }

  loginLDAP() {
    this.ldapS.setCredentials(this.username, this.password);
    this.ldapS.addUserToGet('*');
    console.log(this.ldapS.credentials);
    console.log(this.ldapS.usersToGet);
    this.ldapS.getUsersLdap(this.organization.id).subscribe((info: Array<OrganizationAuthenticationServerInformation>) => {
      this.ldapUsers = info;
      console.log(info);
      this.isLoggedIn = true;
    }, (err: HttpErrorResponse) => {alert(err.message); });
  }


  toggleBtnText(ev) {
    if (ev.target.innerHTML === 'NO') {
      ev.target.innerHTML = 'SÌ';
    } else {
      ev.target.innerHTML = 'NO';
    }
  }

  viewAccesses() {
    this.viewingAccesses = true;
  }

  onSubmit(): void {
    this.Submitted = true;
  }

  get getOrganization(): Organization {
    return this.organization;
  }

  get getOrganziationUsersAccesses() {
    return this.usersOrganizationAccesses;
  }

  /*get isLDAP(): boolean {
    return this.hasLDAP;
  }

  set isLDAP(value: boolean) {
    this.hasLDAP = value;
  }*/

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

  get submitted(): boolean {
    return this.Submitted;
  }

  set submitted(value: boolean) {
    this.Submitted = value;
  }

  get getLdapUsers() {
    return this.ldapUsers;
  }
}
