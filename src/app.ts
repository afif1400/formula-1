import express, { Request, Response } from "express";
import { driverIndexRouter } from "./routes/driver";
import { constructorIndexRouter } from "./routes/constructors";
import { json } from "body-parser";

const app = express();

app.use(json());
app.use("/drivers", driverIndexRouter);
app.use("/constructors", constructorIndexRouter);

export { app };
