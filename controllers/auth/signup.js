import { User } from "../../models/index.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
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
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    theme: "dark",
  });

  const token = generateToken(newUser);
  newUser.token = token;
  await newUser.save();

  res.status(201).json({
    token: token,
    user: newUser.name,
    email: newUser.email,
    avatarURL,
    theme: "dark",
  });
};

export default ctrlWrapper(signup);