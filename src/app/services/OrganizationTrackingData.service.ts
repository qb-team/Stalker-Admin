import {Injectable} from '@angular/core';
import {OrganizationPresenceCounter, PresenceService} from '../..';
import {Subscription} from 'rxjs';
import {TrackingDataService} from './TrackingData.service';

@Injectable({
  providedIn: 'root'
})

export class OrganizationTrackingDataService extends TrackingDataService {
  currentOrgSubscription: Subscription;
  constructor(protected ps: PresenceService) {
    super(ps);
  }

  subscribeOrganizationPresenceCounter(orgId: number): void {
    if (this.currentOrgSubscription != null) {
      this.currentOrgSubscription.unsubscribe();
    }
    this.currentOrgSubscription = this.ps.getOrganizationPresenceCounter(orgId).subscribe((opc: OrganizationPresenceCounter) => {
      this.getUsersNumber.emit(opc.counter);
    });
  }
}
