const nodemailer = require("nodemailer");
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();
//const { verifyToken, verifyUser } = require("../middleware/authMiddleware");
//const { ARTICLE_FEEDBACK, ARTICLE_PUBLISH, ARTICLE_DISCARDED_FROM_SYSTEM, ARTICLE_DISCARDED_IN_REVIEW_STATE_NO_ACTION, PODCAST_PUBLISH, PODCAST_DISCARDED_FROM_SYSTEM, PODCAST_DISCARDED } = require("../utils/emailBody");
const jwt = require("jsonwebtoken");
const UnverifiedUser = require("../models/UnverifiedUserModel");
const User = require("../models/UserModel");
const Admin = require("../models/admin/adminModel");
const cache = require("memory-cache");
const statusEnum = require("../utils/StatusEnum");
const cooldownTime = 3600;
const path = require("path");
const {
  generateVerificationToken,
  verifyVerificationToken,
  hashToken,
} = require("../services/security/tokenService");

const { throwError } = require("../utils/throwError");
const { sendSuccess } = require("../utils/response");
const { HTTP_STATUS, ERROR_CODES } = require("../constants/errorConstants");
const { ROLES } = require("../constants/roles");
const { verifiedUserHtmlContent } = require("../templates/verification");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const getAdminAgreementHTML = async () => {
  try {
    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "admin-agreement.html",
    );

    const html = await fs.promises.readFile(filePath, "utf-8");

    return html;
  } catch (error) {
    console.error("Error reading HTML file:", error);
    throw new Error("Failed to load agreement HTML");
  }
};

const sendVerificationEmail = (email, token) => {
  const cooldownKey = `verification-email:${email}`;
  cache.put(cooldownKey, true, cooldownTime * 1000);

  const url = `${process.env.PROD_URL}/api/user/verifyEmail?token=${token}&isAdmin=${isAdmin}`;
  console.log("URL", url);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `<h3>Please verify your email by clicking the link below:</h3><a href="${url}">${url}</a>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

const sendContributorVerificationEmail = (email, password) => {
  // const verifyUrl = `${process.env.PROD_URL}/api/user/verifyEmail?token=${token}&isAdmin=${isAdmin}`;
  const deleteAccountUrl = `https://uhsocial.in/api/delete-account`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Contribution Acknowledgement – UltimateHealth",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to UltimateHealth 👋</h2>

        <p>
          This email serves as an acknowledgement that your articles and contributions
          are going to be published soon on <strong>UltimateHealth</strong>.
        </p>

        <h3>Account Details</h3>
        <ul>
          <li><strong>Username:</strong> ${email}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>

        <p style="color: #555;">
          Your password is securely stored and used only for authentication purposes.
          Please do not share it with anyone.
        </p>

        <h3>Install the UltimateHealth App</h3>
        <p>
          To access your dashboard and manage your contributions, install the
          UltimateHealth app using the link below:
        </p>
        <p>
          <a href="https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth" target="_blank">Install UltimateHealth App</a>
        </p>

        <h3>Consent & Data Usage</h3>
        <p>
          By continuing to use UltimateHealth, you consent to publishing your
          contributions under your account. Public contributor information may be
          collected from your GitHub account for attribution and verification purposes.
        </p>

        <h3>Account Deletion</h3>
        <p>
          Participation is voluntary. If you choose to discontinue, you may delete your
          account using the link below. Please note that deleting your account will
          permanently remove all your contributions from our platform.
        </p>
        <p>
          <a href="${deleteAccountUrl}" target="_blank">Delete My Account</a>
        </p>

        <p>Thank you for contributing to UltimateHealth 🚀</p>

        <p style="margin-top: 24px;">
          — Team UltimateHealth
        </p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

const Sendverifymail = async (req, res) => {
  const { email, token, isAdmin } = req.body;

  if (!email || !token) {
    return res.status(400).json({ message: "Email and token are required" });
  }
  console.log("Verify email admin", isAdmin);
  let user;
  if (isAdmin) {
    user = await admin.findOne({ email });
  } else {
    user = await UnverifiedUser.findOne({ email: email });
  }

  const cooldownKey = `verification-email:${email}`;

  if (cache.get(cooldownKey)) {
    return res.status(429).json({ message: "Verification email already sent" });
  }

  cache.put(cooldownKey, "true", cooldownTime * 1000); // store for 1 hour

  if (!user || user.isVerified) {
    return res
      .status(400)
      .json({ message: "User not found or already verified" });
  } else {
    sendVerificationEmail(email, token, isAdmin);
  }

  res.status(200).json({ message: "Verification email sent" });
};

// const resendVerificationEmail = async (req, res) => {
//   const { email, isAdmin } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   let user;

//   if (isAdmin) {
//     user = await admin.findOne({ email });
//   } else {
//     user = await UnverifiedUser.findOne({ email: email });
//   }

//   if (!user || user.isVerified) {
//     return res.status(400).json({ message: 'User not found or already verified' });
//   }

//   const verificationToken = generateVerificationToken({ email });
//   sendVerificationEmail(email, verificationToken, isAdmin);

//   const cooldownKey = `resend-verification-email:${email}`;

//   if (cache.get(cooldownKey)) {
//     return res.status(429).json({ message: 'Verification email already sent' });
//   }

//   cache.put(cooldownKey, 'true', cooldownTime * 1000); // store for 1 hour

//   res.status(200).json({ message: 'Verification email sent' });
// };

const resendVerificationEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.validateBody;

  const successMessage = "If account exists, verification email has been sent.";

  const cooldownKey = `verification-email:${email}`;

  if (cache.get(cooldownKey)) {
    return sendSuccess(res, HTTP_STATUS.OK, successMessage);
  }

  const [unverifiedUser, admin] = await Promise.all([
    UnverifiedUser.findOne({ email }),
    Admin.findOne({ email }),
  ]);

  const account = unverifiedUser || admin;

  if (!account) {
    return sendSuccess(res, HTTP_STATUS.OK, successMessage);
  }

  if (admin && admin.isVerified) {
    return sendSuccess(res, HTTP_STATUS.OK, successMessage);
  }

  const verificationToken = generateVerificationToken({
    email: account.email,
    role: admin ? "ADMIN" : account.isDoctor ? "DOCTOR" : "USER",
  });
  if (process.env.NODE_ENV === "development") {
    console.log("Generated verification token:", verificationToken);
  }

  if (process.env.NODE_ENV === "production") {
    await sendVerificationEmail(email, verificationToken, !!admin);
  }
  cache.put(cooldownKey, true, cooldownTime * 1000);

  return sendSuccess(res, HTTP_STATUS.OK, successMessage);
});

