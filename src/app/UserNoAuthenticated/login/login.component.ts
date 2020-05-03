/*
* Component that shows a form for the log in
* It contains inputs for username and password, a button to launch the log in function and a button to be redirected to the password reset page
*/
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {async} from 'rxjs/internal/scheduler/async';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  private Submitted = false;
  /*
  * The e-mail of the user that is logging in
  */
  private Email: string;

  /*
  * The password of the user that is logging in
  */
  private Password: string;


  /*
  * Used to validate the form when trying to log in. Used to prevent exceptional log in cases, such as an empty form
  */
  contactForm: FormGroup;

  ngOnInit(): void {
    this.setupLoginForm();
  }

  private setupLoginForm() {
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

  onSubmit(): void {
    this.Submitted = true;
  }

  /*
  * The function that validates the form and tries to log in
  */
 signIn() {
   console.log('Sign IN');
   this.authenticationService.signIn(this.Email, this.Password);
   this.authenticationService.userData.subscribe(
     (user) => {
       if (user) {
         localStorage.setItem('key', 'True');
       } });
  }

  /*
  * Shows the password reset page and hides the login page
  */
  callResetPassword() {
    this.router.navigateByUrl('/Reset');
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
