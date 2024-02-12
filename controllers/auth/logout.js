import { Session, User } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const logout = async (req, res) => {
  const { _id } = req.user;
  const { _id: ssid } = req.session;

  // await User.findByIdAndUpdate(_id, { token: "" });

  await Session.deleteOne({ _id: ssid });

  res.status(204).json();
};

export default ctrlWrapper(logout);
