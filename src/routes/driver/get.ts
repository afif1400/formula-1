//@ts-nocheck
import express, { Request, Response } from "express";
import { rateLimiter } from "../../middleware/rateLimiter";
import { Driver } from "../../models/driver";
import { Result } from "../../models/results";
import { CustomError } from "../../lib/error";

const router = express.Router();

router.get("/", rateLimiter, async (req: Request, res: Response) => {
  const drivers = await Driver.find({}).limit(20).cache({
    originalUrl: req.originalUrl,
    key: req.ip,
  });
  if (!drivers) {
    return res
      .status(400)
      .send(new CustomError(400, "Unable to fetch drivers from database"));
  }

  return res.status(200).send({ data: drivers });
});

// get all the races of the driver and its results
router.get("/:driverId/results", async (req: Request, res: Response) => {
  const results = await Result.find({ driverId: 8 })
    .populate("driverDetails")
    .populate("raceDetails")
    .cache({
      originalUrl: req.originalUrl,
      key: req.ip,
    });
  if (!results) {
    return res
      .status(400)
      .send(new CustomError(400, "Unable to fetch results from database"));
  }

  return res.status(200).send({ data: results });
});

// get all the driver details
router.get("/:driverId", async (req: Request, res: Response) => {
  const driver = await Driver.findOne({ driverId: req.params.driverId }).cache({
    originalUrl: req.originalUrl,
    key: req.ip,
  });
  if (!driver) {
    return res
      .status(400)
      .send(new CustomError(400, "Unable to fetch driver from database"));
  }

  return res.status(200).send({ data: driver });
});

export { router as driverGetRouter };
