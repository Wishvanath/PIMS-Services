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
            patientId: appointmentResult.patientId,
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
      attributes: ['firstName'],
      raw: true,
    });
    if (result.length) {
      return true;
    }
    return false;
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

export const getAppointmentById = async (patientId: number) => {
  try {
    const result = await Patient.findAll({
      where: { patientId },
      attributes: [
        'patientId',
        'firstName',
        'lastName',
        'nationality',
        'gender',
        'address',
        'dob',
        'phone',
        'email',
      ],
      include: {
        model: Appointment,
        as: 'appointment',
        // where: {patientId},
        attributes: [
          'id',
          'patientId',
          'type',
          'createdDate',
          'updatedDate',
          'date',
          'time',
          'appointmentDescp',
          'doctorId',
        ],
      },
    });
    if (result.length) {
      return {
        statusCode: 200,
        response: result,
      };
    }
    return {
      statusCode: 404,
      response: 'Not found',
    };
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

export const deleteAppointmentById = async (patientId: number) => {
  try {
    const deletePatient = await Patient.destroy({
      where: { patientId },
      // force: true
    });
    return deletePatient;
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

export const updateAppointmentById = async (payload: any) => {
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
      patientId,
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
      patientId,
    };

    const appointmentData: any = {
      type,
      date,
      time,
      appointmentDescp,
      doctorId,
      patientId,
    };

    const result = await sequelize.transaction(
      async (transaction: Transaction) => {
        const patientResult: any = await updatePatient(
          patientData,
          transaction
        );

        const appointmentResult: any = await updateAppointment(
          appointmentData,
          transaction
        );

        return {
          statusCode: 200,
          response: {
            message: `Appointment with ${patientId}  updated successfully.`,
            patientData: patientResult,
            appointmentData: appointmentResult,
          },
        };
      }
    );
    return result;
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

export const updatePatient = async (
  patientPayload: any,
  transaction: Transaction | null = null
) => {
  try {
    const { patientId } = patientPayload;
    const patientResult = await Patient.update(patientPayload, {
      where: { patientId },
      transaction,
    });
    return patientResult;
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

export const updateAppointment = async (
  appointmentPayload: any,
  transaction: Transaction | null = null
) => {
  try {
    const { patientId } = appointmentPayload;
    const appointmentResult = await Appointment.update(appointmentPayload, {
      where: { patientId },
      transaction,
    });
    return appointmentResult;
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};
