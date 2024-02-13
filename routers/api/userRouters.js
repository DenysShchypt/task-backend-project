import express from "express";
import { authenticate, upload } from "../../middlewares/index.js";

import {
  changeTheme,
  deleteUser,
  getCurrentUser,
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

usersRouter.post("/current-user", getCurrentUser);

usersRouter.patch("/avatar", upload.single("avatar"), updateAvatar);
usersRouter.patch(
  "/profile",
  validateBody(userUpdProfileSchema),
  updateProfile
);
usersRouter.patch(
  "/change-theme",
  validateBody(userUpdateThemeSchema),
  changeTheme
);
usersRouter.post("/help", needHelps);

usersRouter.delete("/delete-user", deleteUser);

export default usersRouter;
