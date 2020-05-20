import {AdministratorPermissionDataService} from './AdministratorPermissionData.service';
import {Router, CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Organization, Permission} from '../..';
import {AdministratorOrganizationDataService} from './AdministratorOrganizationData.service';

@Injectable({
  providedIn: 'root'
})

export class OwnerGuardService implements CanActivate {
  private value: boolean;
  constructor(private apd: AdministratorPermissionDataService, private aod: AdministratorOrganizationDataService, private router: Router) {}

  canActivate(): Observable<boolean> |  Promise<boolean> | boolean {
    console.log('perm');
    this.aod.getOrganization.subscribe((org: Organization) => {
      this.apd.getUserPermissions().subscribe((perm: Permission[]) => {
        let flag = false;
        let index = 0;
        console.log('subsub');
        for (let i = 0; i < perm.length && !flag; i++) {
          if (perm[i].organizationId === org.id) {
            console.log(org.name);
            console.log(perm[i].organizationId + perm[i].permission);
            index = i;
            flag = true;
          }
        }
        localStorage.setItem('perm', perm[index].permission.toString());
        if (perm[index].permission === 3) {
          console.log('CanActivate: true because flag from localStorage (key) === true');
        } else {
          console.log('Back to login because cannot activate');
        }
      });
    });
    // const flag = localStorage.getItem('key');
    if (localStorage.getItem('perm') === '3') {
      return true;
    } else {
      this.router.navigateByUrl('/Content-panel');
      return false;
    }
  }
}
