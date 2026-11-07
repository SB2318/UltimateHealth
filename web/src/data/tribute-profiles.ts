import { TributeCategory, TributeProfile, SocietalLesson, MemorialPublication, SurvivorVoice, Changemaker } from "@/types/tribute";

export const TRIBUTE_CATEGORIES: { id: TributeCategory; label: string; count: number; description: string }[] = [
  {
    id: "all",
    label: "All 30 Lives",
    count: 30,
    description: "An international tribute celebrating 30 individuals for their contributions, courage, and lost possibilities.",
  },
  {
    id: "healthcare",
    label: "Healthcare Professionals",
    count: 5,
    description: "Doctors and nurses who dedicated their lives to healing others and whose stories demand institutional safety and dignity.",
  },
  {
    id: "safety-and-justice",
    label: "Safety & Justice",
    count: 5,
    description: "Women whose lives sparked worldwide conversations on personal security, legal reform, and institutional accountability.",
  },
  {
    id: "journalism",
    label: "Truth & Journalism",
    count: 5,
    description: "Courageous reporters and publishers who defended democratic accountability, public information, and human stories.",
  },
  {
    id: "environmental-defenders",
    label: "Defenders of Earth & Community",
    count: 8,
    description: "Grassroots advocates who stood for indigenous land rights, clean water basins, rural labor, and our living planet.",
  },
  {
    id: "education-and-dignity",
    label: "Education, Resistance & Dignity",
    count: 5,
    description: "Young thinkers and humanitarians who stood up for freedom of thought, universal child protection, and moral courage.",
  },
  {
    id: "survivors",
    label: "Survivors of Resilience",
    count: 2,
    description: "Remarkable leaders who survived devastating violence and transformed their lived experience into global humanitarian movements.",
  },
];

