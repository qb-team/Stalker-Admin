import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';

import { AuthenticationService } from './authentication.service';

@Injectable()
class MockAdministratorService {}

@Injectable()
class MockOrganizationService {}

@Injectable()
class MockDataService {}

describe('AuthenticationService', () => {
  let service;


  beforeEach(() => {
    service = new AuthenticationService({
        authState: {}
      }, {}, {}, {});
  });

  it('should run #signIn()', async () => {
    service.angularFireAuth = service.angularFireAuth || {};
    service.angularFireAuth.auth = {
      signInWithEmailAndPassword() {
        return {
          then() {
            return {
              catch() {
                return [
                  {
                    message: {}
                  }
                ];
              }
            };
          }
        };
      },
      currentUser: {
        getIdToken() {
          return {
            then() {
              return [
                null
              ];
            }
          };
        }
      },
      onAuthStateChanged() {
        return [
          {
            uid: {}
          }
        ];
      }
    };
    service.as = service.as || {};
    service.as.configuration = {
      setAccessToken() {}
    };
    spyOn(service.as, 'getPermissionList').and.returnValue(observableOf({}));
    service.UserPermissions = service.UserPermissions || {};
    service.UserPermissions = {
      organizationId: {}
    };
    service.os = service.os || {};
    spyOn(service.os, 'getOrganization').and.returnValue(observableOf({}));
    service.ds = service.ds || {};
    spyOn(service.ds, 'addOrganization');
    service.signIn({}, {});
    // expect(service.as.getPermissionList).toHaveBeenCalled();
    // expect(service.os.getOrganization).toHaveBeenCalled();
    // expect(service.ds.addOrganization).toHaveBeenCalled();
  });

  it('should run #signOut()', async () => {
    service.angularFireAuth = service.angularFireAuth || {};
    service.angularFireAuth.auth = {
      signOut() {
        return {
          then() {
            return [
              null
            ];
          }
        };
      }
    };
    service.signOut();

  });

  it('should run #resetPassword()', async () => {
    service.angularFireAuth = service.angularFireAuth || {};
    service.angularFireAuth.auth = {
      sendPasswordResetEmail() {
        return {
          then() {
            return [
              null
            ];
          }
        };
      }
    };
    service.resetPassword({});

  });

  it('should run #getState()', async () => {
    service.angularFireAuth = service.angularFireAuth || {};
    service.angularFireAuth.authState = 'authState';
    service.getState();

  });

});
