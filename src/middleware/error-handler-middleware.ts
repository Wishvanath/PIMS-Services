import { Request, Response } from 'express';
import { logError } from '../';

export default (logger: any) =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (err: any, req: Request, res: Response, next: Function) => {
    const { id: requestId }: any = req;
    logError(logger, err, { requestId });
    if (res.headersSent) {
      return next(err);
    }

    const { message, status = 500 } = err;
    const response = { message };
    if (status === 500) {
      response.message = 'Something went wrong.';
    }
    if (requestId && req.headers['user-agent']?.includes('axios')) {
      response.message = `pims service x-request-id: ${requestId}`;
    }

    return res.status(status).send(response);
  };
