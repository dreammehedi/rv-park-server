import express from "express";
import {
  addData,
  deleteData,
  getData,
  getDataFrontend,
  updateData,
  viewData,
} from "../controllers/RVExperience.controller.js";
import paginationMiddleware from "../middlewares/pagination.middleware.js";
import verifyToken from "../middlewares/verifyToken.js";
import { upload } from "../upload/upload.js";

const RVExperienceRouter = express.Router();

RVExperienceRouter.get("/get-rv-experiences", getDataFrontend);
RVExperienceRouter.get("/rv-experiences", paginationMiddleware, getData);
RVExperienceRouter.post(
  "/add-rv-experience",
  verifyToken,
  upload.single("image"),
  addData
);
RVExperienceRouter.patch(
  "/update-rv-experience",
  verifyToken,
  upload.single("image"),
  updateData
);
RVExperienceRouter.delete("/delete-rv-experience/:id", verifyToken, deleteData);
RVExperienceRouter.get("/view-rv-experience/:id", verifyToken, viewData);

export default RVExperienceRouter;
