const TABLE_NAME = 'PatientReport';
const rows = [
  {
    reportId: 1,
    diagnosis: 'Hypertension',
    refrences: 'Blood pressure measurements, family medical history',
    patientId: 1,
  },
  {
    reportId: 2,
    diagnosis: 'Type 2 Diabetes',
    refrences: 'Blood glucose levels, HbA1c test results',
    patientId: 2,
  },
  {
    reportId: 3,
    diagnosis: 'Pneumonia',
    refrences: 'Chest X-ray, sputum culture',
    patientId: 3,
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
