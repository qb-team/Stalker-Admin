import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';

import {GeneralService} from './general.service';
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
  accessToken = {};
  encoder = {};
}

fdescribe('GeneralService', () => {
    let service: GeneralService;
    beforeEach(() => {
      const httpParamsStub = () => ({append: (key, arg) => ({})});
      const configurationStub = () => ({
        basePath: {},
        encoder: {},
        selectHeaderAccept: httpHeaderAccepts => ({}),
        withCredentials: {}
      });
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          GeneralService,
          {provide: HttpParams, useFactory: httpParamsStub},
          {provide: Configuration, useFactory: configurationStub}
        ]
      });
      service = TestBed.inject(GeneralService);
    });

    it('can load instance', () => {
      expect(service).toBeTruthy();
    });

    it('should run #setupAccessTokenInAPIService()', async () => {
      service.configuration.accessToken = 'accessToken';
      service.setupAccessTokenInAPIService();
    });

  });

