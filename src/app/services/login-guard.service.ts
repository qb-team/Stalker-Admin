import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(): Observable<boolean> |  Promise<boolean> | boolean {
    const flag = localStorage.getItem('key');
    if (!flag) {
      console.log('User not logged, redirecting to LOGIN');
      return true;
    }
    console.log('navigateBuUrl Homepage request');
    this.router.navigateByUrl('/Content-panel/Panel/Homepage').then((b: boolean) => { console.log('navigateBuUrl to homepage succeded: ' + b); });
    return false;
  }
}
