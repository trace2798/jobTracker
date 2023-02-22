import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

import Job from "./models/Job.js";

const start = async () => {
  try {
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
    } catch (error) {
      console.log(error);
    }
    await Job.deleteMany();

    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock_data.json", import.meta.url))
    );
    await Job.create(jsonProducts);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
