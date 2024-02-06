import { ctrlWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";
import { Board } from "../../models/index.js";

const deleteBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardId: _id } = req.params;

  const result = await Board.findOneAndDelete({ _id, owner });
  if (!result) {
    throw HttpError(404, `Board with id: ${_id} not found`);
  }

  res.status(204).json({ message: "Board delete success" });
};

export default ctrlWrapper(deleteBoard);
