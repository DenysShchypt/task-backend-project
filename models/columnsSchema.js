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
    timestamps: true,
});

columnSchema.post("save", handleSaveError);

columnSchema.pre("findOneAndUpdate", setUpdateOptions);

columnSchema.post("findOneAndUpdate", handleSaveError);

export const schemaAddColumn = Joi.object({
    titleColumn: Joi.string().required().min(1).max(150).messages({
        "any.required": `the 'titleColumn' field is missing`,
    }),
    boardId: Joi.string().required(),
});

export const schemaUpdateColumn = Joi.object({
    titleColumn: Joi.string().min(1).max(150),
});

const Column = model('column', columnSchema);

export default Column;