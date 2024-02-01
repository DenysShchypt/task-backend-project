import Joi from "joi";
import { Schema, model } from "mongoose";

const boardSchema = new Schema({

}, { versionKey: false, timestamps: true });

const Board = model('board', boardSchema);

export default Board;

