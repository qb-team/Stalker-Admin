import {EventEmitter, Injectable} from '@angular/core';
import {Permission} from '../..';

@Injectable({
  providedIn: 'root'
})

export class AdministratorPermissionDataService {
  private userPermissions = new EventEmitter<Array<Permission>>();

  constructor(private as: AdministratorService) {
  }

  requireAdministratorPermissions(adminId: string) {
    console.log('load permission');
    this.as.getPermissionList(adminId).subscribe((p: Permission[]) => {
      this.userPermissions.next(p);
    });
    console.log('Got PermList');
  }


  getUserPermissions(): EventEmitter < Array < Permission >> {
    return this.userPermissions;
  }

  setUserPermissions(p: EventEmitter<Array<Permission>>) {
    this.userPermissions = p;
  }
}
