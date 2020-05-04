/*
* Specific-content component to show data about user-tracking
*/
import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {icon, latLng, Map, MapOptions, tileLayer} from 'leaflet';
import * as L from 'leaflet';


@Component({
  selector: 'app-content-track-users',
  templateUrl: './view-organization-tracking-area-content.component.html',
  styleUrls: ['./view-organization-tracking-area-content.component.css']
})
export class ViewOrganizationTrackingAreaContentComponent implements OnInit {
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
  private perimeterCoordinates: string;

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
  TrackMap: MapOptions = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 1,
      maxZoom: 19,
      minZoom: 8.5,
      detectRetina: true,
    })],
    zoom: 1,
    center: latLng(42.471967891443384, 13.573022878267201)
  };

  constructor( private ads: AdministratorOrganizationDataService ) {
    console.log('Costruttore numero utenti');
  }

  receiveMap(map: Map) {
    this.map = map;
    this.map.panTo([JSON.parse(this.jsonCoordinates).Organizzazioni[0].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[2].long]);
    this.map.zoomIn(9);
    console.log(this.perimeterCoordinates.toString());
    console.log(JSON.parse(this.jsonCoordinates).Organizzazioni[0].lat);
    L.marker([JSON.parse(this.jsonCoordinates).Organizzazioni[0].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[2].long], {icon: this.markerIcon}).addTo(this.map);
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
