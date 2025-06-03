import express from "express";
import multer from "multer";
import {
  getSubscribeUser,
  storeSubscribeUser,
} from "../controllers/Subscribe.controller.js";
import paginationMiddleware from "../middlewares/pagination.middleware.js";
const upload = multer();
const SubscribeRouter = express.Router();

SubscribeRouter.get("/subscribe", paginationMiddleware, getSubscribeUser);
SubscribeRouter.post("/subscribe", upload.none(), storeSubscribeUser);

export default SubscribeRouter;
