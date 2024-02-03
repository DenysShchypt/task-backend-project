import { ctrlWrapper } from "../../decorators/index.js";
import { Column } from "../../models/index.js";

const getBoardData = async (req, res) => {
  const { _id: owner } = req.user;
  const { boardID: _id } = req.params;

  const result = await Column.find({
    _id,
    owner,
    $lookup: {
      from: "cards",
      localField: "cardId",
      foreignField: "_id",
      as: "cards",
    },
  });

  res.json(result);
};

export default ctrlWrapper(getBoardData);
