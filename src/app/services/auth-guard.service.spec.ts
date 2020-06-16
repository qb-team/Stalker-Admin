import {async, TestBed} from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable()
class MockAuthenticationService {}

@Injectable()
class MockRouter {
  navigate() {}
}

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: MockRouter},
        {provide: AuthenticationService, useValue: MockAuthenticationService}
      ],
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
