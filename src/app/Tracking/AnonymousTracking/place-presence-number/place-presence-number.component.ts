import { Component, OnInit } from '@angular/core';
import {Organization, Place, PlaceService} from '../../../..';
import {Subscription} from 'rxjs';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PlaceTrackingDataService} from '../../../services/PlaceTrackingData.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-place-presence-number',
  templateUrl: './place-presence-number.component.html',
  styleUrls: ['./place-presence-number.component.css']
})
export class PlacePresenceNumberComponent implements OnInit {
  private currentOrganization: Organization;
  refreshTimer;
  private trackedUsersCounter: number;
  private subscriptionToPlacePresenceCounter: Subscription;
  PlaceArr: Array<Place>;
  private currentPlace: Place;
  private ctx;
  private presenceChart;
  chartData: number[] = [];
  chartLabels: string[] = [];

  constructor(private tds: PlaceTrackingDataService, private plS: PlaceService, private ads: AdministratorOrganizationDataService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscribeToCounter();
    this.loadPlaceList();
    console.log('ngOnInit content track user number');
    this.subscribeToNavigationEvents();
    this.setCounterRefreshInterval(5000);
    this.ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.presenceChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Utenti attualmente presenti',
          data: this.chartData,
        }]
      },
      options: {
        elements: {
          line: {
            tension: 0,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              maxTicksLimit: 13,
              min: 0,
            }
          }]
        }
      }
    });
  }

  loadPlaceList() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.PlaceArr = [];
      this.trackedUsersCounter = null;
      this.currentPlace = undefined;
      if (org != null) {
        this.currentOrganization = org;
        this.plS.getPlaceListOfOrganization(org.id).subscribe((places: Array<Place>) => {
          this.PlaceArr = places;
        });
      }
    });
  }

  setPlace(click: any) {
    while (this.chartData.length > 0) {
      this.chartData.pop();
    }
    while (this.chartLabels.length > 0) {
      this.chartLabels.pop();
    }
    this.currentPlace = this.PlaceArr[click.target.attributes.id.value];
    console.log(this.currentPlace);
    this.ads.getOrganization.subscribe((o: Organization) => {
      this.currentOrganization = o;
      this.tds.subscribePlacePresenceCounter(this.currentPlace.id);
    });
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
    this.subscriptionToPlacePresenceCounter = this.tds.getUsersNumber.subscribe((n: number) => {
      this.trackedUsersCounter = n;
      console.log('subscribtion resolved');
      if (this.chartData.length > 10) {

        this.chartData.shift();
        this.chartLabels.shift();
      }
      this.chartData.push(this.trackedUsersCounter);
      const d = new Date();
      this.chartLabels.push('' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '');
      this.presenceChart.update();
    });
  }

  setCounterRefreshInterval(ms: number): void {
    this.refreshTimer = setInterval(() => {
      this.tds.subscribePlacePresenceCounter(this.currentPlace.id);
      this.subscriptionToPlacePresenceCounter.unsubscribe();
      this.subscribeToCounter();
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
