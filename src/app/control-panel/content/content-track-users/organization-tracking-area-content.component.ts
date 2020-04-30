/*
* Specific-content component to show data about user-tracking
*/
import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';
import {AdministratorDataService} from '../../../services/AdministratorData.service';


@Component({
  selector: 'app-content-track-users',
  templateUrl: './organization-tracking-area-content.component.html',
  styleUrls: ['./organization-tracking-area-content.component.css']
})
export class OrganizationTrackingAreaContentComponent implements OnInit {
  /*
  * The actual organization selected
  */
  private actualOrganization: Organization;

  /*
  * The number of users actually inside the organization's perimeter
  */
  private presentUsersOrg;

  /*
  * An observable of an organization
  */
  private organization: Organization;

  /*
  * A string to store the coordinates of the organization's perimeter in json format
  */
  private jsonCoordinates: string;

  /*
  * The coordinates of the organization's perimeter
  */
  private perimeterCoordinates;

  constructor( private ads: AdministratorDataService ) {
  console.log('Costruttore numero utenti');
  }

  get getActualOrg(): Organization {
    return this.actualOrganization;
  }

  set setActualOrg(value: Organization) {
    this.actualOrganization = value;
  }

  get getPresentUsersOrg() {
    return this.presentUsersOrg;
  }

  set setPresentUsersOrg(value) {
    this.presentUsersOrg = value;
  }

  get geOrganization(): Organization {
    return this.organization;
  }

  set setOrganization(value: Organization) {
    this.organization = value;
  }

  get getJsonCoordinates(): string {
    return this.jsonCoordinates;
  }

  set setJsonCoordinates(value: string) {
    this.jsonCoordinates = value;
  }

  get getPerimeterCoordinates() {
    return this.perimeterCoordinates;
  }

  set setPerimeterCoordinates(value) {
    this.perimeterCoordinates = value;
  }
  /*
  * Set presentUsersOrg at the number of the users actually inside the organization's perimeter
  */
 /* getUsers() {
    // fetches data from the database

    // todo
  }*/

  ngOnInit(): void {
    this.subscribeToOrganization();
  }

  subscribeToOrganization(): void {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.actualOrganization = org;
      this.jsonCoordinates = this.actualOrganization.trackingArea;
      this.perimeterCoordinates = JSON.parse(this.jsonCoordinates).Organizzazioni;
    });
  }



}