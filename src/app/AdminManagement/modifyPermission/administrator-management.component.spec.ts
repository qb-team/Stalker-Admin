// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AdministratorManagementComponent } from './administrator-management.component';
import { AdministratorOrganizationDataService } from '../../services/AdministratorOrganizationData.service';
import { AdministratorService } from '../../../index';
import {LdapService} from "../../services/ldap.service";

@Injectable()
class MockAdministratorOrganizationDataService {
  updateAdministratorPermission(){}
}

@Injectable()
class MockAdministratorService {}

@Injectable()
class MockLDAPDataService {}

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

fdescribe('AdministratorManagementComponent', () => {
  let fixture;
  let component;
  let mockAS;

  beforeEach(() => {
    mockAS = new MockAdministratorOrganizationDataService();
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        AdministratorManagementComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AdministratorOrganizationDataService, useClass: MockAdministratorOrganizationDataService },
        { provide: AdministratorService, useValue: mockAS },
        { provide: LdapService, useClass: MockLDAPDataService }
      ]
    }).overrideComponent(AdministratorManagementComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AdministratorManagementComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #getPermissions', async () => {

    const getPermissions = component.getPermissions;

  });

  it('should run GetterDeclaration #getPermissionModifications', async () => {

    const getPermissionModifications = component.getPermissionModifications;

  });

  it('should run GetterDeclaration #getCurrentOrganization', async () => {

    const getCurrentOrganization = component.getCurrentOrganization;

  });

  it('should run GetterDeclaration #dataHasArrived', async () => {

    const dataHasArrived = component.dataHasArrived;

  });

  it('should run #ngOnInit()', async () => {
    spyOn(component, 'subscribeToOrganization');
    component.ngOnInit();
    // expect(component.subscribeToOrganization).toHaveBeenCalled();
  });

  it('should run #subscribeToOrganization()', async () => {
    component.ads = component.ads || {};
    component.ads.getOrganization = observableOf({});
    spyOn(component, 'subscribeToAdministratorPermissions');
    component.subscribeToOrganization();
    // expect(component.subscribeToAdministratorPermissions).toHaveBeenCalled();
  });

  it('should run #undefined()', async () => {
    // Error: ERROR this JS code is invalid, "permArr.splice(permArr.findIndex(org)"
    //     at Function.getFuncReturn (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\util.js:333:13)
    //     at C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\util.js:421:30
    //     at Array.forEach (<anonymous>)
    //     at Function.getFuncParamObj (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\util.js:404:26)
    //     at Function.getFuncArguments (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\util.js:355:30)
    //     at Function.getFuncReturn (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\util.js:340:34)
    //     at FuncTestGen.setMockData (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\func-test-gen.js:157:31)
    //     at FuncTestGen.setMockData (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\func-test-gen.js:88:12)
    //     at C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\index.js:70:17
    //     at Array.forEach (<anonymous>)
  });

  /*it('should run #addPermissionModificationInstance()', async () => {
    spyOn(component, 'getPermissionTierOf');
    spyOn(component, 'alreadyModified');
    component.currentOrganization = component.currentOrganization || {};
    component.currentOrganization.id = 'id';
    component.permissionModifications = component.permissionModifications || {};
    spyOn(component.permissionModifications, 'push');
    component.permissionModifications.permission = 'permission';
    component.addPermissionModificationInstance({
      target: {
        parentNode: {
          id: {}
        }
      }
    }, {});
    // expect(component.getPermissionTierOf).toHaveBeenCalled();
    // expect(component.alreadyModified).toHaveBeenCalled();
    // expect(component.permissionModifications.push).toHaveBeenCalled();
  });*/

  it('should run #updateModifiedPermissionOnTable()', async () => {
    component.permissionModificationsTableText = component.permissionModificationsTableText || {};
    component.permissionModificationsTableText.ind = 'ind';
    component.updateModifiedPermissionOnTable({}, {});

  });

  it('should run #updatePermissionList()', async () => {
    spyOn(component, 'sortModificationList');
    component.permissions = component.permissions || {};
    component.permissions.it1 = {
      administratorId: {},
      permission: {}
    };
    component.permissionModifications = component.permissionModifications || {};
    component.permissionModifications.it2 = {
      administratorId: {},
      permission: {}
    };
    component.as = component.as || {};
    spyOn(component.as, 'updateAdministratorPermission').and.returnValue(observableOf({}));
    component.updatePermissionList();
    // expect(component.sortModificationList).toHaveBeenCalled();
    // expect(component.as.updateAdministratorPermission).toHaveBeenCalled();
  });

  it('should run #eraseModificationList()', async () => {
    component.permissions = component.permissions || {};
    component.eraseModificationList();

  });

  it('should run #sortModificationList()', async () => {
    component.permissionModifications = component.permissionModifications || {};
    spyOn(component.permissionModifications, 'sort').and.returnValue([
      {
        "administratorId": {}
      },
      {
        "administratorId": {}
      }
    ]);
    component.sortModificationList();
    // expect(component.permissionModifications.sort).toHaveBeenCalled();
  });


  it('should run #getPermissionLevelNoun()', async () => {

    component.getPermissionLevelNoun({});

  });

  it('should run #getPermissionTierOf()', async () => {
    component.permissions = component.permissions || {};
    component.permissions.permission = 'permission';
    component.getPermissionTierOf('adminIdSample');

  });


  it('should run #canDeactivate()', async () => {
    component.permissionModifications = component.permissionModifications || {};
    component.canDeactivate();

  });

});
