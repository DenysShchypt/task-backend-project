import express from "express";
import { validateBody } from "../../decorators/index.js";
import {
  addBoardSchema,
  updateBoardSchema,
} from "../../models/boardsSchema.js";
import * as boardController from "../../controllers/boards-controllers/index.js";

import { authenticate } from "../../middlewares/index.js";

const boardsRouter = express.Router();

boardsRouter.use(authenticate);

boardsRouter.get("/", boardController.getAllUserBoards);

boardsRouter.get("/:boardID", boardController.getBoardData);

boardsRouter.post("/", validateBody(addBoardSchema), boardController.addBoard);

boardsRouter.put(
  "/:boardID",
  validateBody(updateBoardSchema),
  boardController.updateBoard
);

boardsRouter.delete("/:boardID", boardController.deleteBoard);

export default boardsRouter;