/*
 * Vertical menu in the panel control
 */
import {AfterContentInit, Component, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { OrganizationService } from 'src/api/api';
import { Organization } from 'src/model/models';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, AfterContentInit {

  private Organization: Organization;
  private OrgArr: Organization[];
  private LDAP: boolean;
  contactForm: FormGroup;
  private Submitted = false;
  /*
  * The e-mail of the user that is logging in
  */
  private Email: string;

  /*
  * The password of the user that is logging in
  */
  private Password: string;
  constructor(private ds: DataService, private authenticationService: AuthenticationService, private os: OrganizationService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  /*
   * Initialization and refresh the list of organization
   */
  ngOnInit() {
    // this.ds.org = new ReplaySubject<Organization>()<Organization>();
    this.createForm();
    this.activatedRoute.data.subscribe((data: {orgs: Array<Organization> }) => {
      this.OrgArr = data.orgs;
    });

  }

  ngAfterContentInit() {
    console.log('EMIT SIGNAL');
    this.ds.getOrganization.next(this.Organization);
  }

  /*
   * It updates the name of organization selected
   */
  setOrganization(click: any) {
    this.Organization = this.OrgArr[click.target.attributes.id.value];
    this.ds.getOrganization.next(this.Organization);
    if (this.Organization.trackingMode === Organization.TrackingModeEnum.Authenticated) {
      console.log('LDAP');
      this.LDAP = true;
    } else {
      console.log('non LDAP');
      this.LDAP = false;
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

  createForm() {
    this.contactForm = new FormGroup({
      email: new FormControl(this.Email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.Password, [
        Validators.required,
        Validators.minLength(8)
      ]),
    });
  }

  close(): void {
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
      this.ds.getOrganization.next(this.OrgArr[i - 1]);
    } else {
      alert('riselezione una organizzazione per continuare');
      this.Organization = this.OrgArr[-1];
      this.ds.getOrganization.next(this.Organization);
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
    return this.LDAP;
  }

  set isLDAP(value: boolean) {
    this.LDAP = value;
  }

  get submitted(): boolean {
    return this.Submitted;
  }

  set submitted(value: boolean) {
    this.Submitted = value;
  }

  get email(): string {
    return this.Email;
  }

  set email(value: string) {
    this.Email = value;
  }

  get password(): string {
    return this.Password;
  }

  set password(value: string) {
    this.Password = value;
  }

}
