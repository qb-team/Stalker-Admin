import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTrackUsersComponent } from './content-track-users.component';

describe('ContentTrackUsersComponent', () => {
  let component: ContentTrackUsersComponent;
  let fixture: ComponentFixture<ContentTrackUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTrackUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTrackUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
