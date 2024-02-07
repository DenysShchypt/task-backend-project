import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
    // Отримуємо масив ключів length
    const { length } = Object.keys(req.body);
    // Перевіряємо на наявність ключів
    if (!length) {
        // Якщо помилка, то переходимо в app обробник помилок з 4ма прарметрами
        return next(HttpError(400, "Missing field"))
    }
    next()
};

export default isEmptyBody;