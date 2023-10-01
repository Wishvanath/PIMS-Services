import express from 'express';
import * as appointmentController from '../controllers/appointment.controller';

const appointmentRouter = express.Router();
appointmentRouter.post('/', appointmentController.createAppointment);
appointmentRouter.get('/:id', appointmentController.getAppointmentById);

export default appointmentRouter;