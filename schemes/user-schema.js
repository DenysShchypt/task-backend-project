import Joi from "joi";
import { emailRegexp } from "../models/usersSchema.js";

export const userSignupSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name не повинен бути порожнім",
    "any.required": "missed required name field",
  }),

  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.empty": "email не повинен бути порожнім",
    "any.required": "missed required email field",
  }),
  password: Joi.string().min(4).required().messages({
    "string.empty": "password не повинен бути порожнім",
    "any.required": "missed required password field",
  }),
});
