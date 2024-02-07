
import bcrypt from "bcrypt";
import { User } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
const { JWT_SECRET } = process.env;

const generateToken = (user) => {
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "20h" });
  return token;
};
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

  const token = generateToken(newUser);
  newUser.token = token;
  await newUser.save();

  res.status(201).json({
    message: "Successfull operation",
    user: { token: token, name: newUser.name, email: newUser.email },
  });
};

export default ctrlWrapper(signup);
