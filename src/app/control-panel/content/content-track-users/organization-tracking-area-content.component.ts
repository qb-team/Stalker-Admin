/*
* Specific-content component to show data about user-tracking
*/
import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';
import {AdministratorDataService} from '../../../services/AdministratorData.service';
import {icon, Map} from 'leaflet';
import * as L from 'leaflet';


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
  private markerIcon = icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',

    iconSize:     [50, 85], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  constructor( private ads: AdministratorDataService ) {
    console.log('Costruttore numero utenti');
  }

  receiveMap(map: Map) {
    this.map = map;
    L.marker([45.776047, 12.288832], {icon: this.markerIcon}).addTo(this.map);
    L.polygon([
      [45.776165, 12.288811],
      [45.776098, 12.288704],
      [45.776001, 12.288834],
      [45.776083, 12.288941]
    ]).addTo(this.map);
  }


  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }


  ngOnInit(): void {
    this.subscribeToOrganization();
  }

  subscribeToOrganization(): void {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
      this.jsonCoordinates = this.currentOrganization.trackingArea;
      this.perimeterCoordinates = JSON.parse(this.jsonCoordinates).Organizzazioni;
    });
    for (const coord of this.perimeterCoordinates) {
      console.log(coord.lat);
      break;
    }

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


}