//verify email functionality
const verifyEmail = expressAsyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token || typeof token !== "string" || !token.trim()) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.MISSING_REQUIRED_FIELD,
      "Verification token is required",
    );
  }

  const decoded = verifyVerificationToken(token);
  const { role, email, jti } = decoded;

  if (role === ROLES.ADMIN) {
    const adminUser = await Admin.findOne({ email });

    if (!adminUser) {
      throwError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.TOKEN_INVALID,
        "Admin user not found",
      );
    }

    return res.redirect(`/admin-agreement.html#token=${token}`);
  }

  const hashedJti = hashToken(jti);

  const unverifiedUser = await UnverifiedUser.findOne({
    email,
    hashedJti,
  });

  if (!unverifiedUser) {
    throwError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.TOKEN_INVALID,
      "Either email already verified or register first",
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    await UnverifiedUser.deleteOne({ _id: unverifiedUser._id });

    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.USER_ALREADY_EXISTS,
      "User already verified",
    );
  }

  await User.create({
    user_name: unverifiedUser.user_name,
    user_handle: unverifiedUser.user_handle,
    email: unverifiedUser.email,
    password: unverifiedUser.password,
    isDoctor: unverifiedUser.isDoctor,
    specialization: unverifiedUser.specialization,
    qualification: unverifiedUser.qualification,
    Years_of_experience: unverifiedUser.Years_of_experience,
    contact_detail: unverifiedUser.contact_detail,
    Profile_image: unverifiedUser.Profile_image,
    isVerified: true,
  });

  await UnverifiedUser.deleteOne({
    _id: unverifiedUser._id,
    hashedJti,
  });

  return res.send(verifiedUserHtmlContent);
});

