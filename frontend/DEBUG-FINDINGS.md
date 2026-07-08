# DEBUG-FINDINGS.md — Frontend Setup Audit

**Project:** UltimateHealth Frontend
**Audit Date:** 2026-07-08
**Scope:** Package management, missing scripts/packages for `preview` and `npx expo`, configuration issues

---

## Summary

The frontend has a **package manager inconsistency** (yarn lockfile + pnpm script references with neither tool clearly owning the install), is **missing the `preview` script** required for EAS preview builds, has several **configuration issues** including a confirmed URL typo in `app.config.js`, and lacks a `.env` file needed for runtime configuration.

---

## Package Manager Analysis

### Current State

| Artifact | Exists? | Notes |
|----------|---------|-------|
| `yarn.lock` | ✅ YES (11028 lines) | `# yarn lockfile v1` → Yarn Classic v1 format |
| `.yarnrc` / `.yarnrc.yml` | ❌ NO | No Yarn configuration file |
| `.yarn/` directory | ❌ NO | No Yarn Berry/Modern directory |
| `pnpm-lock.yaml` | ❌ NO | pnpm lockfile absent |
| `package-lock.json` | ❌ NO | npm lockfile absent |
| `bun.lock` | ❌ NO | bun lockfile absent |
| `pnpm-workspace.yaml` | ❌ NO | pnpm workspace config absent |
| `node_modules/` | ✅ EXISTS | No lock-state marker identifiable (no `.yarn-state.yml`, `.pnpm`, `.package-lock.json`) |

### Installed Tools

| Tool | Status | Version |
|------|--------|---------|
| **yarn** | ❌ NOT INSTALLED GLOBALLY | Command fails (`'yarn' is not recognized`) |
| **pnpm** | ✅ INSTALLED GLOBALLY | v11.9.0 |
| **npm** | ✅ INSTALLED (ships with Node) | v11.16.0 |
| **npx** | ✅ INSTALLED (ships with Node) | v11.16.0 |

### Key Inconsistencies

1. **`package.json` uses Yarn workspaces but has no Yarn installation.**

   Line 133–135:
   ```json
   "workspaces": [
     "modules/*"
   ]
   ```
   This is Yarn/npm workspace syntax. pnpm requires `pnpm-workspace.yaml` instead, and when running `pnpm`, it warns:
   > `[WARN] The "workspaces" field in package.json is not supported by pnpm. Create a "pnpm-workspace.yaml" file instead.`

2. **The `quality` script invokes `pnpm run` despite a `yarn.lock` file.**

   Line 19:
   ```json
   "quality": "pnpm run type-check && pnpm run lint && pnpm run knip"
   ```
   This is the only reference to `pnpm` in the project. All other scripts use `expo` directly. If the project uses Yarn (as the lockfile implies), this script will fail with a Yarn-based install.

3. **`README-RUN.md` instructs `npm install` or `yarn`, not `pnpm`.**

   The docs say:
   ```bash
   npm install
   # or
   # yarn
   ```

### Verdict

The project was **most likely initially set up with Yarn Classic** (hence the `yarn.lock` v1), but either:
- Someone partially migrated to pnpm by changing the `quality` script but never completed the migration (no `pnpm-lock.yaml`, no `pnpm-workspace.yaml`), or
- The `quality` script was written for a different environment and accidentally committed.

The `node_modules/` directory may have been installed with any tool — there is no reliable marker to determine which one was used.

---

## Missing Scripts & Packages for Preview and Expo

### Current Scripts (from `package.json`)

```json
"start": "expo start",
"android": "expo run:android",
"ios": "expo run:ios",
"web": "expo start --web",
"lint": "expo lint",
"type-check": "tsc --noEmit",
"test": "jest --passWithNoTests --ci",
"knip": "knip",
"knip:deps": "knip --dependencies",
"knip:files": "knip --files",
"knip:exports": "knip --exports",
"knip:fix": "knip --fix",
"knip:check": "knip --no-progress",
"quality": "pnpm run type-check && pnpm run lint && pnpm run knip",
"postinstall": "patch-package"
```

### What's Missing

#### 1. `preview` script — MISSING

