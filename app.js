import express from "express";
import logger from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import path from "path";
import dotenv from "dotenv";
import { boardsRouter } from "./routes/api/index.js";
// Додавання данних з env змінні оточення process.env
dotenv.config();

const swaggerDocument = path.resolve("swagger", "api.json");
const app = express(); //web-server
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// Middleware для логування
app.use(logger(formatsLogger));
// Middleware for CORS questions
app.use(cors());
// Middleware для обробки тіла запиту(req.body) по заголовку Content-type в форматі json (application/json);
app.use(express.json());
// Middleware звідки брати файли коли прийде запит на файли які можна віддавати
app.use(express.static("public"));
// Обробка запитів на API за допомогою маршрутів
//app.use("/api/auth", authRouter);
app.use("/api/boards", boardsRouter);
//app.use("/api/columns", columnsRouter);
//app.use("/api/cards", cardsRouter);
app.use("/api/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// Middleware для невірного запиту
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
// next(error)=>Обробник помилок error. це middleware з 4ма параметрами
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
export default app;
