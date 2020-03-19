import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFunctionalityComponent } from './menu-functionality.component';

describe('MenuFunctionalityComponent', () => {
  let component: MenuFunctionalityComponent;
  let fixture: ComponentFixture<MenuFunctionalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuFunctionalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
