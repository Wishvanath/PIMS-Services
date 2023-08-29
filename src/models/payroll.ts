import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';
import { EmployeeMaster } from './employee-master';

// create interface Payroll table column
export interface PayrollAttributes {
  payrollId: number;
  employeeId: number;
  salary: number;
  netSalary: number;
  hourlySalary: number;
  bonusSalary: number;
  compensation: number;
  bankName: string;
  accountNo: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PayrollCreationAttributes
  extends Optional<PayrollAttributes, 'payrollId'> {}

export const Payroll: ModelDefined<
  PayrollAttributes,
  PayrollCreationAttributes
> = sequelize.define(
  'Payroll',
  {
    payrollId: {
      field: 'PayrollId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    employeeId: {
      field: 'EmployeeId',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salary: {
      field: 'Salary',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    netSalary: {
      field: 'NetSalary',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hourlySalary: {
      field: 'HourlySalary',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bonusSalary: {
      field: 'BonusSalary',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    compensation: {
      field: 'Compensation',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bankName: {
      field: 'BankName',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    accountNo: {
      field: 'AccountNo',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'Payroll',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['PayrollId', 'EmployeeId'],
      },
    ],
  }
);

// create associations
EmployeeMaster.hasMany(Payroll, {
  foreignKey: 'EmployeeMaster_employeeId_FK',
  sourceKey: 'employeeId',
});
Payroll.belongsTo(EmployeeMaster, {
  as: 'employeemaster',
  foreignKey: 'EmployeeMaster_employeeId_FK',
  targetKey: 'employeeId',
});
