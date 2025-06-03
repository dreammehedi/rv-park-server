import { model, Schema } from "mongoose";

const OurJourneyItemSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    image: { type: String },
    imagePublicId: { type: String },
    status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const OurJourneyItem = model(
  "OurJourneyItem",
  OurJourneyItemSchema,
  "OurJourneyItem"
);

export default OurJourneyItem;
