const TABLE_NAME = 'Lab';
const UNIQUE_INDEX = `$IX_${TABLE_NAME}_PatientId_TestId`;

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
          testType: {
            field: 'TestType',
            type: Sequelize.STRING,
            allowNull: true,
          },
          height: {
            field: 'Height',
            type: Sequelize.STRING,
            allowNull: true,
          },
          weight: {
            field: 'Weight',
            type: Sequelize.STRING,
            allowNull: true,
          },
          date: {
            field: 'Date',
            type: Sequelize.DATE,
            allowNull: true,
          },
          bloodPressure: {
            field: 'BloodPressure',
            type: Sequelize.STRING,
            allowNull: true,
          },
          temp: {
            field: 'Temp',
            type: Sequelize.STRING,
            allowNull: true,
          },
          category: {
            field: 'Category',
            type: Sequelize.STRING,
            allowNull: true,
          },
          patientType: {
            field: 'PatientType',
            type: Sequelize.STRING,
            allowNull: true,
          },
          bloodType: {
            field: 'BloodType',
            type: Sequelize.STRING,
            allowNull: true,
          },
          patientId: {
            field: 'PatientId',
            type: Sequelize.INTEGER,
            references: {
              model: 'Patient',
              key: 'PatientId',
            },
            allowNull: false,
          },
          testId: {
            field: 'TestId',
            type: Sequelize.INTEGER,
            references: {
              model: 'TestPrice',
              key: 'TestId',
            },
            allowNull: false,
          },
        },
        {
          timestamps: true,
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
          fields: ['PatientId', 'TestId'],
          name: UNIQUE_INDEX,
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex(TABLE_NAME, {
        transaction,
      });
      return queryInterface.dropTable({
        tableName: TABLE_NAME,
      });
    });
  },
};
