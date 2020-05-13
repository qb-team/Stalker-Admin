import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlaceTrackingAreaContentComponent } from './view-place-tracking-area-content.component';

describe('ViewPlaceTrackingAreaContentComponent', () => {
  let component: ViewPlaceTrackingAreaContentComponent;
  let fixture: ComponentFixture<ViewPlaceTrackingAreaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlaceTrackingAreaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlaceTrackingAreaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
