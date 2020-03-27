import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTrackUsersGeneralInformationComponent } from './content-track-users-general-information.component';
import {DataService} from '../../../../services/data.service';
import {Organization} from '../../../../..';

describe('ContentTrackUsersGeneralInformationComponent', () => {
  let component: ContentTrackUsersGeneralInformationComponent;
  let fixture: ComponentFixture<ContentTrackUsersGeneralInformationComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTrackUsersGeneralInformationComponent],
      providers: [ DataService ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent( ContentTrackUsersGeneralInformationComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
