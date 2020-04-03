/*
 * Provider for shared data
*/
import { EventEmitter } from '@angular/core';
import { Organization } from 'src/model/models';

export class DataService {
  get active_content(): EventEmitter<string> {
    return this.activeContent;
  }
  get users_number(): EventEmitter<number> {
    return this.usersNumber;
  }
  get organization(): EventEmitter<Organization> {
    return this.org;
  }
    private org = new EventEmitter<Organization>(); // name of a organization selected
    private usersNumber = new EventEmitter<number>();
    private activeContent = new EventEmitter<string>(); // content selected
}
