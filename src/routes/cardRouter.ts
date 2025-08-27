import { Router } from 'express';

import {
  likeCard,
  deleteCard,
  createCard,
  getAllCards,
  dislikeCard,
} from '../controllers/cardsControllers';
import { cardIdValidator, cardValidator } from '../middlewares/validators';

const cardRouter = Router();

cardRouter.get('/', getAllCards);
cardRouter.post('/', cardValidator, createCard);
cardRouter.delete('/:cardId', cardIdValidator, deleteCard);
cardRouter.put('/:cardId/likes', cardIdValidator, likeCard);
cardRouter.delete('/:cardId/likes', cardIdValidator, dislikeCard);

export default cardRouter;
