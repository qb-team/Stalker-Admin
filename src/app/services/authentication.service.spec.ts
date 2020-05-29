import {async, TestBed} from '@angular/core/testing';
import { Injectable } from '@angular/core';
import {Observable, of, of as observableOf, throwError} from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdministratorPermissionDataService } from './AdministratorPermissionData.service';
import { AdministratorOrganizationDataService } from './AdministratorOrganizationData.service';
import { Router } from '@angular/router';
import createSpyObj = jasmine.createSpyObj;
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import User from "firebase";
import * as firebase from "firebase";

@Injectable()
class MockAdministratorPermissionDataService {}

@Injectable()
class MockAdministratorOrganizationDataService {}

@Injectable()
class MockRouter {
  navigate() {}
}

fdescribe('AuthenticationService', () => {
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

  it('should be created', () => {
    mockFA.authState.and.returnValue(of({}));
    expect(service).toBeTruthy();
  });



});
