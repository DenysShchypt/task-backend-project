import { ctrlWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";
import { Board, Card, Column } from "../../models/index.js";

const deleteBoard = async (req, res) => {
  // const { _id: owner } = req.user;
  // const { boardId: _id } = req.params;

  // const result = await Board.findOneAndDelete({ _id, owner });
  // if (!result) {
  //   throw HttpError(404, `Board with id: ${_id} not found`);
  // }

  // ***
  const { _id: owner } = req.user;
  const { boardId } = req.params;

  const board = await Board.findById(boardId);

  if (board.owner.toString() !== owner.toString()) {
    throw HttpError(403, "Access denied");
  }

  await Card.deleteMany({ columnId: { $in: board.columns } });
  await Column.deleteMany({ boardId });

  const result = await Board.findOneAndDelete({ _id: boardId, owner });

  if (!result) {
    throw HttpError(404, `Board with id: ${boardId} not found`);
  }

  res.json({ message: "Board delete success" });
};

export default ctrlWrapper(deleteBoard);
