import { Router } from 'express';
import userRouter from './routes/userRouter';
import cardRouter from './routes/cardRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

export default router;
