import express from 'express';
import * as appointmentController from '../controllers/appointment.controller';

const appointmentRouter = express.Router();
appointmentRouter.post('/', appointmentController.createAppointment);
appointmentRouter.put('/', appointmentController.updateAppointmentById);
appointmentRouter.get('/:id', appointmentController.getAppointmentById);
appointmentRouter.delete('/:id', appointmentController.deleteAppointmentById);

export default appointmentRouter;
