import {Component, OnDestroy, OnInit} from '@angular/core';
import {Organization, OrganizationDeletionRequest, Place, PlaceService} from '../../../..';
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
  private currentOrganization: Organization;
  newPlace: Organization;
  private change = 'create';
  private select = false;
  private name: string;
  PlaceArr: Array<Place>;
  private currentPlace: Place;
  private jsonCoordinates: string;
  /*
  * The coordinates of the organization's perimeter
  */
  private subscriptionToOrg: Subscription;
  private map: Map;
  private zoom: number;
  private Arltn: number[] = [];
  private Arlong: number[] = [];
  modifyForm: FormGroup;
  private markerIcon = icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',

    iconSize:    [20, 50], // size of the icon
    iconAnchor:   [10, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 40],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor

  });

  // createForm: FormGroup;
  constructor(private ads: AdministratorOrganizationDataService, private plS: PlaceService) { }

  ngOnInit(): void {
    this.loadPlaceList();
    this.setupModifyForm();
  }

  loadPlaceList() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
      if (org != null) {
        this.plS.getPlaceListOfOrganization(org.id).subscribe((places: Array<Place>) => {
          this.PlaceArr = places;
          if (this.PlaceArr != null) {
            this.currentPlace = places[0];
          } else {
            this.onChange('create');
          }
        });
      }
    });
  }

  setPlace(click: any) {
    this.currentPlace = this.PlaceArr[click.target.attributes.id.value];
  }

  private setupModifyForm() {
    this.modifyForm = new FormGroup({
      Name: new FormControl(this.name, [Validators.required]),
    });
  }

  onModify() {
    const modPlace = this.currentPlace;
    modPlace.name = this.name;
    this.plS.updatePlace(modPlace).subscribe(() => {
        this.currentPlace = modPlace;
        alert('Modifica del luogo effettuata.');
      }, (err: HttpErrorResponse) => {
        if (err.status === 400) {
          alert('Errore. I dati inseriti non sono validi');
        } else {
          alert(err.message);
        }
      } );
    this.name = null;
  }

  onChange(val: string) {
    this.change = val;
  }

  onRemove() {
    if (this.PlaceArr != null) {
      if (confirm('Stai per eliminare ' + this.currentPlace.name + '. Continuare?')) {
          this.plS.deletePlace(this.currentPlace.id).subscribe(() => {});
          this.loadPlaceList();
      }
    }
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
    if (this.select) {
      this.Arltn.push(e.latlng.lat);
      this.Arlong.push(e.latlng.lng);
      L.marker([e.latlng.lat, e.latlng.lng], {icon: this.markerIcon}).addTo(this.map);
      console.log('nel modify ' + e.latlng.lat, e.latlng.lng);
    }
  }

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
      this.plS.createNewPlace(newPlace).subscribe(() => {
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

  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }

  get getCurrentOrg(): Organization {
    return this.currentOrganization;
  }

  set setCurrentOrg(value: Organization) {
    this.currentOrganization = value;
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

  set CurrentPlace(value: Place) {
    this.currentPlace = value;
  }

  get Select(): boolean {
    return this.select;
  }

  set Select(value: boolean) {
    this.select = value;
  }
}
