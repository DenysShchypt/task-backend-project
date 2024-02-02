import Joi, { string } from "joi";
import { Schema, model } from "mongoose";
import { backgroundNames, iconsNames } from "../properties/index.js";

//MONGOOSE
const boardSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title cannot be empty"],
    },
    background: {
      type: String,
      enum: [...backgroundNames],
      default: "default",
    },
    icon: {
      type: String,
      enum: [...iconsNames],
      default: "default",
    },
  },
  { versionKey: false, timestamps: true }
);
//JOI

export const addBoardSchema = Joi.object({
  title: Joi.string().required(),
  background: Joi.string().valid(...backgroundNames),
  icon: Joi.string().valid(...iconsNames),
});
const Board = model("board", boardSchema);

export default Board;
