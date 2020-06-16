import {Injectable} from '@angular/core';

import {LdapService} from './ldap.service';

@Injectable()
class MockAuthenticationServerService {}

describe('LdapService', () => {
  let service;

  it('should run #getUsersLdap()', async () => {
     expect(service.ldap.getUserInfoFromAuthServer).toHaveBeenCalled();
  });

  it('should run #clearUsersToGet()', async () => {

    service.clearUsersToGet();

  });

  it('should run #setCredentials()', async () => {

    service.setCredentials({}, {});

  });

});
