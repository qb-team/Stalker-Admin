/*
* Shows minimal informations about the interface usage
*/
import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';
import {AdministratorDataService} from '../../../services/AdministratorData.service';

@Component({
  selector: 'app-content-home',
  templateUrl: './home-page-content.component.html',
  styleUrls: ['./home-page-content.component.css']
})
export class HomePageContentComponent implements OnInit {
  private currentOrganization: Organization;
  constructor(private ads: AdministratorDataService) { }

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
