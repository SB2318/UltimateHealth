const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    user_name: {
        type: String,
        required: true,
    },
    user_handle: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    isDoctor: {
        type: Boolean,
        required: true,
    },
    specialization: {
        type: String,
        default: null,
    },
    qualification: {
        type: String,
        default: null,
    },
    Years_of_experience: {
        type: Number,
        default: null,
    },
    contact_detail: {
        phone_no: {
            type: String,
            default: null,
        },
        email_id: {
            type: String,
            default: null,
        },
    },
    Profile_image: {
        type: String,
        default: "",
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpires: {
        type: Date,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    last_updated_at: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: null,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;