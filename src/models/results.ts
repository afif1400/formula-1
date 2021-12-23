import { Document, Model, Schema, model } from "mongoose";

interface ResultAttributes {
  raceId: number;
  resultId: number;
  driverId: number;
  constructorId: number;
  number: number;
  grid: number;
  position: number;
  positionText: string;
  points: number;
  laps: number;
  time: string;
  milliseconds: number;
  fastestLap: number;
  fastestLapRank: number;
  statusId: number;
  statusText: string;
  fastestLapTime: string;
  fastestLapSpeed: number;
}

interface ResultDoc extends Document {
  raceId: number;
  resultId: number;
  driverId: number;
  constructorId: number;
  number: number;
  grid: number;
  position: number;
  positionText: string;
  points: number;
  laps: number;
  time: string;
  milliseconds: number;
  fastestLap: number;
  fastestLapRank: number;
  statusId: number;
  statusText: string;
  fastestLapTime: string;
  fastestLapSpeed: number;
}

interface ResultModel extends Model<ResultDoc> {
  build(attr: ResultAttributes): ResultDoc;
}

const resultSchema = new Schema(
  {
    raceId: {
      type: Number,
      required: true,
    },
    resultId: {
      type: Number,
      required: true,
    },
    driverId: {
      type: Number,
      required: true,
    },
    constructorId: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    grid: {
      type: Number,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    positionText: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    laps: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    milliseconds: {
      type: Number,
      required: true,
    },
    fastestLap: {
      type: Number,
      required: true,
    },
    fastestLapRank: {
      type: Number,
      required: true,
    },
    statusId: {
      type: Number,
      required: true,
    },
    statusText: {
      type: String,
      required: true,
    },
    fastestLapTime: {
      type: String,
      required: true,
    },
    fastestLapSpeed: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

resultSchema.statics.build = (attributes: ResultAttributes) => {
  return new Result();
};

resultSchema.virtual("constructor", {
  ref: "Constructor",
  localField: "constructorId",
  foreignField: "constructorId",
});

resultSchema.virtual("driver", {
  ref: "Driver",
  localField: "driverId",
  foreignField: "driverId",
});

resultSchema.virtual("race", {
  ref: "Race",
  localField: "raceId",
  foreignField: "raceId",
});

resultSchema.set("toObject", { virtuals: true });
resultSchema.set("toJSON", { virtuals: true });

const Result = model<ResultDoc, ResultModel>("Result", resultSchema);

export { Result };
