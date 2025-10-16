import { Sequelize } from 'sequelize';
import ProjectProposal from './models/projectProposalSequelize.js';
import Attachment from './models/attachmentsSequelize.js';

const username = process.env.MARIADB_USERNAME;
const password = process.env.MARIADB_PASSWORD;
const host = process.env.MARIADB_HOST;

const sequelize = new Sequelize('IHK_Projektantraege', username, password, {
  host: host,
  port: 3306,
  dialect: 'mariadb',
  ssl: true,
  logging: false,
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Tables
db.projectProposal = ProjectProposal(sequelize, Sequelize);
db.attachment = Attachment(sequelize, Sequelize);
// Relations
db.projectProposal.hasMany(db.attachment);
db.attachment.belongsTo(db.projectProposal);

export default db;
