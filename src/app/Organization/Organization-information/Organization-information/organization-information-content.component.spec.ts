// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { OrganizationInformationContentComponent } from './organization-information-content.component';
import { AdministratorOrganizationDataService } from '../../../services/AdministratorOrganizationData.service';

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

fdescribe('OrganizationInformationContentComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        OrganizationInformationContentComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AdministratorOrganizationDataService, useClass: MockAdministratorOrganizationDataService }
      ]
    }).overrideComponent(OrganizationInformationContentComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(OrganizationInformationContentComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run SetterDeclaration #setCurrentOrg', async () => {

    component.setCurrentOrg = {};

  });

  it('should run GetterDeclaration #getCurrentOrg', async () => {

    const getCurrentOrg = component.getCurrentOrg;

  });

  it('should run #ngOnInit()', async () => {
    spyOn(component, 'subscribeToOrganization');
    component.ngOnInit();
    // expect(component.subscribeToOrganization).toHaveBeenCalled();
  });

  it('should run #subscribeToOrganization()', async () => {
    component.ads = component.ads || {};
    component.ads.getOrganization = observableOf({});
    component.subscribeToOrganization();

  });

  it('should run #ngOnDestroy()', async () => {
    spyOn(component, 'ngOnDestroy');
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
  });

});
