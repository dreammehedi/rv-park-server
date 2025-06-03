import { model, Schema } from "mongoose";

const SiteConfigSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    copyRights: { type: String, required: [true, "Copyrights is required!"] },
  },
  { timestamps: true }
);

const SeoConfigSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    siteDescription: {
      type: String,
      required: [true, "Site Description is required!"],
    },
    keywords: {
      type: String,
      required: [true, "Keywords is required!"],
    },
  },
  { timestamps: true }
);

const SubscribeFeedbackSchema = new Schema(
  {
    subject: { type: String, required: [true, "Subject is required!"] },
    body: {
      type: String,
      required: [true, "Body is required!"],
    },
  },
  { timestamps: true }
);

const ContactFeedbackSchema = new Schema(
  {
    subject: { type: String, required: [true, "Subject is required!"] },
    body: {
      type: String,
      required: [true, "Body is required!"],
    },
  },
  { timestamps: true }
);

const ReservationFeedbackSchema = new Schema(
  {
    subject: { type: String, required: [true, "Subject is required!"] },
    body: {
      type: String,
      required: [true, "Body is required!"],
    },
  },
  { timestamps: true }
);

const ContactInformationSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required!"],
    },
    googleApiKey: {
      type: String,
      required: [true, "Google map api key is required!"],
    },
    email: { type: String, required: [true, "Email is required!"] },
    address: { type: String, required: [true, "Address is required!"] },
  },
  { timestamps: true }
);

const SocialNetworksSchema = new Schema(
  {
    facebookLink: {
      type: String,
      required: [true, "Facebook link is required!"],
    },
    linkedinLink: {
      type: String,
      required: [true, "Linkedin link is required!"],
    },
    instagramLink: {
      type: String,
      required: [true, "Instagram link is required!"],
    },
    twitterLink: {
      type: String,
      //   required: [true, "Twitter link is required!"],
    },
    youtubeLink: {
      type: String,
      required: [true, "Youtube link is required!"],
    },
  },
  { timestamps: true }
);

const StripePaymentSchema = new Schema(
  {
    stripeKey: {
      type: String,
      required: [true, "Stripe key is required!"],
    },
    stripeSecret: {
      type: String,
      required: [true, "Stripe secret is required!"],
    },
    stripeMethod: {
      type: String,
      required: [true, "Stripe method is required!"],
    },
  },
  { timestamps: true }
);

const GtmGaSchema = new Schema(
  {
    gtmId: {
      type: String,
      required: [true, "GTM id is required!"],
    },
    gaId: {
      type: String,
      required: [true, "GA id is required!"],
    },
  },
  { timestamps: true }
);

const LogoAndFaviconSchema = new Schema(
  {
    logo: { type: String },
    logoPublicId: { type: String },
    footerLogo: { type: String },
    footerLogoPublicId: { type: String },
    favicon: { type: String },
    faviconPublicId: { type: String },
  },
  { timestamps: true }
);

const SiteConfig = model("SiteConfig", SiteConfigSchema, "SiteConfig");
const SeoConfig = model("SeoConfig", SeoConfigSchema, "SeoConfig");
const GtmGaConfig = model("GtmGaConfig", GtmGaSchema, "GtmGaConfig");
const ReservationFeedback = model(
  "ReservationFeedback",
  ReservationFeedbackSchema,
  "ReservationFeedback"
);

const SubscriptionFeedback = model(
  "SubscriptionFeedback",
  SubscribeFeedbackSchema,
  "SubscriptionFeedback"
);

const ContactFeedback = model(
  "ContactFeedback",
  ContactFeedbackSchema,
  "ContactFeedback"
);

const ContactInformation = model(
  "ContactInformation",
  ContactInformationSchema,
  "ContactInformation"
);

const SocialNetworks = model(
  "SocialNetworks",
  SocialNetworksSchema,
  "SocialNetworks"
);

const LogoAndFavicon = model(
  "LogoAndFavicon",
  LogoAndFaviconSchema,
  "LogoAndFavicon"
);

const StripePaymentConfig = model(
  "StripePaymentConfig",
  StripePaymentSchema,
  "StripePaymentConfig"
);

export {
  ContactFeedback,
  ContactFeedbackSchema,
  ContactInformation,
  GtmGaConfig,
  LogoAndFavicon,
  ReservationFeedback,
  SeoConfig,
  SiteConfig,
  SocialNetworks,
  StripePaymentConfig,
  SubscriptionFeedback,
};
