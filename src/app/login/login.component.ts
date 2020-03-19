/*
* Component that shows a form for the log in
* It contains inputs for username and password, a button to launch the log in function and a button to be redirected to the password reset page
*/
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private data: DataService) { }
  /*
  * The e-mail of the user that is logging in
  */
  email: string;

  /*
  * The password of the user that is logging in
  */
  password: string;

  /*
  * Used to validate the form when trying to log in. Used to prevent exceptional log in cases, such as an empty form
  */
  validate = true;

  ngOnInit(): void {
  }


  /*
  * The function that validates the form and tries to log in
  */
  signIn() {
    try {

      if (this.email === '' || this.password === '') {
        this.validate = false;
      } else {
        this.authenticationService.SignIn(this.email, this.password);
        this.validate = true;
      }
      this.email = '';
      this.password = '';
    } catch (e) {
       this.validate = false;
    }
  }

  /*
  * Shows the password reset page and hides the login page
  */
  CallResetPassword() {
    this.data.visible = true;
  }

  /*
  * Returns the user that has just logged in
  */
  getAuth() {
    return this.authenticationService;
  }

  /*
  * Return the visible field of DataService
  */
  getVisible() {
    return this.data.visible;
  }
}
