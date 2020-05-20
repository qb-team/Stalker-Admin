import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdministratorComponent } from './create-administrator.component';
import {HttpClient} from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;
import {Router} from '@angular/router';
import {AdministratorOrganizationDataService} from '../../services/AdministratorOrganizationData.service';
import {AdministratorService, Organization} from '../../..';
import {Observable, of, ReplaySubject} from 'rxjs';

fdescribe('CreateAdministratorComponent', () => {
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
    const organ: Organization = {
      id: 1,
      name: 'Sample name',
      street: 'Sample street',
      number: 'Sample number',
      postCode: 12345,
      city: 'Sample city',
      country: 'Sample country',
      creationDate: new Date(1, 1),
      lastChangeDate: new Date(1, 1),
      trackingArea: 'coords',
      trackingMode: Organization.TrackingModeEnum.Anonymous
    };
    // spyOn(spyAODS, 'getOrganization').and.returnValue(organ);
    const repl = new ReplaySubject<Organization>(1);
    repl.next(organ);
    spyAODS.getOrganization.and.returnValue(repl);
    fixture = TestBed.createComponent(CreateAdministratorComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
