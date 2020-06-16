import { Component, OnInit } from '@angular/core';
import {
  AccessService,
  Organization,
  OrganizationAccess,
  OrganizationAuthenticationServerInformation, PlaceAccess,
  PlaceService
} from '../../../../index';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LdapService} from '../../../services/ldap.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Place} from '../../../../model/place';
import {Router} from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-user-authenticated-accesses',
  templateUrl: './authenticated-user-accesses.component.html',
  styleUrls: ['./authenticated-user-accesses.component.css']
})
export class AuthenticatedUserAccessesComponent implements OnInit {

  today = new Date();
  sortDate: NgbDateStruct = { year: this.today.getFullYear(), month: this.today.getMonth(), day: this.today.getDay() };
  sortByDay = false;
  private organization: Organization;
  private hasLDAP: boolean;
  isLoggedIn: boolean;
  private ldapUsers: Array<OrganizationAuthenticationServerInformation>;
  contactForm: FormGroup;
  private Submitted = false;
  currentPlaceIndex = 0;
  viewingAccesses = false;
  viewingOrgAccesses = true;
  usersToWatch = Array<string>();
  places = Array<Place>();
  sortingMode = '▲';
  sortBy = 'ingresso';
  // sortByAlt = 'uscita';
  incorrectCredentials = false;
  private usersOrganizationAccesses: Array<OrganizationAccess>;
  organizationAccesses: Array<OrganizationAccess>;
  placeAccesses: Array<PlaceAccess>;
  switchModeButtonId = 'buttonSwitchToPlace';
  diff;
  /*
  * The username of the user that is logging in
  */
  private username: string;

  /*
  * The password of the user that is logging in
  */
  private password: string;


  constructor(private aods: AdministratorOrganizationDataService, private ldapS: LdapService, private as: AccessService, private r: Router) { }

