import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {AuthenticationService} from './authentication.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import createSpyObj = jasmine.createSpyObj;


@Injectable()
class MockAdministratorPermissionDataService {}

@Injectable()
class MockAdministratorOrganizationDataService {}

@Injectable()
class MockRouter {
  navigate() {}
}

describe('AuthenticationService', () => {
  let service;
  const mockFA = createSpyObj(AngularFireAuth, ['auth', 'authState']);
  const httpClientService = createSpyObj(HttpClientTestingModule, ['get', 'post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientService},
        {provide: Router, useClass: MockRouter},
        {provide: AngularFireAuth, useValue: mockFA},
      ],
    });
    service = TestBed.inject(AuthenticationService);
  });

 /* it('should be created', () => {
    mockFA.authState.and.returnValue(of({}));
    expect(service).toBeTruthy();
  });*/



});
