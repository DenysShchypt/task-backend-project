import express from "express";

import { signup, signin, logout } from "../../controllers/auth/index.js";

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
  signup
);

authRouter.post("/login", isEmptyBody, validateBody(userSigninSchema), signin);

authRouter.post("/logout", authenticate, logout);

export default authRouter;
