import express from "express";
import {
  addData,
  deleteData,
  getData,
  getDataFrontend,
  updateData,
  viewData,
} from "../controllers/WhyChooseUs.controller.js";
import paginationMiddleware from "../middlewares/pagination.middleware.js";
import verifyToken from "../middlewares/verifyToken.js";
import { upload } from "../upload/upload.js";

const WhyChooseUsRouter = express.Router();

WhyChooseUsRouter.get("/get-why-choose-us", getDataFrontend);
WhyChooseUsRouter.get("/why-choose-us", paginationMiddleware, getData);
WhyChooseUsRouter.post(
  "/add-why-choose-us",
  verifyToken,
  upload.single("image"),
  addData
);
WhyChooseUsRouter.patch(
  "/update-why-choose-us",
  verifyToken,
  upload.single("image"),
  updateData
);
WhyChooseUsRouter.delete("/delete-why-choose-us/:id", verifyToken, deleteData);
WhyChooseUsRouter.get("/view-why-choose-us/:id", verifyToken, viewData);

export default WhyChooseUsRouter;
