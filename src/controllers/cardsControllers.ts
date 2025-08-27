import { Request, Response, NextFunction } from 'express';
import { Card } from '../models';
import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import { RequestAndUser } from '../interfaces/RequestAndUser';

export const getAllCards = async (req: Request, res: Response, next: NextFunction) => Card
  .find({})
  .then((card) => res.send({ data: card }))
  .catch(next);

export const createCard = async (req: RequestAndUser, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user!;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: _id });
    res.status(201).send(card);
  } catch (error) {
    if ((error as Error).name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      return;
    }
    next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findOneAndDelete({ _id: cardId });
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    res.status(200).send(card);
  } catch (error) {
    next(error);
  }
};

export const likeCard = async (req: RequestAndUser, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user!;
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: _id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.status(200).send(card);
  } catch (error) {
    if ((error as Error).name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка'));
      return;
    }
    next(error);
  }
};

export const dislikeCard = async (req: RequestAndUser, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user!;
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: _id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.status(200).send(card);
  } catch (error) {
    if ((error as Error).name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка'));
      return;
    }
    next(error);
  }
};
