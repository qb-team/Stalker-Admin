import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

   canActivate(): Observable<boolean> |  Promise<boolean> | boolean {

    if ( this.auth.isLoggedIn()) {
      return true;
    }
    let flag = localStorage.getItem('key');
    if (flag) {
      return true;
    }
    this.router.navigateByUrl('/Login');
    return false;
  }
}
