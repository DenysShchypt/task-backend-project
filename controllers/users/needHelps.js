import { ctrlWrapper } from "../../decorators/index.js";
import { sendEmail } from "../../helpers/sendEmail.js";

const needHelps = (req, res) => {
  const { email, description } = req.body;

  const data = {
    email,
    text: description,
  };

  sendEmail(data);

  res.json({ message: "Thank you for your request, we will contact you!" });
};

export default ctrlWrapper(needHelps);
