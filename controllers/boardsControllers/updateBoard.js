import { ctrlWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";
import { Board } from "../../models/index.js";

const updateBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardId: _id } = req.params;

  const result = await Board.findOneAndUpdate({ _id, owner }, { ...req.body });
  if (!result) {
    throw HttpError(404, `Board not found`);
  }

  res.json(result);
};

export default ctrlWrapper(updateBoard);
