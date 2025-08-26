import CommonError from './CommonError';

class NotFoundError extends CommonError {
  constructor(message: string) {
    super(message, 404);
  }
}

export default NotFoundError;
