import express, { Request, Response } from "express";
import { CustomError } from "../../lib/error";
import { Circuit } from "../../models/circuits";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  //@ts-ignore
  const circuits = await Circuit.find({}).cache({
    originalUrl: req.originalUrl,
    key: req.ip,
  });
  if (!circuits) {
    return res
      .status(400)
      .send(new CustomError(400, "Unable to fetch circuits from database"));
  }

  return res.status(200).send({ data: circuits });
});

export { router as circuitGetRouter };
