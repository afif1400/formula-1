import express from "express";
import { driverCreateRouter } from "./create";
import { driverGetRouter } from "./get";

const driverApp = express();

driverApp.use("/list", driverGetRouter);
driverApp.use("/create", driverCreateRouter);

export { driverApp as driverIndexRouter };
