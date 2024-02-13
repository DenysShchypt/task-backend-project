import bcrypt from "bcrypt";
import { Session, User } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
const { JWT_SECRET } = process.env;

// const generateToken = (user) => {
//   const payload = { id: user._id };
//   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "20h" });
//   return token;
// };

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

  // const token = generateToken(newUser);

  // newUser.token = token;
  // await newUser.save();

  const newSession = await Session.create({
    uid: newUser._id,
  });

  const payload = {
    id: newUser._id,
    sid: newSession._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "20h" });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "20h" });

  res.status(201).json({
    message: "Successful operation",
    user: {
      token: token,
      refreshToken: refreshToken,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

export default ctrlWrapper(signup);
