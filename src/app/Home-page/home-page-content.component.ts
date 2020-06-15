/*
* Shows minimal informations about the interface usage
*/
import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/model/models';
import {AdministratorOrganizationDataService} from '../services/AdministratorOrganizationData.service';

@Component({
  selector: 'app-content-home',
  templateUrl: './home-page-content.component.html',
  styleUrls: ['./home-page-content.component.css']
})
export class HomePageContentComponent implements OnInit {
  private currentOrganization: Organization;
  hasSomePermissions = false;
  constructor(private ads: AdministratorOrganizationDataService) { }

  /*
  return to the selected organization
   */
  get getCurrentOrganization(): Organization {
    return this.currentOrganization;
  }
  /*
  Get the current organization and check if the adminstrator has organizations
   */
  ngOnInit(): void {
    this.subscribeToOrganization();
    this.ads.getAdminOrganizations.subscribe((orgs: Array<Organization>) => {
      if (orgs !== undefined) {
        this.hasSomePermissions = true;
      } else {
        this.hasSomePermissions = false;
      }
    });
  }
  /*
  Get the current organization
   */
  subscribeToOrganization(): void {
    this.ads.getOrganization.subscribe((org: Organization) => { this.currentOrganization = org; });
  }
}
