import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePresenceNumberComponent } from './place-presence-number.component';

describe('PlacePresenceNumberComponent', () => {
  let component: PlacePresenceNumberComponent;
  let fixture: ComponentFixture<PlacePresenceNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacePresenceNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacePresenceNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
