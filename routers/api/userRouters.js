import express from "express";
import { authenticate, upload } from "../../middlewares/index.js";
import { needHelps, updateAvatar } from "../../controllers/users/index.js";

const usersRouter = express.Router();

usersRouter.patch(
  "/profiles",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

usersRouter.post("/", authenticate, needHelps);

export default usersRouter;
