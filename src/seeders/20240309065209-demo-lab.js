const TABLE_NAME = 'Lab';
const rows = [
  {
    id: 1,
    testType: 'Blood Test',
    height: '175 cm',
    weight: '70 kg',
    date: '2024-03-09',
    bloodPressure: '120/80 mmHg',
    temp: '36.5 °C',
    category: 'Routine Checkup',
    patientType: 'Outpatient',
    bloodType: 'A+',
    patientId: 1,
    testId: 1,
  },
  {
    id: 2,
    testType: 'X-Ray',
    height: '180 cm',
    weight: '75 kg',
    date: '2024-03-10',
    bloodPressure: '130/85 mmHg',
    temp: '36.7 °C',
    category: 'Diagnostic Imaging',
    patientType: 'Inpatient',
    bloodType: 'B-',
    patientId: 2,
    testId: 2,
  },
  {
    id: 3,
    testType: 'MRI Scan',
    height: '165 cm',
    weight: '60 kg',
    date: '2024-03-11',
    bloodPressure: '125/75 mmHg',
    temp: '36.8 °C',
    category: 'Advanced Imaging',
    patientType: 'Outpatient',
    bloodType: 'O+',
    patientId: 3,
    testId: 3,
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
