import express from 'express';
import appointmentRouter from './appointment';

const router = express.Router();
router.use('/appointment', appointmentRouter);

export default router;
