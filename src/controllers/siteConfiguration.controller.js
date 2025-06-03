import {
  ContactFeedback,
  ContactInformation,
  GtmGaConfig,
  LogoAndFavicon,
  ReservationFeedback,
  SeoConfig,
  SiteConfig,
  SocialNetworks,
  StripePaymentConfig,
  SubscriptionFeedback,
} from "../models/siteConfiguration.model.js";

import cloudinary from "../config/cloudinary.config.js";
import AdventureAndPeace from "../models/AdventureAndPeace.model.js";
import Booking from "../models/Booking.model.js";
import ContactUser from "../models/contact.model.js";
import HeroBannerSlider from "../models/HeroBannerSlider.model.js";
import LocalAttraction from "../models/LocalAttraction.model.js";
import LocalWonders from "../models/LocalWonders.model.js";
import RVCampsites from "../models/RVCampsites.model.js";
import RVExperience from "../models/RVExperience.model.js";
import SpotsRvPark from "../models/SpotsRvPark.model.js";
import WhyChooseUs from "../models/WhyChooseUs.model.js";

const getSiteOverviewData = async (req, res) => {
  try {
    const heroBannerSliderCount = await HeroBannerSlider.countDocuments();
    const rvExperiencesCount = await RVExperience.countDocuments();
    const adventureAndPeaceCount = await AdventureAndPeace.countDocuments();
    const spotsRvParkCount = await SpotsRvPark.countDocuments();
    const localWondersCount = await LocalWonders.countDocuments();
    const whyChooseUsCount = await WhyChooseUs.countDocuments();
    const rvCampsitesCount = await RVCampsites.countDocuments();
    const localAttractionsCount = await LocalAttraction.countDocuments();
    const contactUsersCount = await ContactUser.countDocuments();
    const bookingCount = await Booking.countDocuments();

    const data = {
      heroBannerSlider: heroBannerSliderCount,
      rvExperiences: rvExperiencesCount,
      adventureAndPeace: adventureAndPeaceCount,
      spotsRvPark: spotsRvParkCount,
      localWonders: localWondersCount,
      whyChooseUs: whyChooseUsCount,
      rvCampsites: rvCampsitesCount,
      localAttractions: localAttractionsCount,
      contactUsers: contactUsersCount,
      bookings: bookingCount,
    };

    res.status(200).json({
      success: true,
      message: "Site overview data was successfully retrieved.",
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getData = async (req, res) => {
  try {
    const data = await SiteConfig.find();

    res.status(200).json({
      success: true,
      message: "Site configuration data was successfully retrieved.",
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id, title, description, copyRights } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid site configuration ID!",
      });
    }

    // Fetch the current site configuration data
    const data = await SiteConfig.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Site configuration not found!",
      });
    }

    // Update the database with the new fields
    await SiteConfig.findByIdAndUpdate(
      id,
      { title, description, copyRights },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Site configuration updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "An error occurred while updating the site configuration.",
    });
  }
};

const getSeoData = async (req, res) => {
  try {
    const data = await SeoConfig.find();

    res.status(200).json({
      success: true,
      message: "Seo configuration data was successfully retrieved.",
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSeoData = async (req, res) => {
  try {
    const { id, title, description, siteDescription, keywords } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid seo configuration ID!",
      });
    }

    // Fetch the current site configuration data
    const data = await SeoConfig.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Seo configuration not found!",
      });
    }

    // Update the database with the new fields
    await SeoConfig.findByIdAndUpdate(
      id,
      { title, description, siteDescription, keywords },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Seo configuration updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "An error occurred while updating the seo configuration.",
    });
  }
};

// contact information data
const getContactInformationData = async (req, res) => {
  try {
    const data = await ContactInformation.find();

    res.status(200).json({
      success: true,
      message: "Contact information data was successfully retrieved.",
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateContactInformationData = async (req, res) => {
  try {
    const { id, phoneNumber, googleApiKey, email, address } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    const data = await ContactInformation.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Contact information not found!",
      });
    }

    // Update the database with the new fields
    await ContactInformation.findByIdAndUpdate(
      id,
      { phoneNumber, googleApiKey, email, address },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Contact information updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "An error occurred while updating the contact information.",
    });
  }
};

