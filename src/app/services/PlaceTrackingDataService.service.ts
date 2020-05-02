import {EventEmitter, Inject, Injectable} from '@angular/core';
import {AdministratorDataService} from './AdministratorData.service';
import {Organization, OrganizationPresenceCounter, PlacePresenceCounter, PresenceService} from '../..';
import {ReplaySubject} from 'rxjs';
import {TrackingDataServiceService} from './TrackingDataService.service';

@Injectable({
  providedIn: 'root'
})

export class PlaceTrackingDataServiceService extends TrackingDataServiceService {
  constructor(ps: PresenceService) {
    super(ps);
  }

  subscribePlacePresenceCounter(placeId: number): void {
    super.ps.getPlacePresenceCounter(placeId).subscribe((ppc: PlacePresenceCounter) => {
      this.getUsersNumber.next(ppc.counter);
    });
  }
}
