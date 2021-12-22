import express, { Request, Response } from "express";
import { driverIndexRouter } from "./routes/driver";
import { json } from "body-parser";

const app = express();

app.use(json());
app.use("/drivers", driverIndexRouter);

export { app };
