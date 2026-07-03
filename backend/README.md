<h1 align="center"> UltimateHealth Backend</h1>

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io)

<br/>

[![Live Web Demo](https://img.shields.io/badge/Live%20Web%20Demo-4CAF50?style=for-the-badge&logo=globe&logoColor=white)](https://uhsocial.in)
[![Android App](https://img.shields.io/badge/Android%20App-Play%20Store-34A853?style=for-the-badge&logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth)
[![API Docs](https://img.shields.io/badge/API%20Docs-007ACC?style=for-the-badge&logo=swagger&logoColor=white)](https://uhsocial.in/docs)
[![Content API](https://img.shields.io/badge/Content%20API-FF6B00?style=for-the-badge&logo=python&logoColor=white)](https://uhsocial.in/content-intel/docs)

</div>


<div align="center">
<table>
  <tr>
    <td align="center"><b>🧾 License</b></td>
    <td align="center"><b>🌟 Stars</b></td>
    <td align="center"><b>🍴 Forks</b></td>
    <td align="center"><b>🐛 Issues</b></td>
  </tr>
  <tr>
    <td align="center"><img alt="License" src="https://img.shields.io/github/license/SB2318/ultimateHealth-backend?style=flat&logo=github&color=success"/></td>
    <td align="center"><img alt="Stars" src="https://img.shields.io/github/stars/SB2318/ultimateHealth-backend?style=flat&logo=github&color=success"/></td>
    <td align="center"><img alt="Forks" src="https://img.shields.io/github/forks/SB2318/ultimateHealth-backend?style=flat&logo=github"/></td>
    <td align="center"><img alt="Issues" src="https://img.shields.io/github/issues/SB2318/ultimateHealth-backend?style=flat&logo=github"/></td>
  </tr>

  <tr>
    <td align="center"><b>🔄 Open PRs</b></td>
    <td align="center"><b>✅ Closed PRs</b></td>
    <td align="center"><b>⏱️ Last Commit</b></td>
   
  </tr>
  <tr>
    <td align="center"><img alt="Open PRs" src="https://img.shields.io/github/issues-pr/SB2318/ultimateHealth-backend?style=flat&logo=github"/></td>
    <td align="center"><img alt="Closed PRs" src="https://img.shields.io/github/issues-pr-closed/SB2318/ultimateHealth-backend?style=flat&color=critical&logo=github"/></td>
    <td align="center"><img alt="Last Commit" src="https://img.shields.io/github/last-commit/SB2318/ultimateHealth-backend?style=flat&color=informational&logo=github"/></td>
    
  </tr>
</table>
</div>


**The core backend engine** powering **[UltimateHealth](https://uhsocial.in)** — a community-driven open-source health platform.

Provides secure, scalable REST APIs for:
- Multilingual health articles & podcasts
- Collaborative content review & moderation
- User authentication (JWT)
- Admin & user analytics
- Reporting & safety features

##  Submodule Repositories

- **Frontend Repository**: [ultimatehealth-app](https://github.com/SB2318/UltimateHealth)
- **Admin Repository**:  [ultimatehealth-admin](https://github.com/SB2318/ultimatehealth-admin-app)
- **Content Checker Repository**:  [content-checker](https://github.com/SB2318/VeriWise-Content-Check)

---

## ✨ Key Features

- Full CRUD for Articles & Podcasts with review workflow
- JWT Authentication + Protected Routes
- Content Moderation System (strikes, bans, flagging)
- Admin Dashboard APIs + Analytics
- Swagger UI for interactive API documentation
- Environment-based configuration
- Error handling & validation

**Live API Docs**: [https://uhsocial.in/docs](https://uhsocial.in/docs)

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT
- **Docs**: Swagger (OpenAPI 3)
- **Others**: dotenv, cors, etc.

---

## 🚀 Quick Start

1. Clone the repo
   ```bash
   git clone https://github.com/SB2318/ultimatehealth-backend.git
   cd ultimatehealth-backend

2. Install dependencies

```bash
   yarn install
   replace your .env
```

 3. Create **.env** file (see **.env.example**)

```bash
PORT=YOUR_PORT_HERE

MONGODB_URL= YOUR_DATABASE_URL_HERE
BASE_URL = SERVER_BASE_URL_HERE

# JWT Secrets - Use different secrets for different token types for enhanced security
JWT_ACCESS_SECRET= YOUR_ACCESS_TOKEN_SECRET_KEY
JWT_REFRESH_SECRET= YOUR_REFRESH_TOKEN_SECRET_KEY
JWT_VERIFICATION_SECRET= YOUR_VERIFICATION_TOKEN_SECRET_KEY

# JWT Expiration Times (configurable)
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
JWT_VERIFICATION_EXPIRY=1h

# Legacy JWT Secret (deprecated - migrate to separate secrets)
JWT_SECRET= JWT_SECRET_KEY

EMAIL= EMAIL_ID
PASSWORD= MAIL_PASSWORD
SMTP_HOST= YOUR_MAIL_HOST
EMAIL_USER= YOUR_MAIL_ID
EMAIL_PASS= YOUR_MAIL_PASSWORD
VULTR_ACCESS_KEY = 'YOUR_ACCESS_KEY';
VULTR_SECRET_KEY = 'YOUR_SECRET_KEY';
BUCKET_NAME = 'YOUR_BUCKET_NAME';
ENDPOINT_URL = 'YOUR_ENDPOINT_URL';
```

4. Run The Server
```
  yarn start
```

## 📁Project Structure

```
ultimatehealth-backend/
├── src/
├── config/          # Database & environment config
├── controllers/     # Request handlers
├── middleware/      # Auth, validation, error handling
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── utils/           # Helper functions
├── services/      
├── index.js
├── .env.example
├── package.json
└── README.md
```

## 🤝 How to Contribute

We welcome contributions! This backend is open for **students, developers, and open-source enthusiasts**.

### Getting Started

- Read our **[CONTRIBUTING.md](./CONTRIBUTING.md)** for detailed guidelines.
- Look for issues labeled with **`good-first-issue`** — perfect for beginners.


### Popular Contribution Areas

- Adding new API endpoints
- Improving error handling & validation
- Writing unit/integration tests
- Enhancing Swagger documentation
- Performance optimizations
- Fixing bugs and improving code quality
- Adding more test coverage

---

<div align = "center">
 <h3>Thank you for contributing to our repository</h3>
 <h1> We appreciate your help in making UltimateHealth even better.😃</h1>


 <table>
  <p align="center">
  <tr>
    <td align="center"><a href="https://github.com/SB2318"><img src="https://avatars.githubusercontent.com/u/87614560?v=4" width="120px;" alt=""/><br/><sub><b>Susmita Bhattacharya</b></sub></a></td>
    <td align="center"><a href="https://github.com/rushiii3"><img src="https://avatars.githubusercontent.com/u/105168088?v=4" width="120px;" alt=""/><br/><sub><b>HRUSHIKESH SHINDE</b></sub></a></td>
    <td align="center"><a href="https://github.com/ionfwsrijan"><img src="https://avatars.githubusercontent.com/u/201338831?v=4" width="120px;" alt=""/><br/><sub><b>SrijanCodes</b></sub></a></td>
 
     
 </tr>
 </table>
 </div>



If you're new to open source, feel free to ask questions by opening a Discussion or commenting on an issue.

  


