/*
 * Service for authentication
*/
import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {
  AuthenticationServerService,
  OrganizationAuthenticationServerCredentials,
  OrganizationAuthenticationServerInformation,
  OrganizationAuthenticationServerRequest
} from '../..';

@Injectable({
  providedIn: 'root'
})

export class LdapService {

  usersToGet: Array<string>;
  private users = new ReplaySubject<Array<OrganizationAuthenticationServerInformation>>(1);
  credentials: OrganizationAuthenticationServerCredentials;
  isAdminLoggedInLdap = new ReplaySubject<boolean>(1);

  constructor(private ldap: AuthenticationServerService) { }

  /*
  * Userd both to log in and to get users
   */
  getUsersLdap(orgId: number) {
    const request: OrganizationAuthenticationServerRequest = {
      organizationCredentials: this.credentials,
      organizationId: orgId,
      orgAuthServerIds: this.usersToGet
    };
    return this.ldap.getUserInfoFromAuthServer(request);
  }

  addUserToGet(userId: string) {
    const pred = (element) => element === userId;
    if (this.usersToGet.findIndex(pred) === -1) {
      this.usersToGet.push(userId);
    }
  }

  clearUsersToGet() {
    this.usersToGet = new Array<string>();
  }

  setCredentials(usd: string, psw: string) {
    this.credentials = {
      username: usd,
      password: psw
    };
  }

  get getUsersInstances() {
    return this.users;
  }
}
