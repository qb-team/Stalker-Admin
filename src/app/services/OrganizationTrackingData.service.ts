import {EventEmitter, Injectable} from '@angular/core';
import {AdministratorDataService} from './AdministratorData.service';
import {Organization, OrganizationPresenceCounter, PresenceService} from '../..';
import {ReplaySubject, Subscription} from 'rxjs';
import {TrackingDataService} from './TrackingDataService';

@Injectable({
  providedIn: 'root'
})

export class OrganizationTrackingDataService extends TrackingDataService {
  currentOrgSubscription: Subscription;
  constructor(ps: PresenceService) {
    super(ps);
  }

  subscribeOrganizationPresenceCounter(orgId: number): void {
    if (this.currentOrgSubscription != null) {
      this.currentOrgSubscription.unsubscribe();
    }
    this.currentOrgSubscription = super.ps.getOrganizationPresenceCounter(orgId).subscribe((opc: OrganizationPresenceCounter) => {
      this.getUsersNumber.next(opc.counter);
    });
  }
}
