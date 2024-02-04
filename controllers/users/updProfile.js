import { User } from "../../models/index.js";
import { parse } from "path";
import fs from "fs/promises";
import { ctrlWrapper } from "../../decorators/index.js";
import bcrypt from "bcrypt";
import { cloudinary } from "../../helpers/index.js";

export const updProfile = async (req, res) => {
  const { _id } = req.user;

  const { path, originalname } = req.file;
  const { name, email, password } = req.body;

  const { name: fileName, ext: fileExtension } = parse(originalname);

  const options = {
    public_id: `${_id}_${fileName}`,
    unique_filename: false,
    overwrite: true,
    folder: "avatars",
    transformation: [{ height: 100, width: 100, crop: "scale" }],
  };

  const { url } = await cloudinary.uploader.upload(path, options);

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

  if (url) {
    updateFields.avatarURL = url;
  }

  const user = await User.findByIdAndUpdate(_id, updateFields);

  await fs.unlink(req.file.path);

  res.json({
    avatarURL: user.avatarURL,
    name,
    email,
  });
};

export default ctrlWrapper(updProfile);
