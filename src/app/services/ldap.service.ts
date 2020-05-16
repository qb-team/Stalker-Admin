import { Client } from 'ldapts';
import {Injectable} from '@angular/core';
import {url} from 'inspector';

@Injectable({
  providedIn: 'root'
})

export class LdapService {
  isAuthenticated;
  client = new Client({
    url: 'ldaps://ldap.forumsys.com:389',
    timeout: 0,
    connectTimeout: 0,
    tlsOptions: {
      minVersion: 'TLSv1.2',
    },
    strictDN: true,
  });

  constructor() {
    this.connectToLdap();
  }

  async connectToLdap() {
    await this.client.startTLS({
      host: 'ldaps://ldap.forumsys.com:389',
      port: 389,
    });
    console.log('Connected: ' + this.client.isConnected);
  }

  async bindUser(dn: string, psw: string) {
    try {
      await this.client.bind(dn, psw).then(() => {
        this.isAuthenticated = true;
        alert('L\'utente ' + dn + ' è stato autenticato con successo nel server LDAP aziendale.');
      }).catch( err => alert('Errore ' + err.toString()));
    } catch (ex) {
      this.isAuthenticated = false;
    } finally {
      await this.client.unbind();
    }
  }
}
