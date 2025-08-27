import CommonError from './CommonError';

class DuplicateError extends CommonError {
  constructor(message: string) {
    super(message, 409);
  }
}

export default DuplicateError;
