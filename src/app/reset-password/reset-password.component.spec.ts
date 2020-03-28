import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import {AuthenticationService} from '../services/authentication.service';
import {AuthenticationServiceMockReturnsTrueService} from '../Mock/authentication-service-mock-returns-true.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {DataService} from '../services/data.service';
import {By} from '@angular/platform-browser';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ ResetPasswordComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceMockReturnsTrueService },
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
});
