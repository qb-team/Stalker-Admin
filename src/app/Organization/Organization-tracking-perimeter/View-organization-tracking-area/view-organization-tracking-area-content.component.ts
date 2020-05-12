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

    iconSize:    [20, 50], // size of the icon
    iconAnchor:   [10, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 40],  // the same for the shadow
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
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.jsonCoordinates = org.trackingArea;
      this.map.panTo([JSON.parse(this.jsonCoordinates).Organizzazioni[0].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[2].long]);
      this.map.zoomIn(9);
      L.marker([JSON.parse(this.jsonCoordinates).Organizzazioni[0].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[0].long], {icon: this.markerIcon}).addTo(this.map);
      L.polygon([
        [JSON.parse(this.jsonCoordinates).Organizzazioni[0].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[0].long],
        [JSON.parse(this.jsonCoordinates).Organizzazioni[1].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[1].long],
        [JSON.parse(this.jsonCoordinates).Organizzazioni[2].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[2].long],
        [JSON.parse(this.jsonCoordinates).Organizzazioni[3].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[3].long]
      ]).addTo(this.map);
    });
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
