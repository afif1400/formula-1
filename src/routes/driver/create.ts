import express, { Request, Response } from "express";
import { CustomError } from "../../lib/error";
import {
  driverCreateValidator,
  driverCreateValidatorFn,
} from "../../lib/validator";
import { Driver } from "../../models/driver";

const router = express.Router();

router.post(
  "/",
  driverCreateValidator,
  driverCreateValidatorFn,
  (req: Request, res: Response) => {
    const {
      driverId,
      driverRef,
      nationality,
      firstName,
      lastName,
      code,
      number,
      url,
    } = req.body;

    const driver = new Driver({
      driverId,
      driverRef,
      firstName,
      lastName,
      nationality,
      code,
      number,
      url,
    });

    driver.save((err, driver) => {
      if (err) {
        return res.status(400).send(new CustomError(400, err.message));
      }
      return res.status(200).send({
        data: driver,
      });
    });
  }
);

export { router as driverCreateRouter };
