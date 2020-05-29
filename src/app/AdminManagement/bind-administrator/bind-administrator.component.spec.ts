// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { BindAdministratorComponent } from './bind-administrator.component';
import { AdministratorService } from '../../..';
import { AdministratorOrganizationDataService } from '../../services/AdministratorOrganizationData.service';

@Injectable()
class MockAdministratorService {
  bindAdministratorToOrganization(){}
}

@Injectable()
class MockAdministratorOrganizationDataService {}

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

fdescribe('BindAdministratorComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        BindAdministratorComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AdministratorService, useClass: MockAdministratorService },
        { provide: AdministratorOrganizationDataService, useClass: MockAdministratorOrganizationDataService }
      ]
    }).overrideComponent(BindAdministratorComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(BindAdministratorComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run SetterDeclaration #setAdminEmail', async () => {

    component.setAdminEmail = {};

  });

  it('should run GetterDeclaration #getAdminEmail', async () => {

    const getAdminEmail = component.getAdminEmail;

  });

  it('should run GetterDeclaration #getContactForm', async () => {

    const getContactForm = component.getContactForm;

  });

  it('should run GetterDeclaration #getSelectedPriviledges', async () => {

    const getSelectedPriviledges = component.getSelectedPriviledges;

  });

  it('should run GetterDeclaration #getCurrentOrganizationName', async () => {
    component.currentOrganization = component.currentOrganization || {};
    component.currentOrganization.name = 'name';
    const getCurrentOrganizationName = component.getCurrentOrganizationName;

  });

  it('should run #ngOnInit()', async () => {
    spyOn(component, 'subscribeToOrganization');
    spyOn(component, 'setupLoginForm');
    component.ngOnInit();
    // expect(component.subscribeToOrganization).toHaveBeenCalled();
    // expect(component.setupLoginForm).toHaveBeenCalled();
  });

  it('should run #subscribeToOrganization()', async () => {
    component.aods = component.aods || {};
    component.aods.getOrganization = observableOf({});
    component.subscribeToOrganization();

  });

  it('should run #setupLoginForm()', async () => {

    component.setupLoginForm();

  });

  it('should run #bindAdministrator()', async () => {
    component.currentOrganization = component.currentOrganization || {};
    component.currentOrganization.id = 'id';
    component.as = component.as || {};
    spyOn(component.as, 'bindAdministratorToOrganization').and.returnValue(observableOf({}));
    component.bindAdministrator();
    // expect(component.as.bindAdministratorToOrganization).toHaveBeenCalled();
  });

  it('should run #setAdminPermissions()', async () => {

    component.setAdminPermissions({});

  });

  it('should run #setSelectedPriviledges()', async () => {

    component.setSelectedPriviledges({});

  });

});
