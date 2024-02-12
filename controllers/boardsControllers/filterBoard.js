import { ctrlWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";
import { Board } from "../../models/index.js";

const filterBoard = async (req, res) => {
    const { _id: owner } = req.user;
    const { boardId: _id } = req.params;
    const { filter } = req.body;
    const result = await Board.findOneAndUpdate({ _id, owner }, { filter }, { new: true });
    if (!result) {
        throw HttpError(404, `Board not found`);
    }
    res.json({ message: "Successful operation", filter: result.filter });

}

export default ctrlWrapper(filterBoard)