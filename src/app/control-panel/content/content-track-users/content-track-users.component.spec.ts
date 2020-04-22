// tslint:disable
import { async, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf} from 'rxjs';
import { ContentTrackUsersComponent } from './content-track-users.component';
import { DataService } from 'src/app/services/data.service';

@Injectable()
class MockDataService {}

describe('ContentTrackUsersComponent', () => {
  let fixture;
  let component;
  let mockOrganization: any;
  class MockOrganization {
    trackingArea = '[\n' +
      '    {\n' +
      '        "lat": 12.34567890,\n' +
      '        "long": 12.34567890\n' +
      '    },\n' +
      '    {\n' +
      '        "lat": 12.34567890,\n' +
      '        "long": 12.34567890\n' +
      '    },\n' +
      '    {\n' +
      '        "lat": 12.34567890,\n' +
      '        "long": 12.34567890\n' +
      '    },\n' +
      '    {\n' +
      '        "lat": 12.34567890,\n' +
      '        "long": 12.34567890\n' +
      '    }\n' +
      ']';
  }

  beforeEach(() => {
    mockOrganization = new MockOrganization();
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ContentTrackUsersComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    }).overrideComponent(ContentTrackUsersComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ContentTrackUsersComponent);
    component = fixture.debugElement.componentInstance;
    component.org = mockOrganization;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });
/*
  it('should run #ngOnInit()', async () => {
    component.ds = component.ds || {};
    component.ds.getOrganization = observableOf({
      trackingArea: 'trackingArea'
    });
    spyOn(component.ds.getOrganization, 'subscribe');
    component.ngOnInit();
    expect(component.ds.getOrganization.subscribe).toHaveBeenCalled();
  });
*/
});
