// tslint:disable
import { async, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf} from 'rxjs';
import { OrganizationInformationContentComponent } from './organization-information-content.component';

@Injectable()
class MockDataService {

}

describe('ContentTrackUsersGeneralInformationComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        OrganizationInformationContentComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: []
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
    component.ds = component.ds || {};
    component.ds.getOrganization = observableOf({});
    spyOn(component.ds.getOrganization, 'subscribe');
    component.ngOnInit();
    expect(component.ds.getOrganization.subscribe).toHaveBeenCalled();
  });

});
