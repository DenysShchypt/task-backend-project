import Joi from "joi";
import { Schema, model } from "mongoose";

const columnSchema = new Schema({})

const Column = model('column', columnSchema);

export default Column;