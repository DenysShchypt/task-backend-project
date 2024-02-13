import { handleSaveError } from "../hooks/index.js";

import { Schema, model } from "mongoose";

const sessionSchema = new Schema(
  {
    uid: Schema.Types.ObjectId,
  },
  { versionKey: false }
);

sessionSchema.post("save", handleSaveError);

const Session = model("session", sessionSchema);

export default Session;