  ngOnInit(): void {
    this.aods.getOrganization.subscribe((o: Organization) => {
      if (o.trackingMode === 'authenticated') {
        this.organization = o;
        this.ldapS.clearUsersToGet();
        this.ldapS.isAdminLoggedInLdap.subscribe(b => {
          this.isLoggedIn = b;
          if (this.isLoggedIn) {
            this.ldapS.getUsersInstances.subscribe((us: Array<OrganizationAuthenticationServerInformation>) => this.ldapUsers = us );
          }
        });
        this.aods.getCurrentOrganizationPlaces.subscribe((p: Array<Place>) => { this.places = p; });
        // this.
        // this.as.getAuthenticatedAccessListInOrganization(, this.organization.id).subscribe();
      } else {
        this.r.navigateByUrl('/Content-panel');
      }
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
    this.ldapS.getUsersLdap(this.organization.id).subscribe((info: Array<OrganizationAuthenticationServerInformation>) => {
      if (info === undefined || info === null || info.length === 0) {
        this.incorrectCredentials = true;
      } else {
        this.ldapUsers = info;
        this.incorrectCredentials = false;
        this.ldapS.isAdminLoggedInLdap.next(true);
        this.ldapS.getUsersInstances.next(this.ldapUsers);
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 500) {
        this.incorrectCredentials = true;
      }
    });
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

  /*toggleSortBy() {
    if (this.sortBy === 'ingresso') {
      this.sortBy = 'uscita';
      this.sortByAlt = 'ingresso';
    } else {
      this.sortBy = 'ingresso';
      this.sortByAlt = 'uscita';
    }
  }*/

  toggleEnterSortingMode() {
    if (this.sortBy === 'ingresso') {
      if (this.sortingMode === '▲') {
        this.sortingMode = '▼';
        // sorting the accesses array
        if (this.viewingOrgAccesses) {
          this.sortEnterOrgAccesses(-1);
        } else {
          this.sortEnterPlaceAccesses(-1);
        }
      } else {
        this.sortingMode = '▲';
        // sorting the access array
        if (this.viewingOrgAccesses) {
          this.sortEnterOrgAccesses(1);
        } else {
          this.sortEnterPlaceAccesses(1);
        }
      }
    } else {
      this.sortBy = 'ingresso';
    }
  }

  toggleExitSortingMode() {
    if (this.sortBy === 'uscita') {
      if (this.sortingMode === '▲') {
        this.sortingMode = '▼';
        // sorting the accesses array
        if (this.viewingOrgAccesses) {
          this.sortExitOrgAccesses(-1);
        } else {
          this.sortExitPlaceAccesses(-1);
        }
      } else {
        this.sortingMode = '▲';
        // sorting the access array
        if (this.viewingOrgAccesses) {
          this.sortExitOrgAccesses(1);
        } else {
          this.sortExitPlaceAccesses(1);
        }
      }
    } else {
      this.sortBy = 'uscita';
    }
  }

  /*
  * if 1 is passed, the accesses will be sorted in decreasing date mode
  * if -1 is passed, the accesses will be sorted in increasing date mode
   */
  sortEnterOrgAccesses(mode: number) {
    if (this.organizationAccesses !== undefined && this.organizationAccesses !== null) {
      this.organizationAccesses.sort((a1, a2) => {
        if (a1.entranceTimestamp < a2.entranceTimestamp) {
          return mode;
        } else if (a1.entranceTimestamp > a2.entranceTimestamp) {
          return -mode;
        } else {
          return 0;
        }
      });
    }
  }

  /*
* if 1 is passed, the accesses will be sorted in decreasing date mode
* if -1 is passed, the accesses will be sorted in increasing date mode
 */
  sortEnterPlaceAccesses(mode: number) {
    if (this.placeAccesses !== undefined && this.placeAccesses !== null) {
      this.placeAccesses.sort((a1, a2) => {
        if (a1.entranceTimestamp < a2.entranceTimestamp) {
          return mode;
        } else if (a1.entranceTimestamp > a2.entranceTimestamp) {
          return -mode;
        } else {
          return 0;
        }
      });
    }
  }

  /*
* if 1 is passed, the accesses will be sorted in decreasing date mode
* if -1 is passed, the accesses will be sorted in increasing date mode
 */
  sortExitOrgAccesses(mode: number) {
    if (this.organizationAccesses !== undefined && this.organizationAccesses !== null) {
      this.organizationAccesses.sort((a1, a2) => {
        if (a1.exitTimestamp < a2.exitTimestamp) {
          return mode;
        } else if (a1.exitTimestamp > a2.exitTimestamp) {
          return -mode;
        } else {
          return 0;
        }
      });
    }
  }

  /*
* if 1 is passed, the accesses will be sorted in decreasing date mode
* if -1 is passed, the accesses will be sorted in increasing date mode
 */
  sortExitPlaceAccesses(mode: number) {
    if (this.placeAccesses !== undefined && this.placeAccesses !== null) {
      this.placeAccesses.sort((a1, a2) => {
        if (a1.exitTimestamp < a2.exitTimestamp) {
          return mode;
        } else if (a1.exitTimestamp > a2.exitTimestamp) {
          return -mode;
        } else {
          return 0;
        }
      });
    }
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

  viewAccesses() {
    const usersIds = Array<string>();
    this.usersToWatch.forEach(u => usersIds.push(u));
    if (this.viewingOrgAccesses) {
      this.as.getAuthenticatedAccessListInOrganization(usersIds, this.organization.id).subscribe((acc: Array<OrganizationAccess>) => {
        if (acc !== undefined && acc !== null) {
          this.organizationAccesses = acc;
          this.organizationAccesses.forEach((a) => {
            a.entranceTimestamp = new Date(a.entranceTimestamp);
            if (a.exitTimestamp !== undefined && a.exitTimestamp !== null) {
              a.exitTimestamp = new Date(a.exitTimestamp);
            }
          });
        }
        this.viewingAccesses = true;
        this.sortEnterOrgAccesses(1);
      });
    } else {
      this.as.getAuthenticatedAccessListInPlace(usersIds, this.places[this.currentPlaceIndex].id).subscribe((acc: Array<PlaceAccess>) => {
        if (acc !== undefined && acc !== null) {
          this.placeAccesses = acc;
          this.placeAccesses.forEach((a) => {
            a.entranceTimestamp = new Date(a.entranceTimestamp);
            if (a.exitTimestamp !== undefined && a.exitTimestamp !== null) {
              a.exitTimestamp = new Date(a.exitTimestamp);
            }
          });
        }
        this.viewingAccesses = true;
        this.sortEnterPlaceAccesses(1);
      });
    }
  }

  unviewAccesses() {
    this.sortByDay = false;
    this.viewingAccesses = false;
    this.usersToWatch = new Array<string>();
    this.placeAccesses = new Array<PlaceAccess>();
    this.organizationAccesses = new Array<OrganizationAccess>();
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
