import { model, Schema } from "mongoose";

const HeroBannerSliderSchema = new Schema(
  {
    type: { type: String, required: [true, "Type is required!"] },
    title: { type: String, required: [true, "Title is required!"] },
    cta: { type: String, required: [true, "CTA Name is required!"] },
    ctaLink: { type: String, required: [true, "CTA Link is required!"] },
    shortDescription: {
      type: String,
      required: [true, "Short Description is required!"],
    },
    longDescription: {
      type: String,
      required: [true, "Long Description is required!"],
    },
    image: { type: String },
    imagePublicId: { type: String },
    status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const HeroBannerSlider = model(
  "HeroBannerSlider",
  HeroBannerSliderSchema,
  "HeroBannerSlider"
);

export default HeroBannerSlider;
