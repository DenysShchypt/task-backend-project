import Card from '../../models/cardSchema.js';

const addCard = async (req, res) => {
    const {id: column} = req.params;

    const result = await Card.create({...req.body, column});
    res.status(201).json(result);
}

export default addCard;