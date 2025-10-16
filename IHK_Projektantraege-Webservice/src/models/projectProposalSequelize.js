export default (sequelize, Sequelize) => {
  return sequelize.define(
    'ProjectProposal',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ldapUsernameStudent: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      forChecking: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      accepted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      ldapUsernameTeacher: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: null,
      },
      general: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null,
      },
      topic: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null,
      },
      projectStart: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null,
      },
      projectEnd: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null,
      },
      initial: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null,
      },
      goal: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null,
      },
      implementation: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null,
      },
      timeManagement: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null,
      },
      presentationTools: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null,
      },
      teacherComment: {
        type: Sequelize.STRING(400),
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
