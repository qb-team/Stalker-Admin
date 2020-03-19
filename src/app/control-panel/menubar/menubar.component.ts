/*
 * Vertical menu in the panel control
 */
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { OrganizationService } from 'src/api/api';
import { Organization } from 'src/model/models';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  organization: Organization;
  orgArr: Array<Organization>;
  constructor(private ds: DataService, private authenticationService: AuthenticationService, private os: OrganizationService) {  }

  /*
   * Initialization and refresh the list of organization
   */
  ngOnInit() {
    this.os.getOrganizationList().subscribe((obs: Array<Organization>) => {
      this.orgArr = obs, this.organization = this.orgArr[0];
      this.ds.org.emit(this.organization);
    });
  }

  /*
   * It updates the name of organization selected
   */
  setOrg(click: any) {
    this.organization = this.orgArr[click.target.attributes.id.value];
    this.ds.org.emit(this.organization);
  }

  /*
   * It calls function SignOut of the service
   */
  SignOut() {
    this.authenticationService.SignOut();
  }

  /*
   * It updates value of active_content for show Home page
   */
  homePage() {
    this.ds.active_content.emit('Home page');
  }
}
