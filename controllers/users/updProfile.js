import { User } from "../../models/index.js";
import path from "path";
import fs from "fs/promises";
import { ctrlWrapper } from "../../decorators/index.js";
const avatarDir = path.resolve("public", "avatars");

export const updProfile = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const uniqueName = `${_id}_${originalname}`;
  const pathRedirectFile = path.join(avatarDir, uniqueName);

  await fs.rename(tempUpload, pathRedirectFile);

  const avatarURL = path.join("avatars", uniqueName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default ctrlWrapper(updProfile);
