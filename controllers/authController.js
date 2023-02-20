import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from '../errors/index.js'

const register = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  if (!name || !email || !password) {
    throw new BadRequestError("Provide all values");
  }
  const userAlreadyExists = await User.findOne({ email})
  if(userAlreadyExists) {
    throw new BadRequestError("Account with this email already exists");
  }

  res.status(StatusCodes.CREATED).json({ newUser });
};

const login = async (req, res) => {
  res.send("User logged IN successfully");
};
const updateUser = async (req, res) => {
  res.send("User updated successfully");
};

export { register, login, updateUser };
