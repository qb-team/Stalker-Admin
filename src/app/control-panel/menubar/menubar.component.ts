/*
 * Vertical menu in the panel control
 */
import {AfterContentInit, Component, EventEmitter, OnInit} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { OrganizationService } from 'src/api/api';
import { Organization } from 'src/model/models';
import {ActivatedRoute, Router} from '@angular/router';
import {AdministratorDataService} from '../../services/AdministratorData.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, AfterContentInit {

  private Organization: Organization;
  private OrgArr: Organization[];
  constructor(private ads: AdministratorDataService, private authenticationService: AuthenticationService, private os: OrganizationService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  /*
   * Initialization and refresh the list of organization
   */
  ngOnInit() {
    // this.ds.org = new ReplaySubject<Organization>()<Organization>();
    this.activatedRoute.data.subscribe((data: {orgs: Array<Organization> }) => {
      this.OrgArr = data.orgs;
      this.Organization = this.OrgArr[0];
    });
  }

  ngAfterContentInit() {
    console.log('EMIT SIGNAL');
    this.ads.getOrganization.next(this.Organization);
  }

  /*
   * It updates the name of organization selected
   */
  setOrganization(click: any) {
    this.Organization = this.OrgArr[click.target.attributes.id.value];
    this.ads.getOrganization.next(this.Organization);
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
