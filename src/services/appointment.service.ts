import { sequelize } from "../models";
import { DatabaseError } from "../utils/error-handler";
import { Appointment } from "../models/appointment";
import { Patient } from "../models/patient";
import Transaction from "sequelize/types/transaction";

export const createAppointment = async (
    payload: any
) => {
    try {
        const {
            firstName,
            lastName,
            nationality,
            gender,
            address,
            dob,
            phone,
            email,
            type,
            date,
            time,
            appointmentDescp,
            doctorId
        } = payload;

        const patientData = {
            firstName,
            lastName,
            nationality,
            gender,
            address,
            dob,
            phone,
            email
        };

        // const appointmentData = {
        //     type: type,
        //     date: date,
        //     time: time,
        //     appointmentDescp: appointmentDescp,
        //     doctorId: doctorId
        // };

        // console.log("appointmentData========>",appointmentData);
        console.log("patientData========>",patientData);

        const result = await sequelize.transaction(
            async(transaction: Transaction) => {
                const patientResult:any = await createPatient(
                    patientData,
                    transaction
                )

                const appointmentData:any = {
                    type: type,
                    date: date,
                    time: time,
                    appointmentDescp: appointmentDescp,
                    doctorId: doctorId,
                    patientId: patientResult.patientId
                };

        console.log("appointmentData========>",appointmentData);

                const appointmentResult:any = await createApt(
                    appointmentData,
                    transaction
                )
                return {
                    statusCode: 200,
                    response: {
                        message: 'Patient data created successfully.',
                        patientId: patientResult.patientId,
                        data: appointmentResult
                    }
                }

            }
            )
        // const appointmentResult = await Appointment.create(payload);

        return result
    } catch (error:any) {
        throw new DatabaseError(error)
    }
}

export const createPatient = async (
    patientPayload: any,
    transaction: Transaction | null = null
) => {
    try {
        const patientResult = await Patient.create(patientPayload, {
            transaction
        });
        return patientResult;
    } catch (error:any) {
        throw new DatabaseError(error);
    }
}

export const createApt = async(
    appointmentPayload: any,
    transaction: Transaction | null = null
) => {
    try {
        const appointmentResult = await Appointment.create(appointmentPayload,{
            transaction
        })
        return appointmentResult;
    } catch (error:any) {
        console.log("Error ==========>", error);
        throw new DatabaseError(error);
    }
}