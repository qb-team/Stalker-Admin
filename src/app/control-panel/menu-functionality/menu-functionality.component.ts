/*
* A side-menu that offers all the functionalities available for the administrator on the current organization
*/
import {Component, DoCheck, EventEmitter, OnInit} from '@angular/core';
import { AdministratorOrganizationDataService } from '../../services/AdministratorOrganizationData.service';
import {Router} from '@angular/router';
import {Organization} from '../../..';

@Component({
  selector: 'app-menu-functionality',
  templateUrl: './menu-functionality.component.html',
  styleUrls: ['./menu-functionality.component.css']
})
export class MenuFunctionalityComponent implements OnInit/*, DoCheck*/ {

private currentOrganization: Organization;
  constructor(private ads: AdministratorOrganizationDataService, private router: Router ) { }

  get getCurrentOrganization(): Organization {
    return this.currentOrganization;
  }

  set setCurrentOrganization(value: Organization) {
    this.currentOrganization = value;
  }
  /*
 * Subscribes to the service 'DataService' to retrive the current specific-component to be showed
 */
  ngOnInit(): void {
    this.ads.getOrganization.subscribe((org: Organization) => { this.currentOrganization = org; });
  }

  /*ngDoCheck(): void {
    this.ads.getOrganization.subscribe((org: Organization) => { this.currentOrganization = org; });
  }*/

  updateContent(click: any) {
    this.router.navigateByUrl('/Content-panel/Panel/' + click.target.innerHTML);
  }
}
