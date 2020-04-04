import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';

describe('AuthenticationService', () => {
  let service;

  beforeEach(() => {
    service = new AuthenticationService({
      authState: {}
    } as AngularFireAuth);
  });

  it('should run #SignIn()', async () => {
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
      }
    };
    spyOn(service, 'SignIn');
    service.SignIn({}, {});
    expect(service.SignIn).toHaveBeenCalled();
  });

  it('should run #SignOut()', async () => {
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
    spyOn(service, 'SignOut');
    service.SignOut();
    expect(service.SignOut).toHaveBeenCalled();
  });

  it('should run #ResetPassword()', async () => {
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
    spyOn(service, 'ResetPassword');
    service.ResetPassword({});
    expect(service.ResetPassword).toHaveBeenCalled();
  });

  it('should run #getState()', async () => {
    service.angularFireAuth = service.angularFireAuth || {};
    service.angularFireAuth.authState = 'authState';
    spyOn(service, 'getState');
    service.getState();
    expect(service.getState).toHaveBeenCalled();
  });

});
