import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyOrganizationTrackingAreaContentComponent } from './modify-organization-tracking-area-content.component';
import createSpyObj = jasmine.createSpyObj;
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {OrganizationService} from '../../../..';
import {FormBuilder} from '@angular/forms';

describe('ModifyPlaceTrackingAreaContentComponent', () => {
  let component: ModifyOrganizationTrackingAreaContentComponent;
  let fixture: ComponentFixture<ModifyOrganizationTrackingAreaContentComponent>;
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization']);
  const spyOS = createSpyObj('OrganizationService', ['updateOrganization', 'requestDeletionOfOrganization']);
  const spyFromBuilder = createSpyObj('FormBuilder', ['group']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyOrganizationTrackingAreaContentComponent ],
      providers: [
        {provide: AdministratorOrganizationDataService, useValue: spyAODS},
        {provide: OrganizationService, useValue: spyOS},
        {provide: FormBuilder, useValue: spyFromBuilder}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyOrganizationTrackingAreaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
