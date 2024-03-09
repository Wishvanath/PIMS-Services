const TABLE_NAME = 'EmployeeMaster';
const rows = [
  {
    employeeId: 1,
    personalId: 'A123456',
    firstName: 'John',
    lastName: 'Doe',
    country: 'USA',
    dob: '1990-05-15',
    gender: 'Male',
    address: '123 Main St, Anytown',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    departmentId: 1,
  },
  {
    employeeId: 2,
    personalId: 'B987654',
    firstName: 'Alice',
    lastName: 'Smith',
    country: 'Canada',
    dob: '1985-08-25',
    gender: 'Female',
    address: '456 Maple Ave, Anothercity',
    phone: '+1 (555) 987-6543',
    email: 'alice.smith@example.com',
    departmentId: 2,
  },
  {
    employeeId: 3,
    personalId: 'C246810',
    firstName: 'Michael',
    lastName: 'Johnson',
    country: 'UK',
    dob: '1982-11-10',
    gender: 'Male',
    address: '789 Oak St, Somewhere',
    phone: '+44 20 1234 5678',
    email: 'michael.johnson@example.com',
    departmentId: 3,
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
