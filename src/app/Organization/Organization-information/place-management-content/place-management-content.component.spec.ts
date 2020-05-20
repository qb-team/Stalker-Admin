import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceManagementContentComponent } from './place-management-content.component';
import createSpyObj = jasmine.createSpyObj;
import {HttpClient} from '@angular/common/http';

describe('ModifyPlaceManagementContentComponent', () => {
  const spyHttp = createSpyObj('HttpClient', ['get', 'post', 'update', 'delete']);
  let component: PlaceManagementContentComponent;
  let fixture: ComponentFixture<PlaceManagementContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceManagementContentComponent ],
      providers: [{provide: HttpClient, useValue: spyHttp}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceManagementContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
