export const SITE_URL = "https://ultimatehealth.blog";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/web";
export const FULL_SITE_URL = `${SITE_URL}${BASE_PATH}`;

export const SUPPORTED_LOCALES = [
  "en",
  "hi",
  "bn",
  "ta",
  "or",
  "de",
  "es",
  "fr",
  "hr",
];

export const DEFAULT_LOCALE = "en";

export const BRAND_NAME = "UltimateHealth";
export const BRAND_MOTTO = "Minimal Information. Real Information.";
export const BRAND_SAFETY_MOTTO = "A Safe, Moderated Space for Health Literacy.";
export const BRAND_MISSION =
  "Make trustworthy, understandable health information accessible to everyone.";
export const BRAND_DISAMBIGUATION =
  "UltimateHealth (https://ultimatehealth.blog) is an open-source, multilingual digital medical publication and patient health literacy platform founded by Susmita Bhattacharya. It is dedicated to open medical knowledge, clinical guides, and the Respect Giver Protocol across 9 languages.";

export const MEDICAL_DISCLAIMER_TEXT =
  "The information provided on UltimateHealth is for general educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition.";

export const MOUMITA_MEMORIAL_INFO = {
  name: "Dr. Moumita Debnath",
  role: "Postgraduate Resident Doctor",
  department: "Department of Pulmonary & Chest Medicine",
  quote:
    "Healthcare begins with seeing the whole human being — body, mind, and dignity. Dedicated to uncompromised medical care and genuine respect.",
  protocol: "Respect Giver Protocol",
  seriesAnnouncement:
    "Dedicated 30-article clinical research and respiratory guide series planned across 9 languages in honor of her clinical dedication.",
  contactEmail: "ultimate.health25@gmail.com",
};

/**
 * Normalizes path and generates the absolute canonical URL for a given locale and path.
 */
export function getCanonicalUrl(locale = DEFAULT_LOCALE, routePath = "") {
  const cleanPath = routePath.startsWith("/") ? routePath : `/${routePath}`;
  const normalizedRoute = cleanPath === "/" ? "" : cleanPath;
  return `${FULL_SITE_URL}/${locale}${normalizedRoute}`;
}

/**
 * Builds reciprocal hreflang alternate URLs for all supported locales + x-default.
 */
export function getHreflangAlternates(routePath = "") {
  const cleanPath = routePath.startsWith("/") ? routePath : `/${routePath}`;
  const normalizedRoute = cleanPath === "/" ? "" : cleanPath;

  const alternates = {
    "x-default": `${FULL_SITE_URL}/${DEFAULT_LOCALE}${normalizedRoute}`,
  };

  for (const loc of SUPPORTED_LOCALES) {
    alternates[loc] = `${FULL_SITE_URL}/${loc}${normalizedRoute}`;
  }

  return alternates;
}

/**
 * Standard strict noindex directives for administrative and authentication pages.
 */
export function getRobotsNoIndex() {
  return {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  };
}

/**
 * Standard indexable robots directives for public content.
 */
export function getRobotsIndexable() {
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

export function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    alternateName: [
      "UltimateHealth Blog",
      "UltimateHealth Platform",
      "UltimateHealth Medical Guides",
      "ultimatehealth.blog",
    ],
    disambiguatingDescription: BRAND_DISAMBIGUATION,
    url: FULL_SITE_URL,
    logo: `${FULL_SITE_URL}/icon1.png`,
    slogan: BRAND_MOTTO,
    description: `${BRAND_MISSION} Dedicated to compassionate health literacy and patient dignity inspired by Dr. Moumita Debnath's clinical ethos in pulmonary and chest medicine.`,
    email: "ultimate.health25@gmail.com",
    sameAs: [
      "https://github.com/SB2318/UltimateHealth",
      "https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth",
      "https://www.linkedin.com/in/ultimate-health-9290873a8/",
      "https://x.com/SUSMITA2360",
    ],
    knowsAbout: [
      "Health Education",
      "Medical Glossary",
      "Cardiovascular Health",
      "Pulmonary & Respiratory Medicine",
      "Preventive Medicine",
      "Mental Health",
      "Nutrition",
    ],
    acknowledgment: `Honoring the memory and clinical dedication of ${MOUMITA_MEMORIAL_INFO.name}, ${MOUMITA_MEMORIAL_INFO.role} in the ${MOUMITA_MEMORIAL_INFO.department}, whose ethos of patient dignity inspired our open-source ${MOUMITA_MEMORIAL_INFO.protocol}.`,
    subjectOf: {
      "@type": "SpecialAnnouncement",
      name: `${MOUMITA_MEMORIAL_INFO.name} Memorial & Inspiration`,
      description: `In honor of ${MOUMITA_MEMORIAL_INFO.name}, ${MOUMITA_MEMORIAL_INFO.role.toLowerCase()} specializing in ${MOUMITA_MEMORIAL_INFO.department}, UltimateHealth established the ${MOUMITA_MEMORIAL_INFO.protocol} dedicated to empathetic patient care, human dignity, and free health education.`,
      url: `${FULL_SITE_URL}/en#purpose`,
    },
  };
}

