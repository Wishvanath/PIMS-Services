import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';
import { Patient } from './patient';
import { InsuranceCover } from './insurance-cover';

// create interface for Insurance table column
export interface InsuranceAttributes {
  insuranceId: number;
  publishDate: Date;
  expiryDate: Date;
  maternity: string;
  dental: string;
  optional: string;
  chronicPatient: string;
  patientId: number;
  insuranceCode: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InsuranceCreationAttributes
  extends Optional<InsuranceAttributes, 'insuranceId'> {}

export const Insurance: ModelDefined<
  InsuranceAttributes,
  InsuranceCreationAttributes
> = sequelize.define(
  'Insurance',
  {
    insuranceId: {
      field: 'InsuranceId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    publishDate: {
      field: 'publishDate',
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    expiryDate: {
      field: 'expiryDate',
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    maternity: {
      field: 'Maternity',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    dental: {
      field: 'Dental',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    optional: {
      field: 'Optional',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    chronicPatient: {
      field: 'ChronicPatient',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    patientId: {
      field: 'PatientId',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    insuranceCode: {
      field: 'InsuranceCode',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Insurance',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['PatientId','InsuranceId'],
      },
    ],
  }
);

// create association
InsuranceCover.hasMany(Insurance, {
  foreignKey: 'InsuranceCode',
  sourceKey: 'InsuranceCode',
});
Insurance.belongsTo(InsuranceCover, {
  as: 'insurancecover',
  foreignKey: 'InsuranceCode',
  targetKey: 'InsuranceCode',
});

Patient.hasMany(Insurance, {
  foreignKey: 'PatientId',
  sourceKey: 'PatientId',
});
Insurance.belongsTo(Patient, {
  as: 'patient',
  foreignKey: 'PatientId',
  targetKey: 'PatientId',
});
