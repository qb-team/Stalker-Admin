import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTrackUsersGeneralInformationComponent } from './content-track-users-general-information.component';
import {DataService} from '../../../../services/data.service';

describe('ContentTrackUsersGeneralInformationComponent', () => {
  let component: ContentTrackUsersGeneralInformationComponent;
  let fixture: ComponentFixture<ContentTrackUsersGeneralInformationComponent>;
  let ds: DataService;


  beforeEach(() => {
    ds = new DataService();
    TestBed.configureTestingModule({
      declarations: [ ContentTrackUsersGeneralInformationComponent],
      providers: [ { provide: DataService, useValue: ds } ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent( ContentTrackUsersGeneralInformationComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe when ngOnInit is invoked', () => {
    spyOn(ds.organization, 'subscribe');
    component.ngOnInit();
    expect(ds.organization.subscribe).toHaveBeenCalled();
  });
});
