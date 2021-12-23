import express from "express";
import { constructorGetRouter } from "./get";

require("dotenv").config();

const constructorApp = express();

constructorApp.use(constructorGetRouter);

export { constructorApp as constructorIndexRouter };
