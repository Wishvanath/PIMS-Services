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
          type: Sequelize.STRING,
          allowNull: true,
        },
        medicineType: {
          field: 'MedicineType',
          type: Sequelize.STRING,
          allowNull: true,
        },
        medicineDescp: {
          field: 'MedicineDescp',
          type: Sequelize.STRING,
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
