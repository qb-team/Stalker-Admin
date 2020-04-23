/*
 * Vertical menu in the panel control
 */
import {AfterContentInit, Component, EventEmitter, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { OrganizationService } from 'src/api/api';
import { Organization } from 'src/model/models';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, AfterContentInit {
  organization: Organization;
  orgArr: Organization[];
  constructor(private ds: DataService, private authenticationService: AuthenticationService, private os: OrganizationService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  /*
   * Initialization and refresh the list of organization
   */
  ngOnInit() {
    this.ds.org = new EventEmitter<Organization>();
    this.activatedRoute.data.subscribe((data: {orgs: Array<Organization> }) => {
      this.orgArr = data.orgs;
      console.log('data.orgs: ' + data.orgs);
      this.organization = this.orgArr[0];
    });
  }

  ngAfterContentInit() {
    console.log('EMIT SIGNAL');
    this.ds.org.emit(this.organization);
  }

  /*
   * It updates the name of organization selected
   */
  setOrganization(click: any) {
    this.organization = this.orgArr[click.target.attributes.id.value];
    this.ds.getOrganization.emit(this.organization);
  }

  /*
   * It calls function SignOut of the service
   */
  SignOut() {
    this.authenticationService.SignOut();
    this.navigateToLogin();
  }

  /*
   * It updates value of active_content for show Home page
   */
  homePage() {
    this.ds.getActiveContent.emit('Home page');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/Login');
  }
}
