import { Board, Column } from '../../models/index.js';
import { HttpError } from "../../helpers/index.js"
import { ctrlWrapper } from "../../decorators/index.js";

const addColumn = async (req, res) => {
    const { _id: owner } = req.user;
    const { boardId } = req.body;

    // перевірка boardId на належність користувачу 
    const haveBoard = await Board.findOne({ _id: boardId, owner });
    if (!haveBoard) {
        throw HttpError(400, `Board not valid`)
    };

    // додаємо колонку
    const add = await Column.create({ ...req.body, owner });

    res.status(201).json(add)
}

export default ctrlWrapper(addColumn);