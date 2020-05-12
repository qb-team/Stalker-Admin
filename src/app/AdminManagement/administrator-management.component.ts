import { Component, OnInit } from '@angular/core';
import {AdministratorService, Organization, Permission} from '../../index';
import {AdministratorOrganizationDataService} from '../services/AdministratorOrganizationData.service';


export enum permissionLevel {
  Visualizzatore,
  Gestore,
  Proprietario
}

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

  private permissionLevel: permissionLevel;

  /*
  * A collection of the permissions to be modified
   */
  private permissionModifications: Array<Permission> = new Array<Permission>();

  permissionModificationsTableText: string[];

  private currentOrganization: Organization;

  constructor(private ads: AdministratorOrganizationDataService, private as: AdministratorService) { }

  ngOnInit(): void {
    this.subscribeToOrganziation();
  }

  subscribeToOrganziation() {
    this.ads.getOrganization.subscribe((o: Organization) => {
      if (o !== undefined) {
        this.currentOrganization = o;
        this.subscribeToAdministratorPermissions();
      }
    });
  }

  subscribeToAdministratorPermissions() {
    console.log('Subscribed to permissions');
    this.as.getAdministratorListOfOrganization(this.currentOrganization.id).subscribe((permArr: Array<Permission>) => {
      permArr.splice(permArr.findIndex(org => org.administratorId === localStorage.getItem('uid')), 1);
      this.permissions = permArr;
      this.permissionModificationsTableText = new Array<string>(this.permissions.length);
    });
  }

  /*
  * Adds a permission with the new administrator's priviledge level to permissionModifications.
  * If permissionModifications already conains a modification for that administrator, the old one will be replaced with the new one of this method
   */
  addPermissionModificationInstance(click: any, newPriviledge: number): void {
    const adminId = click.target.parentNode.id;
    if (newPriviledge !== this.getPermissionTierOf(adminId)) {
      if (this.alreadyModified(adminId) === -1) {
        const p: Permission = {
          administratorId: adminId,
          organizationId: this.currentOrganization.id,
          /*Administrator unique identifier from the authentication server of the organization.
          orgAuthServerId?: string;*/
          permission: newPriviledge,
          nominatedBy: localStorage.getItem('uid')
        };
        this.permissionModifications.push(p);
      } else {
        this.permissionModifications[this.permissionModifications.findIndex((p: Permission) => p.administratorId === adminId)].permission = newPriviledge;
      }
    }
  }

  updateModifiedPermissionOnTable(ind: number, perm: string) {
    this.permissionModificationsTableText[ind] = perm;
  }

  /*
  * Compares the permissions from the permissionModifications with the ones from permissions. The permissions of administrators that has recieved new priviledges
  * will replace the old ones in permissions using modifyPriviledgesOf(adminId, newPriviledgeLevel)
   */
  public updatePermissionList(): void {
  }

  get getPermissions() {
    return this.permissions;
  }

  get getPermissionModifications() {
    return this.permissionModifications;
  }

  get getCurrentOrganization() {
    return this.currentOrganization;
  }

  getPermissionLevelNoun(permission: number) {
    return permissionLevel[permission - 1]; // we subtract 1 as the permission levels goes from 1 to 3, but in the enum they goes from 0 to 2
  }

  private getPermissionTierOf(adminId: string) {
    return this.permissions[this.permissions.findIndex((p: Permission) => p.administratorId === adminId)].permission;
  }


  /*
  * returns the index of the admin modification instance or -1 if the admin has not been modified yet
   */
  private alreadyModified(adminId: string) {
    return this.permissionModifications.findIndex((p: Permission) => p.administratorId === adminId);
  }
}
