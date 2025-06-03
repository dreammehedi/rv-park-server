import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import createHttpError from "http-errors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import AboutUsRouter from "./routers/aboutUs.router.js";
import AdventureAndPeaceRouter from "./routers/AdventureAndPeace.router.js";
import AuthRouter from "./routers/auth.router.js";
import BookingRouter from "./routers/Booking.router.js";
import ContactUserRouter from "./routers/contactUser.router.js";
import EmailConfigurationRouter from "./routers/emailConfiguration.router.js";
import HeroBannerSliderRouter from "./routers/HeroBannerSlider.router.js";
import LocalAttractionRouter from "./routers/LocalAttraction.router.js";
import LocalWondersRouter from "./routers/LocalWonders.router.js";
import OurJourneyRouter from "./routers/OurJourney.router.js";
import OurJourneyItemRouter from "./routers/OurJourneyItem.router.js";
import RVCampsitesRouter from "./routers/RVCampsites.router.js";
import RVExperienceRouter from "./routers/RVExperience.router.js";
import SelfBookingRouter from "./routers/SelfBooking.router.js";
import SiteConfigurationRouter from "./routers/siteConfiguration.router.js";
import SpotsRvParkRouter from "./routers/SpotsRvPark.router.js";
import SubscribeRouter from "./routers/Subscribe.router.js";
import WhyChooseUsRouter from "./routers/WhyChooseUs.router.js";
const app = express();
// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Adjust the path if necessary

// middleware
app.use(express.json());

// Rate limiting configuration
const limiterApi = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 100, // max 100 requests 2 minutes
  message: "Too many requests from this IP, Please Try Again Later!",
});

// Middleware setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5176",
      "http://localhost:5000",
      "https://rv-park-frontend.vercel.app",
      "https://rv-park-backend-template.vercel.app",
      "https://rv-park-backend-api.vercel.app",
      "https://api.astepabovervpark.com",
      "https://admin.astepabovervpark.com",
      "https://www.astepabovervpark.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(limiterApi);

// Home route
app.get("/", (req, res) => {
  res.render("index", { title: "Home", message: "Welcome to RV Park!" });
});

// All router middleware
app.use("/api", AuthRouter);
app.use("/api", SiteConfigurationRouter);
app.use("/api", EmailConfigurationRouter);
app.use("/api", ContactUserRouter);
app.use("/api", LocalAttractionRouter);
app.use("/api", LocalWondersRouter);
app.use("/api", RVExperienceRouter);
app.use("/api", AdventureAndPeaceRouter);
app.use("/api", WhyChooseUsRouter);
app.use("/api", HeroBannerSliderRouter);
app.use("/api", AboutUsRouter);
app.use("/api", OurJourneyRouter);
app.use("/api", RVCampsitesRouter);
app.use("/api", BookingRouter);
app.use("/api", SubscribeRouter);
app.use("/api", OurJourneyItemRouter);
app.use("/api", SpotsRvParkRouter);
app.use("/api", SelfBookingRouter);

// 404 Not Found Handler
app.use((req, res, next) => {
  next(createHttpError(404, "Not Found!"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error!",
  });
});

export default app;
