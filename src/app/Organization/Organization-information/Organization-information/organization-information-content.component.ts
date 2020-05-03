import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';
import {ActivatedRoute} from '@angular/router';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';

@Component({
  selector: 'app-content-track-users-general-information',
  templateUrl: './organization-information-content.component.html',
  styleUrls: ['./organization-information-content.component.css']
})
export class OrganizationInformationContentComponent implements OnInit {

  /*
  * The organization currently active
  */
 private currentOrganization: Organization;

  constructor(private ads: AdministratorOrganizationDataService, private activatedRoute: ActivatedRoute) { console.log('Costruttore general info'); }

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
    this.ads.getOrganization.subscribe((org: Organization) => { this.currentOrganization = org; });
  }

}
