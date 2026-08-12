export type GlossaryTerm = {
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
  // Optional pre-filled comparison fields (AI fills these if missing)
  symptoms?: string;
  causes?: string;
  riskFactors?: string;
  diagnosis?: string;
  treatment?: string;
  prevention?: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Hypertension',
    definition:
      'A condition in which blood pressure remains consistently elevated above the healthy range.',
    category: 'Cardiology',
    relatedTerms: ['Blood pressure', 'Heart health', 'Stroke risk'],
  },
  {
    term: 'Hypotension',
    definition:
      'Abnormally low blood pressure that can cause dizziness, fainting, and in severe cases, life-threatening shock.',
    category: 'Cardiology',
    relatedTerms: ['Blood pressure', 'Dizziness', 'Fainting'],
  },
  {
    term: 'Glucose',
    definition:
      'A simple sugar that the body uses as a primary source of energy, especially after digestion.',
    category: 'Metabolism',
    relatedTerms: ['Diabetes', 'Insulin'],
  },
  {
    term: 'Type 1 Diabetes',
    definition:
      'An autoimmune condition where the pancreas produces little or no insulin, requiring daily insulin therapy.',
    category: 'Endocrinology',
    relatedTerms: ['Insulin', 'Autoimmune', 'Blood sugar'],
  },
  {
    term: 'Type 2 Diabetes',
    definition:
      'A metabolic disorder where the body does not use insulin effectively, often linked to lifestyle factors.',
    category: 'Endocrinology',
    relatedTerms: ['Insulin resistance', 'Obesity', 'Blood sugar'],
  },
  {
    term: 'Asthma',
    definition:
      'A chronic respiratory condition characterized by airway inflammation, narrowing, and reversible obstruction causing wheezing and breathlessness.',
    category: 'Pulmonology',
    relatedTerms: ['Bronchospasm', 'Inhaler', 'Allergies'],
  },
  {
    term: 'COPD',
    definition:
      'Chronic Obstructive Pulmonary Disease — a group of progressive lung diseases including emphysema and chronic bronchitis that block airflow.',
    category: 'Pulmonology',
    relatedTerms: ['Emphysema', 'Bronchitis', 'Smoking'],
  },
  {
    term: 'Anxiety',
    definition:
      'A mental health disorder characterized by excessive worry, fear, and nervousness that interferes with daily life.',
    category: 'Mental Health',
    relatedTerms: ['Panic attack', 'Stress', 'Phobia'],
  },
  {
    term: 'Depression',
    definition:
      'A mood disorder causing persistent feelings of sadness, hopelessness, and loss of interest in activities.',
    category: 'Mental Health',
    relatedTerms: ['Mood disorder', 'Antidepressants', 'Therapy'],
  },
  {
    term: 'Viral Infection',
    definition:
      'An illness caused by viruses invading host cells to replicate, spreading through contact, droplets, or contaminated surfaces.',
    category: 'Infectious Disease',
    relatedTerms: ['Virus', 'Antiviral', 'Immune response'],
  },
  {
    term: 'Bacterial Infection',
    definition:
      'An illness caused by harmful bacteria that multiply in the body, typically treatable with antibiotics.',
    category: 'Infectious Disease',
    relatedTerms: ['Bacteria', 'Antibiotics', 'Sepsis'],
  },
  {
    term: 'Osteoporosis',
    definition:
      'A bone disease that occurs when the body loses too much bone mass or makes too little bone, making bones weak and brittle.',
    category: 'Orthopedics',
    relatedTerms: ['Bone density', 'Calcium', 'Fracture'],
  },
  {
    term: 'Osteoarthritis',
    definition:
      'A degenerative joint disease involving the breakdown of cartilage and underlying bone, causing pain and stiffness.',
    category: 'Orthopedics',
    relatedTerms: ['Cartilage', 'Joint pain', 'Aging'],
  },
  {
    term: 'Stroke',
    definition:
      'A medical emergency occurring when blood supply to part of the brain is cut off, causing brain cells to die.',
    category: 'Neurology',
    relatedTerms: ['Blood clot', 'Brain', 'Hypertension'],
  },
  {
    term: 'Heart Attack',
    definition:
      'A medical emergency where blood flow to part of the heart muscle is blocked, causing tissue damage or death.',
    category: 'Cardiology',
    relatedTerms: ['Myocardial infarction', 'Coronary artery', 'Chest pain'],
  },
];
