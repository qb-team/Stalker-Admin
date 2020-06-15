import {Component, OnDestroy, OnInit} from '@angular/core';
import {Organization, Place, PlaceService} from '../../../..';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {icon, LeafletMouseEvent, Map} from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-place-management-content',
  templateUrl: './place-management-content.component.html',
  styleUrls: ['./place-management-content.component.css']
})
export class PlaceManagementContentComponent implements OnInit, OnDestroy {

  private currentOrganization: Organization; // contain current organization
  private change = 'create'; // allow to show the correct form
  private select = false; // allow to show the correct button
  private name: string; // contain the name of place
  PlaceArr: Array<Place>; // contain a list of places of organization
  private currentPlace: Place; // contain current place
  private jsonCoordinates: string; // The coordinates of the organization's perimeter
  private subscriptionToOrg: Subscription;
  private map: Map; // contain th object that represent a interactive map
  private zoom: number; // contain current zoom
  private Arltn: number[] = []; // contain a list of latitudes
  private Arlong: number[] = []; // contain a list of longitudes
  private markers = []; // contain a list of markers of the map
  modifyForm: FormGroup;
  private markerIcon = icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',

    iconSize:    [20, 50], // size of the icon
    iconAnchor:   [10, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 40],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

  });
  constructor(private ads: AdministratorOrganizationDataService, private plS: PlaceService) { }
  /*
  load list of places and setup form
   */
  ngOnInit(): void {
    this.loadPlaceList();
    this.setupModifyForm();
  }
/*
load a list of places
 */
  loadPlaceList() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.PlaceArr = [];
      this.currentPlace = undefined;
      this.currentOrganization = org;
      if (org != null) {
        this.plS.getPlaceListOfOrganization(org.id).subscribe((places: Array<Place>) => {
          this.PlaceArr = places;
          this.ads.getCurrentOrganizationPlaces.next(places);
          if (this.PlaceArr != null) {
            this.currentPlace = places[0];
          } else {
            this.onChange('create');
          }
        });
      }
    });
  }
/*
Set the current place
 */
  setPlace(click: any) {
    this.currentPlace = this.PlaceArr[click.target.attributes.id.value];
  }
/*
Setup form for modify data of a place
 */
  private setupModifyForm() {
    this.modifyForm = new FormGroup({
      Name: new FormControl(this.name, [Validators.required]),
    });
  }

  /*
   Modify data of place of organization through API method
  */
  onModify() {
    const tmpName = this.currentPlace.name;
    this.currentPlace.name = this.name;
    this.plS.updatePlace(this.currentPlace).subscribe(() => {
        alert('Modifica del luogo effettuata.');
      }, (err: HttpErrorResponse) => {
      this.currentPlace.name = tmpName;
      if (err.status === 400) {
          alert('Errore. I dati inseriti non sono validi');
        } else {
          alert(err.message);
        }
      } );
    this.name = null;
  }

  /*
  Remove points from the map
   */
  resetP() {
    for (let i = 0; i < this.Arltn.length; i++) {
      this.map.removeLayer(this.markers[i]);
    }
    this.Arltn = [];
    this.Arlong = [];
    this.markers = [];
  }
  /*
  Remove last point from the map
   */
  removeLastMarker() {
    this.map.removeLayer(this.markers[this.markers.length - 1]);
    this.Arltn.pop();
    this.Arlong.pop();
    this.markers.pop();
  }
  /*
   change value of this.change
   */
  onChange(val: string) {
    this.change = val;
  }
  /*
  Remove data of place of organization through API method
   */
  onRemove() {
    if (this.PlaceArr != null) {
      if (confirm('Stai per eliminare ' + this.currentPlace.name + '. Continuare?')) {
          this.plS.deletePlace(this.currentPlace.id).subscribe(() => {
            this.loadPlaceList();
            alert('Eliminazione del nuovo luogo effettuata.');
          }, (err: HttpErrorResponse) => {
            if (err.status === 400) {
              alert('Errore');
            } else {
              alert(err.message);
            }
          });
      }
    }
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
/*
receive last clink on the map
 */
  onMapClick(e: LeafletMouseEvent) {
    if (this.select) {
      this.Arltn.push(e.latlng.lat);
      this.Arlong.push(e.latlng.lng);
      const m = L.marker([e.latlng.lat, e.latlng.lng], {icon: this.markerIcon}).addTo(this.map);
      this.markers.push(m);
    }
  }
  /*
  Create data of place of organization through API method
   */
  onCreate() {
    const newPlace: Place = {
      id: null,
      name: this.name,
      organizationId: this.currentOrganization.id,
      trackingArea: null,
    };
    if (this.Arltn.length >= 3) {
      let track: string = '{\n' + '"Organizzazioni": [\n';
      for (let i = 0; i + 1 < this.Arltn.length; i++) {
        track = track.concat('{\n' + '"lat": "' + this.Arltn[i] + '",\n "long": "' + this.Arlong[i] + '"\n},\n');
      }
      track = track.concat('{\n' + '"lat": "' + this.Arltn[this.Arltn.length - 1] + '",\n "long": "' + this.Arlong[this.Arltn.length - 1] + '"\n}\n]\n}');
      newPlace.trackingArea = track;
      this.resetP();
      this.plS.createNewPlace(newPlace).subscribe(() => {
        this.name = undefined;
        this.loadPlaceList();
        alert('Creazione del nuovo luogo effettuata.');
          }, (err: HttpErrorResponse) => {
        if (err.status === 400) {
          alert('Errore. I dati inseriti non sono validi');
        } else {
          alert(err.message);
        }
      });
      this.select = false;
    } else {
      alert('Errore inserisci almeno 3 punti');
    }
  }

  get Markers(): any[] {
    return this.markers;
  }

  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
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
  get CurrentPlace(): Place {
    return this.currentPlace;
  }

  get Select(): boolean {
    return this.select;
  }

  set Select(value: boolean) {
    this.select = value;
  }
}
