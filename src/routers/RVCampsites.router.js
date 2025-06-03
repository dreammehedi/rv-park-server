import express from "express";
import {
  getData,
  getDataFrontend,
  updateData,
  viewData,
} from "../controllers/RVCampsites.controller.js";
import paginationMiddleware from "../middlewares/pagination.middleware.js";
import verifyToken from "../middlewares/verifyToken.js";
import { upload } from "../upload/upload.js";

const RVCampsitesRouter = express.Router();

RVCampsitesRouter.get("/get-rv-campsites", getDataFrontend);
RVCampsitesRouter.get("/rv-campsites", paginationMiddleware, getData);
// RVCampsitesRouter.post(
//   "/add-rv-campsites",
//   verifyToken,
//   upload.single("image"),
//   addData
// );
RVCampsitesRouter.patch(
  "/update-rv-campsites",
  verifyToken,
  upload.single("image"),
  updateData
);
// RVCampsitesRouter.delete("/delete-rv-campsites/:id", verifyToken, deleteData);
RVCampsitesRouter.get("/view-rv-campsites/:id", viewData);

export default RVCampsitesRouter;