The `eas.json` already defines a `preview` build profile (line 11–13):
```json
"preview": {
  "distribution": "internal"
}
```

But there is **no npm/yarn script** to invoke it. Standard convention would be:
```json
"preview": "eas build --profile preview --platform all"
```
(or separate `preview:android` / `preview:ios` scripts)

Without this script, developers must remember the full `eas build` command manually.

#### 2. `export` script (web static export) — MISSING

Expo 56 supports `npx expo export` for generating a static web build. There is no script for this. Common convention:
```json
"export": "expo export",
"export:web": "expo export --platform web"
```

#### 3. `eas` is NOT in `devDependencies` — potentially missing

The `eas.json` exists and is configured, but `eas-cli` is **not listed** in `package.json` devDependencies. While `npx eas` works via npx, a local install is recommended for reproducible CI/CD. If developers run `eas build` and don't have it installed globally, it'll work via npx, but with version inconsistency.

#### 4. `@expo/cli` is NOT explicitly in `devDependencies`

With Expo 56, the CLI is bundled through the `expo` package itself, so this is less critical, but some projects explicitly pin `@expo/cli`.

### EAS Build Profiles Summary (from `eas.json`)

| Profile | Type | Distribution | Notes |
|---------|------|-------------|-------|
| `development` | dev client | internal | For local dev builds |
| `preview` | standard | internal | For QA/testing — **no script wraps this** |
| `production` | standard | store | Has `autoIncrement: true`, sets `SECRET_TOKEN` and `SENTRY_AUTH_TOKEN` |

---

## Configuration Issues Found

### 1. `app.config.js` Line 152 — PROD_URL Typo (CONFIRMED)

```javascript
PROD_URL:
  process.env.PROD_URL ?? "https://uhsocial.in/ap",
```

**Typo:** `/ap` should be `/api`.

Compare with `.env.example` line 6:
```
PROD_URL="https://uhsocial.in/api"
```

This means that **in production, when `PROD_URL` env var is not set, the app's API requests will go to `https://uhsocial.in/ap` instead of `https://uhsocial.in/api`**. This will cause all production API calls to fail with 404 unless the env var is explicitly set.

**Severity:** HIGH — would cause complete API outage in production if `PROD_URL` env var is not set.

### 2. `.env.example` Has Corrupted Content (Lines 32–39)

Lines 32–39 of `.env.example` contain malformed content:
```
{
  "expo": {
    "name": "UltimateHealth",
    "extra": {
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    }
  }
}
```

This is a mix of JSON and key=value syntax inside a `.env` file. It appears to be a copy-paste error from `app.json` that was never cleaned up. The `EXPO_PUBLIC_GEMINI_API_KEY` variable already exists correctly on line 25.

**Severity:** LOW — no runtime impact, but confusing for developers copying the example.

### 3. No `.env` File Present

