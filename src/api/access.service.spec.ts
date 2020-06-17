import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {AccessService} from './access.service';
import {HttpParams} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
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

fdescribe('AccessService', () => {
  let service: AccessService;
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
        AccessService,
        { provide: HttpParams, useFactory: httpParamsStub },
        { provide: Configuration, useFactory: configurationStub }
      ]
    });
    service = TestBed.inject(AccessService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

});

