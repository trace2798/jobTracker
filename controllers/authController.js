import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import attachCookie from "../utils/authCookies.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });

  const token = user.createJWT();
  attachCookie({ res, token });
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    // token,
    location: user.location,
  });
};

// We're finding a user by email, selecting the password field, comparing the password, and then creating a JWT token.
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  /* Finding a user by email and selecting the password field. We need to specifically select the password field because it has the 'select: false' in userSchema */
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  attachCookie({res, token});
  user.password = undefined;
  // const oneDay = 1000 * 60 * 60 * 24;
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   //in milliseconds
  //   expires: new Date(Date.now() + oneDay),
  //   secure: process.env.NODE_ENV === "production",
  // });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

// const updateUser = async (req, res) => {
//   console.log(req.user);
//   res.send("User updated successfully");
// }

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  //no password because this is not update password route.
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  // various setups
  // in this case only id
  // if other properties included, must re-generate

  const token = user.createJWT();
  attachCookie({ res, token });
  res.status(StatusCodes.CREATED).json({
    user,
    // token,
    location: user.location,
  });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

export { register, login, updateUser, getCurrentUser };