export const TRIBUTE_PROFILES: TributeProfile[] = [
  // ── 1. Healthcare Professionals ──
  {
    id: 1,
    slug: "dr-moumita-debnath",
    name: "Dr. Moumita Debnath",
    country: "India",
    countryFlag: "🇮🇳",
    category: "healthcare",
    categoryLabel: "Healthcare & Patient Dignity",
    eraOrYear: "2024",
    roleAndField: "Postgraduate Resident Doctor · Pulmonary & Chest Medicine",
    avatarUrl: "https://images.openai.com/static-rsc-4/ERFLGiok6oasJHEMp3Yp6o2VKqafsUj-FPQeEYQVBikv-WsOwE5pXE1bqNI-Fby_VmCS1XVDvEn5a1eEekUaerVa1EbGz6xCVfRcsQzaWS2tFSFoLV4bcUYetNcVkenLUbjb87nn3XEwl6ctIPIKzEBKwhlZu-B7ll228b_kQ_I?purpose=inline",
    whoWasThisPerson:
      "A 31-year-old postgraduate medical trainee in her second year of residency in Chest Medicine at RG Kar Medical College and Hospital, Kolkata. Dedicated to clinical pulmonology, she managed demanding shifts in public respiratory wards while preparing for a lifelong career in medical practice. Her story reminds society that healthcare trainees deserve a safe and dignified environment to pursue their vocation.",
    contributions:
      "She served frontline clinical duties caring for patients with acute and chronic respiratory illnesses in public hospital wards. UltimateHealth honours her memory through dedicated respiratory education, clinical guidance, and awareness of workplace safety for all healthcare professionals.",
    factualContext:
      "On 9 August 2024, after completing an arduous 36-hour clinical shift at RG Kar Medical College and Hospital, she was attacked and murdered in the hospital seminar room while resting. The Central Bureau of Investigation (CBI) took over the criminal investigation under court order. The Supreme Court of India initiated suo motu proceedings (SMW (Crl) No. 2/2024) and established a 10-member National Task Force to formulate a national safety protocol for healthcare personnel.",
    societalImpact:
      "Her loss galvanized unprecedented nationwide strikes by resident doctors and medical associations across India, demanding institutional workplace protection. The Supreme Court initiated suo motu proceedings and constituted a National Task Force — a landmark step toward mandatory occupational safety standards in public hospitals.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "31-year-old 2nd-year postgraduate trainee in Chest Medicine at RG Kar Medical College, Kolkata",
      "Fatally assaulted inside hospital seminar room on 9 August 2024 following a continuous 36-hour clinical shift",
      "Supreme Court of India initiated suo motu proceedings (SMW (Crl) No. 2/2024) in August 2024",
      "Supreme Court constituted a 10-member National Task Force to establish national hospital security guidelines",
    ],
    editorialNotes:
      "Under Supreme Court orders pursuant to Section 73 BNS / Section 228A IPC, publishing the victim's legal identity or photographs without family consent is prohibited. Commemorated publicly as Dr. Moumita Debnath.",
    actionableLesson:
      "Healthcare institutions and teaching hospitals must guarantee fundamental workplace security: dedicated secure duty rooms, 24/7 security personnel, monitored corridors, and rapid-response emergency panic systems.",
    coreMessage:
      "Hospitals must protect the people who dedicate their lives to protecting others. A doctor's workplace should never be a place of vulnerability.",
    memorialPublication: {
      title: "The 30-Part Clinical Respiratory & Patient Dignity Series",
      focus: "Pulmonary Medicine & Healthcare Worker Safeguards",
      deliverable: "An open-source curriculum of 30 clinical guides in chest medicine and a model hospital workplace safety charter translated into 9 languages.",
    },
    references: [
      { title: "Supreme Court of India Suo Motu Writ Petition (Crl) No. 2/2024 — National Task Force Orders (20 Aug 2024)", url: "https://main.sci.gov.in/supremecourt/2024/37466/37466_2024_1_1_54652_Order_20-Aug-2024.pdf", publisher: "Supreme Court of India", isPrimary: true },
      { title: "National Task Force on Healthcare Workers' Safety — Terms of Reference", url: "https://main.sci.gov.in", publisher: "Ministry of Health and Family Welfare, India" },
      { title: "The Indian Express: RG Kar Hospital Case Timeline", url: "https://indianexpress.com/article/cities/kolkata/kolkata-doctor-rape-murder-case-timeline-rg-kar-hospital-9520979/", publisher: "The Indian Express" },
    ],
  },
  {
    id: 2,
    slug: "aruna-shanbaug",
    name: "Aruna Shanbaug",
    country: "India",
    countryFlag: "🇮🇳",
    category: "healthcare",
    categoryLabel: "Healthcare Ethics & Nursing Dignity",
    eraOrYear: "1948–2015",
    roleAndField: "Staff Nurse · King Edward Memorial (KEM) Hospital, Mumbai",
    avatarUrl: "https://images.openai.com/static-rsc-4/bEkHZq8tlmEVDlWf0AtrWa1IJz9nUsL0PLkkx0mJNud9itRRtfKkb-8Q9gTdVOgYSchOJ3_i21FGiPD0IAC6A4n1k-MAgBWK4FmRStyYyayReuSD0k9pr8_V7YanoRqVnK03NHQ7FCA90lUQNm9A4WJX7xvrUfNSXE12PGEypFg?purpose=inline",
    whoWasThisPerson:
      "Born on 1 June 1948 in Haldipur, Karnataka, she was a dedicated staff nurse at King Edward Memorial (KEM) Hospital in Mumbai. Admired by colleagues for her professional commitment and compassionate bedside care, she was engaged to be married at the time of the attack.",
    contributions:
      "She dedicated her career to frontline public healthcare as a staff nurse at KEM Hospital, providing compassionate care to neurosurgical and critical patients. Her life and the extraordinary four-decade dedication of her nursing peers transformed Indian legal history, establishing enduring standards for nursing dignity, patient autonomy, and compassionate end-of-life care.",
    factualContext:
      "On 27 November 1973, while on duty in the basement surgery department of KEM Hospital, she was brutally assaulted by a hospital contract worker, suffering severe cerebral hypoxia that left her in a persistent vegetative state (PVS). For nearly 42 years, she was cared for with extraordinary devotion by generations of KEM Hospital nurses and doctors in Ward 4, until her passing from pneumonia on 18 May 2015 at age 66.",
    societalImpact:
      "Her case produced the landmark 2011 Supreme Court of India ruling (Aruna Ramchandra Shanbaug v. Union of India, (2011) 4 SCC 454) that legally recognised a procedure for passive euthanasia under strict safeguards — though the bench denied withdrawal of Aruna's own treatment as the KEM nurses wished to continue caring for her. The separate legal recognition of living wills and advance medical directives came later, in Common Cause v. Union of India (2018) 5 SCC 1.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "Born 1 June 1948 in Haldipur, Karnataka; Staff Nurse at KEM Hospital, Mumbai",
      "Assaulted on night duty on 27 November 1973, suffering severe cerebral hypoxia",
      "Remained in a persistent vegetative state for nearly 42 years under the dedicated care of KEM nursing staff",
      "Passed away on 18 May 2015 at age 66 from severe pneumonia",
      "Case was the subject of the landmark 2011 Supreme Court passive euthanasia decision (4 SCC 454)",
    ],
    actionableLesson:
      "Long-term and acute healthcare facilities must implement proactive staff safety measures, eliminating isolated blind spots and ensuring continuous security across all operational corridors.",
    coreMessage:
      "Healthcare workers deserve unconditional workplace security, and long-term palliative care must preserve human dignity at every stage of life.",
    memorialPublication: {
      title: "Long-Term Palliative Care & Patient Dignity Protocol",
      focus: "Medical Ethics & End-of-Life Palliative Care",
      deliverable: "Clinical protocol for respectful long-term vegetative patient management and healthcare worker night-shift surveillance standards.",
    },
    references: [
      { title: "Aruna Ramchandra Shanbaug v. Union of India (2011) 4 SCC 454", url: "https://indiankanoon.org/doc/1359740/", publisher: "Supreme Court of India", isPrimary: true },
      { title: "Common Cause v. Union of India (2018) 5 SCC 1 — Living Wills and Advance Directives", url: "https://indiankanoon.org/doc/184449972/", publisher: "Supreme Court of India", isPrimary: true },
      { title: "BBC News: Aruna Shanbaug — The Story of a Brain-Damaged Indian Nurse", url: "https://www.bbc.com/news/world-asia-india-32776897", publisher: "BBC News" },
    ],
  },
  {
    id: 3,
    slug: "dr-sarita-toshniwal",
    name: "Dr. Sarita Toshniwal",
    country: "India",
    countryFlag: "🇮🇳",
    category: "healthcare",
    categoryLabel: "Healthcare & Medical Trainee Safety",
    eraOrYear: "1988–2014",
    roleAndField: "Postgraduate Resident Doctor · Obstetrics & Gynaecology, Assam Medical College",
    avatarUrl: "/assets/dr-sarita-toshniwal.jpeg",
    whoWasThisPerson:
      "A 26-year-old first-year postgraduate resident in the Department of Obstetrics and Gynaecology at Assam Medical College and Hospital (AMCH), Dibrugarh. She was preparing to serve maternal and child healthcare needs in regional communities across Northeast India.",
    contributions:
      "She served demanding overnight obstetrics and gynaecology shifts, attending to emergency deliveries, labor room admissions, and high-risk maternal care at AMCH.",
    factualContext:
      "On the morning of 9 May 2014, while resting in the doctors' duty room after an overnight obstetrics shift, she was attacked and murdered by a hospital ward boy. In May 2023 — after a nine-year trial — the Dibrugarh District and Sessions Court convicted ward boy Kiru Mech and sentenced him to life imprisonment. Co-accused Dr. Deepmoni Saikia was acquitted due to lack of evidence.",
    societalImpact:
      "Her murder triggered widespread protests by junior doctors across Assam and the Northeast, sparking statewide strikes and demands for mandatory access controls and institutional security in government medical colleges.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "26-year-old first-year postgraduate resident in Obstetrics & Gynaecology at AMCH Dibrugarh",
      "Attacked and murdered in the doctors' duty room on 9 May 2014 after completing overnight hospital duty",
      "Dibrugarh District & Sessions Court convicted ward boy Kiru Mech to life imprisonment in May 2023",
      "Co-accused Dr. Deepmoni Saikia acquitted by the trial court due to absence of evidence",
    ],
    actionableLesson:
      "Healthcare rest areas and physician duty rooms must have strictly controlled secure access, direct communication links, and safe escort protocols for overnight shifts.",
    coreMessage:
      "Security arrangements must extend beyond public hospital lobbies into duty rooms, ICUs, and on-call residential quarters.",
    memorialPublication: {
      title: "Hospital Duty Room & Night-Shift Physical Security Standards",
      focus: "Clinical Architecture & Access Control",
      deliverable: "An actionable audit checklist for healthcare administrators and hospital leadership to evaluate resident doctor security and resting facility standards.",
    },
    references: [
      { title: "Dibrugarh District & Sessions Court — AMCH Doctor Murder Verdict (May 2023)", url: "https://districts.ecourts.gov.in/dibrugarh", publisher: "District Judiciary of Assam", isPrimary: true },
      { title: "Times of India: AMCH Doctor Murder Case — Ward Boy Gets Life Term, Doctor Acquitted", url: "https://timesofindia.indiatimes.com/city/guwahati/amch-doctor-murder-case-ward-boy-gets-life-term/articleshow/100418654.cms", publisher: "Times of India" },
      { title: "The Sentinel Assam: Dr. Sarita Toshniwal Murder Case Judgment", url: "https://www.sentinelassam.com", publisher: "The Sentinel Assam" },
    ],
  },
  {
    id: 4,
    slug: "dr-vandana-das",
    name: "Dr. Vandana Das",
    country: "India",
    countryFlag: "🇮🇳",
    category: "healthcare",
    categoryLabel: "Emergency Medicine & Clinical Protection",
    eraOrYear: "1999–2023",
    roleAndField: "House Surgeon / Medical Intern · Kottarakkara Taluk Hospital, Kerala",
    avatarUrl: "https://images.openai.com/static-rsc-4/WmEpQw-lqYO47-p4A7eQQMIWYeFkI4LlmCI17Np-wNnRtq2KyU3UISZoLOnbFm3z8LbgP6EVgVoahv3rvrfUIA1tD5GS9PuiV70pD4N2IxrSAaSc1tEMBfXqPNph8goJVT2Y_KKjjY25HIUsKoBgKybSwqmGd47-XhFbWEulCaM?purpose=inline",
    whoWasThisPerson:
      "A 23-year-old house surgeon (medical intern) from Kerala who had completed her medical education and was fulfilling her frontline clinical internship in government emergency casualty care.",
    contributions:
      "She served frontline casualty rotations caring for emergency patients. Following her passing, a memorial clinic was established to provide compassionate medical care to underserved communities, sustaining her professional aspirations.",
    factualContext:
      "In May 2023, while dressing the wounds of an individual brought to the casualty department under police escort for medical evaluation, the patient turned violent using medical instruments, inflicting fatal injuries on Dr. Das and injuring hospital personnel.",
    societalImpact:
      "Her death sparked grief and outrage across the medical community, prompting the state government to promulgate the Kerala Healthcare Service Persons and Healthcare Service Institutions (Prevention of Violence and Damage to Property) Amendment Ordinance (subsequently enacted as Kerala Act 22 of 2023), imposing stringent prison terms of up to seven years for violence against healthcare workers.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "23-year-old medical intern (house surgeon) on a rotating casualty internship in Kerala",
      "Fatally attacked on 10 May 2023 at Kottarakkara Taluk Hospital using surgical dressing scissors",
      "Perpetrator was a patient brought under police custody for wound dressing treatment",
      "Kerala Government passed the Kerala Healthcare Service Persons Amendment Ordinance / Act 22 of 2023",
    ],
    actionableLesson:
      "Patients brought in under custody or in states of acute intoxication/psychosis must undergo mandatory weapon screening and physical restraint protocols before clinical staff enter examination bays.",
    coreMessage:
      "Emergency medical teams need robust institutional triage security. No doctor should ever face physical assault while rendering compassionate care.",
    memorialPublication: {
      title: "Emergency Casualty De-escalation & Restraint Protocol",
      focus: "Emergency Medicine Safety & Police Escort Standards",
      deliverable: "A standard operating procedure (SOP) for triage units handling intoxicated or belligerent patients in secondary healthcare centers.",
    },
    references: [
      { title: "Kerala Healthcare Service Persons and Healthcare Service Institutions (Amendment) Act, 2023 (Act 22 of 2023)", url: "https://prsindia.org/files/bills_acts/acts_states/kerala/2023/Act%2022%20of%202023%20Kerala.pdf", publisher: "Government of Kerala", isPrimary: true },
      { title: "The Hindu: Kerala Cabinet Approves Ordinance Amending Hospital Protection Act (May 2023)", url: "https://www.thehindu.com/news/national/kerala/kerala-cabinet-approves-ordinance-amending-hospital-protection-act/article66858908.ece", publisher: "The Hindu" },
    ],
  },
  {
    id: 5,
    slug: "dr-tamara-oneal",
    name: "Dr. Tamara O'Neal",
    country: "United States",
    countryFlag: "🇺🇸",
    category: "healthcare",
    categoryLabel: "Emergency Medicine & Workplace Defense",
    eraOrYear: "1980–2018",
    roleAndField: "Attending Emergency Medicine Physician · Mercy Hospital & Medical Center, Chicago",
    avatarUrl: "/assets/dr-tamara-oneal.jpeg",
    whoWasThisPerson:
      "A 38-year-old emergency room physician in Chicago. Dedicated to urban casualty and acute care, she also served as a church choir leader and volunteer mentor for aspiring medical students.",
    contributions:
      "She served as an attending emergency physician treating acute medical emergencies in Chicago, volunteered to teach clinical residents, and raised funds for disadvantaged youth. A memorial scholarship was established in her memory to support future physicians.",
    factualContext:
      "On 19 November 2018, she was fatally shot in the Mercy Hospital parking lot by her former fiancé following a domestic dispute. The gunman then entered the hospital, also killing pharmacy resident Dayna Less and Chicago Police Officer Samuel Jimenez, before being wounded and dying by suicide.",
    societalImpact:
      "Her death prompted national medical organizations — including the American College of Emergency Physicians (ACEP) and the Emergency Nurses Association (ENA) — to demand comprehensive institutional protections against interpersonal violence and enhanced security screening across healthcare campuses.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "38-year-old attending emergency physician at Mercy Hospital, Chicago, killed on 19 November 2018",
      "Perpetrator was her former fiancé; also killed pharmacy resident Dayna Less and CPD Officer Samuel Jimenez",
      "ACEP issued an official condemnation and advocate statement following her death",
      "Catalyzed lobbying for federal healthcare workplace violence prevention legislation (H.R. 1195)",
    ],
    actionableLesson:
      "Healthcare facilities must establish explicit protocols for handling domestic violence threats, employee threat reporting, and active-threat perimeter security.",
    coreMessage:
      "Healthcare workplaces must recognize domestic violence threats as urgent occupational safety hazards and build coordinated campus defense measures.",
    memorialPublication: {
      title: "Workplace Threat Screening & Healthcare Campus Security Guide",
      focus: "Occupational Safety & Domestic Violence Intervention",
      deliverable: "A clinical guide for healthcare systems to identify, support, and protect staff facing external domestic violence threats.",
    },
    references: [
      { title: "ACEP Statement on the Murder of Dr. Tamara O'Neal (November 2018)", url: "https://www.acep.org/news-media/press-releases/acep-mourns-the-loss-of-tamara-oneal-md-facep/", publisher: "American College of Emergency Physicians", isPrimary: true },
      { title: "Chicago Tribune: Mercy Hospital Shooting — Victims and Investigation", url: "https://www.chicagotribune.com/news/breaking/ct-met-chicago-mercy-hospital-shooting-20181119-story.html", publisher: "Chicago Tribune" },
    ],
  },

  // ── 2. Women Whose Stories Changed Conversations on Safety & Justice ──
  {
    id: 6,
    slug: "jyoti-singh",
    name: "Jyoti Singh (Nirbhaya)",
    country: "India",
    countryFlag: "🇮🇳",
    category: "safety-and-justice",
    categoryLabel: "Safety, Freedom & Legal Reform",
    eraOrYear: "2012",
    roleAndField: "Physiotherapy Student · Delhi",
    avatarUrl: "https://images.openai.com/static-rsc-4/_9b-LBXORzakkaP-CpLE4ue7n5b9iHneqVDtug_dU227vP2AXAorSGvEg_bHG_uQAfWmARFkc7YA3l0WT8NOEBWQwEeKbAPExYBBOwDqP3Ww7R3n_zltmW0Ni67iWc5yZPgSJ2lhJiXfQifA8blm-IHBwg7WkR3rjHmPAcivueM?purpose=inline",
    whoWasThisPerson:
      "A 23-year-old physiotherapy intern from a hardworking family in Uttar Pradesh and Delhi. Ambitious, energetic, and determined to alleviate physical suffering through rehabilitative medicine, she was preparing to begin her professional career.",
    contributions:
      "Her academic determination embodied the aspirations of millions of young Indian women breaking social barriers to achieve professional independence and provide healthcare to their communities.",
    factualContext:
      "In December 2012, while returning home from a cinema with a friend, she was brutally attacked on a moving private bus in South Delhi. Despite emergency treatment in Delhi and Singapore, she succumbed to her injuries.",
    societalImpact:
      "Her ordeal galvanized historic public protests that led to the appointment of the Justice Verma Committee and the enactment of the Criminal Law (Amendment) Act 2013, fundamentally overhauling Indian laws regarding sexual assault and consent.",
    actionableLesson:
      "Public transit systems require verified driver credentials, GPS telemetry, active patrolling, functional streetlights, and zero-tolerance emergency helplines.",
    coreMessage:
      "Safety, freedom, and dignity must be everyday fundamental rights. Women should never have to negotiate their right to exist in public spaces.",
    memorialPublication: {
      title: "Public Transit Safety & Universal Bystander Intervention Toolkit",
      focus: "Urban Infrastructure & Community Rapid-Response",
      deliverable: "An open-source urban transit safety audit protocol and bystander intervention education kit for academic campuses and public transit networks.",
    },
    references: [
      { title: "Justice J.S. Verma Committee Report on Amendments to Criminal Law (2013)", url: "https://prsindia.org", publisher: "PRS Legislative Research" },
      { title: "Criminal Law (Amendment) Act 2013", url: "https://indiacode.nic.in", publisher: "Ministry of Law and Justice, India" },
    ],
  },
  {
    id: 7,
    slug: "sarah-everard",
    name: "Sarah Everard",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    category: "safety-and-justice",
    categoryLabel: "Public Trust & Women's Street Safety",
    eraOrYear: "1987–2021",
    roleAndField: "Marketing Executive · London",
    avatarUrl: "https://images.openai.com/static-rsc-4/DOKUtCp9ZqEvNj1GLduBA7jfysPzHED7DEIAEsC-qQGHhQFViaIhxBl676LvDAOlkd1eTXPtDHPBoO11qaPeNR5AooAOGRYXbpCgQomQnsd9-cz7QhcBg1O5AepJAP1MEBTiLqxS-MICJ6A7NEyPT57awmEYGVtlMX8PEdYluKA?purpose=inline",
    whoWasThisPerson:
      "A 33-year-old marketing executive living in Brixton, London. Known for her creative talent, bright demeanor, and caring friendships, she was a Durham University geography graduate who loved city life.",
    contributions:
      "She led successful creative and branding campaigns in the private sector and was widely cherished across her community for her warmth, humor, and civic engagement.",
    factualContext:
      "In March 2021, while walking home from a friend's house in Clapham, she was abducted under the false pretext of a police stop by a serving Metropolitan Police officer and murdered. The perpetrator was sentenced to a whole-life tariff.",
    societalImpact:
      "Her story unleashed an international reckoning on women's street safety and institutional power abuses. It directly prompted the independent Baroness Casey Review (published March 2023) into the standards and culture of the Metropolitan Police Service, which found the force institutionally racist, misogynistic and homophobic — and the statutory Angiolini Inquiry Part 1 Report (February 2024) into Couzens' police career.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "33-year-old marketing executive, abducted in Clapham on 3 March 2021 by serving Met Police officer Wayne Couzens",
      "Couzens sentenced to a whole-life order on 30 September 2021 by Lord Justice Fulford at the Old Bailey",
      "Baroness Casey Review commissioned autumn 2021; published March 2023 — found Met Police institutionally misogynistic and racist",
      "Angiolini Inquiry Part 1 Report published February 2024 examining Couzens' police service record",
    ],
    actionableLesson:
      "Police forces must enforce rigorous background vetting, remove officers flagged for misconduct, and guarantee citizens clear channels to verify plainclothes stops.",
    coreMessage:
      "Public safety must be designed into everyday civic infrastructure, and institutions charged with protecting citizens must hold themselves to the highest ethical accountability.",
    memorialPublication: {
      title: "Urban Safety Audits & Institutional Power Accountability Guide",
      focus: "Civic Infrastructure & Public Trust in Policing",
      deliverable: "A comprehensive civic guide on neighborhood night lighting, safe pedestrian corridors, and institutional reporting rights.",
    },
    references: [
      { title: "Sentencing Remarks of Lord Justice Fulford (R v. Wayne Couzens, 30 September 2021)", url: "https://www.judiciary.uk/wp-content/uploads/2022/07/R-v-Couzens-Sentencing-Remarks.pdf", publisher: "Judiciary of England and Wales", isPrimary: true },
      { title: "Baroness Casey Review into Standards and Culture of the Metropolitan Police (March 2023)", url: "https://www.met.police.uk/SysSiteAssets/media/downloads/met/about-us/baroness-casey-review/baroness-casey-review-march-2023.pdf", publisher: "Metropolitan Police / UK Home Office", isPrimary: true },
      { title: "The Angiolini Inquiry: Part 1 Report (February 2024)", url: "https://www.gov.uk/government/publications/the-angiolini-inquiry-part-1-report", publisher: "UK Home Office", isPrimary: true },
    ],
  },
  {
    id: 8,
    slug: "anene-booysen",
    name: "Anene Booysen",
    country: "South Africa",
    countryFlag: "🇿🇦",
    category: "safety-and-justice",
    categoryLabel: "Child Protection & Youth Community Care",
    eraOrYear: "1995–2013",
    roleAndField: "Youth & Community Member · Bredasdorp, Western Cape",
    avatarUrl: "https://images.openai.com/static-rsc-4/0Id69OwDdqBc6YBcdUcdd2sOzS8jWP4jv7jCvvsNLvx-x1o7U3_lpoXGGZ10o5r7m-njzc_2efEiF34LRMelCQAEQYqePvzBfFb0hz1C1zeJ6CiNqDpzBgoac9K21q6-r4hzI8AX8emyrRjGkPYm3VXS0zw0X4KEZH1pAzharEU?purpose=inline",
    whoWasThisPerson:
      "A 17-year-old girl living in Bredasdorp in the Overberg region of South Africa's Western Cape. Known to family and friends for her bright, caring spirit, she lived with foster family members and aspired to complete her education.",
    contributions:
      "Her life reflected the reality of young people in economically marginalized rural townships working toward self-improvement amidst systemic community vulnerabilities.",
    factualContext:
      "On the night of 1–2 February 2013, she was subjected to a violent sexual assault on a construction site in Bredasdorp, passing away from her injuries in Tygerberg Hospital on 2 February 2013. On 1 November 2013, the Swellendam Circuit Court convicted 21-year-old Johannes Kana of rape and murder, sentencing him to two concurrent life terms. A second suspect was discharged before trial due to lack of evidence.",
    societalImpact:
      "Her death brought international attention to South Africa's epidemic of gender-based violence (GBV), leading to national parliamentary debates, widespread community mobilizations, and the re-establishment of specialized Sexual Offences Courts across South Africa.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "17-year-old youth from Bredasdorp, Western Cape, South Africa",
      "Attacked on a construction site on 1–2 February 2013 and died at Tygerberg Hospital",
      "Johannes Kana convicted of rape and murder by the Swellendam Circuit Court on 1 November 2013",
      "Kana sentenced to two concurrent life terms",
      "Catalyzed national mobilizations and the reopening of specialized Sexual Offences Courts in South Africa",
    ],
    actionableLesson:
      "Township and peri-urban development must incorporate safe youth recreation centers, secure lighting, and grassroots social worker coverage to protect vulnerable minors.",
    coreMessage:
      "Children and young people must grow up in communities where their safety is unconditionally protected, never left to chance.",
    memorialPublication: {
      title: "Community Child Protection & Peri-Urban Youth Safety Manual",
      focus: "Child Safeguarding & Rural Community Intervention",
      deliverable: "An actionable community organizing framework for child safeguarding in economically disadvantaged neighborhoods.",
      initiativeStatus: "Proposed Initiative",
    },
    references: [
      { title: "High Court of South Africa (Western Cape Division, Swellendam Circuit) State v. Johannes Kana Verdict (Nov 2013)", url: "https://www.saflii.org/za/cases/ZAWCHC/", publisher: "High Court of South Africa", isPrimary: true },
      { title: "BBC News: Anene Booysen Murder: Johannes Kana Gets Life in Prison", url: "https://www.bbc.com/news/world-africa-24773809", publisher: "BBC News" },
      { title: "South African Human Rights Commission GBV Factsheet", url: "https://www.sahrc.org.za", publisher: "SAHRC" },
    ],
  },
  {
    id: 9,
    slug: "reeva-steenkamp",
    name: "Reeva Steenkamp",
    country: "South Africa",
    countryFlag: "🇿🇦",
    category: "safety-and-justice",
    categoryLabel: "Law, Advocacy & Anti-Abuse Education",
    eraOrYear: "1983–2013",
    roleAndField: "Law Graduate (LLB), Model & Emerging Anti-Abuse Campaigner",
    avatarUrl: "https://images.openai.com/static-rsc-4/hzeyU8Iua_FaPgOtqTcib-tzJP2Lg4OKfZK_JFVLpjkFtceiT5-KA0kOvsYEw5z1Q1WN3cdunGHkpK1Hl9k8ldCquQSQZMnJmbS8HwNt-LM0nzKw3IyvZpixzVZT1b2bwiyySBnzICeKErtQsBnACokSMPdrFOfZ54kUdAKlum4?purpose=inline",
    whoWasThisPerson:
      "A 29-year-old law graduate (LLB, Nelson Mandela Metropolitan University, Port Elizabeth), professional model, and television personality. Highly regarded for her intellect and empathy, she was preparing to apply for admission to the legal bar.",
    contributions:
      "In the weeks before her death, she was using her public platform to speak out against domestic violence and abuse, planning educational school talks on the subject. Her mother June Steenkamp's victim impact statement confirms she had begun active anti-abuse advocacy.",
    factualContext:
      "On Valentine's Day in February 2013, she was shot through a closed bathroom door in the home of her boyfriend, paralympian Oscar Pistorius. Following multiple court trials and appeals, Pistorius was convicted of murder.",
    societalImpact:
      "Her family established the Reeva Rebecca Steenkamp Foundation, campaigning tirelessly against domestic abuse, educating teenagers on healthy relationships, and offering support for abused women.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "29-year-old law graduate and model, shot on 14 February 2013 in Pretoria by Oscar Pistorius",
      "Supreme Court of Appeal of South Africa overturned culpable homicide to murder conviction in December 2015",
      "June Steenkamp's victim impact statement confirms Reeva's emerging public advocacy against domestic abuse",
      "Reeva Rebecca Steenkamp Foundation established by her parents",
    ],
    actionableLesson:
      "Educate young people on recognizing early indicators of coercive control, possessiveness, and domestic intimidation before they escalate into lethal violence.",
    coreMessage:
      "Recognize the complete person beyond the sensationalized circumstances of their death. Reeva was a brilliant legal thinker and passionate defender of others.",
    memorialPublication: {
      title: "Coercive Control Recognition & Safe Relationship Education Curriculum",
      focus: "Intimate Partner Violence Prevention & Legal Literacy",
      deliverable: "A curriculum for high schools and universities on identifying coercive control and establishing safe exit pathways.",
    },
    references: [
      { title: "Supreme Court of Appeal of South Africa: DPP, Gauteng v. Pistorius (96/2015) [2015] ZASCA 204", url: "https://www.saflii.org/za/cases/ZASCA/2015/204.html", publisher: "Supreme Court of Appeal of South Africa", isPrimary: true },
      { title: "Victim Impact Statement of June Steenkamp (High Court of South Africa, Pretoria, 2016)", url: "https://www.saflii.org", publisher: "Judiciary of South Africa", isPrimary: true },
      { title: "Reeva Rebecca Steenkamp Foundation Official Mission", url: "https://reevasfoundation.org", publisher: "Reeva Steenkamp Foundation" },
    ],
  },
  {
    id: 10,
    slug: "mahsa-amini",
    name: "Mahsa Amini (Jina Amini)",
    country: "Iran",
    countryFlag: "🇮🇷",
    category: "safety-and-justice",
    categoryLabel: "Human Rights, Autonomy & Freedom",
    eraOrYear: "2022",
    roleAndField: "Student · Saqqez, Kurdistan Province",
    avatarUrl: "https://images.openai.com/static-rsc-4/TIazFq5aohG1GLxEeGRmgNeaiyuYNA6Ytwt497ME-KDW7PWzAN_VejFEeX9Ciz_NletvQ_fRpFeovgrCS4OCpaGHZLjecJQ00olJS8J_3nORuJtbiLREg-nd0Arws1j9jjF_WEJuj2aG1-drFM1qkROkTmA-UlIrAwGdm0ZjKq4?purpose=inline",
    whoWasThisPerson:
      "A 22-year-old Kurdish Iranian woman from the city of Saqqez in Kurdistan Province. She was known to her family and friends as Jina, an affectionate, peaceful young woman who was about to begin university studies.",
    contributions:
      "Her gentle nature and aspirations for normal youth, education, and autonomy resonated across every community in Iran and inspired one of the largest modern human rights mobilizations.",
    factualContext:
      "In September 2022, while visiting Tehran with her brother, she was arrested by the Guidance Patrol (morality police) for alleged non-compliance with state dress codes. She collapsed in custody with severe head trauma and died in hospital three days later.",
    societalImpact:
      "Her death ignited the international 'Woman, Life, Freedom' (Jin, Jiyan, Azadî) movement, leading to historic protests demanding gender equality, human rights, and an end to systemic discrimination in Iran. In 2023, she and the movement were awarded the Sakharov Prize for Freedom of Thought by the European Parliament.",
    verificationStatus: "Partially Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "22-year-old Iranian Kurdish student from Saqqez, Kurdistan Province, known to family as Jina",
      "Arrested by Guidance Patrol in Tehran on 13 September 2022; died in Kasra Hospital on 16 September 2022",
      "Triggered the 'Woman, Life, Freedom' (Jin, Jiyan, Azadî) international movement",
      "Posthumously awarded the 2023 Sakharov Prize for Freedom of Thought by the European Parliament",
      "UN Independent Fact-Finding Mission on Iran (A/HRC/55/67, March 2024) concluded death resulted from physical violence in state custody",
    ],
    disputedFacts: [
      "Iranian state authorities claimed she died of cardiac arrest due to underlying illness; this was disputed by her family and rejected by the UN Independent International Fact-Finding Mission on Iran (March 2024).",
    ],
    actionableLesson:
      "Fundamental bodily autonomy, freedom of conscience, and freedom from arbitrary state policing are non-negotiable human rights.",
    coreMessage:
      "Personal dignity, freedom, and fundamental human rights deserve universal protection. State power must never be weaponized against personal autonomy.",
    memorialPublication: {
      title: "Patient Rights in Custody & Medical Impartiality Protocol",
      focus: "Human Rights, Custodial Health & Bodily Autonomy",
      deliverable: "Guidelines for healthcare workers and independent forensic investigators assessing detainees and resisting state coercion.",
    },
    references: [
      { title: "UN Independent International Fact-Finding Mission on Iran (A/HRC/55/67, March 2024)", url: "https://www.ohchr.org/en/hr-bodies/hrc/ffm-iran", publisher: "UN Human Rights Council", isPrimary: true },
      { title: "European Parliament Sakharov Prize 2023: Jina Mahsa Amini and Woman, Life, Freedom", url: "https://www.europarl.europa.eu/sakharovprize/en/laureates/2023", publisher: "European Parliament", isPrimary: true },
      { title: "Amnesty International: Iran — UN Must Act Over Death in Custody of Mahsa Amini", url: "https://www.amnesty.org/en/latest/news/2022/09/iran-un-must-act-over-death-in-custody-of-mahsa-amini/", publisher: "Amnesty International" },
    ],
  },

  // ── 3. Journalists Who Dedicated Their Lives to Documenting Truth ──
  {
    id: 11,
    slug: "daphne-caruana-galizia",
    name: "Daphne Caruana Galizia",
    country: "Malta",
    countryFlag: "🇲🇹",
    category: "journalism",
    categoryLabel: "Investigative Journalism & Anti-Corruption",
    eraOrYear: "2017",
    roleAndField: "Investigative Journalist & Columnist · Running Commentary",
    avatarUrl: "https://images.openai.com/static-rsc-4/qigdzbrpcOamVenR7VKLWczF_7zzPJkK0aS5cPLrXyoB3qgGxTAG89SOwBPkhxVL8T6folTBOTqG0Qxd2lpHqjFFq_sSnsl6MjoPbwBWB1hVdso52TuyajCOZVqVQb7beGzGyD3YGcQeIBxTg11Lig12hiYZNtFTzulMtmlznnY?purpose=inline",
    whoWasThisPerson:
      "Malta's foremost investigative journalist and political blogger, whose independent site 'Running Commentary' was one of the most widely read publications in the Mediterranean nation.",
    contributions:
      "Over three decades, she fearlessly exposed money laundering, government corruption, organized crime connections, and offshore accounts linked to the Panama Papers, holding the highest echelons of power accountable.",
    factualContext:
      "In October 2017, after receiving persistent legal intimidation, asset freezes, and death threats, she was assassinated by a car bomb placed beneath her vehicle near her home in Bidnija.",
    societalImpact:
      "Her murder led to the resignation of the Maltese Prime Minister, the launch of a public inquiry that found the state responsible for creating a culture of impunity, and the formation of The Daphne Project—uniting 45 journalists from 18 global outlets to finish her investigations.",
    actionableLesson:
      "Democratic states must enact anti-SLAPP legislation to prevent powerful figures from using abusive lawsuits to financially crush investigative journalists.",
    coreMessage:
      "Protect independent journalism and the right to investigate wrongdoing. When a journalist is killed, society must ensure their stories multiply.",
    verifiedQuote: {
      quote: "There are crooks everywhere you look now. The situation is desperate.",
      source: "Final blog post on Running Commentary (16 October 2017)",
    },
    memorialPublication: {
      title: "Anti-SLAPP Defense & Digital Journalist Security Protocol",
      focus: "Press Freedom & Whistleblower Protection",
      deliverable: "A legal and digital safety guide for investigative writers operating under legal harassment and surveillance.",
    },
    references: [
      { title: "The Daphne Caruana Galizia Foundation Research Archives", url: "https://www.daphne.foundation", publisher: "The Daphne Foundation" },
      { title: "Public Inquiry into the Assassination of Daphne Caruana Galizia (2021)", url: "https://www.coe.int", publisher: "Council of Europe" },
    ],
  },
  {
    id: 12,
    slug: "anna-politkovskaya",
    name: "Anna Politkovskaya",
    country: "Russia",
    countryFlag: "🇷🇺",
    category: "journalism",
    categoryLabel: "Conflict Reporting & Human Rights Journalism",
    eraOrYear: "2006",
    roleAndField: "Investigative Reporter · Novaya Gazeta",
    avatarUrl: "https://images.openai.com/static-rsc-4/J1TuGI8867a_ALx9HO5_BNg49SBTJuRsrKL1Y8PhEM5Ng9I39Yt3ZjXXkCYd12O6sjQt3A96wI_gp9fNvg-gP5luDvBKjojn-NJPFy0x_p20HctXeTkOYr2kedica9HEkwJViUZyY3TVggT3Qae6HItMB4ecm26wo2Sl4EppC3Q?purpose=inline",
    whoWasThisPerson:
      "A veteran Russian-American journalist and author writing for the independent newspaper Novaya Gazeta. She dedicated her life to reporting from the ground during the Second Chechen War.",
    contributions:
      "She documented thousands of forced disappearances, torture cases, and civilian atrocities, providing medical and legal assistance to victims' families while refusing to adopt official state narratives.",
    factualContext:
      "In October 2006, after surviving prior poisoning and arrest attempts, she was shot dead in the elevator of her Moscow apartment building. Her assassination coincided with Vladimir Putin's birthday.",
    societalImpact:
      "Her work stands as an irreplaceable historical record of the human toll of the Chechen conflicts. The RAW in WAR organization established the Anna Politkovskaya Award to honor women human rights defenders working in war and conflict zones.",
    actionableLesson:
      "Civil society must build international emergency evacuation and secure archiving mechanisms for reporters documenting crimes against humanity in authoritarian contexts.",
    coreMessage:
      "Journalism should preserve human stories even when they are dangerous to tell. Truth is the ultimate antidote to historical erasure.",
    memorialPublication: {
      title: "Conflict Zone Civilian Documentation & Trauma Ethics Protocol",
      focus: "Human Rights Documentation & Civilian Oral History",
      deliverable: "Methodologies for documenting humanitarian crises with trauma-informed ethics that protect civilian sources.",
    },
    references: [
      { title: "Committee to Protect Journalists Profile on Anna Politkovskaya", url: "https://cpj.org/data/people/anna-politkovskaya/", publisher: "CPJ" },
      { title: "RAW in WAR Anna Politkovskaya Award Archives", url: "https://www.rawinwar.org", publisher: "Reach All Women in WAR" },
    ],
  },
  {
    id: 13,
    slug: "veronica-guerin",
    name: "Veronica Guerin",
    country: "Ireland",
    countryFlag: "🇮🇪",
    category: "journalism",
    categoryLabel: "Crime Reporting & Civic Integrity",
    eraOrYear: "1996",
    roleAndField: "Investigative Crime Reporter · Sunday Independent, Dublin",
    avatarUrl: "https://images.openai.com/static-rsc-4/GrBLa7tpWGDORJuGkrBf5arTv8p2UmAM_rCOLq2TvEefN39ds36qHKYsMW28CwGw6e6qU5KkA05TQMgI2JGmXzueIedMttsplbn1pZZ3CvurqNyqN1ja-eNdwInbAwpoyyOqBs43EQPevqOcaCohrBS0Yzu5TMdeYiP9Ig2F0TE?purpose=inline",
    whoWasThisPerson:
      "A tenacious Irish crime reporter for the Sunday Independent whose investigations pierced Dublin's heavily armed illicit drug networks and organized crime syndicates.",
    contributions:
      "She confronted drug barons directly, exposed how illicit narcotics devastated working-class Dublin communities, and was honored with the 1995 CPJ International Press Freedom Award for her fearless work.",
    factualContext:
      "In June 1996, while stopped at a red traffic light on the Naas Dual Carriageway outside Dublin, she was fatally shot by two men on a motorcycle hired by drug traffickers.",
    societalImpact:
      "Her assassination outraged the Irish public and prompted the Dáil Éireann to establish the Criminal Assets Bureau (CAB), empowering the state to seize unexplained wealth derived from criminal activity—a model replicated worldwide.",
    actionableLesson:
      "States must tackle organized criminal enterprises through their illicit financial flows and establish robust physical protection for journalists covering cartel activities.",
    coreMessage:
      "Organized crime must not silence public-interest reporting. Independent investigations protect communities from exploitation.",
    memorialPublication: {
      title: "Community Harm Reduction & Public Health Crime Reporting Guide",
      focus: "Addiction Public Health & Organized Crime Interception",
      deliverable: "An analytical health toolkit examining the intersection of illicit narcotics trafficking, addiction recovery, and civic safety.",
    },
    references: [
      { title: "Criminal Assets Bureau (CAB) History and Mandate", url: "https://www.garda.ie/en/about-us/specialist-units/criminal-assets-bureau/", publisher: "An Garda Síochána" },
      { title: "CPJ International Press Freedom Award Citation: Veronica Guerin", url: "https://cpj.org", publisher: "Committee to Protect Journalists" },
    ],
  },
  {
    id: 14,
    slug: "shireen-abu-akleh",
    name: "Shireen Abu Akleh",
    country: "Palestine",
    countryFlag: "🇵🇸",
    category: "journalism",
    categoryLabel: "Field Journalism & Civilian Storytelling",
    eraOrYear: "2022",
    roleAndField: "Senior Correspondent · Al Jazeera Arabic",
    avatarUrl: "https://images.openai.com/static-rsc-4/V5I6r4XbORgfpbs-O-U_wrPxWXxBB4o_lQDVz70Ea4ZkHQ8Q2lBdNG17m0vYXXkXxfvPJOZ6NxWeClLln1pZ1ywxSdJYvqHlq6ND_2qGNjxoaV2aj249XegMtzEMDMxc_pEwS1WPBgNDKs_V8QX6rQWCqzcMl7rP6X0k9tL4des?purpose=inline",
    whoWasThisPerson:
      "A trailblazing Palestinian-American journalist who served as the face of Palestinian reporting for more than 25 years. Admired for her calm, rigorous, and deeply empathetic style, she mentored generations of Arab women in journalism.",
    contributions:
      "She co-founded the Voice of Palestine radio station, trained young journalists across the West Bank and Gaza, and covered military operations, displacements, and everyday Palestinian life with unmatched journalistic ethics.",
    factualContext:
      "In May 2022, while wearing a blue protective vest clearly marked 'PRESS' and a helmet during an Israeli military raid in Jenin, she was fatally shot. Subsequent investigations by the UN, CPJ, and international news agencies confirmed she was shot by Israeli military forces.",
    societalImpact:
      "Her death ignited global mourning and renewed calls for holding military forces accountable for the deaths of journalists and humanitarian workers operating in active conflict zones.",
    actionableLesson:
      "Protective press markings must be universally respected by all military and security forces under Geneva Conventions, with independent international tribunals investigating press casualties.",
    coreMessage:
      "Protect journalists and ensure that civilians' lived experiences are recorded. A camera and a notebook should never make anyone a target.",
    memorialPublication: {
      title: "Field Medic & Civilian Press Safety in High-Risk Zones",
      focus: "Humanitarian Protection & Conflict Press Safety",
      deliverable: "Standard operating procedures for civilian journalists and humanitarian healthcare workers operating in active military zones.",
    },
    references: [
      { title: "UN Human Rights Office Findings on the Killing of Shireen Abu Akleh", url: "https://www.ohchr.org/en/press-releases/2022/06/killing-journalist-shireen-abu-akleh", publisher: "OHCHR" },
      { title: "Committee to Protect Journalists Special Report: 'Deadly Pattern'", url: "https://cpj.org/reports/2023/05/deadly-pattern-20-years-israeli-military-killings-journalists-without-accountability/", publisher: "CPJ" },
    ],
  },
  {
    id: 15,
    slug: "gauri-lankesh",
    name: "Gauri Lankesh",
    country: "India",
    countryFlag: "🇮🇳",
    category: "journalism",
    categoryLabel: "Freedom of Expression & Anti-Communalism",
    eraOrYear: "2017",
    roleAndField: "Editor & Publisher · Gauri Lankesh Patrike",
    avatarUrl: "https://images.openai.com/static-rsc-4/XOM-sKwHuEWneipzPI2AtVlsgHwrYw3nw_FZpZcpAxd-64DDyy7VxoXr96S-51lPjq3zVgOPdKKyXXXwwIYWg6-ZRUclvrlIUouF5JSEOS8F_TILOYvt82Ja952I07lx-vZS7ut0iRroEg26TAYuTqMxlyOUyv1tMyt_0PzBFu0?purpose=inline",
    whoWasThisPerson:
      "A prominent Indian journalist, editor, and activist based in Bengaluru, Karnataka. Daughter of renowned poet and journalist P. Lankesh, she chose to publish advertisement-free Kannada weeklies to preserve editorial independence.",
    contributions:
      "She wrote tirelessly against religious fundamentalism, caste discrimination, and the oppression of marginalized communities. She also served on state panels assisting former insurgents to reintegrate into peaceful civilian society.",
    factualContext:
      "In September 2017, after receiving ongoing threats for her critical commentary on religious nationalism, she was assassinated outside her home in Rajarajeshwari Nagar, Bengaluru, by gunmen on a motorcycle linked to a clandestine radical network.",
    societalImpact:
      "Her assassination sparked nationwide rallies under the banner 'I Am Gauri,' underscoring the urgent need to protect regional-language journalists, secular discourse, and democratic criticism in India.",
    actionableLesson:
      "Society must fiercely protect regional-language independent media, punish targeted hate speech, and ensure that differing political perspectives do not result in violent retribution.",
    coreMessage:
      "Encourage independent thinking, responsible debate, and unyielding freedom of expression. Disagreement must be met with argument, never bullets.",
    memorialPublication: {
      title: "Critical Health Literacy & Misinformation Counteraction Toolkit",
      focus: "Independent Thinking & Scientific Literacy",
      deliverable: "A community educational framework for analyzing information critically, dismantling propaganda, and defending free thought.",
    },
    references: [
      { title: "Special Investigation Team (SIT) Charge Sheet in Gauri Lankesh Case", url: "https://ksp.karnataka.gov.in", publisher: "Karnataka Police" },
      { title: "UNESCO Director-General Condemns Killing of Journalist Gauri Lankesh", url: "https://en.unesco.org", publisher: "UNESCO" },
    ],
  },

  // ── 4. Human Rights and Environmental Defenders ──
  {
    id: 16,
    slug: "berta-caceres",
    name: "Berta Cáceres",
    country: "Honduras",
    countryFlag: "🇭🇳",
    category: "environmental-defenders",
    categoryLabel: "Indigenous Sovereignty & River Protection",
    eraOrYear: "2016",
    roleAndField: "Lenca Indigenous Rights Leader & Environmental Defender · COPINH",
    avatarUrl: "https://images.openai.com/static-rsc-4/JO_1YiBBZICzg_b62pbzOcFl0N41Vs7z6z4-i0dJUy7h6Lkil61gk1kIishhVl_4Dx0CHvls5ZROg8udSUlcmQX1y2KY6vNw8L1KOTB1IjpLlnzObpQEnaiTbicx59hsmv1uiXl8QrhcrNcWRYmQCl45uE5qnTs7JqPquhW-Sn0?purpose=inline",
    whoWasThisPerson:
      "A renowned Lenca Indigenous leader, human rights activist, and co-founder of the Civic Council of Popular and Indigenous Organizations of Honduras (COPINH). She won the 2015 Goldman Environmental Prize.",
    contributions:
      "She led a peaceful grassroots campaign to defend the sacred Gualcarque River against the proposed Agua Zarca hydroelectric dam, organizing community votes that successfully convinced international development banks and China's Sinohydro to withdraw funding.",
    factualContext:
      "In March 2016, following years of intimidation and harassment, she was assassinated in her home in La Esperanza. In November 2018, seven individuals were convicted — including a DESA (dam company) environmental manager and former and active military intelligence officers — for carrying out the killing. In July 2021, former DESA president Roberto David Castillo Mejía was convicted as intellectual author and co-perpetrator; he was sentenced in June 2022 to 22.5 years' imprisonment.",
    societalImpact:
      "Her legacy transformed the international conversation around corporate responsibility, Free, Prior, and Informed Consent (FPIC), and the critical dangers faced by frontline land defenders in Latin America.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "Lenca leader, co-founder of COPINH, and recipient of the 2015 Goldman Environmental Prize",
      "Assassinated in her home in La Esperanza on 2–3 March 2016",
      "Seven individuals convicted in November 2018 (DESA manager, military officers, hitmen)",
      "DESA president Roberto David Castillo Mejía convicted as intellectual author in 2021; sentenced to 22.5 years in June 2022",
      "Honduran Supreme Court affirmed convictions on appeal",
    ],
    actionableLesson:
      "Global financial institutions and green energy developers must strictly enforce Free, Prior, and Informed Consent (FPIC) before financing infrastructure on indigenous territories.",
    coreMessage:
      "Development must respect Indigenous rights, water resources, and local communities. Rivers are not commodities; they are sacred lifeblood.",
    verifiedQuote: {
      quote: "Wake up, humanity! We are out of time. We must shake our conscience free of rapacious capitalism.",
      source: "Goldman Environmental Prize Acceptance Speech (San Francisco, 2015)",
    },
    memorialPublication: {
      title: "Indigenous Watershed Protection & Community Environmental Health Assessment",
      focus: "Water Sanitation & Environmental Justice",
      deliverable: "A practical testing and advocacy protocol for rural communities assessing industrial pollution and watershed health.",
    },
    references: [
      { title: "Goldman Environmental Prize 2015: Berta Cáceres", url: "https://www.goldmanprize.org/recipient/berta-caceres/", publisher: "Goldman Environmental Foundation" },
      { title: "Front Line Defenders Case Record: Berta Cáceres", url: "https://www.frontlinedefenders.org/en/case/case-history-berta-caceres", publisher: "Front Line Defenders" },
    ],
  },
  {
    id: 17,
    slug: "marielle-franco",
    name: "Marielle Franco",
    country: "Brazil",
    countryFlag: "🇧🇷",
    category: "environmental-defenders",
    categoryLabel: "Favela Rights & Institutional Inclusion",
    eraOrYear: "2018",
    roleAndField: "City Councillor, Sociologist & Human Rights Defender · Rio de Janeiro",
    avatarUrl: "https://images.openai.com/static-rsc-4/3bzYMzTtTyy1kqCYxkVk27smh-HPqUcOko8vseTnDBe8NxEsSHAipIs735qC5M2_YimYYdYWCUOA7FcZcNlrdCjOKIsqgOpsfbEsCeLps9TpaaswdXVEaHBk0GRaDkZYT6Id9OUZcgDS3RHpCbk9Os03dki8Jc_XL1seZy7gBVQ?purpose=inline",
    whoWasThisPerson:
      "A Black, bisexual, socialist feminist sociologist born and raised in the Complexo da Maré favela in Rio de Janeiro. She earned a master's degree in public administration before being elected to the Rio de Janeiro City Council with the fifth-highest vote count.",
    contributions:
      "She championed legislation supporting reproductive healthcare for favela women, monitored police violence in peripheral communities, and advocated for nighttime public childcare so working mothers could study.",
    factualContext:
      "In March 2018, while driving home from a panel discussion empowering young Black women, her car was ambushed in central Rio. She and her driver, Anderson Gomes, were fatally shot. In October 2024, former military police officers Ronnie Lessa and Élcio de Queiroz were convicted by jury for the executions (sentenced to 78 and 59 years respectively). The suspected intellectual authors — politicians Chiquinho Brazão, Domingos Brazão, and former Civil Police chief Rivaldo Barbosa — were arrested by federal police in March 2024; judicial proceedings before Brazil's Supreme Federal Court (STF) advanced through 2026.",
    societalImpact:
      "Her martyrdom catalyzed the 'Marielle Effect,' inspiring a historic wave of Black and Indigenous women across Brazil to run for political office and demand accountability in municipal governance.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "Rio de Janeiro City Councillor and sociologist from Complexo da Maré, murdered 14 March 2018",
      "Gunmen Ronnie Lessa and Élcio de Queiroz convicted by jury in October 2024; sentenced to 78 and 59 years",
      "Suspected intellectual authors (Brazão brothers and Rivaldo Barbosa) arrested in March 2024",
      "STF proceedings against intellectual authors advancing through 2026",
    ],
    actionableLesson:
      "Democratic systems must actively dismantle paramilitarism and create secure pathways for marginalized leaders to participate safely in politics.",
    coreMessage:
      "Public representation must include the people whose voices are systematically excluded. Marielle's voice cannot be extinguished.",
    memorialPublication: {
      title: "Favela & Marginalized Community Public Health Access Framework",
      focus: "Urban Health Disparities & Community Medicine",
      deliverable: "An urban clinic blueprint addressing racial and socio-economic disparities in maternal and preventive healthcare.",
    },
    references: [
      { title: "Instituto Marielle Franco Research & Archive", url: "https://www.institutomariellefranco.org", publisher: "Instituto Marielle Franco" },
      { title: "Amnesty International: Justice for Marielle Franco & Anderson Gomes", url: "https://www.amnesty.org", publisher: "Amnesty International" },
    ],
  },
  {
    id: 18,
    slug: "aysin-buyuknohutcu",
    name: "Aysin Büyüknohutçu",
    country: "Turkey",
    countryFlag: "🇹🇷",
    category: "environmental-defenders",
    categoryLabel: "Forest Conservation & Local Ecosystems",
    eraOrYear: "2017",
    roleAndField: "Environmental Defender & Organic Agriculturist · Antalya",
    avatarUrl: "https://images.openai.com/static-rsc-4/Vv6X-qcPnKGEj1d19yrc61g76lfagnCSwaeS7PP8PauLEbmwQJsTfqMQuvIJIqtlOFQIie1JHP_ocWx0n6pBRsKrL0MtiWnF5PZBRWBVgK1gH8FCFc87bo4NAiLa5At4U7rnvKe0oGiV0Pgnusi34oIIFbITQsCSjhDuocWFgfQ?purpose=inline",
    whoWasThisPerson:
      "An environmentalist and sustainable farming advocate living in the Finike district of Antalya, Turkey, who, alongside her husband Ali Ulvi Büyüknohutçu, loved Turkey's ancient cedar and pine forests.",
    contributions:
      "She launched grassroots campaigns and legal lawsuits to stop unregulated marble and stone quarries from devastating ancient Mediterranean cedar forests, water basins, and orange groves.",
    factualContext:
      "In May 2017, just days after winning a critical court verdict closing an environmentally destructive quarry, Aysin and her husband were found shot dead inside their mountain home in Finike. A local suspect was arrested and made conflicting statements — initially alleging a quarry owner had hired him, then retracting this to claim a robbery gone wrong — before dying in prison custody before trial. The UN Special Rapporteur on Human Rights Defenders raised serious concerns about the investigation's adequacy.",
    societalImpact:
      "Their deaths sparked national solidarity across Turkey's ecological movement, demonstrating that local environmental struggles carry immediate human safety consequences and corporate accountability dimensions.",
    verificationStatus: "Partially Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "Environmental defender and organic farmer in Finike, Antalya; successfully won a court closure of a destructive quarry",
      "Found shot dead alongside husband Ali Ulvi Büyüknohutçu in their home on 9 May 2017",
      "Suspect Ali Yamuç arrested, made contradictory statements about motive, and died in prison custody September 2017 before trial",
      "UN Special Rapporteur issued communication AL TUR 3/2018 raising concerns over impunity and investigation adequacy",
    ],
    disputedFacts: [
      "Suspect's initial claim that a quarry owner commissioned the killing was retracted to claim robbery. No judicial conviction linking quarry operators or any corporate or military figure to the murder has been established. Attribution of responsibility remains unresolved.",
    ],
    actionableLesson:
      "Environmental zoning regulations must safeguard biodiverse habitats from extractive industries and provide legal defense funds for local defenders.",
    coreMessage:
      "Environmental protection begins with local communities. Preserving forests and clean air is essential to public health.",
    memorialPublication: {
      title: "Ecosystem Conservation & Respiratory Health Impact of Industrial Quarrying",
      focus: "Air Quality, Silicosis & Ecological Conservation",
      deliverable: "A health analysis examining particulate matter inhalation risks in rural communities neighboring extractive quarries.",
    },
    references: [
      { title: "HRD Memorial: Aysin and Ali Ulvi Büyüknohutçu", url: "https://hrdmemorial.org", publisher: "Human Rights Defenders Memorial" },
      { title: "Turkish Environmental Law Association Reports on Finike Quarries", url: "https://www.cevrehukuku.org", publisher: "ÇEHUK" },
    ],
  },
  {
    id: 19,
    slug: "efigenia-vasquez-astudillo",
    name: "Efigenia Vásquez Astudillo",
    country: "Colombia",
    countryFlag: "🇨🇴",
    category: "environmental-defenders",
    categoryLabel: "Community Radio & Indigenous Land Rights",
    eraOrYear: "2017",
    roleAndField: "Indigenous Journalist & Community Broadcaster · Kokonuko Community Radio",
    avatarUrl: "https://images.openai.com/static-rsc-4/QBbA4sI2Prm_omnF81bLiSSThtCm0Jt9K6vCvLhasb4dxeD60AEEQDvRiZOq_yL4YrLrvaj-Du6lPIeOdzSDN1OYrg6UdAwhzVbGhyDdWP3Acn8icwHZLA6ZBT5ISAl9G2AtGLJas6j4KzeuNCybJYaU0-GxU5A0YburPopeZIc?purpose=inline",
    whoWasThisPerson:
      "A 31-year-old mother of three, Kokonuko Indigenous journalist, and community broadcaster for the station Renacer Kokonuko in Puracé, Cauca department, Colombia.",
    contributions:
      "She used community radio to preserve the Kokonuko native culture, educate local farmers on sustainable agriculture, and document indigenous mobilization to reclaim ancestral lands.",
    factualContext:
      "On 8 October 2017, while covering clashes between the Colombian riot police (ESMAD) and the Kokonuko community over ancestral land rights on the Agrotigre estate in Puracé, Cauca department, she was fatally struck by projectiles. While community members and Indigenous organizations asserted riot police used firearms, official police statements claimed community members used artisanal munitions; international bodies, including the UNESCO Observatory of Killed Journalists and the Committee to Protect Journalists, record the source of the fatal projectile as unresolved.",
    societalImpact:
      "Her death brought international attention to the immense vulnerability of indigenous community reporters who document local human rights violations without formal media press passes.",
    verificationStatus: "Partially Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "31-year-old Kokonuko Indigenous journalist and community broadcaster for Renacer Kokonuko in Puracé, Cauca",
      "Mother of three who documented Kokonuko language, sustainable farming, and land reclamation efforts",
      "Fatally wounded on 8 October 2017 during clashes between Kokonuko community members and ESMAD riot police",
      "UNESCO Director-General issued a formal condemnation calling for investigation into her death",
    ],
    disputedFacts: [
      "The exact source and responsibility for the fatal projectile remain disputed between police and Indigenous community accounts; UNESCO and CPJ treat the source of the bullet as unresolved.",
    ],
    actionableLesson:
      "Community media and indigenous communicators must receive full legal protection as journalists under international humanitarian and human rights standards.",
    coreMessage:
      "Local communities deserve independent and accessible media. Indigenous voices must be heard, not silenced.",
    memorialPublication: {
      title: "Indigenous Community Health Communication & Rural Radio Education",
      focus: "Community Public Health & Vernacular Media",
      deliverable: "A curriculum for training community radio broadcasters to transmit life-saving public health and maternal care information.",
      initiativeStatus: "Proposed Initiative",
    },
    references: [
      { title: "UNESCO Observatory of Killed Journalists: Efigenia Vásquez Astudillo", url: "https://en.unesco.org/themes/fostering-freedom-expression/observatory-killed-journalists/efigenia-vasquez-astudillo", publisher: "UNESCO", isPrimary: true },
      { title: "CPJ Case Record: Efigenia Vásquez Astudillo", url: "https://cpj.org/data/people/efigenia-vasquez-astudillo/", publisher: "Committee to Protect Journalists", isPrimary: true },
      { title: "The Guardian: Indigenous Journalist Efigenia Vásquez Killed in Colombia", url: "https://www.theguardian.com", publisher: "The Guardian" },
    ],
  },
  {
    id: 20,
    slug: "emilsen-manyoma",
    name: "Emilsen Manyoma",
    country: "Colombia",
    countryFlag: "🇨🇴",
    category: "environmental-defenders",
    categoryLabel: "Afro-Colombian Land Defense & Peace Building",
    eraOrYear: "2017",
    roleAndField: "Afro-Colombian Community Leader · CONPAZ (Communities Building Peace in Territories)",
    avatarUrl: "https://images.openai.com/static-rsc-4/IgSqdh-CvsqmhKTZ4cQ3zrtDKdjLPqKcVJpXcqbuqoAvz3L_vWY_7ORcsk33C1Rh3Uun7lXQZmBV2nHydVlu0o6QtdcXJzSIT3U9u9CZs4SAYOWmk5OKfRy9PljiydERMkEHoXqiAjTtDEm5LP9Qhu6v6uFXuwYQJqzQt96IT5k?purpose=inline",
    whoWasThisPerson:
      "A courageous Afro-Colombian human rights defender and community leader based in Buenaventura, Colombia's largest Pacific port city. She led local peace initiatives within CONPAZ.",
    contributions:
      "She defended vulnerable Afro-descendant communities against displacement by illegal mining syndicates, corporate port expansions, and drug cartels, creating humanitarian spaces for displaced youth.",
    factualContext:
      "In January 2017, after receiving repeated warnings from paramilitary criminal factions, she and her partner Joe Javier Rodallega were abducted, tortured, and murdered in Buenaventura.",
    societalImpact:
      "Her murder focused international attention on the dangers faced by Afro-Colombian and Indigenous leaders in the post-peace accord transition, urging full implementation of ethnic territorial rights.",
    actionableLesson:
      "Peace accords and development projects must prioritize ethnic territory titling and provide dedicated security protections for community council leaders.",
    coreMessage:
      "Land rights and environmental justice are matters of human dignity. Communities have a fundamental right to live safely on their ancestral land.",
    memorialPublication: {
      title: "Rural Land Rights, Food Sovereignty & Community Nutritional Security",
      focus: "Nutritional Health & Ancestral Land Preservation",
      deliverable: "A nutritional and community health guide linking traditional agrarian land tenure with food security for marginalized populations.",
    },
    references: [
      { title: "UNDP Colombia Human Rights Defender Memorials", url: "https://www.undp.org/colombia", publisher: "UNDP" },
      { title: "AWID Tribute: Remembering Emilsen Manyoma", url: "https://www.awid.org", publisher: "Association for Women's Rights in Development" },
    ],
  },
  {
    id: 21,
    slug: "leonila-tapdasan-pesadilla",
    name: "Leonila Tapdasan Pesadilla",
    country: "Philippines",
    countryFlag: "🇵🇭",
    category: "environmental-defenders",
    categoryLabel: "Indigenous Lumad Rights & Anti-Mining Defense",
    eraOrYear: "1961–2017",
    roleAndField: "Indigenous Lumad Leader & Small Farmers' Rights Defender · Compostela Valley",
    avatarUrl: "https://images.openai.com/static-rsc-4/-yjm7ceVV5xOjBG6XuUGkqYMtFjX-PueMeQ8GfTjtzwBvxvi1dvRVRxcVtl0_toVC_FIlGm9IZKTBQmDKJaX2O4M8kvtnr60HbV425z93EUPC0h2Po6HdhfSuqr1XlSHnpcSH43xw9gp-jVsriy8gQQK3cbzaPPwS67meX4d3wo?purpose=inline",
    whoWasThisPerson:
      "A 55-year-old Lumad peasant leader and active member of the Compostela Farmers Association (CFA) in Compostela Valley (now Davao de Oro), Mindanao, Philippines.",
    contributions:
      "She campaigned relentlessly against large-scale mining concessions and commercial land incursions encroaching on Lumad ancestral domain. Together with her husband Ramon, she donated land for a Lumad community school operated by the Salugpongan Ta' Tanu Igkanogon Community Learning Center.",
    factualContext:
      "On 2 March 2017, she and her husband Ramon Dagaas Pesadilla were shot dead in their home in Barangay Osmeña, Compostela Valley, by armed gunmen suspected of ties to local paramilitary groups.",
    societalImpact:
      "Their murder underscored the findings of international monitoring groups, including Front Line Defenders and Global Witness, which ranked the Philippines among the most perilous countries for environmental and land rights defenders.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "Documented name: Leonila Tapdasan Pesadilla (often cited as Leonila Pesadilla), aged 55",
      "Active member of the Compostela Farmers Association (CFA) in Mindanao",
      "Donated family land for a Salugpongan Lumad community school in Barangay Osmeña",
      "Shot dead alongside husband Ramon Dagaas Pesadilla on 2 March 2017",
      "Case documented by Front Line Defenders and the Human Rights Defenders Memorial",
    ],
    actionableLesson:
      "Governments must stop criminalizing indigenous land defenders and enforce environmental impact reviews before granting extractive permits.",
    coreMessage:
      "Communities must have a decisive voice in decisions affecting their natural resources. Protecting clean water and fertile soil is a service to all humanity.",
    memorialPublication: {
      title: "Toxic Heavy Metal Runoff & Clean Water Access in Mining Communities",
      focus: "Environmental Toxicology & Water Purification",
      deliverable: "A field manual on detecting toxic runoff (lead, mercury, arsenic) and low-cost filtration for rural communities.",
      initiativeStatus: "Proposed Initiative",
    },
    references: [
      { title: "Front Line Defenders: Killings of Leonila Tapdasan Pesadilla and Ramon Pesadilla (March 2017)", url: "https://www.frontlinedefenders.org/en/case/killings-leonila-tapdasan-pesadilla-and-ramon-pesadilla", publisher: "Front Line Defenders", isPrimary: true },
      { title: "HRD Memorial: Leonila Pesadilla Case Record", url: "https://hrdmemorial.org/hrdrec/leonila-pesadilla/", publisher: "Human Rights Defenders Memorial", isPrimary: true },
      { title: "Global Witness Philippines Defenders Report", url: "https://www.globalwitness.org", publisher: "Global Witness" },
    ],
  },
  {
    id: 22,
    slug: "laura-leonor-vasquez-pineda",
    name: "Laura Leonor Vásquez Pineda",
    country: "Guatemala",
    countryFlag: "🇬🇹",
    category: "environmental-defenders",
    categoryLabel: "Mining Resistance & Rural Community Health",
    eraOrYear: "2017",
    roleAndField: "Community Organizer & Land Rights Defender · San Rafael Las Flores",
    avatarUrl: "https://images.openai.com/static-rsc-4/Rsa42Gkc-Hrr9lLfXdxYeC31rQnnvc6Zm16dgrYQRzVMcCn-CgpQLxbtDf0vn1xLj2Knl5IfGTyPbSG7dNUNXIaYaJ1VuxVQfcwYUoT-0lhv5say8vilJsWWTayjcgYoctV39TJ4aTTvF3mhEWQNWqsB0oh7-xi6ASlkPMPpDkA?purpose=inline",
    whoWasThisPerson:
      "A 47-year-old community leader and active member of the Committee in Defense of Life and Peace in San Rafael Las Flores, Jalapa department, Guatemala.",
    contributions:
      "She organized peaceful community referendums, roadblocks, and civic education resisting the operations of the El Escobal silver mine, citing environmental contamination and respiratory hazards.",
    factualContext:
      "In January 2017, after being criminalized and imprisoned for seven months on unfounded charges related to her activism before being acquitted, she was shot dead in her home.",
    societalImpact:
      "Her life and death catalyzed legal challenges that eventually led Guatemala's Constitutional Court to suspend operations of the Escobal mine for failing to consult the indigenous Xinka people.",
    actionableLesson:
      "States must halt the strategic criminalization and misuse of penal law to incarcerate peaceful environmental activists.",
    coreMessage:
      "Environmental decisions should include the people who live with the consequences. Dignity means being heard when your homeland is at stake.",
    memorialPublication: {
      title: "Occupational Environmental Health Standards in Rural Communities",
      focus: "Community Health & Anti-Criminalization Defense",
      deliverable: "A guide for rural clinics diagnosing environmental pollution-related ailments and documenting corporate negligence.",
    },
    references: [
      { title: "AWID Memorial Profile: Laura Leonor Vásquez Pineda", url: "https://www.awid.org", publisher: "AWID" },
      { title: "Front Line Defenders Guatemala Country Case Analysis", url: "https://www.frontlinedefenders.org", publisher: "Front Line Defenders" },
    ],
  },
  {
    id: 23,
    slug: "jane-julia-de-oliveira",
    name: "Jane Júlia de Oliveira",
    country: "Brazil",
    countryFlag: "🇧🇷",
    category: "environmental-defenders",
    categoryLabel: "Rural Labor Rights & Agrarian Reform",
    eraOrYear: "1979–2017",
    roleAndField: "President · Rural Workers' Association of Pau D'Arco, Pará",
    avatarUrl: "https://images.openai.com/static-rsc-4/tp7PiTQ0nIDEgueL7ANN7tNRzCyXShFLyVaVDUVqtbmiq1Xz74bFQ4JkcJlrJGOc6fVHxZ-1AI-GtivQe1xKp7Tm7w7BnVMDYRf_ObLjJJyTB81hNPGJTOKq7jgJ3q5RfLABActEOaPeF5V-szJJvCZ1sDJ0HKSmjt5p6VVvVSQ?purpose=inline",
    whoWasThisPerson:
      "A 38-year-old agrarian leader and president of the Rural Workers' Association of Pau D'Arco in southern Pará, Brazil. She was the sole woman killed in the Pau D'Arco massacre.",
    contributions:
      "She organized landless peasant workers advocating for constitutional agrarian reform and the right of rural families to cultivate unproductive lands for livelihood and food sovereignty.",
    factualContext:
      "On 24 May 2017, during a police operation on the Fazenda Santa Lúcia (Santa Lúcia estate) in Pau D'Arco, ten rural workers were killed by civil and military police officers in what independent forensic evaluations and federal investigations identified as execution-style shootings.",
    societalImpact:
      "The Pau D'Arco massacre shocked human rights observers worldwide, leading to federal investigations by the Ministério Público Federal (MPF) and criminal indictments against sixteen police officers for homicide, torture, and scene tampering.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "38-year-old president of the Rural Workers' Association of Pau D'Arco, Pará",
      "Sole woman among ten rural workers killed on 24 May 2017 during the Pau D'Arco massacre",
      "Incident occurred on the Fazenda Santa Lúcia estate in Pau D'Arco, Pará",
      "Sixteen police officers were indicted by the Ministério Público Federal (MPF) following forensic investigations",
    ],
    actionableLesson:
      "Agrarian conflict requires peaceful structural redistribution of unproductive lands rather than militarized police clearing operations.",
    coreMessage:
      "Rural workers deserve safety, fair representation, and agrarian justice. Feeding the nation should not cost workers their lives.",
    memorialPublication: {
      title: "Agricultural Worker Occupational Safety & Pesticide Toxicity Prevention",
      focus: "Peasant Health, Occupational Hazards & Agrochemical Safety",
      deliverable: "A health manual on agrochemical toxicity prevention, heat stroke treatment, and first aid for smallholder farmers.",
      initiativeStatus: "Proposed Initiative",
    },
    references: [
      { title: "Ministério Público Federal (MPF) Pará: Denúncia do Massacre de Pau D'Arco (Fazenda Santa Lúcia)", url: "http://www.mpf.mp.br/pa", publisher: "Ministério Público Federal, Brasil", isPrimary: true },
      { title: "HRD Memorial: Jane Júlia de Oliveira Case Profile", url: "https://hrdmemorial.org/hrdrec/jane-julia-de-oliveira/", publisher: "Human Rights Defenders Memorial", isPrimary: true },
      { title: "Comissão Pastoral da Terra (CPT) Massacres Report", url: "https://www.cptnacional.org.br", publisher: "CPT Brasil" },
    ],
  },

  // ── 5. Education, Resistance and the Preservation of Human Dignity ──
  {
    id: 24,
    slug: "anne-frank",
    name: "Anne Frank",
    country: "Germany / Netherlands",
    countryFlag: "🇳🇱",
    category: "education-and-dignity",
    categoryLabel: "Moral Conscience, Youth & Holocaust Memory",
    eraOrYear: "1929–1945",
    roleAndField: "Diarist & Writer · Amsterdam",
    avatarUrl: "https://images.openai.com/static-rsc-4/slUsa81UtdJnEydmHpn3FjBQGl66NY9BpIzDvnpFY-ykEmznmNH2K1laHxHsxw1mnFHP9TI8WntOqjINMCKWe1R96AoQXlTbrmGo1q6qQeZzc7fKPQ9qo56iUNNewdsbVr8Dv-P2Tw0_yfEVFXIqnC4yuzVaKvP16MIFIza3YnY?purpose=inline",
    whoWasThisPerson:
      "A Jewish teenager born in Frankfurt who emigrated with her family to Amsterdam to escape Nazi persecution. Gifted with extraordinary literary sensitivity, wit, and introspection, she dreamed of becoming a published author and journalist.",
    contributions:
      "While hiding in the secret annex of Prinsengracht 263 for over two years, she maintained a diary that captured the universal longing for freedom, goodness, and dignity amidst state-sponsored terror.",
    factualContext:
      "In August 1944, the secret annex was betrayed and raided by the Gestapo. Anne was deported to Auschwitz and subsequently to Bergen-Belsen, where she succumbed to typhus and starvation in early 1945 at just 15 years of age. Research published by the Anne Frank House in 2015 indicates that she and her sister Margot likely died in February 1945, rather than on the post-war official record date of 31 March 1945.",
    societalImpact:
      "Preserved by Miep Gies and published by her father Otto Frank, 'The Diary of a Young Girl' has been translated into more than 70 languages, becoming the most influential youth testimony of the Holocaust and an enduring symbol of empathy.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "Born 12 June 1929 in Frankfurt; hid in secret annex at Prinsengracht 263 from July 1942 to August 1944",
      "Wrote her diary documenting youth, moral conscience, and humanity under totalitarian occupation",
      "Arrested on 4 August 1944; deported via Westerbork to Auschwitz and Bergen-Belsen",
      "The Diary of a Young Girl published in over 70 languages worldwide",
    ],
    disputedFacts: [
      "The exact date of death is unknown: while officially recorded post-war as 31 March 1945, archival research by the Anne Frank House (2015) indicates she and Margot likely died of typhus in February 1945.",
    ],
    actionableLesson:
      "Education, historical remembrance, and early resistance to prejudice are vital barriers against institutional dehumanization and totalitarian bigotry.",
    coreMessage:
      "In spite of everything, human beings possess an innate capacity for good. We must preserve that capacity through education, empathy, and truth.",
    verifiedQuote: {
      quote: "In spite of everything, I still believe that people are really good at heart.",
      source: "The Diary of a Young Girl (Entry dated July 15, 1944)",
    },
    memorialPublication: {
      title: "Psychological Resilience in Youth & Countering Discriminatory Prejudice in Care",
      focus: "Adolescent Mental Health & Anti-Bias Clinical Training",
      deliverable: "An educational guide for pediatric and youth counselors addressing trauma, systemic discrimination, and psychological well-being.",
      initiativeStatus: "Proposed Initiative",
    },
    references: [
      { title: "Anne Frank House: New Research into the Date of Anne Frank's Death (2015)", url: "https://www.annefrank.org/en/anne-frank/depth/date-anne-franks-death/", publisher: "Anne Frank Stichting", isPrimary: true },
      { title: "United States Holocaust Memorial Museum Holocaust Encyclopedia: Anne Frank", url: "https://encyclopedia.ushmm.org/content/en/article/anne-frank", publisher: "USHMM", isPrimary: true },
    ],
  },
  {
    id: 25,
    slug: "sophie-scholl",
    name: "Sophie Scholl",
    country: "Germany",
    countryFlag: "🇩🇪",
    category: "education-and-dignity",
    categoryLabel: "Nonviolent Resistance & Moral Courage",
    eraOrYear: "1921–1943",
    roleAndField: "Biology & Philosophy Student · White Rose Resistance Movement, Munich",
    avatarUrl: "https://images.openai.com/static-rsc-4/-okw98SKGIIH3vohr2babisJhQBUWSZhftBV9NkMKc4uiTcakMTrZ-QwEKbCEBuSe42qkrJPBOf3T7hmjiDUMC0OfwJlnRKlAcqq0oqzTkTeqF7DYzqZcTcWjSBJ10ltJRF7t-Q1CIa9Rl41Pu_IQXzsVAoEoGeQ-Jhd7wFML8c?purpose=inline",
    whoWasThisPerson:
      "A 21-year-old student of biology and philosophy at the University of Munich. Thoughtful, artistically inclined, and deeply ethical, she possessed an unshakeable moral compass that questioned totalitarian conformity.",
    contributions:
      "Alongside her brother Hans and fellow university students, she formed the White Rose (Weiße Rose), authoring and covertly distributing six leaflets that called on the German citizenry to resist Hitler's regime and condemn the extermination of European Jews.",
    factualContext:
      "In February 1943, while distributing leaflets in the atrium of the University of Munich, she and Hans were caught, interrogated by the Gestapo, subjected to a show trial by the People's Court, and executed by guillotine hours later.",
    societalImpact:
      "Her exemplary courage became a worldwide symbol of individual moral responsibility, inspiring civic education programs across modern democratic Germany and the wider world.",
    actionableLesson:
      "Citizens must nurture the courage of conscience to challenge illegal, unconstitutional, or discriminatory directives even when conformity is legally demanded.",
    coreMessage:
      "Stand up for truth even when standing alone. A society without moral courage cannot sustain its humanity.",
    verifiedQuote: {
      quote: "Somebody, after all, had to make a start. What we wrote and said is also believed by many others. They just don't dare to express themselves as we did.",
      source: "Statement to the Court, Munich, February 1943",
    },
    memorialPublication: {
      title: "Conscientious Medical Practice: Standing for Human Dignity Against Coercion",
      focus: "Bioethics & Resistance to Unethical Coercion",
      deliverable: "A bioethics protocol training clinicians and healthcare workers to uphold the Hippocratic Oath when pressured by corrupt authorities.",
    },
    references: [
      { title: "Weiße Rose Stiftung e.V. Historical Archives", url: "https://www.weisse-rose-stiftung.de", publisher: "White Rose Foundation" },
      { title: "Federal Agency for Civic Education (bpb): Sophie Scholl", url: "https://www.bpb.de", publisher: "Bundeszentrale für politische Bildung" },
    ],
  },
  {
    id: 26,
    slug: "qandeel-baloch",
    name: "Qandeel Baloch (Fauzia Azeem)",
    country: "Pakistan",
    countryFlag: "🇵🇰",
    category: "education-and-dignity",
    categoryLabel: "Female Autonomy & Countering So-Called Honour Crimes",
    eraOrYear: "2016",
    roleAndField: "Social Media Personality & Model · Multan",
    avatarUrl: "https://images.openai.com/static-rsc-4/irkVh9y8B19ufkxHmBdU9cE7LBppyS1dFV36Mzelk-faL6umEedVziUw0P8iUhhDtvSgjvsZS-zTSLJeuwWKTkiKBimRqTKFswiGHRdbFeBA-MnxmGS9IwTiyIi6LRrH61Yk2d9cH4FSgFnBwsaNLNiTcVETC0Nxq1V-DTTrD2Q?purpose=inline",
    whoWasThisPerson:
      "A 26-year-old woman from rural Shah Sadar Din in Punjab, Pakistan, who rose from poverty and an abusive early marriage to become Pakistan's first viral social media personality.",
    contributions:
      "She defied patriarchal double standards through bold, irreverent digital videos, using her platform to financially support her parents and challenge the pervasive control exerted over women's bodies and public self-expression.",
    factualContext:
      "In July 2016, she was drugged and strangled in her parents' home in Multan by her brother in a premeditated 'honour killing' after she posted selfies with a senior cleric.",
    societalImpact:
      "Her murder sparked national and international outcry that compelled the Parliament of Pakistan to pass the Anti-Honour Killing Bill, closing the legal loophole that previously allowed perpetrators to be pardoned by family members.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "26-year-old digital creator and model from Shah Sadar Din, Dera Ghazi Khan, Pakistan",
      "Murdered in an 'honour killing' on 15 July 2016 in Multan by her brother Muhammad Waseem",
      "Directly catalyzed the passage of the Anti-Honour Killing Act 2016 by the Parliament of Pakistan",
      "Perpetrator was sentenced to life imprisonment in 2019; acquitted on appeal in 2022 on a legal technicality, which remains appealed to the Supreme Court",
    ],
    actionableLesson:
      "Legal systems must categorically classify honour-based killings as unpardonable murder, eliminating religious or familial pardon mechanisms.",
    coreMessage:
      "No person should face violence for exercising personal freedom and expression. Human worth is not tied to patriarchal concepts of honour.",
    memorialPublication: {
      title: "Gender-Based Violence Prevention & Mental Health Support for Stigmatized Youth",
      focus: "Adolescent Autonomy, Mental Health & Digital Safety",
      deliverable: "An educational guide on recognizing family coercion and providing confidential psychological counseling to youth.",
      initiativeStatus: "Proposed Initiative",
    },
    references: [
      { title: "Criminal Law (Amendment) (Offences in the name or on pretext of Honour) Act, 2016 (Act XLIII of 2016)", url: "http://na.gov.pk/uploads/documents/1477484307_979.pdf", publisher: "National Assembly of Pakistan", isPrimary: true },
      { title: "Human Rights Commission of Pakistan (HRCP) Statements on Honour Killings", url: "https://hrcp-web.org", publisher: "HRCP", isPrimary: true },
      { title: "BBC News: Qandeel Baloch Brother Acquitted of Pakistani Model's Murder", url: "https://www.bbc.com/news/world-asia-60377048", publisher: "BBC News" },
    ],
  },
  {
    id: 27,
    slug: "asifa-bano",
    name: "Asifa Bano",
    country: "India",
    countryFlag: "🇮🇳",
    category: "education-and-dignity",
    categoryLabel: "Universal Child Protection & Marginalized Safeguards",
    eraOrYear: "2010–2018",
    roleAndField: "Child of the Nomadic Bakarwal Community · Jammu and Kashmir",
    avatarUrl: "https://images.openai.com/static-rsc-4/sRW9TmWVIa8KrExWW2RI1gfgdlKDM5r51ryP6DQNQNdJC7fOEYZLrVtwy6l8SPR1uzO0halMKYp8J7cGXGiXCtkpOnpN1ndF0r9BpWp2YElwFUjzUuKJgXyzd7axXqYvecSFkxXPDALNCTDj7w2Eqaxkp1IAE08L7fLUfdKnwH0?purpose=inline",
    whoWasThisPerson:
      "An innocent eight-year-old girl belonging to the nomadic Muslim Bakarwal pastoralist community in Rasana village, Kathua district, Jammu and Kashmir. She loved running outdoors and caring for her family's grazing horses.",
    contributions:
      "Her life awakened the conscience of the nation to the urgent duty of protecting children belonging to nomadic, migrant, and vulnerable communities.",
    factualContext:
      "In January 2018, she was abducted while grazing horses and held captive before being murdered. To ensure an impartial and safe proceeding, the Supreme Court of India transferred the trial to Pathankot, Punjab. In June 2019, the Pathankot Special Court convicted six men (sentencing three to life imprisonment, and three police personnel to five years for evidence destruction).",
    societalImpact:
      "Her ordeal triggered nationwide calls for justice and led the Supreme Court of India to transfer the trial to ensure an impartial proceeding, resulting in landmark convictions and stricter enforcement of child safeguarding standards.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "Eight-year-old child from the nomadic Bakarwal pastoralist community in Kathua, Jammu and Kashmir",
      "Abducted in January 2018, held in captivity, and murdered",
      "Supreme Court of India transferred the trial to Pathankot, Punjab in Mohd. Akhtar v. State of J&K (2018)",
      "Special Court Pathankot convicted six accused in June 2019, sentencing three to life imprisonment and three police officers for tampering with evidence",
    ],
    editorialNotes:
      "Documented under strict child-safeguarding ethics. Identifying details and graphic depictions of violence are excluded in compliance with POCSO principles, Supreme Court directives, and victim dignity.",
    actionableLesson:
      "Child protection mechanisms and POCSO enforcement must be robustly deployed across migratory, tribal, and economically disenfranchised populations without communal bias.",
    coreMessage:
      "Child protection must never depend on a person's religion, background, or economic circumstances. Every child deserves absolute safety.",
    memorialPublication: {
      title: "Trauma-Informed Pediatric Safeguarding & Marginalized Child Healthcare Rights",
      focus: "Pediatric Trauma Care & Child Rights",
      deliverable: "A clinical protocol for pediatricians and primary clinics to identify child sexual abuse and support vulnerable nomadic families.",
      initiativeStatus: "Proposed Initiative",
    },
    references: [
      { title: "Supreme Court of India: Mohd. Akhtar v. State of J&K (2018) 7 SCC 634 (Trial Transfer Order)", url: "https://indiankanoon.org/doc/171542385/", publisher: "Supreme Court of India", isPrimary: true },
      { title: "Special Court Pathankot Judgment (Sessions Trial No. 12/2018, June 2019)", url: "https://districts.ecourts.gov.in", publisher: "Judiciary of Punjab", isPrimary: true },
      { title: "The Hindu: Kathua Rape and Murder Case Court Verdict Timeline", url: "https://www.thehindu.com/news/national/other-states/kathua-rape-murder-case-court-verdict/article27763673.ece", publisher: "The Hindu" },
    ],
  },
  {
    id: 28,
    slug: "yanar-mohammed",
    name: "Yanar Mohammed",
    country: "Iraq",
    countryFlag: "🇮🇶",
    category: "education-and-dignity",
    categoryLabel: "Shelter, Rescue & Anti-Trafficking Advocacy",
    eraOrYear: "1960–2026",
    roleAndField: "Feminist Leader, Architect & Co-Founder · Organization of Women's Freedom in Iraq (OWFI)",
    avatarUrl: "https://images.openai.com/static-rsc-4/zgpCWK2WQITGmD16d4AxmYdhJlQSX_a302ox1gwDGUWY811fjNbhDWNo6el6d1CzgtoRI2KbtxaIj17czofXqLcEz0PZB66AE-T0v_svz-41Xd__FRPmRPBCDdJCpMi5lvzKnUNKoDlotHATEdgucD966GemCRXWx_cb2UsC3J0?purpose=inline",
    whoWasThisPerson:
      "An Iraqi architect and humanitarian feminist who co-founded the Organization of Women's Freedom in Iraq (OWFI) in 2003 and served as its president. She received the prestigious 2016 Rafto Prize for Human Rights.",
    contributions:
      "She constructed a network of underground safe houses across post-war Iraq, sheltering more than 1,000 women escaping honor crimes, trafficking, domestic violence, and ISIS captivity when no state shelters existed.",
    factualContext:
      "Throughout two decades of sectarian conflict and militia threats, she maintained shelter networks at immense personal risk until she was killed on 2 March 2026 in an armed attack at her residence in Baghdad, as documented by Front Line Defenders and Human Rights Watch.",
    societalImpact:
      "Her work demonstrated that humanitarian protection requires tangible infrastructure—safe houses, emergency healthcare, and legal representation—establishing the blueprint for grassroots sanctuary networks in war zones.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "Co-founder and president of the Organization of Women's Freedom in Iraq (OWFI), established in 2003",
      "Constructed emergency safe house networks protecting over 1,000 women and trafficking survivors across Iraq",
      "Recipient of the 2016 Rafto Prize for human rights defense and women's sanctuary",
      "Killed on 2 March 2026 in an armed attack at her home in Baghdad, documented by Front Line Defenders and HRW",
    ],
    actionableLesson:
      "Humanitarian and developmental aid must fund tangible emergency shelters and physical sanctuary networks for victims of gender-based trafficking in conflict zones.",
    coreMessage:
      "Social reform requires practical support systems, not just awareness. When state systems fail to provide shelter, human solidarity must build it.",
    memorialPublication: {
      title: "Safe-House Trauma Recovery & Comprehensive Medical Support for Trafficking Survivors",
      focus: "Sanctuary Design, PSTD Recovery & Complex Trauma Care",
      deliverable: "An operating manual for humanitarian safe houses integrating medical triage, mental health stabilization, and legal protection.",
      initiativeStatus: "Proposed Initiative",
    },
    references: [
      { title: "Front Line Defenders Statement: Killing of Women's Rights Defender Yanar Mohammed in Baghdad (March 2026)", url: "https://www.frontlinedefenders.org", publisher: "Front Line Defenders", isPrimary: true },
      { title: "Rafto Prize 2016 Laureate: Yanar Mohammed", url: "https://www.rafto.no/laureates/yanar-mohammed", publisher: "Rafto Foundation", isPrimary: true },
      { title: "Human Rights Watch: Prominent Iraqi Women's Rights Defender Yanar Mohammed Killed", url: "https://www.hrw.org", publisher: "Human Rights Watch" },
    ],
  },

  // ── 6. Survivors Whose Experiences Became Movements for Change ──
  {
    id: 29,
    slug: "malala-yousafzai",
    name: "Malala Yousafzai",
    country: "Pakistan",
    countryFlag: "🇵🇰",
    category: "survivors",
    categoryLabel: "Girls' Education & Global Peace Leadership",
    eraOrYear: "Living Leader · 2012 Attack Survivor",
    isSurvivor: true,
    roleAndField: "Nobel Peace Prize Laureate, Author & Co-Founder · Malala Fund",
    avatarUrl: "https://images.openai.com/static-rsc-4/WCGdbAlnij8rYEVX1evT4mzxTOJLxBlDZlioqv3H24HeV916nLcfpaXVoBf6yQEUe4XG_LMa6XpRZC6_WcaO_8axwlLB5jOqAT3znyL1RdBuTZIw1oe00F11WCtzk_Lc2M5yPMWtwyX3s67OS5K2mBeX8vsgC6iIfOFBWeITiLw?purpose=inline",
    whoWasThisPerson:
      "Born in Mingora in the Swat Valley of Pakistan, she began writing a BBC Urdu blog at age eleven under the pseudonym Gul Makai, detailing life under Taliban bans on female education. She graduated from the University of Oxford in 2020.",
    contributions:
      "Surviving a targeted attack in October 2012, she co-founded the Malala Fund, advocating globally for 12 years of free, safe, quality education for all girls. In 2014, she became the youngest Nobel Peace Prize laureate in history.",
    factualContext:
      "In October 2012, while traveling home on a school bus after taking an exam in Swat Valley, a masked Taliban gunman boarded the bus and shot her. She survived following emergency neurosurgery in Pakistan and specialized rehabilitation in Birmingham, UK.",
    societalImpact:
      "Her recovery transformed an act of targeted terrorism into a global education crusade, channeling hundreds of millions of dollars into school building, teacher training, and female literacy across developing nations.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "Youngest Nobel Peace Prize laureate in history (2014) and co-founder of the Malala Fund",
      "Wrote BBC Urdu blog at age eleven under pseudonym Gul Makai documenting girls' schooling rights",
      "Survived targeted shooting in October 2012; graduated from Oxford University in 2020",
      "Serves as a United Nations Messenger of Peace focusing on girls' education",
    ],
    actionableLesson:
      "Universal access to 12 years of secondary education for girls is the single most effective investment in global health, economic stability, and poverty reduction.",
    coreMessage:
      "One child, one teacher, one book, and one pen can change the world. Education can help break cycles of inequality and discrimination.",
    verifiedQuote: {
      quote: "One child, one teacher, one book, and one pen can change the world.",
      source: "Address to the United Nations Youth Assembly (July 12, 2013)",
    },
    memorialPublication: {
      title: "Girls' Health Education, Menstrual Literacy & School Health Systems",
      focus: "School Health Infrastructure & Adolescent Female Literacy",
      deliverable: "A comprehensive health education curriculum for community schools addressing adolescent female nutrition, hygiene, and wellness.",
      initiativeStatus: "Proposed Initiative",
    },
    references: [
      { title: "The Nobel Peace Prize 2014: Malala Yousafzai & Kailash Satyarthi", url: "https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/", publisher: "The Nobel Foundation", isPrimary: true },
      { title: "Address to the United Nations Youth Assembly (July 12, 2013)", url: "https://www.un.org/youthenvoy/2013/07/malala-yousafzai-addresses-un-youth-assembly/", publisher: "United Nations", isPrimary: true },
      { title: "Malala Fund Global Education Program and Research", url: "https://malala.org", publisher: "Malala Fund" },
    ],
  },
  {
    id: 30,
    slug: "nadia-murad",
    name: "Nadia Murad",
    country: "Iraq",
    countryFlag: "🇮🇶",
    category: "survivors",
    categoryLabel: "Survivor Advocacy & Eradication of Wartime Sexual Violence",
    eraOrYear: "Living Leader · 2014 Genocide Survivor",
    isSurvivor: true,
    roleAndField: "Nobel Peace Prize Laureate & Founder · Nadia's Initiative",
    avatarUrl: "https://images.openai.com/static-rsc-4/GThx7-3hLZA7dSi9oaT0HRKMfgtiPvUskJqyAEfgGnUtG0Gicqe_McaN_blNbJ07AlwIs4lDo3wa5zQDtvqW_aNT2s0Yh-YY3t0_OT0gafZINwCRK8WZ0nEYg3n2UnptxC3TVeUp6cgnnUJ-C1A2saOsqeK1w6HxVA---iP_pMz52EitMMcJbhep1Jzf1Elu?purpose=inline",
    whoWasThisPerson:
      "A Yazidi human rights defender from the village of Kocho in the Sinjar region of northern Iraq. Prior to the 2014 genocide, she aspired to become a teacher of history or open her own salon.",
    contributions:
      "Following her perilous escape from captivity, she addressed the UN Security Council, authored 'The Last Girl,' and founded Nadia's Initiative, rebuilding schools, healthcare facilities, and water systems in Sinjar. She received the 2018 Nobel Peace Prize alongside Dr. Denis Mukwege.",
    factualContext:
      "In August 2014, ISIS militants invaded Kocho, murdering six of her brothers and her mother in an act of genocide, while taking Nadia and thousands of Yazidi women and girls into captivity. She escaped in November 2014 with the help of a local family.",
    societalImpact:
      "Her testimony led to the creation of the UN Investigative Team to Promote Accountability for Crimes Committed by Da'esh/ISIL (UNITAD), establishing legal accountability and survivor-centered reparations as international norms.",
    verificationStatus: "Verified",
    lastVerifiedAt: "2026-11-06",
    verifiedFacts: [
      "Yazidi human rights advocate and recipient of the 2018 Nobel Peace Prize alongside Dr. Denis Mukwege",
      "Survived the 2014 Sinjar genocide and escaped ISIS captivity in November 2014",
      "Appointed first UNODC Goodwill Ambassador for the Dignity of Survivors of Human Trafficking in 2016",
      "Founded Nadia's Initiative, directly rebuilding healthcare, education, and water infrastructure in Sinjar",
    ],
    actionableLesson:
      "Survivors of conflict-related sexual violence must receive tangible reparations, psychological rehabilitation, and direct leadership roles in rebuilding their devastated homelands.",
    coreMessage:
      "Survivors deserve dignity, rehabilitation, justice, and opportunities to rebuild their lives. Weaponized sexual violence must be recognized and punished as a war crime.",
    verifiedQuote: {
      quote: "I want to be the last girl in the world with a story like mine.",
      source: "Address to the United Nations Security Council (December 2015)",
    },
    memorialPublication: {
      title: "Comprehensive Rehabilitation Protocol for Survivors of Wartime Violence",
      focus: "Trauma Reconstruction & Medical Reparations",
      deliverable: "A clinical and community psychosocial guide for supporting survivors of extreme conflict violence and human trafficking.",
      initiativeStatus: "Proposed Initiative",
    },
    references: [
      { title: "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad", url: "https://www.nobelprize.org/prizes/peace/2018/murad/facts/", publisher: "The Nobel Foundation", isPrimary: true },
      { title: "UN Security Council Resolution 2379 (2017) Establishing UNITAD", url: "https://undocs.org/S/RES/2379(2017)", publisher: "United Nations Security Council", isPrimary: true },
      { title: "Nadia's Initiative: Sinjar Rebuilding and Survivor Advocacy", url: "https://www.nadiasinitiative.org", publisher: "Nadia's Initiative" },
    ],
  },
];

