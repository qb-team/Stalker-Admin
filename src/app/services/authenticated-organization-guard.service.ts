import {Router, CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AdministratorOrganizationDataService} from './AdministratorOrganizationData.service';
import {Organization} from '../..';

@Injectable({
  providedIn: 'root'
})

export class AuthenticatedOrganizationGuardService implements CanActivate {
  currentOrg: Organization;

  constructor(private router: Router, private aods: AdministratorOrganizationDataService) {
    this.aods.getOrganization.subscribe((org: Organization) => {this.currentOrg = org;});
  }

  canActivate(): Observable<boolean> |  Promise<boolean> | boolean {
    console.log(this.currentOrg.trackingMode);
    if (this.currentOrg.trackingMode === 'authenticated') {
      return true;
    } else {
      this.router.navigateByUrl('/Content-panel');
      return false;
    }
  }
}
