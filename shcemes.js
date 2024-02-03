import { Schema, model } from "mongoose";

// Схема користувача (User)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: [true, "avatarURL is required"],
    },
    theme: {
      type: String,
      enum: ["dark", "light", "violet"],
    },
  },
  { versionKey: false, timestamps: true }
);

// Схема дошки (Board)
const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: {
    type: String,
    enum: ["coub", "etc"],
  },
  backgroud: {
    type: String,
    enum: ["default", "etc"],
  },
  owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

// Схема колонки (Column)
const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: "board", required: true },
  owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

// Схема картки (Card)
const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: {
    type: String,
    enum: ["default", "low", "medium", "high"],
  },
  deadLine: { type: Date, required: true },
  column: {
    type: Schema.Types.ObjectId,
    ref: "column",
    required: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

// Модель користувача (User)
const User = mongoose.model("User", userSchema);

// Модель дошки (Board)
const Board = mongoose.model("Board", boardSchema);

// Модель колонки (Column)
const Column = mongoose.model("Column", columnSchema);

// Модель картки (Card)
const Card = mongoose.model("Card", cardSchema);

module.exports = {
  User,
  Board,
  Column,
  Card,
};
