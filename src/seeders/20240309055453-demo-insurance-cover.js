const TABLE_NAME = 'InsuranceCover';
const rows = [
  {
    insuranceCode: 1,
    insuranceCompany: 'XYZ Insurance Co',
    insurancePlan: 'Comprehensive Health Plan',
    entryFee: 550,
    coPayy: 300,
    coInsurance: 220,
    medCoverage: 'Hospitalization, Prescription Drugs',
  },
  {
    insuranceCode: 2,
    insuranceCompany: 'QRS Assurance',
    insurancePlan: 'Senior Care Prime',
    entryFee: 1000,
    coPayy: 600,
    coInsurance: 300,
    medCoverage: ' Surgery, Physical Therapy',
  },
  {
    insuranceCode: 3,
    insuranceCompany: 'MNO Health Solutions',
    insurancePlan: 'Basic Health Coverage',
    entryFee: 2000,
    coPayy: 1000,
    coInsurance: 500,
    medCoverage: 'Outpatient Services, Maternity Care',
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
