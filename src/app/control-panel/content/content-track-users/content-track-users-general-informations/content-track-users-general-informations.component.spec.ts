import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTrackUsersGeneralInformationsComponent } from './content-track-users-general-informations.component';

describe('ContentTrackUsersGeneralInformationsComponent', () => {
  let component: ContentTrackUsersGeneralInformationsComponent;
  let fixture: ComponentFixture<ContentTrackUsersGeneralInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTrackUsersGeneralInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTrackUsersGeneralInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
