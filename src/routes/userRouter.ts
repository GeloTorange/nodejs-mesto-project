import { Router } from 'express';

import {
  getAllUsers,
  getUser,
  createUser,
  updateUserAvatar,
  updateUserInfo,
} from '../controllers/usersControllers';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);

export default userRouter;
