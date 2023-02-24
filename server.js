import "express-async-errors";
import express from "express";
import cookieParser from 'cookie-parser';
const app = express();
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });
import morgan from "morgan";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//importing routes
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobRoutes.js";

//db connection
import mongoose from "mongoose";

//Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

/* This will make json data available for us in the controller. */
app.use(express.json());
console.log("From Server");

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.get("/api/v1", (req, res) => {
  res.json("API!");
});

//auth Route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

/* A middleware that will be called if the route is not found. */
app.use(notFoundMiddleware);
/* A middleware that will be called if an error occurs. */
app.use(errorHandlerMiddleware);

/**
 * It connects to the MongoDB database and starts the server. If it does not connects to MongoDB then it console log error and the server does not starts.
 */
const start = async () => {
  const mongo = process.env.MONGO_URL;
  try {
    await mongoose
      .connect(mongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((con) => {
        // console.log(con.connections);
        console.log("MongoDB connection successful");
      });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
