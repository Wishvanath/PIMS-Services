import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';
import { Lab } from './lab';

// create interface for PatientReport table column
export interface PatientReportAttributes {
  reportId: number;
  diagnosis: string;
  refrences: string;
  patientId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PatientReportCreationAttributes
  extends Optional<PatientReportAttributes, 'reportId'> {}

export const PatientReport: ModelDefined<
  PatientReportAttributes,
  PatientReportCreationAttributes
> = sequelize.define(
  'PatientReport',
  {
    reportId: {
      field: 'ReportId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    diagnosis: {
      field: 'Diagnosis',
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    refrences: {
      field: 'Refrences',
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    patientId: {
      field: 'PatientId',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'PatientReport',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['PatientId'],
      },
    ],
  }
);

// create association
Lab.hasMany(PatientReport, {
  foreignKey: 'PatientId',
  sourceKey: 'PatientId',
});
PatientReport.belongsTo(Lab, {
  as: 'lab',
  foreignKey: 'PatientId',
  targetKey: 'PatientId',
});

export default PatientReport;