import {EventEmitter, Injectable} from '@angular/core';
import {Organization, Permission} from '../..';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdministratorDataService {
  private userPermissions: EventEmitter<Array<Permission>>;
  private adminOrganizations: EventEmitter<Array<Organization>>; // list of organizations that are accessible for the user
  private actualOrganization: ReplaySubject<Organization> = new ReplaySubject<Organization>(1);

  getUserPermissions(): EventEmitter<Array<Permission>> {
    return this.userPermissions;
  }

  getAdminOrganizations() {
    return this.adminOrganizations;
  }

  set setOrganization(value: ReplaySubject<Organization>) {
    this.actualOrganization = value;
  }

  get getOrganization(): ReplaySubject<Organization> {
    return this.actualOrganization;
  }

  /*
  * returns the list of observables of organizations accessible to the user
  */
  getAdministratorOrganizations() {
    return this.adminOrganizations;
  }
}