// social networks data
const getSocialNetworksData = async (req, res) => {
  try {
    const data = await SocialNetworks.find();

    res.status(200).json({
      success: true,
      message: "Social networks data was successfully retrieved.",
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSocialNetworksData = async (req, res) => {
  try {
    const {
      id,
      facebookLink,
      linkedinLink,
      instagramLink,
      twitterLink,
      youtubeLink,
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    const data = await SocialNetworks.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Social networks not found!",
      });
    }

    // Update the database with the new fields
    await SocialNetworks.findByIdAndUpdate(
      id,
      {
        facebookLink,
        linkedinLink,
        instagramLink,
        twitterLink,
        youtubeLink,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Social networks updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "An error occurred while updating the social networks.",
    });
  }
};

// logo and favicon data
const getLogoAndFaviconData = async (req, res) => {
  try {
    const data = await LogoAndFavicon.find();

    res.status(200).json({
      success: true,
      message: "Logo and Favicon data was successfully retrieved.",
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addLogoAndFaviconData = async (req, res) => {
  try {
    const cloudinaryResult = req.files;
    const logoFile = cloudinaryResult.logo ? cloudinaryResult.logo[0] : null;
    const footerLogoFile = cloudinaryResult.footerLogo
      ? cloudinaryResult.footerLogo[0]
      : null;
    const faviconFile = cloudinaryResult.favicon
      ? cloudinaryResult.favicon[0]
      : null;

    if (!logoFile || !faviconFile || !footerLogoFile) {
      return res.status(400).json({
        success: false,
        message: "logo, footer logo and favicon files are required.",
      });
    }

    const newData = new LogoAndFavicon({
      favicon: faviconFile.path,
      faviconPublicId: faviconFile.filename,
      logo: logoFile.path,
      logoPublicId: logoFile.filename,
      footerLogo: logoFile.path,
      footerLogoPublicId: logoFile.filename,
    });
    // Save to database
    await newData.save();

    res.status(201).json({
      success: true,
      message: "Data added successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add data!",
    });
  }
};

const updateLogoAndFaviconData = async (req, res) => {
  try {
    const {
      id,
      logo,

      footerLogo,

      favicon,
    } = req.body;

    // Validate if ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    // Find existing data
    const data = await LogoAndFavicon.findById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    let updatedFields = { logo, footerLogo, favicon };
    // return;
    if (req.files) {
      try {
        const cloudinaryResult = req.files;
        const footerLogoFile = cloudinaryResult.footerLogo
          ? cloudinaryResult.footerLogo[0]
          : null;
        const logoFile = cloudinaryResult.logo
          ? cloudinaryResult.logo[0]
          : null;
        const faviconFile = cloudinaryResult.favicon
          ? cloudinaryResult.favicon[0]
          : null;

        // Handle footer logo update
        if (footerLogoFile) {
          if (data.footerLogoPublicId) {
            await cloudinary.uploader.destroy(data.footerLogoPublicId); // Delete old image
          }
          updatedFields.footerLogo = footerLogoFile.path; // Cloudinary URL for the image
          updatedFields.footerLogoPublicId = footerLogoFile.filename; // Cloudinary public ID
        }

        // Handle logo update
        if (logoFile) {
          if (data.logoPublicId) {
            await cloudinary.uploader.destroy(data.logoPublicId); // Delete old image
          }
          updatedFields.logo = logoFile.path; // Cloudinary URL for the image
          updatedFields.logoPublicId = logoFile.filename; // Cloudinary public ID
        }

        // Handle favicon update
        if (faviconFile) {
          if (data.faviconPublicId) {
            await cloudinary.uploader.destroy(data.faviconPublicId); // Delete old logo
          }
          updatedFields.favicon = faviconFile.path; // Cloudinary URL for the logo
          updatedFields.faviconPublicId = faviconFile.filename; // Cloudinary public ID
        }
      } catch (imageError) {
        return res.status(500).json({
          success: false,
          message: "File upload failed.",
          error: imageError.message,
        });
      }
    }

    // Update the document in the database
    const updatedData = await LogoAndFavicon.findByIdAndUpdate(
      id,
      updatedFields,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while updating the data!",
    });
  }
};

// stripe config data
const getStripeConfigData = async (req, res) => {
  try {
    const data = await StripePaymentConfig.find();

    res.status(200).json({
      success: true,
      message: "Stripe config data was successfully retrieved.",
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStripeConfigData = async (req, res) => {
  try {
    const { id, stripeKey, stripeSecret, stripeMethod } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    const data = await StripePaymentConfig.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Stripe config not found!",
      });
    }

    // Update the database with the new fields
    await StripePaymentConfig.findByIdAndUpdate(
      id,
      { stripeKey, stripeSecret, stripeMethod },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Stripe config updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while updating the stripe config.",
    });
  }
};

const getReservationFeedback = async (req, res) => {
  try {
    const data = await ReservationFeedback.find();

    res.status(200).json({
      success: true,
      message: "Data was successfully retrieved.",
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateReservationFeedback = async (req, res) => {
  try {
    const { id, subject, body } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    const data = await ReservationFeedback.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    // Update the database with the new fields
    await ReservationFeedback.findByIdAndUpdate(
      id,
      { subject, body },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Data updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while updating the data.",
    });
  }
};

const getSubscribeFeedback = async (req, res) => {
  try {
    const data = await SubscriptionFeedback.find();

    res.status(200).json({
      success: true,
      message: "Data was successfully retrieved.",
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSubscribeFeedback = async (req, res) => {
  try {
    const { id, subject, body } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    const data = await SubscriptionFeedback.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    // Update the database with the new fields
    await SubscriptionFeedback.findByIdAndUpdate(
      id,
      { subject, body },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Data updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while updating the data.",
    });
  }
};

const getContactFeedback = async (req, res) => {
  try {
    const data = await ContactFeedback.find();

    res.status(200).json({
      success: true,
      message: "Data was successfully retrieved.",
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateContactFeedback = async (req, res) => {
  try {
    const { id, subject, body } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    const data = await ContactFeedback.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    // Update the database with the new fields
    await ContactFeedback.findByIdAndUpdate(
      id,
      { subject, body },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Data updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while updating the data.",
    });
  }
};

const getGtmGaData = async (req, res) => {
  try {
    const data = await GtmGaConfig.find();

    res.status(200).json({
      success: true,
      message: "Data was successfully retrieved.",
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateGtmGaData = async (req, res) => {
  try {
    const { id, gtmId, gaId } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    const data = await GtmGaConfig.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    // Update the database with the new fields
    await GtmGaConfig.findByIdAndUpdate(
      id,
      { gtmId, gaId },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Data updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while updating the data.",
    });
  }
};
export {
  addLogoAndFaviconData,
  getContactFeedback,
  getContactInformationData,
  getData,
  getGtmGaData,
  getLogoAndFaviconData,
  getReservationFeedback,
  getSeoData,
  getSiteOverviewData,
  getSocialNetworksData,
  getStripeConfigData,
  getSubscribeFeedback,
  updateContactFeedback,
  updateContactInformationData,
  updateData,
  updateGtmGaData,
  updateLogoAndFaviconData,
  updateReservationFeedback,
  updateSeoData,
  updateSocialNetworksData,
  updateStripeConfigData,
  updateSubscribeFeedback,
};
