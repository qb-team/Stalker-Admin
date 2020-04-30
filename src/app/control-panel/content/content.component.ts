/*
* A wrapper component to hold a content-specific component. Switching between functionalities will cause specific components to show or hide into this component
*/
import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/model/models';
import {ActivatedRoute} from '@angular/router';
import {AdministratorDataService} from '../../services/AdministratorData.service';

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

  constructor( private ads: AdministratorDataService, private activatedRoute: ActivatedRoute ) { console.log('Constructor content component'); }


  get getOganization(): Organization {
    return this.actualOrganization;
  }

  set setOrganization(value: Organization) {
    this.actualOrganization = value;
  }
  /*
  * Subscribes to the organization service and to active_content, in order to retrive informations about the selected organization and dinamically update the specific-content component
  * Finally, it sets the active specific-component to the home page content component (content-home)
  */
  ngOnInit() {
    this.ads.getOrganization.subscribe((o: Organization) => {this.actualOrganization = o; });
    console.log('Content: ' + this.actualOrganization);
  }

}
