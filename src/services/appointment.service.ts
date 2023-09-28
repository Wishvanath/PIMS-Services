import { sequelize } from '../models';
import { DatabaseError } from '../utils/error-handler';
import { Appointment } from '../models/appointment';
import { Patient } from '../models/patient';
import Transaction from 'sequelize/types/transaction';

export const createAppointment = async (payload: any) => {
  try {
    const {
      firstName,
      lastName,
      nationality,
      gender,
      address,
      dob,
      phone,
      email,
      type,
      date,
      time,
      appointmentDescp,
      doctorId,
    } = payload;

    const patientData = {
      firstName,
      lastName,
      nationality,
      gender,
      address,
      dob,
      phone,
      email,
    };

    const result = await sequelize.transaction(
      async (transaction: Transaction) => {
        const patientResult: any = await savePatient(patientData, transaction);

        const appointmentData: any = {
          type: type,
          date: date,
          time: time,
          appointmentDescp: appointmentDescp,
          doctorId: doctorId,
          patientId: patientResult.patientId,
        };

        const appointmentResult: any = await saveAppointment(
          appointmentData,
          transaction
        );

        return {
          statusCode: 200,
          response: {
            message: 'Appointment created successfully.',
            patientId: patientResult.patientId,
            data: appointmentResult,
          },
        };
      }
    );
    return result;
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

export const savePatient = async (
  patientPayload: any,
  transaction: Transaction | null = null
) => {
  try {
    const patientResult = await Patient.create(patientPayload, {
      transaction,
    });
    return patientResult;
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

export const saveAppointment = async (
  appointmentPayload: any,
  transaction: Transaction | null = null
) => {
  try {
    const appointmentResult = await Appointment.create(appointmentPayload, {
      transaction,
    });
    return appointmentResult;
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

export const validateDublicateEntries = async (phone: string) => {
  try {
    const result = await Patient.findAll({
      where: {
        phone,
      },
      attributes: ['firstName', 'email', 'dob', 'phone'],
      raw: true,
    });
    if (result.length) {
      const existingData = JSON.stringify(result);
      return {
        statusCode: 409,
        response: `${existingData} already exists`,
      };
    }
    return null;
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};
