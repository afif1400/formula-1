import Redis from "ioredis";
require("dotenv").config();

export const WINDOW_SIZE = 24;
export const MAX_WINDOW_REQUEST = 100;
export const WINDOW_LOG_INTERVAL = 1;

const url = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`;
const client = new Redis(url);

export { client };
