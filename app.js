import express from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
import "dotenv/config";
import {
  authRouter,
  boardsRouter,
  cardsRouter,
  columnsRouter,
  usersRouter,
} from "./routers/api/index.js";

const swaggerDocument = JSON.parse(
  await readFile(new URL("./swagger.json", import.meta.url))
);

const app = express(); //web-server
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// Middleware для логування
app.use(logger(formatsLogger));


// Middleware for CORS questions
app.use(cors());
// Middleware для обробки тіла запиту(req.body) по заголовку Content-type в форматі json (application/json);
app.use(express.json());
app.use("/link", (req, res) => {
  res.sendFile(path.resolve("link.html"));
});
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
