import {PresenceService} from '../..';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export abstract class TrackingDataService {
  private usersNumber: EventEmitter<number> = new EventEmitter<number>();
  protected constructor(protected ps: PresenceService) {
  }

  get getUsersNumber(): EventEmitter<number> {
    return this.usersNumber;
  }
}
