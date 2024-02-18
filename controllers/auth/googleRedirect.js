import { ctrlWrapper } from "../../decorators/index.js";
import { Session, User } from "../../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import queryString from "query-string";
import axios from "axios";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const { GOOGLE_SECRET, GOOGLE_CLIENT_ID, BACKEND_URL, FRONT_URL } = process.env;

const googleRedirect = async (req, res) => {
  console.log('hello');
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  const urlObj = new URL(fullUrl);

  // Запит google на отримання code
  const urlParams = queryString.parse(urlObj.search);

  const code = urlParams.code;
  // Запит і отримання token
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_SECRET,
      redirect_uri: `${BACKEND_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  // Запит і отримання інформації про користувача
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  console.log(userData.data);
  const user = await User.findOne({ email: userData.data.email });

  let payload = {};

  if (!user) {
    const hashPassword = await bcrypt.hash(userData.data.id, 10);

    const newSession = await Session.create({
      uid: user._id,
    });

    const newUser = await User.create({
      name: userData.data.name,
      email: userData.data.email,
      password: hashPassword,
    });

    await newUser.save();

    payload = {
      id: newUser._id,
      sid: newSession._id,
    };
  } else {
    const newSession = await Session.create({
      uid: user._id,
    });

    payload = {
      id: user._id,
      sid: newSession._id,
    };
  }

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "20h",
  });

  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.redirect(
    `${FRONT_URL}/#/google-redirect/?token=${token}&refreshToken=${refreshToken}`
  );
};

export default ctrlWrapper(googleRedirect);
