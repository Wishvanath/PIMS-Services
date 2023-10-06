import { Request, Response, NextFunction } from 'express';
import {
  createAppointmentSchema,
  updateAppointmentSchema,
  getAllAppointmentSchema,
} from '../utils/validation-schema';
import * as appointmentService from '../services/appointment.service';
import {
  createRequestHeaderCheck,
  parseCreateRequestBody,
} from '../utils/gateway-helper';
import {
  ClientInputError,
  ConflictError,
  NotFoundError,
} from '../utils/error-handler';
import { validateRequired, validateWithSchema } from '../utils/input.validator';

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerAbsent = await createRequestHeaderCheck(req);
    if (headerAbsent) {
      throw new ClientInputError(
        'request must include a Header value of: Content-type:application/json'
      );
    }

    const parseBody = await parseCreateRequestBody(req);
    validateWithSchema(createAppointmentSchema, parseBody);

    const hasDublicateEntries =
      await appointmentService.validateDublicateEntries(parseBody.phone);
    if (hasDublicateEntries) {
      throw new ConflictError(
        `Appointment with firstname ${parseBody.firstName} already exists`
      );
    }

    const result = await appointmentService.createAppointment(parseBody);
    return res.status(result.statusCode).json(result.response);
  } catch (error) {
    return next(error);
  }
};

export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientId: any = req.params.id;

    const missingData: any = validateRequired(patientId);
    if (missingData.length) {
      throw new ClientInputError('Missing params: PatientId');
    }

    if (Number.isNaN(Number(patientId))) {
      throw new ClientInputError('PatientId must be a number');
    }

    const result = await appointmentService.getAppointmentById(
      Number(patientId)
    );

    if (result) {
      if (result.statusCode == 404) {
        throw new NotFoundError(
          `Appointment details with ${patientId} not found.`
        );
      }
      return res.status(result.statusCode).json(result.response);
    }
  } catch (error: any) {
    return next(error);
  }
};

export const deleteAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientId: any = req.params.id;

    const missingData: any = validateRequired(patientId);
    if (missingData.length) {
      throw new ClientInputError('Missing params: PatientId');
    }

    if (Number.isNaN(Number(patientId))) {
      throw new ClientInputError('PatientId must be a number');
    }

    const result = await appointmentService.deleteAppointmentById(
      Number(patientId)
    );
    if (result) {
      return res
        .status(200)
        .json(
          `The Patient appointment record with ${patientId} has deleted successfully.`
        );
    }
    throw new NotFoundError(`Couldn't found record with ${patientId}.`);
  } catch (error: any) {
    return next(error);
  }
};

export const updateAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerAbsent = await createRequestHeaderCheck(req);
    if (headerAbsent) {
      throw new ClientInputError(
        'request must include a Header value of: Content-type:application/json'
      );
    }

    const parseBody = await parseCreateRequestBody(req);
    validateWithSchema(updateAppointmentSchema, parseBody);

    const result = await appointmentService.updateAppointmentById(parseBody);
    return res.status(result.statusCode).json(result.response);
  } catch (error: any) {
    return next(error);
  }
};

export const getAllAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerAbsent = await createRequestHeaderCheck(req);
    if (headerAbsent) {
      throw new ClientInputError(
        'request must include a Header value of: Content-type:application/json'
      );
    }

    const parseBody = await parseCreateRequestBody(req);
    validateWithSchema(getAllAppointmentSchema, parseBody);

    const {
      limit = 10,
      offset = 0,
      keyword = '',
      filters = {},
    }: any = parseBody;

    const result = await appointmentService.getAllAppointment(
      limit,
      offset,
      keyword,
      filters
    );

    if (result) {
      return res.status(result.statusCode).json(result.response);
    }
  } catch (error: any) {
    return next(error);
  }
};
