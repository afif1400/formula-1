import express, { Request, Response } from "express";
import { driverIndexRouter } from "./routes/driver";
import { constructorIndexRouter } from "./routes/constructors";
import { json } from "body-parser";
import { circuitIndexRouter } from "./routes/circuit";
import { raceIndexRouter } from "./routes/race";

const app = express();

app.use(json());
app.use("/drivers", driverIndexRouter);
app.use("/constructors", constructorIndexRouter);
app.use("/circuits", circuitIndexRouter);
app.use("/races", raceIndexRouter);

export { app };
