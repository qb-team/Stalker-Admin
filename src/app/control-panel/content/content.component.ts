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
  organization: Organization;

  /*
  * The string used to decide witch specific-component has to be showed
  */
  ac: string;

  constructor( private ds: DataService ) { }

  /*
  * Subscribes to the organization service and to active_content, in order to retrive informations about the selected organization and dinamically update the specific-content component
  * Finally, it sets the active specific-component to the home page content component (content-home)
  */
  ngOnInit() {
    this.ds.organization.subscribe((org: Organization) => { this.organization = org; });
    this.ds.active_content.subscribe((activeContent: string) => { this.ac = activeContent; });
    this.ac = 'Home page';
  }

}
