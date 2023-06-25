const TABLE_NAME = 'Appointment';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(TABLE_NAME, {
        appointmentId: {
          field: 'AppointmentId',
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        type: {
          field: 'Type',
          type: Sequelize.STRING(255),
        },
        appoiintmentDescp: {
          field: 'AppointmentDescp',
          type:Sequelize.STRING(500),
        },
        createdDate: {
          field: 'CreatedDate',
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
          allowNull: false
        },
        date: {
          field: 'Date',
          type: Sequelize.DATE,
          allowNull: false
        },
        time: {
          field: 'Time',
          type: Sequelize.DATE,
          allowNull: false
        },
        
        // patientId: {
        //   field: 'PatientId',
        //   type: Sequelize.INTEGER,
        //   references: {
        //     model:{
        //       tableName: 'demo'
        //     },
        //     key: 'demoId'
        //   },
        //   allowNull: false,
        //   onUpdate: 'cascade',
        //   onDelete: 'cascade'
        // }

        // doctorId: {
        //   field: 'DoctorId',
        //   type: Sequelize.INTEGER,
        //   references: {
        //     model: {
        //       tableName: ''
        //     },
        //     key: ''
        //   },
        //   allowNull: false,
        //   onUpdate: 'cascade',
        //   onDelete: 'cascade'
        // }

        
      },
      {
        timestamps: false,
        freezeTableName: true,
      },
      {transaction});
    });
  },

  down: async (queryInterface) =>
    queryInterface.dropTable({
      tableName: TABLE_NAME,
    }),
};

