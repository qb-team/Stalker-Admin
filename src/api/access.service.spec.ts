import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { AccessService } from './access.service';
import { HttpClient } from '@angular/common/http';
import { Optional } from '@angular/core';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockConfiguration {
  basePath = {};
  encoder = {};
}

describe('AccessService', () => {
  let service;

  beforeEach(() => {
    service = new AccessService({}, {}, {
        basePath: {},
        encoder: {}
      });
  });

  it('should run #addToHttpParams()', async () => {
    spyOn(service, 'addToHttpParamsRecursive');
    service.addToHttpParams({}, {}, {});
    // expect(service.addToHttpParamsRecursive).toHaveBeenCalled();
  });

  it('should run #addToHttpParamsRecursive()', async () => {
    spyOn(service, 'addToHttpParamsRecursive').and.returnValue({
      append: function() {}
    });
    service.addToHttpParamsRecursive({}, [{}], {});
    // expect(service.addToHttpParamsRecursive).toHaveBeenCalled();
  });

  it('should run #getAccessListInOrganization()', async () => {
    service.defaultHeaders = service.defaultHeaders || {};
    spyOn(service.defaultHeaders, 'set');
    service.configuration = service.configuration || {};
    spyOn(service.configuration, 'selectHeaderAccept');
    service.configuration.basePath = 'basePath';
    service.configuration.withCredentials = 'withCredentials';
    service.httpClient = service.httpClient || {};
    spyOn(service.httpClient, 'get');
    service.getAccessListInOrganization({}, {
      httpHeaderAccept: {}
    });
    // expect(service.defaultHeaders.set).toHaveBeenCalled();
    // expect(service.configuration.selectHeaderAccept).toHaveBeenCalled();
    // expect(service.httpClient.get).toHaveBeenCalled();
  });

  it('should run #getAccessListInOrganizationOfUsers()', async () => {
    service.defaultHeaders = service.defaultHeaders || {};
    spyOn(service.defaultHeaders, 'set');
    service.configuration = service.configuration || {};
    spyOn(service.configuration, 'selectHeaderAccept');
    service.configuration.basePath = 'basePath';
    service.configuration.withCredentials = 'withCredentials';
    service.httpClient = service.httpClient || {};
    spyOn(service.httpClient, 'get');
    service.getAccessListInOrganizationOfUsers({}, {}, {
      httpHeaderAccept: {}
    });
    // expect(service.defaultHeaders.set).toHaveBeenCalled();
    // expect(service.configuration.selectHeaderAccept).toHaveBeenCalled();
    // expect(service.httpClient.get).toHaveBeenCalled();
  });

  it('should run #getAccessListInPlace()', async () => {
    service.defaultHeaders = service.defaultHeaders || {};
    spyOn(service.defaultHeaders, 'set');
    service.configuration = service.configuration || {};
    spyOn(service.configuration, 'selectHeaderAccept');
    service.configuration.basePath = 'basePath';
    service.configuration.withCredentials = 'withCredentials';
    service.httpClient = service.httpClient || {};
    spyOn(service.httpClient, 'get');
    service.getAccessListInPlace({}, {
      httpHeaderAccept: {}
    });
    // expect(service.defaultHeaders.set).toHaveBeenCalled();
    // expect(service.configuration.selectHeaderAccept).toHaveBeenCalled();
    // expect(service.httpClient.get).toHaveBeenCalled();
  });

  it('should run #getAccessListInPlaceOfUsers()', async () => {
    service.defaultHeaders = service.defaultHeaders || {};
    spyOn(service.defaultHeaders, 'set');
    service.configuration = service.configuration || {};
    spyOn(service.configuration, 'selectHeaderAccept');
    service.configuration.basePath = 'basePath';
    service.configuration.withCredentials = 'withCredentials';
    service.httpClient = service.httpClient || {};
    spyOn(service.httpClient, 'get');
    service.getAccessListInPlaceOfUsers({}, {}, {
      httpHeaderAccept: {}
    });
    // expect(service.defaultHeaders.set).toHaveBeenCalled();
    // expect(service.configuration.selectHeaderAccept).toHaveBeenCalled();
    // expect(service.httpClient.get).toHaveBeenCalled();
  });

});
