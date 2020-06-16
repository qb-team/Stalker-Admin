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


  private currentOrganization: Organization; // The current organization selected
  private jsonCoordinates: string; // A string to store the coordinates of the organization's perimeter in json format
  private jsonCoordinatesPlace: string; // A string to store the coordinates of the place's perimeter in json format
  private subscriptionToOrg: Subscription;
  private map: Map; // contain th object that represent a interactive map
  private zoom: number; // contain current zoom
  PlaceArr: Array<Place>; // contain a list of places of organization
  private placeName: string; // contain current place
  private change = 'organization'; // allow to show the correct form
  private polOrg = L.polygon([]); // contain a list of points that compose a polygon area
  private currentPlace: ReplaySubject<Place> = new ReplaySubject<Place>(1);
  private currentPlaceArrIndex = -1;

  constructor( private ads: AdministratorOrganizationDataService, private plS: PlaceService ) {
  }
  /*
  Receive the data from the map
   */
  receiveMap(map: Map) {
    this.map = map;
    this.subscriptionToOrg = this.ads.getOrganization.subscribe((org: Organization) => {
      if (org !== null) {
        this.jsonCoordinates = org.trackingArea;
        this.map.panTo([JSON.parse(this.jsonCoordinates).Organizzazioni[3].lat, JSON.parse(this.jsonCoordinates).Organizzazioni[3].long]);
        this.map.zoomIn(9);
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
      this.polOrg.setLatLngs([]);
      this.polOrg.addTo(this.map);
      for (let i = 0; i < JSON.parse(this.jsonCoordinatesPlace).Organizzazioni.length; i++) {
        this.polOrg.addLatLng([JSON.parse(this.jsonCoordinatesPlace).Organizzazioni[i].lat, JSON.parse(this.jsonCoordinatesPlace).Organizzazioni[i].long]);
      }
    });
  }
  /*
  Receive a new zoom on the map
 */
  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }
  /*
  Destroy a subscription
  */
  ngOnDestroy() {
    if (this.subscriptionToOrg !== undefined) {
      this.subscriptionToOrg.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadPlaceList();
  }
  /*
  Load a list of places
 */
  loadPlaceList() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.PlaceArr = [];
      this.placeName = null;
      if (org != null) {
        this.currentOrganization = org;
        this.plS.getPlaceListOfOrganization(org.id).subscribe((places: Array<Place>) => {
          this.PlaceArr = places;
        });
      }
    });
  }
  /*
  Load the organization tracking area's or place tracking area's in the map
   */
  loadMap(e: string) {
    for (let i = 0; i < JSON.parse(this.jsonCoordinates).Organizzazioni.length; i++) {
      this.polOrg.addLatLng([JSON.parse(e).Organizzazioni[i].lat, JSON.parse(e).Organizzazioni[i].long]);
    }
  }

  /*
  Set the current place
 */
  setPlace(click: any) {
    this.currentPlaceArrIndex = click.target.attributes.id.value;
    this.currentPlace.next(this.PlaceArr[this.currentPlaceArrIndex]);
    this.placeName = this.PlaceArr[this.currentPlaceArrIndex].name;
  }
  /*
  set the correct view
   */
  onChange(val: string) {
    this.change = val;
    if (val === 'organization') {
      this.polOrg.setLatLngs([]);
      this.loadMap(this.currentOrganization.trackingArea);
    } else {
      if (this.currentPlaceArrIndex >= 0) {
        this.currentPlace.next(this.PlaceArr[this.currentPlaceArrIndex]);
        this.placeName = this.PlaceArr[this.currentPlaceArrIndex].name;
      }
    }
  }


  get getCurrentOrg(): Organization {
    return this.currentOrganization;

  }

  get Change(): string {
    return this.change;
  }

  set Change(value: string) {
    this.change = value;
  }

  get getPlaceName(): string {
    return this.placeName;
  }
}
