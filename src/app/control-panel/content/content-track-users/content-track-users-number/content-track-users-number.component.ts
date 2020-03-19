/*
* Shows the number of users actually inside the organization's perimeter
*/
import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Organization, OrganizationPresenceCounter } from 'src/model/models';
import { PresenceService } from 'src/api/api';

@Component({
  selector: 'app-content-track-users-number',
  templateUrl: './content-track-users-number.component.html',
  styleUrls: ['./content-track-users-number.component.css']
})
export class ContentTrackUsersNumberComponent implements OnInit {
  @Input() org: Organization;
  UserNumber: OrganizationPresenceCounter;
  constructor(private ds: DataService, private ps: PresenceService) { }

  ngOnInit(): void {
     this.ds.org.subscribe((org: Organization) => { this.org = org; });
     this.ps.getOrganizationPresenceCounterById(this.org.id).subscribe((counter: OrganizationPresenceCounter) => {
       this.UserNumber = counter;
     });
  }

}
