import {Injectable} from '@angular/core';
import {Organization, OrganizationService, Permission} from '../..';
import {ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdministratorOrganizationDataService {
  private adminOrganizations: ReplaySubject<Array<Organization>> = new ReplaySubject<Array<Organization>>(); // list of organizations that are accessible for the user
  private currentOrganization: ReplaySubject<Organization> = new ReplaySubject<Organization>(1);

  constructor(private os: OrganizationService, private router: Router) {
  }

  requireAdministratorOrganizations(perm: Array<Permission>) {
    const organizationList = new Array<Organization>();
    let remainingOrgs = 0;
    for (const i of perm) {
      this.os.getOrganization(i.organizationId).subscribe((o: Organization) => {
        organizationList.push(o);
        remainingOrgs++;
        if (remainingOrgs === perm.length) {
          this.adminOrganizations.next(this.sortOrganizationsById(organizationList));
          this.router.navigateByUrl('/Content-panel');
        }
      });
  }
  }

  sortOrganizationsById(orgs: Array<Organization>): Array<Organization> {
    const orgsToRet =  orgs.sort((o1, o2) => {
      if (o1.id > o2.id) {
        return 1;
      }
      if (o1.id < o2.id) {
        return -1;
      }
      return 0;
    });
    return orgsToRet;
  }

  get getAdminOrganizations(): ReplaySubject<Array<Organization>> {
    return this.adminOrganizations;
  }

  set setOrganization(value: ReplaySubject<Organization>) {
    this.currentOrganization = value;
  }

  get getOrganization(): ReplaySubject<Organization> {
    return this.currentOrganization;
  }

}
