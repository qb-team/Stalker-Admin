import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import {AuthenticationService} from '../services/authentication.service';
import {AuthenticationServiceMockReturnsTrueService} from '../Mock/authentication-service-mock-returns-true.service';
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
  }

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ ResetPasswordComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceMockReturnsTrueService },
        { provide: Router, useValue: mockRouter },
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
    const createPasteButton = fixture.debugElement.query(By.css('#backBtn'));
    createPasteButton.triggerEventHandler('click', null);
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
});
