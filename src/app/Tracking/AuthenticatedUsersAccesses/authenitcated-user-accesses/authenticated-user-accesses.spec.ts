import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedUserAccessesComponent } from './authenticated-user-accesses.component';

describe('AuthenticatedUserAccessesComponent', () => {
  let component: AuthenticatedUserAccessesComponent;
  let fixture: ComponentFixture<AuthenticatedUserAccessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatedUserAccessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedUserAccessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
