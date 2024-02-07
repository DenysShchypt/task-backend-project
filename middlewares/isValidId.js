import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';
// Middleware для перевірки id
const isValidId = async (req, res, next) => {
    const { id } = req.params;
    // Перевіряємо чи може значення бути id
    if (!isValidObjectId(id)) {
        return next(HttpError(400, `Not valid id: ${id}`))
    };
    next();
};

export default isValidId;