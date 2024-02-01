import { Schema, model } from "mongoose";

// Схема користувача (User)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Схема дошки (Board)
const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // description: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

// Схема колонки (Column)
const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: "board", required: true },
  // owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Схема картки (Card)
const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  column: {
    type: Schema.Types.ObjectId,
    ref: "column",
    required: true,
  },
  deadLine: { type: Date, required: true },
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
