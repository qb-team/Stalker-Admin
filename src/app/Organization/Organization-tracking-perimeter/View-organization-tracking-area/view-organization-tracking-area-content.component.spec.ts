// tslint:disable
import { TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewOrganizationTrackingAreaContentComponent } from './view-organization-tracking-area-content.component';
import {HttpClient} from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {PlaceService} from '../../../..';

describe('ViewOrganizationTrackingAreaContentComponent', () => {
  const spyHttp = createSpyObj('HttpClient', ['get', 'post', 'update', 'delete']);
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization']);
  const spyPS = createSpyObj('PlaceService', ['getPlaceListOfOrganization', 'updatePlace', 'deletePlace', 'createNewPlace']);

  let fixture;
  let component;
  let mockOrganization: any;
  class MockOrganization {
    trackingArea = '[\n' +
      '    {\n' +
      '        "lat": 12.34567890,\n' +
      '        "long": 12.34567890\n' +
      '    },\n' +
      '    {\n' +
      '        "lat": 12.34567890,\n' +
      '        "long": 12.34567890\n' +
      '    },\n' +
      '    {\n' +
      '        "lat": 12.34567890,\n' +
      '        "long": 12.34567890\n' +
      '    },\n' +
      '    {\n' +
      '        "lat": 12.34567890,\n' +
      '        "long": 12.34567890\n' +
      '    }\n' +
      ']';
  }

  beforeEach(() => {
    mockOrganization = new MockOrganization();
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ViewOrganizationTrackingAreaContentComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [{provide: AdministratorOrganizationDataService, useValue: spyAODS},
        {provide: HttpClient, useValue: spyHttp},
        {provide: PlaceService, useValue: spyPS},
      ]
    }).overrideComponent(ViewOrganizationTrackingAreaContentComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ViewOrganizationTrackingAreaContentComponent);
    component = fixture.debugElement.componentInstance;
    component.org = mockOrganization;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });
/*
  it('should run #ngOnInit()', async () => {
    component.ds = component.ds || {};
    component.ds.getOrganization = observableOf({
      trackingArea: 'trackingArea'
    });
    spyOn(component.ds.getOrganization, 'subscribe');
    component.ngOnInit();
    expect(component.ds.getOrganization.subscribe).toHaveBeenCalled();
  });
*/
});
