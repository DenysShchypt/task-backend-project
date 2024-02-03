import Column from "../../models/columnsSchema.js"
import { HttpError } from "../../helpers/index.js"

const patchColumn = async (req, res) => {

    const { body, params: { columnId: _id } } = req;
    const { _id: owner } = req.user;

    const update = await Column.findOneAndUpdate({ _id, owner }, body);

  if (!update) {
    throw HttpError(404, `columns with id=${_id} not found!`)
  }
    res.json(update);
};

export default patchColumn;