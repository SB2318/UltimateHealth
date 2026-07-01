# TODO - Theme-aware dark mode refactor (#2035)

- [ ] Create a manual inventory of hardcoded color usages (white/black/hex literals) by opening likely component files.
- [x] Refactor `frontend/src/styles/GlobalStyle.ts` to remove hardcoded `white/black` and use centralized theme values.
- [x] Refactor empty/no/result UI components to use theme-aware colors.

- [ ] Refactor card/chip/badge/status components with hardcoded colors to use theme colors.
- [ ] Ensure components still preserve layout/behavior and improve contrast in dark mode.
- [ ] Run frontend lint/typecheck/tests and fix any TS/ESLint issues.

