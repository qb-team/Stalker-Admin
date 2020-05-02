/*
 * Service for authentication
*/
import {EventEmitter, Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {AdministratorService, Configuration, ConfigurationParameters, Organization, OrganizationService, Permission} from '../..';
import {FirebaseAuth} from '@angular/fire';
import {AdministratorDataService} from './AdministratorData.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private UserData: Observable<firebase.User>; // user data
  private Token: Promise<string>;
  private SignOk = true; // Indicates whether the login was successful
  private userDetails: firebase.User = null;


  constructor(private angularFireAuth: AngularFireAuth, private as: AdministratorService, private os: OrganizationService, private ads: AdministratorDataService, private router: Router) {
    //this.signOut();
    console.log('auth service constructor');
    this.UserData = angularFireAuth.authState;
    this.UserData.subscribe(
      (user) => {
        if (user) {
          console.log('Constrctor if user');
          this.userDetails = user;
          this.Token = this.userDetails.getIdToken();
          this.configureTokenAndGetAdminOrganizations();
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  isLoggedIn() {
    console.log('isLoggedIn() from auth service');
    if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }

  /*
  * Sign in. It allows you to authenticate the user, otherwise it reports an error
  */
  signIn(email: string, password: string) {
    console.log('LOGIN');
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => { this.SignOk = true;
                     // this.Token = this.angularFireAuth.auth.currentUser.getIdToken();
                     // this.configureTokenAndGetAdminOrganizations();
                     console.log('You are Successfully logged in!'); })
      .catch(err => { this.SignOk = false;
                      console.log('Something is wrong:', err.message);
      });
  }

  private configureTokenAndGetAdminOrganizations() {
    this.Token.then( (s: string) => {
      localStorage.setItem('adminToken', s);
      //this.as.configuration.setAccessToken(s);
      this.angularFireAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log('if(user)');
          this.as.getPermissionList(user.uid).subscribe((p: Permission[]) => {
            console.log('Got PermList');
            this.ads.getUserPermissions().emit(p);
            const organizationList = new Array<Organization>();
            let remainingOrgs = 0;
            console.log('Orgs number to get: ' + remainingOrgs);
            for (const i of p) {
              this.os.getOrganization(i.organizationId).subscribe((o: Organization) => {
                console.log('org id to get: ' + i.organizationId);
                organizationList.push(o);
                remainingOrgs++;
                if (remainingOrgs === p.length) {
                  this.ads.getAdminOrganizations.next(this.filterOrganizationsOnPermissions(this.sortOrganizationsById(organizationList), p));
                  console.log('organizationList emitted: ' + organizationList);
                  this.router.navigateByUrl('/Content-panel').then((b: boolean) => { console.log('After emit i successfully navigated to content panel: ' + b); });
                }
              });
            }
          });

 /*         let organizationList;
          console.log('Pre Get OrgList');
          this.os.getOrganizationList().subscribe( (orgs: Array<Organization>) => {
            console.log('Got OrgList');
            orgs.sort((o1, o2) => {
              if (o1.id > o2.id) {
                return 1;
              }
              if (o1.id < o2.id) {
                return -1;
              }
              return 0;
            });
            organizationList = orgs;
            console.log('Pre Get PermList');

          });*/
        }
      });
    });
  }

  sortOrganizationsById(orgs: Array<Organization>): Array<Organization> {
    const orgsToRet =  orgs.sort((o1, o2) => {
      if (o1.id > o2.id) {
        return 1;
      }
      if (o1.id < o2.id) {
        return -1;
      }
      return 0;
    });
    console.log('sorted orgs in sort(): ' + orgsToRet);
    return orgsToRet;
  }

  filterOrganizationsOnPermissions(orgs: Array<Organization>, perms: Array<Permission>): Array<Organization> {
    const filteredOrgs = new Array<Organization>();
    let orgIt = 0;
    let permIt = 0;
    while (orgIt < orgs.length && permIt < perms.length) {
      if (orgs[orgIt].id === perms[permIt].organizationId) {
        filteredOrgs.push(orgs[orgIt]);
        orgIt++;
        permIt++;
      } else if (orgs[orgIt].id < perms[permIt].organizationId) {
        orgIt++;
      } else {
        permIt++;
      }
    }
    for (const o of filteredOrgs) {
      console.log('Filtered org: ' + o.name);
    }
    return filteredOrgs;
  }

  /*
   * Sign out. It allows the user to exit
  */
  signOut() {
    this.angularFireAuth
      .auth
      .signOut().then(res => {console.log('Good bye'); });
    localStorage.removeItem('key');
  }
  /*
   * The function allows to reset password to user
   */
  resetPassword(email: string) {
    this.angularFireAuth.auth.sendPasswordResetEmail(email).then(res => {console.log('Check out your email'); } );
  }

  getState() {
    return this.angularFireAuth.authState;
  }

  get userData(): Observable<firebase.User> {
    return this.UserData;
  }

  set userData(value: Observable<firebase.User>) {
    this.UserData = value;
  }

  get token(): Promise<string> {
    return this.Token;
  }

  set token(value: Promise<string>) {
    this.Token = value;
  }

  get signOk(): boolean {
    return this.SignOk;
  }

  set signOk(value: boolean) {
    this.SignOk = value;
  }
}
