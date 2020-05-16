import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserAuthenticatedAccessesComponent } from './single-user-authenticated-accesses.component';

describe('SingleUserAuthenticatedAccessesComponent', () => {
  let component: SingleUserAuthenticatedAccessesComponent;
  let fixture: ComponentFixture<SingleUserAuthenticatedAccessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleUserAuthenticatedAccessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserAuthenticatedAccessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
