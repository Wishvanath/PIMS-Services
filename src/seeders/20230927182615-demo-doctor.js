const TABLE_NAME = 'Doctor';
const rows = [
  {
    id:1,
    firstName: 'Somnath',
    lastName: 'Manna',
    gender: 'Male',
    phone: '9939940266',
    address: 'Vill- Ransi, Post- Kaithia, PS- Basantrai, Dist- Godda(Jharkhand)',
    email: 'somnath@gmail.com'
  },
  {
    id:2,
    firstName: 'Bhanu',
    lastName: 'Priya',
    gender: 'Female',
    phone: '9939902666',
    address: 'Vill- Ransi, Post- Kaithia, PS- Basantrai, Dist- Godda(Jharkhand)',
    email: 'bhanu@gmail.com'
  },
  {
    id:3,
    firstName: 'Sonali',
    lastName: 'kanti',
    gender: 'Female',
    phone: '9932940266',
    address: 'Vill- Ransi, Post- Kaithia, PS- Basantrai, Dist- Godda(Jharkhand)',
    email: 'sonali@gmail.com'
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
