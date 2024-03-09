const TABLE_NAME = 'Supplier';
const rows = [
  {
    supplierId: 1,
    supplierName: 'ABC Pharmaceuticals',
    phone: '+1234567890',
    email: 'info@abcpharma.com',
    address: '123 Main Street, City, Country',
  },
  {
    supplierId: 2,
    supplierName: 'XYZ Medical Supplies',
    phone: '+9876543210',
    email: 'contact@xyzmed.com',
    address: '456 Oak Avenue, Town, Country',
  },
  {
    supplierId: 3,
    supplierName: 'Pharma Distributors Inc.',
    phone: '+1122334455',
    email: 'sales@pharmadist.com',
    address: '789 Elm Street, Village, Country',
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
