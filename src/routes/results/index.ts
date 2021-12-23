import express from "express";
import { resultGetRouter } from "./get";

const resultApp = express();

resultApp.use(resultGetRouter);

export { resultApp as resultIndexRouter };
