
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
    throw HttpError(404, "user's not found");
  }

  const matchPwd = await bcrypt.compare(password, user.password);

  if (!matchPwd) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "20h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatarURL: user.avatarURL,
    },
  });
};

export default ctrlWrapper(signin);
