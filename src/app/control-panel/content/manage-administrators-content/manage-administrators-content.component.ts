import { Component, OnInit } from '@angular/core';
import {AdministratorService, Permission} from '../../../..';
import {AdministratorDataService} from '../../../services/AdministratorData.service';

@Component({
  selector: 'app-manage-administrators-content.component.ts',
  templateUrl: './manage-administrators-content.component.html',
  styleUrls: ['./manage-administrators-content.component.css']
})
// this component is exclusively visible to the owner administrator
export class ManageAdministratorsContentComponent implements OnInit {
  /*
  * A collection of the permissions of the administrators of the current organization
   */
  private permissions: Array<Permission>;

  /*
  * A collection of the permissions to be modified
   */
  private permissionModifications: Array<Permission>;

  constructor(ads: AdministratorDataService, as: AdministratorService) { }

  ngOnInit(): void {
  }

  /*
  * Adds a permission with the new administrator's priviledge level to permissionModifications.
  * If permissionModifications already conains a modification for that administrator, the old one will be replaced with the new one of this method
   */
  private addPermissionModificationInstance(): void {

  }

  /*
  * Compares the permissions from the permissionModifications with the ones from permissions. The permissions of administrators that has recieved new priviledges
  * will replace the old ones in permissions using modifyPriviledgesOf(adminId, newPriviledgeLevel)
   */
  private updatePermissionList(): void {

  }
}
