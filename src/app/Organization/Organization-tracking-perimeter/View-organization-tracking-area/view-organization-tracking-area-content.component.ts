/*
* Specific-content component to show data about user-tracking
*/
import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Organization, Place} from 'src/model/models';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {icon, LatLng, latLng, Map, MapOptions, Polygon, tileLayer} from 'leaflet';
import * as L from 'leaflet';
import {ReplaySubject, Subscription} from 'rxjs';
import {PlaceService} from '../../../..';


@Component({
  selector: 'app-content-track-users',
  templateUrl: './view-organization-tracking-area-content.component.html',
  styleUrls: ['./view-organization-tracking-area-content.component.css']
})
export class ViewOrganizationTrackingAreaContentComponent implements OnInit, OnDestroy {
  /*
  * The current organization selected
  */
  private currentOrganization: Organization;

  /*
  * A string to store the coordinates of the organization's perimeter in json format
  */
  private jsonCoordinates: string;
  private jsonCoordinatesPlace: string;
  /*
  * The coordinates of the organization's perimeter
  */
  private perimeterCoordinates: string;
  private subscriptionToOrg: Subscription;
  private map: Map;
  private zoom: number;
  PlaceArr: Array<Place>;
  private change = 'organization';
  private name: string;
  private polOrg = L.polygon([]);
  private currentPlace: ReplaySubject<Place> = new ReplaySubject<Place>(1);

  private markerIcon = icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',

    iconSize:    [20, 50], // size of the icon
    iconAnchor:   [10, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 40],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

  });

  constructor( private ads: AdministratorOrganizationDataService, private plS: PlaceService ) {
    this.loadPlaceList();
  }

  receiveMap(map: Map) {
    this.map = map;
    this.subscriptionToOrg = this.ads.getOrganization.subscribe((org: Organization) => {
      if (org !== null) {
        this.jsonCoordinates = org.trackingArea;
        this.map.panTo([JSON.parse(this.jsonCoordinates).Organizzazioni[3].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[3].long]);
        this.map.zoomIn(9);
       // L.marker([JSON.parse(this.jsonCoordinates).Organizzazioni[0].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[0].long], {icon: this.markerIcon}).addTo(this.map);
        this.polOrg.setLatLngs([]);
        this.polOrg.addTo(this.map);
        for (let i = 0; i < JSON.parse(this.jsonCoordinates).Organizzazioni.length; i++) {
          this.polOrg.addLatLng([JSON.parse(this.jsonCoordinates).Organizzazioni[i].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[i].long]);
        }
      }
    });
    this.currentPlace.subscribe( (place: Place) => {
      this.jsonCoordinatesPlace = place.trackingArea;
      this.map.panTo([JSON.parse(this.jsonCoordinatesPlace).Organizzazioni[0].lat, JSON.parse(this.jsonCoordinatesPlace).Organizzazioni[0].long]);
    //  L.marker([JSON.parse(this.jsonCoordinates).Organizzazioni[0].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[0].long], {icon: this.markerIcon}).addTo(this.map);
      this.polOrg.setLatLngs([]);
      this.polOrg.addTo(this.map);
      for (let i = 0; i < JSON.parse(this.jsonCoordinatesPlace).Organizzazioni.length; i++) {
        this.polOrg.addLatLng([JSON.parse(this.jsonCoordinatesPlace).Organizzazioni[i].lat, JSON.parse(this.jsonCoordinatesPlace).Organizzazioni[i].long]);
      }
    });
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  ngOnDestroy() {
    this.subscriptionToOrg.unsubscribe();
  }

  ngOnInit(): void {
  }

  loadPlaceList() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      if (org != null) {
        this.currentOrganization = org;
        this.plS.getPlaceListOfOrganization(org.id).subscribe((places: Array<Place>) => {
          this.PlaceArr = places;
        });
      }
    });
  }

  loadMap(e: string) {
    for (let i = 0; i < JSON.parse(this.jsonCoordinates).Organizzazioni.length; i++) {
      this.polOrg.addLatLng([JSON.parse(e).Organizzazioni[i].lat, JSON.parse(e).Organizzazioni[i].long]);
    }
  }

  setPlace(click: any) {
    this.currentPlace.next(this.PlaceArr[click.target.attributes.id.value]);
    this.name = this.PlaceArr[click.target.attributes.id.value].name;
  }

  onChange(val: string) {
    this.change = val;
    if (val === 'organization') {
      this.polOrg.setLatLngs([]);
      this.loadMap(this.currentOrganization.trackingArea);
    }
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

  get Change(): string {
    return this.change;
  }

  set Change(value: string) {
    this.change = value;
  }

  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }
}
