import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Session, User } from "../../models/index.js";
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

  const newSession = await Session.create({
    uid: user._id,
  });

  const payload = {
    id: user._id,
    sid: newSession._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "20h" });
  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    message: "Successful operation",
    token,
    refreshToken,
    user: {
      avatarURL: user.avatarURL,
      name: user.name,
      email: user.email,
      theme: user.theme,
    },
  });
};

export default ctrlWrapper(signin);
