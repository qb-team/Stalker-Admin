/*
* Component for reset password
 */
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.createForm();
  }
  private _submitted = false;
  private _reset = false; // for show page of reset password
  private _email: string; // email for reset
  contactForm: FormGroup;


  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
  get reset(): boolean {
    return this._reset;
  }

  set reset(value: boolean) {
    this._reset = value;
  }
  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  ngOnInit(): void {
  }

  /*
  * Back in login page
   */
  back() {
    this.router.navigateByUrl('/Login');
    this._reset = false;
  }

  /*
  * It calls function ResetPassword of the service and updates status
  */
  resetPassword() {
    this.authenticationService.ResetPassword(this._email);
    this._reset = true;
  }

  createForm() {
    this.contactForm = new FormGroup({
      email: new FormControl(this._email, [
        Validators.required,
        Validators.email
      ]),
    });
  }

  onSubmit(): void {
    this._submitted = true;
  }
}
