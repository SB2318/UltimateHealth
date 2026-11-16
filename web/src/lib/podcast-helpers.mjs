// Verified fallback cover artwork
export const PODCAST_FALLBACK_IMAGES = {
  wellness: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
  cardiology: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80",
  sleep: "https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=800&q=80",
  nutrition: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
  pulmonology: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
  sports: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
  kidney: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/image_92fbfca0.jpeg",
  mental: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
  default: "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png",
};

// Reliable sample audio streams
export const SAMPLE_AUDIO_FALLBACKS = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
];

export const SEED_EPISODES = [
  {
    _id: "ep-respiratory-series",
    id: "ep-respiratory-series",
    name: "Clinical Respiratory & Pulmonary Series",
    description: "In-depth audio walkthroughs covering airway anatomy, chronic asthma management, COPD staging, and inhaler spacer techniques honoring patient dignity and accessibility.",
    podcasts_count: 2,
    podcastsCount: 2,
    cover_image: PODCAST_FALLBACK_IMAGES.pulmonology,
    createdAt: "2026-10-15T08:00:00Z",
  },
  {
    _id: "ep-mental-wellness-series",
    id: "ep-mental-wellness-series",
    name: "Mental Wellness & Resilience Series",
    description: "Evidence-based audio discussions on burnout recovery, autonomic nervous system regulation, circadian alignment, and non-pharmacological sleep interventions.",
    podcasts_count: 2,
    podcastsCount: 2,
    cover_image: PODCAST_FALLBACK_IMAGES.mental,
    createdAt: "2026-10-20T10:00:00Z",
  },
  {
    _id: "ep-cardio-series",
    id: "ep-cardio-series",
    name: "Preventive Cardiology & Vascular Health",
    description: "Cardiovascular clinical perspectives on hypertension thresholds, endothelial elasticity, lipid biomarkers, and everyday cardioprotective habits.",
    podcasts_count: 1,
    podcastsCount: 1,
    cover_image: PODCAST_FALLBACK_IMAGES.cardiology,
    createdAt: "2026-10-25T11:00:00Z",
  },
  {
    _id: "ep-nutrition-series",
    id: "ep-nutrition-series",
    name: "Nutrition, Gut Microbiome & Metabolism",
    description: "Dissecting dietary myths, the gut-brain axis, insulin sensitivity fundamentals, and evidence-backed nutritional strategies.",
    podcasts_count: 2,
    podcastsCount: 2,
    cover_image: PODCAST_FALLBACK_IMAGES.nutrition,
    createdAt: "2026-11-01T09:00:00Z",
  },
  {
    _id: "ep-rehab-movement",
    id: "ep-rehab-movement",
    name: "Physical Rehabilitation & Safe Movement",
    description: "Biomechanical principles for joint preservation, safe resistance training, spinal ergonomics, and functional longevity across age brackets.",
    podcasts_count: 1,
    podcastsCount: 1,
    cover_image: PODCAST_FALLBACK_IMAGES.sports,
    createdAt: "2026-11-05T14:00:00Z",
  },
  {
    _id: "ep-renal-health",
    id: "ep-renal-health",
    name: "Renal Health & Dialysis Guides",
    description: "Clear explanations of glomerular filtration rates, creatinine monitoring, electrolyte balance, and supportive patient resources.",
    podcasts_count: 1,
    podcastsCount: 1,
    cover_image: PODCAST_FALLBACK_IMAGES.kidney,
    createdAt: "2026-11-08T16:00:00Z",
  },
];

