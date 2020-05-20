import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationManagementContentComponent } from './organization-management-content.component';
import createSpyObj = jasmine.createSpyObj;
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {HttpClient} from '@angular/common/http';
import {OrganizationService} from '../../../..';

describe('OrganizationManagementContentComponent', () => {
  let component: OrganizationManagementContentComponent;
  let fixture: ComponentFixture<OrganizationManagementContentComponent>;
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization']);
  const spyOS = createSpyObj('OrganizationService', ['updateOrganization', 'requestDeletionOfOrganization']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationManagementContentComponent ],
      providers: [{provide: AdministratorOrganizationDataService, useValue: spyAODS},
        {provide: OrganizationService, useValue: spyOS}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationManagementContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
