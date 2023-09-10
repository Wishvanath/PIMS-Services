const TABLE_NAME = 'Supplier';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TABLE_NAME,
      {
        supplierId: {
          field: 'SupplierId',
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        supplierName: {
          field: 'SupplierName',
          type: Sequelize.STRING,
          allowNull: true,
        },
        phone: {
          field: 'Phone',
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        email: {
          field: 'Email',
          type: Sequelize.STRING,
          allowNull: true,
        },
        address: {
          field: 'Address',
          type: Sequelize.STRING,
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
