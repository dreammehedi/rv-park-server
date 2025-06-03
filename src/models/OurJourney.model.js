import { model, Schema } from "mongoose";

const OurJourneySchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    journeyItems: [
      {
        title: {
          type: String,
          required: [true, "Journey item title is required!"],
        },
        image: { type: String },
        imagePublicId: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const OurJourney = model("OurJourney", OurJourneySchema, "OurJourney");

export default OurJourney;
