const TABLE_NAME = 'Department';
const rows = [
  {
    departmentId: 1,
    departmentName: 'Human Resources',
    departmentManager: 'John Smith',
  },
  {
    departmentId: 2,
    departmentName: 'Marketing',
    departmentManager: 'Emily Johnson',
  },
  {
    departmentId: 3,
    departmentName: 'Information Technology',
    departmentManager: 'Michael Brown',
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
