import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';

// create interface for patient table column
export interface PatientAttributes {
  patientId: number;
  firstName: string;
  lastName: string;
  nationality: string;
  gender: string;
  address: string;
  dob: Date;
  phone: string;
  email: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PatientCreationAttributes
  extends Optional<PatientAttributes, 'patientId'> {}

export const Patient: ModelDefined<
  PatientAttributes,
  PatientCreationAttributes
> = sequelize.define(
  'Patient',
  {
    patientId: {
      field: 'PatientId',
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
    nationality: {
      field: 'Nationality',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    gender: {
      field: 'Gender',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      field: 'Address',
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    dob: {
      field: 'Dob',
      type: DataTypes.DATE(6),
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
      unique: true,
    },
  },
  {
    tableName: 'Patient',
    timestamps: false,
  }
);

export default Patient;
