import { model, Document, Schema, Model } from "mongoose";

interface DriverAttributes {
  driverId: number;
  driverRef: string;
  firstName: string;
  lastName: string;
  nationality: string;
  code: string;
  number: number;
  url: string;
}

interface DriverModel extends Model<Driver> {
  build(attributes: DriverAttributes): Driver;
}

interface Driver extends Document {
  driverId: number;
  driverRef: string;
  firstName: string;
  lastName: string;
  code: string;
  nationality: string;
  number: number;
  url: string;
}

const driverSchema = new Schema(
  {
    driverId: {
      type: Number,
      required: true,
    },
    driverRef: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
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

driverSchema.statics.build = (attributes: DriverAttributes) => {
  return new Driver(attributes);
};

const Driver = model<Driver, DriverModel>("Driver", driverSchema);

export { Driver };
