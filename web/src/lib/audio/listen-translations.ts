/**
 * Localization dictionary and helper utilities for the Article Listen (TTS) system.
 * Supports all 9 UltimateHealth supported languages with native typography and strings.
 */

export type SupportedListenLocale =
  | "en"
  | "hi"
  | "bn"
  | "ta"
  | "or"
  | "de"
  | "es"
  | "fr"
  | "hr";

export interface ListenStrings {
  listenToArticle: string;
  listening: string;
  listen: string;
  playing: string;
  paused: string;
  readingArticle: string;
  speed: string;
  voice: string;
  normalSpeed: string;
  rewind: string;
  forward: string;
  closePlayer: string;
  systemVoice: string;
  languageName: string;
  nativeLanguageName: string;
  introPrefix: string;
  outroText: string;
}

export const LOCALE_TO_BCP47: Record<SupportedListenLocale, string> = {
  en: "en-US",
  hi: "hi-IN",
  bn: "bn-IN",
  ta: "ta-IN",
  or: "or-IN",
  de: "de-DE",
  es: "es-ES",
  fr: "fr-FR",
  hr: "hr-HR",
};

export const ARTICLE_LISTEN_STRINGS: Record<SupportedListenLocale, ListenStrings> = {
  en: {
    listenToArticle: "Listen to Article",
    listening: "Listening...",
    listen: "Listen",
    playing: "Playing",
    paused: "Paused",
    readingArticle: "Reading article...",
    speed: "Speed",
    voice: "Voice",
    normalSpeed: "Normal",
    rewind: "Rewind 2 steps",
    forward: "Forward 2 steps",
    closePlayer: "Close Audio Player",
    systemVoice: "System Voice",
    languageName: "English",
    nativeLanguageName: "English",
    introPrefix: "Written by",
    outroText: "Thank you for listening to this health article on UltimateHealth.",
  },
  hi: {
    listenToArticle: "लेख सुनें",
    listening: "सुना जा रहा है...",
    listen: "सुनें",
    playing: "चल रहा है",
    paused: "रुका हुआ",
    readingArticle: "लेख पढ़ा जा रहा है...",
    speed: "गति",
    voice: "आवाज़",
    normalSpeed: "सामान्य",
    rewind: "पीछे करें",
    forward: "आगे करें",
    closePlayer: "ऑडियो प्लेयर बंद करें",
    systemVoice: "सिस्टम आवाज़",
    languageName: "Hindi",
    nativeLanguageName: "हिन्दी",
    introPrefix: "द्वारा लिखित",
    outroText: "अल्टीमेट हेल्थ पर यह स्वास्थ्य लेख सुनने के लिए धन्यवाद।",
  },
  bn: {
    listenToArticle: "নিবন্ধটি শুনুন",
    listening: "শোনা হচ্ছে...",
    listen: "শুনুন",
    playing: "চলছে",
    paused: "বিরতি",
    readingArticle: "নিবন্ধ পড়া হচ্ছে...",
    speed: "গতি",
    voice: "কণ্ঠস্বর",
    normalSpeed: "স্বাভাবিক",
    rewind: "পিছনে যান",
    forward: "সামনে যান",
    closePlayer: "অডিও প্লেয়ার বন্ধ করুন",
    systemVoice: "সিস্টেম কণ্ঠস্বর",
    languageName: "Bengali",
    nativeLanguageName: "বাংলা",
    introPrefix: "কর্তৃক লিখিত",
    outroText: "আল্টিমেট হেলথ-এ এই স্বাস্থ্য নিবন্ধটি শোনার জন্য ধন্যবাদ।",
  },
  ta: {
    listenToArticle: "கட்டுரையைக் கேளுங்கள்",
    listening: "கேட்கப்படுகிறது...",
    listen: "கேளுங்கள்",
    playing: "இயங்குகிறது",
    paused: "நிறுத்தப்பட்டது",
    readingArticle: "கட்டுரை வாசிக்கப்படுகிறது...",
    speed: "வேகம்",
    voice: "குரல்",
    normalSpeed: "இயல்பான",
    rewind: "பின்னோக்கு",
    forward: "முன்னோக்கு",
    closePlayer: "ஆடியோ பிளேயரை மூடு",
    systemVoice: "கணினி குரல்",
    languageName: "Tamil",
    nativeLanguageName: "தமிழ்",
    introPrefix: "எழுதியவர்",
    outroText: "அல்டிமேட் ஹெல்த்தில் இந்த சுகாதாரக் கட்டுரையை கேட்டதற்கு நன்றி.",
  },
  or: {
    listenToArticle: "ପ୍ରବନ୍ଧ ଶୁଣନ୍ତୁ",
    listening: "ଶୁଣାଯାଉଛି...",
    listen: "ଶୁଣନ୍ତୁ",
    playing: "ଚାଲୁଅଛି",
    paused: "ସ୍ଥଗିତ",
    readingArticle: "ପ୍ରବନ୍ଧ ପଢ଼ାଯାଉଛି...",
    speed: "ଗତି",
    voice: "ସ୍ୱର",
    normalSpeed: "ସାଧାରଣ",
    rewind: "ପଛକୁ ଯାଆନ୍ତୁ",
    forward: "ଆଗକୁ ଯାଆନ୍ତୁ",
    closePlayer: "ଅଡିଓ ପ୍ଲେୟାର ବନ୍ଦ କରନ୍ତୁ",
    systemVoice: "ସିଷ୍ଟମ୍ ସ୍ୱର",
    languageName: "Odia",
    nativeLanguageName: "ଓଡ଼ିଆ",
    introPrefix: "ଙ୍କ ଦ୍ୱାରା ଲିଖିତ",
    outroText: "ଅଲ୍ଟିମେଟ୍ ହେଲଥ୍‌ରେ ଏହି ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରବନ୍ଧ ଶୁଣିଥିବାରୁ ଧନ୍ୟବାଦ।",
  },
  de: {
    listenToArticle: "Artikel anhören",
    listening: "Wird vorgelesen...",
    listen: "Anhören",
    playing: "Wiedergabe",
    paused: "Pausiert",
    readingArticle: "Artikel wird vorgelesen...",
    speed: "Tempo",
    voice: "Stimme",
    normalSpeed: "Normal",
    rewind: "Zurückspulen",
    forward: "Vorspulen",
    closePlayer: "Audio-Player schließen",
    systemVoice: "System-Stimme",
    languageName: "German",
    nativeLanguageName: "Deutsch",
    introPrefix: "Verfasst von",
    outroText: "Vielen Dank für das Anhören dieses Gesundheitsartikels auf UltimateHealth.",
  },
  es: {
    listenToArticle: "Escuchar artículo",
    listening: "Escuchando...",
    listen: "Escuchar",
    playing: "Reproduciendo",
    paused: "Pausado",
    readingArticle: "Leyendo artículo...",
    speed: "Velocidad",
    voice: "Voz",
    normalSpeed: "Normal",
    rewind: "Rebobinar",
    forward: "Adelantar",
    closePlayer: "Cerrar reproductor",
    systemVoice: "Voz del sistema",
    languageName: "Spanish",
    nativeLanguageName: "Español",
    introPrefix: "Escrito por",
    outroText: "Gracias por escuchar este artículo de salud en UltimateHealth.",
  },
  fr: {
    listenToArticle: "Écouter l'article",
    listening: "Lecture en cours...",
    listen: "Écouter",
    playing: "Lecture",
    paused: "En pause",
    readingArticle: "Lecture de l'article...",
    speed: "Vitesse",
    voice: "Voix",
    normalSpeed: "Normal",
    rewind: "Reculer",
    forward: "Avancer",
    closePlayer: "Fermer le lecteur",
    systemVoice: "Voix du système",
    languageName: "French",
    nativeLanguageName: "Français",
    introPrefix: "Rédigé par",
    outroText: "Merci d'avoir écouté cet article de santé sur UltimateHealth.",
  },
  hr: {
    listenToArticle: "Slušaj članak",
    listening: "Slušanje...",
    listen: "Slušaj",
    playing: "Reprodukcija",
    paused: "Pauzirano",
    readingArticle: "Čitanje članka...",
    speed: "Brzina",
    voice: "Glas",
    normalSpeed: "Normalno",
    rewind: "Premotaj natrag",
    forward: "Premotaj naprijed",
    closePlayer: "Zatvori player",
    systemVoice: "Sistemski glas",
    languageName: "Croatian",
    nativeLanguageName: "Hrvatski",
    introPrefix: "Napisao/la",
    outroText: "Hvala vam što ste poslušali ovaj zdravstveni članak na UltimateHealthu.",
  },
};

