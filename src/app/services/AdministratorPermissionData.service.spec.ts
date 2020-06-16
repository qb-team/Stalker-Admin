import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { AdministratorPermissionDataService } from './AdministratorPermissionData.service';
import { AdministratorService } from '../..';

@Injectable()
class MockAdministratorService {}

describe('AdministratorPermissionDataService', () => {
  let service;


  it('should run #orderPermissions()', async () => {

    service.orderPermissions({
      sort() {
        return [
          {
            administratorId: {}
          },
          {
            administratorId: {}
          }
        ];
      }
    });

  });

  it('should run #setupAccessTokenInAPIService()', async () => {
    service.as = service.as || {};
    service.as.configuration = {
      accessToken: {}
    };
    service.setupAccessTokenInAPIService();
    expect(service.setupAccessTokenInAPIService).toHaveBeenCalled();
  });

  it('should run #getUserPermissions()', async () => {

    service.getUserPermissions();
    expect(service.getUserPermissions).toHaveBeenCalled();
  });

  it('should run #setUserPermissions()', async () => {

    service.setUserPermissions({});
    expect(service.getUserPermissions).toHaveBeenCalled();
  });

});
