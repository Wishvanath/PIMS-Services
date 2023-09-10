import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';
import { Patient } from './patient';
import { Insurance } from './insurance';

// create interface for Bill table column
export interface BillAttributes {
  billId: number;
  doctorCharge: number;
  medicineCharge: number;
  roomCharge: number;
  operationCharge: number;
  nursingCharge: number;
  labCharge: number;
  advance: number;
  patientId: number;
  insuranceId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BillCreationAttributes extends Optional<BillAttributes, 'billId'> {}

export const Bill: ModelDefined<BillAttributes, BillCreationAttributes> =
  sequelize.define(
    'Bill',
    {
      billId: {
        field: 'BillId',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      doctorCharge: {
        field: 'DoctorCharge',
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      medicineCharge: {
        field: 'MedicineCharge',
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      roomCharge: {
        field: 'RoomCharge',
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      operationCharge: {
        field: 'OperationCharge',
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      nursingCharge: {
        field: 'NursingCharge',
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      labCharge: {
        field: 'LabCharge',
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      advance: {
        field: 'Advance',
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      patientId: {
        field: 'PatientId',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      insuranceId: {
        field: 'InsuranceId',
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'Bill',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['PatientId', 'InsuranceId'],
        },
      ],
    }
  );

// create association
Patient.hasMany(Bill, {
  foreignKey: 'PatientId',
  sourceKey: 'PatientId',
});
Bill.belongsTo(Patient, {
  as: 'patient',
  foreignKey: 'PatientId',
  targetKey: 'PatientId',
});

Insurance.hasMany(Bill, {
  foreignKey: 'InsuranceId',
  sourceKey: 'InsuranceId',
});
Bill.belongsTo(Insurance, {
  as: 'insurance',
  foreignKey: 'InsuranceId',
  targetKey: 'InsuranceId',
});
