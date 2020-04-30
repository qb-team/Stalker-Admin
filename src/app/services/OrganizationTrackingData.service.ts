import {EventEmitter, Injectable} from '@angular/core';
import {AdministratorDataService} from './AdministratorData.service';
import {Organization, OrganizationPresenceCounter, PresenceService} from '../..';
import {ReplaySubject} from 'rxjs';
import {TrackingDataService} from './TrackingDataService';

@Injectable({
  providedIn: 'root'
})

export class OrganizationTrackingDataService extends TrackingDataService{
  constructor(private ads: AdministratorDataService, ps: PresenceService) {
    super(ps);
    this.subscribeOrganizationPresenceCounter();
  }

  subscribeOrganizationPresenceCounter(): void {
    this.ads.getOrganization.subscribe((o: Organization) => {
      super.ps.getOrganizationPresenceCounter(o.id).subscribe((opc: OrganizationPresenceCounter) => {
        this.getUsersNumber.next(opc.counter);
      });
    });
  }
}
