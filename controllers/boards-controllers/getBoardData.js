import { ctrlWrapper } from "../../decorators/index.js";
import { Board } from "../../models/index.js";

const getBoardData = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardID: _id } = req.params;

  const result = await Board.findOne({ _id, owner });

  res.json(result);
};

export default ctrlWrapper(getBoardData);
