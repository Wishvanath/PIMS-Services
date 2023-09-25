const TABLE_NAME = 'Doctor';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TABLE_NAME,
      {
        id: {
          field: 'Id',
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        firstName: {
          field: 'FirstName',
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        lastName: {
          field: 'LastName',
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        gender: {
          field: 'Gender',
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        phone: {
          field: 'Phone',
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        address: {
          field: 'Address',
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        email: {
          field: 'Email',
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable({
      tableName: TABLE_NAME,
    });
  },
};
