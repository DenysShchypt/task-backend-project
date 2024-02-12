import { Schema, model } from "mongoose";

const sessionSchema = new Schema(
  {
    uid: Schema.Types.ObjectId,
  },
  { versionKey: false }
);

const Session = model("session", sessionSchema);

export default Session;
