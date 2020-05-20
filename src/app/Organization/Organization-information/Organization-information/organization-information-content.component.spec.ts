// tslint:disable
import { TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf} from 'rxjs';
import { OrganizationInformationContentComponent } from './organization-information-content.component';
import {HttpClient} from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';

@Injectable()
class MockDataService {

}

describe('OrganizationInformationContentComponent', () => {
  const spyHttp = createSpyObj('HttpClient', ['get', 'post', 'update', 'delete']);
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization']);
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        OrganizationInformationContentComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [{provide: HttpClient, useValue: spyHttp},
        {provide: AdministratorOrganizationDataService, useValue: spyAODS}
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

  it('should run #ngOnInit()', async () => {
    spyOn(component.ads.getOrganization, 'subscribe');
    component.ngOnInit();
    expect(component.ads.getOrganization.subscribe).toHaveBeenCalled();
  });

});
