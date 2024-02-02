import express from "express";
import authController from "../../controllers/authController.js";
import { validateBody } from "../../decorators/index.js";

import { authenticate, isEmptyBody } from "../../middlewares/index.js";
import {
  userSigninSchema,
  userSignupSchema,
} from "../../models/usersSchema.js";
const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
