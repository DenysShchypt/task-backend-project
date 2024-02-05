import { isValidObjectId } from 'mongoose';
import Board from '../../models/boardsSchema.js';
import Column from "../../models/columnsSchema.js"
import { HttpError } from "../../helpers/index.js"

const addColumn = async (req, res) => {
    const { _id: owner } = req.user;
 
    // перевірка boardId на валідність ід   
    const { boardId } = req.body;
    if (!isValidObjectId(boardId)) {
        throw HttpError(404, `board id=${_id} not valid!`)
    };

    // перевірка boardId на належність користувачу 
    const haveBoard = Board.findOne({_id: boardId, owner})
    if (!haveBoard) {
        throw HttpError(404, `board id=${_id} not found!`)
    };

    // додаємо колонку
    const add = await Column.create({ ...req.body, owner });

    res.status(201).json(add)
}

export default addColumn;