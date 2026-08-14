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
    category: 'Cardiovascular Health',
    relatedTerms: ['Blood pressure', 'Heart health', 'Stroke risk'],
  },
  {
    term: 'Hypotension',
    definition:
      'Abnormally low blood pressure that can cause dizziness, fainting, and in severe cases, life-threatening shock.',
    category: 'Cardiovascular Health',
    relatedTerms: ['Blood pressure', 'Dizziness', 'Fainting'],
  },
  {
    term: 'Glucose',
    definition:
      'A simple sugar that the body uses as a primary source of energy, especially after digestion.',
    category: 'Metabolic Health',
    relatedTerms: ['Diabetes', 'Insulin'],
  },
  {
    term: 'Type 1 Diabetes',
    definition:
      'An autoimmune condition where the pancreas produces little or no insulin, requiring daily insulin therapy.',
    category: 'Metabolic Health',
    relatedTerms: ['Insulin', 'Autoimmune', 'Blood sugar'],
  },
  {
    term: 'Type 2 Diabetes',
    definition:
      'A metabolic disorder where the body does not use insulin effectively, often linked to lifestyle factors.',
    category: 'Metabolic Health',
    relatedTerms: ['Insulin resistance', 'Obesity', 'Blood sugar'],
  },
  {
    term: 'Asthma',
    definition:
      'A chronic respiratory condition characterized by airway inflammation, narrowing, and reversible obstruction causing wheezing and breathlessness.',
    category: 'Respiratory Health',
    relatedTerms: ['Bronchospasm', 'Inhaler', 'Allergies'],
  },
  {
    term: 'COPD',
    definition:
      'Chronic Obstructive Pulmonary Disease — a group of progressive lung diseases including emphysema and chronic bronchitis that block airflow.',
    category: 'Respiratory Health',
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
    category: 'Neurological Health',
    relatedTerms: ['Blood clot', 'Brain', 'Hypertension'],
  },
  {
    term: 'Heart Attack',
    definition:
      'A medical emergency where blood flow to part of the heart muscle is blocked, causing tissue damage or death.',
    category: 'Cardiovascular Health',
    relatedTerms: ['Myocardial infarction', 'Coronary artery', 'Chest pain'],
  },
  {
    term: 'Anemia',
    definition:
      "A condition where the body doesn't have enough healthy red blood cells or hemoglobin to carry oxygen to tissues.",
    category: 'Blood Health',
    relatedTerms: ['Hemoglobin', 'Iron Deficiency', 'Fatigue'],
  },
  {
    term: 'Hemoglobin',
    definition:
      'A protein in red blood cells that binds oxygen in the lungs and delivers it to tissues throughout the body.',
    category: 'Blood Health',
    relatedTerms: ['Red Blood Cells', 'Anemia', 'Oxygen'],
  },
  {
    term: 'Leukemia',
    definition:
      'A cancer of the blood-forming tissues, including bone marrow, that causes the overproduction of abnormal white blood cells.',
    category: 'Blood Health',
    relatedTerms: ['Bone Marrow', 'White Blood Cell', 'Cancer'],
  },
  {
    term: 'Thrombocytopenia',
    definition:
      'A condition marked by an abnormally low platelet count, which can lead to easy bruising and prolonged bleeding.',
    category: 'Blood Health',
    relatedTerms: ['Platelets', 'Bruising', 'Bleeding Disorder'],
  },
  {
    term: 'Hemophilia',
    definition:
      "An inherited bleeding disorder in which the blood doesn't clot properly due to missing or deficient clotting factors.",
    category: 'Blood Health',
    relatedTerms: ['Clotting Factor', 'Bleeding Disorder', 'Genetic Disorder'],
  },
  {
    term: 'Sickle Cell Disease',
    definition:
      'An inherited disorder in which red blood cells become rigid and crescent-shaped, blocking blood flow and reducing oxygen delivery.',
    category: 'Blood Health',
    relatedTerms: ['Hemoglobin', 'Genetic Disorder', 'Red Blood Cells'],
  },
  {
    term: 'Thrombosis',
    definition:
      'The formation of a blood clot inside a blood vessel, which can obstruct blood flow to organs and tissues.',
    category: 'Blood Health',
    relatedTerms: ['Blood Clot', 'Deep Vein Thrombosis', 'Circulation'],
  },
  {
    term: 'Polycythemia',
    definition:
      'A condition characterized by an excess of red blood cells in the bloodstream, thickening the blood and raising clot risk.',
    category: 'Blood Health',
    relatedTerms: ['Red Blood Cells', 'Blood Viscosity', 'Bone Marrow'],
  },
  {
    term: 'Iron Deficiency',
    definition:
      'A shortage of iron in the body that impairs hemoglobin production and is the most common cause of anemia worldwide.',
    category: 'Blood Health',
    relatedTerms: ['Anemia', 'Hemoglobin', 'Fatigue'],
  },
  {
    term: 'White Blood Cell',
    definition:
      'A key component of the immune system that identifies and fights off infections, viruses, and foreign invaders in the body.',
    category: 'Blood Health',
    relatedTerms: ['Immune System', 'Infection', 'Leukemia'],
  },
  {
    term: 'Atherosclerosis',
    definition:
      'The buildup of fatty plaques inside artery walls, which narrows arteries and restricts blood flow over time.',
    category: 'Cardiovascular Health',
    relatedTerms: ['Cholesterol', 'Coronary Artery Disease', 'Plaque'],
  },
  {
    term: 'Arrhythmia',
    definition:
      'An irregular heartbeat caused by faulty electrical signals in the heart, which may beat too fast, too slow, or erratically.',
    category: 'Cardiovascular Health',
    relatedTerms: ['Atrial Fibrillation', 'Heart Rhythm', 'Palpitations'],
  },
  {
    term: 'Coronary Artery Disease',
    definition:
      'A condition in which the arteries supplying blood to the heart become narrowed or blocked by plaque buildup.',
    category: 'Cardiovascular Health',
    relatedTerms: ['Atherosclerosis', 'Angina', 'Heart Attack'],
  },
  {
    term: 'Heart Failure',
    definition:
      "A chronic condition in which the heart can't pump blood efficiently enough to meet the body's needs.",
    category: 'Cardiovascular Health',
    relatedTerms: ['Cardiomyopathy', 'Shortness of Breath', 'Edema'],
  },
  {
    term: 'Cholesterol',
    definition:
      'A waxy, fat-like substance in the blood that is essential for cell function but can build up in arteries at high levels.',
    category: 'Cardiovascular Health',
    relatedTerms: ['Atherosclerosis', 'LDL', 'Hyperlipidemia'],
  },
  {
    term: 'Angina',
    definition:
      'Chest pain or discomfort caused by reduced blood flow to the heart muscle, often a warning sign of coronary artery disease.',
    category: 'Cardiovascular Health',
    relatedTerms: ['Coronary Artery Disease', 'Chest Pain', 'Heart Attack'],
  },
  {
    term: 'Peripheral Artery Disease',
    definition:
      'A circulatory condition in which narrowed arteries reduce blood flow to the limbs, most often the legs.',
    category: 'Cardiovascular Health',
    relatedTerms: ['Atherosclerosis', 'Circulation', 'Claudication'],
  },
  {
    term: 'Cardiomyopathy',
    definition:
      'A disease of the heart muscle that makes it harder for the heart to pump blood effectively to the rest of the body.',
    category: 'Cardiovascular Health',
    relatedTerms: ['Heart Failure', 'Heart Muscle', 'Arrhythmia'],
  },
  {
    term: 'Deep Vein Thrombosis',
    definition:
      'The formation of a blood clot in a deep vein, usually in the leg, which can be dangerous if it travels to the lungs.',
    category: 'Cardiovascular Health',
    relatedTerms: ['Thrombosis', 'Pulmonary Embolism', 'Blood Clot'],
  },
  {
    term: 'Atrial Fibrillation',
    definition:
      "The most common type of arrhythmia, causing the heart's upper chambers to beat irregularly and out of sync with the lower chambers.",
    category: 'Cardiovascular Health',
    relatedTerms: ['Arrhythmia', 'Stroke', 'Palpitations'],
  },
  {
    term: 'Pneumonia',
    definition:
      'An infection that inflames the air sacs in one or both lungs, which may fill with fluid and cause coughing and difficulty breathing.',
    category: 'Respiratory Health',
    relatedTerms: ['Lungs', 'Infection', 'Bronchitis'],
  },
  {
    term: 'Bronchitis',
    definition:
      'Inflammation of the lining of the bronchial tubes that carry air to the lungs, often causing coughing and mucus production.',
    category: 'Respiratory Health',
    relatedTerms: ['COPD', 'Cough', 'Lungs'],
  },
  {
    term: 'Pulmonary Embolism',
    definition:
      'A sudden blockage in a lung artery, usually caused by a blood clot that has traveled from elsewhere in the body.',
    category: 'Respiratory Health',
    relatedTerms: ['Deep Vein Thrombosis', 'Blood Clot', 'Shortness of Breath'],
  },
  {
    term: 'Sleep Apnea',
    definition:
      'A disorder in which breathing repeatedly stops and starts during sleep, often due to airway obstruction.',
    category: 'Respiratory Health',
    relatedTerms: ['Snoring', 'Airway Obstruction', 'Fatigue'],
  },
  {
    term: 'Pulmonary Fibrosis',
    definition:
      'A lung disease in which tissue becomes scarred and thickened over time, making it progressively harder to breathe.',
    category: 'Respiratory Health',
    relatedTerms: ['Lung Scarring', 'Shortness of Breath', 'Lungs'],
  },
  {
    term: 'Tuberculosis',
    definition:
      'A contagious bacterial infection that primarily affects the lungs and spreads through airborne droplets.',
    category: 'Respiratory Health',
    relatedTerms: ['Bacterial Infection', 'Lungs', 'Cough'],
  },
  {
    term: 'Pleurisy',
    definition:
      'Inflammation of the pleura, the thin tissue lining the lungs and chest cavity, causing sharp pain with breathing.',
    category: 'Respiratory Health',
    relatedTerms: ['Chest Pain', 'Lungs', 'Inflammation'],
  },
  {
    term: 'Bronchiectasis',
    definition:
      'A chronic condition in which the airways become abnormally widened and scarred, leading to mucus buildup and repeated infections.',
    category: 'Respiratory Health',
    relatedTerms: ['Airways', 'Mucus', 'Chronic Infection'],
  },
  {
    term: 'Hypoxia',
    definition:
      'A condition in which the body or a region of the body is deprived of adequate oxygen supply.',
    category: 'Respiratory Health',
    relatedTerms: ['Oxygen', 'Shortness of Breath', 'Cyanosis'],
  },
  {
    term: 'Pulmonary Hypertension',
    definition:
      'High blood pressure in the arteries of the lungs, which forces the heart to work harder and can lead to heart failure.',
    category: 'Respiratory Health',
    relatedTerms: ['Blood Pressure', 'Lungs', 'Heart Failure'],
  },
  {
    term: 'GERD',
    definition:
      'Gastroesophageal Reflux Disease — a chronic condition in which stomach acid repeatedly flows back into the esophagus, causing irritation.',
    category: 'Digestive Health',
    relatedTerms: ['Acid Reflux', 'Heartburn', 'Esophagus'],
  },
  {
    term: 'Irritable Bowel Syndrome',
    definition:
      'A common disorder affecting the large intestine that causes cramping, bloating, gas, and changes in bowel habits.',
    category: 'Digestive Health',
    relatedTerms: ['Bloating', 'Digestion', 'Large Intestine'],
  },
  {
    term: 'Peptic Ulcer',
    definition:
      'An open sore that develops on the lining of the stomach or upper small intestine, often caused by bacteria or long-term NSAID use.',
    category: 'Digestive Health',
    relatedTerms: ['Stomach Lining', 'H. Pylori', 'Abdominal Pain'],
  },
  {
    term: "Crohn's Disease",
    definition:
      'A chronic inflammatory bowel disease that causes inflammation of the digestive tract, leading to pain, diarrhea, and fatigue.',
    category: 'Digestive Health',
    relatedTerms: ['Inflammatory Bowel Disease', 'Digestive Tract', 'Ulcerative Colitis'],
  },
  {
    term: 'Ulcerative Colitis',
    definition:
      'A chronic inflammatory bowel disease that causes inflammation and ulcers in the lining of the colon and rectum.',
    category: 'Digestive Health',
    relatedTerms: ['Inflammatory Bowel Disease', 'Colon', "Crohn's Disease"],
  },
  {
    term: 'Celiac Disease',
    definition:
      'An autoimmune disorder in which eating gluten triggers an immune response that damages the lining of the small intestine.',
    category: 'Digestive Health',
    relatedTerms: ['Gluten', 'Autoimmune', 'Small Intestine'],
  },
  {
    term: 'Gallstones',
    definition:
      'Hardened deposits of digestive fluid that form in the gallbladder and can block bile ducts, causing sudden pain.',
    category: 'Digestive Health',
    relatedTerms: ['Gallbladder', 'Bile', 'Abdominal Pain'],
  },
  {
    term: 'Pancreatitis',
    definition:
      'Inflammation of the pancreas that can cause severe abdominal pain and impair digestion and blood sugar regulation.',
    category: 'Digestive Health',
    relatedTerms: ['Pancreas', 'Abdominal Pain', 'Digestive Enzymes'],
  },
  {
    term: 'Cirrhosis',
    definition:
      "Severe scarring of the liver caused by long-term damage, which impairs the liver's ability to function properly.",
    category: 'Digestive Health',
    relatedTerms: ['Liver', 'Liver Scarring', 'Hepatitis'],
  },
  {
    term: 'Constipation',
    definition:
      'A condition marked by infrequent bowel movements or difficulty passing stool, often due to diet, dehydration, or inactivity.',
    category: 'Digestive Health',
    relatedTerms: ['Bowel Movement', 'Digestion', 'Fiber'],
  },
  {
    term: 'Metabolic Syndrome',
    definition:
      'A cluster of conditions — including high blood pressure, high blood sugar, and excess body fat — that together raise the risk of heart disease and diabetes.',
    category: 'Metabolic Health',
    relatedTerms: ['Obesity', 'Insulin Resistance', 'Hypertension'],
  },
  {
    term: 'Hyperlipidemia',
    definition:
      'A condition marked by abnormally high levels of fats, such as cholesterol and triglycerides, in the blood.',
    category: 'Metabolic Health',
    relatedTerms: ['Cholesterol', 'Triglycerides', 'Atherosclerosis'],
  },
  {
    term: 'Hypothyroidism',
    definition:
      "An underactive thyroid gland that doesn't produce enough thyroid hormone, slowing the body's metabolism.",
    category: 'Metabolic Health',
    relatedTerms: ['Thyroid', 'Metabolism', 'Fatigue'],
  },
  {
    term: 'Hyperthyroidism',
    definition:
      "An overactive thyroid gland that produces excess thyroid hormone, speeding up the body's metabolism.",
    category: 'Metabolic Health',
    relatedTerms: ['Thyroid', 'Metabolism', 'Weight Loss'],
  },
  {
    term: 'Obesity',
    definition:
      'A complex condition involving excess body fat that increases the risk of diabetes, heart disease, and other health problems.',
    category: 'Metabolic Health',
    relatedTerms: ['Body Mass Index', 'Metabolic Syndrome', 'Insulin Resistance'],
  },
  {
    term: 'Insulin Resistance',
    definition:
      "A condition in which the body's cells don't respond normally to insulin, leading to elevated blood sugar levels.",
    category: 'Metabolic Health',
    relatedTerms: ['Insulin', 'Type 2 Diabetes', 'Blood Sugar'],
  },
  {
    term: 'Gout',
    definition:
      'A form of inflammatory arthritis caused by a buildup of uric acid crystals in the joints, often affecting the big toe.',
    category: 'Metabolic Health',
    relatedTerms: ['Uric Acid', 'Joint Pain', 'Arthritis'],
  },
  {
    term: 'Hypoglycemia',
    definition:
      'A condition in which blood sugar levels drop below normal, which can cause shakiness, confusion, and fainting.',
    category: 'Metabolic Health',
    relatedTerms: ['Blood Sugar', 'Insulin', 'Diabetes'],
  },
  {
    term: 'Dyslipidemia',
    definition:
      'An imbalance of lipids in the blood, such as elevated LDL or low HDL cholesterol, that raises cardiovascular risk.',
    category: 'Metabolic Health',
    relatedTerms: ['Cholesterol', 'LDL', 'Cardiovascular Risk'],
  },
  {
    term: 'Vitamin D Deficiency',
    definition:
      'A lack of sufficient vitamin D in the body, which can weaken bones and impair immune and metabolic function.',
    category: 'Metabolic Health',
    relatedTerms: ['Bone Health', 'Sunlight', 'Immune Function'],
  },
  {
    term: 'Bipolar Disorder',
    definition:
      'A mental health condition causing extreme mood swings that include emotional highs (mania) and lows (depression).',
    category: 'Mental Health',
    relatedTerms: ['Mania', 'Depression', 'Mood Disorder'],
  },
  {
    term: 'PTSD',
    definition:
      'Post-Traumatic Stress Disorder — a condition triggered by experiencing or witnessing a traumatic event, causing flashbacks, anxiety, and distress.',
    category: 'Mental Health',
    relatedTerms: ['Trauma', 'Anxiety', 'Flashbacks'],
  },
  {
    term: 'OCD',
    definition:
      'Obsessive-Compulsive Disorder — a condition featuring unwanted, intrusive thoughts (obsessions) and repetitive behaviors (compulsions).',
    category: 'Mental Health',
    relatedTerms: ['Obsessions', 'Compulsions', 'Anxiety'],
  },
  {
    term: 'Insomnia',
    definition:
      'A sleep disorder characterized by persistent difficulty falling asleep, staying asleep, or getting restful sleep.',
    category: 'Mental Health',
    relatedTerms: ['Sleep Disorder', 'Fatigue', 'Stress'],
  },
  {
    term: 'Panic Disorder',
    definition:
      'An anxiety disorder marked by recurrent, unexpected panic attacks and persistent fear of future attacks.',
    category: 'Mental Health',
    relatedTerms: ['Panic Attack', 'Anxiety', 'Phobia'],
  },
  {
    term: 'Schizophrenia',
    definition:
      "A chronic mental disorder that affects a person's thinking, feeling, and behavior, often involving hallucinations or delusions.",
    category: 'Mental Health',
    relatedTerms: ['Hallucinations', 'Delusions', 'Psychosis'],
  },
  {
    term: 'Eating Disorder',
    definition:
      'A mental health condition characterized by persistent disturbances in eating behavior linked to distress about body weight or shape.',
    category: 'Mental Health',
    relatedTerms: ['Body Image', 'Anorexia', 'Bulimia'],
  },
  {
    term: 'Burnout',
    definition:
      'A state of chronic physical and emotional exhaustion caused by prolonged, unmanaged stress, often related to work.',
    category: 'Mental Health',
    relatedTerms: ['Chronic Stress', 'Exhaustion', 'Mental Fatigue'],
  },
  {
    term: 'Grief',
    definition:
      'The emotional response to loss, often involving sadness, denial, anger, and eventually acceptance over time.',
    category: 'Mental Health',
    relatedTerms: ['Loss', 'Bereavement', 'Emotional Response'],
  },
  {
    term: 'Social Anxiety Disorder',
    definition:
      'An intense, persistent fear of being watched or judged by others in social situations, leading to avoidance behavior.',
    category: 'Mental Health',
    relatedTerms: ['Anxiety', 'Social Avoidance', 'Phobia'],
  },
  {
    term: 'Epilepsy',
    definition:
      'A neurological disorder marked by recurrent, unprovoked seizures caused by abnormal electrical activity in the brain.',
    category: 'Neurological Health',
    relatedTerms: ['Seizure', 'Brain', 'Neurological Disorder'],
  },
  {
    term: 'Migraine',
    definition:
      'A neurological condition causing intense, throbbing headaches often accompanied by nausea and sensitivity to light and sound.',
    category: 'Neurological Health',
    relatedTerms: ['Headache', 'Aura', 'Nausea'],
  },
  {
    term: "Parkinson's Disease",
    definition:
      'A progressive nervous system disorder that affects movement, causing tremors, stiffness, and slowed motion.',
    category: 'Neurological Health',
    relatedTerms: ['Tremor', 'Dopamine', 'Movement Disorder'],
  },
  {
    term: "Alzheimer's Disease",
    definition:
      'A progressive brain disorder that gradually destroys memory and thinking skills, the most common cause of dementia.',
    category: 'Neurological Health',
    relatedTerms: ['Dementia', 'Memory Loss', 'Brain'],
  },
  {
    term: 'Multiple Sclerosis',
    definition:
      'An autoimmune disease in which the immune system attacks the protective covering of nerve fibers, disrupting communication between the brain and body.',
    category: 'Neurological Health',
    relatedTerms: ['Autoimmune', 'Nerve Fibers', 'Central Nervous System'],
  },
  {
    term: 'Peripheral Neuropathy',
    definition:
      'Damage to the peripheral nerves that often causes weakness, numbness, and pain, usually in the hands and feet.',
    category: 'Neurological Health',
    relatedTerms: ['Nerve Damage', 'Numbness', 'Diabetes'],
  },
  {
    term: 'Dementia',
    definition:
      'A general term for a decline in memory, reasoning, and other cognitive abilities severe enough to interfere with daily life.',
    category: 'Neurological Health',
    relatedTerms: ["Alzheimer's Disease", 'Memory Loss', 'Cognitive Decline'],
  },
  {
    term: 'Seizure',
    definition:
      'A sudden, uncontrolled burst of electrical activity in the brain that can cause changes in behavior, movement, or consciousness.',
    category: 'Neurological Health',
    relatedTerms: ['Epilepsy', 'Brain', 'Convulsions'],
  },
  {
    term: 'Concussion',
    definition:
      'A mild traumatic brain injury caused by a blow or jolt to the head that temporarily affects brain function.',
    category: 'Neurological Health',
    relatedTerms: ['Traumatic Brain Injury', 'Head Injury', 'Brain'],
  },
  {
    term: 'Vertigo',
    definition:
      'A sensation of spinning or dizziness, often caused by inner ear problems or issues within the brain.',
    category: 'Neurological Health',
    relatedTerms: ['Dizziness', 'Inner Ear', 'Balance'],
  },
];
