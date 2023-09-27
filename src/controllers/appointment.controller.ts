import { Request, Response, NextFunction } from "express";
import { createAppointmentSchema } from '../utils/validation-schema';
import * as appointmentService from '../services/appointment.service';
import {
    createRequestHeaderCheck,
    parseCreateRequestBody,
} from '../utils/gateway-helper';
import {
    ClientInputError,
    NotFoundError,
    ConflictError,
} from '../utils/error-handler';
import { validateWithSchema } from "../utils/input.validator";


export const createAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const headerAbsent = await createRequestHeaderCheck(req);
        if(headerAbsent) {
            throw new ClientInputError('request must include a Header value of: Content-type:application/json')
        }
        
        const parseBody = await parseCreateRequestBody(req);
        validateWithSchema(createAppointmentSchema, parseBody);

        // const {
        //     firstName,
        //     lastName,
        //     nationality,
        //     gender,
        //     address,
        //     dob,
        //     phone,
        //     email
        // } = parseBody

        console.log("Parse Body ========>", parseBody);

        const result = await appointmentService.createAppointment(parseBody);

        return res.status(result.statusCode).json(result.response);
        
    } catch (error) {
        return next(error)
    }
}