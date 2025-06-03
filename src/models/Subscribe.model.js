import { model, Schema } from "mongoose";

const SubscribeSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Subscribe = model("Subscribe", SubscribeSchema, "Subscribe");
export default Subscribe;
