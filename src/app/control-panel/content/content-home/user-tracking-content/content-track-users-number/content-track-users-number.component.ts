/*
* Shows the number of users actually inside the organization's perimeter
*/
import { Component, OnInit, Input} from '@angular/core';
import { Organization, OrganizationPresenceCounter } from 'src/model/models';
import { PresenceService } from 'src/api/api';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {OrganizationTrackingDataService} from '../../../../../services/OrganizationTrackingData.service';
import {Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-content-track-users-number',
  templateUrl: './content-track-users-number.component.html',
  styleUrls: ['./content-track-users-number.component.css']
})
export class ContentTrackUsersNumberComponent implements OnInit {
  @Input() private actualOrganization: Organization;
  refreshTimer;
  trackedUsersCounter: number;
  private subscriptionToOrgPresenceCounter: Subscription;
  constructor(private tds: OrganizationTrackingDataService, private activatedRoute: ActivatedRoute, private router: Router) { }


  get getAcutalOrganization(): Organization {
    return this.actualOrganization;
  }

  set setAcutalOrganization(value: Organization) {
    this.actualOrganization = value;
  }

  ngOnInit(): void {
    console.log('ngOnInit content track user number');
    this.subscribeToNavigationEvents();
    this.subscribeToOrganizationPresenceCounter();
    this.setCounterRefreshInterval();
  }

  subscribeToNavigationEvents(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd && ev.urlAfterRedirects !== this.router.getCurrentNavigation().initialUrl) {
        console.log('DISTRUGGO UPDATE ORA');
        clearInterval(this.refreshTimer);
      }
    });
  }

  subscribeToOrganizationPresenceCounter(): void {
    console.log('subscribtion requested');
    this.subscriptionToOrgPresenceCounter = this.tds.getUsersNumber.subscribe((n: number) => {
      this.trackedUsersCounter = n;
      console.log('subscribtion resolved');
    });
  }

  setCounterRefreshInterval(): void {
    this.refreshTimer = setInterval(() => {
      this.subscriptionToOrgPresenceCounter.unsubscribe();
      this.tds.subscribeOrganizationPresenceCounter();
      console.log('Updated subscription');
    }, 5000);
  }

}
