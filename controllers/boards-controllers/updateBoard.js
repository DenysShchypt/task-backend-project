import { ctrlWrapper } from "../../decorators/index.js";
import { Board } from "../../models/index.js";

const updateBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardID: _id } = req.params;

  const result = await Board.findOneAndUpdate({ _id, owner }, { ...req.body });

  res.json(result);
};

export default ctrlWrapper(updateBoard);
