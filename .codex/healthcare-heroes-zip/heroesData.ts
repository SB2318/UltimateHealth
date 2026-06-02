export interface Hero {
  name: string;
  specialty: string;
  summary: string;
  image: string;
  notable_contributions: string[];
}

export interface HeroCategory {
  category: string;
  heroes: Hero[];
}

export const heroesData: HeroCategory[] = [
  {
    category: "Cardiology & Surgery",
    heroes: [
      {
        name: "Dr. Devi Shetty",
        specialty: "Affordable Cardiac Care",
        summary: "Revolutionized low-cost heart surgeries and healthcare accessibility.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Founder of Narayana Health, creating economies of scale for affordable healthcare.",
          "Conceptualized the 'Yeshasvini' micro-health insurance scheme, providing coverage for millions of farmers.",
          "Pioneered low-cost cardiac surgery, making complex procedures affordable for the masses.",
          "Recipient of the Padma Shri and Padma Bhushan awards.",
        ],
      },
      {
        name: "Dr. Naresh Trehan",
        specialty: "Cardiovascular Surgery",
        summary: "Pioneered advanced cardiovascular surgeries and founded leading healthcare institutions.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Founder and Chairman of Medanta – The Medicity, one of India's largest hospitals.",
          "Performed over 48,000 successful open-heart surgeries.",
          "Played a key role in advancing cardiothoracic surgery standards in India.",
          "Awarded the Padma Shri, Padma Bhushan, and Dr. B.C. Roy Award.",
        ],
      },
      {
        name: "Dr. Govindappa Venkataswamy",
        specialty: "Ophthalmology",
        summary: "Founded Aravind Eye Hospitals, performing millions of affordable eye surgeries.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Founded the Aravind Eye Care System to eradicate needless blindness.",
          "Introduced the assembly line efficiency model to cataract surgeries, reducing costs.",
          "Enabled millions of free eye surgeries for the poor while remaining financially self-sustaining.",
          "Awarded the Padma Shri and recognized by the World Health Organization.",
        ],
      },
      {
        name: "Dr. M. Viswanathan",
        specialty: "Diabetology",
        summary: "Known as the father of diabetology in India, dedicated to diabetes research and care.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Established the first specialized diabetes clinic in India (M.V. Hospital for Diabetes).",
          "Pioneered extensive research on the epidemiology of diabetes in the Indian population.",
          "Founded the Diabetic Association of India (Southern Branch) to spread awareness.",
          "Authored landmark medical research on tropical diabetes.",
        ],
      },
      {
        name: "Dr. K.M. Cherian",
        specialty: "Cardiothoracic Surgery",
        summary: "Pioneered pediatric cardiac surgery and India's first successful coronary artery bypass.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Performed India's first successful coronary artery bypass surgery (1975).",
          "Conducted the first heart transplant in India.",
          "Pioneered pediatric cardiac surgery and the first bilateral lung transplant.",
          "Founder of Frontier Lifeline Hospital and recipient of the Padma Shri.",
        ],
      },
    ],
  },
  {
    category: "Public Health & Research",
    heroes: [
      {
        name: "Dr. Soumya Swaminathan",
        specialty: "Tuberculosis & Public Health",
        summary: "Former Chief Scientist at the WHO, renowned for tuberculosis research and global health.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Served as the Chief Scientist at the World Health Organization (WHO).",
          "Former Director General of the Indian Council of Medical Research (ICMR).",
          "Conducted extensive clinical research on tuberculosis and HIV.",
          "Key scientific voice in India's response to the COVID-19 pandemic.",
        ],
      },
      {
        name: "Dr. Gagandeep Kang",
        specialty: "Vaccine Research",
        summary: "Internationally recognized for infectious disease research and rotavirus vaccine development.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Played a critical role in the development of the Rotavac vaccine, saving millions of children.",
          "First Indian woman elected as a Fellow of the Royal Society (FRS).",
          "Led extensive research in enteric infections, nutrition, and public health.",
          "Instrumental in building national rotavirus and typhoid surveillance networks.",
        ],
      },
      {
        name: "Dr. Indira Hinduja",
        specialty: "Gynecology & Obstetrics",
        summary: "Pioneered the GIFT technique and delivered India's first test-tube baby.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Delivered India's first test-tube baby (Harsha Chawda) in 1986.",
          "Pioneered the Gamete intrafallopian transfer (GIFT) technique.",
          "Developed the oocyte donation technique for premature ovarian failure.",
          "Recipient of the Padma Shri and the Dhanvantari Award.",
        ],
      },
      {
        name: "Dr. V. Shanta",
        specialty: "Oncology",
        summary: "Dedicated her life to affordable cancer care and research at the Adyar Cancer Institute.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Chairperson of the Adyar Cancer Institute, revolutionizing cancer treatment in India.",
          "Championed early detection and accessible cancer care for all socio-economic classes.",
          "Led extensive research in pediatric oncology and cervical cancer.",
          "Recipient of the Ramon Magsaysay Award, Padma Shri, Padma Bhushan, and Padma Vibhushan.",
        ],
      },
      {
        name: "Dr. Randeep Guleria",
        specialty: "Pulmonology",
        summary: "Leading pulmonologist instrumental in India's response to the COVID-19 pandemic.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Established the first center for pulmonary medicine and sleep disorders at AIIMS.",
          "Former Director of AIIMS, New Delhi.",
          "A crucial architect of India's clinical and public health strategies during COVID-19.",
          "Recipient of the Padma Shri and the Dr. B.C. Roy Award.",
        ],
      },
    ],
  },
  {
    category: "Rural Healthcare & Social Impact",
    heroes: [
      {
        name: "Dr. Abhay Bang & Dr. Rani Bang",
        specialty: "Rural Healthcare",
        summary: "Improved maternal and child healthcare in underserved rural communities of Gadchiroli.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Founded SEARCH (Society for Education, Action and Research in Community Health) in Gadchiroli.",
          "Developed the Home-Based Neonatal Care (HBNC) model, drastically reducing infant mortality.",
          "Their HBNC model was adopted by WHO and UNICEF for global rollout.",
          "Conducted seminal research on rural health, sickle cell disease, and tribal health.",
        ],
      },
      {
        name: "Dr. Bindeshwar Pathak",
        specialty: "Public Sanitation Impact",
        summary: "Social reformer who revolutionized public sanitation through Sulabh International.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Founded Sulabh International, promoting sanitation, human rights, and waste management.",
          "Invented the two-pit pour-flush ecological compost toilet for millions.",
          "Led a nationwide movement to eradicate manual scavenging and rehabilitate scavengers.",
          "Awarded the Padma Bhushan and the Stockholm Water Prize.",
        ],
      },
      {
        name: "Dr. Prathap C. Reddy",
        specialty: "Healthcare Infrastructure",
        summary: "Architect of modern Indian healthcare, making advanced medical care accessible.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Founded Apollo Hospitals, India's first corporate hospital chain.",
          "Brought advanced medical technologies to India, reversing the brain drain of doctors.",
          "Pioneered the concept of preventive health checks in the country.",
          "Honored with the Padma Vibhushan for his transformative impact.",
        ],
      },
    ],
  },
  {
    category: "Mental Health & Awareness",
    heroes: [
      {
        name: "Dr. Vikram Patel",
        specialty: "Mental Health",
        summary: "Global mental health expert focused on accessible care in low-resource settings.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Co-founder of Sangath, a pioneering NGO for mental health in India.",
          "Developed scalable interventions using lay counselors to deliver community mental health care.",
          "Author of 'Where There Is No Psychiatrist', a widely used manual.",
          "Recognized in TIME Magazine's 100 most influential people.",
        ],
      },
      {
        name: "Dr. Nand Kumar",
        specialty: "Psychiatry",
        summary: "Prominent psychiatrist advocating for mental health awareness and destigmatization.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Professor of Psychiatry at AIIMS, driving modern psychiatric treatments in India.",
          "Pioneered the use of Transcranial Magnetic Stimulation (TMS) in India.",
          "Active advocate for integrating mental health into public health policy.",
          "Led initiatives to destigmatize mental illness and promote cognitive rehabilitation.",
        ],
      },
    ],
  },
  {
    category: "Medical Education & Innovation",
    heroes: [
      {
        name: "Dr. Balamurali Ambati",
        specialty: "Ophthalmology & Education",
        summary: "Recognized as the world's youngest doctor, contributing to medical innovation.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Entered the Guinness Book of World Records as the world's youngest doctor, graduating at 17.",
          "Conducted highly impactful research in angiogenesis and corneal transplants.",
          "Developed a novel approach to slowing the progression of corneal blindness.",
          "Active in humanitarian medical work, performing free eye surgeries worldwide.",
        ],
      },
      {
        name: "Dr. Suniti Solomon",
        specialty: "Microbiology & HIV Research",
        summary: "Diagnosed the first cases of HIV in India and pioneered AIDS research and awareness.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Documented the first evidence of HIV infection in India in 1986.",
          "Founded the Y. R. Gaitonde Centre for AIDS Research and Education (YRG CARE).",
          "Pioneered HIV/AIDS education, destigmatization, and counseling.",
          "Awarded the Padma Shri posthumously for groundbreaking public health work.",
        ],
      },
    ],
  },
  {
    category: "Healthcare Worker Safety & Awareness",
    heroes: [
      {
        name: "Dr. Moumita Debnath",
        specialty: "Healthcare Safety Awareness & Pulmonology",
        summary:
          "Dedicated postgraduate trainee whose tragic legacy catalyzed nationwide discussions on the safety of healthcare professionals.",
        image: "/assets/placeholder-hero.jpg",
        notable_contributions: [
          "Overcame significant financial hardships to secure a highly competitive medical seat.",
          "Chose to specialize in respiratory medicine after witnessing COVID-19 patients' struggles.",
          "Remembered by colleagues as a deeply dedicated doctor committed to her patients.",
          "Her legacy became the catalyst for urgent demands for healthcare worker safety.",
          "Inspired widespread awareness about the vulnerable working conditions of junior doctors.",
          "Symbolizes the ultimate sacrifice and ongoing struggle for a safe, dignified medical workplace.",
        ],
      },
    ],
  },
];

