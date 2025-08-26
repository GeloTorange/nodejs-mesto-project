import CommonError from './CommonError';

class BadRequestError extends CommonError {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequestError;