export const SOCIETAL_LESSONS: SocietalLesson[] = [
  {
    theme: "Healthcare Safety",
    whatWeCanImprove: "Secure hospitals, duty rooms, triage de-escalation, and emergency facilities with biometric access controls and protective protocols.",
    actionableInitiatives: [
      "Mandatory secure, locked, well-lit duty rooms for on-call resident doctors and nursing staff",
      "Panic alarms and round-the-clock trained security in casualty and triage zones",
      "Mandatory restraint and police screening for belligerent or intoxicated patients brought under custody",
    ],
    profilesRef: ["Dr. Moumita Debnath", "Aruna Shanbaug", "Dr. Sarita Toshniwal", "Dr. Vandana Das", "Dr. Tamara O'Neal"],
  },
  {
    theme: "Women's Safety",
    whatWeCanImprove: "Better reporting systems, transit infrastructure, prevention, and strict institutional accountability across public and private spaces.",
    actionableInitiatives: [
      "GPS-monitored, well-lit public transit corridors and verified driver credentials",
      "Early education on coercive control and warning signs of domestic intimidation",
      "Independent civic audits of public streets, parks, and night transit stops",
    ],
    profilesRef: ["Jyoti Singh", "Sarah Everard", "Reeva Steenkamp", "Anene Booysen", "Mahsa Amini"],
  },
  {
    theme: "Child Protection",
    whatWeCanImprove: "Accessible safeguarding, early reporting, and timely non-discriminatory intervention regardless of ethnic or economic background.",
    actionableInitiatives: [
      "Universal trauma-informed screening in pediatric and primary care clinics",
      "Safe community recreational spaces and rapid child welfare outreach in marginalized areas",
      "Fast-track judicial resolution with complete child witness protection",
    ],
    profilesRef: ["Asifa Bano", "Anene Booysen", "Anne Frank"],
  },
  {
    theme: "Education & Literacy",
    whatWeCanImprove: "Equal, uninterrupted access to 12 years of quality education and health literacy for every child, especially young girls.",
    actionableInitiatives: [
      "Abolishing economic and infrastructural barriers to secondary school attendance",
      "School-based reproductive, menstrual, and mental health curriculums",
      "Community protection for female educators and students in conservative areas",
    ],
    profilesRef: ["Malala Yousafzai", "Anne Frank", "Sophie Scholl"],
  },
  {
    theme: "Journalism & Truth",
    whatWeCanImprove: "Protect independent reporting, anti-SLAPP legal safeguards, and open public access to vital civic information.",
    actionableInitiatives: [
      "Statutory anti-SLAPP legislation to stop wealthy entities from silencing journalists through predatory litigation",
      "Emergency digital security and evacuation funds for investigative reporters under threat",
      "Universal respect for protective 'PRESS' markings by all state and military security forces",
    ],
    profilesRef: ["Daphne Caruana Galizia", "Anna Politkovskaya", "Veronica Guerin", "Shireen Abu Akleh", "Gauri Lankesh"],
  },
  {
    theme: "Environmental Justice",
    whatWeCanImprove: "Involve local and indigenous communities in all development, land-use, and watershed decisions through meaningful consent.",
    actionableInitiatives: [
      "Mandatory enforcement of Free, Prior, and Informed Consent (FPIC) before concession approvals",
      "Immediate cessation of strategic criminalization and misuse of penal law against peaceful land defenders",
      "Community-led environmental impact monitoring for heavy metal contamination and watershed degradation",
    ],
    profilesRef: ["Berta Cáceres", "Marielle Franco", "Aysin Büyüknohutçu", "Efigenia Vásquez Astudillo", "Emilsen Manyoma", "Leonila Tapdasan Pesadilla", "Laura Leonor Vásquez Pineda", "Jane Júlia de Oliveira"],
  },
  {
    theme: "Human Rights & Dignity",
    whatWeCanImprove: "Ensure equal dignity, bodily autonomy, and equal rights under the law regardless of gender, faith, race, or background.",
    actionableInitiatives: [
      "Decoupling civil rights and public mobility from authoritarian morality policing",
      "Equal access to political representation for marginalized racial and socio-economic groups",
      "Institutional safeguards against religious and caste discrimination in state services",
    ],
    profilesRef: ["Mahsa Amini", "Sophie Scholl", "Marielle Franco", "Qandeel Baloch"],
  },
  {
    theme: "Mental & Social Rehabilitation",
    whatWeCanImprove: "Provide long-term medical, psychosocial, and economic support for survivors and bereaved families.",
    actionableInitiatives: [
      "Community-based sanctuary shelters with integrated medical and legal defense assistance",
      "Specialized trauma therapy for survivors of conflict-related sexual violence and trafficking",
      "Direct survivor-led management of reconstruction and reparations funds",
    ],
    profilesRef: ["Yanar Mohammed", "Nadia Murad", "Malala Yousafzai"],
  },
  {
    theme: "Institutional Justice",
    whatWeCanImprove: "Transparent, independent investigations and expeditious legal processes without corporate or political interference.",
    actionableInitiatives: [
      "Judicial task forces to review workplace security failures across public hospitals",
      "Seizure of unexplained illicit assets derived from criminal enterprises",
      "Zero tolerance for state impunity when officials or police are implicated in violence",
    ],
    profilesRef: ["Dr. Moumita Debnath", "Aruna Shanbaug", "Veronica Guerin", "Sarah Everard"],
  },
  {
    theme: "Community Responsibility",
    whatWeCanImprove: "Encourage people to intervene safely when someone needs help, refusing to remain indifferent to suffering.",
    actionableInitiatives: [
      "Active bystander intervention training in schools, universities, and workplaces",
      "Neighborhood mutual-aid networks for vulnerable individuals facing domestic threats",
      "Cultivating public cultures where empathy is celebrated and indifference is challenged",
    ],
    profilesRef: ["Jyoti Singh", "Anne Frank", "Sophie Scholl", "Reeva Steenkamp"],
  },
];

