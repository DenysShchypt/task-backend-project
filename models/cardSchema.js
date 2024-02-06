import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError } from "../hooks/index.js";

const cardSchema = new Schema({
    titleCard: {
        type: String,
        required: [true, 'Set title for card'],
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        enum: ["without", "low", "medium", "high"],
        default: "without",
    },
    deadline: {
        type: Date,
    },
    columnId: {
        type: Schema.Types.ObjectId,
        ref: 'column',
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

}, { versionKey: false, timestamps: true });

cardSchema.post('save', handleSaveError);

export const cardAddSchema = Joi.object({
    titleCard: Joi.string().required().messages({
        "any.required": `the "title" field is missing`,
    }),
    description: Joi.string().allow(''),
    priority: Joi.string().valid("without", "low", "medium", "high"),
    deadline: Joi.date().iso(),
    columnId: Joi.string().required().messages({
        "any.required": `the "column" field is missing`,
    }),
});

export const cardUpdateSchema = Joi.object({
    titleCard: Joi.string(),
    description: Joi.string().allow(''),
    priority: Joi.string().valid("without", "low", "medium", "high"),
    deadline: Joi.date().iso(),
});

const Card = model('card', cardSchema);

export default Card;


