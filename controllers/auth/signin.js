import { User } from "../../models/index.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "user's not found");
  }

  const matchPwd = await bcrypt.compare(password, user.password);

  if (!matchPwd) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "20h" });
  const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    refreshToken,
    user: {
      theme: user.theme,
      avatarURL: user.avatarURL,
      name: user.name,
    },
  });
};

export default ctrlWrapper(signin);
