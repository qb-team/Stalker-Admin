// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { MenuFunctionalityComponent } from './menu-functionality.component';
import { AdministratorOrganizationDataService } from '../services/AdministratorOrganizationData.service';
import { AdministratorPermissionDataService } from '../services/AdministratorPermissionData.service';
import { Router } from '@angular/router';

@Injectable()
class MockAdministratorOrganizationDataService {}

@Injectable()
class MockAdministratorPermissionDataService {
  getUserPermissions() {}
}

@Injectable()
class MockRouter {
  navigate() {};
  navigateByUrl() {};
}

@Directive({ selector: '[oneviewPermitted]' })
class OneviewPermittedDirective {
  @Input() oneviewPermitted;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

fdescribe('MenuFunctionalityComponent', () => {
  let fixture;
  let component;
  const mockRouter = new MockRouter();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        MenuFunctionalityComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AdministratorOrganizationDataService, useClass: MockAdministratorOrganizationDataService },
        { provide: AdministratorPermissionDataService, useClass: MockAdministratorPermissionDataService },
        { provide: Router, useValue: mockRouter }
      ]
    }).overrideComponent(MenuFunctionalityComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MenuFunctionalityComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run SetterDeclaration #setCurrentOrganization', async () => {

    component.setCurrentOrganization = {};

  });

  /*it('should run SetterDeclaration #Index', async () => {

    component.Index = {};

  });

  it('should run SetterDeclaration #Permession', async () => {

    component.Permession = {};

  });*/

  it('should run GetterDeclaration #getCurrentOrganization', async () => {

    const getCurrentOrganization = component.getCurrentOrganization;

  });

  it('should run GetterDeclaration #Index', async () => {

    const Index = component.Index;

  });

  it('should run GetterDeclaration #Permession', async () => {

    const Permession = component.Permession;

  });

  it('should run #ngOnInit()', async () => {
    component.ads = component.ads || {};
    component.ads.getOrganization = observableOf({});
    component.apd = component.apd || {};
    spyOn(component.apd, 'getUserPermissions').and.returnValue(observableOf({}));
    spyOn(component, 'refresch');
    component.ngOnInit();
    // expect(component.apd.getUserPermissions).toHaveBeenCalled();
    // expect(component.refresch).toHaveBeenCalled();
  });

  /*it('should run #updateContent()', async () => {
    component.router = component.router || {};
    spyOn(mockRouter, 'navigateByUrl');
    component.updateContent({
      target: {
        innerHTML: {}
      }
    });
    // expect(component.router.navigateByUrl).toHaveBeenCalled();
  });*/

  it('should run #refresch()', async () => {
    component.currentOrganization = component.currentOrganization || {};
    component.currentOrganization.id = 'id';
    component.permession = component.permession || {};
    component.permession.i = {
      organizationId: {}
    };
    component.permession.permission = {
      toString: function() {}
    };
    component.refresch();

  });

});