const sendArticleFeedbackEmail = (email, feedback, title) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `New Feedback on Your Article: ${title}`,
    html: `<html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            line-height: 1.6;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f7fc;
                        }
                        .container {
                            width: 80%;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #00BFFF;
                            color: white;
                            padding: 15px;
                            border-radius: 8px 8px 0 0;
                            text-align: center;
                        }
                        .header h1 {
                            font-size: 24px;
                            margin: 0;
                        }
                        .content {
                            padding: 20px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 14px;
                            color: #777;
                            padding: 10px;
                        }
                        .note {
                            background-color: #ffecb3;
                            padding: 10px;
                            border-left: 5px solid #ffb300;
                            margin-top: 20px;
                        }
                        .btn {
                            background-color: #28a745;
                            color: white;
                            padding: 10px 20px;
                            border-radius: 5px;
                            text-decoration: none;
                            display: inline-block;
                            margin-top: 20px;
                        }
                        .btn:hover {
                            background-color: #218838;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1> Feedback for ${title}</h1>
                        </div>
                        <div class="content">
                            <p>Dear Author,</p>
                            <p>I hope this message finds you well!</p>
                            <p>We have reviewed your article titled <strong>${title}</strong> and would like to provide some feedback:</p>

                            <p><strong>Feedback:</strong></p>
                            <p>${feedback}</p>

                            <p>We believe your article has great potential, and with a few adjustments, it will be even more impactful. Please review the feedback and feel free to reach out if you need further clarification.</p>

                            <div class="note">
                                <p><strong>Note:</strong> If no action is taken within 4 days, the article will automatically be discarded from our review process.</p>
                            </div>

                            <p>We look forward to your revised article. Please don't hesitate to get in touch if you have any questions!</p>
        
                        </div>
                        <div class="footer">
                            <p>Best regards,<br>UltimateHealth Team</p>
                        </div>
                    </div>
                </body>
            </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

const sendArticleForReviewEmail = (email, title) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Your Article ${title} Has Been Submitted for Review`,
    html: `<html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            line-height: 1.6;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f7fc;
                        }
                        .container {
                            width: 80%;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #00BFFF;
                            color: white;
                            padding: 15px;
                            border-radius: 8px 8px 0 0;
                            text-align: center;
                        }
                        .header h1 {
                            font-size: 24px;
                            margin: 0;
                        }
                        .content {
                            padding: 20px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 14px;
                            color: #777;
                            padding: 10px;
                        }
                        .note {
                            background-color: #e3f2fd;
                            padding: 10px;
                            border-left: 5px solid #2196f3;
                            margin-top: 20px;
                        }
                        .status {
                            background-color: #fff3cd;
                            padding: 10px;
                            border-left: 5px solid #ffc107;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Article Submitted for Review</h1>
                        </div>
                        <div class="content">
                            <p>Dear Author,</p>
                            <p>Thank you for submitting your article titled <strong>${title}</strong>.</p>

                            <div class="status">
                                <p><strong>Status:</strong> Your article is currently under review by our editorial team.</p>
                            </div>

                            <p>Our team will carefully evaluate your submission for quality, relevance, and accuracy. This process typically takes 2–4 working days.</p>

                            <div class="note">
                                <p><strong>What’s Next?</strong> You will receive an email notification once the review process is complete — whether it is approved, requires revisions, or not selected.</p>
                            </div>

                            <p>We appreciate your contribution and look forward to publishing high-quality content from talented writers like you.</p>
                        </div>
                        <div class="footer">
                            <p>Best regards,<br>UltimateHealth Team</p>
                        </div>
                    </div>
                </body>
            </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Review submission email sent:", info.response);
    }
  });
};

const sendPodcastForReviewEmail = (email, title) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Your Podcast ${title} Has Been Submitted for Review`,
    html: `<html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            line-height: 1.6;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f7fc;
                        }
                        .container {
                            width: 80%;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #00BFFF;
                            color: white;
                            padding: 15px;
                            border-radius: 8px 8px 0 0;
                            text-align: center;
                        }
                        .header h1 {
                            font-size: 24px;
                            margin: 0;
                        }
                        .content {
                            padding: 20px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 14px;
                            color: #777;
                            padding: 10px;
                        }
                        .note {
                            background-color: #e3f2fd;
                            padding: 10px;
                            border-left: 5px solid #2196f3;
                            margin-top: 20px;
                        }
                        .status {
                            background-color: #fff3cd;
                            padding: 10px;
                            border-left: 5px solid #ffc107;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Podcast Submitted for Review</h1>
                        </div>
                        <div class="content">
                            <p>Dear Creator,</p>
                            <p>Thank you for submitting your podcast titled <strong>${title}</strong>.</p>

                            <div class="status">
                                <p><strong>Status:</strong> Your podcast is currently under review by our editorial team.</p>
                            </div>

                            <p>Our team will carefully evaluate your submission for audio quality, content accuracy, and relevance. This process typically takes 2–4 working days.</p>

                            <div class="note">
                                <p><strong>What’s Next?</strong> You will receive an email notification once the review process is complete — whether it is approved, requires revisions, or not selected.</p>
                            </div>

                            <p>We appreciate your contribution and look forward to sharing impactful audio content with our community.</p>
                        </div>
                        <div class="footer">
                            <p>Best regards,<br>UltimateHealth Team</p>
                        </div>
                    </div>
                </body>
            </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Podcast review submission email sent:", info.response);
    }
  });
};

const pickPodcastMail = (email, title) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Your Podcast ${title} Has Been Picked for Review`,
    html: `<html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            line-height: 1.6;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f7fc;
                        }
                        .container {
                            width: 80%;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #00BFFF;
                            color: white;
                            padding: 15px;
                            border-radius: 8px 8px 0 0;
                            text-align: center;
                        }
                        .header h1 {
                            font-size: 24px;
                            margin: 0;
                        }
                        .content {
                            padding: 20px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 14px;
                            color: #777;
                            padding: 10px;
                        }
                        .status {
                            background-color: #e8f5e9;
                            padding: 10px;
                            border-left: 5px solid #28a745;
                            margin-top: 20px;
                        }
                        .note {
                            background-color: #fff3cd;
                            padding: 10px;
                            border-left: 5px solid #ffc107;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Podcast Picked for Review</h1>
                        </div>
                        <div class="content">
                            <p>Dear Creator,</p>
                            <p>Great news! 🎉</p>
                            <p>Your podcast titled <strong>${title}</strong> has been picked by our editorial team for detailed review.</p>

                            <div class="status">
                                <p><strong>Status Update:</strong> Your podcast is now actively being reviewed by one of our editors.</p>
                            </div>

                            <p>This means your submission has successfully passed the initial screening stage and is moving forward in our publishing workflow.</p>

                            <div class="note">
                                <p><strong>Next Step:</strong> You will receive further updates once the review process is complete. Please keep an eye on your email.</p>
                            </div>

                            <p>Thank you for contributing your valuable content to UltimateHealth. We truly appreciate your effort and creativity.</p>
                        </div>
                        <div class="footer">
                            <p>Best regards,<br>UltimateHealth Team</p>
                        </div>
                    </div>
                </body>
            </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Pick podcast email sent:", info.response);
    }
  });
};

const pickArticleMail = (email, title) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Your Article ${title} Has Been Picked for Review`,
    html: `<html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            line-height: 1.6;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f7fc;
                        }
                        .container {
                            width: 80%;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #00BFFF;
                            color: white;
                            padding: 15px;
                            border-radius: 8px 8px 0 0;
                            text-align: center;
                        }
                        .header h1 {
                            font-size: 24px;
                            margin: 0;
                        }
                        .content {
                            padding: 20px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 14px;
                            color: #777;
                            padding: 10px;
                        }
                        .status {
                            background-color: #e8f5e9;
                            padding: 10px;
                            border-left: 5px solid #28a745;
                            margin-top: 20px;
                        }
                        .note {
                            background-color: #fff3cd;
                            padding: 10px;
                            border-left: 5px solid #ffc107;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Article Picked for Review</h1>
                        </div>
                        <div class="content">
                            <p>Dear Author,</p>
                            <p>Good news! 🎉</p>
                            <p>Your article titled <strong>${title}</strong> has been picked by our editorial team for detailed review.</p>

                            <div class="status">
                                <p><strong>Status Update:</strong> Your article is now actively being reviewed by one of our editors.</p>
                            </div>

                            <p>This means your submission has passed the initial screening and is progressing in our publishing workflow.</p>

                            <div class="note">
                                <p><strong>Next Step:</strong> You will be notified once the review process is complete. Please keep an eye on your email for updates.</p>
                            </div>

                            <p>Thank you for contributing to UltimateHealth. We truly appreciate your effort and creativity.</p>
                        </div>
                        <div class="footer">
                            <p>Best regards,<br>UltimateHealth Team</p>
                        </div>
                    </div>
                </body>
            </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Pick article email sent:", info.response);
    }
  });
};

// Later will centralize all email body, once the thing is integrated in frontend
const sendArticlePublishedEmail = (email, articleLink, title) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `New Feedback on Your Article: ${title}`,
    html: `<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f7fc;
            }
            .container {
                width: 80%;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #00BFFF;
                color: white;
                padding: 15px;
                border-radius: 8px 8px 0 0;
                text-align: center;
            }
            .header h1 {
                font-size: 24px;
                margin: 0;
            }
            .content {
                padding: 20px;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #777;
                padding: 10px;
            }
            .note {
                background-color: #e7f4e7;
                padding: 10px;
                border-left: 5px solid #28a745;
                margin-top: 20px;
            }
            .btn {
                background-color: #28a745;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
                display: inline-block;
                margin-top: 20px;
            }
            .btn:hover {
                background-color: #218838;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Article Published: ${title}</h1>
            </div>
            <div class="content">
                <p>Dear Author,</p>
                <p>We are excited to inform you that your article titled <strong>${title}</strong> has been successfully published on UltimateHealth!</p>

                <p>Your work is now live for our readers to enjoy, and we are thrilled to share your insights with the community. We sincerely appreciate the effort you’ve put into this article and hope it resonates with many!</p>

                <div class="note">
                    <p><strong>Note:</strong> You can view your article by following this <a href="${articleLink}" class="btn">link</a>.</p>
                </div>

                <p>Thank you for contributing to UltimateHealth. If you have any questions or need further assistance, don’t hesitate to reach out!</p>
            </div>
            <div class="footer">
                <p>Best regards,<br>UltimateHealth Team</p>
            </div>
        </div>
    </body>
</html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

const sendPodcastPublishedEmail = (email, podcastLink, title) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `New Feedback on Your Podcast: ${title}`,
    html: `<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f7fc;
            }
            .container {
                width: 80%;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #00BFFF;
                color: white;
                padding: 15px;
                border-radius: 8px 8px 0 0;
                text-align: center;
            }
            .header h1 {
                font-size: 24px;
                margin: 0;
            }
            .content {
                padding: 20px;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #777;
                padding: 10px;
            }
            .note {
                background-color: #e7f4e7;
                padding: 10px;
                border-left: 5px solid #28a745;
                margin-top: 20px;
            }
            .btn {
                background-color: #28a745;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                text-decoration: none;
                display: inline-block;
                margin-top: 20px;
            }
            .btn:hover {
                background-color: #218838;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Podcast Published: ${title}</h1>
            </div>
            <div class="content">
                <p>Dear Author,</p>
                <p>We are excited to inform you that your podcast titled "<strong>{title}</strong>" has been successfully published on UltimateHealth!</p>

                <p>Your work is now live for our listeners to enjoy, and we are thrilled to share your insights with the community. We sincerely appreciate the effort you’ve put into this content and hope it resonates with many!</p>

                <div class="note">
                    <p><strong>Note:</strong> You can view your podcast by following this <a href="${podcastLink}" class="btn">link</a>.</p>
                </div>

                <p>Thank you for contributing to UltimateHealth. If you have any questions or need further assistance, don’t hesitate to reach out!</p>
            </div>
            <div class="footer">
                <p>Best regards,<br>UltimateHealth Team</p>
            </div>
        </div>
    </body>
</html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

const sendPodcastDiscardEmail = (email, status, title, reason) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Podcast Discarded ${title}`,
    html:
      status !== statusEnum.statusEnum.REVIEW_PENDING
        ? `<html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
          }
          .container {
              width: 80%;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #dc3545;
              color: white;
              padding: 15px;
              border-radius: 8px 8px 0 0;
              text-align: center;
          }
          .header h1 {
              font-size: 24px;
              margin: 0;
          }
          .content {
              padding: 20px;
          }
          .footer {
              text-align: center;
              font-size: 14px;
              color: #777;
              padding: 10px;
          }
          .note {
              background-color: #ffecb3;
              padding: 10px;
              border-left: 5px solid #ffb300;
              margin-top: 20px;
          }
          .btn {
              background-color: #28a745;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
              margin-top: 20px;
          }
          .btn:hover {
              background-color: #218838;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Podcast Discarded: ${title}</h1>
          </div>
          <div class="content">
              <p>Dear Author,</p>
              <p>We regret to inform you that your podcast titled "<strong>{title}</strong>" has been discarded from our review process.</p>

              <p><strong>Reason for Discard:</strong> ${reason} </p>

              <p>Our review system automatically discards submissions that do not meet the necessary criteria or deadlines.</p>

              <p>If you would like to address the issue and resubmit your podcast, or if you have any questions regarding this decision, please don’t hesitate to contact us. We would be happy to review your work again.</p>

              <div class="note">
                  <p><strong>Note:</strong> You can submit new podcasts for review at any time.</p>
              </div>

              <p>We appreciate your effort and wish you success in your creative journey.</p>
          </div>
          <div class="footer">
              <p>Best regards,<br>UltimateHealth Team</p>
          </div>
      </div>
  </body>
</html>
`
        : `<html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
          }
          .container {
              width: 80%;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #dc3545;
              color: white;
              padding: 15px;
              border-radius: 8px 8px 0 0;
              text-align: center;
          }
          .header h1 {
              font-size: 24px;
              margin: 0;
          }
          .content {
              padding: 20px;
          }
          .footer {
              text-align: center;
              font-size: 14px;
              color: #777;
              padding: 10px;
          }
          .note {
              background-color: #ffecb3;
              padding: 10px;
              border-left: 5px solid #ffb300;
              margin-top: 20px;
          }
          .btn {
              background-color: #28a745;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
              margin-top: 20px;
          }
          .btn:hover {
              background-color: #218838;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Podcast Discarded: ${title}</h1>
          </div>
          <div class="content">
              <p>Dear Author,</p>
              <p>We regret to inform you that your podcast titled <strong>${title}</strong> has been discarded from our review process due to the lack of action taken within the required review period of 30 days.</p>

              <p>Our review system automatically discards contents that do not receive feedback or revisions within the set time frame. Unfortunately, we did not receive any updates or revisions within the 30-day deadline.</p>

              <p>If you would like to resubmit your podcast or have any questions, feel free to contact us for further assistance. We would be happy to consider your work again in the future.</p>

              <div class="note">
                  <p><strong>Note:</strong> You can submit new podcasts for review at any time.</p>
              </div>

              <p>We wish you the best in your future!</p>
          </div>
          <div class="footer">
              <p>Best regards,<br>UltimateHealth Team</p>
          </div>
      </div>
  </body>
</html>
`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

const sendArticleDiscardEmail = (email, status, title, reason) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Article Discarded ${title}`,
    html:
      status === statusEnum.statusEnum.UNASSIGNED
        ? `<html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
          }
          .container {
              width: 80%;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #dc3545;
              color: white;
              padding: 15px;
              border-radius: 8px 8px 0 0;
              text-align: center;
          }
          .header h1 {
              font-size: 24px;
              margin: 0;
          }
          .content {
              padding: 20px;
          }
          .footer {
              text-align: center;
              font-size: 14px;
              color: #777;
              padding: 10px;
          }
          .note {
              background-color: #ffecb3;
              padding: 10px;
              border-left: 5px solid #ffb300;
              margin-top: 20px;
          }
          .btn {
              background-color: #28a745;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
              margin-top: 20px;
          }
          .btn:hover {
              background-color: #218838;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Article Discarded: ${title}</h1>
          </div>
          <div class="content">
              <p>Dear Author,</p>
              <p>We regret to inform you that your article titled <strong>${title}</strong> has been discarded from our review process due to the lack of action taken within the required review period of 30 days.</p>

              <p>Our review system automatically discards articles that do not receive feedback or revisions within the set time frame. Unfortunately, we did not receive any updates or revisions within the 30-day deadline.</p>

              <p>If you would like to resubmit your article or have any questions, feel free to contact us for further assistance. We would be happy to consider your work again in the future.</p>

              <div class="note">
                  <p><strong>Note:</strong> You can submit new articles for review at any time.</p>
              </div>

              <p>We wish you the best in your future writing endeavors!</p>
          </div>
          <div class="footer">
              <p>Best regards,<br>UltimateHealth Team</p>
          </div>
      </div>
  </body>
</html>
`
        : `<html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
          }
          .container {
              width: 80%;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #dc3545;
              color: white;
              padding: 15px;
              border-radius: 8px 8px 0 0;
              text-align: center;
          }
          .header h1 {
              font-size: 24px;
              margin: 0;
          }
          .content {
              padding: 20px;
          }
          .footer {
              text-align: center;
              font-size: 14px;
              color: #777;
              padding: 10px;
          }
          .note {
              background-color: #ffecb3;
              padding: 10px;
              border-left: 5px solid #ffb300;
              margin-top: 20px;
          }
          .btn {
              background-color: #28a745;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
              margin-top: 20px;
          }
          .btn:hover {
              background-color: #218838;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Article Discarded: ${title}</h1>
          </div>
          <div class="content">
              <p>Dear Author,</p>
              <p>We regret to inform you that your article titled <strong>${title}</strong> has been discarded from our review process.</p>

              <p><strong>Reason for Discard:</strong> ${reason} </p>

              <p>Our review system automatically discards submissions that do not meet the necessary criteria or deadlines.</p>

              <p>If you would like to address the issue and resubmit your article, or if you have any questions regarding this decision, please don’t hesitate to contact us. We would be happy to review your work again.</p>

              <div class="note">
                  <p><strong>Note:</strong> You can submit new article for review at any time.</p>
              </div>

              <p>We appreciate your effort and wish you success in your creative journey.</p>
          </div>
          <div class="footer">
              <p>Best regards,<br>UltimateHealth Team</p>
          </div>
      </div>
  </body>
</html>
`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

const sendMailArticleDiscardByAdmin = (email, title, discardReason) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Article Discarded ${title}`,
    html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Account Discarded</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        color: #333;
                        padding: 20px;
                    }
                    .container {
                        background-color: white;
                        border-radius: 8px;
                        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                        padding: 30px;
                        text-align: center;
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    h1 {
                        color: #FF6347;
                    }
                    p {
                        font-size: 16px;
                        color: #555;
                    }
                    .reason {
                        font-size: 18px;
                        font-weight: bold;
                        color: #FF6347;
                        margin-top: 20px;
                    }
                    .footer {
                        font-size: 12px;
                        color: #888;
                        margin-top: 30px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Article Discarded</h1>
                    <p>Dear Author,</p>
                    <p>We regret to inform you that your account request has been discarded due to the following reason:</p>
                    <div class="reason">${discardReason}</div>
                    <p>If you believe this is a mistake, please contact our support team.</p>
                    <div class="footer">
                        <p>Best regards,</p>
                        <p>UltimateHealth Team</p>
                    </div>
                </div>
            </body>
            </html>
            `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

// send email on approval of edit request
const sendMailOnEditRequestApproval = (email, title) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Edit Request Accepted on article: ${title}`,
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Improvement Request Approved</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    color: #333;
                    padding: 20px;
                }
                .container {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    text-align: center;
                    max-width: 600px;
                    margin: 0 auto;
                }
                h1 {
                    color: #4CAF50;
                }
                p {
                    font-size: 16px;
                    color: #555;
                }
                .highlight {
                    font-weight: bold;
                    color: #4CAF50;
                }
                .footer {
                    font-size: 12px;
                    color: #888;
                    margin-top: 30px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Improvement Request Approved</h1>
                <p>Dear Author,</p>
                <p>Your edit request for the article titled <span class="highlight">${title}</span> has been accepted.</p>
                <p>Please make the necessary improvements within <span class="highlight">4 days</span> from the date of this email.</p>
                <p>If you have any questions or need clarification on the required changes, feel free to reach out.</p>
                <div class="footer">
                    <p>Best regards,</p>
                    <p>UltimateHealth Team</p>
                </div>
            </div>
        </body>
        </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

/** Report related mail */
const sendReportUndertakenEmail = (email, issueNumber) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Your Report is Being Reviewed (Issue No. ${issueNumber})`,
    html: `
         <div style="font-family: Arial, sans-serif;">
         <h2>Your Report is Being Reviewed</h2>
         <p>Hello,</p>
         <p>Your report with Issue No. <strong>${issueNumber}</strong> has been picked up by a moderator for review.</p>
         <p>We will update you once the review is complete.</p>
         <p>Thank you for helping us maintain the quality of our platform.</p>
        </div>
        `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending report undertaken email:", err);
    } else {
      console.log("Report undertaken email sent:", info.response);
    }
  });
};

// Send Mail (Optional)
const sendInitialReportMailtoVictim = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank You for Reporting - Your Concern is Being Addressed",
    html: `
  <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #00BFFF;
            color: #fff;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            background-color: #f1f1f1;
            border-radius: 0 0 8px 8px;
          }
          a {
            color: #00BFFF;
            text-decoration: none;
          }
          .btn {
            background-color: #00BFFF;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            margin-top: 20px;
          }
          .btn:hover {
            background-color: #00BFFF;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank You for Reporting</h2>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>We want to thank you for submitting your report regarding inappropriate content. Your action helps us keep the community safe and ensure that our platform remains a space where everyone can feel respected and secure.</p>
            
            <p>Your identity will be kept confidential, and we assure you that your report will be handled with the utmost care and urgency. Our team is currently reviewing the situation and will take appropriate actions based on our guidelines.</p>

            <p>We take reports like yours very seriously and are committed to making sure that our platform remains a safe environment for all users. If you have any additional information or if you would like to follow up, please don’t hesitate to reach out to us.</p>

            <p>If you believe you did not submit this report or if you have any questions, you can contact us directly at <a href="mailto:ultimate.health25@gmail.com">ultimate.health25@gmail.com</a>.</p>

            <a href="mailto:ultimate.health25@gmail.com" class="btn">Contact Support</a>
          </div>
          <div class="footer">
            <p>Best regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Report email sent:", info.response);
    }
  });
};

