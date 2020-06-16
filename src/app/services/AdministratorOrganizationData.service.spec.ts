import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { AdministratorOrganizationDataService } from './AdministratorOrganizationData.service';
import { OrganizationService, PlaceService } from '../..';
import { Router } from '@angular/router';

@Injectable()
class MockOrganizationService {}

@Injectable()
class MockPlaceService {
  getPlaceListOfOrganization = function() {
    return observableOf({});
  };
}

@Injectable()
class MockRouter {
  navigate() {}
}

describe('AdministratorOrganizationDataService', () => {
  let service;


  it('should run #sortOrganizationsById()', async () => {

    service.sortOrganizationsById({
      sort() {
        return [
          {
            id: {}
          },
          {
            id: {}
          }
        ];
      }
    });

  });

  it('should run #setupAccessTokenInAPIService()', async () => {
    service.os = service.os || {};
    service.os.configuration = {
      accessToken: {}
    };
    service.setupAccessTokenInAPIService();
    expect(service.setupAccessTokenInAPIService).toHaveBeenCalled();
  });

});
