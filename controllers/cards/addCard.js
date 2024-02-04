import { ctrlWrapper } from "../../decorators/index.js";
import Card from "../../models/cardSchema.js";

const addCard = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Card.create({ ...req.body, owner });
  res.status(201).json(result);
};

export default ctrlWrapper(addCard);
