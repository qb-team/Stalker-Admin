import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';
import {ActivatedRoute} from '@angular/router';
import {AdministratorDataService} from '../../../../../services/AdministratorData.service';

@Component({
  selector: 'app-content-track-users-general-information',
  templateUrl: './organization-information-content.component.html',
  styleUrls: ['./organization-information-content.component.css']
})
export class OrganizationInformationContentComponent implements OnInit {

  /*
  * The organization currently active
  */
 private actualOrganization: Organization;

  constructor(private ads: AdministratorDataService, private activatedRoute: ActivatedRoute) { console.log('Costruttore general info'); }

  get getActualOrg(): Organization {
    return this.actualOrganization;
  }

  set setActualOrg(value: Organization) {
    this.actualOrganization = value;
  }

  ngOnInit(): void {
    this.subscribeToOrganization();
  }

  subscribeToOrganization(): void {
    this.ads.getOrganization.subscribe((org: Organization) => { this.actualOrganization = org; });
  }

}
