import {AdministratorOrganizationDataService} from './AdministratorOrganizationData.service';
import {Organization, OrganizationPresenceCounter, PresenceService} from '../..';
import {ReplaySubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export abstract class TrackingDataService {
  private usersNumber: ReplaySubject<number>;
  constructor(protected ps: PresenceService) { this.usersNumber = new ReplaySubject<number>(); }

  get getUsersNumber(): ReplaySubject<number> {
    return this.usersNumber;
  }
}
