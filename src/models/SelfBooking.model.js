import { model, Schema } from "mongoose";

const SelfBookingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    checkInDate: {
      type: Date,
      required: [true, "Check-in date is required!"],
    },
    checkOutDate: {
      type: Date,
      required: [true, "Check-out date is required!"],
    },
    reason: {
      type: String,
      required: [true, "Reason is required!"],
    },
    spot: {
      type: Schema.Types.ObjectId,
      ref: "SpotsRvPark",
      required: [true, "Spot reference is required!"],
    },
  },
  { timestamps: true }
);

const SelfBooking = model("SelfBooking", SelfBookingSchema, "SelfBooking");

export default SelfBooking;
