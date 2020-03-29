import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    this.auth.userData.subscribe((authenticated) => {
      if (authenticated) {
        console.log('loggato');
        return true;
      }
      this.router.navigateByUrl('/Login');
      console.log('non loggato');
      return false;
    });
    return ;
  }
}
