import { model, Schema } from "mongoose";

const AboutUsSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    image: { type: String },
    imagePublicId: { type: String },
  },
  { timestamps: true }
);

const AboutUs = model("AboutUs", AboutUsSchema, "AboutUs");

export default AboutUs;
