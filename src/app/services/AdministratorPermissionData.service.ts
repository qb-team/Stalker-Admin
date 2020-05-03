import {EventEmitter, Injectable} from '@angular/core';
import {Permission} from '../..';

@Injectable({
  providedIn: 'root'
})

export class AdministratorPermissionDataService {
  private userPermissions = new EventEmitter<Array<Permission>>();

  getUserPermissions(): EventEmitter<Array<Permission>> {
    return this.userPermissions;
  }
}
