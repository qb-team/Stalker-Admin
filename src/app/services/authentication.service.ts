/*
 * Service for authentication
*/
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<firebase.User>; // user data
  signOk = true; // Indicates whether the login was successful


  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  /*
  * Sign in. It allows you to authenticate the user, otherwise it reports an error
  */
  SignIn(email: string, password: string) {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => { this.signOk = true;
                     console.log('You are Successfully logged in!'); })
      .catch(err => { this.signOk = false;
                      console.log('Something is wrong:', err.message);
      });
  }

  /*
   * Sign out. It allows the user to exit
  */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut().then(res => {console.log('Good bye'); });
  }

  /*
   * Returns signOk's value
  */
  getSignInState() {
    return this.signOk;
  }
  /*
   * The function allows to reset password to user
   */
  ResetPassword(email: string) {
    this.angularFireAuth.auth.sendPasswordResetEmail(email).then(res => {console.log('Check out your email'); } );
  }
}
