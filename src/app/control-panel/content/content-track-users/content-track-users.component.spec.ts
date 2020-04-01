import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTrackUsersComponent } from './content-track-users.component';
import {DataService} from '../../../services/data.service';

describe('ContentTrackUsersComponent', () => {
  let component: ContentTrackUsersComponent;
  let fixture: ComponentFixture<ContentTrackUsersComponent>;
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

  beforeEach(async(() => {
    mockOrganization = new MockOrganization();
    TestBed.configureTestingModule({
      declarations: [ ContentTrackUsersComponent ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTrackUsersComponent);
    component = fixture.componentInstance;
    component.org = mockOrganization;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
