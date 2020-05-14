import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindAdministratorComponent } from './bind-administrator.component';

describe('BindAdministratorComponent', () => {
  let component: BindAdministratorComponent;
  let fixture: ComponentFixture<BindAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
