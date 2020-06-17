import {Component, OnDestroy, OnInit} from '@angular/core';
import {Organization, OrganizationService, Place, PlaceService} from '../../../..';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {icon, latLng, LeafletMouseEvent, Map} from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-modify-place-tracking-area-content',
  templateUrl: './modify-organization-tracking-area-content.component.html',
  styleUrls: ['./modify-organization-tracking-area-content.component.css']
})
export class ModifyOrganizationTrackingAreaContentComponent implements OnInit, OnDestroy {

  private currentOrganization: Organization; // A string to store the coordinates of the organization's perimeter in json format
  private jsonCoordinates: string; // The coordinates of the organization's perimeter
  private subscriptionToOrg: Subscription;
  private map: Map; // contain th object that represent a interactive map
  private zoom: number; // contain current zoom
  private Arltn: number[] = []; // contain a list of latitudes
  private Arlong: number[] = []; // contain a list of longitudes
  private change = false; // allow to show the correct form
  private markers = []; // contain a list of markers of the map
  private markerIcon = icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',

    iconSize:    [20, 50], // size of the icon
    iconAnchor:   [10, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 40],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

  }); // setup style of the marker

  constructor( private ads: AdministratorOrganizationDataService, private orgS: OrganizationService) {
  }

  ngOnInit(): void {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
    });
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
  Receive last clink on the map
 */
  onMapClick(e: LeafletMouseEvent) {
    if (this.change) {
      this.Arltn.push(e.latlng.lat);
      this.Arlong.push(e.latlng.lng);
      const m = L.marker([e.latlng.lat, e.latlng.lng], {icon: this.markerIcon}).addTo(this.map);
      this.markers.push(m);
    }
  }
  /*
  Update the organization tracking perimeter's
   */
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
      this.orgS.updateOrganizationTrackingArea(this.currentOrganization.id, track).subscribe(() => {
          const d = new Date();
          alert('Modifica al perimetro dell\'organizzazione effettuata.');
          this.currentOrganization.lastChangeDate = d;
          this.currentOrganization.trackingArea = track;
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

  get getCurrentOrg(): Organization {
    return this.currentOrganization;

  }

  get Change(): boolean {
    return this.change;
  }

  set Change(value: boolean) {
    this.change = value;
  }

  get Markers(): any[] {
    return this.markers;
  }

}
