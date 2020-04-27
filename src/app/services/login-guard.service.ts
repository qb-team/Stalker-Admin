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
    let flag = localStorage.getItem('key');
    if (!flag) {
      return true;
    }
    this.router.navigateByUrl('/Content-panel/Panel/Homepage');
    return false;
  }
}
