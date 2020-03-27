import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Organization } from 'src/model/models';

@Component({
  selector: 'app-content-track-users-general-information',
  templateUrl: './content-track-users-general-information.component.html',
  styleUrls: ['./content-track-users-general-information.component.css']
})
export class ContentTrackUsersGeneralInformationComponent implements OnInit {

  /*
  * The organization currently active
  */
 @Input() org: Organization;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    this.ds.org.subscribe((org: Organization) => { this.org = org; });
  }

}
