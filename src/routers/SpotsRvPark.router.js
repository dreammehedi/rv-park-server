import express from "express";

import {
  addData,
  deleteData,
  getData,
  getDataFrontend,
  updateData,
  viewData,
} from "../controllers/SpotsRvPark.controller.js";
import paginationMiddleware from "../middlewares/pagination.middleware.js";
import verifyToken from "../middlewares/verifyToken.js";
import { upload } from "../upload/upload.js";
const SpotsRvParkRouter = express.Router();
SpotsRvParkRouter.get("/get-spots-rv-park", getDataFrontend);
SpotsRvParkRouter.get("/spots-rv-park", paginationMiddleware, getData);
SpotsRvParkRouter.post(
  "/add-spots-rv-park",
  verifyToken,
  upload.single("image"),
  addData
);
SpotsRvParkRouter.patch(
  "/update-spots-rv-park",
  verifyToken,
  upload.single("image"),
  updateData
);
SpotsRvParkRouter.delete("/delete-spots-rv-park/:id", verifyToken, deleteData);
SpotsRvParkRouter.get("/view-spots-rv-park/:id", verifyToken, viewData);

export default SpotsRvParkRouter;
