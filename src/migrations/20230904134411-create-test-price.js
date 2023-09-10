const TABLE_NAME = 'TestPrice';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TABLE_NAME,
      {
        testId: {
          field: 'TestId',
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        testPrice: {
          field: 'TestPrice',
          type: Sequelize.FLOAT,
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
