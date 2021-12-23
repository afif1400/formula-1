import express from "express";
import { CustomError } from "../../lib/error";
import { Race } from "../../models/races";

const router = express.Router();

router.get("/", (req, res) => {
  Race.find()
    .populate("raceCircuit")
    .exec((err, races) => {
      if (err) {
        return res
          .status(400)
          .send(new CustomError(400, "unable to fetch races from database"));
      }
      return res.status(200).send({
        data: races,
      });
    });
});

export { router as RaceGetRouter };
