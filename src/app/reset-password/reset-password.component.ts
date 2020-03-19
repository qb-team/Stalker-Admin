/*
* Component for reset password
 */
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private data: DataService) { }
  reset = false; // for show page of reset password
  email: string; // email for reset

  ngOnInit(): void {
  }

  /*
  * Back in login page
   */
  Back() {
    this.data.visible = false;
    this.reset = false;
  }

  /*
  * It calls function ResetPassword of the service and updates status
  */
  resetPassword(click: any) {
    this.authenticationService.ResetPassword(this.email);
    this.email = '';
    if (click.target.innerHTML === '') {
      this.reset = false;
    } else {
      this.reset = true;
    }
    this.authenticationService.signOk = true;
  }

  /*
   * It sets visibility of login page
   */
  getVisible() {
    return this.data.visible;
  }
}
