/*
 * Vertical menu in the panel control
 */
import {AfterContentInit, Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { OrganizationService } from 'src/api/api';
import {Organization} from 'src/model/models';
import {AdministratorOrganizationDataService} from '../services/AdministratorOrganizationData.service';
import {Router} from '@angular/router';
import {LdapService} from '../services/ldap.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, AfterContentInit {
  private Organization: Organization; // contain the current organization
  private OrgArr: Organization[]; // contain a list of organization
  constructor(private ads: AdministratorOrganizationDataService, private authenticationService: AuthenticationService, private os: OrganizationService, private router: Router/*, private activatedRoute: ActivatedRoute*/, private ldapS: LdapService ) { }
  /*
   * Initialization and refresh the list of organization
   */
  ngOnInit() {
    this.loadOrganizationList();
  }
  /*
  load a list of organization
   */
  loadOrganizationList() {
    this.ads.getAdminOrganizations.subscribe((orgs: Array<Organization>) => {
      this.orgArr = orgs;
    });
  }

  ngAfterContentInit() {
    this.ads.getOrganization.next(this.Organization);
  }

  /*
   * It updates the name of organization selected
   */
  setOrganization(idx: number) {
    if (this.Organization && this.Organization.id !== this.OrgArr[idx].id && this.OrgArr[idx].trackingMode === 'authenticated') {
      this.ldapS.isAdminLoggedInLdap.next(false);
    }
    this.Organization = this.OrgArr[idx];
    this.ads.getOrganization.next(this.Organization);
  }

  /*
   * It calls function SignOut of the service
   */
  signOut() {
    this.ldapS.isAdminLoggedInLdap.next(false);
    this.authenticationService.signOut();
    this.navigateToLogin();
  }

  /*
   * It updates value of active_content for show Home page
   */
  homePage() {
    this.router.navigateByUrl('/Content-panel/Panel/Homepage');
  }
  /*
  call component Login
   */
  navigateToLogin() {
    this.router.navigateByUrl('/Login');
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
}
