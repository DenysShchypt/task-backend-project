import express from "express";
import authController from "../../controllers/authController.js";
import { validateBody } from "../../decorators/index.js";
import { userSignupSchema } from "../../schemes/user-schema.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignupSchema),
  authController.signup
);

export default authRouter;
