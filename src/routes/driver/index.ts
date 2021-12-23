import express from "express";
import { driverCreateRouter } from "./create";
import { driverGetRouter } from "./get";
require("dotenv").config();

const driverApp = express();

driverApp.use(driverGetRouter);
driverApp.use("/create", driverCreateRouter);

export { driverApp as driverIndexRouter };