// Send mail to the user against whom the report is submitted

const sendInitialReportMailtoConvict = async (email, details, reportType) => {
  const reportDetails =
    reportType === "content"
      ? `<div style="padding: 15px; border: 2px solid #FF6347; background-color: #FFFAF0; border-radius: 8px;">
       <h3 style="color: #FF6347;">Reported Content:</h3>
       <p><strong>Content ID:</strong> ${details.articleId ? details.articleId : details.podcastId}</p>
       <p><strong>Description:</strong> ${details.title}</p>
     </div>`
      : `<div style="padding: 15px; border: 2px solid #4682B4; background-color: #F0F8FF; border-radius: 8px;">
       <h3 style="color: #4682B4;">Reported Comment:</h3>
       <p><strong>Comment ID:</strong> ${details.commentId}</p>
       <p><strong>Comment:</strong> ${details.comment}</p>
     </div>`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Important: A Report Has Been Submitted Regarding Your ${reportType}`,
    html: `
  <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f6f9;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 30px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
            .header {
              background-color: #FF6347; /* Red color for report seriousness */
              color: #fff;
              padding: 15px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 20px;
            }
            .footer {
              text-align: center;
              padding: 10px;
              font-size: 14px;
              background-color: #f1f1f1;
              border-radius: 0 0 8px 8px;
            }
            a {
              color: #FF6347;
              text-decoration: none;
            }
            .btn {
              background-color: #FF6347;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
              display: inline-block;
              margin-top: 20px;
            }
            .btn:hover {
              background-color: #FF4500;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Important: Report Submitted Regarding Your ${reportType}</h2>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>We want to inform you that a report has been submitted regarding your ${reportType} on our platform.</p>
              
              <p>Here are the details of the reported ${reportType}:</p>
              ${reportDetails}

              <p>Our team is reviewing the matter and will take appropriate action based on our community guidelines. We ask that you continue to follow the guidelines to maintain a respectful and safe environment for all users.</p>

              <p>If you believe the report is incorrect or if you wish to provide more context, please feel free to contact our support team at <a href="mailto:ultimate.health25@gmail.com">ultimate.health25@gmail.com</a>.</p>

              <a href="mailto:ultimate.health25@gmail.com" class="btn">Contact Support</a>
            </div>
            <div class="footer">
              <p>Best regards,<br>The UltimateHealth Team</p>
              <p>© 2025 UltimateHealth. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Report email sent:", info.response);
    }
  });
};

