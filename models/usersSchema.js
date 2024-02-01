import Joi from "joi";
import { Schema, model } from "mongoose";

const emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: ""
    },
    avatarURL: {
        type: String,
        required: [true, 'avatarURL is required']
    },
    theme: enum[]
}, { versionKey: false, timestamps: true })
const User = model('user', userSchema)
export default User;