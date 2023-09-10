const TABLE_NAME = 'Patient';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      patientId: {
        field: 'PatientId',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        field: 'FirstName',
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      lastName: {
        field: 'LastName',
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nationality: {
        field: 'Nationality',
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      gender: {
        field: 'Gender',
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      address: {
        field: 'Address',
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      dob: {
        field: 'Dob',
        type: Sequelize.DATE(6),
        allowNull: true,
      },
      phone: {
        field: 'Phone',
        type: Sequelize.INTEGER(10),
        allowNull: true,
      },
      email: {
        field: 'Email',
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable({
      tableName: TABLE_NAME,
    });
  },
};
