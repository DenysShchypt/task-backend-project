import Column from "../../models/columnsSchema.js"
import { HttpError } from "../../helpers/index.js"

const addColumn = async (req, res) => {
    const { _id: owner } = req.user;
  
    // перевірка body.boardId ;  
    // const haveBoard = Board.findOne({body.boardId})
    // if (!haveBoard) {
    //     throw HttpError(400, "id board not send")
    // };

    const add = await Column.create({ ...req.body, owner });

    res.status(201).json(add)
}

export default addColumn;