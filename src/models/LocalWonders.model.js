import { model, Schema } from "mongoose";

const LocalWondersSchema = new Schema(
  {
    type: { type: String, required: [true, "Type is required!"] },
    title: { type: String, required: [true, "Title is required!"] },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    image: { type: String },
    imagePublicId: { type: String },
    status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const LocalWonders = model("LocalWonders", LocalWondersSchema, "LocalWonders");

export default LocalWonders;
