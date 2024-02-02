import { ctrlWrapper } from '../../decorators/index.js';

import addCard from './addCard.js';
import deleteCard from './deleteCard.js';
import updateCard from './updateCard.js';

export default {
    addCard: ctrlWrapper(addCard),
    deleteCard: ctrlWrapper(deleteCard),
    updateCard: ctrlWrapper(updateCard)
}