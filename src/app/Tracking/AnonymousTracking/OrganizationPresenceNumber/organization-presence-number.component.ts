/*
* Shows the number of users currently inside the organization's perimeter
*/
import { Component, OnInit} from '@angular/core';
import { Organization } from 'src/model/models';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {OrganizationTrackingDataService} from '../../../services/OrganizationTrackingData.service';
import { Subscription} from 'rxjs';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-content-track-users-number',
  templateUrl: './organization-presence-number.component.html',
  styleUrls: ['./organization-presence-number.component.css']
})
export class OrganizationPresenceNumberComponent implements OnInit {
  private currentOrganization: Organization;
  refreshTimer;
  trackedUsersCounter: number;
  private subscriptionToOrgPresenceCounter: Subscription;
  ctx;
  presenceChart;

  chartData: number[] = [];
  chartLabels: string[] = [];

  constructor(private tds: OrganizationTrackingDataService, private ads: AdministratorOrganizationDataService, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    console.log('ngOnInit content track user number');
    this.subscribeToCounter();
    this.ads.getOrganization.subscribe((o: Organization) => {
      this.currentOrganization = o;
      //console.log('Org: ' + o + o.id);
      if (this.currentOrganization !== undefined) {
        this.tds.subscribeOrganizationPresenceCounter(this.currentOrganization.id);
      }
    });
    this.subscribeToNavigationEvents();
    this.setCounterRefreshInterval(5000);


    this.ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.presenceChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Utenti attualmente presenti',
          data: this.chartData
        }]
      },
      options: {
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
      if (this.chartData.length > 10) {

        this.chartData.shift();
        this.chartLabels.shift();
      }
      this.chartData.push(this.trackedUsersCounter);
      console.log(this.chartData.toString());
      const d = new Date();
      this.chartLabels.push(d.getHours().toString());
      this.presenceChart.update();
    });
  }

  setCounterRefreshInterval(ms: number): void {
    this.refreshTimer = setInterval(() => {
      this.tds.subscribeOrganizationPresenceCounter(this.currentOrganization.id);
      this.subscriptionToOrgPresenceCounter.unsubscribe();
      console.log('Subscription is now: ' + this.subscriptionToOrgPresenceCounter);
      this.subscribeToCounter();
      console.log('Updated subscription');
    }, ms);
  }

  onChartClick(event) {
    console.log(event);
  }

  get getCurrentOrganization(): Organization {
    return this.currentOrganization;
  }

  set setCurrentOrganization(value: Organization) {
    this.currentOrganization = value;
  }
}