A `.env` file does not exist (it's in `.gitignore` line 70, which is correct). This means:
- All `process.env.*` references in `app.config.js` will fall back to their `??` defaults
- The production API typo (`/ap` instead of `/api`) would be active
- Firebase config values will all be `undefined`

Developers need to copy `.env.example` to `.env` and fill in values.

### 4. `quality` Script Uses Wrong Package Manager

As noted above, `pnpm run` is used on line 19 but the project's lockfile is `yarn.lock`. Executing `yarn quality` would fail because yarn doesn't use `pnpm`. Executing `pnpm quality` would trigger the workspace warning about missing `pnpm-workspace.yaml`.

### 5. Metro Config — `unstable_enablePackageExports = false`

Line 23 of `metro.config.js`:
```javascript
config.resolver.unstable_enablePackageExports = false;
```

This disables the `exports` field in `package.json` resolution. This is intentional (some packages with `exports` cause issues with Metro), but it can prevent importing packages that rely solely on the `exports` field. If `npx expo export` or web builds fail with resolution errors, this setting may need to be reevaluated.

### 6. Web Output Set to `"single"` in `app.config.js` Line 81

```json
"web": {
  "output": "single",
  "favicon": "./assets/images/favicon.png"
}
```

`"single"` output means the web export generates a single-page app (SPA) with client-side routing. This is correct for `expo export --platform web`. If a multi-route static export is desired, this should be `"static"` instead. No change needed unless different routing behavior is expected.

### 7. `app.config.js` and `app.json` Have Duplicate Config

The `app.json` and `app.config.js` both define the same Expo configuration fields. `app.config.js` takes precedence and merges with the base `app.json` via `module.exports = ({ config }) => { ...config, ...defaultStaticConfig }`. The duplication is intentional (common Expo pattern) but means both files must be kept in sync.

---

## Recommended Fixes

### Critical — Fix Now

| # | Issue | Fix |
|---|-------|-----|
| 1 | **`PROD_URL` typo in `app.config.js` line 152** | Change `/ap` to `/api`: `process.env.PROD_URL ?? "https://uhsocial.in/api"` |
| 2 | **Package manager inconsistency** | **Choose one:** Either (a) clean-install with **pnpm** (remove `yarn.lock`, add `pnpm-lock.yaml` and `pnpm-workspace.yaml`, change all config), or (b) **install Yarn globally** and change `quality` script to `yarn run`, or (c) **use npm** (remove `yarn.lock`, generate `package-lock.json`) |

### Medium — Should Fix

| # | Issue | Fix |
|---|-------|-----|
| 3 | **Missing `preview` script** | Add `"preview": "eas build --profile preview --platform all"` to `scripts` in `package.json` (split into `preview:android` and `preview:ios` for platform-specific builds) |
| 4 | **Missing `export` script** | Add `"export": "expo export"` and/or `"export:web": "expo export --platform web"` for web static builds |
| 5 | **`quality` script broken** | Change to `"quality": "npm run type-check && npm run lint && npm run knip"` (if choosing npm) or `"yarn run ..."` (if choosing Yarn) or `"pnpm run ..."` (if choosing pnpm) — must match the chosen package manager |
| 6 | **`.env.example` corrupted lines 32–39** | Remove the malformed JSON block from `.env.example` |
| 7 | **No `.env` file** | Copy `.env.example` to `.env` and populate all required values |

### Low — Consider

| # | Issue | Consideration |
|---|-------|---------------|
| 8 | **`eas-cli` not in `devDependencies`** | Add `eas-cli` as a devDependency for reproducible CI builds |
| 9 | **Metro `unstable_enablePackageExports = false`** | If web export or bundling fails for packages relying on `exports`, set this to `true` or use `require.resolve` overrides |

---

## Metro Config Compatibility Check (for web/export)

| Check | Status | Notes |
|-------|--------|-------|
| `react-native-web` | ✅ Present (v0.21.0) | Required for web platform |
| Mock for `react-native-pager-view` | ✅ Present | `mocks/react-native-pager-view.js` properly aliased |
| `web.output: "single"` | ✅ Correct | SPA output for web export |
| `babel-preset-expo` | ✅ Present | Required for Expo transforms |
| Bundle splitting | ❌ Not configured | If needed for large web builds |
| Asset optimization | ❌ Not configured | Default Expo behavior applies |
| `unstable_enablePackageExports` | ⚠️ Set to `false` | May cause issues with packages relying on `exports` field |

The Metro config is **generally compatible** with `expo start --web` and `expo export`. The main risk is the `unstable_enablePackageExports = false` setting, which could block imports from packages that only define `exports` in their `package.json` (without a top-level `main` field).

---

## File-by-File Issue Map

```
package.json
  ├── [HIGH] Line 19: "quality" uses "pnpm run" but lockfile is yarn.lock
  ├── [MEDIUM] Lines 133-135: "workspaces" field incompatible with pnpm
  └── [MEDIUM] Missing "preview" and "export" scripts

yarn.lock
  └── [HIGH] Yarn v1 lockfile present, but yarn is NOT installed globally

app.config.js
  ├── [CRITICAL] Line 152: PROD_URL typo "/ap" instead of "/api"
  └── [LOW] Lines 117-119: Duplicate config with app.json (by design)

.env.example
  └── [LOW] Lines 32-39: Corrupted JSON mixed into .env format

eas.json
  └── [MEDIUM] Preview profile exists but no npm script wraps it

metro.config.js
  └── [LOW] Line 23: unstable_enablePackageExports = false (risk for some packages)
```

---

*End of debug findings. No changes were made — this was a read-only investigation.*
