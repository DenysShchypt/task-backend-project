import { HttpError } from "../helpers/index.js";
const validateBody = schema => {
    // Створюємо функцію обгортку
    const fun = async (req, res, next) => {
        // Достаємо error з req.body
        const { error } = schema.validate(req.body);
        // Перевіряємо на помилку
        if (error) {
            // Шукати далі  Middleware обробник помилок 
            return next(HttpError(400, error.message))
        }
        next()
    }
    // Повертаємо функцію якщо не виникло помилок
    return fun;
};
export default validateBody;