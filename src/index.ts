import { app } from "./app";
import Mongoose from "mongoose";

const start = async () => {
  //* can add other options or configurations, like connecting to the database

  await Mongoose.connect(process.env.MONGO_CONNECTION_URL!);
  console.log("Connected to MongoDB");

  app.listen(process.env.PORT || 5000, () => {
    console.log("started on port 5000...");
  });
};

start();
