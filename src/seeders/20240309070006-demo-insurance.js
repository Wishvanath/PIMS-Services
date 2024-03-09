const TABLE_NAME = 'Insurance';
const rows = [
  {
    insuranceId: 1,
    publishDate: '2024-01-01',
    expiryDate: '2025-01-01',
    maternity: 'Covered',
    dental: 'Not Covered',
    optional: 'Vision Care',
    chronicPatient: 'Not Covered',
    patientId: 1,
    insuranceCode: 1,
  },
  {
    insuranceId: 2,
    publishDate: '2023-06-15',
    expiryDate: '2024-06-15',
    maternity: 'Not Covered',
    dental: 'Covered',
    optional: 'Prescription Drugs',
    chronicPatient: 'Covered',
    patientId: 2,
    insuranceCode: 2,
  },
  {
    insuranceId: 3,
    publishDate: '2024-02-28',
    expiryDate: '2025-02-28',
    maternity: 'Covered',
    dental: 'Covered',
    optional: 'Mental Health',
    chronicPatient: 'Covered',
    patientId: 3,
    insuranceCode: 3,
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
