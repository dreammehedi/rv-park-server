import { model, Schema } from "mongoose";

const AdventureAndPeaceSchema = new Schema(
  {
    lat: { type: String, required: [true, "Latitude is required!"] },
    long: { type: String, required: [true, "Longitude is required!"] },
    title: { type: String, required: [true, "Title is required!"] },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    proximity: {
      type: [String],
      required: [true, "Proximity is required!"],
    },
    nearbyPoints: {
      type: [String],
      required: [true, "Nearby Points are required!"],
    },
    distanceFrom: {
      type: String,
      required: [true, "Distance From is required!"],
    },
    image: { type: String },
    imagePublicId: { type: String },
    status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const AdventureAndPeace = model(
  "AdventureAndPeace",
  AdventureAndPeaceSchema,
  "AdventureAndPeace"
);

export default AdventureAndPeace;
