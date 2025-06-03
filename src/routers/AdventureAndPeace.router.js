import express from "express";
import {
  addData,
  deleteData,
  getData,
  getDataFrontend,
  updateData,
  viewData,
} from "../controllers/AdventureAndPeace.controller.js";
import paginationMiddleware from "../middlewares/pagination.middleware.js";
import verifyToken from "../middlewares/verifyToken.js";
import { upload } from "../upload/upload.js";

const AdventureAndPeaceRouter = express.Router();

AdventureAndPeaceRouter.get("/get-adventure-and-peace", getDataFrontend);
AdventureAndPeaceRouter.get(
  "/adventure-and-peace",
  paginationMiddleware,
  getData
);
AdventureAndPeaceRouter.post(
  "/add-adventure-and-peace",
  verifyToken,
  upload.single("image"),
  addData
);
AdventureAndPeaceRouter.patch(
  "/update-adventure-and-peace",
  verifyToken,
  upload.single("image"),
  updateData
);
AdventureAndPeaceRouter.delete(
  "/delete-adventure-and-peace/:id",
  verifyToken,
  deleteData
);
AdventureAndPeaceRouter.get("/view-adventure-and-peace/:id", viewData);

export default AdventureAndPeaceRouter;
