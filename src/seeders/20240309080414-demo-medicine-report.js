const TABLE_NAME = 'MedicineReport';
const rows = [
  {
    id: 1,
    company: 'ABC Pharmaceuticals',
    quantity: 1000,
    box: 20,
    productionDate: '2024-02-15',
    expiryDate: '2025-02-15',
    country: 'USA',
    supplierId: 1,
    medicineId: 1,
  },
  {
    id: 2,
    company: 'XYZ Pharmaceuticals',
    quantity: 500,
    box: 10,
    productionDate: '2024-01-10',
    expiryDate: '2025-01-10',
    country: 'Canada',
    supplierId: 2,
    medicineId: 2,
  },
  {
    id: 3,
    company: 'PQR Pharmaceuticals',
    quantity: 800,
    box: 15,
    productionDate: '2024-03-05',
    expiryDate: '2025-03-05',
    country: 'UK',
    supplierId: 3,
    medicineId: 3,
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
