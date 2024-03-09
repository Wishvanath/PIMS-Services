const TABLE_NAME = 'Room';
const rows = [
  {
    id: 1,
    roomType: 'Standard',
    noOfBed: 1,
    status: 'Available',
  },
  {
    id: 2,
    roomType: 'Deluxe',
    noOfBed: 2,
    status: 'Occupied',
  },
  {
    id: 3,
    roomType: 'Suite',
    noOfBed: 3,
    status: 'Maintenance',
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
