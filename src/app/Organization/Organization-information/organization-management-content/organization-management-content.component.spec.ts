// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { OrganizationManagementContentComponent } from './organization-management-content.component';
import { AdministratorOrganizationDataService } from '../../../services/AdministratorOrganizationData.service';
import { OrganizationService } from '../../../../index';

@Injectable()
class MockAdministratorOrganizationDataService {}

@Injectable()
class MockOrganizationService {
  requestDeletionOfOrganization() {}
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

fdescribe('OrganizationManagementContentComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        OrganizationManagementContentComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AdministratorOrganizationDataService, useClass: MockAdministratorOrganizationDataService },
        { provide: OrganizationService, useClass: MockOrganizationService }
      ]
    }).overrideComponent(OrganizationManagementContentComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(OrganizationManagementContentComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run SetterDeclaration #Name', async () => {

    component.Name = {};

  });

  it('should run SetterDeclaration #Street', async () => {

    component.Street = {};

  });

  it('should run SetterDeclaration #Number', async () => {

    component.Number = {};

  });

  it('should run SetterDeclaration #PostCode', async () => {

    component.PostCode = {};

  });

  it('should run SetterDeclaration #City', async () => {

    component.City = {};

  });

  it('should run SetterDeclaration #Country', async () => {

    component.Country = {};

  });

  it('should run SetterDeclaration #Descr', async () => {

    component.Descr = {};

  });

  it('should run SetterDeclaration #DescrR', async () => {

    component.DescrR = {};

  });

  it('should run SetterDeclaration #setCurrentOrg', async () => {

    component.setCurrentOrg = {};

  });

  it('should run SetterDeclaration #Change', async () => {

    component.Change = {};

  });

  it('should run GetterDeclaration #Name', async () => {

    const Name = component.Name;

  });

  it('should run GetterDeclaration #Street', async () => {

    const Street = component.Street;

  });

  it('should run GetterDeclaration #Number', async () => {

    const Number = component.Number;

  });

  it('should run GetterDeclaration #PostCode', async () => {

    const PostCode = component.PostCode;

  });

  it('should run GetterDeclaration #City', async () => {

    const City = component.City;

  });

  it('should run GetterDeclaration #Country', async () => {

    const Country = component.Country;

  });

  it('should run GetterDeclaration #Descr', async () => {

    const Descr = component.Descr;

  });

  it('should run GetterDeclaration #DescrR', async () => {

    const DescrR = component.DescrR;

  });

  it('should run GetterDeclaration #getCurrentOrg', async () => {

    const getCurrentOrg = component.getCurrentOrg;

  });

  it('should run GetterDeclaration #Change', async () => {

    const Change = component.Change;

  });

  it('should run #ngOnInit()', async () => {
    spyOn(component, 'setupModifyForm');
    component.ads = component.ads || {};
    component.ads.getOrganization = observableOf({});
    component.ngOnInit();
    // expect(component.setupModifyForm).toHaveBeenCalled();
  });

  it('should run #setupModifyForm()', async () => {

    component.setupModifyForm();

  });

  it('should run #onChange()', async () => {

    component.onChange({});

  });

  it('should run #undefined()', async () => {
    // Error: ERROR Util.getNode JS code is invalid, "this.currentOrganization.lastChangeDate"
    //     at Function.getNode (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\util.js:189:13)
    //     at FuncTestGen.setPropsOrParams (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\func-test-gen.js:239:24)
    //     at FuncTestGen.setPropsOrParams (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\func-test-gen.js:268:12)
    //     at FuncTestGen.setPropsOrParams (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\func-test-gen.js:268:12)
    //     at FuncTestGen.setPropsOrParams (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\func-test-gen.js:268:12)
    //     at FuncTestGen.setPropsOrParams (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\func-test-gen.js:268:12)
    //     at FuncTestGen.setPropsOrParams (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\func-test-gen.js:268:12)
    //     at FuncTestGen.setPropsOrParams (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\func-test-gen.js:268:12)
    //     at FuncTestGen.setPropsOrParams (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\func-test-gen.js:268:12)
    //     at FuncTestGen.setPropsOrParams (C:\Users\emaci\AppData\Roaming\npm\node_modules\ngentest\src\func-test-gen.js:268:12)
  });

  it('should run #onRemove()', async () => {
    component.currentOrganization = component.currentOrganization || {};
    component.currentOrganization.id = 'id';
    component.orgS = component.orgS || {};
    spyOn(component.orgS, 'requestDeletionOfOrganization').and.returnValue(observableOf({}));
    component.onRemove();
    // expect(component.orgS.requestDeletionOfOrganization).toHaveBeenCalled();
  });

});
