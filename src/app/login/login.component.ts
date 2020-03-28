/*
* Component that shows a form for the log in
* It contains inputs for username and password, a button to launch the log in function and a button to be redirected to the password reset page
*/
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {DataService} from '../services/data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService, private data: DataService, private router: Router) {
    this.createForm();
  }

  submitted = false;
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
  contactForm: FormGroup;

  ngOnInit(): void {
  }

  createForm() {
    this.contactForm = new FormGroup({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(8)
      ]),
    });
  }

  onSubmit(): void {
    this.submitted = true;
  }

  /*
  * The function that validates the form and tries to log in
  */
  signIn() {
        this.authenticationService.SignIn(this.email, this.password);
        if (this.getAuth().userData) {
          this.navigateToContentPanel();
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

  navigateToContentPanel() {
    this.router.navigateByUrl('/Content-panel');
  }
}
