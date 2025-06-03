import express from "express";
import { getData, updateData } from "../controllers/OurJourney.controller.js";

import verifyToken from "../middlewares/verifyToken.js";
import { upload } from "../upload/upload.js";

const OurJourneyRouter = express.Router();

OurJourneyRouter.get("/our-journey", getData);
OurJourneyRouter.patch(
  "/update-our-journey",
  verifyToken,
  upload.single("image"),
  updateData
);

export default OurJourneyRouter;
