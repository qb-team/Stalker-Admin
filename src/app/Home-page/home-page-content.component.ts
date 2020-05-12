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
  constructor(private ads: AdministratorOrganizationDataService) { }

  get getCurrentOrganization(): Organization {
    return this.currentOrganization;
  }

  ngOnInit(): void {
    this.subscribeToOrganization();
  }

  subscribeToOrganization(): void {
    this.ads.getOrganization.subscribe((org: Organization) => { this.currentOrganization = org; });
  }
}
