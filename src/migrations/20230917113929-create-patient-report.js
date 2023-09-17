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
            type: Sequelize.STRING(1000),
            allowNull: true,
          },
          refrences: {
            field: 'Refrences',
            type: Sequelize.STRING(255),
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
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
          fields: ['PatientId'],
          name: UNIQUE_INDEX,
        }
      );
    });
  },

  down: async (queryInterface) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.removeIndex(TABLE_NAME, UNIQUE_INDEX, {
        transaction,
      });
      return queryInterface.dropTable({
        tableName: TABLE_NAME,
      });
    });
  },
};
