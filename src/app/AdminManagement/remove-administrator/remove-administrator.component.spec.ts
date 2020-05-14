import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAdministratorComponent } from './remove-administrator.component';

describe('RemoveAdministratorComponent', () => {
  let component: RemoveAdministratorComponent;
  let fixture: ComponentFixture<RemoveAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
