import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { cardAddSchema, cardUpdateSchema } from '../../schemas/cards-schemas.js';
import { authenticate, isValidId, isEmptyBody } from '../../middlewares/index.js';


const cardsRouter = express.Router();
cardsRouter.use(authenticate);

cardsRouter.post("/", isEmptyBody, validateBody(cardAddSchema), cardsController.addCard);