import { ctrlWrapper } from "../../decorators/index.js";
import { User } from "../../models/index.js";

const getCurrentUser = async (req, res) => {
  const { user } = req;

  // const user = await User.findOne({ _id }, "-passwod -createdAt -updatedAt");

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
    theme: user.theme,
    token: user.token,
  });
};

export default ctrlWrapper(getCurrentUser);
