// tslint:disable
import {async, inject, TestBed} from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ResetPasswordComponent } from './reset-password.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import {AngularFireModule} from '@angular/fire';

@Injectable()
class MockAuthenticationService {
  userData;
  resetPassword(email) { }
}

@Injectable()
class MockRouter {
  navigate = jasmine.createSpy('navigate');
  navigateByUrl(url: string) { return url; }
}

describe('ResetPasswordComponent', () => {
  let fixture;
  let component;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AngularFireModule.initializeApp(environment.firebase), FormsModule, ReactiveFormsModule ],
      declarations: [
        ResetPasswordComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useClass: MockRouter }
      ]
    }).overrideComponent(ResetPasswordComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ResetPasswordComponent);
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

    component.ngOnInit();

  });

  /*it('should run #back()', async () => {
    component.router = component.router || {};
    spyOn(component.router, 'navigateByUrl');
    component.back();
     expect(component.router.navigateByUrl).toHaveBeenCalled();
  });*/

  it('should run #resetPassword()', async () => {
    component.authenticationService = component.authenticationService || {};
    spyOn(component.authenticationService, 'resetPassword');
    component.resetPassword();
    expect(component.authenticationService.resetPassword).toHaveBeenCalled();
  });

  it('should run #createForm()', async () => {
    component.setupResetPswForm();
    expect(component.setupResetPswForm).toBeTruthy();
  });

  it('should run #onSubmit()', async () => {
    component.onSubmit();
    expect(component.submitted).toBe(true);
  });

  it('should call backToLogin', async(() => {
    spyOn(component, 'backToLogin');
    const createButton = fixture.debugElement.query(By.css('#backBtn'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.backToLogin).toHaveBeenCalled();
  }));

  it('should create label contain "email"', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#labelE')).nativeElement.innerText).toEqual('Email');
  });

  it('should create input-email empty', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#email')).nativeElement.innerText).toEqual('');
  });

  it('shouldn\'t call reset password function' , () => {
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('#resetBtn')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });

  it(`form should be invalid`, async(() => {
    component.contactForm.controls.email.setValue('');
    expect(component.contactForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    component.contactForm.controls.email.setValue('sample@mail.com');
    expect(component.contactForm.valid).toBeTruthy();
  }));

  it('Should log in and navigate to dashboard', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    component.back();
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/Login');
  }));

  it(`should call resesPassword`, async(() => {
    spyOn(component, 'resetPassword');
    const createButton = fixture.debugElement.query(By.css('#resetBtn'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.resetPassword).toHaveBeenCalled();
  }));
});
