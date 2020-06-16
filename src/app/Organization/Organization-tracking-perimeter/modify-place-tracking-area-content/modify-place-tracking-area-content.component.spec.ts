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
import {HttpClient} from "@angular/common/http";
import {ModifyPlaceTrackingAreaContentComponent} from "./modify-place-tracking-area-content.component";
import createSpyObj = jasmine.createSpyObj;

@Injectable()
class MockAdministratorOrganizationDataService {
  getOrganization() {}
}

@Injectable()
class MockPlaceService {
  getPlaceListOfOrganization(number) {}
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

describe('ModifyPlaceTrackingAreaContentComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ModifyPlaceTrackingAreaContentComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AdministratorOrganizationDataService, useClass: MockAdministratorOrganizationDataService },
        { provide: PlaceService, useClass: MockPlaceService },
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPlaceTrackingAreaContentComponent);
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
    component.ngOnInit();
  });


});
