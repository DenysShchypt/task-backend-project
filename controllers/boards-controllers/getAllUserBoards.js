import { ctrlWrapper } from "../../decorators/index.js";
import { Board } from "../../models/index.js";

const getAllUserBoards = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Board.find({ owner });

  res.json(result);
};

export default ctrlWrapper(getAllUserBoards);
