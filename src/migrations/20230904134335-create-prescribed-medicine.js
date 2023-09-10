const TABLE_NAME = 'PrescribedMedicine';

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
        patientId: {
          field: 'PatientId',
          type: Sequelize.INTEGER,
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
        reportId: {
          field: 'ReportId',
          type: Sequelize.INTEGER,
          references: {
            model: 'PatientReport',
            key: 'ReportId',
          },
          allowNull: false,
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
