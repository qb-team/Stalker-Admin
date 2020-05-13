import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsmMapContentPlaceComponent } from './osm-map-content-place.component';

describe('OsmMapContentComponent', () => {
  let component: OsmMapContentPlaceComponent;
  let fixture: ComponentFixture<OsmMapContentPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsmMapContentPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsmMapContentPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
