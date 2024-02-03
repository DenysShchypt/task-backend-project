import Card from '../../models/cardSchema.js';

const addCard = async (req, res) => {
    const {id: columnId} = req.params;

    const result = await Card.create({...req.body, columnId});
    res.status(201).json(result);
}

export default addCard;