import {Router, CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ManagerGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> |  Promise<boolean> | boolean {
    console.log('perm');
    if (localStorage.getItem('perm') === '2' || localStorage.getItem('perm') === '3') {
      return true;
    } else {
      this.router.navigateByUrl('/Content-panel');
      return false;
    }
  }
}
