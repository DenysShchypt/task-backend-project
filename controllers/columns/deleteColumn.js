import Column from "../../models/columnsSchema.js"
import Card from '../../models/cardSchema.js';
import { HttpError } from "../../helpers/index.js"
import { ctrlWrapper } from "../../decorators/index.js";

const deleteColumn = async (req, res) => {
    const { params: { id: _id } } = req;
    const { _id: owner } = req.user;
    
    // видалення колонки
    const remove = await Column.findOneAndDelete({ _id, owner })
    if (!remove) {
        throw HttpError(404, `column with id=${_id} not found!`)
    };
    
    // видалення карток підвязаних до ід колонки
    await Card.deleteMany({ columnId: _id, owner });

    res.json(remove)
};

export default ctrlWrapper(deleteColumn);
