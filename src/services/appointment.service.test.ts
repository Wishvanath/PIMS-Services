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

    test('should return appointment data when successfull', async () => {
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

  describe('getAppointmentById', () => {
    test('should handle database error', async () => {
      const payload: any = {
        patientId: mockPatientId,
      };
      const error = new Error('dummy error');
      jest.spyOn(Patient, 'findAll').mockImplementation(() => {
        throw error;
      });

      await expect(
        appointmentService.getAppointmentById(payload)
      ).rejects.toThrow(error);
    });

    test('should get 404 if content is not found', async () => {
      const mockContent: any = {};

      const findAll = jest
        .spyOn(Patient, 'findAll')
        .mockResolvedValue(mockContent);

      const result = await appointmentService.getAppointmentById(1);
      expect(findAll).toBeCalled();
      expect(result.statusCode).toBe(404);
    });

    test('should get appointment details successfull', async () => {
      const mockContent: any = [
        {
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
              id: 1,
              patientId: mockPatientId,
              type: mockType,
              createdDate: '2023-09-28T18:41:33.000Z',
              updatedDate: '2023-09-28T18:41:33.000Z',
              date: mockDate,
              time: mockTime,
              appointmentDescp: mockAppointmentDescp,
              doctorId: mockDoctorId,
            },
          ],
        },
      ];

      const mockResponse: any = {
        statusCode: 200,
        response: [
          {
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
                id: 1,
                patientId: mockPatientId,
                type: mockType,
                createdDate: '2023-09-28T18:41:33.000Z',
                updatedDate: '2023-09-28T18:41:33.000Z',
                date: mockDate,
                time: mockTime,
                appointmentDescp: mockAppointmentDescp,
                doctorId: mockDoctorId,
              },
            ],
          },
        ] as any,
      };

      const findAll = jest
        .spyOn(Patient, 'findAll')
        .mockResolvedValue(mockContent);

      const result = await appointmentService.getAppointmentById(1);

      expect(findAll).toHaveBeenCalled();
      expect(result.statusCode).toBe(200);
      expect(result.response).toMatchObject(mockResponse.response);
    });
  });

  describe('deleteAppointmentById', () => {
    test('should handle database error', async () => {
      const payload: any = {
        patientId: mockPatientId,
      };
      const error = new Error('dummy error');
      jest.spyOn(Patient, 'destroy').mockImplementation(() => {
        throw error;
      });

      await expect(
        appointmentService.deleteAppointmentById(payload)
      ).rejects.toThrow(error);
    });

    test('delete content by patientId - successful', async () => {
      const deletedRecord = jest.spyOn(Patient, 'destroy').mockResolvedValue(1);

      const actualResponse = await appointmentService.deleteAppointmentById(
        mockPatientId
      );

      expect(deletedRecord).toHaveBeenCalled();
      expect(actualResponse).toBe(1);
    });

    test('delete content by patientId - not found', async () => {
      const deletedRecord = jest.spyOn(Patient, 'destroy').mockResolvedValue(0);

      const actualResponse = await appointmentService.deleteAppointmentById(
        mockPatientId
      );

      expect(deletedRecord).toHaveBeenCalled();
      expect(actualResponse).toBe(0);
    });
  });

  describe('updatePatient', () => {
    test('should handle database error', async () => {
      const updatePatientPayload: any = {
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
      const error = new Error('dummy error');
      jest.spyOn(Patient, 'update').mockImplementation(() => {
        throw error;
      });

      await expect(
        appointmentService.updatePatient(updatePatientPayload)
      ).rejects.toThrow(error);
    });
    test('should return update patient data successfull', async () => {
      const mockCreateResponse: any = {
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

      const update = jest
        .spyOn(Patient, 'update')
        .mockImplementation(() => mockCreateResponse);

      const result = await appointmentService.updatePatient(mockCreateResponse);
      expect(update).toHaveBeenCalled();
      expect(result).toMatchObject(mockCreateResponse);
    });
  });

  describe('updateApppointment', () => {
    test('should handle database error', async () => {
      const updateAppointmentPayload: any = {
        mockType,
        mockDate,
        mockTime,
        mockAppointmentDescp,
        mockDoctorId,
        mockPatientId,
      };
      const error = new Error('dummy error');
      jest.spyOn(Appointment, 'update').mockImplementation(() => {
        throw error;
      });

      await expect(
        appointmentService.updateAppointment(updateAppointmentPayload)
      ).rejects.toThrow(error);
    });
    test('should return update appointment data successfull', async () => {
      const mockCreateResponse: any = {
        mockType,
        mockDate,
        mockTime,
        mockAppointmentDescp,
        mockDoctorId,
        mockPatientId,
      };

      const update = jest
        .spyOn(Appointment, 'update')
        .mockImplementation(() => mockCreateResponse);

      const result = await appointmentService.updateAppointment(
        mockCreateResponse
      );
      expect(update).toHaveBeenCalled();
      expect(result).toMatchObject(mockCreateResponse);
    });
  });

  describe('updateAppointmentById', () => {
    test('should handle database error', async () => {
      const updateAppointmentPayload: any = {
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
      const error = new Error('dummy error');
      jest.spyOn(Appointment, 'update').mockImplementation(() => {
        throw error;
      });

      await expect(
        appointmentService.updateAppointmentById(updateAppointmentPayload)
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
        patientId: mockPatientId,
      };
      const updatePatientPayload: any = {
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
      const updateAppointmentPayload: any = {
        type: mockType,
        date: mockDate,
        time: mockTime,
        appointmentDescp: mockAppointmentDescp,
        doctorId: mockDoctorId,
        patientId: mockPatientId,
      };

      jest
        .spyOn(appointmentService, 'updatePatient')
        .mockImplementation(() => updatePatientPayload);

      jest
        .spyOn(appointmentService, 'updateAppointment')
        .mockImplementation(() => updateAppointmentPayload);

      const result = await appointmentService.updateAppointmentById(
        mockCreateResponse
      );
      expect(result).toMatchObject({
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
      });
    });
  });
});
