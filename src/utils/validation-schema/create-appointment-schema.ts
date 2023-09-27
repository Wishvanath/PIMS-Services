import Schema from 'validate';

const createAppointmentSchema = new Schema( {
    firstName: {
        type: String,
        required: true,
        match: /^[a-z0-9 ,.'-]+$/i,
        message: 'firstName is required.'
    },
    lastName: {
        type: String,
        required: false,
        match: /^[a-z0-9 ,.'-]+$/i,
    },
    nationality: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required:false
    },
    dob: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        // match:^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$,
    },
    type: {
        type: String,
        required: true,
        message: 'type is required.'
    },
    date: {
        type: String,
        required: true,
        message: 'date is required.'
    },
    time: {
        type: String,
        required: true,
        message: 'time is required'
    },
    appointmentDescp: {
        type: String,
        required: true,
        message: 'appointment descp is required.'
    },
    doctorId: {
        type:Number,
        required: true,
        message: 'doctorId is required.'
    },
    // patientId: {
    //     type: Number,
    //     required: true,
    //     message: 'patientId is required.'
    // }
});

export default createAppointmentSchema;