export const EDITORIAL_PROMISE = [
  "No graphic, sensational, or gratuitous depictions of violence or trauma.",
  "Strict avoidance of sensationalist headlines designed to exploit human tragedy.",
  "No unverified allegations — all historical, judicial, and scientific claims cross-referenced with primary legal and archival records.",
  "Clear distinction between documented biographical facts, judicial findings, and UltimateHealth's proposed advocacy initiatives.",
  "Living survivors (Malala Yousafzai, Nadia Murad) are honored as active leaders with agency, distinct from memorial profiles.",
  "Rigorous privacy protection and non-disclosure of sensitive metadata in compliance with judicial orders (such as Section 73 BNS / 228A IPC).",
  "Explicit tracking of editorial verification status, audit dates, and direct links to primary source documents.",
  "Transparent acknowledgment of disputed or unresolved investigative findings rather than presenting unproven claims as established fact.",
  "No political or communal targeting of any demographic group.",
  "Unconditional dedication to human dignity, truth, and institutional safety for all people.",
];

export const ENDING_MANIFESTO = `The world does not need more memorials alone. It needs more humanity.

Some people wanted to become doctors. Some wanted to educate children. Some wanted to protect forests, report the truth, or give a voice to people who were ignored.

Their lives remind us that behind every name is a person with dreams, relationships, responsibilities and possibilities.

We cannot rewrite their past. But we can make their stories meaningful by improving the systems around us, protecting vulnerable people, supporting education, respecting dignity and refusing to remain indifferent to suffering.

Let us not remember them only for how they left this world. Let us remember what they wanted to contribute to it.`;