const sendResolvedMailToVictim = async (
  email,
  details,
  reportType,
  resolution,
) => {
  const resolvedDetails =
    reportType === "content"
      ? `<div style="padding: 15px; border: 2px solid #32CD32; background-color: #F0FFF0; border-radius: 8px;">
       <h3 style="color: #32CD32;">Reported Content (Resolved):</h3>
       <p><strong>Content ID:</strong> ${details.articleId ? details.articleId : details.podcastId}</p>
       <p><strong>Description:</strong> ${details.content}</p>
     </div>`
      : `<div style="padding: 15px; border: 2px solid #32CD32; background-color: #F0FFF0; border-radius: 8px;">
       <h3 style="color: #32CD32;">Reported Comment (Resolved):</h3>
       <p><strong>Comment ID:</strong> ${details.commentId}</p>
       <p><strong>Comment:</strong> ${details.content}</p>
     </div>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Update: Your Reported ${reportType} Has Been Reviewed`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #32CD32;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Report Reviewed and Resolved</h2>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Thank you for reporting the following ${reportType}. Our moderation team has reviewed your report and resolved the issue.</p>
            ${resolvedDetails}
            <p><strong>Resolution: </strong> ${resolution}</p>
            <p>We appreciate your effort in helping us keep the community safe and respectful.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email to victim:", err);
    } else {
      console.log("Resolved report email sent to victim:", info.response);
    }
  });
};

const sendResolvedMailToConvict = async (email, details, reportType) => {
  const resolvedDetails =
    reportType === "content"
      ? `<div style="padding: 15px; border: 2px solid #FFA500; background-color: #FFF8DC; border-radius: 8px;">
       <h3 style="color: #FFA500;">Your Content Was Reported:</h3>
       <p><strong>Content ID:</strong> ${details.articleId ? details.articleId : details.podcastId}</p>
       <p><strong>Description:</strong> ${details.content}</p>
     </div>`
      : `<div style="padding: 15px; border: 2px solid #FFA500; background-color: #FFF8DC; border-radius: 8px;">
       <h3 style="color: #FFA500;">Your Comment Was Reported:</h3>
       <p><strong>Comment ID:</strong> ${details.commentId}</p>
       <p><strong>Comment:</strong> ${details.content}</p>
     </div>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Notice: Review of Reported ${reportType}`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #FFA500;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Reported ${reportType} Reviewed</h2>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>This is to inform you that a report was reviewed concerning the following ${reportType} associated with your account.</p>
            ${resolvedDetails}
            <p><strong>Outcome:</strong> Resolved </p>
            <p>Please ensure your future activity aligns with our <a href="#">community guidelines</a> to maintain a respectful and safe environment for everyone.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email to convict:", err);
    } else {
      console.log("Resolved report email sent to convict:", info.response);
    }
  });
};

