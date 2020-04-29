/*
 * Provider for shared data
*/
import { EventEmitter } from '@angular/core';
import { Organization } from 'src/model/models';
import {Observable, ReplaySubject} from 'rxjs';

export class DataService {

  // org: EventEmitter<Organization>; // name of a organization selected
  private adminOrganizations: EventEmitter<Array<Organization>>; // list of organizations that are accessible for the user
  private actualOrganization: ReplaySubject<Organization> = new ReplaySubject<Organization>(1);






}
