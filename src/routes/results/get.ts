import express, { Request, Response } from "express";
import { CustomError } from "../../lib/error";
import { Result } from "../../models/results";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Result.find()
    .populate("constructorDetails")
    .populate("driverDetails")
    .populate("raceDetails")
    .limit(5)
    .exec((err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .send(new CustomError(400, "Unable to fetch results from database"));
      }

      return res.status(200).send({
        data: results,
      });
    });
});

export { router as resultGetRouter };
