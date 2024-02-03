import Column from "../../models/columnsSchema.js"
import { HttpError } from "../../helpers/index.js"

const deleteColumn = async (req, res) => {
    const { params: { columnId: _id } } = req;
    const { _id: owner } = req.user;
    
    // додати видалення карток підвязаних до ід колонки

    const remove = await Column.findOneAndDelete({ _id, owner })
    if (!remove) {
        throw HttpError(404, `column with id=${_id} not found!`)
    };

    res.json(remove)
};

export default deleteColumn;
