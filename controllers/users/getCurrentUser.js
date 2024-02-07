import { ctrlWrapper } from "../../decorators/index.js";
import { User } from "../../models/index.js";

const getCurrentUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id }, "-passwod -createdAt -updatedAt");

  res.json(user);
};

export default ctrlWrapper(getCurrentUser);
