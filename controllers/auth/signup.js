import { User } from "../../models/index.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import "dotenv/config";

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

  res.status(201).json({
    user: newUser.name,
    email: newUser.email,
  });
};

export default ctrlWrapper(signup);
