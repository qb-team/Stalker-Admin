import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';

describe('Service: Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [AuthenticationService,
        AngularFireAuth ]
    });
  });

  it('should create the authentication service', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
