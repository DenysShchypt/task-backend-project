import { User } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import bcrypt from "bcrypt";

export const updateProfile = async (req, res) => {
  const { _id } = req.user;

  const { name, email, password } = req.body;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }

  if (email) {
    updateFields.email = email;
  }

  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);
    updateFields.password = hashPassword;
  }

  const user = await User.findByIdAndUpdate(_id, updateFields);

  res.json({
    name,
    email,
  });
};

export default ctrlWrapper(updateProfile);
