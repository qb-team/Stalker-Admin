import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {ManagerGuardService} from './manager-guard.service';
import {Router} from '@angular/router';

@Injectable()
class MockRouter {
  navigate() {}
}

describe('ManagerGuardService', () => {
  let service: ManagerGuardService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: MockRouter},
      ],
    });
    service = TestBed.inject(ManagerGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run #canActivate()', async () => {
    expect(service.canActivate).toHaveBeenCalled();
  });

});
