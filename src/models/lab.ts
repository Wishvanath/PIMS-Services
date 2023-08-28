import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';
import { Patient } from './patient';
import { TestPrice } from './test-price';

// create interface for Lab table column
export interface LabAttributes {
  id: number;
  testType: string;
  height: string;
  weight: string;
  date: Date;
  bloodPressure: string;
  temp: string;
  category: string;
  patientType: string;
  bloodType: string;
  patientId: number;
  testId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LabCreationAttributes extends Optional<LabAttributes, 'id'> {}

export const Lab: ModelDefined<LabAttributes, LabCreationAttributes> =
  sequelize.define(
    'Lab',
    {
      id: {
        field: 'Id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      testType: {
        field: 'TestType',
        type: DataTypes.STRING,
        allowNull: true,
      },
      height: {
        field: 'Height',
        type: DataTypes.STRING,
        allowNull: true,
      },
      weight: {
        field: 'Weight',
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        field: 'Date',
        type: DataTypes.DATE(6),
        allowNull: true,
      },
      bloodPressure: {
        field: 'BloodPressure',
        type: DataTypes.STRING,
        allowNull: true,
      },
      temp: {
        field: 'TestType',
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        field: 'Category',
        type: DataTypes.STRING,
        allowNull: true,
      },
      patientType: {
        field: 'PatientType',
        type: DataTypes.STRING,
        allowNull: true,
      },
      bloodType: {
        field: 'BloodType',
        type: DataTypes.STRING,
        allowNull: true,
      },
      patientId: {
        field: 'PatientId',
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      testId: {
        field: 'TestId',
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      tableName: 'Lab',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['Id', 'PatientId', 'TestId'],
        },
      ],
    }
  );

//   create association
Patient.hasMany(Lab, {
  foreignKey: 'Patient_patient_id_FK',
  sourceKey: 'patientId',
});
Lab.belongsTo(Patient, {
  as: 'patient',
  foreignKey: 'Patient_patient_id_FK',
  targetKey: 'patientId',
});

TestPrice.hasMany(Lab, {
  foreignKey: 'TestPrice_testId_FK',
  sourceKey: 'testId',
});
Lab.belongsTo(TestPrice, {
  as: 'testprice',
  foreignKey: 'TestPrice_testId_FK',
  targetKey: 'testId',
});
