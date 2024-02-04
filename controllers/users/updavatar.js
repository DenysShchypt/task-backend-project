import { User } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { cloudinary } from "../../helpers/index.js";
import { parse } from "path";
import fs from "fs/promises";

const updavatar = async (req, res) => {
  const { _id } = req.user;

  const { path, originalname } = req.file;

  const { name: fileName } = parse(originalname);

  const options = {
    public_id: `${_id}_${fileName}`,
    unique_filename: false,
    overwrite: true,
    folder: "avatars",
    transformation: [{ height: 100, width: 100, crop: "scale" }],
  };

  const { url } = await cloudinary.uploader.upload(path, options);

  const user = await User.findByIdAndUpdate(_id, { avatarURL: url });

  await fs.unlink(req.file.path);

  res.json({
    avatarURL: user.avatarURL,
  });
};
export default ctrlWrapper(updavatar);
