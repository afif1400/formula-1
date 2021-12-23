import { NextFunction, Response, Request } from "express";
import moment from "moment";
import { CustomError } from "../lib/error";
import {
  client,
  MAX_WINDOW_REQUEST,
  WINDOW_LOG_INTERVAL,
  WINDOW_SIZE,
} from "../lib/redis/redis";

interface IRequestLog {
  requestTimeStamp: number;
  requestCount: number;
}

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip: string = req.ip;

  const record = await client.get(ip);

  const currentRequestTime = moment();
  if (!record) {
    let newRecord: IRequestLog[] = [];
    let requestLog: IRequestLog = {
      requestTimeStamp: currentRequestTime.unix(),
      requestCount: 1,
    };

    newRecord.push(requestLog);
    client.set(ip, JSON.stringify(newRecord));
    next();
  } else {
    let data = JSON.parse(record!);
    let windowStartTimeStamp = moment().subtract(WINDOW_SIZE, "hours").unix();
    let requestWithinWindow = data.filter((requestEntry: IRequestLog) => {
      return requestEntry.requestTimeStamp > windowStartTimeStamp;
    });

    let totalWindowRequestCount = requestWithinWindow.reduce(
      (accumulator: any, entry: IRequestLog) => {
        return accumulator + entry.requestCount;
      },
      0
    );

    // If number of requests made is greater than or equal to the desired maximum, return error
    if (totalWindowRequestCount >= MAX_WINDOW_REQUEST) {
      res
        .status(429)
        .send(
          new CustomError(
            429,
            `You hav exceeded ${MAX_WINDOW_REQUEST} request in ${WINDOW_SIZE} hours limit`
          )
        );
    } else {
      // If number of requests made is less that maximum, log the new request recoed
      let lastRequestLog: IRequestLog = data[data.length - 1];
      let currentWindowIntervalStartTimeStamp: number = currentRequestTime
        .subtract(WINDOW_LOG_INTERVAL, "hours")
        .unix();

      // If interval has not passed since last request log, increment counter
      if (lastRequestLog.requestCount > currentWindowIntervalStartTimeStamp) {
        lastRequestLog.requestTimeStamp++;
        data[data.length - 1] = lastRequestLog;
      } else {
        // If interval has passed, log new entry for current user and timestamp
        data.push({
          requestTimeStamp: currentRequestTime.unix(),
          requestCount: 1,
        });
      }

      client.set(ip, JSON.stringify(data));
      next();
    }
  }
};
