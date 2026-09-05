# UltimateHealth Web Project

This branch (`web`) is dedicated to the UltimateHealth web application. The mobile/app codebase is located on the `main` branch.

## Getting Started

To switch to the mobile app development branch, run:

```bash
git checkout main
```

To switch back to the web application development branch, run:

```bash
git checkout web
```

## Contributing & Development

Interested in contributing to the UltimateHealth web project? Please check out our [CONTRIBUTING.md](/CONTRIBUTING.md) file for a step-by-step local development setup guide, directory structures, and a comprehensive overview of reusable UI components in `web/src/components/ui`.

For detailed Pull Request workflows, coding quality, and premium design standards, please also see [PR_GUIDELINES.md](/PR_GUIDELINES.md).


## Docker Build & Run

You can build and run the web application using Docker.

1. **Build the Docker image**
   Run the following command from the root of the repository:
   \\\ash
   docker build -t ultimatehealth-web .
   \\\

2. **Run the Docker container**
   \\\ash
   docker run -p 3000:3000 ultimatehealth-web
   \\\
   The application will be accessible at \http://localhost:3000\.

