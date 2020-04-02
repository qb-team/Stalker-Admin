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
    service.SignIn({}, {});

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
    service.SignOut();

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
    service.ResetPassword({});

  });

  it('should run #getState()', async () => {
    service.angularFireAuth = service.angularFireAuth || {};
    service.angularFireAuth.authState = 'authState';
    service.getState();
  });

});
