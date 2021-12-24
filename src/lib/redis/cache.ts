// @ts-nocheck
import mongoose from "mongoose";
import { client } from "./redis";

const exec = mongoose.Query.prototype.exec;

// toggling the cache
mongoose.Query.prototype.cache = function (options: any = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  this.originalUrl = {
    originalUrl: options.originalUrl,
  };

  return this;
};

mongoose.Query.prototype.exec = async function (...args: any) {
  if (!this.useCache) {
    return exec.apply(this, args);
  }

  const key = JSON.stringify(
    Object.assign({}, this.originalUrl, {
      collection: this.model.modelName,
      options: this.options,
    })
  );

  // check the value for the key
  const cachedValue = await client.hget(this.hashKey, key);

  if (cachedValue) {
    const doc = JSON.parse(cachedValue);
    console.log("from cache");
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, args);
  client.hset(this.hashKey, key, JSON.stringify(result), "EX", 10);

  return result;
};