export const SEED_PODCASTS = [
  {
    _id: "podcast-wellness-microbreak",
    title: "Wellness in Five Minutes: Cortisol Reset & Breath Control",
    description: "A clinically grounded micro-break for medical residents, desk workers, and students. Learn physiological sighing and vagal nerve activation to rapidly downregulate acute stress.",
    audio_url: SAMPLE_AUDIO_FALLBACKS[0],
    cover_image: PODCAST_FALLBACK_IMAGES.wellness,
    duration: 324,
    user_id: {
      _id: "u-dr-moumita",
      name: "Dr. Moumita Debnath",
      user_name: "Dr. Moumita Debnath",
      user_handle: "moumita_clinical",
      role: "Clinical Resident & Patient Advocate",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    },
    tags: [{ _id: "t1", name: "Mental Wellness" }, { _id: "t2", name: "Stress Relief" }],
    category: "Mental Wellness",
    viewCount: 1420,
    likedUsers: [],
    status: "published",
    is_removed: false,
    language: "en-IN",
    episode_id: "ep-mental-wellness-series",
    episode_number: 1,
    updated_at: "2026-11-02T10:00:00Z",
    created_at: "2026-11-02T10:00:00Z",
  },
  {
    _id: "podcast-cardio-bp",
    title: "Cardiovascular Health: Demystifying Blood Pressure & Arterial Elasticity",
    description: "Dr. Rajesh Sharma discusses systolic versus diastolic readings, silent arterial stiffening, dietary sodium balance, and simple steps to protect long-term heart health.",
    audio_url: SAMPLE_AUDIO_FALLBACKS[1],
    cover_image: PODCAST_FALLBACK_IMAGES.cardiology,
    duration: 858,
    user_id: {
      _id: "u-dr-rajesh",
      name: "Dr. Rajesh Sharma",
      user_name: "Dr. Rajesh Sharma",
      user_handle: "dr_rajesh_cardio",
      role: "Consultant Cardiologist",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    },
    tags: [{ _id: "t3", name: "Cardiology" }, { _id: "t4", name: "Hypertension" }],
    category: "Cardiology",
    viewCount: 2890,
    likedUsers: [],
    status: "published",
    is_removed: false,
    language: "en-IN",
    episode_id: "ep-cardio-series",
    episode_number: 1,
    updated_at: "2026-10-28T12:00:00Z",
    created_at: "2026-10-28T12:00:00Z",
  },
  {
    _id: "podcast-sleep-circadian",
    title: "Sleep Science, Simply Explained: Circadian Rhythms & REM Cycles",
    description: "An evidence-based overview of sleep architecture, adenosine buildup, non-pharmacological interventions for sleep latency, and screen light exposure mitigation.",
    audio_url: SAMPLE_AUDIO_FALLBACKS[2],
    cover_image: PODCAST_FALLBACK_IMAGES.sleep,
    duration: 705,
    user_id: {
      _id: "u-dr-ananya",
      name: "Dr. Ananya Sen",
      user_name: "Dr. Ananya Sen",
      user_handle: "ananya_neuro",
      role: "Neurologist & Sleep Researcher",
      avatar: "https://images.unsplash.com/photo-1594824813501-44755d9d71e2?auto=format&fit=crop&w=200&q=80",
    },
    tags: [{ _id: "t5", name: "Sleep Medicine" }, { _id: "t1", name: "Mental Wellness" }],
    category: "Sleep Medicine",
    viewCount: 1980,
    likedUsers: [],
    status: "published",
    is_removed: false,
    language: "en-IN",
    episode_id: "ep-mental-wellness-series",
    episode_number: 2,
    updated_at: "2026-11-04T15:30:00Z",
    created_at: "2026-11-04T15:30:00Z",
  },
  {
    _id: "podcast-respiratory-asthma",
    title: "Clinical Respiratory Series: Understanding Asthma, COPD & Airway Health",
    description: "Pulmonology insights on recognizing acute bronchospasm versus chronic inflammatory airway obstruction, correct MDI inhaler technique, and environmental trigger mitigation.",
    audio_url: SAMPLE_AUDIO_FALLBACKS[3],
    cover_image: PODCAST_FALLBACK_IMAGES.pulmonology,
    duration: 1085,
    user_id: {
      _id: "u-dr-sneha",
      name: "Dr. Sneha Mukherjee",
      user_name: "Dr. Sneha Mukherjee",
      user_handle: "sneha_pulm",
      role: "Pulmonology Specialist",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    },
    tags: [{ _id: "t6", name: "Pulmonology" }, { _id: "t7", name: "Respiratory Care" }],
    category: "Pulmonology",
    viewCount: 3120,
    likedUsers: [],
    status: "published",
    is_removed: false,
    language: "en-IN",
    episode_id: "ep-respiratory-series",
    episode_number: 1,
    updated_at: "2026-10-18T09:00:00Z",
    created_at: "2026-10-18T09:00:00Z",
  },
];

