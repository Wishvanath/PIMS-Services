const TABLE_NAME = 'MedicineReport';
const UNIQUE_INDEX = `$IX_${TABLE_NAME}_SupplierId_MedicineId`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        TABLE_NAME,
        {
          id: {
            field: 'Id',
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          company: {
            field: 'Company',
            type: Sequelize.STRING,
            allowNull: true,
          },
          quantity: {
            field: 'Quantity',
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          box: {
            field: 'Box',
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          productionDate: {
            field: 'ProductionDate',
            type: Sequelize.DATE,
            allowNull: true,
          },
          expiryDate: {
            field: 'ExpiryDate',
            type: Sequelize.DATE,
            allowNull: true,
          },
          country: {
            field: 'Country',
            type: Sequelize.STRING,
            allowNull: true,
          },
          supplierId: {
            field: 'SupplierId',
            type: Sequelize.INTEGER,
            references: {
              model: 'Supplier',
              key: 'SupplierId',
            },
            allowNull: false,
          },
          medicineId: {
            field: 'MedicineId',
            type: Sequelize.INTEGER,
            references: {
              model: 'Medicine',
              key: 'MedicineId',
            },
            allowNull: false,
          },
        },
        {
          timestamps: false,
          freezeTableName: true,
        },
        { transaction }
      );
      await queryInterface.addIndex(
        {
          tableName: TABLE_NAME,
        },
        {
          unique: false,
          fields: ['SupplierId', 'MedicineId'],
          name: UNIQUE_INDEX,
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.removeIndex(TABLE_NAME, {
        transaction,
      });
      return queryInterface.dropTable({
        tableName: TABLE_NAME,
      });
    });
  },
};
