import express from "express";
import { authenticate, upload } from "../../middlewares/index.js";

import {
  changeTheme,
  needHelps,
  updateAvatar,
  updateProfile,
} from "../../controllers/users/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userUpdProfileSchema,
  userUpdateThemeSchema,
} from "../../models/usersSchema.js";

const usersRouter = express.Router();

usersRouter.use(authenticate);

usersRouter.patch("/avatar", upload.single("avatar"), updateAvatar);
usersRouter.patch(
  "/profile",
  validateBody(userUpdProfileSchema),
  updateProfile
);

usersRouter.post("/", needHelps);

usersRouter.patch(
  "/change-theme",
  validateBody(userUpdateThemeSchema),
  changeTheme
);

export default usersRouter;
