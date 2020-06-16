import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {PlaceTrackingDataService} from './PlaceTrackingData.service';
import {PresenceService} from '../..';

@Injectable()
class MockPresenceService {}

describe('PlaceTrackingDataService', () => {
  let service: PlaceTrackingDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PresenceService, useValue: MockPresenceService},
      ],
    });
    service = TestBed.inject(PlaceTrackingDataService);
  });

  it('should run #subscribePlacePresenceCounter()', async () => {
     expect(service.currentPlaceSubscription.unsubscribe).toHaveBeenCalled();
     expect(service.getUsersNumber.emit).toHaveBeenCalled();
  });

});
