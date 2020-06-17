import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {OrganizationService} from './organization.service';
import {HttpParams} from '@angular/common/http';
import {AccessService} from './access.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Configuration} from 'jasmine-spec-reporter/built/configuration';

@Injectable()
class MockHttpClient {
  post() {}
}

@Injectable()
class MockConfiguration {
  basePath = {};
  encoder = {};
}

fdescribe('OrganizationService', () => {
  let service: OrganizationService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    const httpParamsStub = () => ({ append: (key, arg) => ({}) });
    const configurationStub = () => ({
      basePath: {},
      encoder: {},
      selectHeaderAccept: httpHeaderAccepts => ({}),
      withCredentials: {}
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrganizationService,
        { provide: HttpParams, useFactory: httpParamsStub },
        { provide: Configuration, useFactory: configurationStub }
      ]
    });
    service = TestBed.inject(OrganizationService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

});
