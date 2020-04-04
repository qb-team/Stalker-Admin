// tslint:disable
import { TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf} from 'rxjs';

import { ContentTrackUsersNumberComponent } from './content-track-users-number.component';
import { DataService } from 'src/app/services/data.service';
import { PresenceService } from 'src/api/api';

@Injectable()
class MockDataService {}

@Injectable()
class MockPresenceService {
  getOrganizationPresenceCounterById(){}
}

describe('ContentTrackUsersNumberComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ContentTrackUsersNumberComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: DataService, useClass: MockDataService },
        { provide: PresenceService, useClass: MockPresenceService }
      ]
    }).overrideComponent(ContentTrackUsersNumberComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ContentTrackUsersNumberComponent);
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
    component.ps = component.ps || {};
    spyOn(component.ps, 'getOrganizationPresenceCounterById').and.returnValue(observableOf({}));
    component.ngOnInit();
    expect(component.ps.getOrganizationPresenceCounterById).toHaveBeenCalled();
  });

});
