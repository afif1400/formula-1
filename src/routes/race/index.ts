import express from "express";
import { RaceGetRouter } from "./get";

const raceApp = express();

raceApp.use(RaceGetRouter);

export { raceApp as raceIndexRouter };
