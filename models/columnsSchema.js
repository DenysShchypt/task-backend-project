import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateOptions } from "../hooks/index.js";

const columnSchema = new Schema({
    titleColumn: {
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
});

columnSchema.post("save", handleSaveError);

columnSchema.pre("findOneAndUpdate", setUpdateOptions);

export const schemaAddColumn = Joi.object({
    titleColumn: Joi.string().required().min(1).max(150).messages({
        "any.required": `the "title" field is missing`,
    }),
    boardId: Joi.string().required(),
});

export const schemaUpdateColumn = Joi.object({
    title: Joi.string().min(1).max(150),
});

const Column = model('column', columnSchema);

export default Column;