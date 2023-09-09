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
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        field: 'LastName',
        type: Sequelize.STRING,
        allowNull: true,
      },
      nationality: {
        field: 'Nationality',
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        field: 'Gender',
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        field: 'Address',
        type: Sequelize.STRING,
        allowNull: true,
      },
      dob: {
        field: 'Dob',
        type: Sequelize.DATE,
        allowNull: true,
      },
      phone: {
        field: 'Phone',
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      email: {
        field: 'Email',
        type: Sequelize.STRING,
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
