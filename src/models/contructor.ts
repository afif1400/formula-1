import { Model, Schema, Document, model } from "mongoose";

interface ContructorAttributes {
  constructorId: number;
  name: string;
  nationality: string;
  url: string;
}

interface ContructorModel extends Model<Constructor> {
  build(attr: ContructorAttributes): Constructor;
}

interface Constructor extends Document {
  constructorId: number;
  name: string;
  nationality: string;
  url: string;
}

const constructorSchecma = new Schema(
  {
    constructorId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
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

constructorSchecma.statics.build = (attributes: ContructorAttributes) => {
  return new Constructor();
};

const Constructor = model<Constructor, ContructorModel>(
  "Constructor",
  constructorSchecma
);

export { Constructor };
