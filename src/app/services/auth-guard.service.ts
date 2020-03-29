import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService} from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.userData) {
      this.router.navigate(['/Login']);
      console.log('Non loggato');
      return false;
    } else {
      console.log('Non loggato');
      return true;
    }
  }
}
