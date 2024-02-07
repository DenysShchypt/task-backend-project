import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";

const deleteUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOneAndDelete({ _id });

  if (!user) {
    throw HttpError(404, `User with id: ${_id} not found`);
  }

  res.status(204).json({ message: "User delete success" });
};

export default ctrlWrapper(deleteUser);
