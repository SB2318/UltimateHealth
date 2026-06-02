export type HealthcareHero = {
  name: string;
  specialty: string;
  summary: string;
  initials: string;
  focus: string;
  notableContributions: string[];
};

export type HealthcareHeroCategory = {
  category: string;
  description: string;
  heroes: HealthcareHero[];
};

export type HealthcareTimelineEvent = {
  year: string;
  title: string;
  description: string;
  category: string;
};

export const healthcareHeroCategories: HealthcareHeroCategory[] = [
  {
    category: 'Cardiology & Surgery',
    description: 'Care models, surgical excellence, and accessible specialist treatment.',
    heroes: [
      {
        name: 'Dr. Devi Shetty',
        specialty: 'Affordable Cardiac Care',
        summary: 'Known for expanding access to lower-cost cardiac care through large-scale hospital systems.',
        initials: 'DS',
        focus: 'Access',
        notableContributions: [
          'Founded Narayana Health with a focus on making specialist care more affordable.',
          'Associated with micro-insurance and scale-based approaches to cardiac care.',
          'Recognized nationally for contributions to Indian healthcare.',
        ],
      },
      {
        name: 'Dr. Naresh Trehan',
        specialty: 'Cardiovascular Surgery',
        summary: 'A leading cardiovascular surgeon associated with advanced cardiac care institutions.',
        initials: 'NT',
        focus: 'Surgery',
        notableContributions: [
          'Founder of Medanta, a large multi-specialty healthcare institution.',
          'Helped advance cardiothoracic surgery standards in India.',
          'Recognized for long-standing work in cardiovascular medicine.',
        ],
      },
      {
        name: 'Dr. Govindappa Venkataswamy',
        specialty: 'Ophthalmology',
        summary: 'Founded Aravind Eye Care System, a landmark model for affordable eye care.',
        initials: 'GV',
        focus: 'Vision',
        notableContributions: [
          'Built a high-volume eye care model focused on avoidable blindness.',
          'Expanded access to cataract and ophthalmology services for underserved patients.',
          'Inspired global conversations around efficient, compassionate health delivery.',
        ],
      },
      {
        name: 'Dr. M. Viswanathan',
        specialty: 'Diabetology',
        summary: 'Remembered for major contributions to diabetes care and research in India.',
        initials: 'MV',
        focus: 'Diabetes',
        notableContributions: [
          'Helped establish diabetology as a focused field of clinical care in India.',
          'Contributed to diabetes research, awareness, and patient education.',
          'Supported specialized care models for chronic disease management.',
        ],
      },
      {
        name: 'Dr. K.M. Cherian',
        specialty: 'Cardiothoracic Surgery',
        summary: 'Known for pioneering contributions in cardiac and pediatric cardiac surgery.',
        initials: 'KC',
        focus: 'Innovation',
        notableContributions: [
          'Associated with landmark cardiac surgery work in India.',
          'Advanced pediatric cardiac surgery and transplant-related care.',
          'Founded healthcare institutions focused on complex cardiac treatment.',
        ],
      },
    ],
  },
  {
    category: 'Public Health & Research',
    description: 'Research, prevention, infectious disease control, and population health.',
    heroes: [
      {
        name: 'Dr. Soumya Swaminathan',
        specialty: 'Tuberculosis & Public Health',
        summary: 'A public health researcher and former WHO Chief Scientist with major work in TB and global health.',
        initials: 'SS',
        focus: 'Research',
        notableContributions: [
          'Served in senior scientific leadership roles at WHO and ICMR.',
          'Contributed to tuberculosis, HIV, and public health research.',
          'Helped communicate evidence-based guidance during major health emergencies.',
        ],
      },
      {
        name: 'Dr. Gagandeep Kang',
        specialty: 'Vaccine Research',
        summary: 'An infectious disease researcher known for vaccine, enteric infection, and child health work.',
        initials: 'GK',
        focus: 'Vaccines',
        notableContributions: [
          'Contributed to rotavirus and enteric disease research in India.',
          'Built research capacity around surveillance, vaccines, and child health.',
          'Recognized internationally for scientific leadership.',
        ],
      },
      {
        name: 'Dr. Indira Hinduja',
        specialty: 'Gynecology & Obstetrics',
        summary: 'A reproductive medicine specialist associated with IVF and fertility advances in India.',
        initials: 'IH',
        focus: 'Fertility',
        notableContributions: [
          'Associated with early IVF and assisted reproduction milestones in India.',
          'Advanced fertility care through clinical practice and innovation.',
          'Recognized for contributions to reproductive medicine.',
        ],
      },
      {
        name: 'Dr. V. Shanta',
        specialty: 'Oncology',
        summary: 'Dedicated her career to accessible cancer care, research, and prevention.',
        initials: 'VS',
        focus: 'Cancer Care',
        notableContributions: [
          'Led work at the Cancer Institute, Adyar, for decades.',
          'Championed affordable cancer treatment and early detection.',
          'Recognized with major national honors for public service in medicine.',
        ],
      },
      {
        name: 'Dr. Randeep Guleria',
        specialty: 'Pulmonology',
        summary: 'A leading pulmonologist known for clinical leadership and public health communication.',
        initials: 'RG',
        focus: 'Respiratory',
        notableContributions: [
          'Former Director of AIIMS, New Delhi.',
          'Known for pulmonary medicine and sleep disorder work.',
          'A prominent clinical voice during the COVID-19 response in India.',
        ],
      },
    ],
  },
  {
    category: 'Rural Healthcare & Social Impact',
    description: 'Community health, sanitation, and care delivery outside major urban centers.',
    heroes: [
      {
        name: 'Dr. Abhay Bang & Dr. Rani Bang',
        specialty: 'Rural Healthcare',
        summary: 'Physician-researchers whose community health work in Gadchiroli influenced rural care models.',
        initials: 'AB',
        focus: 'Rural Care',
        notableContributions: [
          'Founded SEARCH in Gadchiroli to serve rural and tribal communities.',
          'Developed community-based maternal and child health interventions.',
          'Influenced rural neonatal care and public health policy conversations.',
        ],
      },
      {
        name: 'Dr. Bindeshwar Pathak',
        specialty: 'Public Sanitation Impact',
        summary: 'A social reformer whose sanitation work improved dignity, hygiene, and public health.',
        initials: 'BP',
        focus: 'Sanitation',
        notableContributions: [
          'Founded Sulabh International to improve sanitation access.',
          'Worked on ecological sanitation and the rehabilitation of manual scavengers.',
          'Connected sanitation, dignity, and public health at national scale.',
        ],
      },
      {
        name: 'Dr. Prathap C. Reddy',
        specialty: 'Healthcare Infrastructure',
        summary: 'Founder of Apollo Hospitals and a major figure in private healthcare infrastructure in India.',
        initials: 'PR',
        focus: 'Systems',
        notableContributions: [
          'Built hospital systems that expanded access to tertiary care in India.',
          'Popularized preventive health checks and specialist care networks.',
          'Recognized nationally for healthcare institution building.',
        ],
      },
    ],
  },
  {
    category: 'Mental Health & Awareness',
    description: 'Reducing stigma and making mental health support more reachable.',
    heroes: [
      {
        name: 'Dr. Vikram Patel',
        specialty: 'Mental Health',
        summary: 'A global mental health researcher focused on care access in low-resource settings.',
        initials: 'VP',
        focus: 'Access',
        notableContributions: [
          'Co-founded Sangath, a mental health research and care organization.',
          'Promoted scalable mental health support through community-based care.',
          'Helped bring mental health into wider public health conversations.',
        ],
      },
      {
        name: 'Dr. Nand Kumar',
        specialty: 'Psychiatry',
        summary: 'A psychiatrist and educator associated with mental health awareness and clinical innovation.',
        initials: 'NK',
        focus: 'Awareness',
        notableContributions: [
          'Works in psychiatry education and clinical care.',
          'Associated with modern treatments and public mental health advocacy.',
          'Supports destigmatization of mental illness and patient-centered care.',
        ],
      },
    ],
  },
  {
    category: 'Medical Education & Innovation',
    description: 'Training, discovery, interdisciplinary science, and public awareness.',
    heroes: [
      {
        name: 'Dr. Balamurali Ambati',
        specialty: 'Ophthalmology & Education',
        summary: 'An ophthalmologist and medical innovator recognized for early academic achievement.',
        initials: 'BA',
        focus: 'Education',
        notableContributions: [
          'Known globally for becoming a physician at an unusually young age.',
          'Contributed to ophthalmology research and corneal care.',
          'Represents the role of education, curiosity, and persistence in medicine.',
        ],
      },
      {
        name: 'Dr. Suniti Solomon',
        specialty: 'Microbiology & HIV Research',
        summary: 'A microbiologist who helped identify and respond to HIV in India.',
        initials: 'SS',
        focus: 'HIV Care',
        notableContributions: [
          'Associated with the first documented HIV cases in India.',
          'Founded YRG CARE for HIV research, education, and support.',
          'Worked to reduce stigma around HIV/AIDS through counseling and awareness.',
        ],
      },
    ],
  },
  {
    category: 'Healthcare Worker Safety & Awareness',
    description: 'Dignity, safety, and protection for people delivering care.',
    heroes: [
      {
        name: 'Dr. Moumita Debnath',
        specialty: 'Healthcare Safety Awareness',
        summary: 'Remembered in public discourse around the dignity and safety of healthcare workers.',
        initials: 'MD',
        focus: 'Safety',
        notableContributions: [
          'Her story drew attention to the vulnerable conditions faced by healthcare workers.',
          'Symbolizes the urgent need for safer medical workplaces.',
          'Represents respect, dignity, and protection for people serving patients.',
        ],
      },
    ],
  },
];

