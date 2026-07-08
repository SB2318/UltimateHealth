# Testing Patterns

## Core Sections (Required)

### 1) Test Stack and Commands

- **Primary test framework:** Jest 29.x (via `jest-expo` preset)
- **Assertion/mocking tools:** `@testing-library/react-native` 13.x, `@testing-library/jest-native` 5.x, manual Jest mocks in `jest.setup.ts`
- **Commands:**
  ```bash
  # Run all tests (with --passWithNoTests to avoid CI failure)
  yarn test

  # Equivalent to: jest --passWithNoTests --ci
  ```

### 2) Test Layout

- **Test file placement pattern:** Co-located `__tests__/` directories adjacent to source files:
  - `src/components/__tests__/` — 9 component tests
  - `src/store/__tests__/` — 4 Redux slice tests
  - `src/helper/__tests__/` — utility tests (e.g., `followNotification.test.ts`, `notificationUtils.test.ts`)
  - `src/screens/__tests__/` — screen-level tests
  - `src/__tests__/` — app-level tests (3 files)
- **Naming convention:** `*.test.ts` for pure logic, `*.test.tsx` for component/render tests. Examples: `FloatingSpeedSelector.test.tsx`, `GlassButton.test.tsx`, `dataSlice.test.ts`, `SummaryService.test.ts`.
- **Setup files:** `frontend/jest.setup.ts` — runs before all tests. Mocks: react-native-reanimated, react-native-gesture-handler, react-native-worklets, AsyncStorage, react-native-fs, expo-font, expo-constants, expo-secure-store, Sentry, Tamagui, react-native-tts.

### 3) Test Scope Matrix

| Scope | Covered? | Typical target | Notes |
|-------|----------|----------------|-------|
| Unit | Partial | Utility functions, Redux slices, some helper modules | 4 store slice tests, 3 app-level tests, helper utility tests. Focused on data/state logic. |
| Component | Partial | UI components | 9 component tests in `components/__tests__/`. Tests include: `EmptyStates`, `FloatingSpeedSelector`, `GlassButton`, `GlossaryBottomSheet`, `LanguagePreferenceSelector`, `Loader`, `LoadingSpinner`, `NetworkBanner`, `ReadingDifficulty`. |
| Integration | Minimal | Service-level | `SummaryService.test.ts` — tests summary generation logic |
| E2E | None | [N/A] | [TODO] No E2E test framework or configuration detected |

### 4) Mocking and Isolation Strategy

- **Main mocking approach:** Module-level mocking via `jest.mock()` in `jest.setup.ts`. Heavy use of manual mocks for React Native native modules, Expo modules, and third-party libraries.
  - Tamagui components are mocked with lightweight React Native view/text wrappers
  - Native modules (gesture handler, reanimated, worklets) fully mocked
  - Async storage mocked with Promise-resolving stubs
  - Sentry init/wrap no-oped; Sentry methods captured as spies
  - Expo modules (font, constants, secure store) mocked with minimal stubs
- **Isolation guarantees:** Each test file runs in isolation via Jest's worker pool. `__tests__` directories are separate — no shared fixtures or integration test databases detected.
- **Common failure mode in tests:** Native module dependencies (react-native-reanimated, gesture handler, worklets) require extensive mocking. Missing or insufficient mocks cause cryptic errors. Jest transform ignores must include native packages.

### 5) Coverage and Quality Signals

- **Coverage tool + threshold:** No coverage tool or threshold configured. `jest.config.js` has no `coverageThreshold` or `collectCoverage` set.
- **Current reported coverage:** [TODO] — no coverage report infrastructure detected.
- **Known gaps/flaky areas:**
  - No tests for the majority of screens (30+ screen files, only a few have tests)
  - No tests for navigation configuration
  - No tests for API hooks (~90 hooks, minimal testing)
  - No E2E tests
  - `PreviewScreen.compensatingDelete.test.tsx` — only screen test detected
  - No integration tests against actual or mocked backend API

### 6) Evidence

- `frontend/jest.config.js` — Jest config
- `frontend/jest.setup.ts` — mock setup
- `frontend/package.json` — test script and devDependencies
- `frontend/src/components/__tests__/` — component test directory
- `frontend/src/store/__tests__/` — slice test directory
- `frontend/src/helper/__tests__/` — utility test directory
