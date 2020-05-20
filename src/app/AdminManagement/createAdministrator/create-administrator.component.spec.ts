import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdministratorComponent } from './create-administrator.component';
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
  let component: CreateAdministratorComponent;
  let fixture: ComponentFixture<CreateAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdministratorComponent ],
      providers: [{provide: HttpClient, useValue: spyHttp},
        {provide: Router, useValue: spyRouter},
        {provide: AdministratorOrganizationDataService, useValue: spyAODS},
        {provide: AdministratorService, useValue: spyAS}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
