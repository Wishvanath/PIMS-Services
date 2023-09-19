import Schema from 'validate';

const createAppointmentSchema = new Schema( {
    title: {
        type: String,
        required: true,
        match: /^[a-z0-9 ,.'-]+$/i,
    }
    // more title
});

export default createAppointmentSchema;