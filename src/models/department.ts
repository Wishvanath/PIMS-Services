import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';

// create interface for Department table column
export interface DepartmentAttributes {
  departmentId: number;
  departmentName: string;
  departmentManager: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DepartmentCreationAttributes
  extends Optional<DepartmentAttributes, 'departmentId'> {}

export const Department: ModelDefined<
  DepartmentAttributes,
  DepartmentCreationAttributes
> = sequelize.define(
  'Department',
  {
    departmentId: {
      field: 'DepartmentId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    departmentName: {
      field: 'DepartmentName',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    departmentManager: {
      field: 'DepartmentManager',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'Department',
    timestamps: false,
  }
);

export default Department;
