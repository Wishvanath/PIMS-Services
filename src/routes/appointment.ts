import express from 'express';
import * as appointmentController from '../controllers/appointment.controller';

const appointmentRouter = express.Router();
appointmentRouter.post('/', appointmentController.createAppointment);

export default appointmentRouter;