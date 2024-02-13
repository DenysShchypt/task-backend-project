import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import { Session, User } from "../models/index.js";
// Додавання данних з env змінні оточення process.env
import "dotenv/config";
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Unauthorized (invalid access token or ssid)"));
  }
  // Ділимо заголовок на 2 слога
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Unauthorized (invalid access token or ssid)"));
  }
  try {
    const { id, sid } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(id);
    const session = await Session.findById(sid);

    if (!user) {
      return next(
        HttpError(401, "Unauthorized (invalid access token or ssid)")
      );
    }

    if (!session) {
      return next(
        HttpError(401, "Unauthorized (invalid access token or ssid)")
      );
    }

    req.user = user;
    req.session = session;

    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
