/*
 * Provider for shared data
*/
import { EventEmitter } from '@angular/core';
import { Organization } from 'src/model/models';

export class DataService {

  private org: EventEmitter<Organization>; // name of a organization selected
  private usersNumber: EventEmitter<number>;
  private activeContent: EventEmitter<string>; // content selected

  set setOrg(value: EventEmitter<Organization>) {
    this.setOrg = value;
  }

  set setUsersNumber(value: EventEmitter<number>) {
    this.setUsersNumber = value;
  }

  set setActiveContent(value: EventEmitter<string>) {
    this.setActiveContent = value;
  }
  get getActiveContent(): EventEmitter<string> {
    return this.activeContent;
  }
  get getUsersNumber(): EventEmitter<number> {
    return this.usersNumber;
  }
  get getOrganization(): EventEmitter<Organization> {
    return this.org;
  }
}
