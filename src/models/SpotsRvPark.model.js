import { model, Schema } from "mongoose";

const DateRangeSchema = new Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  { _id: false }
);

const AvailabilitySchema = new Schema(
  {
    available: {
      type: [DateRangeSchema],
      default: () => [
        {
          from: new Date().toISOString().split("T")[0], // e.g., "2025-04-19"
          to: "future",
        },
      ],
    },
    booked: {
      type: [DateRangeSchema],
      default: [],
    },
  },
  { _id: false }
);

const SpotsRvParkSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    coordination: {
      type: String,
      required: [true, "Short summary is required!"],
    },
    isAvailable: { type: Number, default: 1 },
    image: { type: String },
    imagePublicId: { type: String },
    status: { type: Number, default: 1 },
    availability: {
      type: AvailabilitySchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

const SpotsRvPark = model("SpotsRvPark", SpotsRvParkSchema, "SpotsRvPark");

export default SpotsRvPark;
