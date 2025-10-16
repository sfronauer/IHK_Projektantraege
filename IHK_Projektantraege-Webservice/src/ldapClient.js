import { Client } from 'ldapts';

const ldapUri = process.env.LDAP_URI;
const baseDn = process.env.LDAP_BASE_DN;

const client = new Client({
  url: ldapUri,
  strictDN: true,
});

export { client, baseDn };
