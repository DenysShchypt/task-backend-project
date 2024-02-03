import { User } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { sendEmail } from "../../helpers/sendEmail.js";

const needHelps = (req, res) => {
  const { email, description } = req.body;

  const data = {
    email,
    text: description,
  };

  sendEmail(data);

  res.json({ message: "success" });
};

export default ctrlWrapper(needHelps);
