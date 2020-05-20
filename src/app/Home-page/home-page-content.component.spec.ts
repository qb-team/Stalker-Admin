import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageContentComponent } from './home-page-content.component';
import {By} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;
import {Router} from '@angular/router';
import {AdministratorOrganizationDataService} from '../services/AdministratorOrganizationData.service';

describe('ContentHomeComponent', () => {
  const spyHttp = createSpyObj('HttpClient', ['get', 'post', 'update', 'delete']);
  const spyRouter = createSpyObj('Router', ['navigateByUrl']);
  const spyAODS = createSpyObj('AdministratorOrganizationDataService', ['getOrganization']);
  let component: HomePageContentComponent;
  let fixture: ComponentFixture<HomePageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageContentComponent ],
      providers: [{provide: HttpClient, useValue: spyHttp},
        {provide: Router, useValue: spyRouter},
        { provide: AdministratorOrganizationDataService, useValue: spyAODS }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tag h1 to contain "Benvenuto amministratore!"', () => {
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.innerText).toContain('Benvenuto amministratore!');
  });

  it('should not create tag p ', () => {
    expect(fixture.debugElement.query(By.css('p'))).toBeNull();
  });
});
