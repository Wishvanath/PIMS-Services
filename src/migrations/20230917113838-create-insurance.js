const TABLE_NAME = 'Insurance';
const UNIQUE_INDEX = `$IX_${TABLE_NAME}_PatientId_InsuranceCode`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        TABLE_NAME,
        {
          insuranceId: {
            field: 'InsuranceId',
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          publishDate: {
            field: 'PublishDate',
            type: Sequelize.DATE,
            allowNull: false,
          },
          expiryDate: {
            field: 'ExpiryDate',
            type: Sequelize.DATE,
            allowNull: false,
          },
          maternity: {
            field: 'Maternity',
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          dental: {
            field: 'Dental',
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          optional: {
            field: 'Optional',
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          chronicPatient: {
            field: 'ChronicPatient',
            type: Sequelize.STRING(255),
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
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          insuranceCode: {
            field: 'InsuranceCode',
            type: Sequelize.INTEGER,
            references: {
              model: 'InsuranceCover',
              key: 'InsuranceCode',
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
          fields: ['PatientId', 'InsuranceCode'],
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
      return queryInterface.dropTable({
        tableName: TABLE_NAME,
      });
    });
  },
};
