import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import {AuthenticationService} from '../services/authentication.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {DataService} from '../services/data.service';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let el: HTMLElement;
  let mockRouter: any;
  class MockRouter {
    navigate = jasmine.createSpy('navigate');
    navigateByUrl(url: string) { return url; }
  }

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ ResetPasswordComponent ],
      providers: [ { provide: Router, useValue: mockRouter },
        DataService,
        AngularFireAuth ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call back', async(() => {
    spyOn(component, 'back');
    const createButton = fixture.debugElement.query(By.css('#backBtn'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.back).toHaveBeenCalled();
  }));

  it('should create label contain "email"', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#labelE')).nativeElement.innerText).toEqual('Email:');
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
    expect(component.reset).toEqual(false);
  }));

  it(`should call resesPassword`, async(() => {
    spyOn(component, 'resetPassword');
    const createButton = fixture.debugElement.query(By.css('#resetBtn'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.resetPassword).toHaveBeenCalled();
  }));
});
