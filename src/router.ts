import { Router } from 'express';
import userRouter from './routes/userRouter';
import cardRouter from './routes/cardRouter';
import NotFoundError from './errors/NotFoundError';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

export default router;
