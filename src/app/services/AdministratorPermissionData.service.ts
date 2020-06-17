import {EventEmitter, Injectable} from '@angular/core';
import {AdministratorService, Permission} from '../..';

@Injectable({
  providedIn: 'root'
})

export class AdministratorPermissionDataService {
  private userPermissions = new EventEmitter<Array<Permission>>();

  constructor(private as: AdministratorService) {
  }

  requireAdministratorPermissions(adminId: string) {
    this.as.getPermissionList(adminId).subscribe((p: Permission[]) => {
      p = this.orderPermissions(p);
      this.userPermissions.next(p);
    });
  }

  private orderPermissions(p: Permission[]) {
    p.sort((p1: Permission, p2: Permission) => {
      if (p1.administratorId > p2.administratorId) {
        return 1;
      }
      if (p1.administratorId < p2.administratorId) {
        return -1;
      }
      return 0;
    });
    return p;
  }

  setupAccessTokenInAPIService() {
    this.as.configuration.accessToken = localStorage.getItem('adminToken');
  }

  getUserPermissions(): EventEmitter < Array < Permission >> {
    return this.userPermissions;
  }

  setUserPermissions(p: EventEmitter<Array<Permission>>) {
    this.userPermissions = p;
  }
}
