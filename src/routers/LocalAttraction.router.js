import express from "express";
import {
  addData,
  deleteData,
  getData,
  getDataFrontend,
  updateData,
  viewData,
} from "../controllers/LocalAttraction.controller.js";
import paginationMiddleware from "../middlewares/pagination.middleware.js";
import verifyToken from "../middlewares/verifyToken.js";
import { upload } from "../upload/upload.js";

const LocalAttractionRouter = express.Router();

LocalAttractionRouter.get("/get-local-attractions", getDataFrontend);
LocalAttractionRouter.get("/local-attractions", paginationMiddleware, getData);
LocalAttractionRouter.post(
  "/add-local-attraction",
  verifyToken,
  upload.single("image"),
  addData
);
LocalAttractionRouter.patch(
  "/update-local-attraction",
  verifyToken,
  upload.single("image"),
  updateData
);
LocalAttractionRouter.delete(
  "/delete-local-attraction/:id",
  verifyToken,
  deleteData
);
LocalAttractionRouter.get("/view-local-attraction/:id", viewData);

export default LocalAttractionRouter;
