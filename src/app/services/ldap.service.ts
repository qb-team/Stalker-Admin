// import { Client } from 'ldapts';
import {Client} from 'ldapts';

import {Injectable} from '@angular/core';
import {url} from 'inspector';

@Injectable({
  providedIn: 'root'
})

export class LdapService {
  isAuthenticated;
  client = new Client({
    url: 'ldap://localhost:389'
  });

  constructor() {
  }


  async bindUser(dn: string, psw: string) {
    try {
      await this.client.bind(dn, psw);
      this.isAuthenticated = true;
    } catch (ex) {
      this.isAuthenticated = false;
    } finally {
      await this.client.unbind();
    }
  }
}
