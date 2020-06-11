import {Component, OnDestroy, OnInit} from '@angular/core';
import {Organization, OrganizationService, Place, PlaceService} from '../../../..';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {icon, LeafletMouseEvent, Map} from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-modify-place-tracking-area-content',
  templateUrl: './modify-place-tracking-area-content.component.html',
  styleUrls: ['./modify-place-tracking-area-content.component.css']
})
export class ModifyPlaceTrackingAreaContentComponent implements OnInit, OnDestroy {

  private currentOrganization: Organization;
  /*
  * A string to store the coordinates of the organization's perimeter in json format
  */
  private jsonCoordinates: string;
  /*
  * The coordinates of the organization's perimeter
  */
  private subscriptionToOrg: Subscription;
  private map: Map;
  private zoom: number;
  private Arltn: number[] = [];
  private Arlong: number[] = [];
  private change = false;
  private markers = [];
  PlaceArr: Array<Place>;
  private currentPlace: Place;
  private markerIcon = icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',

    iconSize:    [20, 50], // size of the icon
    iconAnchor:   [10, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 40],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

  });

  constructor( private ads: AdministratorOrganizationDataService, private plS: PlaceService ) {
  }

  ngOnInit(): void {
    this.loadPlaceList();
  }

  loadPlaceList() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.PlaceArr = [];
      this.currentOrganization = org;
      if (org != null) {
        this.plS.getPlaceListOfOrganization(org.id).subscribe((places: Array<Place>) => {
          this.PlaceArr = places;
          if (places !== undefined && places !== null) {
             this.currentPlace = places[0];
           }
        });
      }
    });
  }

  setPlace(click: any) {
    this.currentPlace = this.PlaceArr[click.target.attributes.id.value];
  }

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

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  ngOnDestroy() {
    if (this.subscriptionToOrg !== undefined) {
      this.subscriptionToOrg.unsubscribe();
    }
  }

  onMapClick(e: LeafletMouseEvent) {
    if (this.change) {
      this.Arltn.push(e.latlng.lat);
      this.Arlong.push(e.latlng.lng);
      const m = L.marker([e.latlng.lat, e.latlng.lng], {icon: this.markerIcon}).addTo(this.map);
      this.markers.push(m);
    }
  }

  onModify() {
    if (this.Arltn.length >= 3) {
      let track: string = '{\n' + '"Organizzazioni": [\n';
      for (let i = 0; i + 1 < this.Arltn.length; i++) {
        track = track.concat('{\n' + '"lat": "' + this.Arltn[i] + '",\n "long": "' + this.Arlong[i] + '"\n},\n');
      }
      if (this.Arltn.length >= 1) {
        track = track.concat('{\n' + '"lat": "' + this.Arltn[this.Arltn.length - 1] + '",\n "long": "' + this.Arlong[this.Arltn.length - 1] + '"\n}\n]\n}');
      }
      this.resetP();
      const tmp = this.currentPlace;
      tmp.trackingArea = track;
      this.plS.updatePlace(tmp).subscribe(() => {
          alert('Modifica al perimetro del luogo dell\'organizzazione effettuata.');
          this.currentPlace.trackingArea = track;
        },
        (err: HttpErrorResponse) => {
          if (err.status === 400) {
            alert('Errore. I dati inseriti non sono validi, l\'area di tracciamento inserita è troppo grande');
          } else {
            alert(err.message);
          }
        });
      this.change = false;
    } else {
      alert('Errore inserisci almeno 3 punti');
    }
  }

  resetP() {
    for (let i = 0; i < this.Arltn.length; i++) {
      this.map.removeLayer(this.markers[i]);
    }
    this.Arltn = [];
    this.Arlong = [];
    this.markers = [];
  }

  removeLastMarker() {
    this.map.removeLayer(this.markers[this.markers.length - 1]);
    this.Arltn.pop();
    this.Arlong.pop();
    this.markers.pop();
  }

  get getCurrentOrg(): Organization {
    return this.currentOrganization;

  }

  get Change(): boolean {
    return this.change;
  }

  set Change(value: boolean) {
    this.change = value;
  }

  get CurrentPlace(): Place {
    return this.currentPlace;
  }

  get Markers(): any[] {
    return this.markers;
  }

  set Markers(value: any[]) {
    this.markers = value;
  }
}
