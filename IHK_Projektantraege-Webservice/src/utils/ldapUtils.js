import { client, baseDn } from '../ldapClient.js';

export const getLdapUserEntry = async (ldapUsername) => {
  // Nur für Softwareabnahme-----------
  if (ldapUsername === 'testlehr') {
    return {
      mail: 'Michael.Mielenz@edvschule-plattling.de',
      displayName: 'Hansibald Testlehrer',
    };
  }
  //-------------------

  await client.bind(`CN=projekt,OU=Projekte,OU=Spezial,${baseDn}`, process.env.LDAP_PASSWORD);

  const result = await client.search(baseDn, {
    filter: `(sAMAccountName=${ldapUsername})`,
  });

  await client.unbind();

  if (result.searchEntries.length === 1) {
    return result.searchEntries[0];
  }
  return null;
};

export const getAllTeachers = async () => {
  await client.bind(`CN=projekt,OU=Projekte,OU=Spezial,${baseDn}`, process.env.LDAP_PASSWORD);

  const result = await client.search(`OU=Lehrer,${baseDn}`, {
    scope: 'one',
    filter: '(&(objectClass=person)(sn=*))',
    attributes: ['sAMAccountName', 'sn'],
  });

  await client.unbind();

  if (result.searchEntries.length == 0) {
    return [];
  }

  // Testlehrer für Softwareabnahme ------------------------------------
  result.searchEntries.push({ sAMAccountName: 'testlehr' });
  // -----------------------------------------------------------
  return result.searchEntries.map((e) => e.sAMAccountName);
};
