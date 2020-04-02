// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { MenubarComponent } from './menubar.component';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { OrganizationService } from 'src/api/api';
import { Router } from '@angular/router';

@Injectable()
class MockDataService {}

@Injectable()
class MockAuthenticationService {
  SignOut(){}
}

@Injectable()
class MockOrganizationService {
  getOrganizationList(){}
}

@Injectable()
class MockRouter {
  navigate() {};
  navigateByUrl(url: string) { return url; }
}

@Directive({ selector: '[oneviewPermitted]' })
class OneviewPermittedDirective {
  @Input() oneviewPermitted;
}

describe('MenubarComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        MenubarComponent,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: DataService, useClass: MockDataService },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: Router, useClass: MockRouter }
      ]
    }).overrideComponent(MenubarComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MenubarComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.os = component.os || {};
    spyOn(component.os, 'getOrganizationList').and.returnValue(observableOf({}));
    component.orgArr = component.orgArr || {};
    component.orgArr = '0';
    component.ds = component.ds || {};
    component.ds.org = {
      emit: function() {}
    };
    component.ngOnInit();
     expect(component.os.getOrganizationList).toHaveBeenCalled();
  });

  /*it('should run #setOrg()', async () => {
    component.ds = component.ds || {};
    component.ds.org = {
      emit: function() {}
    };
    component.setOrg({});

  });*/

  it('should run #SignOut()', async () => {
    component.authenticationService = component.authenticationService || {};
    spyOn(component.authenticationService, 'SignOut');
    spyOn(component, 'navigateToLogin');
    component.SignOut();
    expect(component.authenticationService.SignOut).toHaveBeenCalled();
    expect(component.navigateToLogin).toHaveBeenCalled();
  });

  it('should run #homePage()', async () => {
    component.ds = component.ds || {};
    component.ds.active_content = {
      emit: function() {}
    };
    component.homePage();

  });

  it('should run #navigateToLogin()', async () => {
    spyOn(component.router, 'navigateByUrl');
    component.router = component.router || {};
    component.navigateToLogin();
    expect(component.router.navigateByUrl).toHaveBeenCalled();
  });

});
