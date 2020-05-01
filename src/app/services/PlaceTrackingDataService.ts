import {EventEmitter, Inject, Injectable} from '@angular/core';
import {AdministratorDataService} from './AdministratorData.service';
import {Organization, OrganizationPresenceCounter, PlacePresenceCounter, PresenceService} from '../..';
import {ReplaySubject} from 'rxjs';
import {TrackingDataService} from './TrackingDataService';

@Injectable({
  providedIn: 'root'
})

export class PlaceTrackingDataService extends TrackingDataService {
  constructor(ps: PresenceService) {
    super(ps);
  }

  subscribePlacePresenceCounter(placeId: number): void {
    super.ps.getPlacePresenceCounter(placeId).subscribe((ppc: PlacePresenceCounter) => {
      this.getUsersNumber.next(ppc.counter);
    });
  }
}
