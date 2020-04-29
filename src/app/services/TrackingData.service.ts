import {EventEmitter} from '@angular/core';

export class TrackingDataService {

  private usersNumber: EventEmitter<number>;

  get getUsersNumber(): EventEmitter<number> {
    return this.usersNumber;
  }
}
