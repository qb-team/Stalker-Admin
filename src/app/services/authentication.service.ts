/*
 * Service for authentication
*/
import {EventEmitter, Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {AdministratorService, Configuration, ConfigurationParameters, Organization, OrganizationService, Permission} from '../..';
import {DataService} from './data.service';
import {FirebaseAuth} from '@angular/fire';
import {AdministratorDataService} from './AdministratorData.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private UserData: Observable<firebase.User>; // user data
  private Token: Promise<string>;
  private SignOk = true; // Indicates whether the login was successful
  private userDetails: firebase.User = null;


  constructor(private angularFireAuth: AngularFireAuth, private as: AdministratorService, private os: OrganizationService, private ads: AdministratorDataService) {
    this.UserData = angularFireAuth.authState;
    this.UserData.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  isLoggedIn() {
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
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => { this.SignOk = true;
                     this.Token = this.angularFireAuth.auth.currentUser.getIdToken();
                     this.Token.then( (s: string) => {
                       this.as.configuration.setAccessToken(s);
                       this.angularFireAuth.auth.onAuthStateChanged((user) => {
                         if (user) {
                           // User is signed in.
                           let organizationList;
                           this.os.getOrganizationList().subscribe( (orgs: Array<Organization>) => {
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
                             this.as.getPermissionList(user.uid).subscribe((p: Permission[]) => {
                               p.sort((p1, p2) => {
                                 if (p1.organizationId > p2.organizationId) {
                                   return 1;
                                 }
                                 if (p1.organizationId < p2.organizationId) {
                                   return -1;
                                 }
                                 return 0;
                               });
                               this.ads.getUserPermissions().emit(p);
                               this.ads.getAdminOrganizations().emit(this.filterOrganizationsOnPermissions(organizationList, p));
                             });
                           });
                         }
                       });
                     });
                     console.log('You are Successfully logged in!'); })
      .catch(err => { this.SignOk = false;
                      console.log('Something is wrong:', err.message);
      });
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
