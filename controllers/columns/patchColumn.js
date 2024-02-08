import Column from "../../models/columnsSchema.js"
import { HttpError } from "../../helpers/index.js"
import { ctrlWrapper } from "../../decorators/index.js";

const patchColumn = async (req, res) => {

    const { body, params: { id: _id } } = req;
    const { _id: owner } = req.user;

    const update = await Column.findOneAndUpdate({ _id, owner }, body);

  if (!update) {
    throw HttpError(404, `Column Not Found`)
  }
    res.json(update);
};

export default ctrlWrapper(patchColumn);