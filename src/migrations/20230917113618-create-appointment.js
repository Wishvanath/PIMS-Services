const TABLE_NAME = 'Appointment';
const UNIQUE_INDEX = `$IX_${TABLE_NAME}_PatientId_DoctorId`;

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
            allowNull: false,
          },
          patientId: {
            field: 'PatientId',
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'Patient',
              },
              key: 'PatientId',
            },
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          type: {
            field: 'Type',
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          createdDate: {
            field: 'CreatedDate',
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updatedDate: {
            field: 'UpdatedDate',
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          date: {
            field: 'Date',
            type: Sequelize.DATE,
            allowNull: false,
          },
          time: {
            field: 'Time',
            type: Sequelize.DATE,
            allowNull: false,
          },
          appointmentDescp: {
            field: 'AppointmentDescp',
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          doctorId: {
            field: 'DoctorId',
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'Doctor',
              },
              key: 'Id',
            },
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade',
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
          fields: ['PatientId', 'DoctorId'],
          name: UNIQUE_INDEX,
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex(TABLE_NAME, UNIQUE_INDEX, {
        transaction,
      });
      return queryInterface.dropTable({
        tableName: TABLE_NAME,
      });
    }),
};
