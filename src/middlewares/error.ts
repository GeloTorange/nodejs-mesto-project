import { Request, Response } from 'express';

export default (err: { status: number, message: string }, req: Request, res: Response) => {
  const { status = 500, message } = err;

  res
    .status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};
