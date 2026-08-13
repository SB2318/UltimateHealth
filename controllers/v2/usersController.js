const User = require('../../models/User');
const { verifyOtp } = require('../../utils/otpUtils');
const bcrypt = require('bcryptjs');

/**
 * Endpoint for verifying OTP and changing password.
 * Resolves critical security bug where OTP was not validated prior to password change.
 */
const verifyOtpForForgotPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Ensure all required fields are provided
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: 'Email, OTP, and newPassword are required.' });
        }

        // Validate the OTP before allowing password change
        const isOtpValid = await verifyOtp(email, otp);
        if (!isOtpValid) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        
        // Clear OTP after successful reset (security best practice)
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error('Error in verifyOtpForForgotPassword:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    verifyOtpForForgotPassword,
    // Note: Other controllers normally present here are omitted for this specific patch
};
