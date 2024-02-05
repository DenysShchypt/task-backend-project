import { ctrlWrapper } from "../../decorators/index.js";
import { Board } from "../../models/index.js";

const getAllUserBoards = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Board.find({ owner });

  if (!result) {
    res.json({ message: "You haven`t got any board" });
  }

  res.json(result);
};

export default ctrlWrapper(getAllUserBoards);
