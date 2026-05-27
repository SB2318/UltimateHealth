# Contact Form + Newsletter — Integration Guide

## 1. Contact Form → uhsocial.in API

### Backend route to add (Node.js / Express)
Add this to your uhsocial.in backend:

```js
// POST /api/contact/send
// Body: { name, email, subject, message }

const nodemailer = require('nodemailer');

router.post('/contact/send', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,       // ultimate.health25@gmail.com
      pass: process.env.MAIL_PASS,       // Gmail App Password
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${process.env.MAIL_USER}>`,
    to: 'ultimate.health25@gmail.com',
    replyTo: email,
    subject: `[UltimateHealth Contact] ${subject}`,
    html: `
      <h3>New message from ${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  });

  res.json({ success: true });
});
```

### .env to add on server
```
MAIL_USER=ultimate.health25@gmail.com
MAIL_PASS=your_gmail_app_password
```
> Get App Password: Google Account → Security → 2-Step Verification → App Passwords

---

## 2. Newsletter → Owner fills credentials

### Backend route to add
```js
// POST /api/newsletter/subscribe
// Body: { email }

router.post('/newsletter/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  // ── OPTION A: Save to your DB (owner fills this) ──
  // await db.collection('subscribers').insertOne({ email, subscribedAt: new Date() });

  // ── OPTION B: Mailchimp (owner fills credentials) ──
  // const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  // const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  // const MAILCHIMP_DC      = process.env.MAILCHIMP_DC; // e.g. "us1"
  // await fetch(`https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `apikey ${MAILCHIMP_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ email_address: email, status: 'subscribed' }),
  // });

  // ── OPTION C: Send confirmation email via nodemailer (owner fills) ──
  // await transporter.sendMail({
  //   from: process.env.MAIL_USER,
  //   to: email,
  //   subject: 'Welcome to Ultimate Health Newsletter!',
  //   html: '<p>Thanks for subscribing!</p>',
  // });

  res.json({ success: true });
});
```

### .env placeholders for owner
```
# Mailchimp (if using Option B)
MAILCHIMP_API_KEY=owner_fills_this
MAILCHIMP_LIST_ID=owner_fills_this
MAILCHIMP_DC=owner_fills_this
```
