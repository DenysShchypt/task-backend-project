import Joi from "joi";
import { Schema, model } from "mongoose";

const cardSchema = new Schema({})

const Card = model('card', cardSchema);

export default Card;


