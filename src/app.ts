import express from "express";
import { driverIndexRouter } from "./routes/driver";
import { constructorIndexRouter } from "./routes/constructors";
import { json } from "body-parser";
import { circuitIndexRouter } from "./routes/circuit";
import { raceIndexRouter } from "./routes/race";
import { resultIndexRouter } from "./routes/results";

const app = express();

app.use(json());
require("./lib/redis/cache");
app.use("/drivers", driverIndexRouter);
app.use("/constructors", constructorIndexRouter);
app.use("/circuits", circuitIndexRouter);
app.use("/races", raceIndexRouter);
app.use("/results", resultIndexRouter);

export { app };
