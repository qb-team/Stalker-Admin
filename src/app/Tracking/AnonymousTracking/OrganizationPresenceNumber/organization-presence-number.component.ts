/*
* Shows the number of users currently inside the organization's perimeter
*/
import { Component, OnInit, Input} from '@angular/core';
import { Organization, OrganizationPresenceCounter } from 'src/model/models';
import { PresenceService } from 'src/api/api';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {OrganizationTrackingDataService} from '../../../services/OrganizationTrackingData.service';
import {Subscriber, Subscription} from 'rxjs';
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
  constructor(private tds: OrganizationTrackingDataService, private ads: AdministratorOrganizationDataService, private activatedRoute: ActivatedRoute, private router: Router) { }


  get getCurrentOrganization(): Organization {
    return this.currentOrganization;
  }

  set setCurrentOrganization(value: Organization) {
    this.currentOrganization = value;
  }

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
  }

  setCounterRefreshInterval(ms: number): void {
    this.refreshTimer = setInterval(() => {
      this.subscriptionToOrgPresenceCounter.unsubscribe();
      this.tds.subscribeOrganizationPresenceCounter(this.currentOrganization.id);
      console.log('Updated subscription');
    }, ms);
  }

}
