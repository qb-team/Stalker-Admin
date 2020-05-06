import {AdministratorOrganizationDataService} from './AdministratorOrganizationData.service';
import {Organization, OrganizationPresenceCounter, PresenceService} from '../..';
import {ReplaySubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export abstract class TrackingDataService {
  private usersNumber: ReplaySubject<number> = new ReplaySubject<number>();
  protected constructor(protected ps: PresenceService) {
    console.log('TS: ' + this.ps);
  }

  get getUsersNumber(): ReplaySubject<number> {
    return this.usersNumber;
  }
}
