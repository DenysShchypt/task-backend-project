import { ctrlWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";
import { Board, Card, Column } from "../../models/index.js";

const deleteBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardId } = req.params;

  const board = await Board.findById(boardId);

  if (!board) {
    throw HttpError(404, `Board not found`);
  }

  await Card.deleteMany({ boardId, owner });
  await Column.deleteMany({ boardId, owner });
  await Board.deleteOne({ _id: boardId, owner });

  res.status(204).json({ message: "Successful operation" });
};

export default ctrlWrapper(deleteBoard);
