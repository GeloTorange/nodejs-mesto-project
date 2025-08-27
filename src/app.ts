import express from 'express';
import mongoose from 'mongoose';
import router from './router';
import { createUser, login } from './controllers/usersControllers';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import error from './middlewares/error';
import { loginValidator, userValidator } from './middlewares/validators';

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (err) {
    process.exit(1);
  }
};

connectToDb();

app.use(requestLogger);

app.post('/signin', loginValidator, login);
app.post('/signup', userValidator, createUser);

app.use(auth);

app.use('/', router);

app.use(errorLogger);

app.use(error);

app.listen(PORT);
