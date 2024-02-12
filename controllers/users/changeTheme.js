import { User } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const changeTheme = async (req, res) => {
  const { _id } = req.user;
  const { theme } = req.body;

  const updatedUser = await User.findByIdAndUpdate(_id, { theme }, { new: true });

  res.json({ message: "Successful operation", theme: updatedUser.theme });
};

export default ctrlWrapper(changeTheme);
