import {EventEmitter, Injectable} from '@angular/core';
import {AdministratorOrganizationDataService} from './AdministratorOrganizationData.service';
import {Organization, OrganizationPresenceCounter, PresenceService} from '../..';
import {ReplaySubject, Subscription} from 'rxjs';
import {TrackingDataService} from './TrackingData.service';

@Injectable({
  providedIn: 'root'
})

export class OrganizationTrackingDataService extends TrackingDataService {
  currentOrgSubscription: Subscription;
  constructor(protected ps: PresenceService) {
    super(ps);
    console.log('OTS this: ' + this.ps);
    console.log('OTS super: ' + super.ps);
  }

  subscribeOrganizationPresenceCounter(orgId: number): void {
    if (this.currentOrgSubscription != null) {
      this.currentOrgSubscription.unsubscribe();
    }
    this.currentOrgSubscription = this.ps.getOrganizationPresenceCounter(orgId).subscribe((opc: OrganizationPresenceCounter) => {
      console.log('TDS next: ' + opc.counter);
      this.getUsersNumber.emit(opc.counter);
    });
  }
}
