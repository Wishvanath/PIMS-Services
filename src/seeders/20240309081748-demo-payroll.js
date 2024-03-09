const TABLE_NAME = 'Payroll';
const rows = [
  {
    payrollId: 1,
    employeeId: 1,
    salary: 5000.0,
    netSalary: 4500.0,
    hourlySalary: 25.0,
    bonusSalary: 1000.0,
    compensation: 200.0,
    bankName: 'ABC Bank',
    accountNo: '123456789',
  },
  {
    payrollId: 2,
    employeeId: 2,
    salary: 6000.0,
    netSalary: 5400.0,
    hourlySalary: 30.0,
    bonusSalary: 1200.0,
    compensation: 250.0,
    bankName: 'XYZ Bank',
    accountNo: '987654321',
  },
  {
    payrollId: 3,
    employeeId: 3,
    salary: 5500.0,
    netSalary: 4950.0,
    hourlySalary: 28.0,
    bonusSalary: 1100.0,
    compensation: 225.0,
    bankName: 'PQR Bank',
    accountNo: '456789123',
  },
];
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(TABLE_NAME, rows, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {
        [Sequelize.Op.or]: rows,
      },
      {}
    );
  },
};
