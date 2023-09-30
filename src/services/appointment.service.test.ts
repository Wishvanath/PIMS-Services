import { sequelize } from '../models';
import { Appointment } from '../models/appointment';
import { Patient } from '../models/patient';
import * as appointmentService from './appointment.service';
describe('Appointment Service Test', () => {
  const mockFirstName = 'test';
  const mockLastName = 'test';
  const mockNationality = 'test';
  const mockGender = 'Male';
  const mockAddress = 'test';
  const mockDob = '1992-01-31 18:30:00.000';
  const mockPhone = '9999999999';
  const mockEmail = 'test@gmail.com';
  const mockType = 'test';
  const mockDate = '2023-09-30T17:43:59.397Z';
  const mockTime = '2023-09-30T17:43:59.397Z';
  const mockAppointmentDescp = 'test';
  const mockPatientId = 1;
  const mockDoctorId = 1;

  const createAppointmentPayload: any = {
    firstName: mockFirstName,
    lastName: mockLastName,
    nationality: mockNationality,
    gender: mockGender,
    address: mockAddress,
    dob: mockDob,
    phone: mockPhone,
    email: mockEmail,
    type: mockType,
    date: mockDate,
    time: mockTime,
    appointmentDescp: mockAppointmentDescp,
    doctorId: mockDoctorId,
  };

  const savePatientPayload: any = {
    firstName: mockFirstName,
    lastName: mockLastName,
    nationality: mockNationality,
    gender: mockGender,
    address: mockAddress,
    dob: mockDob,
    phone: mockPhone,
    email: mockEmail,
  };

  const saveAppointmentPayload: any = {
    type: mockType,
    date: mockDate,
    time: mockTime,
    appointmentDescp: mockAppointmentDescp,
    doctorId: mockDoctorId,
    patientId: mockPatientId,
  };

  const appointmentResponse: any = {
    statusCode: 200,
    response: {
      message: 'Appointment created successfully.',
      patientId: mockPatientId,
      data: {
        type: mockType,
        date: mockDate,
        time: mockTime,
        appointmentDescp: mockAppointmentDescp,
        doctorId: mockDoctorId,
        patientId: mockPatientId,
      },
    },
  };

  describe('savePatient', () => {
    test('should handle database error', async () => {
      const error = new Error('dummy error');
      jest.spyOn(Patient, 'create').mockImplementation(() => {
        throw error;
      });

      await expect(
        appointmentService.savePatient(savePatientPayload)
      ).rejects.toThrow(error);
    });

    test('should return patient data when successfull', async () => {
      const mockCreateResponse: any = {
        firstName: mockFirstName,
        lastName: mockLastName,
        nationality: mockNationality,
        gender: mockGender,
        address: mockAddress,
        dob: mockDob,
        phone: mockPhone,
        email: mockEmail,
      };

      const create = jest
        .spyOn(Patient, 'create')
        .mockImplementation(() => mockCreateResponse);

      const result = await appointmentService.savePatient(mockCreateResponse);
      expect(create).toHaveBeenCalled();
      expect(result).toMatchObject(mockCreateResponse);
    });
  });

  describe('saveAppointment', () => {
    test('should handle database error', async () => {
      const error = new Error('dummy error');
      jest.spyOn(Appointment, 'create').mockImplementation(() => {
        throw error;
      });

      await expect(
        appointmentService.saveAppointment(saveAppointmentPayload)
      ).rejects.toThrow(error);
    });

    test('should return patient data when successfull', async () => {
      const mockCreateResponse: any = {
        type: mockType,
        date: mockDate,
        time: mockTime,
        appointmentDescp: mockAppointmentDescp,
        doctorId: mockDoctorId,
        patientId: mockPatientId,
      };

      const create = jest
        .spyOn(Appointment, 'create')
        .mockImplementation(() => mockCreateResponse);

      const result = await appointmentService.saveAppointment(
        mockCreateResponse
      );
      expect(create).toHaveBeenCalled();
      expect(result).toMatchObject(mockCreateResponse);
    });
  });

  describe('validateDublicateEntries', () => {
    test('should handle database error', async () => {
      const validateDublicatePayload: any = {
        phone: mockPhone,
      };
      const error = new Error('dummy error');
      jest.spyOn(Patient, 'findAll').mockImplementation(() => {
        throw error;
      });

      await expect(
        appointmentService.validateDublicateEntries(validateDublicatePayload)
      ).rejects.toThrow(error);
    });

    test('should return false when successfull', async () => {
      const mockCreateResponse: any = {
        phone: mockPhone,
      };

      const create = jest
        .spyOn(Patient, 'findAll')
        .mockImplementation(() => mockCreateResponse);

      const result = await appointmentService.validateDublicateEntries(
        mockCreateResponse
      );
      expect(create).toHaveBeenCalled();
      expect(result).toEqual(false);
    });
  });

  describe('createAppointment', () => {
    // inserting the data into the database while running the test cases.
    // jest
    //   .spyOn(sequelize, 'transaction')
    //   .mockImplementation((transactionCallback: any) => transactionCallback());

    test('should handle database error', async () => {
      const error = new Error('dummy error');
      jest.spyOn(Appointment, 'create').mockImplementation(() => {
        throw error;
      });

      await expect(
        appointmentService.createAppointment(createAppointmentPayload)
      ).rejects.toThrow(error);
    });

    test('should return success response', async () => {
      const mockCreateResponse: any = {
        firstName: mockFirstName,
        lastName: mockLastName,
        nationality: mockNationality,
        gender: mockGender,
        address: mockAddress,
        dob: mockDob,
        phone: mockPhone,
        email: mockEmail,
        type: mockType,
        date: mockDate,
        time: mockTime,
        appointmentDescp: mockAppointmentDescp,
        doctorId: mockDoctorId,
      };

      jest
        .spyOn(appointmentService, 'savePatient')
        .mockImplementation(() => savePatientPayload);

      jest
        .spyOn(appointmentService, 'saveAppointment')
        .mockImplementation(() => saveAppointmentPayload);

      const result = await appointmentService.createAppointment(
        mockCreateResponse
      );
      expect(result).toMatchObject(appointmentResponse);
    });
  });
});
