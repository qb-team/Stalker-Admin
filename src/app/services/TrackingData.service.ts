import {AdministratorOrganizationDataService} from './AdministratorOrganizationData.service';
import {Organization, OrganizationPresenceCounter, PresenceService} from '../..';
import {Observable} from 'rxjs';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export abstract class TrackingDataService {
  private usersNumber: EventEmitter<number> = new EventEmitter<number>();
  protected constructor(protected ps: PresenceService) {
    console.log('TS: ' + this.ps);
  }

  get getUsersNumber(): EventEmitter<number> {
    return this.usersNumber;
  }
}
