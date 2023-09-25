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
        const headerAbsent = await createRequestHeaderCheck(req);
        if(headerAbsent) {
            throw new ClientInputError('request must include a Header value of: Content-type:application/json')
        }
        
        const parseBody = await parseCreateRequestBody(req);
        console.log("Parse Body ========>", parseBody);
        
    } catch (error) {
        return next(error)
    }
}