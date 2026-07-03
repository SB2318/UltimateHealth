const admin = require("firebase-admin");

var serviceAccount = require("../ultimatehealth-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;