import CommonError from './CommonError';

class ForbiddenError extends CommonError {
  constructor(message: string) {
    super(message, 403);
  }
}

export default ForbiddenError;
