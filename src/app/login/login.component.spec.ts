import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { AuthenticationService} from '../services/authentication.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {DataService} from '../services/data.service';
import {DebugElement} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {environment} from '../../environments/environment';
import {AuthenticationServiceMockReturnsTrueService} from '../Mock/authentication-service-mock-returns-true.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let dataService: DataService;
  let afAuth: AngularFireAuth;
  let spy: jasmine.Spy;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
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
    de = fixture.debugElement;
    // DataService = de.injector.get();
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
    component.contactForm.controls.email.setValue('asd@asd.com');
    component.contactForm.controls.password.setValue('textpoiu');
    expect(component.contactForm.valid).toBeTruthy();
  }));
});
