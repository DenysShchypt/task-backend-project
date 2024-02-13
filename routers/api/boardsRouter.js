import express from "express";
import { validateBody } from "../../decorators/index.js";
import {
  addBoardSchema,
  updateBoardSchema,
} from "../../models/boardsSchema.js";
import * as boardController from "../../controllers/boardsControllers/index.js";

import { authenticate } from "../../middlewares/index.js";

const boardsRouter = express.Router();

boardsRouter.use(authenticate);

boardsRouter.get("/", boardController.getAllUserBoards);

boardsRouter.get("/:boardId", boardController.getBoardData);

boardsRouter.post("/", validateBody(addBoardSchema), boardController.addBoard);

boardsRouter.put(
  "/:boardId",
  validateBody(updateBoardSchema),
  boardController.updateBoard
);

boardsRouter.delete("/:boardId", boardController.deleteBoard);

export default boardsRouter;
