const expressAsyncHandler = require('express-async-handler');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const validator = require('validator');

// Subscribe to newsletter
const subscribeNewsletter = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email address is required' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    try {
        const existingSubscriber = await NewsletterSubscriber.findOne({ email: email.toLowerCase() });

        if (existingSubscriber) {
            return res.status(409).json({ message: 'This email is already subscribed' });
        }

        const newSubscriber = new NewsletterSubscriber({
            email
        });

        await newSubscriber.save();

        res.status(200).json({ message: 'You have successfully subscribed!' });
    } catch (err) {
        console.error('Error subscribing to newsletter:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
    subscribeNewsletter
};
