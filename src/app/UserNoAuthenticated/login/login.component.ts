
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
/**
 * Component that shows a form for the log in.
 * It contains inputs for username and password, a button to launch the log in function and a button to be redirected to the password reset page
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   *  LoginComponent have dependencies with AuthenticationService, because it is used for authentication, and Router for manage the route for "Content-Panel" after authentication
   *  @param {AuthenticationService} authenticationService it is used for authentication
   *  @param {Router} router it allow to manage the route for "Content-Panel" after authentication
   */
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  /**
   *  It tell if the user clicked the button for login
   */
  private Submitted = false;
  /**
   * The e-mail of the user that is logging in
   */
  private Email: string;

  /**
   * The password of the user that is logging in
   */
  private Password: string;


  /**
   * Used to validate the form when trying to log in. Used to prevent exceptional log in cases, such as an empty form
   */
  contactForm: FormGroup;

  /**
   * Call method for setup form for authentication, after the constructor
   */
  ngOnInit(): void {
    this.setupLoginForm();
  }

  /**
   * Setup the login form's, fields email and password are required
   */
  public setupLoginForm(): void {
    this.contactForm = new FormGroup({
      email: new FormControl(this.Email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.Password, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  /**
   *  When form called it, it set value of Submitted in true
   */
  onSubmit(): void {
    this.Submitted = true;
  }

  /**
   * The function that validates the form and tries to log in
   */
 signIn() {
   this.authenticationService.signIn(this.Email, this.Password);
   this.authenticationService.userData.subscribe(
     (user) => {
       if (user) {
         localStorage.setItem('key', 'True');
       } });
  }

  /**
   * Shows the password reset page and hides the login page
   */
  callResetPassword() {
    this.router.navigateByUrl('/Reset');
  }

  /**
   * Returns the user that has just logged in
   */
  getAuth() {
    return this.authenticationService;
  }

  /**
   * Return value of Submitted
   * @returns true or false
   */
  get submitted(): boolean {
    return this.Submitted;
  }

  /**
   * set value of email
   * @param value {string} contain new value of Submitted
   */

  set submitted(value: boolean) {
    this.Submitted = value;
  }

  /**
   * Return value of email
   * @returns string
   */
  get email(): string {
    return this.Email;
  }

  /**
   * set value of email
   * @param value {string} contain new email address
   */
  set email(value: string) {
    this.Email = value;
  }

  /**
   * Return value of Password
   * @returns string
   */
  get password(): string {
    return this.Password;
  }

  /**
   * set value of email
   * @param value {string} contain new password
   */
  set password(value: string) {
    this.Password = value;
  }

}
