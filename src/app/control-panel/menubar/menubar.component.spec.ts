// tslint:disable
import {async, inject, TestBed} from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf} from 'rxjs';
import { MenubarComponent } from './menubar.component';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';
import { OrganizationService } from 'src/api/api';
import { Router } from '@angular/router';

@Injectable()
class MockDataService {}

@Injectable()
class MockAuthenticationService {
  SignOut(){}
}

@Injectable()
class MockOrganizationService {
  getOrganizationList(){}
}

@Injectable()
class MockRouter {
  navigate() {};
  navigateByUrl(url: string) { return url; }
}


describe('MenubarComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        MenubarComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: DataService, useClass: MockDataService },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: Router, useClass: MockRouter }
      ]
    }).overrideComponent(MenubarComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MenubarComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.os = component.os || {};
    spyOn(component.os, 'getOrganizationList').and.returnValue(observableOf({}));
    component.orgArr = component.orgArr || {};
    component.orgArr = '0';
    component.ds = component.ds || {};
    component.ds.org = {
      emit: function() {}
    };
    component.ngOnInit();
     expect(component.os.getOrganizationList).toHaveBeenCalled();
  });

  it('should run #setOrganization()', async () => {
    spyOn(component, 'setOrganization')
    component.ds = component.ds || {};
    component.ds.org = {
      emit: function() {}
    };
    component.setOrganization({});
    expect(component.setOrganization).toHaveBeenCalled();

  });

  it('should run #SignOut()', async () => {
    component.authenticationService = component.authenticationService || {};
    spyOn(component.authenticationService, 'SignOut');
    spyOn(component, 'navigateToLogin');
    component.SignOut();
    expect(component.authenticationService.SignOut).toHaveBeenCalled();
    expect(component.navigateToLogin).toHaveBeenCalled();
  });

  it('should run #homePage()', async () => {
    spyOn(component, 'homePage');
    component.ds = component.ds || {};
    component.ds.active_content = {
      emit: function() {}
    };
    component.homePage();
    expect(component.homePage).toHaveBeenCalled();
  });

  it('should run #navigateToLogin()', async () => {
    spyOn(component.router, 'navigateByUrl');
    component.router = component.router || {};
    component.navigateToLogin();
    expect(component.router.navigateByUrl).toHaveBeenCalled();
  });

  it('Should navigate to login after logout', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    component.navigateToLogin();
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/Login');
  }));

});
