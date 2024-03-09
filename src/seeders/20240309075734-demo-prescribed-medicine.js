const TABLE_NAME = 'PrescribedMedicine';
const rows = [
  {
    id: 1,
    patientId: 1,
    medicineId: 1,
    reportId: 1,
  },
  {
    id: 2,
    patientId: 2,
    medicineId: 1,
    reportId: 2,
  },
  {
    id: 3,
    patientId: 3,
    medicineId: 2,
    reportId: 3,
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
