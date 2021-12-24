//@ts-nocheck
import express, { Request, Response } from "express";
import { CustomError } from "../../lib/error";
import { resultGetValidator, resultGetValidatorFn } from "../../lib/validator";
import { Result } from "../../models/results";

const router = express.Router();

router.get(
  "/",
  resultGetValidator,
  resultGetValidatorFn,
  async (req: Request, res: Response) => {
    // query the database
    const results = await Result.find(req.query)
      .populate("driverDetails")
      .populate("raceDetails")
      .populate("constructorDetails")
      .cache({
        originalUrl: req.originalUrl,
        key: req.ip,
      })
      .lean();

    if (!results) {
      return res
        .status(400)
        .send(new CustomError(400, "Unable to fetch results from database"));
    }

    // return the filtered results
    return res.status(200).send({ data: results });
  }
);

export { router as resultGetRouter };
