import { Request, Response, NextFunction } from 'express';
import { createAppointmentSchema } from '../utils/validation-schema';
import * as appointmentService from '../services/appointment.service';
import {
  createRequestHeaderCheck,
  parseCreateRequestBody,
} from '../utils/gateway-helper';
import {
  ClientInputError,
  // NotFoundError,
  ConflictError,
} from '../utils/error-handler';
import { validateWithSchema } from '../utils/input.validator';

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

    // check if has dublicate entries
    const hasDublicateEntries =
      await appointmentService.validateDublicateEntries(parseBody.phone);
    if (hasDublicateEntries) {
      throw new ConflictError(hasDublicateEntries.response);
    }

    const result = await appointmentService.createAppointment(parseBody);
    return res.status(result.statusCode).json(result.response);
  } catch (error) {
    return next(error);
  }
};

export const getAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientId: any = req.params.id;
    // console.log("PatientId :================>", patientId);

    // add missing data validation

    const result = await appointmentService.getAppointment(patientId);

    return res.status(result.statusCode).json(result.response);
  } catch (error: any) {
    return next(error);
  }
};
