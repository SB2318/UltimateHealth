# Frontend run instructions

Prerequisites
- Node.js 20 (the version pinned by the repository)
- Yarn 4 (the package manager declared by `package.json`)
- For native builds: Android Studio / Xcode (optional for run:android/run:ios)
- For push notifications: run on a physical device; configure FCM for Android

Quick start

1. Install dependencies

```bash
cd frontend
yarn install
```

2. Run the app

```bash
yarn start
```

3. Run the Expo development build

```bash
yarn expo start --dev-client
```

The app uses native modules that are not available in Expo Go. Install or build the
development client first, then scan the QR code from the development build.

4. Run on Android device/emulator

```bash
yarn android
```

Notes
- If your editor still shows TypeScript errors after these steps, restart the TypeScript server or reload VS Code.
- Expo push notifications require FCM setup for Android (google-services.json) and testing on a physical device for Expo push tokens.
