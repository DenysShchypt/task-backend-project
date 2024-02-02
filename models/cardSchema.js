import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError } from "./ hooks.js";

const cardSchema = new Schema({
    title: {
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
    column: {
        type: Schema.Types.ObjectId,
        ref: 'column',
        required: true,
    },
}, { versionKey: false, timestamps: true });

cardSchema.post('save', handleSaveError);

const Card = model('card', cardSchema);

export default Card;


