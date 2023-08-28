import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';
import { Patient } from './patient';
import { Doctor } from './doctor';

// create interface for appointment table column
export interface AppointmentAttributes {
  id: number;
  appointmentId: number;
  patientId: number;
  type: string;
  createdDate: Date;
  updatedDate: Date;
  date: Date;
  time: Date;
  appointmentDescp: string;
  doctorId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppointmentCreationAttributes
  extends Optional<AppointmentAttributes, 'id'> {}

export const Appointment: ModelDefined<
  AppointmentAttributes,
  AppointmentCreationAttributes
> = sequelize.define(
  'Appointment',
  {
    id: {
      field: 'Id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    appointmentId: {
      field: 'AppointmentId',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    patientId: {
      field: 'PatientId',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      field: 'Type',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdDate: {
      field: 'CreatedDate',
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    updatedDate: {
      field: 'UpdatedDate',
      type: DataTypes.DATE(6),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    date: {
      field: 'Date',
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    time: {
      field: 'Time',
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    appointmentDescp: {
      field: 'AppointmentDescp',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    doctorId: {
      field: 'DoctorId',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Appointment',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['Id'],
      },
    ],
  }
);

// create association
Patient.hasMany(Appointment, {
  foreignKey: 'Patient_patient_id_FK',
  sourceKey: 'patientId',
});
Appointment.belongsTo(Patient, {
  as: 'patient',
  foreignKey: 'Patient_patient_id_FK',
  targetKey: 'patientId',
});

Doctor.hasMany(Appointment, {
  foreignKey: 'Doctor_doctor_id_FK',
  sourceKey: 'doctor_id',
});
Appointment.belongsTo(Doctor, {
  as: 'doctor',
  foreignKey: 'Doctor_doctor_id_FK',
  targetKey: 'doctor_id',
});
