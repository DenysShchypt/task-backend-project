import Joi from "joi";
import { Schema, model } from "mongoose";

export const emailRegexp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const emailSchema = Joi.string().email().required().messages({
  "string.empty": "email must not be empty",
  "any.required": "missed required email field",
  "string.email": "Invalid email format",
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "default",
    },
    theme: {
      type: String,
      enum: ["dark", "light", "violet"],
    },
  },
  { versionKey: false, timestamps: true }
);

export const userSignupSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name must not be empty",
    "any.required": "missed required name field",
  }),

  email: Joi.string().pattern(emailRegexp).required().messages({
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

  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.empty": "email must not be empty",
    "any.required": "missed required email field",
    "string.email": "Invalid email format",
  }),

  password: Joi.string().min(4).required().messages({
    "string.empty": "password must not be empty",
    "any.required": "missed required password field",
  }),
});

const User = model("user", userSchema);
export default User;
