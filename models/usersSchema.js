import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateOptions } from "../hooks/index.js";

const emailRegexp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const themeList = ["dark", "light", "violet"];

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
      enum: themeList,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.pre("findOneAndUpdate", setUpdateOptions);
userSchema.post("save", handleSaveError);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateOptions);
userSchema.post("findOneAndUpdate", handleSaveError);

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

export const userUpdateTheme = Joi.object({
  theme: Joi.string()
    .valid(...themeList)
    .required(),
});

const User = model("user", userSchema);

export default User;