export const healthcareTimeline: HealthcareTimelineEvent[] = [
  {
    year: '1950s',
    title: 'Specialist Care Expands',
    description: 'Indian clinicians and institutions begin building focused care in areas such as ophthalmology, diabetes, and cardiac treatment.',
    category: 'Foundation',
  },
  {
    year: '1970s',
    title: 'Surgical and Reproductive Milestones',
    description: 'Cardiac surgery and assisted reproduction become visible areas of clinical innovation in India.',
    category: 'Innovation',
  },
  {
    year: '1980s',
    title: 'Public Health Awareness Deepens',
    description: 'HIV research, cancer care, fertility care, and rural health programs bring prevention and awareness into sharper focus.',
    category: 'Awareness',
  },
  {
    year: '1990s',
    title: 'Rural and Community Models Grow',
    description: 'Community-based approaches show how health outcomes can improve beyond large city hospitals.',
    category: 'Rural Health',
  },
  {
    year: '2000s',
    title: 'Access and Scale Become Central',
    description: 'Hospital networks, sanitation programs, and research collaborations reshape how India thinks about healthcare reach.',
    category: 'Access',
  },
  {
    year: '2020s',
    title: 'Safety, Prevention, and Digital Health',
    description: 'Healthcare worker safety, preventive care, mental health, and digital tools become central to the next wave of reform.',
    category: 'Future',
  },
];

export const healthcareQuotes = [
  {
    quote: 'Healthcare is not only about treatment, but dignity, accessibility, and humanity.',
    author: 'UltimateHealth',
  },
  {
    quote: 'The good physician treats the disease; the great physician treats the patient who has the disease.',
    author: 'William Osler',
  },
  {
    quote: 'Wherever the art of medicine is loved, there is also a love of humanity.',
    author: 'Hippocrates',
  },
];

export const futureHealthcareFocus = [
  'AI-assisted care that supports clinicians instead of replacing judgment.',
  'Preventive healthcare that helps people act before illness becomes severe.',
  'Rural access through community programs, telehealth, and local language education.',
  'Open healthcare knowledge that students and contributors can improve responsibly.',
  'Mental health awareness that treats dignity as part of care.',
  'Safer workplaces for doctors, nurses, trainees, and support staff.',
];
