# Contact Form + Newsletter - Integration Guide

## 1. Contact Form -> uhsocial.in API

### Backend route to add (Node.js / Express)
Add this to your uhsocial.in backend:

```js
// POST /api/contact/send
// Body: { name, email, subject, message }

const nodemailer = require("nodemailer");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (match) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return replacements[match];
  });

const sanitizeHeader = (value = "", maxLength = 120) =>
  String(value).replace(/[\r\n]+/g, " ").trim().slice(0, maxLength);

const isValidEmail = (email = "") =>
  EMAIL_PATTERN.test(email.trim()) && !/[\r\n]/.test(email);

router.post("/contact/send", async (req, res) => {
  const name = sanitizeHeader(req.body.name, 80);
  const email = String(req.body.email || "").trim();
  const subject = sanitizeHeader(req.body.subject, 120);
  const message = String(req.body.message || "").trim().slice(0, 1500);

  if (!name || !isValidEmail(email) || !subject || !message) {
    return res.status(400).json({ error: "Valid name, email, subject, and message are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, // ultimate.health25@gmail.com
      pass: process.env.MAIL_PASS, // Gmail App Password
    },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br/>");

  await transporter.sendMail({
    from: `"${safeName}" <${process.env.MAIL_USER}>`,
    to: "ultimate.health25@gmail.com",
    replyTo: email,
    subject: `[UltimateHealth Contact] ${safeSubject}`,
    html: `
      <h3>New message from ${safeName}</h3>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p><strong>Message:</strong><br/>${safeMessage}</p>
    `,
  });

  res.json({ success: true });
});
```

### Server environment variables
```
MAIL_USER=ultimate.health25@gmail.com
MAIL_PASS=your_gmail_app_password
```
Get App Password from Google Account -> Security -> 2-Step Verification -> App Passwords.

### Frontend environment variable
```
NEXT_PUBLIC_API_BASE_URL=https://uhsocial.in
```

---

## 2. Newsletter -> Owner fills credentials

### Backend route to add
```js
// POST /api/newsletter/subscribe
// Body: { email }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email = "") =>
  EMAIL_PATTERN.test(email.trim()) && !/[\r\n]/.test(email);

router.post("/newsletter/subscribe", async (req, res) => {
  const email = String(req.body.email || "").trim();

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Valid email required" });
  }

  // OPTION A: Save to your DB (owner fills this)
  // await db.collection("subscribers").insertOne({ email, subscribedAt: new Date() });

  // OPTION B: Mailchimp (owner fills credentials)
  // const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  // const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  // const MAILCHIMP_DC = process.env.MAILCHIMP_DC; // e.g. "us1"
  // await fetch(`https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `apikey ${MAILCHIMP_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email_address: email, status: "subscribed" }),
  // });

  // OPTION C: Send confirmation email via nodemailer (owner fills)
  // await transporter.sendMail({
  //   from: process.env.MAIL_USER,
  //   to: email,
  //   subject: "Welcome to UltimateHealth Newsletter!",
  //   html: "<p>Thanks for subscribing!</p>",
  // });

  res.json({ success: true });
});
```

### Owner environment placeholders
```
# Mailchimp (if using Option B)
MAILCHIMP_API_KEY=owner_fills_this
MAILCHIMP_LIST_ID=owner_fills_this
MAILCHIMP_DC=owner_fills_this
```
