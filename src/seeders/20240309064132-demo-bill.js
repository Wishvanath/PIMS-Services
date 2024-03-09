const TABLE_NAME = 'Bill';
const rows = [
  {
    billId: 1,
    doctorCharge: 150.0,
    medicineCharge: 80.0,
    roomCharge: 200.0,
    operationCharge: 500.0,
    nursingCharge: 75.0,
    labCharge: 100.0,
    advance: 300.0,
    patientId: 1,
    insuranceId: 1,
  },
  {
    billId: 2,
    doctorCharge: 200.0,
    medicineCharge: 100.0,
    roomCharge: 250.0,
    operationCharge: 600.0,
    nursingCharge: 100.0,
    labCharge: 120.0,
    advance: 400.0,
    patientId: 2,
    insuranceId: 2,
  },
  {
    billId: 3,
    doctorCharge: 180.0,
    medicineCharge: 90.0,
    roomCharge: 220.0,
    operationCharge: 550.0,
    nursingCharge: 80.0,
    labCharge: 110.0,
    advance: 350.0,
    patientId: 3,
    insuranceId: 3,
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
