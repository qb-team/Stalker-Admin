/*
* show the control panel
 */
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  /*
   * Create the object authenticationService to use the service AuthenticationService
   */
  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  /*
   * Return the object authenticationService that is, the authenticated user
   */
  getAuth() {
    return this.authenticationService;
  }
}
