import Schema from 'validate';

const getAllAppointmentSchema = new Schema({
  offset: {
    type: Number,
  },
  limit: {
    type: Number,
  },
  keyword: {
    type: String,
  },
  filters: {
    type: Object,
    assignedDoctor: {
      type: Array,
      each: { type: Number },
    },
  },
});

export default getAllAppointmentSchema;
