import { Router } from 'express';

import {
  getUser,
  getAllUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} from '../controllers/usersControllers';

import {
  userIdValidator,
  updateUserInfoValidator,
  updateUserAvatarValidator,
} from '../middlewares/validators';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/me', getUser);
userRouter.get('/:userId', userIdValidator, getUserById);
userRouter.patch('/me', updateUserInfoValidator, updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar);

export default userRouter;
