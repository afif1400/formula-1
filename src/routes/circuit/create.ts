import express, { Request, Response } from "express";
import { CustomError } from "../../lib/error";
import {
  circuitCreateValidator,
  circuitCreateValidatorFn,
} from "../../lib/validator";
import { Circuit } from "../../models/circuits";

const router = express.Router();

router.post(
  "/",
  circuitCreateValidator,
  circuitCreateValidatorFn,
  (req: Request, res: Response) => {
    const { circuitId, circuitRef, name, location, lat, long, alt, url } =
      req.body;

    const circuit = new Circuit({
      circuitId,
      circuitRef,
      name,
      location,
      lat,
      long,
      alt,
      url,
    });

    circuit.save((err, circuit) => {
      if (err) {
        return res.status(400).send(new CustomError(400, err.message));
      }
      return res.status(200).send({
        data: circuit,
      });
    });
  }
);

export { router as circuitCreateRouter };
