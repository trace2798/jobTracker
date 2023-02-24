import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

//we checck for cookies with this middleware so the frontend does not need to store it anymore.
const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  // const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
