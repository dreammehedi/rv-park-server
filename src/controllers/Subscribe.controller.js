import nodemailer from "nodemailer";
import decrypt from "../helper/decrypt.js";
import {
  ContactInformation,
  LogoAndFavicon,
  SubscriptionFeedback,
} from "../models/siteConfiguration.model.js";
import Subscribe from "../models/Subscribe.model.js";
import EmailConfiguration from "./../models/emailConfigurationModal.js";

const getSubscribeUser = async (req, res) => {
  try {
    const { skip, limit } = req.pagination;
    const search = req.query.search || "";
    const searchRegex = new RegExp(search, "i");

    // Build the base query
    let query = {
      $or: [{ email: searchRegex }],
    };

    const data = await Subscribe.find(query).skip(skip).limit(limit);
    const totalDataCount = await Subscribe.countDocuments(query);

    // Respond with the data
    res.status(200).json({
      success: true,
      payload: data,
      pagination: {
        totalData: totalDataCount,
        totalPages: Math.ceil(totalDataCount / limit),
        currentPage: req.pagination.page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const storeSubscribeUser = async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    // Query email configuration from the database
    const emailConfig = await EmailConfiguration.findOne();
    if (!emailConfig) {
      return res.status(500).json({
        success: false,
        message: "Email configuration not found",
      });
    }

    const {
      emailUserName,
      emailPassword,
      emailHost,
      emailPort,
      emailFromName,
    } = emailConfig;

    const checkAlreadyExists = await Subscribe.find({ email });
    if (checkAlreadyExists.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Encrypt the password
    const decryptedPassword = decrypt(emailPassword);

    // Send confirmation email using dynamic configuration
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailConfig.emailEncryption.includes("ssl"),
      auth: {
        user: emailUserName,
        pass: decryptedPassword,
      },
    });
    const contactInformationData = await ContactInformation.find();
    const logoAndFaviconData = await LogoAndFavicon.find();
    const subscribeData = await SubscriptionFeedback.find();

    const mailOptions = {
      from: `${emailFromName} <${emailUserName}>`,
      to: email,
      subject: subscribeData[0]?.subject || "Subscription Confirmation",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #fff; color: #000; line-height: 1.6; margin: 0; padding: 0; }
            .container { max-width: 650px; margin: 20px auto; padding: 30px; background: #fff; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; padding-bottom: 30px; }
            .header img { max-width: 180px; height: auto; }
            h2 { color: #fca500; font-size: 32px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
            p { margin: 12px 0; font-size: 16px; color: #333; }
            a { color: #fca500; text-decoration: none; font-weight: 600; transition: color 0.3s; }
            a:hover { color: #cc8500; text-decoration: underline; }
            .footer { text-align: center; font-size: 13px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
            .btn { display: inline-block; padding: 10px 20px; background-color: #fca500; color: #fff; text-decoration: none; margin-top: 20px; font-weight: 600; transition: background-color 0.3s; }
            .btn:hover { background-color: #cc8500; color: #fff; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="${logoAndFaviconData[0]?.logo}" alt="A Step Above RV Park Logo" />
            </div>
            <h2>You're Subscribed!</h2>
            <p>Hey there,</p>
            <p>${subscribeData[0]?.body}</p>
            
            <p>Best regards,</p>
            <div class="footer">
              <p>A Step Above RV Park | Lake Harmony, PA | Email: <a href="mailto:${contactInformationData[0]?.email}">${contactInformationData[0]?.email}</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    {
      /* <p>Thanks for subscribing to A Step Above RV Park's newsletter. We're excited to have you on board!</p>
            <p>You’ll now receive updates on special offers, events, and the latest news from our park.</p>
            <p>If you have any questions or need assistance, feel free to reach out to us.</p> */
    }

    await transporter.sendMail(mailOptions);
    // Save email to database
    const newSubscribeUser = new Subscribe({ email });
    await newSubscribeUser.save();

    res
      .status(200)
      .json({ success: true, message: "Subscription successful!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while subscription.",
    });
  }
};

export { getSubscribeUser, storeSubscribeUser };
