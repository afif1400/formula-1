import express, { Request, Response } from "express";
import { CustomError } from "../../lib/error";
import { Circuit } from "../../models/circuits";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Circuit.find({}, (err, circuits) => {
    if (err) {
      return res.status(400).send(new CustomError(400, err.message));
    }
    return res.status(200).send({
      data: circuits,
    });
  });
});

export { router as circuitGetRouter };
