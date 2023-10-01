import { ClientInputError } from './error-handler';

export const validateRequired = (requiredData: any) =>
  Object.entries(requiredData)
    .map(([k, v]) => (!v ? k : null))
    .filter((d) => !!d);

export const validateWithSchema = (schema: any, payload: any) => {
  const errors = schema.validate(payload, { strict: true });
  if (errors.length) {
    const missingParams = errors.map((error: any) => error.message);
    throw new ClientInputError(`${missingParams.join(', ')}`);
  }
};
