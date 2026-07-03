# Contributing to UltimateHealth Backend

Thank you for considering contributing to **UltimateHealth Backend**! 🎉

We welcome contributions from everyone — whether you're a student, beginner, or experienced developer. Your help makes this open-source health platform better for the community.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)


---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code. Please report unacceptable behavior to ultimate.health25@gmail.com.

---

## How Can I Contribute?

You can contribute in many ways:

- **Reporting bugs**
- **Suggesting new features**
- **Improving documentation**
- **Fixing bugs**
- **Adding new API endpoints**
- **Writing tests**
- **Enhancing Swagger documentation**
- **Performance improvements**

---

## Getting Started

1. **Fork** this repository
2. **Clone** your forked repository:
   ```bash
   git clone https://github.com/yourusername/ultimatehealth-backend.git
   cd ultimatehealth-backend```

## Development Setup

1. Create a new branch from **main**
   ```
   git checkout main
   git checkout -b feature/your-feature-name #Example: feature/add-article-endpoint
   ```
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

## Pull Request Guidelines

### Before Submitting a Pull Request

- Ensure your code is clean and follows the existing style
- Test your changes properly
- Update Swagger documentation if you add or modify any API
- Add tests for new features (when possible)

### How to Submit a PR

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
2. Go to the original repository **(SB2318/ultimatehealth-backend)** and open a Pull Request:

3.  Go to the original repository: `SB2318/ultimatehealth-backend`

4. Click on **"New Pull Request"** or **"Compare & pull request"**.

5. Fill in the PR template with the following details:

   - **Title:**  
     Clear and descriptive (e.g., `feat: add article creation endpoint`)

   - **Description:**  
     Explain what changes you made and why.

   - **Issue Reference:**  
     Mention the issue it resolves (if any) using:  
     `Closes #issue-number`

   - **Additional Details:**  
     Add screenshots or testing steps if applicable.

## PR Title Format (Recommended)

Use these prefixes for better clarity:

- `feat:`     → New feature  
- `fix:`      → Bug fix  
- `docs:`     → Documentation changes  
- `refactor:` → Code refactoring  
- `style:`    → Code style changes  
- `test:`     → Adding or updating tests  
- `chore:`    → Maintenance tasks  

### Examples

- `feat: add user profile update endpoint`  
- `fix: resolve JWT refresh token error`  
- `docs: update Swagger documentation for auth routes`  

## Commit Message Guidelines

We follow **Conventional Commits**:

| Type       | Description                     |
|------------|---------------------------------|
| `feat:`     | New feature                     |
| `fix:`      | Bug fix                         |
| `docs:`     | Documentation changes           |
| `style:`    | Code formatting                 |
| `refactor:` | Code refactoring                |
| `test:`     | Adding or updating tests        |
| `chore:`    | Maintenance tasks               |

## Examples

```bash
feat: implement content moderation API
fix: handle missing fields in article creation
docs: update README with correct setup instructions
refactor: improve error handling in auth middleware
```

---
## What Happens Next?

- Your PR will be reviewed by the maintainers.  
- You may be asked to make changes based on the review feedback.  
- Once approved, your PR will be merged into the main branch.  

---

## Thank You 🙌

Thank you for contributing!  
Your efforts help make **UltimateHealth Backend** better for everyone.  





