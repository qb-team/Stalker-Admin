import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {LoginGuardService} from './login-guard.service';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';


@Injectable()
class MockAuthenticationService {}

@Injectable()
class MockRouter {
  navigate() {}
}

describe('LoginGuardService', () => {

  let service: LoginGuardService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: MockRouter},
        {provide: AuthenticationService, useValue: MockAuthenticationService}
      ],
    });
    service = TestBed.inject(LoginGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run #canActivate()', async () => {
    expect(service.canActivate).toHaveBeenCalled();
  });

});