export function resolvePodcastCoverUrl(coverImage, context) {
  const title = (context?.title || "").toLowerCase();
  const category = (context?.category || "").toLowerCase();

  // Handle array / object formats (e.g. imageUtils: [ "..." ] or { url: "..." })
  if (Array.isArray(coverImage)) {
    coverImage = coverImage[0];
  }
  if (coverImage && typeof coverImage === "object") {
    coverImage = coverImage.url || coverImage.uri || coverImage.src;
  }

  if (coverImage && typeof coverImage === "string" && coverImage.trim()) {
    let trimmed = coverImage.trim().replace(/&amp;/g, "&");
    if (!trimmed.toLowerCase().includes("undefined") && !trimmed.toLowerCase().includes("null")) {
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
      }
      if (trimmed.startsWith("/api/")) {
        return `https://ultimatehealth.blog${trimmed}`;
      }
      if (trimmed.startsWith("api/")) {
        return `https://ultimatehealth.blog/${trimmed}`;
      }
      if (trimmed.startsWith("/getFile/") || trimmed.startsWith("/getfile/")) {
        return `https://ultimatehealth.blog/api${trimmed}`;
      }
      if (trimmed.startsWith("getFile/") || trimmed.startsWith("getfile/")) {
        return `https://ultimatehealth.blog/api/${trimmed}`;
      }
      if (trimmed.startsWith("/")) {
        return `https://ultimatehealth.blog${trimmed}`;
      }
      // Any relative filename from backend storage (e.g. alzeimer-banner-1772088528384.webp)
      return `https://ultimatehealth.blog/api/getFile/${trimmed}`;
    }
  }

  if (category.includes("cardio") || title.includes("cardio") || title.includes("pressure") || title.includes("heart")) {
    return PODCAST_FALLBACK_IMAGES.cardiology;
  }
  if (category.includes("sleep") || title.includes("sleep") || title.includes("circadian")) {
    return PODCAST_FALLBACK_IMAGES.sleep;
  }
  if (category.includes("pulm") || category.includes("respir") || title.includes("asthma") || title.includes("lung") || title.includes("breath")) {
    return PODCAST_FALLBACK_IMAGES.pulmonology;
  }
  if (category.includes("nutri") || category.includes("gut") || title.includes("food") || title.includes("fasting") || title.includes("diet")) {
    return PODCAST_FALLBACK_IMAGES.nutrition;
  }
  if (category.includes("sports") || category.includes("ortho") || title.includes("strength") || title.includes("joint") || title.includes("mobility")) {
    return PODCAST_FALLBACK_IMAGES.sports;
  }
  if (category.includes("kidney") || category.includes("nephro") || title.includes("dialysis") || title.includes("creatinine")) {
    return PODCAST_FALLBACK_IMAGES.kidney;
  }
  if (category.includes("mental") || title.includes("stress") || title.includes("mind") || title.includes("wellness")) {
    return PODCAST_FALLBACK_IMAGES.mental;
  }

  return PODCAST_FALLBACK_IMAGES.default;
}

export function resolvePodcastAudioUrl(audioUrl) {
  if (!audioUrl || typeof audioUrl !== "string" || !audioUrl.trim()) {
    return SAMPLE_AUDIO_FALLBACKS[0];
  }

  const trimmed = audioUrl.trim();

  if (trimmed.startsWith("/api/proxy-audio")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.hostname === "ultimatehealth.blog" || parsed.hostname === "uhsocial.in") {
      return `/api/proxy-audio?url=${encodeURIComponent(trimmed)}`;
    }
    return trimmed;
  } catch {
    if (/\.(mp3|wav|ogg|m4a|aac)$/i.test(trimmed)) {
      const fullUrl = `https://ultimatehealth.blog/api/getFile/${trimmed}`;
      return `/api/proxy-audio?url=${encodeURIComponent(fullUrl)}`;
    }
    return SAMPLE_AUDIO_FALLBACKS[0];
  }
}

