import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {OwnerGuardService} from './owner-guard.service';
import {Router} from '@angular/router';

@Injectable()
class MockRouter {
  navigate() {};
}

describe('OwnerGuardService', () => {
  let service: OwnerGuardService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: MockRouter},
      ],
    });
    service = TestBed.inject(OwnerGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run #canActivate()', async () => {
    expect(service.canActivate).toHaveBeenCalled();
  });

});
