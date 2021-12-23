import { Model, model, Schema, Document } from "mongoose";
import { CircuitDoc } from "./circuits";

interface RaceAttributes {
  raceId: number;
  year: string;
  round: number;
  circuit: CircuitDoc;
  name: string;
  date: Date;
  time: string;
  url: string;
}

interface RaceDoc extends Document {
  raceId: number;
  year: string;
  round: number;
  circuit: CircuitDoc;
  name: string;
  date: Date;
  time: string;
  url: string;
}

interface RaceModel extends Model<RaceDoc> {
  build(attr: RaceAttributes): RaceDoc;
}

const raceSchema = new Schema(
  {
    raceId: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    round: {
      type: Number,
      required: true,
    },
    circuit: {
      type: Schema.Types.ObjectId,
      ref: "Circuit",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    url: {
      type: String,
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

raceSchema.statics.build = (attributes: RaceAttributes) => {
  return new Race();
};

raceSchema.virtual("raceCircuit", {
  ref: "Circuit",
  localField: "circuitId",
  foreignField: "circuitId",
});

raceSchema.set("toObject", { virtuals: true });
raceSchema.set("toJSON", { virtuals: true });

const Race = model<RaceDoc, RaceModel>("Race", raceSchema);

export { Race };
