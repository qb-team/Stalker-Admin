/*
* Shows the number of users currently inside the organization's perimeter
*/
import { Component, OnInit} from '@angular/core';
import { Organization } from 'src/model/models';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {OrganizationTrackingDataService} from '../../../services/OrganizationTrackingData.service';
import { Subscription} from 'rxjs';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';

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

  chartOptions = {
    // responsive: true
    scales: {
      yAxes: [{
        ticks: {
          max: 50,
          min: 0,
          stepSize: 1
        }
      }]
    }
  };

  chartData: number[] = [];
  chartLabels: string[] = [];
  ctx = document.getElementById('myChart');
  c = new Chart(this.ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  constructor(private tds: OrganizationTrackingDataService, private ads: AdministratorOrganizationDataService, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    console.log('ngOnInit content track user number');
    this.subscribeToCounter();
    this.ads.getOrganization.subscribe((o: Organization) => {
      this.currentOrganization = o;
      this.tds.subscribeOrganizationPresenceCounter(o.id);
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
    if (this.chartData.length > 10) {
      /*for (let i = this.chartData.length; i > 0 ; i--) {
        this.chartData.pop();
        this.chartLabels.pop();
      }*/
      this.chartData.shift();
      this.chartLabels.shift();
      this.chartData.shift();
      this.chartLabels.shift();
    }
    this.chartData.push(this.trackedUsersCounter);
    console.log(this.chartData.toString());
   // document.getElementsByName('canvas');
    const d = new Date();
    this.chartLabels.push(d.getHours().toString());
  }

  setCounterRefreshInterval(ms: number): void {
    this.refreshTimer = setInterval(() => {
      this.subscriptionToOrgPresenceCounter.unsubscribe();
      this.tds.subscribeOrganizationPresenceCounter(this.currentOrganization.id);
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
