import CommonError from './CommonError';

class AuthError extends CommonError {
  constructor(message: string) {
    super(message, 401);
  }
}

export default AuthError;
