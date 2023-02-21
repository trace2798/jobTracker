import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";

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
  console.log("token:", token);
  // attachCookie({ res, token });
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

// const register = async (req, res, next) => {
//   if (!name || !email || !password) {
//     throw new BadRequestError("Provide all values");
//   }
//   const userAlreadyExists = await User.findOne({ email });
//   if (userAlreadyExists) {
//     throw new BadRequestError("Account with this email already exists");
//   }

//   const newUser = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   newUser.createJWT()
//   res.status(StatusCodes.CREATED).json({ newUser });
// };

// We're finding a user by email, selecting the password field, comparing the password, and then creating a JWT token.
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  /* Finding a user by email and selecting the password field. We need to specifically select the password field because it has the 'select: false' in userSchema */
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
const updateUser = async (req, res) => {
  console.log(req.user);
  res.send("User updated successfully");
};

export { register, login, updateUser };