export function normalizeLocale(raw?: string): SupportedListenLocale {
  if (!raw) return "en";
  const lower = raw.toLowerCase().trim();
  if (lower.startsWith("hi")) return "hi";
  if (lower.startsWith("bn")) return "bn";
  if (lower.startsWith("ta")) return "ta";
  if (lower.startsWith("or") || lower.startsWith("od") || lower.startsWith("ory")) return "or";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("hr")) return "hr";
  return "en";
}

export function getListenStrings(locale?: string): ListenStrings {
  const norm = normalizeLocale(locale);
  return ARTICLE_LISTEN_STRINGS[norm] || ARTICLE_LISTEN_STRINGS.en;
}

/**
 * Detect script from content to ensure accurate phonetic language assignment
 * even if the page route locale or database category doesn't match the body text.
 */
export function detectContentLanguage(sampleText: string, fallbackLocale = "en"): SupportedListenLocale {
  if (!sampleText) return normalizeLocale(fallbackLocale);

  const devanagariCount = (sampleText.match(/[\u0900-\u097F]/g) || []).length;
  const bengaliCount = (sampleText.match(/[\u0980-\u09FF]/g) || []).length;
  const tamilCount = (sampleText.match(/[\u0B80-\u0BFF]/g) || []).length;
  const odiaCount = (sampleText.match(/[\u0B00-\u0B7F]/g) || []).length;

  const totalIndic = devanagariCount + bengaliCount + tamilCount + odiaCount;
  if (totalIndic > 10) {
    if (devanagariCount >= bengaliCount && devanagariCount >= tamilCount && devanagariCount >= odiaCount) {
      return "hi";
    }
    if (bengaliCount >= devanagariCount && bengaliCount >= tamilCount && bengaliCount >= odiaCount) {
      return "bn";
    }
    if (tamilCount >= devanagariCount && tamilCount >= bengaliCount && tamilCount >= odiaCount) {
      return "ta";
    }
    if (odiaCount >= devanagariCount && odiaCount >= bengaliCount && odiaCount >= tamilCount) {
      return "or";
    }
  }

  return normalizeLocale(fallbackLocale);
}
