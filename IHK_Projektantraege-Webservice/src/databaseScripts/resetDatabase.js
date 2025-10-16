import db from '../db.js';

const ProjectProposal = db.projectProposal;

const startTime = performance.now();
await db.sequelize.drop();
await db.sequelize.sync();
console.log('\nTable was created\n');

const testValues = [];
testValues.push({
  topic: 'KI-basierte Automatisierung im Gesundheitswesen',
  ldapUsernameStudent: 'jdoe',
});
testValues.push({
  topic: 'Blockchain-Technologie im Supply Chain Management',
  ldapUsernameStudent: 'asmith',
});
testValues.push({
  topic: 'Smart Cities und IoT-Integration',
  ldapUsernameStudent: 'mbrown',
});
testValues.push({
  topic: 'Quantencomputing für Datensicherheit',
  ldapUsernameStudent: 'swhite',
});
testValues.push({
  topic: 'Nachhaltige Energielösungen',
  ldapUsernameStudent: 'jgreen',
});
testValues.push({
  topic: 'Erweiterte Realität in der Bildung',
  ldapUsernameStudent: 'tclark',
});
testValues.push({
  topic: 'Datenschutzgesetze und globale Compliance',
  ldapUsernameStudent: 'emartin',
});
testValues.push({
  topic: 'Robotic Process Automation im Finanzwesen',
  ldapUsernameStudent: 'kmoore',
});
testValues.push({
  topic: '5G-Netzwerke und die Zukunft der Konnektivität',
  ldapUsernameStudent: 'blong',
});
testValues.push({
  topic: 'Autonome Fahrzeuge und Verkehrssicherheit',
  ldapUsernameStudent: 'jjacks',
});

await ProjectProposal.bulkCreate(testValues);
await db.sequelize.close();

const endTime = performance.now();
console.log('\nThe database was reset and synchronized!');
console.log(`The script took ${(endTime - startTime).toFixed(2)} milliseconds`);
