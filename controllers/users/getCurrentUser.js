import { ctrlWrapper } from "../../decorators/index.js";

const getCurrentUser = async (req, res) => {
  const { user } = req;

  res.json({
    token: user.token,
    _id: user._id,
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
    theme: user.theme,
  });
};

export default ctrlWrapper(getCurrentUser);
