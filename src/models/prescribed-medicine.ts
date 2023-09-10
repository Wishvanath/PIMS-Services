import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';
import { PatientReport } from './patient-report';
import { Medicine } from './medicine';

// create interface for prescribed medicine table column
export interface PrescribedMedicineAttributes {
  id: number;
  patientId: number;
  medicineId: number;
  reportId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrescribedMedicineCreationAttributes
  extends Optional<PrescribedMedicineAttributes, 'id'> {}

export const PrescribedMedicine: ModelDefined<
  PrescribedMedicineAttributes,
  PrescribedMedicineCreationAttributes
> = sequelize.define(
  'PrescribedMedicine',
  {
    id: {
      field: 'Id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    patientId: {
      field: 'PatientId',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medicineId: {
      field: 'PatientId',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reportId: {
      field: 'PatientId',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'PrescribedMedicine',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['Id'],
      },
    ],
  }
);

// create assocations
PatientReport.hasMany(PrescribedMedicine, {
  foreignKey: 'ReportId',
  sourceKey: 'ReportId',
});
PrescribedMedicine.belongsTo(PatientReport, {
  as: 'patientreport',
  foreignKey: 'ReportId',
  targetKey: 'ReportId',
});


Medicine.hasMany(PrescribedMedicine, {
  foreignKey: 'MedicineId',
  sourceKey: 'MedicineId',
});
PrescribedMedicine.belongsTo(Medicine, {
  as: 'medicine',
  foreignKey: 'MedicineId',
  targetKey: 'MedicineId',
});
