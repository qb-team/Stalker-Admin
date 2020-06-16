import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';
import {of as observableOf} from 'rxjs';

import {AuthenticatedOrganizationGuardService} from './authenticated-organization-guard.service';
import {Router} from '@angular/router';
import {AdministratorOrganizationDataService} from './AdministratorOrganizationData.service';

@Injectable()
class MockRouter {
  navigate() {}
}

@Injectable()
class MockAdministratorOrganizationDataService {
  getOrganization = observableOf({});
}

describe('AuthenticatedOrganizationGuardService', () => {
  let service: AuthenticatedOrganizationGuardService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: MockRouter},
        {provide: AdministratorOrganizationDataService, useValue:  MockAdministratorOrganizationDataService }
      ],
    });
    service = TestBed.inject(AuthenticatedOrganizationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run #canActivate()', async () => {
    expect(service.canActivate).toHaveBeenCalled();
  });

})
