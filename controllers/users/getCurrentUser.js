import { ctrlWrapper } from "../../decorators/index.js";
import { User } from "../../models/index.js";

const getCurrentUser = async (req, res) => {
  const { user } = req;

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
