export type GlossaryEntry = {
  term: string;
  definition: string;
  category: string;
  relatedTerms: string[];
};

export const glossaryEntries: GlossaryEntry[] = [
  {
    term: "Anemia",
    definition:
      "A condition where the body does not have enough healthy red blood cells or hemoglobin to carry adequate oxygen to tissues.",
    category: "Blood Health",
    relatedTerms: ["Hemoglobin", "Iron deficiency", "Fatigue"],
  },
  {
    term: "Asthma",
    definition:
      "A chronic airway condition that can cause wheezing, chest tightness, coughing, and shortness of breath.",
    category: "Respiratory Health",
    relatedTerms: ["Bronchodilator", "Inflammation", "Peak flow"],
  },
  {
    term: "Blood Pressure",
    definition:
      "The force of circulating blood against artery walls, commonly written as systolic pressure over diastolic pressure.",
    category: "Cardiovascular Health",
    relatedTerms: ["Hypertension", "Systolic", "Diastolic"],
  },
  {
    term: "Body Mass Index",
    definition:
      "A screening measure calculated from height and weight that helps estimate whether body weight is within a healthy range.",
    category: "Preventive Health",
    relatedTerms: ["Weight management", "Obesity", "Nutrition"],
  },
  {
    term: "Cholesterol",
    definition:
      "A waxy substance found in blood that supports cell function, but high levels can increase cardiovascular risk.",
    category: "Cardiovascular Health",
    relatedTerms: ["LDL", "HDL", "Triglycerides"],
  },
  {
    term: "Dehydration",
    definition:
      "A state where the body loses more fluids than it takes in, which can affect temperature control, circulation, and energy.",
    category: "General Wellness",
    relatedTerms: ["Electrolytes", "Hydration", "Heat illness"],
  },
  {
    term: "Diabetes",
    definition:
      "A group of conditions that affect how the body regulates blood glucose because of insulin production or insulin response.",
    category: "Metabolic Health",
    relatedTerms: ["Insulin", "Blood glucose", "A1C"],
  },
  {
    term: "Electrolytes",
    definition:
      "Minerals such as sodium, potassium, calcium, and magnesium that help regulate fluid balance, muscles, and nerves.",
    category: "General Wellness",
    relatedTerms: ["Dehydration", "Potassium", "Sodium"],
  },
  {
    term: "Glycemic Index",
    definition:
      "A scale that estimates how quickly carbohydrate-containing foods raise blood glucose levels after eating.",
    category: "Nutrition",
    relatedTerms: ["Blood glucose", "Carbohydrates", "Diabetes"],
  },
  {
    term: "Heart Rate",
    definition:
      "The number of times the heart beats per minute, often used as a basic indicator of fitness, stress, or illness.",
    category: "Cardiovascular Health",
    relatedTerms: ["Pulse", "Resting heart rate", "Exercise"],
  },
  {
    term: "Hypertension",
    definition:
      "Persistently elevated blood pressure that can increase the risk of heart disease, stroke, and kidney problems.",
    category: "Cardiovascular Health",
    relatedTerms: ["Blood Pressure", "Sodium", "Lifestyle"],
  },
  {
    term: "Immunity",
    definition:
      "The body's defense system for identifying and responding to infections, harmful substances, and abnormal cells.",
    category: "Immune Health",
    relatedTerms: ["Vaccination", "Antibodies", "Inflammation"],
  },
  {
    term: "Inflammation",
    definition:
      "A protective immune response to injury or infection that can become harmful when it persists over time.",
    category: "Immune Health",
    relatedTerms: ["Immunity", "Pain", "Chronic disease"],
  },
  {
    term: "Insulin",
    definition:
      "A hormone made by the pancreas that helps move glucose from the bloodstream into cells for energy.",
    category: "Metabolic Health",
    relatedTerms: ["Diabetes", "Blood glucose", "Pancreas"],
  },
  {
    term: "Migraine",
    definition:
      "A neurological condition that can cause intense headaches, light sensitivity, nausea, and other sensory symptoms.",
    category: "Neurological Health",
    relatedTerms: ["Headache", "Aura", "Triggers"],
  },
  {
    term: "Oxygen Saturation",
    definition:
      "The percentage of hemoglobin in the blood carrying oxygen, commonly measured using a pulse oximeter.",
    category: "Respiratory Health",
    relatedTerms: ["Hemoglobin", "Pulse oximeter", "Respiration"],
  },
  {
    term: "Probiotics",
    definition:
      "Live microorganisms that may support digestive health when consumed in adequate amounts through food or supplements.",
    category: "Digestive Health",
    relatedTerms: ["Gut microbiome", "Fermented foods", "Digestion"],
  },
  {
    term: "Sleep Hygiene",
    definition:
      "Habits and environmental choices that support consistent, restorative sleep and better daytime functioning.",
    category: "Mental Health",
    relatedTerms: ["Circadian rhythm", "Stress", "Recovery"],
  },
  {
    term: "Vaccination",
    definition:
      "A preventive health measure that trains the immune system to recognize and respond to specific infections.",
    category: "Preventive Health",
    relatedTerms: ["Immunity", "Antibodies", "Public health"],
  },
  {
    term: "Vitamin D",
    definition:
      "A nutrient involved in bone health, immune function, and calcium absorption, produced through sunlight exposure and diet.",
    category: "Nutrition",
    relatedTerms: ["Calcium", "Bone health", "Sunlight"],
  },
];
