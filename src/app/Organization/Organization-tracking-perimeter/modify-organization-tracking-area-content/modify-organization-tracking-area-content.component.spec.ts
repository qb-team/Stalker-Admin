import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyOrganizationTrackingAreaContentComponent } from './modify-organization-tracking-area-content.component';

describe('ModifyPlaceTrackingAreaContentComponent', () => {
  let component: ModifyOrganizationTrackingAreaContentComponent;
  let fixture: ComponentFixture<ModifyOrganizationTrackingAreaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyOrganizationTrackingAreaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyOrganizationTrackingAreaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
