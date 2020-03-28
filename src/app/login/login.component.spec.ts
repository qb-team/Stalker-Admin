import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { AuthenticationService} from '../services/authentication.service';
import {AngularFireModule} from '@angular/fire';
import {DataService} from '../services/data.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {By} from '@angular/platform-browser';
import {environment} from '../../environments/environment';
import {AuthenticationServiceMockReturnsTrueService} from '../Mock/authentication-service-mock-returns-true.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ LoginComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceMockReturnsTrueService },
        DataService,
        AngularFireAuth ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shouldn\'t call signIn function' , () => {
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('#signInBtn')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });

  it(`form should be invalid`, async(() => {
    component.contactForm.controls.email.setValue('');
    component.contactForm.controls.password.setValue('');
    expect(component.contactForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    component.contactForm.controls.email.setValue('sample@mail.com');
    component.contactForm.controls.password.setValue('samplepsw');
    expect(component.contactForm.valid).toBeTruthy();
  }));

  it('should call callResetPassword', async(() => {
    spyOn(component, 'CallResetPassword');
    const createPasteButton = fixture.debugElement.query(By.css('#resetPswBtn'));
    createPasteButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.CallResetPassword).toHaveBeenCalled();
  }));
});
