import { Request } from 'express';

export interface RequestAndUser extends Request {
  user?: {
    _id: string;
  };
}