// Misuse of report feature
const sendWarningMailToVictimOnReportDismissOrIgnore = async (
  email,
  details,
  reportType,
  reason,
  misuseCount,
) => {
  const reportSummary =
    reportType === "content"
      ? `<div style="padding: 15px; border: 2px solid #FFD700; background-color: #FFFACD; border-radius: 8px;">
       <h3 style="color: #DAA520;">Reported Content:</h3>
       <p><strong>Content ID:</strong> ${details.articleId ? details.articleId : details.podcastId}</p>
       <p><strong>Description:</strong> ${details.content}</p>
     </div>`
      : `<div style="padding: 15px; border: 2px solid #FFD700; background-color: #FFFACD; border-radius: 8px;">
       <h3 style="color: #DAA520;">Reported Comment:</h3>
       <p><strong>Comment ID:</strong> ${details.commentId}</p>
       <p><strong>Comment:</strong> ${details.content}</p>
     </div>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `⚠️Warning: Inappropriate Use of Report Feature (${misuseCount}/3)`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #FFD700;
            color: black;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            font-weight: bold;
          }
          .content {
            padding: 20px;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
          .reason {
            background-color: #fff8e1;
            padding: 10px;
            border-left: 4px solid #FFD700;
            margin: 15px 0;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            ⚠️ Warning: Misuse of Reporting Tool
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>We reviewed your recent report concerning the following ${reportType}, and we found it to be inappropriate or made in bad faith:</p>
            ${reportSummary}
            <div class="reason"><strong>Reason:</strong> ${reason}</div>
            <p>Our reporting tool is meant to address real violations of our community guidelines. Misusing this tool can harm the experience for others and may result in restrictions on your account.</p>
            <p>Please ensure that future reports are valid and made with sincere intent to improve the platform for all users.</p>
            
            <div class="warning">
              This is warning ${misuseCount} of 3. After 3 confirmed misuses, your account may be blocked or suspended for 1 month.
            </div>

            <p>If you believe this warning was issued in error, feel free to contact our support team.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending warning email to victim:", err);
    } else {
      console.log("Warning email sent to victim:", info.response);
    }
  });
};

const sendDismissedOrIgnoreMailToConvict = async (
  email,
  details,
  reportType,
) => {
  const dismissedDetails =
    reportType === "content"
      ? `<div style="padding: 15px; border: 2px solid #90EE90; background-color: #F0FFF0; border-radius: 8px;">
       <h3 style="color: #228B22;">Content Report Dismissed:</h3>
       <p><strong>Content ID:</strong> ${details.articleId ? details.articleId : details.podcastId}</p>
       <p><strong>Description:</strong> ${details.content}</p>
     </div>`
      : `<div style="padding: 15px; border: 2px solid #90EE90; background-color: #F0FFF0; border-radius: 8px;">
       <h3 style="color: #228B22;">Comment Report Dismissed:</h3>
       <p><strong>Comment ID:</strong> ${details.commentId}</p>
       <p><strong>Comment:</strong> ${details.content}</p>
     </div>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Notice: Report on Your ${reportType} Has Been Dismissed`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #90EE90;
            color: black;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            font-weight: bold;
          }
          .content {
            padding: 20px;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            ✅ Report Dismissed – No Action Taken
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>This is to inform you that a report was submitted regarding the following ${reportType}:</p>
            ${dismissedDetails}
            <p>After careful review, our moderation team has determined that your ${reportType} does not violate our community guidelines. As a result, no action has been taken against your account.</p>
            <p>If you have any questions or concerns, feel free to reach out to our support team.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending dismissal email to convict:", err);
    } else {
      console.log("Dismissal email sent to convict:", info.response);
    }
  });
};

const sendWarningMailToConvict = async (
  email,
  details,
  reportType,
  reason,
  strikeCount = 1,
) => {
  const warningDetails =
    reportType === "content"
      ? `<div style="padding: 15px; border: 2px solid #FF6347; background-color: #FFF5F5; border-radius: 8px;">
       <h3 style="color: #FF6347;">Violated Content:</h3>
       <p><strong>Content ID:</strong> ${details.articleId ? details.articleId : details.podcastId}</p>
       <p><strong>Description:</strong> ${details.content}</p>
     </div>`
      : `<div style="padding: 15px; border: 2px solid #FF6347; background-color: #FFF5F5; border-radius: 8px;">
       <h3 style="color: #FF6347;">Violated Comment:</h3>
       <p><strong>Comment ID:</strong> ${details.commentId}</p>
       <p><strong>Comment:</strong> ${details.content}</p>
     </div>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `⚠️ Warning: Violation of Community Guidelines (${strikeCount}/3)`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #FF6347;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            font-weight: bold;
          }
          .content {
            padding: 20px;
          }
          .reason {
            background-color: #ffeaea;
            padding: 10px;
            border-left: 4px solid #FF6347;
            margin: 15px 0;
            font-style: italic;
          }
          .strike-warning {
            background-color: #ffebee;
            color: #b71c1c;
            padding: 15px;
            border-radius: 6px;
            font-weight: bold;
            border-left: 5px solid #f44336;
            margin-top: 20px;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            ⚠️ Warning Issued
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Your ${reportType} was reviewed and found to be in violation of our community guidelines.</p>
            ${warningDetails}
            <div class="reason"><strong>Reason:</strong> ${reason}</div>

            <div class="strike-warning">
              This is warning ${strikeCount} of 3. Repeated violations may lead to permanent suspension of your account.
            </div>

            <p>Please review our <a href="#">community guidelines</a> to avoid further issues. Continued engagement must follow platform rules to ensure a respectful and safe space for everyone.</p>

            <p>If you believe this warning was issued incorrectly, contact us at <a href="mailto:ultimate.health25@gmail.com">ultimate.health25@gmail.com</a>.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending warning email to convict:", err);
    } else {
      console.log("Warning email sent to convict:", info.response);
    }
  });
};

