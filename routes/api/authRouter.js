import express from "express";
import authController from "../../controllers/authController.js";
import { validateBody } from "../../decorators/index.js";
import { userSignupSchema } from "../../schemes/user-schema.js";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";
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
  validateBody(userSignupSchema),
  authController.signin
);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
