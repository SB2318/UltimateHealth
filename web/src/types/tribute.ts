export type TributeCategory =
  | "all"
  | "healthcare"
  | "safety-and-justice"
  | "journalism"
  | "environmental-defenders"
  | "education-and-dignity"
  | "survivors";

export type HumanitarianPillar = "remember" | "listen" | "recognise" | "learn" | "charter";

export type VerificationStatus =
  | "Verified"
  | "Historically Verified"
  | "Partially Verified"
  | "Under Review"
  | "Disputed";

export interface TributeReference {
  title: string;
  url: string;
  publisher?: string;
  isPrimary?: boolean;
}

export interface MemorialPublication {
  number: number;
  title: string;
  honoringName: string;
  domain: string;
  description: string;
  actionableOutcome: string;
  status: "Published" | "In Editorial Review" | "Curriculum Release";
  tags: string[];
}

export interface TributeProfile {
  id: number;
  slug: string;
  name: string;
  country: string;
  countryFlag?: string;
  pillar?: HumanitarianPillar;
  category: Exclude<TributeCategory, "all">;
  categoryLabel: string;
  eraOrYear: string;
  roleAndField: string;
  isSurvivor?: boolean;
  avatarUrl?: string;

  // Editorial Anatomy
  whoWasThisPerson: string;      // Documented biography: childhood, education, vocation
  contributions: string;         // Documented professional, scientific, artistic, or civic work
  factualContext: string;        // Documented sensitively, non-graphic, objective legal/historical record
  societalImpact: string;        // Reforms, movements, and discussions triggered
  actionableLesson: string;      // Concrete societal lesson (Duty room security, press freedom, etc.)
  coreMessage: string;           // UltimateHealth Editorial Reflection (What society must learn and build)
  verifiedQuote?: {              // Only populated when verified primary-source quotation is documented
    quote: string;
    source: string;
    context?: string;
  };

  // Editorial Verification Layer (Audit & Fact-Checking) – added 2026-11-06
  verificationStatus?: VerificationStatus;  // "Verified" | "Partially Verified" | "Under Review" | "Disputed"
  caseStatus?: "Ongoing / Unresolved" | "Under Judicial Review" | "Resolved" | "Historical" | string;
  lastVerifiedAt?: string;                  // ISO date of last editorial review, e.g. "2026-11-06"
  verifiedFacts?: string[];                 // Claims confirmed against primary/secondary sources
  disputedFacts?: string[];                 // Claims with conflicting accounts or unresolved investigations
  editorialNotes?: string;                  // Sensitivity, privacy, legal caveats, chronology notes
  primarySources?: TributeReference[];      // Court judgments, official records, UN/HR reports
  secondarySources?: TributeReference[];    // Reputable independent journalism

  // Memorial Publication brought out by UltimateHealth
  memorialPublication: {
    title: string;
    focus: string;
    deliverable: string;
    initiativeStatus?: "Proposed Initiative" | "Planned Resource" | "In Editorial Review" | "Published Resource" | "Proposed Educational Framework";
  };

  references: TributeReference[];
  translations?: Record<string, TributeProfileTranslation>;
}

export interface TributeProfileTranslation {
  name?: string;
  roleAndField?: string;
  categoryLabel?: string;
  coreMessage?: string;
  whoWasThisPerson?: string;
  contributions?: string;
  factualContext?: string;
  societalImpact?: string;
  actionableLesson?: string;
  verifiedFacts?: string[];
  editorialNotes?: string;
  caseStatus?: string;
  memorialPublication?: {
    title?: string;
    focus?: string;
    deliverable?: string;
    initiativeStatus?: "Proposed Initiative" | "Planned Resource" | "In Editorial Review" | "Published Resource" | "Proposed Educational Framework";
  };
}

export interface SurvivorVoice {
  id: string;
  slug: string;
  name: string;                  // Real name, approved pseudonym, or Anonymous
  displayRole: string;
  country: string;
  countryFlag: string;
  eraOrYear: string;
  summary: string;
  livedExperienceAndAdvocacy: string;
  societalReformMessage: string;
  verifiedQuote?: {
    quote: string;
    source: string;
  };
  consentProtocol: {
    identityPreference: "Full Public Attribution" | "Verified Pseudonym" | "Anonymous Community Contributor";
    consentVerified: boolean;
    withdrawalPermitted: boolean;
  };
  references: TributeReference[];
}

export interface Changemaker {
  id: string;
  slug: string;
  name: string;
  roleAndField: string;
  organization: string;
  country: string;
  countryFlag: string;
  eraOrYear: string;
  focusArea: string;
  documentedActions: string;
  measurableImpact: string;
  relevanceToHumanity: string;
  references: TributeReference[];
}

export interface SocietalLesson {
  theme: string;
  whatWeCanImprove: string;
  actionableInitiatives: string[];
  profilesRef: string[];
}
