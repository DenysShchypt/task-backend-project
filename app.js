import express from "express";
import logger from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
import dotenv from "dotenv";
import {
  authRouter,
  boardsRouter,
  cardsRouter,
  columnsRouter,
  usersRouter,
} from "./routers/api/index.js";
import swaggerDocument from './swagger.json'
// const swaggerDocument = JSON.parse(
//   await readFile(new URL("./swagger.json", import.meta.url))
// );
// const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'docs.yaml'));

// Додавання данних з env змінні оточення process.env
dotenv.config();

const app = express(); //web-server
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// app.use("/link", (req, res) => {
//   res.sendFile(path.resolve("public", "link.html"));
// });
// Middleware для логування
app.use(logger(formatsLogger));
// Middleware for CORS questions
app.use(cors());
// Middleware для обробки тіла запиту(req.body) по заголовку Content-type в форматі json (application/json);
app.use(express.json());
// Обробка запитів на API за допомогою маршрутів
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/support", usersRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/cards", cardsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
