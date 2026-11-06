export type TributeCategory =
  | "all"
  | "healthcare"
  | "safety-and-justice"
  | "journalism"
  | "environmental-defenders"
  | "education-and-dignity"
  | "survivors";

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
  coreMessage: string;           // Core takeaway message

  // Memorial Publication brought out by UltimateHealth
  memorialPublication: {
    title: string;
    focus: string;
    deliverable: string;
  };

  references: TributeReference[];
}

export interface SocietalLesson {
  theme: string;
  whatWeCanImprove: string;
  actionableInitiatives: string[];
  profilesRef: string[];
}
