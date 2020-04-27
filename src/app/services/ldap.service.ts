import {Client, SearchResult} from 'ldapts';
import {Entry} from 'ldapts/messages';

const url = 'ldaps://ldap.jumpcloud.com';
const client = new Client({
  url,
  tlsOptions: {
    rejectUnauthorized: args.rejectUnauthorized,
  },
});
