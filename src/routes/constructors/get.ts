import express, { Request, Response } from "express";
import { CustomError } from "../../lib/error";
import { rateLimiter } from "../../middleware/rateLimiter";
import { Constructor } from "../../models/contructor";

const router = express.Router();

router.get("/", rateLimiter, (req: Request, res: Response) => {
  Constructor.find((err, constructors) => {
    if (err) {
      return res
        .status(400)
        .send(
          new CustomError(400, "Unable to fetch constructors from database")
        );
    }
    return res.status(200).send({ data: constructors });
  });
});

export { router as constructorGetRouter };
