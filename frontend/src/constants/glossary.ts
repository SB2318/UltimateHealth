export type GlossaryTerm = {
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
  tags?: string[];
};

export const medicalGlossaryTerms: GlossaryTerm[] = [
  {
    term: 'Anemia',
    definition:
      'A condition marked by a shortage of healthy red blood cells or hemoglobin, often causing fatigue and weakness.',
    category: 'Hematology',
    relatedTerms: ['Iron deficiency', 'Fatigue', 'Blood count'],
    tags: ['blood', 'nutrition', 'fatigue'],
  },
  {
    term: 'Bronchitis',
    definition:
      'Inflammation of the bronchial tubes that can lead to coughing, chest discomfort, and mucus production.',
    category: 'Respiratory',
    relatedTerms: ['Cough', 'Lungs', 'Airway'],
    tags: ['lungs', 'infection', 'cough'],
  },
  {
    term: 'Celiac disease',
    definition:
      'An autoimmune disorder in which gluten triggers damage to the lining of the small intestine.',
    category: 'Gastroenterology',
    relatedTerms: ['Gluten', 'Digestive health', 'Autoimmune'],
    tags: ['digestion', 'gluten', 'autoimmune'],
  },
  {
    term: 'Diabetes',
    definition:
      'A chronic condition that affects how the body converts food into energy, often involving blood sugar imbalance.',
    category: 'Endocrinology',
    relatedTerms: ['Insulin', 'Glucose', 'Blood sugar'],
    tags: ['metabolism', 'insulin', 'blood sugar'],
  },
  {
    term: 'Epilepsy',
    definition:
      'A neurological disorder characterized by recurrent seizures caused by abnormal electrical activity in the brain.',
    category: 'Neurology',
    relatedTerms: ['Seizures', 'Brain', 'Neurological'],
    tags: ['neuro', 'seizures', 'brain'],
  },
  {
    term: 'Fibromyalgia',
    definition:
      'A long-term condition associated with widespread musculoskeletal pain, fatigue, and sleep disturbances.',
    category: 'Pain Management',
    relatedTerms: ['Chronic pain', 'Fatigue', 'Sleep'],
    tags: ['pain', 'fatigue', 'sleep'],
  },
  {
    term: 'Gallbladder',
    definition:
      'A small organ that stores and concentrates bile, which helps digest fats.',
    category: 'Digestive Health',
    relatedTerms: ['Bile', 'Digestion', 'Gallstones'],
    tags: ['digestive', 'bile', 'organ'],
  },
  {
    term: 'Hypertension',
    definition:
      'A condition in which blood pressure remains consistently elevated above the healthy range.',
    category: 'Cardiology',
    relatedTerms: ['Blood pressure', 'Heart health', 'Stroke risk'],
    tags: ['heart', 'circulation', 'blood pressure'],
  },
  {
    term: 'Insomnia',
    definition:
      'A sleep disorder marked by difficulty falling asleep, staying asleep, or waking too early.',
    category: 'Sleep Medicine',
    relatedTerms: ['Sleep', 'Rest', 'Stress'],
    tags: ['sleep', 'rest', 'stress'],
  },
  {
    term: 'Jaundice',
    definition:
      'A yellowing of the skin and eyes caused by excess bilirubin in the bloodstream.',
    category: 'Hepatology',
    relatedTerms: ['Liver', 'Bilirubin', 'Skin'],
    tags: ['liver', 'bilirubin', 'skin'],
  },
  {
    term: 'Kidney stone',
    definition:
      'A hard deposit that forms in the kidneys from minerals and salts and may cause severe pain.',
    category: 'Urology',
    relatedTerms: ['Urine', 'Pain', 'Hydration'],
    tags: ['kidneys', 'pain', 'hydration'],
  },
  {
    term: 'Lymphoma',
    definition:
      'A type of cancer that begins in the lymphatic system and affects the body’s immune defenses.',
    category: 'Oncology',
    relatedTerms: ['Immune system', 'Lymph nodes', 'Cancer'],
    tags: ['cancer', 'immunity', 'lymph'],
  },
  {
    term: 'Migraine',
    definition:
      'A neurological condition that often causes intense, throbbing headaches and sensitivity to light or sound.',
    category: 'Neurology',
    relatedTerms: ['Headache', 'Light sensitivity', 'Pain'],
    tags: ['headache', 'neuro', 'pain'],
  },
  {
    term: 'Neuropathy',
    definition:
      'Nerve damage that can cause numbness, tingling, or pain in the hands and feet.',
    category: 'Neurology',
    relatedTerms: ['Nerves', 'Tingling', 'Peripheral'],
    tags: ['nerve', 'tingling', 'peripheral'],
  },
  {
    term: 'Osteoporosis',
    definition:
      'A disease that weakens bones and increases the risk of fractures, especially with age.',
    category: 'Orthopedics',
    relatedTerms: ['Bones', 'Calcium', 'Fracture'],
    tags: ['bones', 'calcium', 'aging'],
  },
  {
    term: 'Pneumonia',
    definition:
      'An infection that inflames the air sacs in one or both lungs, often causing fever and breathing difficulties.',
    category: 'Respiratory',
    relatedTerms: ['Lungs', 'Infection', 'Breathing'],
    tags: ['lungs', 'infection', 'breathing'],
  },
  {
    term: 'Q fever',
    definition:
      'An infectious disease caused by Coxiella burnetii that can affect multiple organs and spread from animals.',
    category: 'Infectious Disease',
    relatedTerms: ['Infection', 'Zoonotic', 'Fever'],
    tags: ['infection', 'zoonotic', 'fever'],
  },
  {
    term: 'Rheumatoid arthritis',
    definition:
      'An autoimmune disorder that causes chronic inflammation of the joints and can damage surrounding tissues.',
    category: 'Rheumatology',
    relatedTerms: ['Joint pain', 'Inflammation', 'Autoimmune'],
    tags: ['joints', 'inflammation', 'autoimmune'],
  },
  {
    term: 'Sepsis',
    definition:
      'A life-threatening reaction to infection that can trigger organ failure and requires urgent care.',
    category: 'Critical Care',
    relatedTerms: ['Infection', 'Organ failure', 'Emergency'],
    tags: ['infection', 'emergency', 'critical care'],
  },
  {
    term: 'Tendinitis',
    definition:
      'Inflammation or irritation of a tendon, often caused by overuse or repetitive motion.',
    category: 'Orthopedics',
    relatedTerms: ['Tendon', 'Overuse', 'Pain'],
    tags: ['tendon', 'overuse', 'mobility'],
  },
  {
    term: 'Urticaria',
    definition:
      'A skin condition also known as hives, characterized by raised itchy welts.',
    category: 'Dermatology',
    relatedTerms: ['Hives', 'Allergy', 'Skin'],
    tags: ['skin', 'allergy', 'itch'],
  },
  {
    term: 'Varicose veins',
    definition:
      'Enlarged, twisted veins that often appear near the surface of the legs and feet.',
    category: 'Vascular',
    relatedTerms: ['Veins', 'Circulation', 'Leg swelling'],
    tags: ['veins', 'circulation', 'legs'],
  },
  {
    term: 'Wheezing',
    definition:
      'A high-pitched breath sound that can indicate narrowed airways or respiratory irritation.',
    category: 'Respiratory',
    relatedTerms: ['Asthma', 'Breathing', 'Airways'],
    tags: ['breathing', 'airways', 'asthma'],
  },
  {
    term: 'Xeroderma',
    definition:
      'A dry skin condition that can result from environmental factors, genetic causes, or aging.',
    category: 'Dermatology',
    relatedTerms: ['Dry skin', 'Skin care', 'Dermatitis'],
    tags: ['skin', 'dryness', 'dermatology'],
  },
  {
    term: 'Yellow fever',
    definition:
      'A viral infection spread by mosquitoes that can cause fever, jaundice, and severe illness.',
    category: 'Infectious Disease',
    relatedTerms: ['Virus', 'Mosquito', 'Travel'],
    tags: ['virus', 'mosquito', 'travel'],
  },
  {
    term: 'Zika virus',
    definition:
      'A mosquito-borne virus associated with fever, rash, and potential complications during pregnancy.',
    category: 'Infectious Disease',
    relatedTerms: ['Mosquito', 'Virus', 'Pregnancy'],
    tags: ['virus', 'mosquito', 'pregnancy'],
  },
];

export const testGlossaryTerms: GlossaryTerm[] = medicalGlossaryTerms;
