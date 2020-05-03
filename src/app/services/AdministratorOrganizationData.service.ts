import {EventEmitter, Injectable} from '@angular/core';
import {Organization} from '../..';
import { ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdministratorOrganizationDataService {
  private adminOrganizations: ReplaySubject<Array<Organization>> = new ReplaySubject<Array<Organization>>(); // list of organizations that are accessible for the user
  private currentOrganization: ReplaySubject<Organization> = new ReplaySubject<Organization>(1);


  /*
* returns the list of observables of organizations accessible to the user
*/
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
