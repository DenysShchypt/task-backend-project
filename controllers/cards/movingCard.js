import { ctrlWrapper } from "../../decorators/index.js";
import { Card, Column } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';


const movingCard = async (req, res) => {
    const { body: { columnId }, params: { id: _id } } = req;
    const { _id: owner } = req.user;

    // перевіряєм чи є колонка з ід, до якої переносимо картку 
    const existColumn = await Column.findById(columnId);
    if (!existColumn) {
        throw HttpError(404, `Column Not Found`);
    }

    // прописуємо в картку ід нової колонки 
    const result = await Card.findOneAndUpdate({ _id, owner }, req.body, { new: true });
    if (!result) {
        throw HttpError(404, `Card Not Found`);
    }

    res.status(200).json(result);
}

export default ctrlWrapper(movingCard);