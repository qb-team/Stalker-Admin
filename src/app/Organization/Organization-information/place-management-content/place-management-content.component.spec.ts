import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceManagementContentComponent } from './place-management-content.component';
import createSpyObj = jasmine.createSpyObj;
import {HttpClient} from '@angular/common/http';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {PlaceService} from '../../../..';
import {FormBuilder} from '@angular/forms';

describe('ModifyPlaceManagementContentComponent', () => {
  const spyHttp = createSpyObj('HttpClient', ['get', 'post', 'update', 'delete']);
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization']);
  const spyPS = createSpyObj('PlaceService', ['getPlaceListOfOrganization', 'updatePlace', 'deletePlace', 'createNewPlace']);
  const spyFromBuilder = createSpyObj('FormBuilder', ['group']);
  let component: PlaceManagementContentComponent;
  let fixture: ComponentFixture<PlaceManagementContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceManagementContentComponent ],
      providers: [
        {provide: AdministratorOrganizationDataService, useValue: spyAODS},
        {provide: HttpClient, useValue: spyHttp},
        {provide: PlaceService, useValue: spyPS},
        {provide: FormBuilder, useValue: spyFromBuilder}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceManagementContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
