import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import { BadRequestError, NotFoundError } from "../errors/index.js";

// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);
//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),

//     httpOnly: true,
//   };
//   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

//   res.cookie('jwt', token, cookieOptions);

//   // Remove password from output
//   user.password = undefined;
//   console.log(token)
//   res.status(statusCode).json({
//     status: 'success',
//     token,
//     data: {
//       user,
//     },
//   });
// };

// const register = async (req, res, next) => {
//   const newUser = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });

//   if (!name || !email || !password) {
//     //we add return so that the login function finishes right away.
//     throw new BadRequestError("Provide all values");
//   }
//   const userAlreadyExists = await User.findOne({ email: email })
//   if (userAlreadyExists) {
//     throw new BadRequestError("Account with this email already exists");
//   }
//   createSendToken(newUser, 201, res);

// };
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('please provide all values');
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }
  const user = await User.create({ name, email, password });

  const token = user.createJWT();
  console.log('token:', token);
  // attachCookie({ res, token });
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },

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

const login = async (req, res) => {
  res.send("User logged IN successfully");
};
const updateUser = async (req, res) => {
  res.send("User updated successfully");
};

export { register, login, updateUser };
