const Admin = require("../../models/admin/adminModel");
const { generateHashPassword } = require("../security/encryptService");

const checkExistingAdmin = async ({ email }) => {
  const existingAdmin = await Admin.exists({ email: email });
  return !!existingAdmin;
};

const findAdminByEmail = async (email) => {
  return await Admin.findOne({ email: email });
};
const findAdminByHandle = async (user_handle) => {
  return await Admin.findOne({ user_handle: user_handle });
};

const findAdminById = async (id) => {
  return Admin.findById(id).lean();
};

const updateAdminOtp = async (admin, hashedOtp, otpExpires) => {
  admin.otp = hashedOtp;
  admin.otpExpires = otpExpires;
  await admin.save();
};

const incrementOtpAttemptsAdmin = (accountId) => {
  return Admin.updateOne({ _id: accountId }, { $inc: { otpAttempts: 1 } });
};

const clearOtpAdmin = (accountId) => {
  return Admin.updateOne(
    { _id: accountId },
    {
      $unset: {
        otp: "",
        otpExpires: "",
        otpAttempts: "",
        otpLastSentAt: "",
      },
    },
  );
};

const updateAdminPasswordAndClearOtp = async (userId, password) => {
  const hashedPassword = await generateHashPassword(password);
  return Admin.updateOne(
    { _id: userId },
    {
      $set: {
        password: hashedPassword,
      },
      $unset: {
        otp: "",
        otpExpires: "",
        otpAttempts: "",
        otpLastSentAt: "",
      },
    },
  );
};

const logoutAdmin = async (adminId) => {
  return Admin.updateOne(
    { _id: adminId },
    {
      $unset: {
        "refreshToken.hashedRefreshToken": 1,
        "refreshToken.jti": 1,
      },
    }
  );
}
module.exports = {
  checkExistingAdmin,
  findAdminByEmail,
  findAdminByHandle,
  updateAdminOtp,
  incrementOtpAttemptsAdmin,
  clearOtpAdmin,
  updateAdminPasswordAndClearOtp,
  logoutAdmin
};
