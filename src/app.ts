import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import router from './router';
import { RequestAndUser } from './interfaces/RequestAndUser';

const PORT = 3000;

const app = express();
app.use(express.json());

const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (err) {
    process.exit(1);
  }
};

connectToDb();

app.use((req: RequestAndUser, res: Response, next: NextFunction) => {
  req.user = {
    _id: '68ac8e8d97cd1d7e23e99d09',
  };

  next();
});

app.use('/', router);

app.use((err: { status: number, message: string }, req: Request, res: Response) => {
  const { status = 500, message } = err;

  res
    .status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
