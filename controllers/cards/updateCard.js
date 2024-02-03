import { ctrlWrapper } from "../../decorators/index.js";
import Card from '../../models/cardSchema.js';
import { HttpError } from '../../helpers/index.js';


const updateCard = async (req, res) => {
    const { id } = req.params;

    const result = await Card.findByIdAndUpdate( id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Card id=${id} not found`);
    }

    res.status(200).json(result);
}

export default ctrlWrapper(updateCard);