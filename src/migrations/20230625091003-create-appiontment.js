const TABLE_NAME = 'Appointment';
const UNIQUE_INDEX = '-------';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface
        .createTable(
          TABLE_NAME,
          {
            id: {
              field: 'Id',
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false,
            },
            appointmentId: {
              field: 'AppointmentId',
              type: Sequelize.INTEGER,
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
              type: Sequelize.DATE(6),
              allowNull: false,
              defaultValue: Sequelize.fn('now'),
            },
            updatedDate: {
              field: 'UpdatedDate',
              type: Sequelize.DATE(6),
              defaultValue: Sequelize.fn('now'),
              allowNull: false,
            },
            date: {
              field: 'Date',
              type: Sequelize.DATE(6),
              allowNull: false,
            },
            time: {
              field: 'Time',
              type: Sequelize.DATE(6),
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
                key: 'DoctorId',
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
        )
        .then(() => {
          queryInterface.sequelize.query(
            `ALTER TABLE ${TABLE_NAME} MODIFY COLUMN Status tinyInt(1);`,
            {
              transaction,
            }
          );
        });
      await queryInterface.addIndex(
        {
          tableName: TABLE_NAME,
        },
        {
          unique: true,
          fields: ['Id'],
          name: UNIQUE_INDEX,
        },
        {
          transaction,
        }
      );
    });
  },

  down: async (queryInterface) =>
    queryInterface.dropTable({
      tableName: TABLE_NAME,
    }),
};
