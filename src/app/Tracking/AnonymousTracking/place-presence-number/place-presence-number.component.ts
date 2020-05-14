import { Component, OnInit } from '@angular/core';
import {Organization, Place, PlaceService} from '../../../..';
import {Subscription} from 'rxjs';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PlaceTrackingDataService} from '../../../services/PlaceTrackingData.service';

@Component({
  selector: 'app-place-presence-number',
  templateUrl: './place-presence-number.component.html',
  styleUrls: ['./place-presence-number.component.css']
})
export class PlacePresenceNumberComponent implements OnInit {
  private currentOrganization: Organization;
  refreshTimer;
  private trackedUsersCounter: number;
  private subscriptionToOrgPresenceCounter: Subscription;
  PlaceArr: Array<Place>;
  private currentPlace: Place;
  constructor(private tds: PlaceTrackingDataService, private plS: PlaceService, private ads: AdministratorOrganizationDataService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadPlaceList();
    console.log('ngOnInit content track user number');
  }

  loadPlaceList() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
      this.plS.getPlaceListOfOrganization(org.id).subscribe((places: Array<Place>) => {
        this.PlaceArr = places;
      });
    });
  }

  setPlace(click: any) {
    this.currentPlace = this.PlaceArr[click.target.attributes.id.value];
    console.log(this.currentPlace);
    this.subscribeToCounter();
    this.ads.getOrganization.subscribe((o: Organization) => {
      this.currentOrganization = o;
      this.tds.subscribePlacePresenceCounter(this.currentPlace.id);
    });
    this.subscribeToNavigationEvents();
    this.setCounterRefreshInterval(5000);
  }

  subscribeToNavigationEvents(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd && ev.urlAfterRedirects !== this.router.getCurrentNavigation().initialUrl) {
        console.log('DISTRUGGO UPDATE ORA');
        clearInterval(this.refreshTimer);
      }
    });
  }

  subscribeToCounter(): void {
    console.log('subscribtion requested');
    this.subscriptionToOrgPresenceCounter = this.tds.getUsersNumber.subscribe((n: number) => {
      this.trackedUsersCounter = n;
      console.log('subscribtion resolved');
    });
  }

  setCounterRefreshInterval(ms: number): void {
    this.refreshTimer = setInterval(() => {
      this.subscriptionToOrgPresenceCounter.unsubscribe();
      this.tds.subscribePlacePresenceCounter(this.currentPlace.id);
      console.log('Updated subscription');
    }, ms);
  }

  get getCurrentOrganization(): Organization {
    return this.currentOrganization;
  }

  set setCurrentOrganization(value: Organization) {
    this.currentOrganization = value;
  }

  get CurrentPlace(): Place {
    return this.currentPlace;
  }

  set CurrentPlace(value: Place) {
    this.currentPlace = value;
  }
  get TrackedUsersCounter(): number {
    return this.trackedUsersCounter;
  }

  set TrackedUsersCounter(value: number) {
    this.trackedUsersCounter = value;
  }
}
