/*
* Shows minimal informations about the interface usage
*/
import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';
import {AdministratorDataService} from '../../../services/AdministratorData.service';

@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.css']
})
export class ContentHomeComponent implements OnInit {
  private actualOrganization: Organization;
  constructor(private ads: AdministratorDataService) { }

  get getAcutalOrganization(): Organization {
    return this.actualOrganization;
  }

  ngOnInit(): void {
    this.subscribeToOrganization();
  }

  subscribeToOrganization(): void {
    this.ads.getOrganization.subscribe((org: Organization) => { this.actualOrganization = org; });
  }
}
