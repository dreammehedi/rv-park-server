import { model, Schema } from "mongoose";

const RVCampsitesSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    price: {
      type: Number,
      required: [true, "Price is required!"],
    },
    type: {
      type: String,
      required: [true, "Type is required!"],
    },
    address: {
      type: String,
      required: [true, "Address is required!"],
    },
    lat: { type: String, required: [true, "Latitude is required!"] },
    long: { type: String, required: [true, "Longitude is required!"] },
    features: {
      type: [String],
      required: [true, "Features are required!"],
    },
    amenities: {
      type: [String],
      required: [true, "Amenities are required!"],
    },
    rules: {
      type: [String],
      required: [true, "Rules are required!"],
    },
    proximity: {
      type: [String],
      required: [true, "Proximity is required!"],
    },
    image: { type: String },
    imagePublicId: { type: String },
    status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const RVCampsites = model("RVCampsites", RVCampsitesSchema, "RVCampsites");

export default RVCampsites;
