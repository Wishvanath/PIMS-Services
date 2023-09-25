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
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        phone: {
          field: 'Phone',
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        email: {
          field: 'Email',
          type: Sequelize.STRING(255),
          allowNull: true,
          unique:true,
        },
        address: {
          field: 'Address',
          type: Sequelize.STRING(1000),
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
