import express from "express";
import { authenticate, upload } from "../../middlewares/index.js";

import {
  changeTheme,
  needHelps,
  updProfile,
} from "../../controllers/users/index.js";
import { validateBody } from "../../decorators/index.js";
import { userUpdateTheme } from "../../models/usersSchema.js";

const usersRouter = express.Router();

usersRouter.use(authenticate);

usersRouter.patch("/profiles", upload.single("avatar"), updProfile);

usersRouter.post("/", needHelps);

usersRouter.patch("/change-theme", validateBody(userUpdateTheme), changeTheme);

export default usersRouter;
