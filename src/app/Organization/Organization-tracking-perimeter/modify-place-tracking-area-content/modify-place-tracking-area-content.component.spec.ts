import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPlaceTrackingAreaContentComponent } from './modify-place-tracking-area-content.component';

describe('ModifyPlaceTrackingAreaContentComponent', () => {
  let component: ModifyPlaceTrackingAreaContentComponent;
  let fixture: ComponentFixture<ModifyPlaceTrackingAreaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPlaceTrackingAreaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPlaceTrackingAreaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
