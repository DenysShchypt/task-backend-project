import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import queryString from "query-string";
import axios from "axios";
import "dotenv/config";

import "dotenv/config";

const { JWT_SECRET } = process.env;

const { GOOGLE_SECRET, GOOGLE_CLIENT_ID, BACKEND_URL, FRONT_URL } = process.env;

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  const urlObj = new URL(fullUrl);
  // console.log(urlObj);

  const urlParams = queryString.parse(urlObj.search);
  // console.log(urlParams);
  const code = urlParams.code;

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
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const user = await User.findOne({ email: userData.data.email });

  let payload = {};

  if (!user) {
    const hashPassword = await bcrypt.hash(userData.data.id, 10);

    const newUser = await User.create({
      name: userData.data.name,
      email: userData.data.email,
      password: hashPassword,
    });
    await newUser.save();
    payload = {
      id: newUser._id,
    };
  } else {
    payload = {
      id: user._id,
    };
  }

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "20h",
  });

  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.redirect(
    `${FRONT_URL}/api/auth/google-redirect/?token=${token}&refreshToken=${refreshToken}`
  );
};

export default ctrlWrapper(googleRedirect);
