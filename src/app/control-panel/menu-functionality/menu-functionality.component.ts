/*
* A side-menu that offers all the functionalities available for the administrator on the current organization
*/
import {Component, DoCheck, EventEmitter, OnInit} from '@angular/core';
import { AdministratorDataService } from '../../services/AdministratorData.service';
import {Router} from '@angular/router';
import {Organization} from '../../..';

@Component({
  selector: 'app-menu-functionality',
  templateUrl: './menu-functionality.component.html',
  styleUrls: ['./menu-functionality.component.css']
})
export class MenuFunctionalityComponent implements OnInit, DoCheck {

private actualOrganization: Organization;
  constructor(private ads: AdministratorDataService, private router: Router ) { }

  get getAcutalOrganization(): Organization {
    return this.actualOrganization;
  }

  set setAcutalOrganization(value: Organization) {
    this.actualOrganization = value;
  }
  /*
 * Subscribes to the service 'DataService' to retrive the actual specific-component to be showed
 */
  ngOnInit(): void {
    this.ds.getOrganization.subscribe((org: Organization) => { this.actualOrganization = org; });
  }

  ngDoCheck(): void {
    this.ds.getOrganization.subscribe((org: Organization) => { this.actualOrganization = org; });
  }

  updateContent(click: any) {
    this.router.navigateByUrl('/Content-panel/Panel/' + click.target.innerHTML);
  }
}
