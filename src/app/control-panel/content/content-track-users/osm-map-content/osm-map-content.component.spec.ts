import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsmMapContentComponent } from './osm-map-content.component';

describe('OsmMapContentComponent', () => {
  let component: OsmMapContentComponent;
  let fixture: ComponentFixture<OsmMapContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsmMapContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsmMapContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
