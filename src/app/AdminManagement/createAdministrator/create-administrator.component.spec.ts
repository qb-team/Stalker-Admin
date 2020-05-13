import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdministratorComponent } from './create-administrator.component';

describe('CreateAdministratorComponent', () => {
  let component: CreateAdministratorComponent;
  let fixture: ComponentFixture<CreateAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
