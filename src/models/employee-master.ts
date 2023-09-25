import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';
import { Department } from './department';

// create interface for EmployeeMaster table column
export interface EmployeeMasterAttributes {
  employeeId: number;
  personalId: string;
  firstName: string;
  lastName: string;
  country: string;
  dob: Date;
  gender: string;
  address: string;
  phone: string;
  email: string;
  departmentId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EmployeeMasterCreationAttributes
  extends Optional<EmployeeMasterAttributes, 'employeeId'> {}

export const EmployeeMaster: ModelDefined<
  EmployeeMasterAttributes,
  EmployeeMasterCreationAttributes
> = sequelize.define(
  'EmployeeMaster',
  {
    employeeId: {
      field: 'EmployeeId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    personalId: {
      field: 'PersonalId',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    firstName: {
      field: 'FirstName',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      field: 'LastName',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    country: {
      field: 'Country',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dob: {
      field: 'Dob',
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    gender: {
      field: 'Gender',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      field: 'Address',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      field: 'Phone',
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      field: 'Email',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    departmentId: {
      field: 'DepartmentId',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'EmployeeMaster',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['DepartmentId'],
      },
    ],
  }
);

// create association
Department.hasMany(EmployeeMaster, {
  foreignKey: 'DepartmentId',
  sourceKey: 'DepartmentId',
});
EmployeeMaster.belongsTo(Department, {
  as: 'department',
  foreignKey: 'DepartmentId',
  targetKey: 'DepartmentId',
});

export default EmployeeMaster;