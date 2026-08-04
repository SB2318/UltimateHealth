export type GlossaryTerm = {
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
  tags?: string[];
};

export const medicalGlossaryAlphabetSections: Record<string, GlossaryTerm[]> = {
  A: [
    {
      term: 'Anemia',
      definition:
        'A condition marked by a shortage of healthy red blood cells or hemoglobin, often causing fatigue and weakness.',
      category: 'Hematology',
      relatedTerms: ['Iron deficiency', 'Fatigue', 'Blood count'],
      tags: ['blood', 'nutrition', 'fatigue'],
    },
    {
      term: 'Acne',
      definition:
        'A common skin condition in which pores become clogged and inflamed, leading to pimples and blemishes.',
      category: 'Dermatology',
      relatedTerms: ['Skin', 'Pimples', 'Hormones'],
      tags: ['skin', 'pimples', 'dermatology'],
    },
    {
      term: 'Asthma',
      definition:
        'A chronic respiratory condition that causes airway inflammation and episodes of wheezing, chest tightness, and shortness of breath.',
      category: 'Respiratory',
      relatedTerms: ['Wheezing', 'Airway', 'Breathing'],
      tags: ['lungs', 'breathing', 'inflammation'],
    },
  ],
  B: [
    {
      term: 'Bronchitis',
      definition:
        'Inflammation of the bronchial tubes that can lead to coughing, chest discomfort, and mucus production.',
      category: 'Respiratory',
      relatedTerms: ['Cough', 'Lungs', 'Airway'],
      tags: ['lungs', 'infection', 'cough'],
    },
    {
      term: 'Bacterial infection',
      definition:
        'An illness caused by harmful bacteria that multiply in the body and may require antibiotics.',
      category: 'Infectious Disease',
      relatedTerms: ['Infection', 'Antibiotics', 'Immune system'],
      tags: ['infection', 'bacteria', 'antibiotics'],
    },
  ],
  C: [
    {
      term: 'Celiac disease',
      definition:
        'An autoimmune disorder in which gluten triggers damage to the lining of the small intestine.',
      category: 'Gastroenterology',
      relatedTerms: ['Gluten', 'Digestive health', 'Autoimmune'],
      tags: ['digestion', 'gluten', 'autoimmune'],
    },
    {
      term: 'Cirrhosis',
      definition:
        'A late-stage liver disease in which healthy tissue is replaced by scar tissue and liver function declines.',
      category: 'Hepatology',
      relatedTerms: ['Liver', 'Scarring', 'Alcohol'],
      tags: ['liver', 'scarring', 'cirrhosis'],
    },
    {
      term: 'Chronic fatigue syndrome',
      definition:
        'A complex disorder characterized by persistent fatigue that is not improved by rest and can affect daily functioning.',
      category: 'Internal Medicine',
      relatedTerms: ['Fatigue', 'Energy', 'Sleep'],
      tags: ['fatigue', 'energy', 'wellness'],
    },
  ],
  D: [
    {
      term: 'Diabetes',
      definition:
        'A chronic condition that affects how the body converts food into energy, often involving blood sugar imbalance.',
      category: 'Endocrinology',
      relatedTerms: ['Insulin', 'Glucose', 'Blood sugar'],
      tags: ['metabolism', 'insulin', 'blood sugar'],
    },
    {
      term: 'Dermatitis',
      definition:
        'Inflammation of the skin that can cause redness, itching, and irritation.',
      category: 'Dermatology',
      relatedTerms: ['Skin', 'Itching', 'Rash'],
      tags: ['skin', 'itching', 'rash'],
    },
  ],
  E: [
    {
      term: 'Epilepsy',
      definition:
        'A neurological disorder characterized by recurrent seizures caused by abnormal electrical activity in the brain.',
      category: 'Neurology',
      relatedTerms: ['Seizures', 'Brain', 'Neurological'],
      tags: ['neuro', 'seizures', 'brain'],
    },
    {
      term: 'Eczema',
      definition:
        'A chronic inflammatory skin condition that causes dry, itchy, and irritated patches of skin.',
      category: 'Dermatology',
      relatedTerms: ['Skin', 'Itching', 'Rash'],
      tags: ['skin', 'itching', 'eczema'],
    },
  ],
  F: [
    {
      term: 'Fibromyalgia',
      definition:
        'A long-term condition associated with widespread musculoskeletal pain, fatigue, and sleep disturbances.',
      category: 'Pain Management',
      relatedTerms: ['Chronic pain', 'Fatigue', 'Sleep'],
      tags: ['pain', 'fatigue', 'sleep'],
    },
    {
      term: 'Fever',
      definition:
        'A temporary increase in body temperature often indicating that the body is fighting an infection.',
      category: 'Infectious Disease',
      relatedTerms: ['Infection', 'Temperature', 'Illness'],
      tags: ['infection', 'temperature', 'illness'],
    },
  ],
  G: [
    {
      term: 'Gallbladder',
      definition:
        'A small organ that stores and concentrates bile, which helps digest fats.',
      category: 'Digestive Health',
      relatedTerms: ['Bile', 'Digestion', 'Gallstones'],
      tags: ['digestive', 'bile', 'organ'],
    },
  ],
  H: [
    {
      term: 'Hypertension',
      definition:
        'A condition in which blood pressure remains consistently elevated above the healthy range.',
      category: 'Cardiology',
      relatedTerms: ['Blood pressure', 'Heart health', 'Stroke risk'],
      tags: ['heart', 'circulation', 'blood pressure'],
    },
  ],
  I: [
    {
      term: 'Insomnia',
      definition:
        'A sleep disorder marked by difficulty falling asleep, staying asleep, or waking too early.',
      category: 'Sleep Medicine',
      relatedTerms: ['Sleep', 'Rest', 'Stress'],
      tags: ['sleep', 'rest', 'stress'],
    },
  ],
  J: [
    {
      term: 'Jaundice',
      definition:
        'A yellowing of the skin and eyes caused by excess bilirubin in the bloodstream.',
      category: 'Hepatology',
      relatedTerms: ['Liver', 'Bilirubin', 'Skin'],
      tags: ['liver', 'bilirubin', 'skin'],
    },
  ],
  K: [
    {
      term: 'Kidney stone',
      definition:
        'A hard deposit that forms in the kidneys from minerals and salts and may cause severe pain.',
      category: 'Urology',
      relatedTerms: ['Urine', 'Pain', 'Hydration'],
      tags: ['kidneys', 'pain', 'hydration'],
    },
  ],
  L: [
    {
      term: 'Lymphoma',
      definition:
        'A type of cancer that begins in the lymphatic system and affects the body’s immune defenses.',
      category: 'Oncology',
      relatedTerms: ['Immune system', 'Lymph nodes', 'Cancer'],
      tags: ['cancer', 'immunity', 'lymph'],
    },
  ],
  M: [
    {
      term: 'Migraine',
      definition:
        'A neurological condition that often causes intense, throbbing headaches and sensitivity to light or sound.',
      category: 'Neurology',
      relatedTerms: ['Headache', 'Light sensitivity', 'Pain'],
      tags: ['headache', 'neuro', 'pain'],
    },
    {
      term: 'Myocardial infarction',
      definition:
        'A medical emergency in which blood flow to part of the heart muscle is blocked, commonly known as a heart attack.',
      category: 'Cardiology',
      relatedTerms: ['Heart attack', 'Chest pain', 'Cardiac'],
      tags: ['heart', 'cardiac', 'emergency'],
    },
  ],
  N: [
    {
      term: 'Neuropathy',
      definition:
        'Nerve damage that can cause numbness, tingling, or pain in the hands and feet.',
      category: 'Neurology',
      relatedTerms: ['Nerves', 'Tingling', 'Peripheral'],
      tags: ['nerve', 'tingling', 'peripheral'],
    },
  ],
  O: [
    {
      term: 'Osteoporosis',
      definition:
        'A disease that weakens bones and increases the risk of fractures, especially with age.',
      category: 'Orthopedics',
      relatedTerms: ['Bones', 'Calcium', 'Fracture'],
      tags: ['bones', 'calcium', 'aging'],
    },
  ],
  P: [
    {
      term: 'Pneumonia',
      definition:
        'An infection that inflames the air sacs in one or both lungs, often causing fever and breathing difficulties.',
      category: 'Respiratory',
      relatedTerms: ['Lungs', 'Infection', 'Breathing'],
      tags: ['lungs', 'infection', 'breathing'],
    },
  ],
  Q: [
    {
      term: 'Q fever',
      definition:
        'An infectious disease caused by Coxiella burnetii that can affect multiple organs and spread from animals.',
      category: 'Infectious Disease',
      relatedTerms: ['Infection', 'Zoonotic', 'Fever'],
      tags: ['infection', 'zoonotic', 'fever'],
    },
  ],
  R: [
    {
      term: 'Rheumatoid arthritis',
      definition:
        'An autoimmune disorder that causes chronic inflammation of the joints and can damage surrounding tissues.',
      category: 'Rheumatology',
      relatedTerms: ['Joint pain', 'Inflammation', 'Autoimmune'],
      tags: ['joints', 'inflammation', 'autoimmune'],
    },
  ],
  S: [
    {
      term: 'Sepsis',
      definition:
        'A life-threatening reaction to infection that can trigger organ failure and requires urgent care.',
      category: 'Critical Care',
      relatedTerms: ['Infection', 'Organ failure', 'Emergency'],
      tags: ['infection', 'emergency', 'critical care'],
    },
  ],
  T: [
    {
      term: 'Tendinitis',
      definition:
        'Inflammation or irritation of a tendon, often caused by overuse or repetitive motion.',
      category: 'Orthopedics',
      relatedTerms: ['Tendon', 'Overuse', 'Pain'],
      tags: ['tendon', 'overuse', 'mobility'],
    },
  ],
  U: [
    {
      term: 'Urticaria',
      definition:
        'A skin condition also known as hives, characterized by raised itchy welts.',
      category: 'Dermatology',
      relatedTerms: ['Hives', 'Allergy', 'Skin'],
      tags: ['skin', 'allergy', 'itch'],
    },
  ],
  V: [
    {
      term: 'Varicose veins',
      definition:
        'Enlarged, twisted veins that often appear near the surface of the legs and feet.',
      category: 'Vascular',
      relatedTerms: ['Veins', 'Circulation', 'Leg swelling'],
      tags: ['veins', 'circulation', 'legs'],
    },
  ],
  W: [
    {
      term: 'Wheezing',
      definition:
        'A high-pitched breath sound that can indicate narrowed airways or respiratory irritation.',
      category: 'Respiratory',
      relatedTerms: ['Asthma', 'Breathing', 'Airways'],
      tags: ['breathing', 'airways', 'asthma'],
    },
  ],
  X: [
    {
      term: 'Xeroderma',
      definition:
        'A dry skin condition that can result from environmental factors, genetic causes, or aging.',
      category: 'Dermatology',
      relatedTerms: ['Dry skin', 'Skin care', 'Dermatitis'],
      tags: ['skin', 'dryness', 'dermatology'],
    },
  ],
  Y: [
    {
      term: 'Yellow fever',
      definition:
        'A viral infection spread by mosquitoes that can cause fever, jaundice, and severe illness.',
      category: 'Infectious Disease',
      relatedTerms: ['Virus', 'Mosquito', 'Travel'],
      tags: ['virus', 'mosquito', 'travel'],
    },
  ],
  Z: [
    {
      term: 'Zika virus',
      definition:
        'A mosquito-borne virus associated with fever, rash, and potential complications during pregnancy.',
      category: 'Infectious Disease',
      relatedTerms: ['Mosquito', 'Virus', 'Pregnancy'],
      tags: ['virus', 'mosquito', 'pregnancy'],
    },
  ],
};

export const medicalGlossaryTerms: GlossaryTerm[] = Object.values(medicalGlossaryAlphabetSections).flat();

export const testGlossaryTerms: GlossaryTerm[] = medicalGlossaryTerms;
