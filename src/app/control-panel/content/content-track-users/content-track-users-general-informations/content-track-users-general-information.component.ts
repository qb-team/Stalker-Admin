import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';
import {ActivatedRoute} from '@angular/router';
import {AdministratorDataService} from '../../../../services/AdministratorData.service';

@Component({
  selector: 'app-content-track-users-general-information',
  templateUrl: './content-track-users-general-information.component.html',
  styleUrls: ['./content-track-users-general-information.component.css']
})
export class ContentTrackUsersGeneralInformationComponent implements OnInit {

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
