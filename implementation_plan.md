# UltimateHealth Next.js Migration: 50 Granular GitHub Issues

This document provides a hyper-granular breakdown of the web project's migration to Next.js. Each issue is designed to be completed in 2-4 hours.

---

## Phase 1: Core Infrastructure (Issues 1-5)

1. **[Infra] Project Scaffold** [COMPLETED]: Initialize Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 in the `/web` directory.
2. **[Infra] Router Config** [COMPLETED]: Setup folder-based App Router structure under `src/app` (pages `/`, `/login`, `/login-admin`, `/goodbye`, `/admin-agreement`).
3. **[Infra] API Client**: Setup custom `fetch` wrapper or Axios instance in `src/utils/api.ts` with base URL `https://uhsocial.in/api/` and global error handling interceptors.
4. **[Infra] Auth State**: Implement user session management (local storage, context provider) tracking `accessToken` and `refreshToken` for active login states.
5. **[Infra] Theme Setup** [COMPLETED]: Define Tailwind CSS v4 styling variables and custom utility classes in `src/app/globals.css`.

---

## Phase 2: Atomic Design System (Issues 6-12)

6. **[Design] Typography**: Define global typography styles in `globals.css` using Next.js font configuration (`next/font/google` for Inter).
7. **[Design] Buttons**: Build a reusable `Button` component in `src/components/ui/Button.tsx` supporting variants (`primary`, `secondary`, `outline`, `ghost`) using Tailwind CSS (replacing legacy CSS-in-JS style objects).
8. **[Design] Input Fields**: Build a reusable `Input` component in `src/components/ui/Input.tsx` with clear styles for states like focus, error, and disabled.
9. **[Design] Modals**: Build a reusable `Modal` component in `src/components/ui/Modal.tsx` featuring a glassmorphic background and entry/exit animations.
10. **[Design] Loaders**: Setup generic custom `Skeleton` loaders for article previews and a global `Spinner` loader.
11. **[Design] Badges/Chips**: Create a reusable `Badge` component in `src/components/ui/Badge.tsx` for categories and status fields.
12. **[Design] Layout Grid**: Refactor the Tailwind grid configs in layouts to enforce standard container-based alignments across all viewports.

---

## Phase 3: Landing Page (Issues 13-19)

13. **[Home] Navigation Bar** [COMPLETED]: Refactor fixed header inside layout file with glassmorphic styles and mobile toggle button.
14. **[Home] Hero Section** [COMPLETED]: Integrate hero headline, subtext, and fadeInUp entry animation.
15. **[Home] Play Store Links** [COMPLETED]: Implement store redirection links for Google Play Store and UHealth Admin downloads.
16. **[Home] App Store Links** [COMPLETED]: Add Apple App Store TestFlight invitation logic and coming soon buttons.
17. **[Home] Screenshot Carousel** [COMPLETED]: Rebuild interactive image sliders for mobile screenshots (User & Admin apps) using React hooks.
18. **[Home] Features Grid** [COMPLETED]: Rebuild features grid displaying contributor capabilities and reviewer roles with animations.
19. **[Home] Programs Showcase** [COMPLETED]: Design showcase grid detailing participation in IEEE, Vultr Cloud Hackathon, and GSSoC.

---

## Phase 4: Article Hub - Discovery (Issues 20-25)

20. **[ArticleHub] Search Interface**: Create search route page (`src/app/articles/page.tsx`) with search query input fields.
21. **[ArticleHub] Category Filter**: Implement scrollable category navigation chips for filtering content by topic.
22. **[ArticleHub] Language Selector**: Dropdown selector allowing users to filter articles in their preferred language.
23. **[ArticleHub] Article Card UI**: Design custom cards featuring category badges, read times, and hover scaling.
24. **[ArticleHub] Infinite Scroll**: Implement scroll-triggered paginated loading to fetch next batches of articles.
25. **[ArticleHub] No Results UI**: Design clean empty-state placeholder when search or filter returns no matches.

---

## Phase 5: Article Detail & Engagement (Issues 26-30)

26. **[ArticleDetail] Route & Scaffold**: Route dynamic page `src/app/articles/[id]/page.tsx` for viewing details of an article.
27. **[ArticleDetail] Content Renderer**: Safely render article description and rich media content.
28. **[ArticleDetail] Author Profile**: Author attribution card showing biography and total contributions.
29. **[ArticleDetail] Share Buttons**: Floating share utility triggers for social networks (Twitter, LinkedIn, WhatsApp).
30. **[ArticleDetail] Comment System**: Threaded discussion interface including comment rendering and submission inputs.

---

## Phase 6: Authentication - User (Issues 31-36)

31. **[Auth] Signup Form UI**: Route registration page `src/app/signup/page.tsx` with name, email, and password inputs.
32. **[Auth] Signup Validation**: Implement frontend form validation checks and feedback warnings.
33. **[Auth] OTP Verification**: Design 6-digit OTP code verification flow for user email registration.
34. **[Auth] Login Page** [COMPLETED]: User login page (`src/app/login/page.tsx`) configured to handle API login and token storage.
35. **[Auth] Admin Login Page** [COMPLETED]: Admin login page (`src/app/login-admin/page.tsx`) configured to handle reviewer login and tokens.
36. **[Auth] Password Recovery**: Forgot/reset password email requesting and processing workflow.

---

## Phase 7: User Profile & Personalization (Issues 37-41)

37. **[Profile] Header & Avatar**: Setup profile dashboard route `src/app/profile/page.tsx` displaying user header details.
38. **[Profile] Edit Settings**: Form allowing users to modify biographical details, avatar, and displayName.
39. **[Profile] Contribution Dashboard**: Visual progress trackers and analytic counts of user contributions.
40. **[Profile] Activity Feed**: Sequential list detailing user comments, articles published, and edited items.
41. **[Profile] Notification Settings**: Form toggles managing email updates and push notifications preferences.

---

## Phase 8: Admin & Onboarding (Issues 42-46)

42. **[Admin] Agreement Reader** [COMPLETED]: Scrollable reader displaying Moderator Agreement guidelines.
43. **[Admin] Signature Canvas** [COMPLETED]: HTML5 Canvas signature drawing pad component supporting touch input.
44. **[Admin] Signature Controls** [COMPLETED]: Interface elements to clear and validate signature canvases.
45. **[Admin] Agreement Submission** [COMPLETED]: Endpoint integration sending parsed signatures to `/api/admin/upload-agreement`.
46. **[Admin] Verification Middleware**: Interceptor routing newly authenticated admins to sign the agreement prior to access.

---

## Phase 9: Account Management & Polishing (Issues 47-50)

47. **[Account] Deletion Confirmation**: Interactive modal triggering account deletion calls.
48. **[Account] Goodbye Screen** [COMPLETED]: Route `src/app/goodbye/page.tsx` displaying account deletion farewell page.
49. **[SEO] Meta Optimization** [COMPLETED]: Configured dynamic metadata headers inside Next.js layout configurations.
50. **[Performance] Dynamic Imports**: Implement code-splitting using `next/dynamic` to lazy-load massive components.
