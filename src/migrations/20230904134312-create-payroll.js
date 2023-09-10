const TABLE_NAME = 'Payroll';
// const UNIQUE_INDEX = `$IX_${TABLE_NAME}_EmployeeId`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        TABLE_NAME,
        {
          payrollId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          employeeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
              model: 'EmployeeMasters',
              key: 'employeeId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          salary: {
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          netSalary: {
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          hourlySalary: {
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          bonusSalary: {
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          compensation: {
            type: Sequelize.FLOAT,
            allowNull: false,
          },
          bankName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          accountNo: {
            type: Sequelize.STRING, // Change the data type to fit your needs
            allowNull: false,
          },
        },
        {
          timestamps: false,
          freezeTableName: true,
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Payrolls');
  },
};
