import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Provided email already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    message: "Successfull operation",
    name: newUser.name,
    email: newUser.email,
  });
};

export default ctrlWrapper(signup);