// ============================================================================
// PILLAR B: LISTEN — Survivor Voices & Lived Agency
// ============================================================================

export const SURVIVOR_CONSENT_FRAMEWORK = {
  title: "Seven-Step Survivor Consent & Privacy Framework",
  description: "UltimateHealth operates an ethical, trauma-informed publication protocol that respects individual agency, personal autonomy, and unconditional privacy.",
  steps: [
    {
      step: 1,
      title: "Story Submission / Ethical Nomination",
      detail: "Stories are accepted only via confidential, encrypted communication channels or authorized organizational referrals. We do not operate open, unmoderated submission boards.",
    },
    {
      step: 2,
      title: "Initial Editorial & Safety Screening",
      detail: "Our editorial board evaluates each story for human dignity, educational purpose, and safety implications, ensuring disclosure does not create immediate personal danger.",
    },
    {
      step: 3,
      title: "Informed Consent & Identity Selection",
      detail: "Contributors specify their exact preferred public attribution: Full Name, Verified Pseudonym, or Anonymous Community Voice.",
    },
    {
      step: 4,
      title: "Fact-Checking & Legal Corroboration",
      detail: "Biographical dates, organizational initiatives, and public records are corroborated using primary documents without imposing interrogative burdens on the contributor.",
    },
    {
      step: 5,
      title: "Contributor Review of Draft",
      detail: "The contributor reviews the final proposed editorial text and retains absolute veto power over every word, date, and description prior to publication.",
    },
    {
      step: 6,
      title: "Final Editorial Ethics Sign-Off",
      detail: "Final review confirms compliance with our dignity standard: zero sensationalism, zero graphic depictions of violence, and complete omission of sensitive personal metadata.",
    },
    {
      step: 7,
      title: "Ongoing Corrections & Unconditional Withdrawal",
      detail: "Contributors retain the permanent right to update information, amend identity preferences, or request immediate and permanent removal from the initiative at any time.",
    },
  ],
  privacyPledge: [
    "No private phone numbers, residential addresses, or real-time location details are ever recorded or displayed.",
    "No identifying details of family members or minors are disclosed without explicit independent consent.",
    "Lived experiences are never monetized, sensationalized, or utilized for commercial marketing.",
  ],
};

