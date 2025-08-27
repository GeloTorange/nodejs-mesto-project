import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { MongoServerError } from 'mongodb';
import { User } from '../models';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import { RequestAndUser } from '../interfaces/RequestAndUser';
import DuplicateError from '../errors/DuplicateError';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => User
  .find({})
  .then((users) => res.send({ data: users }))
  .catch(next);

export const getUser = async (req: RequestAndUser, res: Response, next: NextFunction) => User
  .findOne({ _id: req.user?._id })
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(200).send(user);
  })
  .catch(next);

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
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
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash,
    });
    res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
  } catch (error) {
    if ((error as MongoServerError).code === 11000) {
      next(new DuplicateError('Такой email уже зарегистрирован'));
      return;
    }
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.authUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'super-secret', { expiresIn: 604800 });

    res.header('Authorization', `Bearer ${token}`).status(200).send({ token });
  } catch (error) {
    next(error);
  }
};
