import {TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContentComponent} from '../content/content.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;
import {AngularFireAuth} from '@angular/fire/auth';
import {AdministratorOrganizationDataService} from './AdministratorOrganizationData.service';
import {PlaceService} from '../..';
import {AdministratorPermissionDataService} from './AdministratorPermissionData.service';
import {Router} from '@angular/router';


describe('ContentComponent', () => {
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization', 'setupAccessTokenInAPIService', 'requireAdministratorOrganizations', 'getAdminOrganizations']);
  const spyAPDS = createSpyObj('AdministratorPermissionDataService', ['setupAccessTokenInAPIService', 'requireAdministratorPermissions', 'getUserPermissions']);
  const spyRouter = createSpyObj('Router', ['navigateByUrl']);
  const spyAngularFireAuth = createSpyObj('AdministratorOrganizationDataService', ['auth.onAuthStateChanged']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        ContentComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {provide: AdministratorOrganizationDataService, useValue: spyAODS},
        {provide: AdministratorPermissionDataService, useValue: spyAPDS},
        {provide: Router, useValue: spyRouter},
        {provide: AngularFireAuth, useValue: spyAngularFireAuth}
      ]
    });
  });
});
