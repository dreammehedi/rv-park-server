import express from "express";
import {
  addData,
  deleteData,
  getData,
  getDataFrontend,
  updateData,
  viewData,
} from "../controllers/OurJourneyItem.controller.js";
import paginationMiddleware from "../middlewares/pagination.middleware.js";
import verifyToken from "../middlewares/verifyToken.js";
import { upload } from "../upload/upload.js";

const OurJourneyItemRouter = express.Router();

OurJourneyItemRouter.get("/get-our-journey-item", getDataFrontend);
OurJourneyItemRouter.get("/our-journey-item", paginationMiddleware, getData);
OurJourneyItemRouter.post(
  "/add-our-journey-item",
  verifyToken,
  upload.single("image"),
  addData
);
OurJourneyItemRouter.patch(
  "/update-our-journey-item",
  verifyToken,
  upload.single("image"),
  updateData
);
OurJourneyItemRouter.delete(
  "/delete-our-journey-item/:id",
  verifyToken,
  deleteData
);
OurJourneyItemRouter.get("/view-our-journey-item/:id", verifyToken, viewData);

export default OurJourneyItemRouter;
