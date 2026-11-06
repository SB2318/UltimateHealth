export type TributeCategory =
  | "all"
  | "healthcare"
  | "safety-and-justice"
  | "journalism"
  | "environmental-defenders"
  | "education-and-dignity"
  | "survivors";

export type HumanitarianPillar = "remember" | "listen" | "recognise" | "learn" | "charter";

export interface TributeReference {
  title: string;
  url: string;
  publisher?: string;
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
  whoWasThisPerson: string;      // Childhood, education, personal aspirations
  contributions: string;         // Professional, artistic, scientific, or social contributions
  factualContext: string;        // Documented sensitively, non-graphic, objective legal/historical record
  societalImpact: string;        // Reforms, movements, and discussions triggered
  actionableLesson: string;      // Concrete societal lesson (Duty room security, press freedom, etc.)
  coreMessage: string;           // UltimateHealth Editorial Reflection (What society must learn and build)
  verifiedQuote?: {              // Only populated when verified primary-source quotation is documented
    quote: string;
    source: string;
    context?: string;
  };

  // Memorial Publication brought out by UltimateHealth
  memorialPublication: {
    title: string;
    focus: string;
    deliverable: string;
  };

  references: TributeReference[];
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
