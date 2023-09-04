import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';

// create interface for Doctor table
export interface DoctorAttributes {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  phone: number;
  address: string;
  email: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DoctorCreationAttributes extends Optional<DoctorAttributes, 'id'> {}

export const Doctor: ModelDefined<DoctorAttributes, DoctorCreationAttributes> =
  sequelize.define(
    'Doctor',
    {
      id: {
        field: 'Id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      gender: {
        field: 'Gender',
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phone: {
        field: 'Phone',
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      address: {
        field: 'Address',
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      email: {
        field: 'Email',
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Doctor',
      timestamps: false,
    }
  );

export default Doctor;
