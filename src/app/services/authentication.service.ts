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
  userPermissions: Permission[];
  userData: Observable<firebase.User>; // user data
  token: Promise<string>;
  signOk = true; // Indicates whether the login was successful


  constructor(private angularFireAuth: AngularFireAuth, private as: AdministratorService, private os: OrganizationService, private ds: DataService) {
    this.userData = angularFireAuth.authState;
  }

  /*
  * Sign in. It allows you to authenticate the user, otherwise it reports an error
  */
  signIn(email: string, password: string) {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => { this.signOk = true;
                     this.token = this.angularFireAuth.auth.currentUser.getIdToken();
                     this.token.then( (s: string) => {
                       this.as.configuration.setAccessToken(s);
                       this.angularFireAuth.auth.onAuthStateChanged((user) => {
                         if (user) {
                           // User is signed in.
                           this.as.getPermissionList(user.uid).subscribe((p: Permission[]) => {
                             this.userPermissions = p;
                             console.log('Permission 1: ' + this.userPermissions[0].organizationId);
                             for (const permission of p) {
                               this.os.getOrganization(permission.organizationId).subscribe((o: Organization) => { this.ds.addOrganization(o); });
                             }
                           });
                         }
                       });
                     });
                     console.log('You are Successfully logged in!'); })
      .catch(err => { this.signOk = false;
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
}
