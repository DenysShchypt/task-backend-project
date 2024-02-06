import mongoose from "mongoose";
import { ctrlWrapper } from "../../decorators/index.js";
import { Board, Column } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const getBoardData = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardId } = req.params;

  const board = await Board.findOne({ _id: boardId, owner });

  if (!board) {
    throw HttpError(404, `Board with id: ${_id} not found`);
  }

  const result = await Column.aggregate([
    {
      $match: {
        boardId: new mongoose.Types.ObjectId(boardId),
        owner: new mongoose.Types.ObjectId(owner),
      },
    },
    {
      $lookup: {
        from: "cards",
        localField: "_id",
        foreignField: "columnId",
        as: "cards",
      },
    },
  ]);

  res.json({
    board: board,
    columns: result,
  });
};

export default ctrlWrapper(getBoardData);
