import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import { User } from "../models/index.js";
// Додавання данних з env змінні оточення process.env
import "dotenv/config";
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Unauthorized (invalid access token)"));
  }
  // Ділимо заголовок на 2 слога
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Unauthorized (invalid access token)"));
  }
  try {
    const { id, sid } = jwt.verify(token, JWT_SECRET);

    console.log(sid);

    const user = await User.findById(id);

    if (!user || !user.token || token !== user.token) {
      return next(HttpError(401, "Unauthorized (invalid access token)"));
    }
    // Записуємо інформацію в object req про user яка буде в req controllers
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