export const SURVIVOR_VOICES: SurvivorVoice[] = [
  {
    id: "malala-yousafzai",
    slug: "malala-yousafzai",
    name: "Malala Yousafzai",
    displayRole: "Nobel Peace Laureate · Co-Founder of Malala Fund",
    country: "Pakistan",
    countryFlag: "🇵🇰",
    eraOrYear: "2012–Present",
    summary: "Survivor of targeted extremist violence who transformed her lived experience into a global movement for free, safe, quality education for girls.",
    livedExperienceAndAdvocacy: "Targeted in October 2012 for writing a BBC Urdu blog and speaking out for girls' schooling in Swat Valley, Pakistan, she survived catastrophic gunshot injuries following emergency neurosurgery. She co-founded the Malala Fund, campaigning internationally to guarantee 12 years of free education for all children and channeling philanthropic investments into schools across Latin America, Africa, and South Asia.",
    societalReformMessage: "Universal access to secondary education for girls is the most transformative intervention for public health, maternal welfare, and poverty reduction worldwide.",
    verifiedQuote: {
      quote: "One child, one teacher, one book, and one pen can change the world.",
      source: "Address before the United Nations Youth Assembly (July 12, 2013)",
    },
    consentProtocol: {
      identityPreference: "Full Public Attribution",
      // Public figure: profile is based only on their own published statements and public records.
      // UltimateHealth has NOT obtained direct consent from this individual.
      consentVerified: false,
      withdrawalPermitted: true,
    },
    references: [
      { title: "The Nobel Peace Prize 2014 Citation: Malala Yousafzai", url: "https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/", publisher: "The Nobel Foundation" },
      { title: "Malala Fund: Girls' Education and Research Reports", url: "https://malala.org", publisher: "Malala Fund" },
    ],
  },
  {
    id: "nadia-murad",
    slug: "nadia-murad",
    name: "Nadia Murad",
    displayRole: "Nobel Peace Laureate · UN Goodwill Ambassador · Founder of Nadia's Initiative",
    country: "Iraq",
    countryFlag: "🇮🇶",
    eraOrYear: "2014–Present",
    summary: "Yazidi human rights advocate who escaped wartime enslavement and led global legal efforts to classify weaponized sexual violence as an international war crime.",
    livedExperienceAndAdvocacy: "In August 2014, ISIS militants invaded her home village of Kocho in Sinjar, murdering her family members and forcing thousands of Yazidi women into violent captivity. Following her perilous escape, she testified before the UN Security Council, authored 'The Last Girl,' and founded Nadia's Initiative, directly rebuilding healthcare centers, schools, and water infrastructure in devastated Sinjar communities.",
    societalReformMessage: "Survivors of conflict-related sexual violence must receive tangible community reparations, trauma-informed psychological healthcare, and direct leadership roles in rebuilding their societies.",
    verifiedQuote: {
      quote: "I want to be the last girl in the world with a story like mine.",
      source: "Address to the United Nations Security Council (December 2015)",
    },
    consentProtocol: {
      identityPreference: "Full Public Attribution",
      // Public figure: profile is based only on their own published statements and public records.
      // UltimateHealth has NOT obtained direct consent from this individual.
      consentVerified: false,
      withdrawalPermitted: true,
    },
    references: [
      { title: "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad", url: "https://www.nobelprize.org/prizes/peace/2018/murad/facts/", publisher: "The Nobel Foundation" },
      { title: "Nadia's Initiative: Sinjar Rebuilding and Survivor Advocacy", url: "https://www.nadiasinitiative.org", publisher: "Nadia's Initiative" },
    ],
  },
];

