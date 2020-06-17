// tslint:disable
import { TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrganizationPresenceNumberComponent } from './organization-presence-number.component';
import { PresenceService } from 'src/api/api';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import createSpyObj = jasmine.createSpyObj;
import {Router} from '@angular/router';
import {OrganizationTrackingDataService} from '../../../services/OrganizationTrackingData.service';

@Injectable()
class MockDataService {}

@Injectable()
class MockPresenceService {
  getOrganizationPresenceCounterById(){}
}

describe('OrganizationPresenceNumberComponent', () => {
  let fixture;
  let component;
  const spyOrgTrackS = createSpyObj('OrganizationTrackingDataService', ['subscribeOrganizationPresenceCounter', 'getUserNumber']);
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization']);
  const spyRouter = createSpyObj('Router', ['getCurrentNavigation']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        OrganizationPresenceNumberComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: PresenceService, useClass: MockPresenceService },
        {provide: AdministratorOrganizationDataService, useValue: spyAODS},
        { provide: Router, useClass: spyRouter },
        { provide: OrganizationTrackingDataService, useClass: spyOrgTrackS }
      ]
    }).overrideComponent(OrganizationPresenceNumberComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(OrganizationPresenceNumberComponent);
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
    spyOn(spyOrgTrackS,'subscribeOrganizationPresenceCounter');
    // spyOn(component.tds, 'getOrganizationPresenceCounterById').and.returnValue(observableOf({}));
    component.ngOnInit();
    expect(spyOrgTrackS.subscribeOrganizationPresenceCounter).toHaveBeenCalled();
  });

});
