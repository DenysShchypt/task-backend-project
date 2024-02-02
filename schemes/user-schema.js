import Joi from "joi";
import { emailRegexp } from "../models/usersSchema.js";

export const userSignupSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name must not be empty",
    "any.required": "missed required name field",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "email must not be empty",
    "any.required": "missed required email field",
    "string.email": "Invalid email format",
  }),

  password: Joi.string().min(4).required().messages({
    "string.empty": "password must not be empty",
    "any.required": "missed required password field",
  }),
});

export const userSigninSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name must not be empty",
    "any.required": "missed required name field",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "email must not be empty",
    "any.required": "missed required email field",
    "string.email": "Invalid email format",
  }),

  password: Joi.string().min(4).required().messages({
    "string.empty": "password must not be empty",
    "any.required": "missed required password field",
  }),
});
