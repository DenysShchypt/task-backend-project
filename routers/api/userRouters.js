import express from "express";
import { authenticate, upload } from "../../middlewares/index.js";

import {
  changeTheme,
  needHelps,
  updProfile,
  updavatar,
} from "../../controllers/users/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userUpdProfileSchema,
  userUpdateThemeSchema,
} from "../../models/usersSchema.js";
const usersRouter = express.Router();

usersRouter.use(authenticate);

// app.use(express.urlencoded({ extended: true }));
usersRouter.patch("/avatar", upload.single("avatar"), updavatar);
usersRouter.patch("/profile", validateBody(userUpdProfileSchema), updProfile);

usersRouter.post("/", needHelps);

usersRouter.patch(
  "/change-theme",
  validateBody(userUpdateThemeSchema),
  changeTheme
);

export default usersRouter;