const sendRemoveContentMailToConvict = async (
  email,
  details,
  reportType,
  reason,
) => {
  const warningDetails =
    reportType === "content"
      ? `<div style="padding: 15px; border: 2px solid #FF6347; background-color: #FFF5F5; border-radius: 8px;">
       <h3 style="color: #FF6347;">Violated Content:</h3>
       <p><strong>Content ID:</strong> ${details.articleId ? details.articleId : details.podcastId}</p>
       <p><strong>Description:</strong> ${details.content}</p>
     </div>`
      : `<div style="padding: 15px; border: 2px solid #FF6347; background-color: #FFF5F5; border-radius: 8px;">
       <h3 style="color: #FF6347;">Violated Comment:</h3>
       <p><strong>Comment ID:</strong> ${details.commentId}</p>
       <p><strong>Comment:</strong> ${details.content}</p>
     </div>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `⚠️ Warning: Content Removed, Violation of Community Guidelines`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #FF6347;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            font-weight: bold;
          }
          .content {
            padding: 20px;
          }
          .reason {
            background-color: #ffeaea;
            padding: 10px;
            border-left: 4px solid #FF6347;
            margin: 15px 0;
            font-style: italic;
          }
          .strike-warning {
            background-color: #ffebee;
            color: #b71c1c;
            padding: 15px;
            border-radius: 6px;
            font-weight: bold;
            border-left: 5px solid #f44336;
            margin-top: 20px;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            ⚠️ Warning Issued
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Your ${reportType} was reviewed and found to be in violation of our community guidelines.</p>
            ${warningDetails}
            <div class="reason"><strong>Reason:</strong> ${reason}</div>

            <div class="strike-warning">
              This is a warning, not a strike. We are only removing your content, Repeated violations may lead to permanent suspension of your account.
            </div>

            <p>Please review our <a href="#">community guidelines</a> to avoid further issues. Continued engagement must follow platform rules to ensure a respectful and safe space for everyone.</p>

            <p>If you believe this warning was issued incorrectly, contact us at <a href="mailto:ultimate.health25@gmail.com">ultimate.health25@gmail.com</a>.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending warning email to convict:", err);
    } else {
      console.log("Warning email sent to convict:", info.response);
    }
  });
};

const sendRestoreContentMailToUser = async (email, articleTitle) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `✅ Your Content Has Been Restored`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            font-weight: bold;
          }
          .content {
            padding: 20px;
          }
          .restored-content {
            background-color: #e8f5e9;
            padding: 15px;
            border-left: 4px solid #4CAF50;
            border-radius: 6px;
            margin-top: 20px;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            ✅ Content Restoration Notice
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>We’re writing to inform you that the following content previously removed from your account has been reviewed and successfully restored:</p>

            <div class="restored-content">
           
              <p><strong>Article Title:</strong> ${articleTitle}</p>
            </div>

            <p>This restoration was processed in response to a valid request and after re-evaluation under our community guidelines.</p>

            <p>If you have any questions or concerns, feel free to reach out to us at <a href="mailto:ultimate.health25@gmail.com">ultimate.health25@gmail.com</a>.</p>

            <p>Thank you for being part of the UltimateHealth community.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending restore content email:", err);
    } else {
      console.log("Restore content email sent:", info.response);
    }
  });
};

const sendRestoreRequestReceivedMail = async (email, articleTitle) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `📥 We've Received Your Content Restoration Request`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #1976D2;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            font-weight: bold;
          }
          .content {
            padding: 20px;
          }
          .request-info {
            background-color: #e3f2fd;
            padding: 15px;
            border-left: 4px solid #1976D2;
            border-radius: 6px;
            margin-top: 20px;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            📥 Request Confirmation
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>We’ve received your request to restore the following content:</p>

            <div class="request-info">
              <p><strong>Article Title:</strong> ${articleTitle}</p>
            </div>

            <p>Our team will review your request carefully to ensure it meets our content and community guidelines.</p>

            <p>You’ll receive a follow-up email once the review is complete. This process may take up to 3–5 business days.</p>

            <p>If you have any additional information to support your request, feel free to reply to this email at <a href="mailto:ultimate.health25@gmail.com">ultimate.health25@gmail.com</a>.</p>

            <p>Thanks for your patience and for being part of the UltimateHealth community.</p>
          </div>
          <div class="footer">
            <p>Warm regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending restore request received email:", err);
    } else {
      console.log("Restore request received email sent:", info.response);
    }
  });
};

const sendRestoreRequestDisapprovedMail = async (email, articleTitle) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `❌ Content Restoration Request Denied`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #d32f2f;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            font-weight: bold;
          }
          .content {
            padding: 20px;
          }
          .disapproval-info {
            background-color: #ffebee;
            padding: 15px;
            border-left: 4px solid #d32f2f;
            border-radius: 6px;
            margin-top: 20px;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            ❌ Request Denied
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Thank you for submitting a content restoration request. After a thorough review, we regret to inform you that your request to restore the following content has been denied:</p>

            <div class="disapproval-info">
              <p><strong>Article Title:</strong> ${articleTitle}</p>
            </div>

            <p>Unfortunately, the content did not meet our community guidelines or failed to comply with our platform's terms of use. As a result, we are unable to proceed with the restoration.</p>

            <p>If you believe this decision was made in error or you have new information to provide, feel free to respond to this email at <a href="mailto:ultimate.health25@gmail.com">ultimate.health25@gmail.com</a>.</p>

            <p>We appreciate your understanding and continued support of the UltimateHealth community.</p>
          </div>
          <div class="footer">
            <p>Kind regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending disapproval email:", err);
    } else {
      console.log("Disapproval email sent:", info.response);
    }
  });
};

const sendBlockConvictMail = async (email, details, reportType, reason) => {
  const reportedItem =
    reportType === "content"
      ? `<div style="padding: 15px; border: 2px solid #DC143C; background-color: #FFF5F5; border-radius: 8px;">
         <h3 style="color: #DC143C;">Violated Content:</h3>
         <p><strong>Content ID:</strong> ${details.articleId ? details.articleId : details.podcastId}</p>
         <p><strong>Description:</strong> ${details.content}</p>
       </div>`
      : `<div style="padding: 15px; border: 2px solid #DC143C; background-color: #FFF5F5; border-radius: 8px;">
         <h3 style="color: #DC143C;">Violated Comment:</h3>
         <p><strong>Comment ID:</strong> ${details.commentId}</p>
         <p><strong>Comment:</strong> ${details.content}</p>
       </div>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `🚫 Account Temporarily Blocked Due to Policy Violation`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #DC143C;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            font-weight: bold;
          }
          .content {
            padding: 20px;
          }
          .reason {
            background-color: #ffeaea;
            padding: 10px;
            border-left: 4px solid #DC143C;
            margin: 15px 0;
            font-style: italic;
          }
          .block-notice {
            background-color: #ffebee;
            color: #b71c1c;
            padding: 15px;
            border-radius: 6px;
            font-weight: bold;
            border-left: 5px solid #f44336;
            margin-top: 20px;
          }
          .restrictions {
            background-color: #fff8dc;
            padding: 15px;
            margin: 20px 0;
            border-left: 5px solid #ffa500;
            border-radius: 6px;
          }
          ul {
            margin: 10px 0 10px 20px;
            padding: 0;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            🚫 Your Account Has Been Temporarily Blocked
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>We have reviewed a report concerning the following ${reportType} associated with your account:</p>
            ${reportedItem}
            <div class="reason"><strong>Reason:</strong> ${reason}</div>

            <div class="block-notice">
              Your account has been temporarily blocked for 1 month due to violations of our community guidelines.
            </div>

            <div class="restrictions">
              <h4 style="margin: 0 0 10px 0;">📌 Blocked User Restrictions:</h4>
              <ul>
                <li>You will be unable to post new content.</li>
                <li>You will be unable to comment on existing content.</li>
                <li>You will be unable to react to or repost any content.</li>
                <li>You will be unable to submit edit requests.</li>
                <li><strong>You can still view and save existing content.</strong></li>
              </ul>
            </div>

            <p>Please take this time to review our <a href="#">community guidelines</a>. Respectful and responsible behavior is required to maintain access to the platform.</p>

            <p>If you believe this block was issued in error, you may contact our support team at <a href="mailto:ultimate.health25@gmail.com">ultimate.health25@gmail.com</a> to appeal.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending block email to convict:", err);
    } else {
      console.log("Block email sent to convict:", info.response);
    }
  });
};

const sendBannedUserMail = async (email, details, reportType, reason) => {
  const reportedItem =
    reportType === "content"
      ? `<div style="padding: 15px; border: 2px solid #8B0000; background-color: #FFF0F0; border-radius: 8px;">
         <h3 style="color: #8B0000;">Violated Content:</h3>
         <p><strong>Content ID:</strong> ${details.articleId ? details.articleId : details.podcastId}</p>
         <p><strong>Description:</strong> ${details.content}</p>
       </div>`
      : `<div style="padding: 15px; border: 2px solid #8B0000; background-color: #FFF0F0; border-radius: 8px;">
         <h3 style="color: #8B0000;">Violated Comment:</h3>
         <p><strong>Comment ID:</strong> ${details.commentId}</p>
         <p><strong>Comment:</strong> ${details.content}</p>
       </div>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `❌ Account Permanently Banned Due to Severe Policy Violation`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fc;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #8B0000;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            font-weight: bold;
          }
          .content {
            padding: 20px;
          }
          .reason {
            background-color: #ffe6e6;
            padding: 10px;
            border-left: 4px solid #8B0000;
            margin: 15px 0;
            font-style: italic;
          }
          .ban-notice {
            background-color: #fff0f0;
            color: #8B0000;
            padding: 15px;
            border-radius: 6px;
            font-weight: bold;
            border-left: 5px solid #b22222;
            margin-top: 20px;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            ❌ Permanent Account Ban Notification
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Following a thorough review, we have determined that your account violated our community guidelines in the following ${reportType}:</p>
            ${reportedItem}
            <div class="reason"><strong>Reason:</strong> ${reason}</div>

            <div class="ban-notice">
              Your account has been <strong>permanently banned</strong> from the UltimateHealth platform. This action is final and cannot be undone.
            </div>

            <p>Due to the severity of this violation, you are no longer permitted to access or create any new content or interactions on our platform.</p>

            <p>For more details, please review our <a href="#">community guidelines</a>.</p>

            <p>If you believe this action was taken in error, you may contact our support team at <a href="mailto:ultimate.health25@gmail.com">ultimate.health25@gmail.com</a> with any questions or concerns.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending ban email to user:", err);
    } else {
      console.log("Ban email sent to user:", info.response);
    }
  });
};

