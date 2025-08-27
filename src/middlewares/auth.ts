import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthError from '../errors/AuthError';
import { RequestAndUser } from '../interfaces/RequestAndUser';

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export default (req: RequestAndUser, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-secret');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload as RequestAndUser['user'];

  next();
};
