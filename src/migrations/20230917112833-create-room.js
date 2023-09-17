const TABLE_NAME = 'Room';

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
        },
        roomType: {
          field: 'RoomType',
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        noOfBed: {
          field: 'NoOfBed',
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        status: {
          field: 'Status',
          type: Sequelize.STRING(255),
          allowNull: true,
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
