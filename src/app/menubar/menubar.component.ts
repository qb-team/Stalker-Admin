/*
 * Vertical menu in the panel control
 */
import {AfterContentInit, Component, EventEmitter, OnInit} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { OrganizationService } from 'src/api/api';
import {Organization, OrganizationAuthenticationServerInformation, Permission} from 'src/model/models';
/*import {ActivatedRoute, Router} from '@angular/router';*/
import {AdministratorOrganizationDataService} from '../services/AdministratorOrganizationData.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LdapService} from '../services/ldap.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, AfterContentInit {

  private Organization: Organization;
  private OrgArr: Organization[];
  private hasLDAP: boolean;
  contactForm: FormGroup;
  private Submitted = false;
  /*
  * The username of the user that is logging in
  */
  private username: string;

  /*
  * The password of the user that is logging in
  */
  private password: string;
  constructor(private ads: AdministratorOrganizationDataService, private authenticationService: AuthenticationService, private os: OrganizationService, private router: Router/*, private activatedRoute: ActivatedRoute*/, private ldapS: LdapService ) { }
  /*
   * Initialization and refresh the list of organization
   */
  ngOnInit() {
    this.loadOrganizationList();
  }

  loadOrganizationList() {
    this.ads.getAdminOrganizations.subscribe((orgs: Array<Organization>) => {
      this.orgArr = orgs;
      this.setupForm();
    });
  }

  loginLDAP() {
    this.ldapS.setCredentials(this.username, this.password);
    console.log('CREDENTIALS: ' + this.username + ' ' + this. password);
    console.log('LDAP id: ' + localStorage.getItem('permLdapId'));
    this.ldapS.addUserToGet(localStorage.getItem('permLdapId'));
    this.ldapS.getUsersLdap(this.Organization.id).subscribe(() => {});
  }

  ngAfterContentInit() {
    this.ads.getOrganization.next(this.Organization);
  }

  /*
   * It updates the name of organization selected
   */
  setOrganization(click: any) {
    this.Organization = this.OrgArr[click.target.attributes.id.value];
    this.ads.getOrganization.next(this.Organization);
    this.ldapS.clearUsersToGet();
    if (this.Organization.trackingMode === Organization.TrackingModeEnum.Authenticated) {
      this.hasLDAP = true;
      this.router.navigateByUrl('/Content-panel/Panel/Homepage');
    } else {
      this.hasLDAP = false;
    }
  }

  /*
   * It calls function SignOut of the service
   */
  signOut() {
    this.authenticationService.signOut();
    this.navigateToLogin();
  }

  /*
   * It updates value of active_content for show Home page
   */
  homePage() {
    this.router.navigateByUrl('/Content-panel/Panel/Homepage');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/Login');
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
    let found = false;
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
    }
  }

  onSubmit(): void {
    this.Submitted = true;
  }

  get orgArr(): Organization[] {
    return this.OrgArr;
  }

  set orgArr(value: Organization[]) {
    this.OrgArr = value;
  }
  get organization(): Organization {
    return this.Organization;
  }

  set organization(value: Organization) {
    this.Organization = value;
  }

  get isLDAP(): boolean {
    return this.hasLDAP;
  }

  set isLDAP(value: boolean) {
    this.hasLDAP = value;
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

}
