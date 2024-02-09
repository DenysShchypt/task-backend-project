import { isValidObjectId } from "mongoose";
import { Board, Column, User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const addColumn = async (req, res) => {
  const { _id: owner } = req.user;

  // перевірка boardId на валідність ід
  const { boardId } = req.body;
  if (!isValidObjectId(boardId)) {
    throw HttpError(400, `Board not valid`);
  }

  // перевірка boardId на належність користувачу
  const haveBoard = await Board.findOne({ _id: boardId, owner });
  if (!haveBoard) {
    throw HttpError(400, `BoardId not found`);
  }

  // додаємо колонку
  const add = await Column.create({ ...req.body, owner });
  // const user = await User.findById(req.user._id);
  // user.columns.push(add._id);
  haveBoard.columns.push(add._id);
  await haveBoard.save();
  // await user.save();

  res.status(201).json(add);
};

export default ctrlWrapper(addColumn);
