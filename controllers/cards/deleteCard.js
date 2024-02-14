import { ctrlWrapper } from '../../decorators/index.js';
import Card from '../../models/cardSchema.js';
import { HttpError } from '../../helpers/index.js';

const deleteCard = async (req, res) => {
    const { id } = req.params;

    const result = await Card.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, `Card Not Found`);
    }
    res.status(204).json({ message: "Successful operation" });
}

export default ctrlWrapper(deleteCard);