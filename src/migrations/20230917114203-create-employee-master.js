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
            allowNull: true,
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
          country: {
            field: 'Country',
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          dob: {
            field: 'Dob',
            type: Sequelize.DATE,
            allowNull: false,
          },
          gender: {
            field: 'Gender',
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          address: {
            field: 'Address',
            type: Sequelize.STRING(1000),
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
            allowNull: true,
            unique: true,
          },
          departmentId: {
            field: 'DepartmentId',
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'Department',
              },
              key: 'DepartmentId',
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
