import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";

const deleteUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOneAndDelete({ _id });

  if (!user) {
    throw HttpError(404, `User not found`);
  }

  res.status(204).json({ message: "Successful operation" });
};

export default ctrlWrapper(deleteUser);
