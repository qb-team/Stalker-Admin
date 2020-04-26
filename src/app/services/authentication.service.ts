/*
 * Service for authentication
*/
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {AdministratorService, Configuration, ConfigurationParameters, Organization, OrganizationService, Permission} from '../..';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private UserPermissions: Permission[];
  private UserData: Observable<firebase.User>; // user data
  private Token: Promise<string>;
  private SignOk = true; // Indicates whether the login was successful


  constructor(private angularFireAuth: AngularFireAuth, private as: AdministratorService, private os: OrganizationService, private ds: DataService) {
    this.UserData = angularFireAuth.authState;
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
                           this.as.getPermissionList(user.uid).subscribe((p: Permission[]) => {
                             this.UserPermissions = p;
                             console.log('Permission 1: ' + this.UserPermissions[0].organizationId);
                             for (const permission of p) {
                               this.os.getOrganization(permission.organizationId).subscribe((o: Organization) => { this.ds.addOrganization(o); });
                             }
                           });
                         }
                       });
                     });
                     console.log('You are Successfully logged in!'); })
      .catch(err => { this.SignOk = false;
                      console.log('Something is wrong:', err.message);
      });
  }
  /*
   * Sign out. It allows the user to exit
  */
  signOut() {
    this.angularFireAuth
      .auth
      .signOut().then(res => {console.log('Good bye'); });
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

  get userPermissions(): Permission[] {
    return this.UserPermissions;
  }

  set userPermissions(value: Permission[]) {
    this.UserPermissions = value;
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
