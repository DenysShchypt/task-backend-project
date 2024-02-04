import express from 'express';
import * as cardsController from '../../controllers/cards/index.js';
import { validateBody } from '../../decorators/index.js';
import { cardAddSchema, cardUpdateSchema } from '../../models/cardSchema.js';
import { authenticate, isValidId, isEmptyBody } from '../../middlewares/index.js';

const cardsRouter = express.Router();
cardsRouter.use(authenticate);

cardsRouter.post("/", isEmptyBody, validateBody(cardAddSchema), cardsController.addCard);
cardsRouter.delete("/:id", isValidId, cardsController.deleteCard);
cardsRouter.patch("/:id", isValidId, validateBody(cardUpdateSchema), cardsController.updateCard);

export default cardsRouter;