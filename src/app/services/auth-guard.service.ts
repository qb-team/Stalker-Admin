import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

   canActivate(): Observable<boolean> |  Promise<boolean> | boolean {

    if ( this.auth.isLoggedIn()) {
      console.log('CanActivate: true because isLoggedIn() === true');
      return true;
    }
    const flag = localStorage.getItem('key');
    if (flag) {
      console.log('CanActivate: true because flag from localStorage (key) === true');
      return true;
    }
    console.log('Back to login because cannot activate');
    this.router.navigateByUrl('/Login');
    return false;
  }
}
