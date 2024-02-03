import express from "express";
import { authenticate, upload } from "../../middlewares/index.js";

import { updProfile } from "../../controllers/users/index.js";

const usersRouter = express.Router();

usersRouter.patch(
  "/profiles",
  authenticate,
  upload.single("avatar"),
  updProfile
);

export default usersRouter;
