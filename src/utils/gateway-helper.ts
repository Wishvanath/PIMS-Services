import { Request } from 'express';

export const createRequestHeaderCheck = async (req: Request) =>
  req.headers['content-type'] != 'application/json';

export const parseCreateRequestBody = async (req: Request) => {
  let data;
  if (typeof req.body === 'object' && req.body !== null) {
    data = req.body;
  } else {
    data = JSON.parse(req.body);
  }
  return data;
};
