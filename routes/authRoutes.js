import express from "express";
import rateLimiter from 'express-rate-limit';
const router = express.Router();

import { register, login, updateUser, getCurrentUser } from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';

const apiLimiter = rateLimiter({
    windowMs: 10 * 60 * 1000, //10 minutes.
    max: 10,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  });

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/updateUser").patch(authenticateUser, updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
export default router;
