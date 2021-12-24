import { Request, Response, NextFunction } from "express";
import { CustomError } from "./error";
import { body, query, validationResult } from "express-validator";

// Driver: src/routes/drivers/create.ts
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

// Circuit: src/routes/circuit/create.ts
export const circuitCreateValidator = [
  body("circuitId").exists().withMessage("circuitId is required").isNumeric(),
  body("circuitRef").exists().withMessage("circuitRef is required"),
  body("name").exists().withMessage("name is required"),
  body("location").exists().withMessage("location is required"),
  body("lat").exists().withMessage("lat is required").isNumeric(),
  body("long").exists().withMessage("long is required").isNumeric(),
  body("alt").exists().withMessage("alt is required").isNumeric(),
];

export const circuitCreateValidatorFn = (
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

// result get: src/routes/results/get.ts
export const resultGetValidator = [
  // check optional query parameters
  query("driverId").optional().isNumeric(),
  query("raceId").optional().isNumeric(),
  query("constructorId").optional().isNumeric(),
  query("limit").optional().isNumeric(),
];

export const resultGetValidatorFn = (
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
