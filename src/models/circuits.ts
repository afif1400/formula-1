import { Model, Schema, Document, model } from "mongoose";

interface CircuitAttributes {
  circuitId: number;
  circuitRef: string;
  name: string;
  location: string;
  lat: Number;
  long: Number;
  alt: Number;
  url: string;
}

interface CircuitModel extends Model<CircuitDoc> {
  build(attr: CircuitAttributes): CircuitDoc;
}

export interface CircuitDoc extends Document {
  circuitId: number;
  circuitRef: string;
  name: string;
  location: string;
  lat: Number;
  long: Number;
  alt: Number;
  url: string;
}

const circuitSchema = new Schema(
  {
    circuitId: {
      type: Number,
      required: true,
    },
    circuitRef: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    lat: Number,
    long: Number,
    alt: Number,
    url: String,
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

circuitSchema.statics.build = (attributes: CircuitAttributes) => {
  return new Circuit();
};

const Circuit = model<CircuitDoc, CircuitModel>("Circuit", circuitSchema);

export { Circuit };
