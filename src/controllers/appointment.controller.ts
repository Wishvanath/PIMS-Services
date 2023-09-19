import { Request, Response, NextFunction } from "express";
import { createAppointmentSchema } from '../utils/validation-schema';
import {
    createRequestHeaderCheck,
    parseCreateRequestBody,
} from '../utils/gateway-helper';
import {
    ClientInputError,
    NotFoundError,
    ConflictError,
} from '../utils/error-handler';


export const createAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.send("create appointment Response from controller");
        
    } catch (error) {
        return next(error)
    }
}