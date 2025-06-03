import express from "express";
import {
  addData,
  deleteData,
  getData,
  getDataFrontend,
  updateData,
  viewData,
} from "../controllers/LocalWonders.controller.js";
import paginationMiddleware from "../middlewares/pagination.middleware.js";
import verifyToken from "../middlewares/verifyToken.js";
import { upload } from "../upload/upload.js";

const LocalWondersRouter = express.Router();

LocalWondersRouter.get("/get-local-wonders", getDataFrontend);
LocalWondersRouter.get("/local-wonders", paginationMiddleware, getData);
LocalWondersRouter.post(
  "/add-local-wonder",
  verifyToken,
  upload.single("image"),
  addData
);
LocalWondersRouter.patch(
  "/update-local-wonder",
  verifyToken,
  upload.single("image"),
  updateData
);
LocalWondersRouter.delete("/delete-local-wonder/:id", verifyToken, deleteData);
LocalWondersRouter.get("/view-local-wonder/:id", verifyToken, viewData);

export default LocalWondersRouter;
