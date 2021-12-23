import express, { Request, Response } from "express";
import { CustomError } from "../../lib/error";
import { rateLimiter } from "../../middleware/rateLimiter";
import { Driver } from "../../models/driver";

const router = express.Router();

router.get("/", rateLimiter, (req: Request, res: Response) => {
  Driver.find((err, drivers) => {
    if (err) {
      return res
        .status(400)
        .send(new CustomError(400, "Unable to fetch drivers from database"));
    }
    return res.status(200).send({ data: drivers });
  });
});

export { router as driverGetRouter };
