const expressAsyncHandler = require('express-async-handler');
const ContactUs = require('../models/ContactUs');
const { sendContactUsMail } = require('./emailservice');
const validator = require('validator');

const submitContactForm = expressAsyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields (name, email, subject, message) are required' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    try {
        const newContact = new ContactUs({ name, email, subject, message });
        await newContact.save();

        await sendContactUsMail({ name, email, subject, message });

        res.status(200).json({ message: 'Your message has been received. We will contact you shortly.' });
    } catch (err) {
        console.error('Error submitting contact form:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { submitContactForm };
