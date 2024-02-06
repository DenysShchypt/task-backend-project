import Joi from "joi";
import { Schema, model } from "mongoose";
import { backgroundNames, iconsNames } from "../properties/index.js";
import { handleSaveError, setUpdateOptions } from "../hooks/index.js";

//MONGOOSE
const boardSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    titleBoard: {
      type: String,
      required: [true, "Title cannot be empty"],
    },
    background: {
      type: String,
      enum: {
        values: backgroundNames,
        message: `Background value must be in list ${backgroundNames}`,
      },
      default: "default",
    },
    icon: {
      type: String,
      enum: {
        values: iconsNames,
        message: `Icon value must be in list ${iconsNames}`,
      },
      default: "default",
    },
  },
  { versionKey: false, timestamps: true }
);
boardSchema.post("save", handleSaveError);

boardSchema.pre("findOneAndUpdate", setUpdateOptions);
//JOI

export const addBoardSchema = Joi.object({
  titleBoard: Joi.string().required(),
  background: Joi.string().valid(...backgroundNames),
  icon: Joi.string().valid(...iconsNames),
});
export const updateBoardSchema = Joi.object({
  titleBoard: Joi.string(),
  background: Joi.string().valid(...backgroundNames),
  icon: Joi.string().valid(...iconsNames),
});
const Board = model("board", boardSchema);

export default Board;
