import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';

// create interface for InsuranceCover table column
export interface InsuranceCoverAttributes {
  insuranceCode: number;
  insuranceCompany: string;
  insurancePlan: string;
  entryFee: number;
  coPayy: number;
  coInsurance: number;
  medCoverage: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InsuranceCoverCeationAttributes
  extends Optional<InsuranceCoverAttributes, 'insuranceCode'> {}

export const InsuranceCover: ModelDefined<
  InsuranceCoverAttributes,
  InsuranceCoverCeationAttributes
> = sequelize.define(
  'InsuranceCover',
  {
    insuranceCode: {
      field: 'InsuranceCode',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    insuranceCompany: {
      field: 'InsuranceCompany',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    insurancePlan: {
      field: 'InsurancePlan',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    entryFee: {
      field: 'EntryFee',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coPayy: {
      field: 'CoPayy',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coInsurance: {
      field: 'CoInsurance',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    medCoverage: {
      field: 'MedCoverage',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'InsuranceCover',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['InsuranceCode'],
      },
    ],
  }
);
