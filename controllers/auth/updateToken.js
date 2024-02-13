import { Session, User } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const updateToken = async (req, res) => {
  const { refreshToken: incomingRefreshToken } = req.body;

  const { id, sid } = jwt.verify(incomingRefreshToken, JWT_SECRET);

  const user = await User.findOne({ _id: id });

  if (!user) {
    throw HttpError(403);
  }

  const currentSession = await Session.findOne({ _id: sid });

  if (!currentSession) {
    throw HttpError(403);
  }

  await Session.deleteOne({ _id: sid });

  const newSid = await Session.create({
    uid: user._id,
  });

  const payload = {
    id: user._id,
    sid: newSid._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

  // await User.findOneAndUpdate(
  //   { _id: id },
  //   {
  //     token,
  //   }
  // );

  res.json({
    token,
    refreshToken,
  });
};

export default ctrlWrapper(updateToken);
