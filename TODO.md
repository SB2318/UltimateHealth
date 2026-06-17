- [x] Add robust non-finite point validation + early rejection to signatureValidation.js
- [x] Add unit tests covering NaN/Infinity points and invalid bounds behavior
- [ ] Fix getPos() to safely handle invalid canvas geometry (zero/NaN width/height) by returning null/ignored points
- [ ] Update admin-agreement/page.tsx to ignore invalid points during drawing/stroke updates
- [x] Double-check by running signatureValidation unit tests (node --test)


