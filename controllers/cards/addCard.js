import {ctrlWrapper} from '../../decorators/index.js';   
import Card from '../../models/cardSchema.js';

const addCard = async (req, res) => {
    const {columnId} = req.body;

    const result = await Card.create({...req.body});
    res.status(201).json(result);
}

export default ctrlWrapper(addCard);

