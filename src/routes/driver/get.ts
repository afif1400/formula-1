import express, { Request, Response } from "express";
import { Driver } from "../../models/driver";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Driver.find((err, drivers) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send(drivers);
  });
});

export { router as driverGetRouter };
