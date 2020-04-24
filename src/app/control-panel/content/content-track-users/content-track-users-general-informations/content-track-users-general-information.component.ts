import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Organization } from 'src/model/models';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private ds: DataService, private activatedRoute: ActivatedRoute) { console.log('Costruttore general info'); }

  get getActualOrg(): Organization {
    return this.actualOrganization;
  }

  set setActualOrg(value: Organization) {
    this.actualOrganization = value;
  }

  ngOnInit(): void {
    console.log('SUBSCRIBE');
    this.ds.getOrganization.subscribe((org: Organization) => { this.actualOrganization = org; });
  }

}
