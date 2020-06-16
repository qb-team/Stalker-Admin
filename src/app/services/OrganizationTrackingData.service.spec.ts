import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {OrganizationTrackingDataService} from './OrganizationTrackingData.service';
import {PresenceService} from '../..';

@Injectable()
class MockPresenceService {}

describe('OrganizationTrackingDataService', () => {
  let service: OrganizationTrackingDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PresenceService, useValue: MockPresenceService},
      ],
    });
    service = TestBed.inject(OrganizationTrackingDataService);
  });

  it('should run #subscribeOrganizationPresenceCounter()', async () => {
     expect(service.currentOrgSubscription.unsubscribe).toHaveBeenCalled();
     expect(service.getUsersNumber.emit).toHaveBeenCalled();
  });

});
