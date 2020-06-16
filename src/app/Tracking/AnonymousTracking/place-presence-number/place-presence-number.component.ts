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
  private currentOrganization: Organization; // contain the current organization
  refreshTimer; // time for refresh
  private trackedUsersCounter: number; // number of user into place
  private subscriptionToPlacePresenceCounter: Subscription;
  PlaceArr: Array<Place>; // contain a list of places of organization
  private currentPlace: Place; // contain the current place
  private ctx;
  private presenceChart; // contain the tacking char
  chartData: number[] = []; // contain the data of the tacking char
  chartLabels: string[] = [];  // contain the labels of the tacking char

  constructor(private tds: PlaceTrackingDataService, private plS: PlaceService, private ads: AdministratorOrganizationDataService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscribeToCounter();
    this.loadPlaceList();
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
  /*
  Load a list of places
 */
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
  /*
 Set the current place
*/
  setPlace(click: any) {
    while (this.chartData.length > 0) {
      this.chartData.pop();
    }
    while (this.chartLabels.length > 0) {
      this.chartLabels.pop();
    }
    this.currentPlace = this.PlaceArr[click.target.attributes.id.value];
    this.ads.getOrganization.subscribe((o: Organization) => {
      this.currentOrganization = o;
      if (this.currentPlace !== undefined) {
        this.tds.subscribePlacePresenceCounter(this.currentPlace.id);
      }
    });
  }
  /*
  Subscribe to event route
   */
  subscribeToNavigationEvents(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd && ev.urlAfterRedirects !== this.router.getCurrentNavigation().initialUrl) {
        clearInterval(this.refreshTimer);
      }
    });
  }
  /*
  Subscribe to counter of user into place
   */
  subscribeToCounter(): void {
    this.subscriptionToPlacePresenceCounter = this.tds.getUsersNumber.subscribe((n: number) => {
      this.trackedUsersCounter = n;
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
  /*
  Set refresh interval of the counter
   */
  setCounterRefreshInterval(ms: number): void {
    this.refreshTimer = setInterval(() => {
      if (this.PlaceArr !== undefined && this.PlaceArr !== null && this.PlaceArr.length > 0 && this.currentPlace !== undefined) {
        this.tds.subscribePlacePresenceCounter(this.currentPlace.id);
        this.subscriptionToPlacePresenceCounter.unsubscribe();
        this.subscribeToCounter();
      }
    }, ms);
  }

  get getCurrentOrganization(): Organization {
    return this.currentOrganization;
  }

  get CurrentPlace(): Place {
    return this.currentPlace;
  }

  get TrackedUsersCounter(): number {
    return this.trackedUsersCounter;
  }

}
