const TABLE_NAME = 'EmployeeMaster';
const UNIQUE_INDEX = `$IX_${TABLE_NAME}_DepartmentId`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        TABLE_NAME,
        {
          employeeId: {
            field: 'EmployeeId',
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          personalId: {
            field: 'PersonalId',
            type: Sequelize.STRING(255),
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
            allowNull: false,
          },
          country: {
            field: 'Country',
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          dob: {
            field: 'Dob',
            type: Sequelize.DATE(6),
            allowNull: false,
          },
          gender: {
            field: 'Gender',
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          address: {
            field: 'Address',
            type: Sequelize.STRING(500),
            allowNull: false,
          },
          phone: {
            field: 'Phone',
            type: Sequelize.INTEGER(10),
            allowNull: false,
          },
          email: {
            field: 'Email',
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true, // Ensure email is unique
          },
          departmentId: {
            field: 'DepartmentId',
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'Department',
              },
              key: 'DepartmentId', // The primary key of the referenced table
            },
            allowNull: false,
            onUpdate: 'casecade',
            onDelete: 'casecade',
          },
        },
        {
          timestamps: false,
          freezeTableName: true,
        },
        { transaction }
      );
      await queryInterface.addIndex(
        {
          tableName: TABLE_NAME,
        },
        {
          unique: true,
          fields: ['DepartmentId'],
          name: UNIQUE_INDEX,
        },
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex(TABLE_NAME, UNIQUE_INDEX, {
        transaction,
      });
      return queryInterface.dropTable({
        tableName: TABLE_NAME,
      });
    });
  },
};
