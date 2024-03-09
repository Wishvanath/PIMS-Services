const TABLE_NAME = 'Medicine';
const rows = [
  {
    medicineId: 1,
    medicineName: 'Paracetamol',
    medicineType: 'Pain reliever',
    medicineDescp:
      'Paracetamol is commonly used for the relief of mild to moderate pain and fever. It is often recommended as a first-line treatment for pain.',
    medicinePrice: 5.99,
  },
  {
    medicineId: 2,
    medicineName: 'Loratadine',
    medicineType: 'Antihistamine',
    medicineDescp:
      'Loratadine is an antihistamine that reduces the effects of natural chemical histamine in the body. It is used to treat sneezing, runny nose, watery eyes, hives, skin rash, itching, and other allergy symptoms.',
    medicinePrice: 7.49,
  },
  {
    medicineId: 3,
    medicineName: 'Ibuprofen',
    medicineType: 'Nonsteroidal anti-inflammatory drug (NSAID)',
    medicineDescp:
      'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce inflammation, and lower fever. It is commonly used for headaches, muscle aches, dental pain, menstrual cramps, and arthritis.',
    medicinePrice: 6.99,
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
