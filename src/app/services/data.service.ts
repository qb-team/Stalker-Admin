/*
 * Provider for shared data
*/
import { EventEmitter } from '@angular/core';
import { Organization } from 'src/model/models';
import {ReplaySubject} from 'rxjs';

export class DataService {

  // org: EventEmitter<Organization>; // name of a organization selected
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
}
