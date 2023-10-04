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
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        reportId: {
          field: 'ReportId',
          type: Sequelize.INTEGER,
          references: {
            model: 'PatientReport',
            key: 'ReportId',
          },
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
