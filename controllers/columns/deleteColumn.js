import { Card, Column } from "../../models/index.js"
import { HttpError } from "../../helpers/index.js"
import { ctrlWrapper } from "../../decorators/index.js";

const deleteColumn = async (req, res) => {
    const { params: { id: _id } } = req;
    const { _id: owner } = req.user;

    // перевірка чи існує колонка
    const existColumn = await Column.findById(_id);
    if (!existColumn) {
        throw HttpError(404, `Column Not Found`)
    };

    // видалення колонки
    const remove = await Column.findOneAndDelete({ _id, owner })
    if (!remove) {
        throw HttpError(403, `No access to data`)
    };

    // видалення карток підвязаних до ід колонки
    await Card.deleteMany({ columnId: _id, owner });

    res.status(204).json({ message: "Successful operation" })
};

export default ctrlWrapper(deleteColumn);
