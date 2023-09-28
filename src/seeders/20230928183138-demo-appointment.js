const TABLE_NAME = 'Appointment';
const date = new Date().toJSON().slice(0, 10);
const rows = [
  {
    id:1,
    patientId:1,
    type: "Clinical",
    date: date,
    time: date,
    appointmentDescp: "Back pain",
    doctorId: 1,
  },
  {
    id:2,
    patientId:2,
    type: "Clinical",
    date: date,
    time: date,
    appointmentDescp: "Back pain",
    doctorId: 2,
  },
  {
    id:3,
    patientId:3,
    type: "Clinical",
    date: date,
    time: date,
    appointmentDescp: "Back pain",
    doctorId: 3,
  }
]
module.exports = {
  async up (queryInterface) {
   await queryInterface.bulkInsert(TABLE_NAME, rows, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {
        [Sequelize.Op.or]: rows,
      },
      {}
    );
  }
};
