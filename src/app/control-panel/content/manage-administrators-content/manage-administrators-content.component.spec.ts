import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdministratorsContent.Component.TsComponent } from './manage-administrators-content.component';

describe('ManageAdministratorsContent.Component.TsComponent', () => {
  let component: ManageAdministratorsContent.Component.TsComponent;
  let fixture: ComponentFixture<ManageAdministratorsContent.Component.TsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdministratorsContent.Component.TsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdministratorsContent.Component.TsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
