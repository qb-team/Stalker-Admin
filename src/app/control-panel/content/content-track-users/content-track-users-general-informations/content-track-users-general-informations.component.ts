import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Organization } from 'src/model/models';

@Component({
  selector: 'app-content-track-users-general-informations',
  templateUrl: './content-track-users-general-informations.component.html',
  styleUrls: ['./content-track-users-general-informations.component.css']
})
export class ContentTrackUsersGeneralInformationsComponent implements OnInit {

  /*
  * The organization currently active
  */
 @Input() org: Organization;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    this.ds.org.subscribe((org: Organization) => { this.org = org; });
  }

}
