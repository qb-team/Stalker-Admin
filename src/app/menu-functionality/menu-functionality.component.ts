/*
* A side-menu that offers all the functionalities available for the administrator on the current organization
*/
import {Component, OnInit} from '@angular/core';
import { AdministratorOrganizationDataService } from '../services/AdministratorOrganizationData.service';
import {Router} from '@angular/router';
import {Organization, Permission} from '../../index';
import {AdministratorPermissionDataService} from '../services/AdministratorPermissionData.service';

@Component({
  selector: 'app-menu-functionality',
  templateUrl: './menu-functionality.component.html',
  styleUrls: ['./menu-functionality.component.css']
})
export class MenuFunctionalityComponent implements OnInit {
  private currentOrganization: Organization;
  private index = 0;
  private permession: Permission[] = [];
  constructor(private ads: AdministratorOrganizationDataService, private apd: AdministratorPermissionDataService, private router: Router ) { }
  /*
 * Subscribes to the service 'DataService' to retrive the current specific-component to be showed
 */
  ngOnInit(): void {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.router.navigateByUrl('Content-panel/Panel/Homepage');
      localStorage.removeItem('perm');
      this.currentOrganization = org;
      this.apd.getUserPermissions().subscribe((perm: Permission[]) => {
        this.permession = perm;
      });
      this.refresch();
    });
  }

  updateContent(click: any) {
    let route = click.target.innerHTML;
    route = route.replace(/ /g, '_');
    this.router.navigateByUrl('/Content-panel/Panel/' + route);
  }

  refresch() {
    let flag = false;
    if (this.currentOrganization != null) {
      for (let i = 0; i < this.permession.length && !flag; i++) {
        if (this.permession[i].organizationId === this.currentOrganization.id) {
          this.index = i;
          flag = true;
        }
      }
      if (this.permession !== undefined && this.permession.length > this.index) {
        localStorage.setItem('perm', this.permession[this.index].permission.toString());
      }
    }
  }
  get Index(): number {
    return this.index;
  }

  get getCurrentOrganization(): Organization {
    return this.currentOrganization;
  }

  get Permession(): Permission[] {
    return this.permession;
  }
}
