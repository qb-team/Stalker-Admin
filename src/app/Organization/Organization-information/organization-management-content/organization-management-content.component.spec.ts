import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationManagementContentComponent } from './organization-management-content.component';

describe('OrganizationManagementContentComponent', () => {
  let component: OrganizationManagementContentComponent;
  let fixture: ComponentFixture<OrganizationManagementContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationManagementContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationManagementContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
