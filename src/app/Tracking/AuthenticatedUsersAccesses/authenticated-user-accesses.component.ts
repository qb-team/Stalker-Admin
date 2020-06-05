import { Component, OnInit } from '@angular/core';
import {
  AccessService,
  Organization,
  OrganizationAccess,
  OrganizationAuthenticationServerInformation, PlaceAccess,
  PlaceService
} from '../../..';
import {AdministratorOrganizationDataService} from '../../services/AdministratorOrganizationData.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LdapService} from '../../services/ldap.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Place} from "../../../model/place";

@Component({
  selector: 'app-single-user-authenticated-accesses',
  templateUrl: './authenticated-user-accesses.component.html',
  styleUrls: ['./authenticated-user-accesses.component.css']
})
export class AuthenticatedUserAccessesComponent implements OnInit {

  private organization: Organization;
  private hasLDAP: boolean;
  isLoggedIn: string;
  private ldapUsers: Array<OrganizationAuthenticationServerInformation>;
  contactForm: FormGroup;
  private Submitted = false;
  currentPlaceIndex = 0;
  viewingAccesses = false;
  viewingOrgAccesses = true;
  usersToWatch = Array<string>();
  places = Array<Place>();
  private usersOrganizationAccesses: Array<OrganizationAccess>;
  organizationAccesses: Array<OrganizationAccess>;
  placeAccesses: Array<PlaceAccess>;
  switchModeButtonId = 'buttonSwitchToPlace';
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
      this.isLoggedIn = localStorage.getItem('isLoggedInLDAP');
      this.aods.getCurrentOrganizationPlaces.subscribe((p: Array<Place>) => { this.places = p; });
      // this.
      // this.as.getAuthenticatedAccessListInOrganization(, this.organization.id).subscribe();
    });
    this.setupForm();
  }

  changePlaceToWatchUpon(placeID: number) {
    this.currentPlaceIndex = placeID;
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
      this.isLoggedIn = 'true';
      localStorage.setItem('isLoggedInLDAP', 'true');
    }, (err: HttpErrorResponse) => {alert(err.message); });
  }


  toggleUser(ev) {
    if (ev.target.innerHTML === 'NO') {
      ev.target.innerHTML = 'SÌ';
      this.usersToWatch.push(ev.target.id);
    } else {
      ev.target.innerHTML = 'NO';
      const userToRemove = this.usersToWatch.findIndex((s: string) => s === ev.target.id);
      this.usersToWatch.splice(userToRemove, 1);
    }
  }

  toggleViewMode(ev) {
    console.log(ev.target.id);
    if ('buttonSwitchToPlace' === this.switchModeButtonId) {
      this.viewingOrgAccesses = false;
      this.switchModeButtonId = 'buttonSwitchToOrg';
      ev.target.innerHTML = 'Passa alla visualizzazione degli accessi all\'organizzazione';

    } else {
      this.switchModeButtonId = 'buttonSwitchToPlace';
      ev.target.innerHTML = 'Passa alla visualizzazione degli accessi ad un luogo';
      this.viewingOrgAccesses = true;
    }
  }

  viewAccesses() {
    this.viewingAccesses = true;
    const usersIds = Array<string>();
    this.usersToWatch.forEach(u => usersIds.push(u));
    if (this.viewingOrgAccesses) {
      this.as.getAuthenticatedAccessListInOrganization(usersIds, this.organization.id).subscribe((acc: Array<OrganizationAccess>) => {this.organizationAccesses = acc; console.log(acc); });
    } else {
      this.as.getAuthenticatedAccessListInPlace(usersIds, this.places[this.currentPlaceIndex].id).subscribe((acc: Array<PlaceAccess>) => { this.placeAccesses = acc; console.log(acc); });
    }
  }

  unviewAccesses() {
    this.viewingAccesses = false;
  }

  getLdapUserIndexById(id: string) {
    return this.ldapUsers.findIndex((s) => s.orgAuthServerId === id);
  }

  getUserByID(id: string) {
    return this.ldapUsers[this.getLdapUserIndexById(id)];
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