export function formatPodcastDuration(duration) {
  if (!duration || duration <= 0) return "0:00";
  let totalSec = duration > 10000 ? Math.floor(duration / 1000) : Math.floor(duration);
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatPodcastDate(dateStr) {
  if (!dateStr) return "Recent";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Recent";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recent";
  }
}

export function getPodcastAuthorInfo(author) {
  const defaultAvatar = "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png";

  if (!author) {
    return {
      name: "UltimateHealth Contributor",
      handle: "uh_community",
      avatar: defaultAvatar,
      role: "Verified Health Contributor",
    };
  }

  if (typeof author === "string") {
    return {
      name: author,
      handle: author.toLowerCase().replace(/\s+/g, "_"),
      avatar: defaultAvatar,
      role: "Verified Health Contributor",
    };
  }

  const name = author.name || author.user_name || "UltimateHealth Contributor";
  const handle = author.user_handle || author.handle || name.toLowerCase().replace(/\s+/g, "_");
  let avatar = author.Profile_image || author.avatar || author.profile_image || "";
  if (avatar && typeof avatar === "string") {
    const trimmed = avatar.trim();
    if (trimmed && !trimmed.toLowerCase().includes("undefined") && !trimmed.toLowerCase().includes("null")) {
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        avatar = trimmed.replace(/&amp;/g, "&");
      } else if (trimmed.startsWith("/")) {
        avatar = `https://ultimatehealth.blog${trimmed}`;
      } else {
        avatar = `https://ultimatehealth.blog/api/getFile/${trimmed}`;
      }
    } else {
      avatar = defaultAvatar;
    }
  } else {
    avatar = defaultAvatar;
  }
  const role = author.role || author.bio || "Verified Health Contributor";

  return { name, handle, avatar, role };
}

export function normalizePodcast(item) {
  const authorInfo = getPodcastAuthorInfo(item.user_id || item.author);
  const title = item.title || item.name || "Untitled Health Podcast";
  const category = (item.tags && item.tags[0]?.name) || (item.tags && typeof item.tags[0] === "string" ? item.tags[0] : "") || item.category || "General Health";

  const rawCover =
    item.cover_image ||
    item.coverImage ||
    (Array.isArray(item.imageUtils) ? item.imageUtils[0] : item.imageUtils) ||
    item.imageUri ||
    item.image ||
    item.imageUrl ||
    item.banner ||
    item.thumbnail;

  return {
    _id: String(item._id || item.id || `podcast-${Math.random().toString(36).slice(2)}`),
    title,
    description: item.description || "Evidence-based health discussion from the UltimateHealth community.",
    audio_url: item.audio_url || item.audioUrl || "",
    cover_image: resolvePodcastCoverUrl(rawCover, { title, category }),
    duration: typeof item.duration === "number" ? item.duration : 600,
    user_id: item.user_id || {
      name: authorInfo.name,
      user_name: authorInfo.name,
      user_handle: authorInfo.handle,
      avatar: authorInfo.avatar,
      role: authorInfo.role,
    },
    authorName: authorInfo.name,
    authorHandle: authorInfo.handle,
    authorAvatar: authorInfo.avatar,
    article_id: item.article_id ?? null,
    tags: Array.isArray(item.tags) ? item.tags : [{ _id: "t-default", name: category }],
    category,
    likedUsers: Array.isArray(item.likedUsers) ? item.likedUsers : [],
    savedUsers: Array.isArray(item.savedUsers) ? item.savedUsers : [],
    viewUsers: Array.isArray(item.viewUsers) ? item.viewUsers : [],
    viewCount: typeof item.viewCount === "number" ? item.viewCount : 120,
    commentCount: typeof item.commentCount === "number" ? item.commentCount : 0,
    status: item.status || "published",
    is_removed: Boolean(item.is_removed),
    language: item.language || "en-IN",
    episode_id: item.episode_id || null,
    episode_number: typeof item.episode_number === "number" ? item.episode_number : undefined,
    updated_at: item.updated_at || item.updatedAt || item.created_at || new Date().toISOString(),
    created_at: item.created_at || item.createdAt || new Date().toISOString(),
  };
}
