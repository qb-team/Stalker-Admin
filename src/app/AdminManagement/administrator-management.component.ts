import { Component, OnInit } from '@angular/core';
import {AdministratorService, Permission} from '../../index';
import {AdministratorOrganizationDataService} from '../services/AdministratorOrganizationData.service';

@Component({
  selector: 'app-manage-administrators-content.component.ts',
  templateUrl: './administrator-management.component.html',
  styleUrls: ['./administrator-management.component.css']
})
// this component is exclusively visible to the owner administrator
export class AdministratorManagementComponent implements OnInit {
  /*
  * A collection of the permissions of the administrators of the current organization
   */
  private permissions: Array<Permission>;

  /*
  * A collection of the permissions to be modified
   */
  private permissionModifications: Array<Permission>;

  constructor(ads: AdministratorOrganizationDataService, as: AdministratorService) { }

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
