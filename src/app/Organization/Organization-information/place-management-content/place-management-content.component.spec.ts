// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AdministratorOrganizationDataService } from '../../../services/AdministratorOrganizationData.service';
import {OrganizationService, PlaceService} from '../../../../index';
import {PlaceManagementContentComponent} from "./place-management-content.component";

@Injectable()
class MockAdministratorOrganizationDataService {
  getOrganization() {}
}

@Injectable()
class MockPlaceService {
  getPlaceListOfOrganization(number) {}
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

// @ts-ignore
describe('PlaceManagementContentComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        PlaceManagementContentComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AdministratorOrganizationDataService, useClass: MockAdministratorOrganizationDataService },
        { provide: PlaceService, useClass: MockPlaceService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceManagementContentComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.ads = component.ads || {};
    component.ads.getOrganization = observableOf({});
    component.plS = component.plS || {};
    component.plS.getPlaceListOfOrganization = observableOf({});
    spyOn(component, 'setupModifyForm');
    component.ngOnInit();
  });

  it('should run #setupModifyForm()', async () => {
    component.ads = component.ads || {};
    component.ads.getOrganization = observableOf({});
    component.plS = component.plS || {};
    component.plS.updatePlace = observableOf({});
    component.plS.getPlaceListOfOrganization = observableOf({});
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


});
