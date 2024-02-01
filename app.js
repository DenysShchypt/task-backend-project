import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
// Додавання данних з env змінні оточення process.env
dotenv.config();
const app = express();//web-server 

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// Middleware для логування
app.use(logger(formatsLogger))
// Middleware for CORS questions
app.use(cors());
// Middleware для обробки тіла запиту(req.body) по заголовку Content-type в форматі json (application/json);
app.use(express.json());
// Middleware звідки брати файли коли прийде запит на файли які можна віддавати
app.use(express.static("public"));
// Обробка запитів на API за допомогою маршрутів

// Middleware для невірного запиту
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
});
// next(error)=>Обробник помилок error. це middleware з 4ма параметрами
app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});
export default app;