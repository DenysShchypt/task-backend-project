import Joi from "joi";
import { Schema, model } from "mongoose";

const columnSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    boardId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "board",
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    }
}, {
    versionKey: false,
    timestamp: true,
})

export const schemaAddColumn = Joi.object({
    title: Joi.string().required().min(1).max(50),
    boardId: Joi.string().required(),
})

export const schemaUpdateColumn = Joi.object({
    title: Joi.string().min(1).max(50),
})

const Column = model('column', columnSchema);

export default Column;