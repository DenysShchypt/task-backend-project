import { isValidObjectId } from 'mongoose';
import { Board, Column } from '../../models/index.js';
import { HttpError } from "../../helpers/index.js"

const addColumn = async (req, res) => {
    const { _id: owner } = req.user;
 
    // перевірка boardId на валідність ід   
    const { boardId } = req.body;
    if (!isValidObjectId(boardId)) {
        throw HttpError(400, `boardId not valid!`);
    };

    // перевірка boardId на належність користувачу 
    const haveBoard = await Board.findOne({ _id: boardId, owner });
    if (!haveBoard) {
        throw HttpError(404, `board id=${boardId} not found!`)
    };

    // додаємо колонку
    const add = await Column.create({ ...req.body, owner });

    res.status(201).json(add)
}

export default addColumn;