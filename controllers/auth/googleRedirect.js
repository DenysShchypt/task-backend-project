import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";

import jwt from "jsonwebtoken";

import queryString from "query-string";
import axios from "axios";
import "dotenv/config";

import "dotenv/config";

const { JWT_SECRET } = process.env;

const { GOOGLE_SECRET, GOOGLE_CLIENT_ID, BASE_URL, FRONT_BASE_URL } =
  process.env;

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  // console.log("fullUrl: ", fullUrl);

  const urlObj = new URL(fullUrl);

  // console.log("urlObj: ", urlObj);

  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  // console.log(userData);

  // data = {
  //   id: "116740619235013059086",
  //   email: "laylau345@gmail.com",
  //   verified_email: true,
  //   name: "Андрій Ю",
  //   given_name: "Андрій",
  //   family_name: "Ю",
  //   picture:
  //     "https://lh3.googleusercontent.com/a/ACg8ocJRrz2YEfQ-AZS9KP7VgsFoI3HxJFffrBQN2tW4D2Ha=s96-c",
  //   locale: "uk",
  // };

  const user = await User.findOne({ googleId: userData.data.id });

  if (!user) {
    await User.create({
      name: userData.data.name,
      email: userData.data.email,
      password: userData.data.id,
      avatarURL: userData.data.picture,
      googleId: userData.data.id,
    });
  }

  const token = jwt.sign({ googleId: userData.data.id }, JWT_SECRET, {
    expiresIn: "20h",
  });

  const refreshToken = jwt.sign({ googleId: userData.data.id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.redirect(
    `${FRONT_BASE_URL}/api/auth/google-redirect/?token=${token}&refreshToken=${refreshToken}`
  );
};

export default ctrlWrapper(googleRedirect);
