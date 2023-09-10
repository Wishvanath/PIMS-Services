const TABLE_NAME = 'InsuranceCover';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TABLE_NAME,
      {
        insuranceCode: {
          field: 'InsuranceCode',
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        insuranceCompany: {
          field: 'InsuranceCompany',
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        insurancePlan: {
          field: 'InsurancePlan',
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        entryFee: {
          field: 'EntryFee',
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        coPayy: {
          field: 'CoPayy',
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        coInsurance: {
          field: 'CoInsurance',
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        medCoverage: {
          field: 'MedCoverage',
          type: Sequelize.STRING(255),
          allowNull: true,
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
