/*
 * Service for authentication
*/
import {Injectable} from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {Permission} from '../..';
import {AdministratorOrganizationDataService} from './AdministratorOrganizationData.service';
import {AdministratorPermissionDataService} from './AdministratorPermissionData.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private UserData: Observable<firebase.User>; // user data
  private Token: Promise<string>;
  private SignOk = true; // Indicates whether the login was successful
  private userDetails: firebase.User = null;


  constructor(private angularFireAuth: AngularFireAuth, private adp: AdministratorPermissionDataService, private ado: AdministratorOrganizationDataService, private router: Router) {
    this.UserData = angularFireAuth.authState;
    this.UserData.subscribe(
      (user) => {
        if (user) {
          console.log('init');
          this.userDetails = user;
          localStorage.setItem('uid', user.uid);
          this.Token = this.userDetails.getIdToken();
          this.configureTokenAndGetAdminOrganizations();
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  isLoggedIn() {
    return this.userDetails != null;
  }

  /*
  * Sign in. It allows you to authenticate the user, otherwise it reports an error
  */
  signIn(email: string, password: string) {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => { this.SignOk = true;
                     console.log('You are Successfully logged in!'); })
      .catch(err => { this.SignOk = false;
                      console.log('Something is wrong:', err.message);
      });
  }

  private configureTokenAndGetAdminOrganizations() {
    this.Token.then( (s: string) => {
      localStorage.setItem('adminToken', s);
      this.ado.setupAccessTokenInAPIService();
      this.adp.setupAccessTokenInAPIService();
      this.angularFireAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          this.adp.requireAdministratorPermissions(user.uid);
          this.adp.getUserPermissions().subscribe((p: Permission[]) => {this.ado.requireAdministratorOrganizations(p); });
          this.router.navigateByUrl('/Content-panel');
        }
      });
    });
  }

  /*
   * Sign out. It allows the user to exit
  */
  signOut() {
    this.angularFireAuth
      .auth
      .signOut().then(res => {console.log('Good bye'); });
    localStorage.removeItem('key');
    localStorage.removeItem('perm');
    this.adp.getUserPermissions().next(null);
    this.ado.getAdminOrganizations.next(null);
    this.ado.getOrganization.next(null);
  }
  /*
   * The function allows to reset password to user
   */
  resetPassword(email: string) {
    this.angularFireAuth.auth.sendPasswordResetEmail(email).then(res => {console.log('Check out your email'); } );
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
