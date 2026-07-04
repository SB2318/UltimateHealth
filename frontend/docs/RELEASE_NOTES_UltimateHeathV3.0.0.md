# UltimateHealth Release Notes (Since 2.2.0)

We are excited to share the latest updates, features, and fixes since our `2.2.0` release. This release is massive and brings major new capabilities like the AI Persona Chat, Wellness Tracking, new offline media experiences, and huge UI/UX improvements. 

Thank you to everyone who contributed!

## 🚀 New Features & Enhancements

### AI & Chatbots
- **AI Persona Chat**: Brand new interactive AI Persona Chat feature.
- **AI Chatbot Accessibility**: Added TTS (Text-to-Speech) accessibility for AI responses.
- **Chatbot Verification**: Added chatbot response verification with UI indicators.
- **AI Research Summaries**: Added `ResearchSummaryCard` powered by Gemini to generate concise research summaries.

### Health & Wellness
- **Wellness Tracking Dashboard**: Added a new dashboard to monitor wellness and tracking metrics.

### Article & Feed Experience
- **Double Tap to Like**: Quickly engage with content by double-tapping article cards.
- **Trust Article**: Added Trust Article feature to verify credibility.
- **Reading History**: Introduced a "Recently Read" history tab so you can easily pick up where you left off.
- **Reading Insights**: Added estimated reading time and reading difficulty indicators on health articles.
- **Sharing**: Added a rich article share preview card and modal.

### Media & Podcasts
- **Offline Playback Engine**: Introduced `mmkv-cache-podcast-storage` for offline podcast caching.
- **Playback Progress**: Track podcast playback position seamlessly.
- **Audio Visuals**: Added a custom reanimated audio waveform visualizer for podcasts.
- **Offline States**: Added offline playback indicators when audio fails to load, along with empty states for offline podcasts.

### UI / UX & Accessibility
- **Network Connectivity**: Implemented a network connectivity banner.
- **Settings & Preferences**: Added language preference filtering, and notification preferences search.
- **Interactive UI**: Added scroll-to-bottom buttons, improved article text scaling controls, and a Glossary Bottom Sheet component.
- **Empty States**: Improved "no articles" and "notifications" empty states with theme-aware components.

### Repository & CI Automation (For Contributors)
- **AI GitHub Bots**: Added comprehensive AI Triage and Assignment Bots to manage untriaged issues.
- **AI Code Review**: Scheduled AI reviewer bots for automated PR feedback with workflow_dispatch manual runs.
- **GSSOC 2026**: Added GSSOC 2026 program card and enforced GSSoC PR validations.

## 🐛 Bug Fixes & Stability

- **UI & Rendering**: Stabilized list rendering using stable keys; replaced hardcoded colors with Tamagui theme tokens.
- **Media**: Resolved TTS pause/resume chunk rewinding issues and cleaned up player state listeners.
- **Security**: Mitigated high-severity XSS and webview navigation vulnerabilities; stripped sensitive console logs in production.
- **Performance**: Debounced auth buttons to prevent double submissions; added fallback configurations for secure storage.

## 📝 Documentation

- Added a comprehensive `ARCHITECTURE.md` with system flow diagrams.
- Added `SECURITY.md` detailing the vulnerability reporting policy.

## 💖 Contributors

A massive thank you to the 100+ contributors who made these changes possible since 2.2.0. Below is the list of contributors and their commit counts:

| Contributor | Commits | Contributor | Commits |
| :--- | :--- | :--- | :--- |
| S. B. \| Software Developer | 256 | github-actions[bot] | 69 |
| Deepesh Kafaltiya | 8 | Krishna Veernala | 8 |
| Sumit Kumar | 8 | Krishna Kumar | 7 |
| N.Sri Venkatesh | 7 | Namraa Patel | 7 |
| prakash meena | 7 | Vaishali Varma | 6 |
| anushkasrvstv | 6 | Gurkaran18 | 5 |
| PeswikaBavagni-30 | 5 | SarthakKharche | 5 |
| dependabot[bot] | 5 | vaishnavi003-svg | 5 |
| Akshat Singhai | 4 | Keerthana | 4 |
| Krishna Jha | 4 | Tomeshwari Sahu | 4 |
| Deepak | 3 | Hasini2706 | 3 |
| John Stewartsson J R | 3 | Karan Singh | 3 |
| Kinara2020 | 3 | Mayur Sahare | 3 |
| Priyanshu1-62 | 3 | Sha-lini3 | 3 |
| Shrestha-ijarwal | 3 | Srejoye | 3 |
| VirenSumbly | 3 | pratyakshasingh281-coder | 3 |
| shravi25 | 3 | vedant7007 | 3 |
| vinayak lal | 3 | Amrit | 2 |
| Anirudh Sahu | 2 | Bhavya sree | 2 |
| Dhruval Bhinsara | 2 | Divanshu Aggarwal | 2 |
| KRITIKA-l | 2 | MAYUR AJIT SAHARE | 2 |
| MajBlaze | 2 | Prakash Meena | 2 |
| Puneeth_Darisi | 2 | Saurabh Kumar Bajpai | 2 |
| SwaraMishra07 | 2 | Test User | 2 |
| codecrafted1 | 2 | dinesh9997 | 2 |
| kandhwayanushka-hue | 2 | minhaj_parveenh | 2 |
| prernaajaypatil-oss | 2 | riya-dumbare | 2 |
| ARPAN ADHIKARY | 1 | Aashita101 | 1 |
| Abdulhaque | 1 | Aditya Bhandari | 1 |
| Anjali Kumari | 1 | Arpita Raj | 1 |
| Ashley-Shine | 1 | Bheeme_497 | 1 |
| Bhuvanesh S | 1 | Dhandapanikeerthana | 1 |
| Disha Malukani | 1 | Farisha N A | 1 |
| GUJJU DINESH | 1 | HASINI | 1 |
| Harshita Vaishnav | 1 | Ishita Zope | 1 |
| Jana | 1 | Jeet-Paghdar | 1 |
| Joshua Jacob Thomas | 1 | Jyoti | 1 |
| KINARA PATEL | 1 | Kruthi Annanki | 1 |
| Mannat Jain | 1 | Minhaj Parveen.H | 1 |
| Nikkiraj4 | 1 | PALAK JAISWAL | 1 |
| Parth Nakum | 1 | Patel Namraa | 1 |
| Piyush Semalti | 1 | Prerna Singh | 1 |
| Prerna singh | 1 | Priyanshu Singh | 1 |
| Ranjit1401 | 1 | Rehan Ahmad | 1 |
| S V RAMA SANTOSH | 1 | Sahil | 1 |
| Saylee | 1 | Shalini Yadav | 1 |
| SonalMittal-14 | 1 | Vanshika Maheshwari | 1 |
| Vikash Rajput | 1 | Yogender-verma | 1 |
| Yug-Gupta | 1 | akshayad2006-cdm | 1 |
| anjali62510-star | 1 | deepsikha-dash | 1 |
| ishita526 | 1 | karthikeyakakarlapudi2007 | 1 |
| keert | 1 | manishcoder92 | 1 |
| paruuup | 1 | pratik ankush bandgar | 1 |
| smridhi-07 | 1 | tenax | 1 |
| vipul674 | 1 | wombfrk.exe | 1 |
