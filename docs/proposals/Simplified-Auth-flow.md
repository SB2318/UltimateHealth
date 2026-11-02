# Simplified Google-Only Authentication Flow

## Overview

This proposal simplifies the current authentication experience by removing the traditional email/password-based flow entirely.

The app will use **Google Sign-In as the primary authentication method**, with users first selecting whether they are joining as a **General User** or a **Doctor**.

The frontend will remain lightweight. It will only handle user interaction and navigation, while the backend remains responsible for authentication, account creation, email verification, token generation, and profile status.

---

## Proposed User Flow

The authentication experience will be handled through a single `SignInScreen` with two steps.

### Step 1: Select Role

When the user opens the app, they will first choose how they want to use UltimateHealth:

* General User
* Doctor

After selecting a role, the user can tap **Next** to continue.

The screen will also provide a **Continue as Guest** option.

### Step 2: Sign In

The second step will display:

* **Sign in with Google**
* **Continue as Guest**

The transition between Step 1 and Step 2 will use a simple slide animation.

After successful Google authentication, the frontend will send the Google ID token and selected role to the backend:

```text
POST /auth/google
```

Request body:

```json
{
  "idToken": "google-id-token",
  "role": "USER | DOCTOR"
}
```

---

## Backend-Driven Authentication

The backend will determine what happens after Google authentication. The frontend should only react to the returned response.

### New User

If the backend creates a new account and email verification is still required:

* Do not store an authentication token.
* Show the `EmailVerifyModal`.
* Keep the user on `SignInScreen`.

The user will verify their email and then sign in again.

### Existing Verified User

If the user is already verified:

* Receive the authentication token and user data.
* Store the authentication state in Redux.
* Navigate directly to `TabNavigation`.

### Doctor Without a Completed Profile

If the user is a doctor but has not completed their doctor profile:

* Store the authentication token and user data.
* Set `doctorProfileIncomplete` to `true`.
* Navigate to `TabNavigation`.
* Show a persistent profile completion banner across the app.

This allows doctors to enter the application while clearly guiding them to complete their profile.

---

## New Components

### `SignInScreen.tsx`

This screen will replace the current multi-screen authentication flow.

It will replace the following navigation routes:

* `LoginScreen`
* `SignUpScreenFirst`
* `SignUpScreenSecond`
* `OtpScreen`
* `NewPasswordScreen`

The old files can remain in the project temporarily, but they will no longer be accessible through navigation.

---

### `EmailVerifyModal.tsx`

A centered modal will inform newly created users that they need to verify their email.

The modal will include:

* A clear email verification message.
* The user's email address.
* A **Resend Email** action.
* An **OK, Got It** action.

After dismissing the modal, the user will remain on the sign-in screen.

---

### `DoctorProfileBanner.tsx`

A persistent banner will be shown when:

```text
isDoctor === true
AND
doctorProfileIncomplete === true
```

The banner should appear consistently across tab screens and encourage the doctor to complete their profile.

It will include a **Complete Now** action that navigates to `DoctorProfileScreen`.

Once the profile is successfully completed, the backend/frontend state should update and the banner should disappear permanently.

---

## Navigation Changes

### Remove from `StackNavigation.tsx`

The following screens will no longer be registered in the authentication flow:

* `LoginScreen`
* `SignUpScreenFirst`
* `SignUpScreenSecond`
* `OtpScreen`
* `NewPasswordScreen`

### Add

```ts
SignInScreen
```

The root stack type should also be simplified to:

```ts
SignInScreen: {
  redirectTo?: RedirectTo;
}
```

All references to the old signup and login routes should be updated accordingly.

---

## Redux Changes

Add a new authentication state:

```ts
doctorProfileIncomplete: boolean;
```

This value will be controlled by the authentication and doctor-profile responses.

It should be set when the backend indicates that a doctor has authenticated successfully but has not yet created or completed their doctor profile.

---

## Guest Flow Changes

`GuestPlaceholderScreen.tsx` should no longer direct users toward signup.

The existing **Sign Up** action should be replaced with:

**Sign in with Google**

Tapping it should navigate to:

```text
SignInScreen
```

Any remaining navigation references to `SignUpScreenFirst` should be removed.

---

## Google Sign-In Library

The recommended choice is:

`@react-native-google-signin/google-signin`

This is the better fit because the application already uses a development client with `expo-dev-client`.

It provides a more native Google Sign-In experience and gives direct access to the Google ID token needed by the backend.

The alternative, `expo-auth-session`, would also work, but it relies more heavily on the system browser flow.

Since the project already uses a development client, the native Google Sign-In library is the preferred approach.

---

## Verification Checklist

* [ ] Fresh app launch opens `SignInScreen`.
* [ ] User can select General User or Doctor.
* [ ] Tapping Next moves to the Google Sign-In step.
* [ ] Back navigation returns to role selection.
* [ ] Guest users can continue without authentication.
* [ ] New Google users see the email verification modal.
* [ ] New unverified users do not receive an active app token.
* [ ] Verified users are redirected to `TabNavigation`.
* [ ] Doctors without a completed profile see the persistent completion banner.
* [ ] Tapping **Complete Now** opens the doctor profile flow.
* [ ] Completing the doctor profile removes the banner.
* [ ] Guest placeholder screens redirect users to `SignInScreen`.
* [ ] No Forgot Password flow remains in navigation.
* [ ] No traditional email/password signup or login screen remains accessible.

## Final Outcome

The new flow reduces authentication to a simple, role-based Google Sign-In experience.

Instead of maintaining separate login, signup, OTP, password reset, and verification screens, the app will have one entry screen with two simple steps. The backend remains responsible for account state, while the frontend reacts to clear response flags and navigates accordingly.

This creates a cleaner user experience, reduces unnecessary frontend authentication logic, and makes the overall flow easier to maintain.
