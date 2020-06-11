import { Component, OnInit } from '@angular/core';
import {
  Organization,
  OrganizationAuthenticationServerInformation,
  Place,
  ReportService,
  TimePerUserReport
} from '../../../..';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {LdapService} from '../../../services/ldap.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-time-report',
  templateUrl: './time-report.component.html',
  styleUrls: ['./time-report.component.css']
})
export class TimeReportComponent implements OnInit {

  private organization: Organization;
  isLoggedIn: boolean;
  contactForm: FormGroup;
  private ldapUsers: Array<OrganizationAuthenticationServerInformation>;
  places = Array<Place>();
  incorrectCredentials = false;
  private Submitted = false;
  switchModeButtonId = 'buttonSwitchToPlace';
  viewingPerUserReport = true;
  timeSpentByUsersInPlaces = new Array<Array<TimePerUserReport>>(); // first array describes the places, the nested one describes the time spent in a specific place for each user

  /*
* The username of the user that is logging in
*/
  private username: string;

  /*
  * The password of the user that is logging in
  */
  private password: string;

  constructor(private aods: AdministratorOrganizationDataService, private ldapS: LdapService, private r: Router, private tr: ReportService) { }

  ngOnInit(): void {
    this.aods.getOrganization.subscribe((o: Organization) => {
      if (o.trackingMode === 'authenticated') {
        this.organization = o;
        this.ldapS.clearUsersToGet();
        this.aods.getCurrentOrganizationPlaces.subscribe((p: Array<Place>) => {
          this.places = p;
          this.ldapS.isAdminLoggedInLdap.subscribe(b => {
            this.isLoggedIn = b;
            if (this.isLoggedIn) {
              this.ldapS.getUsersInstances.subscribe((us: Array<OrganizationAuthenticationServerInformation>) => {
                this.ldapUsers = us;
                for (let i = 0; i < this.places.length; i++) {
                  this.tr.getTimePerUserReport(this.places[i].id).subscribe((r: Array<TimePerUserReport>) => this.timeSpentByUsersInPlaces[i] = r );
                }
              });
            }
          });
        });
        // this.
        // this.as.getAuthenticatedAccessListInOrganization(, this.organization.id).subscribe();
      } else {
        this.r.navigateByUrl('/Content-panel');
      }
    });
    this.setupForm();
  }

  msToString(ms: number) {
    return this.toDigitalClock(Math.floor(ms / 3600000).toString()) + ':' + this.toDigitalClock(Math.floor((ms % 3600000) / 60000).toString()) + ':' + this.toDigitalClock(Math.floor((ms % 60000) / 1000).toString());
  }

  toDigitalClock(str: string) {
    if (str.length <= 1) {
      return '0' + str;
    } else {
      return str;
    }
  }

  loginLDAP() {
    this.ldapS.setCredentials(this.username, this.password);
    this.ldapS.addUserToGet('*');
    console.log(this.ldapS.credentials);
    console.log(this.ldapS.usersToGet);
    this.ldapS.getUsersLdap(this.organization.id).subscribe((info: Array<OrganizationAuthenticationServerInformation>) => {
      this.ldapUsers = info;
      console.log(info);
      this.incorrectCredentials = false;
      this.ldapS.isAdminLoggedInLdap.next(true);
      this.ldapS.getUsersInstances.next(this.ldapUsers);
    }, (err: HttpErrorResponse) => {
      if (err.status === 500) {
        this.incorrectCredentials = true;
      }
    });
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

  toggleViewMode(ev) {
    console.log(ev.target.id);
    if ('buttonSwitchToPerUser' === this.switchModeButtonId) {
      this.viewingPerUserReport = false;
      this.switchModeButtonId = 'buttonSwitchToGrouped';
      ev.target.innerHTML = 'Passa alla visualizzazione del report per luogo';

    } else {
      this.switchModeButtonId = 'buttonSwitchToPerUser';
      ev.target.innerHTML = 'Passa alla visualizzazione del report per utente';
      this.viewingPerUserReport = true;
    }
  }

  onSubmit(): void {
    this.Submitted = true;
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

  get getLdapUsers() {
    return this.ldapUsers;
  }

  get submitted(): boolean {
    return this.Submitted;
  }

  set submitted(value: boolean) {
    this.Submitted = value;
  }

  get getOrganization() {
    return this.organization;
  }
}
