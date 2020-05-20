import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPlaceTrackingAreaContentComponent } from './modify-place-tracking-area-content.component';
import createSpyObj = jasmine.createSpyObj;
import {HttpClient} from '@angular/common/http';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {PlaceService} from '../../../..';
import {FormBuilder} from '@angular/forms';

describe('ModifyPlaceTrackingAreaContentComponent', () => {
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization']);
  const spyFormBuilder = createSpyObj('FormBuilder', ['group']);
  const spyHttp = createSpyObj('HttpClient', ['get', 'post', 'update', 'delete']);
  const spyPlaceService = createSpyObj('PlaceService', ['getPlaceListOfOrganization']);
  let component: ModifyPlaceTrackingAreaContentComponent;
  let fixture: ComponentFixture<ModifyPlaceTrackingAreaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPlaceTrackingAreaContentComponent ],
      providers: [
        {provide: AdministratorOrganizationDataService, useValue: spyAODS},
        {provide: PlaceService, useValue: spyPlaceService},
        {provide: HttpClient, useValue: spyHttp},
        {provide: FormBuilder, useValue: spyFormBuilder}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPlaceTrackingAreaContentComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
