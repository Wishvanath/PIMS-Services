import httpMocks from 'node-mocks-http';
import {
  ClientInputError,
  ConflictError,
  // DatabaseError,
  NotFoundError,
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
      const mockSavePatient: any = {
        firstName: mockFirstName,
        lastName: mockLastName,
        nationality: mockNationality,
        gender: mockGender,
        address: mockAddress,
        dob: mockDob,
        phone: mockPhone,
        email: mockEmail,
      };

      const mockSaveAppointment: any = {
        type: mockType,
        date: mockDate,
        time: mockTime,
        appointmentDescp: mockAppointmentDescp,
        doctorId: mockDoctorId,
        patientId: mockPatientId,
      };

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

  describe('getAppointmentById', () => {
    const mockResponse: any = {
      statusCode: 200,
      response: {
        patientId: mockPatientId,
        firstName: mockFirstName,
        lastName: mockLastName,
        nationality: mockNationality,
        gender: mockGender,
        address: mockAddress,
        dob: mockDob,
        phone: mockPhone,
        email: mockEmail,
        appointment: [
          {
            id: mockPatientId,
            patientId: mockPatientId,
            type: mockType,
            createdDate: '2023-09-27T18:41:53.000Z',
            updatedDate: '2023-09-27T18:41:53.000Z',
            date: mockDate,
            time: mockTime,
            appointmentDescp: mockAppointmentDescp,
            doctorId: mockDoctorId,
          },
        ],
      },
    };

    test('should throw 404 error for content not found ', async () => {
      const next = jest.fn((err) => {
        expect(err).toBeInstanceOf(NotFoundError);
        expect(err.message).toEqual(`Appointment details with 200 not found.`);
      });

      const req = httpMocks.createRequest({
        params: {
          id: 200,
        },
      });
      const res = httpMocks.createResponse();

      await appointmentController.getAppointmentById(req, res, next);
      expect.assertions(4);
      expect(res.writableEnded).toBe(false);
      expect(next).toBeCalled();
    });

    test('should get data succussfully with 200 status code', async () => {
      const req = httpMocks.createRequest({
        params: {
          id: 1,
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn(() => {});

      jest
        .spyOn(appointmentService, 'getAppointmentById')
        .mockImplementation(() => mockResponse);

      await appointmentController.getAppointmentById(req, res, next);
      const body = res._getJSONData();

      expect(res.statusCode).toEqual(200);
      expect(body).toEqual(mockResponse.response);
      expect(res.writableEnded).toBe(true);
      expect(next).not.toBeCalled();
    });

    test('should throw 400 error for bad request when id is missing', async () => {
      const mockRequest: any = {
        params: { id: null },
      };

      const mockResponse = httpMocks.createResponse();

      const mockNext = jest.fn((err) => {
        expect(err).toBeInstanceOf(TypeError);
        expect(err.message).toContain(
          'Cannot convert undefined or null to object'
        ); //msg we get wrong
      });

      await appointmentController.getAppointmentById(
        mockRequest,
        mockResponse,
        mockNext
      );
      expect.assertions(4);
      expect(mockResponse.writableEnded).toBe(false);
      expect(mockNext).toBeCalled();
    });

    test('should throw 400 error for bad request when id is NAN ', async () => {
      const next = jest.fn((err) => {
        expect(err).toBeInstanceOf(ClientInputError);
        expect(err.message).toEqual('PatientId must be a number');
      });

      const req = httpMocks.createRequest({
        params: {
          id: 'test',
        },
      });
      const res = httpMocks.createResponse();

      await appointmentController.getAppointmentById(req, res, next);
      expect.assertions(4);
      expect(res.writableEnded).toBe(false);
      expect(next).toBeCalled();
    });
  });

  describe('deleteAppointmentById', () => {
    test('should throw 404 error when content not found ', async () => {
      const mockRequest: any = httpMocks.createRequest({
        params: {
          id: mockPatientId,
        },
      });
      const mockResponse: any = {};
      const mockNext = jest.fn();

      jest
        .spyOn(appointmentService, 'deleteAppointmentById')
        .mockResolvedValueOnce(0);

      await appointmentController.deleteAppointmentById(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toBeCalledWith(
        new NotFoundError(`Couldn't found record with ${mockPatientId}.`)
      );
    });

    test('should get data succussfully with 200 status code', async () => {
      const mockResponse: any = {
        id: mockPatientId,
      };
      const req = httpMocks.createRequest({
        params: {
          id: 1,
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn(() => {});

      jest
        .spyOn(appointmentService, 'deleteAppointmentById')
        .mockImplementation(() => mockResponse);

      await appointmentController.deleteAppointmentById(req, res, next);
      const body = res._getJSONData();

      expect(res.statusCode).toEqual(200);
      expect(body).toEqual(
        `The Patient appointment record with ${mockPatientId} has deleted successfully.`
      );
      expect(res.writableEnded).toBe(true);
      expect(next).not.toBeCalled();
    });

    test('should get data succussfully with 200 status code 2nd way', async () => {
      const mockRequest = httpMocks.createRequest({
        params: {
          id: mockPatientId,
        },
      });
      const mockResponse: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockNext = jest.fn();

      jest
        .spyOn(appointmentService, 'deleteAppointmentById')
        .mockResolvedValueOnce(1);

      await appointmentController.deleteAppointmentById(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toBeCalledWith(
        `The Patient appointment record with ${mockPatientId} has deleted successfully.`
      );
    });

    test('should throw 400 error for bad request when id is missing', async () => {
      const mockRequest: any = {
        params: { id: null },
      };

      const mockResponse = httpMocks.createResponse();

      const mockNext = jest.fn((err) => {
        expect(err).toBeInstanceOf(TypeError);
        expect(err.message).toContain(
          'Cannot convert undefined or null to object'
        ); //msg we get wrong
      });

      await appointmentController.deleteAppointmentById(
        mockRequest,
        mockResponse,
        mockNext
      );
      expect.assertions(4);
      expect(mockResponse.writableEnded).toBe(false);
      expect(mockNext).toBeCalled();
    });

    test('should throw 400 error for bad request when id is NAN ', async () => {
      const next = jest.fn((err) => {
        expect(err).toBeInstanceOf(ClientInputError);
        expect(err.message).toEqual('PatientId must be a number');
      });

      const req = httpMocks.createRequest({
        params: {
          id: 'test',
        },
      });
      const res = httpMocks.createResponse();

      await appointmentController.deleteAppointmentById(req, res, next);
      expect.assertions(4);
      expect(res.writableEnded).toBe(false);
      expect(next).toBeCalled();
    });
  });

  describe('updateAppointmentById', () => {
    const mockRequest: any = {
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
      patientId: mockPatientId,
    };
    const mockResponse: any = {
      statusCode: 200,
      response: {
        message: `Appointment with ${mockPatientId}  updated successfully.`,
        patientData: {
          firstName: 'test',
          lastName: 'test',
          nationality: 'test',
          gender: 'Male',
          address: 'test',
          dob: '1992-01-31 18:30:00.000',
          phone: '9999999999',
          email: 'test@gmail.com',
          patientId: 1,
        },
        appointmentData: {
          type: 'test',
          date: '2023-09-30T17:43:59.397Z',
          time: '2023-09-30T17:43:59.397Z',
          appointmentDescp: 'test',
          doctorId: 1,
          patientId: 1,
        },
      },
    };

    test('should throw error when required fields are missing', async () => {
      const next = jest.fn((err) => {
        expect(err).toBeInstanceOf(ClientInputError);
        expect(err.message).toContain('patientId is required.');
      });

      const req = httpMocks.createRequest({
        headers: { 'content-type': 'application/json' },
        body: {
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
        },
      });

      const res = httpMocks.createResponse();
      await appointmentController.updateAppointmentById(req, res, next);
      expect(res.writableEnded).toBe(false);
      expect(next).toBeCalled();
    });

    test('should send correct response on successful appointment updation', async () => {
      const next = jest.fn(() => {});
      const mockUpdatePatient: any = {
        firstName: mockFirstName,
        lastName: mockLastName,
        nationality: mockNationality,
        gender: mockGender,
        address: mockAddress,
        dob: mockDob,
        phone: mockPhone,
        email: mockEmail,
        patientId: mockPatientId,
      };

      const mockUpdateAppointment: any = {
        type: mockType,
        date: mockDate,
        time: mockTime,
        appointmentDescp: mockAppointmentDescp,
        doctorId: mockDoctorId,
        patientId: mockPatientId,
      };

      jest
        .spyOn(appointmentService, 'updateAppointmentById')
        .mockResolvedValue(mockResponse);

      jest
        .spyOn(appointmentService, 'updatePatient')
        .mockResolvedValue(mockUpdatePatient);

      jest
        .spyOn(appointmentService, 'updateAppointment')
        .mockResolvedValue(mockUpdateAppointment);

      const req = httpMocks.createRequest({
        headers: { 'content-type': 'application/json' },
        body: mockRequest,
      });

      const res = httpMocks.createResponse();
      await appointmentController.updateAppointmentById(req, res, next);
      const resBody = res._getJSONData();

      expect(res.statusCode).toEqual(200);
      expect(resBody).toEqual(mockResponse.response);
      expect(res.writableEnded).toBe(true);
      expect(next).not.toBeCalled();
    });
  });

  describe('getAllAppointment', () => {
    const mockRequest = {
      limit: 10,
      offset: 0,
      keyword: 'title',
      filters: {
        assignedDoctor: [1, 2],
      },
    };
    const mockResponse: any = {
      statusCode: 200,
      response: {
        count: 1,
        rows: [
          {
            firstName: mockFirstName,
            phone: mockPhone,
            appointment: [
              {
                type: mockType,
                date: mockDate,
                time: mockTime,
                appointmentDescp: mockAppointmentDescp,
                doctorId: mockDoctorId,
              },
            ],
          }
        ]
      },
    };

    test('should get data succussfully with 200 status code', async () => {
      const req = httpMocks.createRequest({
        headers: {
          'content-type': 'application/json'
        },
        body:mockRequest
      });
      const res = httpMocks.createResponse();
      const next = jest.fn(() => {});

      jest
        .spyOn(appointmentService, 'getAllAppointment')
        .mockImplementation(() => mockResponse);

      await appointmentController.getAllAppointment(req, res, next);
      const body = res._getJSONData();

      expect(res.statusCode).toEqual(200);
      expect(body).toEqual(mockResponse.response);
      expect(res.writableEnded).toBe(true);
      expect(next).not.toBeCalled();
    });
  });
});
