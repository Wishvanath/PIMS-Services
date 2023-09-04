const TABLE_NAME = 'Bill';
const UNIQUE_INDEX = `$IX_${TABLE_NAME}_PatientId_InsuranceId`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        TABLE_NAME,
        {
          billId: {
            field: 'BillId',
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          doctorCharge: {
            field: 'DoctorCharge',
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          medicineCharge: {
            field: 'MedicineCharge',
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          roomCharge: {
            field: 'RoomCharge',
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          operationCharge: {
            field: 'OperationCharge',
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          nursingCharge: {
            field: 'NursingCharge',
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          labCharge: {
            field: 'LabCharge',
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          advance: {
            field: 'Advance',
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          patientId: {
            field: 'PatientId',
            type: Sequelize.INTEGER,
            refrences: {
              model: {
                tableName: 'Patient',
              },
              key: 'PatientId',
            },
            allowNull: false,
            onUpdate: 'casecade',
            onDelete: 'casecade',
          },
          insuranceId: {
            field: 'InsuranceId',
            type: Sequelize.INTEGER,
            refrences: {
              model: {
                tableName: 'Insurance',
              },
              key: 'InsuranceId',
            },
            allowNull: false,
            onUpdate: 'casecade',
            onDelete: 'casecade',
          },
          createdAt: {
            field: 'CreatedAt',
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
          },
          updatedAt: {
            field: 'UpdatedAt',
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('now'),
            onUpdate: Sequelize.fn('now'),
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
          unique: true,
          fields: ['PatientId', 'InsuranceId'],
          name: UNIQUE_INDEX,
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex(TABLE_NAME, UNIQUE_INDEX, {
        transaction,
      });
      return queryInterface.dropTable(
        {
          tableName: TABLE_NAME,
        },
        { transaction }
      );
    });
  },
};
