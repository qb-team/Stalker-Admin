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
import {ModifyOrganizationTrackingAreaContentComponent} from "./modify-organization-tracking-area-content.component";
import {PlaceManagementContentComponent} from "../../Organization-information/place-management-content/place-management-content.component";
import {HttpClient} from "@angular/common/http";

@Injectable()
class MockAdministratorOrganizationDataService {
  getOrganization() {}
}

@Injectable()
class MockOrganizationService {
}

@Injectable()
class MockHttpClient {
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

fdescribe('ModifyOrganizationTrackingContentComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ModifyOrganizationTrackingAreaContentComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AdministratorOrganizationDataService, useClass: MockAdministratorOrganizationDataService },
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    }).overrideComponent(ModifyOrganizationTrackingAreaContentComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ModifyOrganizationTrackingAreaContentComponent);
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
    component.ads = component.ads || {};
    component.ads.getOrganization = observableOf({});
    component.ngOnInit();
  });


  it('should run #undefined()', async () => {

  });


});
