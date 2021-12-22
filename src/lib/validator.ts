import { Request, Response, NextFunction } from "express";
import { CustomError } from "./error";
import { body, validationResult } from "express-validator";

export const driverCreateValidator = [
  body("driverId").exists().withMessage("driverId is required").isNumeric(),
  body("driverRef").exists().withMessage("driverRef is required"),
  body("firstName").exists().withMessage("firstName is required"),
  body("lastName").exists().withMessage("lastName is required"),
  body("code").exists().withMessage("code is required"),
  body("number").exists().withMessage("number is required").isNumeric(),
];

// validator function
export const driverCreateValidatorFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(
      new CustomError(
        400,
        errors.array().map((error) => {
          return { msg: error.msg, param: error.param };
        })
      )
    );
  }
  next();
};
