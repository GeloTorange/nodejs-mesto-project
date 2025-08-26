import { Router } from 'express';

import {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} from '../controllers/cardsControllers';

const cardRouter = Router();

cardRouter.get('/', getAllCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;
