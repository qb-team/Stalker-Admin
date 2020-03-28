/*
 * Provider for shared data
*/
import { EventEmitter } from '@angular/core';
import { Organization } from 'src/model/models';

export class DataService {
    org = new EventEmitter<Organization>(); // name of a organization selected
    users_number = new EventEmitter<number>();
    active_content = new EventEmitter<string>(); // content selected

}
