import multer from "multer";
import path from "path";
import { HttpError } from "../helpers/index.js";


const destination = path.resolve("temp");
// налаштування для middlewares перейменування
const storage = multer.diskStorage({
    // шлях до папки де будуть зберигатись тимчасові файли
    destination,
    // для перейменування файлу
    filename: (req, file, callback) => {
        // додавання унікальності файлу
        const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniqueSuffix}_${file.originalname}`
        callback(null, filename)
    }
});
// налаштування для middlewares size

const limits = {
    fileSize: 1024 * 1024 * 5,
};

// налаштування для middlewares filter чи можна зберігати файл

const fileFilter = (req, file, callback) => {
    const extention = file.originalname.split(".").pop();
    if (extention === "exe") {
        callback(HttpError(400, ".exe is not valid extention"))
    }
    callback(null, file)
};
// Middleware яка приймає запит з format.data, зберігає файл в папці time, в req.body записує текст
const upload = multer({
    storage,
    limits,
    fileFilter
});

export default upload;