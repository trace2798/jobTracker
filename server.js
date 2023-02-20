import 'express-async-errors';
import express from "express";
const app = express();
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

//importing routes
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobRoutes.js";

//db connection
import mongoose from "mongoose";

//Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

/* This will make json data available for us in the controller. */
app.use(express.json());
console.log('From Server');
console.log('From Server');
console.log('From Server');
console.log('From Server');
console.log('From Server');
console.log('From Server');
app.get("/", (req, res) => {
  res.send("Welcome!");
});

//auth Route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

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
