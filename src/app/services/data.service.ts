/*
 * Provider for shared data
*/
import { EventEmitter } from '@angular/core';
import { Organization } from 'src/model/models';
import {Observable, ReplaySubject} from 'rxjs';

export class DataService {

  // org: EventEmitter<Organization>; // name of a organization selected
  private userOrganizations: Array<Organization>; // list of organizations that are accessible for the user
  private org: ReplaySubject<Organization> = new ReplaySubject<Organization>(1);
  private usersNumber: EventEmitter<number>;

  set setOrganization(value: ReplaySubject<Organization>) {
    this.org = value;
  }

  set setUsersNumber(value: EventEmitter<number>) {
    this.usersNumber = value;
  }

  get getUsersNumber(): EventEmitter<number> {
    return this.usersNumber;
  }
  get getOrganization(): ReplaySubject<Organization> {
    return this.org;
  }
  /*
  * add an organization to the list of organizations accessible to the user
  */
  addOrganization(org: Organization) {
    this.userOrganizations.push(org);
  }

  /*
  * returns the list of observables of organizations accessible to the user
  */
  getUserOrganizations() {
    return this.userOrganizations;
  }
}
