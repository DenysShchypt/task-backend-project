import { ctrlWrapper } from "../../decorators/index.js";
import { Board } from "../../models/index.js";

const deleteBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardID: _id } = req.params;

  await Board.findOneAndDelete({ _id, owner });
  res.status(204).json({ message: "Board delete success" });
};

export default ctrlWrapper(deleteBoard);
