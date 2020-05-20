import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePresenceNumberComponent } from './place-presence-number.component';
import createSpyObj = jasmine.createSpyObj;
import {HttpClient} from '@angular/common/http';
import {PlaceService} from '../../../..';
import {OrganizationTrackingDataService} from '../../../services/OrganizationTrackingData.service';
import {PlaceTrackingDataService} from '../../../services/PlaceTrackingData.service';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
class MockActivatedRoute {

}

describe('PlacePresenceNumberComponent', () => {
  const spyHttp = createSpyObj('HttpClient', ['get', 'post', 'update', 'delete']);
  const spyPS = createSpyObj('PlaceService', ['getPlaceListOfOrganization', 'updatePlace', 'deletePlace', 'createNewPlace']);
  const spyPlaTrackS = createSpyObj('PlaceTrackingDataService', ['subscribePlacePresenceCounter', 'getUserNumber']);
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization']);
  const spyRouter = createSpyObj('Router', ['getCurrentNavigation']);

  const mockActivatedRoute = new MockActivatedRoute();
  let component: PlacePresenceNumberComponent;
  let fixture: ComponentFixture<PlacePresenceNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacePresenceNumberComponent ],
      providers: [{provide: HttpClient, useValue: spyHttp},
        {provide: AdministratorOrganizationDataService, useValue: spyAODS},
        {provide: PlaceService, useValue: spyPS},
        { provide: Router, useClass: spyRouter },
        { provide: PlaceTrackingDataService, useClass: spyPlaTrackS },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacePresenceNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
