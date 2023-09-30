import httpMocks from 'node-mocks-http';
import {
  ClientInputError,
  ConflictError,
  DatabaseError,
} from '../utils/error-handler';
import * as appointmentService from '../services/appointment.service';
import * as appointmentController from '../controllers/appointment.controller';

describe('Appointment Controller Test', () => {
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

  describe('createAppointment', () => {
    const mockRequest = {
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
    const mockResponse: any = {
      statusCode: 200,
      response: {
        message: 'Appointment created successfully.',
        patientId: mockPatientId,
        data: {
          createdDate: '2023-09-29T20:45:08.776Z',
          updatedDate: '2023-09-29T20:45:08.776Z',
          id: 1,
          type: mockType,
          date: mockDate,
          time: mockTime,
          appointmentDescp: mockAppointmentDescp,
          doctorId: mockDoctorId,
          patientId: mockPatientId,
        },
      },
    };
    test('should throw error when required fields are missing', async () => {
      const next = jest.fn((err) => {
        expect(err).toBeInstanceOf(ClientInputError);
        expect(err.message).toContain('firstName is required.');
      });

      const req = httpMocks.createRequest({
        headers: { 'content-type': 'application/json' },
        body: {
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
        },
      });

      const res = httpMocks.createResponse();
      await appointmentController.createAppointment(req, res, next);
      expect(res.writableEnded).toBe(false);
      expect(next).toBeCalled();
    });

    test('should throw error when appointment has already exits', async () => {
      const next = jest.fn((err) => {
        expect(err).toBeInstanceOf(ConflictError);
        expect(err.message).toContain(
          `Appointment with firstname ${mockFirstName} already exists`
        );
      });

      jest
        .spyOn(appointmentService, 'validateDublicateEntries')
        .mockResolvedValue(true);

      const req = httpMocks.createRequest({
        headers: { 'content-type': 'application/json' },
        body: mockRequest,
      });

      const res = httpMocks.createResponse();
      await appointmentController.createAppointment(req, res, next);
      expect(res.writableEnded).toBe(false);
      expect(next).toBeCalled();
    });

    test('should send correct response on successful appointment creation', async () => {
      const next = jest.fn(() => {});
      const mockSavePatient: any = [
        {
          firstName: mockFirstName,
          lastName: mockLastName,
          nationality: mockNationality,
          gender: mockGender,
          address: mockAddress,
          dob: mockDob,
          phone: mockPhone,
          email: mockEmail,
        },
      ];
      const mockSaveAppointment: any = [
        {
          type: mockType,
          date: mockDate,
          time: mockTime,
          appointmentDescp: mockAppointmentDescp,
          doctorId: mockDoctorId,
          patientId: mockPatientId,
        },
      ];

      jest.spyOn(appointmentService, 'createAppointment').mockResolvedValue({
        statusCode: 200,
        response: {
          message: 'Appointment created successfully.',
          patientId: mockPatientId,
          data: {
            createdDate: '2023-09-29T20:45:08.776Z',
            updatedDate: '2023-09-29T20:45:08.776Z',
            id: 1,
            type: mockType,
            date: mockDate,
            time: mockTime,
            appointmentDescp: mockAppointmentDescp,
            doctorId: mockDoctorId,
            patientId: mockPatientId,
          },
        },
      });

      jest
        .spyOn(appointmentService, 'validateDublicateEntries')
        .mockResolvedValue(false);

      jest
        .spyOn(appointmentService, 'savePatient')
        .mockResolvedValue(mockSavePatient);

      jest
        .spyOn(appointmentService, 'saveAppointment')
        .mockResolvedValue(mockSaveAppointment);

      const req = httpMocks.createRequest({
        headers: { 'content-type': 'application/json' },
        body: mockRequest,
      });

      const res = httpMocks.createResponse();
      await appointmentController.createAppointment(req, res, next);
      const resBody = res._getJSONData();

      expect(res.statusCode).toEqual(200);
      expect(resBody).toEqual(mockResponse.response);
      expect(res.writableEnded).toBe(true);
      expect(next).not.toBeCalled();
    });
  });
});
