import express, { Request, Response } from "express";
import { rateLimiter } from "../../middleware/rateLimiter";
import { Driver } from "../../models/driver";

const router = express.Router();

router.get("/", rateLimiter, async (req: Request, res: Response) => {
  // @ts-ignore
  const drivers = await Driver.find({}).limit(20).cache({
    originalUrl: req.originalUrl,
    key: req.ip,
  });
  return res.status(200).send({ data: drivers });
});

export { router as driverGetRouter };
