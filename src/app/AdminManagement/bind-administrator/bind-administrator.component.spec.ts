import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindAdministratorComponent } from './bind-administrator.component';
import {HttpClient} from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;

describe('BindAdministratorComponent', () => {
  const spyHttp = createSpyObj('HttpClient', ['get', 'post', 'update', 'delete']);
  let component: BindAdministratorComponent;
  let fixture: ComponentFixture<BindAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindAdministratorComponent ],
      providers: [{provide: HttpClient, useValue: spyHttp}]
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
