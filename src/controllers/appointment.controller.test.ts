import httpMocks from 'node-mocks-http';
import {
  ClientInputError,
//   ConflictError,
  DatabaseError,
} from '../utils/error-handler';
import * as appointmentService from '../services/appointment.service';
import * as appointmentController from '../controllers/appointment.controller';

describe('Appointment Controller', () => {
  describe('createAppointment', () => {
    const mockRequest = {
      firstName: 'Wishnu',
      lastName: 'Sah',
      nationality: 'Indian',
      gender: 'Male',
      address: 'VIll- Ransi, Post- Kaithia',
      dob: '1992/08/01',
      phone: '9939940238',
      email: 'anandwishvanath8@gmail.com',
      type: 'Clinical',
      date: '2023/01/01',
      time: '2023/01/01',
      appointmentDescp: 'Heart disease',
      doctorId: 1,
    };
    const mockResponse: any = {
      statusCode: 200,
      response: {
        message: 'Appointment created successfully.',
        patientId: 1,
        data: {
          createdDate: '2023-09-29T20:45:08.776Z',
          updatedDate: '2023-09-29T20:45:08.776Z',
          id: 1,
          type: 'Clinical',
          date: '2022-12-31T18:30:00.000Z',
          time: '2022-12-31T18:30:00.000Z',
          appointmentDescp: 'Heart disease',
          doctorId: 1,
          patientId: 1,
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
          lastName: 'Sah',
          nationality: 'Indian',
          gender: 'Male',
          address: 'VIll- Ransi, Post- Kaithia',
          dob: '1992/08/01',
          phone: '9939940238',
          email: 'anandwishvanath8@gmail.com',
          type: 'Clinical',
          date: '2023/01/01',
          time: '2023/01/01',
          appointmentDescp: 'Heart disease',
          doctorId: 2,
        },
      });

      const res = httpMocks.createResponse();
      await appointmentController.createAppointment(req, res, next);
      expect(res.writableEnded).toBe(false);
      expect(next).toBeCalled();
    });

    test('should throw error when appointment has already exits created with phone', async () => {
      const next = jest.fn((err) => {
        expect(err).toBeInstanceOf(DatabaseError);
        expect(err.message).toContain(
          "Cannot read properties of undefined (reading 'original')"
        );
      });

      jest
        .spyOn(appointmentService, 'validateDublicateEntries')
        .mockResolvedValue(null);

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
          firstName: 'test',
          lastName: 'test',
          nationality: 'test',
          gender: 'test',
          address: 'test',
          dob: 'test',
          phone: 'test',
          email: 'test',
        },
      ];
      const mockSaveAppointment: any = [
        {
          type: 'test',
          date: 'test',
          time: 'test',
          appointmentDescp: 'test',
          doctorId: 1,
          patientId: 1,
        },
      ];

      jest.spyOn(appointmentService, 'createAppointment').mockResolvedValue({
        statusCode: 200,
        response: {
          message: 'Appointment created successfully.',
          patientId: 1,
          data: {
            createdDate: '2023-09-29T20:45:08.776Z',
            updatedDate: '2023-09-29T20:45:08.776Z',
            id: 1,
            type: 'Clinical',
            date: '2022-12-31T18:30:00.000Z',
            time: '2022-12-31T18:30:00.000Z',
            appointmentDescp: 'Heart disease',
            doctorId: 1,
            patientId: 1,
          },
        },
      });



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
