import {EventEmitter, Inject, Injectable} from '@angular/core';
import {AdministratorOrganizationDataService} from './AdministratorOrganizationData.service';
import {Organization, OrganizationPresenceCounter, PlacePresenceCounter, PresenceService} from '../..';
import {ReplaySubject, Subscription} from 'rxjs';
import {TrackingDataService} from './TrackingData.service';

@Injectable({
  providedIn: 'root'
})

export class PlaceTrackingDataService extends TrackingDataService {
  currentPlaceSubscription: Subscription;
  constructor(ps: PresenceService) {
    super(ps);
  }

  subscribePlacePresenceCounter(placeId: number): void {
    if (this.currentPlaceSubscription != null) {
      this.currentPlaceSubscription.unsubscribe();
    }
    this.currentPlaceSubscription = this.ps.getPlacePresenceCounter(placeId).subscribe((ppc: PlacePresenceCounter) => {
      this.getUsersNumber.next(ppc.counter);
    });
  }
}