// ============================================================================
// PILLAR C: RECOGNISE — People Creating Change
// ============================================================================

export const CHANGEMAKERS: Changemaker[] = [
  {
    id: "dr-denis-mukwege",
    slug: "dr-denis-mukwege",
    name: "Dr. Denis Mukwege",
    roleAndField: "Gynecological Surgeon & Humanitarian Physician",
    organization: "Panzi Hospital & Foundation",
    country: "Democratic Republic of Congo",
    countryFlag: "🇨🇩",
    eraOrYear: "1999–Present",
    focusArea: "Reconstructive Trauma Surgery & Holistic Healing for Survivors of Conflict Violence",
    documentedActions: "Founded Panzi Hospital in Bukavu (1999), where he and his staff have treated many thousands of survivors of sexual violence. The hospital's model combines surgical care with psychological, socio-economic and legal support.",
    measurableImpact: "Co-recipient of the 2018 Nobel Peace Prize with Nadia Murad. Co-founded the Global Survivors Fund (2019) with Nadia Murad. [Patient totals pending editorial verification against Panzi Foundation figures.]",
    relevanceToHumanity: "Demonstrates how surgical excellence combined with moral courage can restore human dignity in the midst of protracted humanitarian crises.",
    references: [
      { title: "The Nobel Peace Prize 2018 Citation", url: "https://www.nobelprize.org/prizes/peace/2018/mukwege/facts/", publisher: "The Nobel Foundation" },
      { title: "The Panzi Model of Holistic Healing", url: "https://panzifoundation.org", publisher: "Panzi Foundation" },
    ],
  },
  {
    id: "dr-sunitha-krishnan",
    slug: "dr-sunitha-krishnan",
    name: "Dr. Sunitha Krishnan",
    roleAndField: "Social Reformer & Anti-Trafficking Pioneer",
    organization: "Prajwala",
    country: "India",
    countryFlag: "🇮🇳",
    eraOrYear: "1996–Present",
    focusArea: "Rescue, Rehabilitation & Reintegration of Human Trafficking Survivors",
    documentedActions: "Co-founded Prajwala in Hyderabad in 1996, an organisation working on rescue, rehabilitation and reintegration of survivors of sex trafficking, including shelters, education and vocational training.",
    measurableImpact: "Awarded the Padma Shri by the Government of India in 2016. [Survivor totals and policy contributions pending editorial verification against Prajwala's published reports.]",
    relevanceToHumanity: "Proves that sustainable community rescue requires long-term psychological rehabilitation, vocational self-reliance, and persistent institutional advocacy.",
    references: [
      { title: "Prajwala Institutional Impact Report", url: "https://prajwalaindia.com", publisher: "Prajwala" },
      { title: "Government of India Padma Awards Gazette", url: "https://padmaawards.gov.in", publisher: "Government of India" },
    ],
  },
  {
    id: "dr-abhay-rani-bang",
    slug: "dr-abhay-rani-bang",
    name: "Dr. Abhay & Dr. Rani Bang",
    roleAndField: "Public Health Physicians & Clinical Researchers",
    organization: "SEARCH (Society for Education, Action and Research in Community Health)",
    country: "India",
    countryFlag: "🇮🇳",
    eraOrYear: "1986–Present",
    focusArea: "Home-Based Newborn and Child Care (HBNC) & Rural Healthcare Equity",
    documentedActions: "Working in the remote tribal forests of Gadchiroli, Maharashtra, they pioneered the Home-Based Newborn Care (HBNC) model, training village women (Arogyadoot) to diagnose and manage neonatal sepsis, hypothermia, and low birthweight in home settings.",
    measurableImpact: "Their field trial of home-based neonatal care was published in The Lancet (1999) and reported a substantial reduction in neonatal mortality in the study area. India's national Home-Based Newborn Care programme, delivered through ASHA workers, draws on this approach. [Exact effect sizes pending editorial verification against the original paper.]",
    relevanceToHumanity: "Pioneered decentralized, evidence-based public health that brings life-saving clinical knowledge directly to the most marginalized rural households.",
    references: [
      { title: "The Lancet: Effect of home-based neonatal care on neonatal mortality", url: "https://www.thelancet.com", publisher: "The Lancet" },
      { title: "SEARCH Gadchiroli Field Research and HBNC Architecture", url: "https://searchgadchiroli.org.in", publisher: "SEARCH" },
    ],
  },
];
