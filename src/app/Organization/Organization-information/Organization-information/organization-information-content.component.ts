import {Component, OnDestroy, OnInit} from '@angular/core';
import { Organization } from 'src/model/models';
import {ActivatedRoute} from '@angular/router';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-content-track-users-general-information',
  templateUrl: './organization-information-content.component.html',
  styleUrls: ['./organization-information-content.component.css']
})
export class OrganizationInformationContentComponent implements OnInit, OnDestroy {

  /*
  * The organization currently active
  */
 private currentOrganization: Organization;
 private subscriptionToOrg: Subscription;
  constructor(private ads: AdministratorOrganizationDataService, private activatedRoute: ActivatedRoute) { }

  get getCurrentOrg(): Organization {
    return this.currentOrganization;
  }

  set setCurrentOrg(value: Organization) {
    this.currentOrganization = value;
  }

  ngOnInit(): void {
    this.subscribeToOrganization();
  }

  subscribeToOrganization(): void {
    this.subscriptionToOrg = this.ads.getOrganization.subscribe((org: Organization) => { this.currentOrganization = org; });
  }

  ngOnDestroy() {
    this.subscriptionToOrg.unsubscribe();
  }
}
