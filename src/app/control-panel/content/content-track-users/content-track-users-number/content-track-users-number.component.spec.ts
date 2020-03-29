import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService} from '../../../../services/data.service';

import { ContentTrackUsersNumberComponent } from './content-track-users-number.component';

describe('ContentTrackUsersNumberComponent', () => {
  let component: ContentTrackUsersNumberComponent;
  let fixture: ComponentFixture<ContentTrackUsersNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTrackUsersNumberComponent ],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTrackUsersNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
