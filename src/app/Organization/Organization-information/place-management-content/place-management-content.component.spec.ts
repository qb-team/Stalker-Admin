import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceManagementContentComponent } from './place-management-content.component';

describe('ModifyPlaceManagementContentComponent', () => {
  let component: PlaceManagementContentComponent;
  let fixture: ComponentFixture<PlaceManagementContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceManagementContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceManagementContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
