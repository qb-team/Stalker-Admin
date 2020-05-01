/*
* Specific-content component to show data about user-tracking
*/
import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';
import {AdministratorDataService} from '../../../services/AdministratorData.service';
import {Map} from 'leaflet';


@Component({
  selector: 'app-content-track-users',
  templateUrl: './organization-tracking-area-content.component.html',
  styleUrls: ['./organization-tracking-area-content.component.css']
})
export class OrganizationTrackingAreaContentComponent implements OnInit {
  /*
  * The current organization selected
  */
  private currentOrganization: Organization;

  /*
  * The number of users currently inside the organization's perimeter
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

  private map: Map;
  private zoom: number;

  constructor( private ads: AdministratorDataService ) {
    console.log('Costruttore numero utenti');
  }

  receiveMap(map: Map) {
    this.map = map;
  }


  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  get getCurrentOrg(): Organization {
    return this.currentOrganization;

  }

  set setCurrentOrg(value: Organization) {
    this.currentOrganization = value;
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
  * Set presentUsersOrg at the number of the users currently inside the organization's perimeter
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
      this.currentOrganization = org;
      this.jsonCoordinates = this.currentOrganization.trackingArea;
      this.perimeterCoordinates = JSON.parse(this.jsonCoordinates).Organizzazioni;
    });
  }



}
