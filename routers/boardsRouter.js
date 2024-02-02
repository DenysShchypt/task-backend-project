import express from "express";
import { validateBody } from "../decorators/index.js";
import { addBoardSchema } from "../models/boardsSchema.js";
import * as boardController from "../controllers/boards-controllers/index.js";

const boardsRouter = express.Router();

boardsRouter.get("/", boardController.getAllUserBoards);

boardsRouter.post("/", validateBody(addBoardSchema), boardController.addBoard);

export default boardsRouter;
