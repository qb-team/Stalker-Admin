/*
* A wrapper component to hold a content-specific component. Switching between functionalities will cause specific components to show or hide into this component
*/
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Organization } from 'src/model/models';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  /*
  * The actually selected organization
  */
  private actualOrganization: Organization;

  /*
  * The string used to decide witch specific-component has to be showed
  */
  private activeComponent: string;

  constructor( private ds: DataService ) { }


  get getOganization(): Organization {
    return this.actualOrganization;
  }

  set setOrganization(value: Organization) {
    this.actualOrganization = value;
  }

  get getAtiveComponent(): string {
    return this.activeComponent;
  }

  set setActiveComponent(value: string) {
    this.activeComponent = value;
  }
  /*
  * Subscribes to the organization service and to active_content, in order to retrive informations about the selected organization and dinamically update the specific-content component
  * Finally, it sets the active specific-component to the home page content component (content-home)
  */
  ngOnInit() {
    const dsOrg = this.ds.getOrganization;
    const dsAc = this.ds.getActiveContent;
    dsOrg.subscribe((org: Organization) => { this.actualOrganization = org; });
    dsAc.subscribe((activeContent: string) => { this.activeComponent = activeContent; });
    this.activeComponent = 'Home page';
  }

}