const sendUnblockUserMail = async (email, username) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `✅ Account Access Restored`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            font-weight: bold;
          }
          .content {
            padding: 20px;
          }
          .unblock-notice {
            background-color: #e8f5e9;
            color: #2e7d32;
            padding: 15px;
            border-radius: 6px;
            font-weight: bold;
            border-left: 5px solid #4CAF50;
            margin-top: 20px;
          }
          .reminder {
            background-color: #fff8dc;
            padding: 15px;
            margin: 20px 0;
            border-left: 5px solid #ffa500;
            border-radius: 6px;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
          a {
            color: #4CAF50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            ✅ Your Account Has Been Unblocked
          </div>
          <div class="content">
            <p>Hello${username ? ` ${username}` : ""},</p>

            <p>We’re pleased to inform you that the temporary block on your account has now been lifted. You have regained full access to your account features.</p>

            <div class="unblock-notice">
              Your account access has been fully restored.
            </div>

            <div class="reminder">
              <h4 style="margin: 0 0 10px 0;">📌 Please Remember:</h4>
              <p>Continued access to our platform is contingent on adhering to our <a href="#">community guidelines</a>. Repeated violations may result in more severe penalties, including permanent suspension.</p>
            </div>

            <p>If you have any questions or concerns, feel free to contact our support team at <a href="mailto:ultimate.health25@gmail.com">ultimate.health25@gmail.com</a>.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The UltimateHealth Team</p>
            <p>© 2025 UltimateHealth. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending unblock email:", err);
    } else {
      console.log("Unblock email sent successfully:", info.response);
    }
  });
};

const sendOtpMail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      return null;
    }
    return true;
  });

  return true;
}

const sendNewArticleEmail = (email, title, authorName, articleLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `New Article Published: ${title}`,
    html: `<html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; background-color: #f4f7fc; }
                        .container { width: 80%; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
                        .header { background-color: #00BFFF; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center; }
                        .content { padding: 20px; }
                        .footer { text-align: center; font-size: 14px; color: #777; padding: 10px; }
                        .btn { background-color: #28a745; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Article Published!</h1>
                        </div>
                        <div class="content">
                            <p>Hello,</p>
                            <p>A new article titled <strong>${title}</strong> by <strong>${authorName}</strong> has just been published on UltimateHealth.</p>
                            <p>Read the full article by clicking the link below:</p>
                            <a href="${articleLink}" class="btn">Read Article</a>
                        </div>
                        <div class="footer">
                            <p>Best regards,<br>UltimateHealth Team</p>
                        </div>
                    </div>
                </body>
            </html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending new article email:', err);
    } else {
      console.log('New article email sent:', info.response);
    }
  });
};
const sendContactUsMail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: `"UltimateHealth Contact" <${process.env.EMAIL_USER}>`,
    to: "ultimate.health25@gmail.com",
    replyTo: email,
    subject: `[Contact Us] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #2d6a4f;">New Contact Us Message</h2>
        <hr style="border: none; border-top: 1px solid #e0e0e0;" />
        <table style="width: 100%; font-size: 15px; line-height: 1.8;">
          <tr>
            <td style="font-weight: bold; width: 120px; color: #555;">Name</td>
            <td>${name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #555;">Email</td>
            <td><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #555;">Subject</td>
            <td>${subject}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
        <p style="font-weight: bold; color: #555;">Message</p>
        <p style="background: #f9f9f9; padding: 16px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin-top: 24px;" />
        <p style="font-size: 12px; color: #aaa;">This email was sent via the UltimateHealth Contact Us form. Reply directly to respond to the sender.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("Error sending contact us email:", err);
    return false;
  }
};

module.exports = {
  sendNewArticleEmail,
  sendContactUsMail,
  sendVerificationEmail,
  verifyEmail,
  Sendverifymail,
  resendVerificationEmail,
  sendArticleFeedbackEmail,
  pickArticleMail,
  pickPodcastMail,
  sendArticleForReviewEmail,
  sendArticlePublishedEmail,
  sendArticleDiscardEmail,
  sendMailArticleDiscardByAdmin,
  sendMailOnEditRequestApproval,
  sendReportUndertakenEmail,
  sendInitialReportMailtoConvict,
  sendInitialReportMailtoVictim,
  sendResolvedMailToVictim,
  sendResolvedMailToConvict,
  sendWarningMailToVictimOnReportDismissOrIgnore,
  sendDismissedOrIgnoreMailToConvict,
  sendWarningMailToConvict,
  sendRemoveContentMailToConvict,
  sendBlockConvictMail,
  sendBannedUserMail,
  sendRestoreContentMailToUser,
  sendUnblockUserMail,
  sendRestoreRequestReceivedMail,
  sendRestoreRequestDisapprovedMail,
  sendPodcastPublishedEmail,
  sendPodcastForReviewEmail,
  sendPodcastDiscardEmail,
  sendOtpMail,
  sendContributorVerificationEmail,
};


