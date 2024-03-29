const TABLE_NAME = 'Medicine';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TABLE_NAME,
      {
        medicineId: {
          field: 'MedicineId',
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        medicineName: {
          field: 'MedicineName',
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        medicineType: {
          field: 'MedicineType',
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        medicineDescp: {
          field: 'MedicineDescp',
          type: Sequelize.STRING(1000),
          allowNull: true,
        },
        medicinePrice: {
          field: 'MedicinePrice',
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
