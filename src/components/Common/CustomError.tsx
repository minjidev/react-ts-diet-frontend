/* eslint-disable  @typescript-eslint/no-explicit-any */
class CustomError extends Error {
  response?: {
    data: any;
    status: number;
    headers: string;
    message?: string;
  };
}

export default CustomError;
