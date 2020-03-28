/*
* Component for reset password
 */
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {DataService} from '../services/data.service';
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
  submitted = false;
  reset = false; // for show page of reset password
  email: string; // email for reset
  contactForm: FormGroup;
  ngOnInit(): void {
  }

  /*
  * Back in login page
   */
  back() {
    this.router.navigateByUrl('/Login');
    this.reset = false;
  }

  /*
  * It calls function ResetPassword of the service and updates status
  */
  resetPassword(click: any) {
    this.authenticationService.ResetPassword(this.email);
    this.reset = true;
  }

  createForm() {
    this.contactForm = new FormGroup({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email
      ]),
    });
  }

  onSubmit(): void {
    this.submitted = true;
  }
}
