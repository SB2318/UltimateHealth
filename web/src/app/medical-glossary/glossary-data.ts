import { bloodHealthTerms } from "./categories/blood-health";
import { cardiovascularTerms } from "./categories/cardiovascular-health";
import { respiratoryTerms } from "./categories/respiratory-health";
import { digestiveTerms } from "./categories/digestive-health";
import { metabolicTerms } from "./categories/metabolic-health";

import { mentalHealthTerms } from "./categories/mental-health";
import { neurologicalTerms } from "./categories/neurological-health";
import { immuneHealthTerms } from "./categories/immune-health";
import { boneJointTerms } from "./categories/bone-joint-health";
import { skinHealthTerms } from "./categories/skin-health";

import { liverHealthTerms } from "./categories/liver-health";
import { urinaryHealthTerms } from "./categories/urinary-health";
import { nutritionTerms } from "./categories/nutrition";
import { sleepHealthTerms } from "./categories/sleep-health";
import { preventiveHealthTerms } from "./categories/preventive-health";
import { diagnosticTerms } from "./categories/diagnostic-testing";
import { infectiousDiseaseTerms } from "./categories/infectious-diseases";
import { oncologyTerms } from "./categories/oncology";

export const glossaryEntries = [
  ...bloodHealthTerms,
  ...cardiovascularTerms,
  ...respiratoryTerms,
  ...digestiveTerms,
  ...metabolicTerms,

  ...mentalHealthTerms,
  ...neurologicalTerms,
  ...immuneHealthTerms,
  ...boneJointTerms,
  ...skinHealthTerms,

  ...liverHealthTerms,
  ...urinaryHealthTerms,
  ...nutritionTerms,
  ...sleepHealthTerms,
  ...preventiveHealthTerms,
  ...diagnosticTerms,
  ...infectiousDiseaseTerms,
  ...oncologyTerms,
];