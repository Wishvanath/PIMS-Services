const TABLE_NAME = 'Department';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      departmentId: {
        field: 'DepartmentId',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      departmentName: {
        field: 'DepartmentName',
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      departmentManager: {
        field: 'DepartmentManager',
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable({
      tableName: TABLE_NAME,
    });
  },
};
