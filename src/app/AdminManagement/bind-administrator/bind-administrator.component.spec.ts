import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindAdministratorComponent } from './bind-administrator.component';
import {HttpClient} from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;
import {AdministratorOrganizationDataService} from '../../services/AdministratorOrganizationData.service';
import {AdministratorService} from '../../..';

describe('BindAdministratorComponent', () => {
  const spyHttp = createSpyObj('HttpClient', ['get', 'post', 'update', 'delete']);
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization']);
  const spyAS = createSpyObj('AdministratorService', ['bindAdministratorToOrganization']);
  let component: BindAdministratorComponent;
  let fixture: ComponentFixture<BindAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindAdministratorComponent ],
      providers: [{provide: HttpClient, useValue: spyHttp},
        {provide: AdministratorOrganizationDataService, useValue: spyAODS},
        {provide: AdministratorService, useValue: spyAS}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
