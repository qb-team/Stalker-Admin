import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelComponent } from './control-panel.component';
import {AuthenticationService} from '../services/authentication.service';
import {AuthenticationServiceMockReturnsTrueService} from '../Mock/authentication-service-mock-returns-true.service';
import {DataService} from '../services/data.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [ ControlPanelComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceMockReturnsTrueService },
        AngularFireAuth ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
