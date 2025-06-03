import express from "express";
import { addData, getData } from "../controllers/SelfBooking.controller.js";
import paginationMiddleware from "../middlewares/pagination.middleware.js";
import verifyToken from "../middlewares/verifyToken.js";
import { upload } from "../upload/upload.js";

const SelfBookingRouter = express.Router();

SelfBookingRouter.get("/self-booking", paginationMiddleware, getData);

SelfBookingRouter.post(
  "/add-self-booking",
  verifyToken,
  upload.none(),
  addData
);

export default SelfBookingRouter;
