# UltimateHealth React Migration: 50 Granular GitHub Issues

This document provides a hyper-granular breakdown of the project. Each issue is designed for a single developer or a small pair to complete in 2-4 hours. (More details will be available in the issue description on github)

---

## Phase 1: Core Infrastructure (Issues 1-5)

1. **[Infra] Project Scaffold**: Initialize Vite + React + TypeScript + Tailwind (if desired) or CSS Modules.
2. **[Infra] Router Config**: Setup `react-router-dom` with all route stubs and a `ProtectedRoute` wrapper.
3. **[Infra] API Client**: Setup Axios instance with base URL and error interceptors for global logging.
4. **[Infra] Auth State**: Implement Zustand store for `user`, `accessToken`, and `refreshToken`.
5. **[Infra] Theme Setup**: Define HSL color variables and dark/light mode toggle logic.

## Phase 2: Atomic Design System (Issues 6-12)

6. **[Design] Typography**: Define global styles for H1-H6, Body, and Muted text using Inter/Outfit fonts.
7. **[Design] Buttons**: Build `Primary`, `Secondary`, `Outline`, and `Ghost` button variants with hover/active states.
8. **[Design] Input Fields**: Build `TextInput`, `EmailInput`, and `PasswordInput` with error/focus states.
9. **[Design] Modals**: Create a base `Modal` component with glassmorphic backdrop and entry/exit animations.
10. **[Design] Loaders**: Design custom `Skeleton` loaders for article cards and a global `Spinner`.
11. **[Design] Badges/Chips**: Create reusable `Badge` components for categories and statuses.
12. **[Design] Grid System**: Define a responsive grid layout system for consistency across sections.

## Phase 3: Landing Page (Issues 13-19)

13. **[Home] Navigation Bar**: Implement fixed header with glassmorphism and mobile menu toggle.
14. **[Home] Hero Section**: Implement the main headline, subtext, and fadeInUp entrance animations.
15. **[Home] Play Store Links**: Design and build the Play Store/UHealth Admin download buttons.
16. **[Home] App Store Links**: Design and build the "Coming Soon" App Store placeholders.
17. **[Home] Screenshot Carousel**: Build a high-performance horizontal slider for app screenshots.
18. **[Home] Features Grid**: Rebuild the contribution and moderation feature cards.
19. **[Home] Programs Showcase**: Implement the grid for IEEE, Vultr, and GSSoC collaborations.

## Phase 4: Article Hub - Discovery (Issues 20-25)

20. **[ArticleHub] Search Interface**: Build the main search input with debounced API triggering.
21. **[ArticleHub] Category Filter**: Create horizontal scrollable filter chips for categories.
22. **[ArticleHub] Language Selector**: Implement a dropdown or modal for filtering by article language.
23. **[ArticleHub] Article Card UI**: Design the individual article cards with thumbnails and metadata.
24. **[ArticleHub] Infinite Scroll**: Implement logic to fetch next pages of articles on scroll.
25. **[ArticleHub] No Results UI**: Design a fallback "empty state" when search/filters yield no results.

## Phase 5: Article Detail & Engagement (Issues 26-30)

26. **[ArticleDetail] Content Renderer**: Build a robust renderer for article body text and images.
27. **[ArticleDetail] Author Profile**: Create the author attribution card below the article content.
28. **[ArticleDetail] Social Share**: Implement the floating/sticky share buttons for LinkedIn, Twitter, etc.
29. **[ArticleDetail] Comment List**: Fetch and render the threaded comment section.
30. **[ArticleDetail] Comment Input**: Create the authenticated input box for adding new comments.

## Phase 6: Authentication - User (Issues 31-36)

31. **[Auth] Signup Form UI**: Build the registration screen with all required fields.
32. **[Auth] Signup Validation**: Implement front-end validation (email format, password strength).
33. **[Auth] OTP Verification UI**: Design the screen for entering the 6-digit verification code.
34. **[Auth] Verification Logic**: Connect to the OTP verification API and handle success/fail states.
35. **[Auth] Login Screen**: Build the login form with "Remember Me" functionality.
36. **[Auth] Password Recovery**: Implement the "Forgot Password" email request flow.

## Phase 7: User Profile & Personalization (Issues 37-41)

37. **[Profile] Header & Avatar**: Design the profile header with avatar upload functionality.
38. **[Profile] Edit Settings**: Build the form for updating user biography and name.
39. **[Profile] Analytics View**: Implement the visual contribution dashboard (e.g., total articles).
40. **[Profile] Activity Feed**: Build a list showing the user's recent comments and edits.
41. **[Profile] Notification Settings**: Create toggles for email and push notification preferences.

## Phase 8: Admin & Onboarding (Issues 42-46)

42. **[Admin] Agreement Reader**: Build the scrollable viewer for the Moderator Agreement text.
43. **[Admin] Signature Canvas**: Implement the `SignaturePad` using HTML5 Canvas with touch support.
44. **[Admin] Signature Controls**: Add `Clear`, `Undo`, and `Confirm` buttons for the signature.
45. **[Admin] Agreement Submission**: Logic to package signature + metadata and send to the backend.
46. **[Admin] Access Verification**: Middleware to check if an admin has signed the agreement before entry.

## Phase 9: Account Management & Polishing (Issues 47-50)

47. **[Account] Deletion Flow**: Build the confirmation modal and warning for account deletion.
48. **[Account] Goodbye Screen**: Rebuild the farewell page for deleted accounts.
49. **[SEO] Meta Management**: Integrate `react-helmet` to handle dynamic titles for all routes.
50. **[Performance] Lazy Load Boundaries**: Implement `React.Suspense` and `lazy` for all major page routes.