export const timelineEvents = [
  { year: "1953", event: "Dr. Govindappa Venkataswamy founds Aravind Eye Care in Madurai", category: "Surgery" },
  { year: "1975", event: "Dr. K.M. Cherian performs India's first coronary artery bypass surgery", category: "Surgery" },
  { year: "1978", event: "Dr. Subhash Mukhopadhyay creates India's first IVF baby", category: "Research" },
  { year: "1986", event: "Dr. Indira Hinduja delivers India's first test-tube baby", category: "Research" },
  { year: "1986", event: "Dr. Suniti Solomon documents India's first HIV cases", category: "Public Health" },
  { year: "1989", event: "Dr. Abhay & Rani Bang found SEARCH, transforming rural neonatal care", category: "Rural" },
  { year: "1983", event: "Narayana Health begins transforming cardiac surgery affordability", category: "Infrastructure" },
  { year: "2001", event: "Sulabh International completes 1 million sanitation installations across India", category: "Sanitation" },
  { year: "2008", event: "Dr. Gagandeep Kang leads the Rotavac vaccine clinical trials", category: "Vaccine" },
  { year: "2016", event: "Dr. Vikram Patel named in TIME's 100 most influential people", category: "Mental Health" },
  { year: "2020", event: "Dr. Randeep Guleria guides India's COVID-19 clinical response", category: "Public Health" },
];

export const inspirationalQuotes = [
  {
    quote: "Healthcare is not only about treatment, but dignity, accessibility, and humanity.",
    author: "UltimateHealth",
  },
  {
    quote: "The best doctor gives the least medicines.",
    author: "Benjamin Franklin",
  },
  {
    quote: "Wherever the art of medicine is loved, there is also a love of humanity.",
    author: "Hippocrates",
  },
  {
    quote: "Medicine is not only a science; it is also an art.",
    author: "Paracelsus",
  },
  {
    quote: "The good physician treats the disease; the great physician treats the patient who has the disease.",
    author: "William Osler",
  },
];
