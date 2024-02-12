import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(403, "Email doesn't exist / Password is wrong");
  }

  const matchPwd = await bcrypt.compare(password, user.password);

  if (!matchPwd) {
    throw HttpError(403, "Email doesn't exist / Password is wrong");
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "20h" });
  const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    message: "Successful operation",
    token,
    refreshToken,
    user: {
      avatarURL: user.avatarURL,
      name: user.name,
      email: user.email,
      theme: user.theme,
      name: user.name
    },
  });
};

export default ctrlWrapper(signin);
