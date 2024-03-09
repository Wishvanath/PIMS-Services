const TABLE_NAME = 'TestPrice';
const rows = [
  {
    testId: 1,
    testPrice: 2000,
  },
  {
    testId: 2,
    testPrice: 2500,
  },
  {
    testId: 3,
    testPrice: 3000,
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
