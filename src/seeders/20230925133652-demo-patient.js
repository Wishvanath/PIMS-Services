const TABLE_NAME = 'Patient';
const rows = [
  {
    patientId:1,
    firstName: 'Wishvanath',
    lastName: 'Sah',
    nationality: 'Indian',
    gender: 'Male',
    address: 'Vill- Ransi, Post- Kaithia, PS- Basantrai, Dist- Godda(Jharkhand)',
    dob: '1992/01/01',
    phone: '9939940266',
    email: 'anandwishvanath@gmail.com'
  },
  {
    patientId:2,
    firstName: 'Mohan',
    lastName: 'Shrivastav',
    nationality: 'Indian',
    gender: 'Male',
    address: 'Delhi',
    dob: '1993/01/01',
    phone: '9967890012',
    email: 'mohan.shri@gmail.com'
  },
  {
    patientId:3,
    firstName: 'Madhu',
    lastName: 'Kumari',
    nationality: 'Indian',
    gender: 'Female',
    address: 'Vill- Ransi, Post- Kaithia, PS- Basantrai, Dist- Godda(Jharkhand)',
    dob: '2000/01/01',
    phone: '6204103772',
    email: 'madhu.kumari@gmail.com'
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
