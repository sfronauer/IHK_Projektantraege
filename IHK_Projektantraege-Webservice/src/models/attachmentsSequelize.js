export default (sequelize, Sequelize) => {
  return sequelize.define(
    'Attachment',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      filename: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      filedata: {
        type: Sequelize.BLOB('medium'),
        allowNull: false,
      },
      filetype: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
