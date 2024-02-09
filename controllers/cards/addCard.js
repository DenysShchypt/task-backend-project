import { ctrlWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";
import { Column, Card } from "../../models/index.js";

const addCard = async (req, res) => {
  const { _id: owner } = req.user;
  const { columnId } = req.body;

  // перевірка columnId - чи існує та чи належить користувачу
  const haveColumn = await Column.findOne({ _id: columnId, owner });
  if (!haveColumn) {
        throw HttpError(400, `Column not valid`)
  };

  const result = await Card.create({ ...req.body, owner });
  res.status(201).json(result);
};

export default ctrlWrapper(addCard);
