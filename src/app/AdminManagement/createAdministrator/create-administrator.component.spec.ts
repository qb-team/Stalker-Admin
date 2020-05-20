import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdministratorComponent } from './create-administrator.component';
import {HttpClient} from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;

describe('CreateAdministratorComponent', () => {
  const spyHttp = createSpyObj('HttpClient', ['get', 'post', 'update', 'delete']);
  let component: CreateAdministratorComponent;
  let fixture: ComponentFixture<CreateAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdministratorComponent ],
      providers: [{provide: HttpClient, useValue: spyHttp}]
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
