import { model, Schema } from "mongoose";

const WhyChooseUsSchema = new Schema(
  {
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

const WhyChooseUs = model("WhyChooseUs", WhyChooseUsSchema, "WhyChooseUs");

export default WhyChooseUs;
