const TABLE_NAME = 'Payroll';
const UNIQUE_INDEX = `$IX_${TABLE_NAME}_EmployeeId`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        TABLE_NAME,
        {
          payrollId: {
            field: 'PayrollId',
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          employeeId: {
            field: 'EmployeeId',
            type: Sequelize.INTEGER,
            references: {
              model: 'EmployeeMaster',
              key: 'EmployeeId',
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          salary: {
            field: 'Salary',
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          netSalary: {
            field: 'NetSalary',
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          hourlySalary: {
            field: 'HourlySalary',
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          bonusSalary: {
            field: 'BonusSalary',
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          compensation: {
            field: 'Compensation',
            type: Sequelize.FLOAT,
            allowNull: true,
          },
          bankName: {
            field: 'BankName',
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          accountNo: {
            field: 'AccountNo',
            type: Sequelize.STRING(255),
            allowNull: true,
            unique: true,
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
          fields: ['EmployeeId'],
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
