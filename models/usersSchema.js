import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateOptions } from "../hooks/index.js";

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      default: "dark",
    },
    googleId: String,
    // cards: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "card",
    //   },
    // ],
    // columns: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "column",
    //   },
    // ],
  },
  { versionKey: false, timestamps: true }
);
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

export const userUpdateThemeSchema = Joi.object({
  theme: Joi.string()
    .valid(...themeList)
    .required(),
});

export const userRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const userUpdProfileSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(4),
});

const User = model("user", userSchema);

export default User;