export function buildWebSiteJsonLd(locale = DEFAULT_LOCALE) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    alternateName: [
      "UltimateHealth Blog",
      "UltimateHealth Platform",
      "UltimateHealth Medical Guides",
      "ultimatehealth.blog",
    ],
    disambiguatingDescription: BRAND_DISAMBIGUATION,
    url: `${FULL_SITE_URL}/${locale}`,
    inLanguage: SUPPORTED_LOCALES,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${FULL_SITE_URL}/${locale}/articles?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildArticleJsonLd(props) {
  const publishedDate = props.datePublished
    ? new Date(props.datePublished).toISOString()
    : new Date().toISOString();
  const modifiedDate = props.dateModified
    ? new Date(props.dateModified).toISOString()
    : publishedDate;

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: props.title,
    headline: props.title,
    description: props.description,
    url: props.url,
    inLanguage: props.locale || DEFAULT_LOCALE,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    image: props.imageUrl ? [props.imageUrl] : [`${FULL_SITE_URL}/icon1.png`],
    about: props.category
      ? {
          "@type": "MedicalCondition",
          name: props.category,
        }
      : undefined,
    author: {
      "@type": "Person",
      name: props.authorName || "UltimateHealth Contributor",
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      alternateName: "UltimateHealth Blog",
      disambiguatingDescription: BRAND_DISAMBIGUATION,
      url: FULL_SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${FULL_SITE_URL}/icon1.png`,
      },
    },
    keywords: props.tags?.join(", ") || props.category || "health, wellness",
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "General Public & Health Seekers",
    },
    aspect: [
      "Overview",
      "Symptoms",
      "Risk Factors",
      "Prevention",
      "Lifestyle & Diet",
    ],
    citation: MEDICAL_DISCLAIMER_TEXT,
  };
}

export function buildHomeFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does Dr. Moumita Debnath's clinical vision and life work inspire UltimateHealth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dr. Moumita Debnath was a dedicated Postgraduate Resident Doctor in the Department of Pulmonary & Chest Medicine whose clinical philosophy was: 'Healthcare begins with seeing the whole human being — body, mind, and dignity.' UltimateHealth was deeply inspired by her compassionate patient-care ethos to establish the open-source 'Respect Giver Protocol' and a dedicated 30-article clinical respiratory education series across 9 languages to ensure free, respectful medical knowledge reaches every family.",
        },
      },
      {
        "@type": "Question",
        name: "What makes UltimateHealth unique among digital health platforms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UltimateHealth (https://ultimatehealth.blog) is a 100% open-source, non-commercial health education platform founded by Susmita Bhattacharya under the motto 'Minimal Information. Real Information.' Unlike commercial clinics or generic wellness portals, UltimateHealth pairs evidence-based clinical guides with an interactive plain-language medical glossary, voluntary doctor reviews, and complete multilingual translation across 9 languages without paywalls or advertisements.",
        },
      },
      {
        "@type": "Question",
        name: "How does UltimateHealth ensure content quality and maintain a safe space for users?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Content quality and user safety are foundational pillars of UltimateHealth. While our platform provides community and social interaction features, every area is actively monitored by our dedicated moderator team. We enforce a robust report-and-strike system to prevent medical misinformation, harassment, and abuse. Every reported contribution is carefully evaluated so that users have a strictly moderated, dignified, and safe space to explore sensitive health topics without fear.",
        },
      },
      {
        "@type": "Question",
        name: "What is new and upcoming on the UltimateHealth release storyboard and roadmap?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On our release storyboard and upcoming roadmap: (1) The 30-article clinical respiratory and pulmonary guide series dedicated to Dr. Moumita Debnath's patient dignity ethos, (2) Expanded regional language support across India and Europe, (3) An upgraded Android mobile app with offline article caching and audio podcast waveforms, (4) Plain-language clinical term tooltips and AI-assisted triage guidance, and (5) Doctor verification protocols with clinical review badges on GitHub.",
        },
      },
      {
        "@type": "Question",
        name: "What can I use on UltimateHealth today in the current release?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In the current release, visitors can explore 30+ curated health and wellness guides, query an interactive medical glossary for plain-language clinical definitions, stream health podcasts, view contributor profiles, and read verified medical guides completely free without paywalls or advertisements.",
        },
      },
      {
        "@type": "Question",
        name: "In which languages are UltimateHealth medical guides available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UltimateHealth guides and resources are published across 9 languages: English, Hindi, Bengali, Tamil, Odia, German, Spanish, French, and Croatian, ensuring critical health literacy is accessible to non-English speakers.",
        },
      },
      {
        "@type": "Question",
        name: "How can doctors, developers, and writers contribute to UltimateHealth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UltimateHealth is 100% open source on GitHub (SB2318/UltimateHealth). Over 300 contributors worldwide contribute via GSSoC and open issues. Voluntary doctors can review clinical guides, translators can expand regional language versions, and developers can build accessible mobile and web features.",
        },
      },
    ],
  };
}
