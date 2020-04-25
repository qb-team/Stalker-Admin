/*
* Shows the number of users actually inside the organization's perimeter
*/
import { Component, OnInit, Input} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Organization, OrganizationPresenceCounter } from 'src/model/models';
import { PresenceService } from 'src/api/api';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-content-track-users-number',
  templateUrl: './content-track-users-number.component.html',
  styleUrls: ['./content-track-users-number.component.css']
})
export class ContentTrackUsersNumberComponent implements OnInit {
  @Input() private actualOrganization: Organization;
  UserNumber: OrganizationPresenceCounter;
  constructor(private ds: DataService, private ps: PresenceService, private activatedRoute: ActivatedRoute) { }


  get getAcutalOrganization(): Organization {
    return this.actualOrganization;
  }

  set setAcutalOrganization(value: Organization) {
    this.actualOrganization = value;
  }

  ngOnInit(): void {
     this.activatedRoute.data.subscribe((org: Organization) => { this.actualOrganization = org; } );
     this.ds.getOrganization.subscribe((org: Organization) => { this.actualOrganization = org; });
     this.ps.getOrganizationPresenceCounter(this.actualOrganization.id).subscribe((counter: OrganizationPresenceCounter) => {
       this.UserNumber = counter;
     });
  }

}
