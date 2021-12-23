import express from "express";
import { circuitCreateRouter } from "./create";
import { circuitGetRouter } from "./get";

require("dotenv").config();

const circuitApp = express();

circuitApp.use(circuitGetRouter);
circuitApp.use("/create", circuitCreateRouter);

export { circuitApp as circuitIndexRouter };
