import express from "express";
import { validateBody } from "../decorators/index.js";
import { addBoardSchema, updateBoardSchema } from "../models/boardsSchema.js";
import * as boardController from "../controllers/boards-controllers/index.js";

const boardsRouter = express.Router();

boardsRouter.get("/", boardController.getAllUserBoards);

boardsRouter.get("/:boardID", boardController.getBoardData);

boardsRouter.post("/", validateBody(addBoardSchema), boardController.addBoard);

boardsRouter.put(
  "/:boardID",
  validateBody(updateBoardSchema),
  boardController.updateBoardSchema
);

export default boardsRouter;
