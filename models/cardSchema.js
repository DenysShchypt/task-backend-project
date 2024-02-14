import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateOptions } from "../hooks/index.js";

const priorityCard = ["without", "low", "medium", "high"];

const cardSchema = new Schema(
  {
    titleCard: {
      type: String,
      required: [true, "Set title for card"],
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: priorityCard,
      default: "without",
    },
    deadline: {
      type: Date,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

cardSchema.post("save", handleSaveError);
cardSchema.pre("findOneAndUpdate", setUpdateOptions);

export const cardAddSchema = Joi.object({
  titleCard: Joi.string().required(),
  description: Joi.string().allow(""),
  priority: Joi.string().valid(...priorityCard),
  deadline: Joi.date().iso(),
  columnId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
}).messages({
  "string.pattern.base": `Column not valid`,
  "any.required": `Missing field {#label}`,
});

export const cardUpdateSchema = Joi.object({
  titleCard: Joi.string(),
  description: Joi.string().allow(""),
  priority: Joi.string().valid(...priorityCard),
  deadline: Joi.date().iso(),
});

export const cardPatchSchema = Joi.object({
  columnId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
}).messages({
  "string.pattern.base": `Column not valid`,
  "any.required": `Missing field {#label}`,
});

const Card = model("card", cardSchema);

export default Card;
