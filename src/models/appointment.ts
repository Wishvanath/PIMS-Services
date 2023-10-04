import { DataTypes, Optional, ModelDefined } from 'sequelize';
import { sequelize } from '.';
import { Patient } from './patient';
// import { Doctor } from './doctor';

// create interface for appointment table column
export interface AppointmentAttributes {
  id: number;
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
    patientId: {
      field: 'PatientId',
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Patient',
        },
        key: 'PatientId',
      },
      allowNull: false,
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    type: {
      field: 'Type',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdDate: {
      field: 'CreatedDate',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedDate: {
      field: 'UpdatedDate',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    date: {
      field: 'Date',
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      field: 'Time',
      type: DataTypes.DATE,
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
        fields: ['PatientId'],
      },
    ],
  }
);

// create association
Patient.hasMany(Appointment, {
  as: 'appointment',
  foreignKey: 'patientId',
  sourceKey: 'patientId',
});
Appointment.belongsTo(Patient, {
  as: 'patient',
  foreignKey: 'patientId',
  targetKey: 'patientId',
});

// Doctor.hasMany(Appointment, {
//   as: 'doctor',
//   foreignKey: 'DoctorId',
//   // sourceKey: 'Id',
// });
// Appointment.belongsTo(Doctor, {
//   as: 'doctor',
//   foreignKey: 'Id',
//   // targetKey: 'DoctorId',
// });
