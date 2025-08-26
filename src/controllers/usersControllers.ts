import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { RequestAndUser } from '../interfaces/RequestAndUser';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => User
  .find({})
  .then((users) => res.send({ data: users }))
  .catch(next);

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    if ((error as Error).name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    next(error);
  }
};

export const updateUserInfo = async (req: RequestAndUser, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user!;
    const { name, about } = req.body;
    const newUser = { name, about };
    const user = await User.findByIdAndUpdate(_id, newUser, { new: true, runValidators: true });
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.status(200).send(user);
  } catch (error) {
    if ((error as Error).name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    next(error);
  }
};

export const updateUserAvatar = async (req: RequestAndUser, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user!;
    const { avatar } = req.body;
    const newUser = { avatar };
    const user = await User.findByIdAndUpdate(_id, newUser, { new: true, runValidators: true });
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.status(200).send(user);
  } catch (error) {
    if ((error as Error).name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    next(error);
  }
};
