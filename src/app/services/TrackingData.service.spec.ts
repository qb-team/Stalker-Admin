import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {TrackingDataService} from './TrackingData.service';
import {PresenceService} from '../..';

@Injectable()
class MockPresenceService {}

fdescribe('TrackingDataService', () => {
  let service: TrackingDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PresenceService, useValue: MockPresenceService},
      ],
    });
    service = TestBed.inject(TrackingDataService);
  });

});
