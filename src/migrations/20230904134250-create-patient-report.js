const TABLE_NAME = 'PatientReport';
const UNIQUE_INDEX = `$IX_${TABLE_NAME}_PatientId`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        TABLE_NAME,
        {
          reportId: {
            field: 'ReportId',
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          diagnosis: {
            field: 'Diagnosis',
            type: Sequelize.STRING,
            allowNull: true,
          },
          refrences: {
            field: 'Refrences',
            type: Sequelize.STRING,
            allowNull: true,
          },
          patientId: {
            field: 'PatientId',
            type: Sequelize.INTEGER,
            references: {
              model: 'Lab',
              key: 'PatientId',
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
          unique: true,
          field: 'PatientId',
          name: UNIQUE_INDEX,
        }
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
