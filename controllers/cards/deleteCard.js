import {ctrlWrapper} from '../../decorators/index.js';
import Card from '../../models/cardSchema.js';
import { HttpError } from '../../helpers/index.js';

const deleteCard = async (req, res) => {
    const {id} = req.params;

    const result = await Card.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, `Card with id: ${id} not found`);
    }
    res.status(204).json(result);
}

export default ctrlWrapper(deleteCard);