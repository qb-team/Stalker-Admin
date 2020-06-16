import {Injectable} from '@angular/core';
import {PlacePresenceCounter, PresenceService} from '../..';
import {Subscription} from 'rxjs';
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
      this.getUsersNumber.emit(ppc.counter);
    });
  }
}
