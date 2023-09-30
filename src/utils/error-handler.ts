export class RuntimeError extends Error {
  public status;
  public innerError;

  constructor(message: string, error: Error) {
    super(message);
    this.status = 500;
    this.name = 'RuntimeError';
    this.innerError = error;
  }
}

export class DatabaseError extends Error {
  public status;

  constructor(error: Error | any) {
    super(error instanceof Error ? error.message : error);
    this.status = 500;
    this.name = error.name || 'DatabaseError';

    if (error.original) {
      this.stack = error.original;
    } else {
      this.stack = error.stack;
    }
  }
}

export class ClientInputError extends Error {
  public status;
  constructor(message: string) {
    super(message);
    this.status = 400;
    this.name = 'ClientInputError';
  }
}

export class NotFoundError extends Error {
  public status;
  constructor(message: string) {
    super(message || 'Not found');
    this.status = 404;
    this.name = 'NotFoundError';
  }
}

export class TokenExpiredError extends Error {
  public status;
  constructor(message: string) {
    super(message || 'Token expired');
    this.status = 401;
    this.name = 'TokenExpiredError';
  }
}

export class ConflictError extends Error {
  public status;
  constructor(message: string) {
    super(message);
    this.status = 409;
    this.name = 'ConflictError';
  }
}

export class AxiosError extends Error {
  constructor(err: Error, message: string) {
    const newMessage = message || err?.message;
    super(newMessage);

    // maintain proper stack trace for where our errror was thrown
    Error.captureStackTrace(this, AxiosError);
    this.name = 'AxiosError';
  }
}
