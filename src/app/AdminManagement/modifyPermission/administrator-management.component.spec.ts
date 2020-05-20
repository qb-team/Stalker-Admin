import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorManagementComponent } from './administrator-management.component';
import {HttpClient} from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;
import {Router} from '@angular/router';
import {AdministratorOrganizationDataService} from '../../services/AdministratorOrganizationData.service';
import {AdministratorService} from '../../..';

describe('CreateAdministratorComponent', () => {
  const spyHttp = createSpyObj('HttpClient', ['get', 'post', 'update', 'delete']);
  const spyRouter = createSpyObj('Router', ['navigateByUrl']);
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization']);
  const spyAS = createSpyObj('AdministratorService', ['bindAdministratorToOrganization']);
  let component: AdministratorManagementComponent;
  let fixture: ComponentFixture<AdministratorManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorManagementComponent ],
      providers: [{provide: HttpClient, useValue: spyHttp},
        {provide: Router, useValue: spyRouter},
        {provide: AdministratorOrganizationDataService, useValue: spyAODS},
        {provide: AdministratorService, useValue: spyAS}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
