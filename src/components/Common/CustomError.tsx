/* eslint-disable  @typescript-eslint/no-explicit-any */
interface Response {
  data: {
    message?: string;
    status?: string;
  };
  status: number;
  headers: string;
}

class CustomError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
    this.name = 'CustomError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

export default CustomError;
