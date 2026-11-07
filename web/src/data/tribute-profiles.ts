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
      "id": 1,
      "slug": "aruna-shanbaug",
      "name": "Aruna Shanbaug",
      "country": "India",
      "countryFlag": "🇮🇳",
      "category": "healthcare",
      "categoryLabel": "Healthcare Ethics & Nursing Dignity",
      "eraOrYear": "1948–2015",
      "roleAndField": "Staff Nurse · King Edward Memorial (KEM) Hospital, Mumbai",
      "avatarUrl": "https://images.openai.com/static-rsc-4/bEkHZq8tlmEVDlWf0AtrWa1IJz9nUsL0PLkkx0mJNud9itRRtfKkb-8Q9gTdVOgYSchOJ3_i21FGiPD0IAC6A4n1k-MAgBWK4FmRStyYyayReuSD0k9pr8_V7YanoRqVnK03NHQ7FCA90lUQNm9A4WJX7xvrUfNSXE12PGEypFg?purpose=inline",
      "verificationStatus": "Historically Verified",
      "lastVerifiedAt": "2026-11-07",
      "coreMessage": "Healthcare workers deserve safe working environments, and long-term patient care must preserve human dignity, compassion and individual rights at every stage of life.",
      "whoWasThisPerson": "Born on 1 June 1948 in Haldipur, Karnataka, Aruna Shanbaug was a staff nurse at King Edward Memorial (KEM) Hospital in Mumbai.\nShe was known among her colleagues for her professional commitment to nursing and was engaged to be married at the time of the attack that changed the course of her life.",
      "contributions": "Before the attack, Aruna worked in frontline public healthcare, caring for patients as part of her professional responsibilities at KEM Hospital.\nHer subsequent case became a significant milestone in India's legal and ethical discussions surrounding patient dignity, medical decision-making and end-of-life care.\nThe dedication of successive generations of KEM Hospital nursing staff, who cared for her for more than four decades, remains an important part of her legacy.",
      "factualContext": "On 27 November 1973, while on duty at KEM Hospital, Aruna was sexually assaulted and strangled using a dog chain by a hospital sweeper. The assault caused severe oxygen deprivation to her brain, resulting in permanent neurological damage.\nShe subsequently remained in a severely impaired neurological state, later assessed by a Supreme Court-appointed medical team as meeting most criteria for a permanent vegetative state.\nFor approximately 41 years and six months, she received continuous care from KEM Hospital's nursing and medical staff.\nIn May 2015, she developed severe pneumonia and was admitted to intensive care. She suffered a cardiac arrest and died on 18 May 2015 at KEM Hospital, aged 66.",
      "verifiedFacts": [
          "Birth: 1 June 1948, Haldipur, Karnataka.",
          "Profession: Staff Nurse at KEM Hospital, Mumbai.",
          "Attack: 27 November 1973, resulting in severe brain injury due to oxygen deprivation.",
          "Medical condition: Persistent vegetative state, with findings documented by a Supreme Court-appointed medical team.",
          "Duration of care: Approximately 41 years and six months.",
          "Death: 18 May 2015, following severe pneumonia and cardiac arrest.",
          "Age at death: 66 years."
      ],
      "societalImpact": "2011 — Aruna Ramchandra Shanbaug v. Union of India, (2011) 4 SCC 454\nOn 7 March 2011, the Supreme Court of India delivered a landmark judgment concerning passive euthanasia.\nThe Court rejected the petition seeking withdrawal of Aruna's life-sustaining feeding, respecting the position of KEM Hospital's nursing staff, who wished to continue caring for her.\nHowever, the judgment recognised a procedure for passive euthanasia under strict judicial safeguards, including High Court oversight.\n\n2018 — Common Cause v. Union of India, (2018) 5 SCC 1\nOn 9 March 2018, a separate five-judge Constitution Bench of the Supreme Court recognised advance medical directives (living wills) and established procedures for their implementation.\nThis was a subsequent legal milestone, distinct from the 2011 Shanbaug judgment.\n\nTogether, these cases became important milestones in India's legal discussion of patient autonomy, medical ethics and end-of-life decision-making.",
      "actionableLesson": "Healthcare institutions should prioritise both workplace security and the dignity of patients receiving long-term medical care.\n\nHealthcare Workplace Safety:\n• Ensure appropriate security coverage across hospital corridors and restricted clinical areas.\n• Establish emergency response mechanisms for night-shift personnel.\n• Conduct regular workplace safety assessments.\n• Provide confidential incident-reporting mechanisms and institutional accountability.\n\nLong-Term Patient Dignity:\n• Ensure individualised medical assessment and appropriate nursing care.\n• Respect patient rights and applicable medical decision-making procedures.\n• Maintain transparent communication with families and caregivers.\n• Follow evidence-based clinical and ethical standards for long-term neurological care.",
      "memorialPublication": {
          "title": "Long-Term Patient Dignity & Healthcare Workplace Safety Initiative",
          "focus": "Medical Ethics, Long-Term Care and Healthcare Worker Safety",
          "initiativeStatus": "Proposed Initiative",
          "deliverable": "A proposed initiative inspired by Aruna's experience, addressing two interconnected responsibilities:\n\nA. Long-Term Patient Care\n• Respectful nursing and personal care.\n• Individualised clinical assessment and treatment decisions.\n• Ethical end-of-life decision-making.\n• Appropriate family involvement and medical oversight.\n\nB. Healthcare Workplace Safety\n• Night-shift workplace security standards.\n• Restricted-area access controls.\n• Emergency response and incident-reporting mechanisms.\n• Regular institutional safety assessments.\n\nThis is a proposed social and institutional initiative by UltimateHealth, not an existing clinical protocol or a claim that these measures were directly introduced through the Shanbaug judgment."
      },
      "references": [
          {
              "title": "Aruna Ramchandra Shanbaug v. Union of India (2011), (2011) 4 SCC 454 — Supreme Court of India",
              "url": "https://indiankanoon.org/doc/1359740/",
              "publisher": "Supreme Court of India",
              "isPrimary": true
          },
          {
              "title": "Common Cause v. Union of India (2018), (2018) 5 SCC 1 — Advance Medical Directives and Passive Euthanasia",
              "url": "https://indiankanoon.org/doc/184449972/",
              "publisher": "Supreme Court of India",
              "isPrimary": true
          },
          {
              "title": "BBC News — Aruna Shanbaug: The Story of a Brain-Damaged Indian Nurse",
              "url": "https://www.bbc.com/news/world-asia-india-32776897",
              "publisher": "BBC News"
          },
          {
              "title": "The Indian Express — Reporting on Aruna Shanbaug's death and final days",
              "url": "https://indianexpress.com/article/cities/mumbai/against-mercy-death-kem-remembers-aruna-as-she-was/",
              "publisher": "The Indian Express"
          },
          {
              "title": "The Times of India — KEM nurses remember Aruna",
              "url": "https://timesofindia.indiatimes.com/city/mumbai/year-on-kem-nurses-still-miss-aruna-feel-sense-of-emptiness/articleshow/52316161.cms",
              "publisher": "The Times of India"
          }
      ],
      "translations": {
          "hi": {
              "name": "अरुणा शानबाग",
              "roleAndField": "स्टाफ नर्स · किंग एडवर्ड मेमोरियल (केईएम) अस्पताल, मुंबई",
              "categoryLabel": "स्वास्थ्य सेवा नैतिकता एवं नर्सिंग गरिमा",
              "coreMessage": "स्वास्थ्य सेवा कर्मियों को सुरक्षित कार्य वातावरण मिलना चाहिए, और दीर्घकालिक रोगी देखभाल में जीवन के हर चरण में मानवीय गरिमा, करुणा और व्यक्तिगत अधिकारों की रक्षा होनी चाहिए।",
              "whoWasThisPerson": "1 जून 1948 को कर्नाटक के हल्दीपुर में जन्मी अरुणा शानबाग मुंबई के किंग एडवर्ड मेमोरियल (केईएम) अस्पताल में एक स्टाफ नर्स थीं।\nवे अपने सहयोगियों के बीच नर्सिंग के प्रति अपनी पेशेवर प्रतिबद्धता के लिए जानी जाती थीं और उस हमले के समय उनका विवाह तय हो चुका था जिसने उनके जीवन की दिशा बदल दी।",
              "contributions": "हमले से पहले, अरुणा ने केईएम अस्पताल में अपनी पेशेवर जिम्मेदारियों के हिस्से के रूप में रोगियों की देखभाल करते हुए अग्रिम पंक्ति की सार्वजनिक स्वास्थ्य सेवा में काम किया।\nउनका मामला आगे चलकर रोगी की गरिमा, चिकित्सा निर्णय लेने और जीवन के अंतिम क्षणों की देखभाल से जुड़ी भारत की कानूनी और नैतिक चर्चाओं में एक महत्वपूर्ण मील का पत्थर बन गया।\nकेईएम अस्पताल के नर्सिंग स्टाफ की लगातार पीढ़ियों का समर्पण, जिन्होंने चार दशकों से अधिक समय तक उनकी देखभाल की, उनकी विरासत का एक महत्वपूर्ण हिस्सा बना हुआ है।",
              "factualContext": "27 नवंबर 1973 को केईएम अस्पताल में ड्यूटी के दौरान, अस्पताल के एक सफाईकर्मी ने अरुणा पर हमला किया और कुत्ते की जंजीर से उनका गला घोंट दिया। इस हमले से उनके मस्तिष्क में ऑक्सीजन की गंभीर कमी हो गई, जिसके परिणामस्वरूप स्थायी तंत्रिका क्षति हुई।\nइसके बाद वे गंभीर रूप से दुर्बल तंत्रिका संबंधी स्थिति में रहीं, जिसका बाद में सुप्रीम कोर्ट द्वारा नियुक्त मेडिकल टीम ने मूल्यांकन किया और पाया कि वे स्थायी वानस्पतिक अवस्था (PVS) के अधिकांश मानदंडों को पूरा करती हैं।\nलगभग 41 वर्ष और छह महीने तक, उन्हें केईएम अस्पताल के नर्सिंग और मेडिकल स्टाफ से निरंतर देखभाल मिली।\nमई 2015 में, उन्हें गंभीर निमोनिया हो गया और उन्हें गहन चिकित्सा इकाई (ICU) में भर्ती कराया गया। कार्डियक अरेस्ट के बाद 18 मई 2015 को 66 वर्ष की आयु में केईएम अस्पताल में उनका निधन हो गया।",
              "verifiedFacts": [
                  "जन्म: 1 जून 1948, हल्दीपुर, कर्नाटक।",
                  "पेशा: स्टाफ नर्स, केईएम अस्पताल, मुंबई।",
                  "हमला: 27 नवंबर 1973, ऑक्सीजन की कमी से मस्तिष्क को गंभीर क्षति।",
                  "चिकित्सा स्थिति: स्थायी वानस्पतिक अवस्था (PVS), सुप्रीम कोर्ट की मेडिकल टीम द्वारा प्रलेखित।",
                  "देखभाल की अवधि: लगभग 41 वर्ष और छह महीने।",
                  "निधन: 18 मई 2015, गंभीर निमोनिया और कार्डियक अरेस्ट के बाद।",
                  "मृत्यु के समय आयु: 66 वर्ष।"
              ],
              "societalImpact": "2011 — अरुणा रामचंद्र शानबाग बनाम भारत संघ, (2011) 4 SCC 454\n7 मार्च 2011 को, भारत के सर्वोच्च न्यायालय ने पैसिव इच्छामृत्यु (पैसिव यूथेनेशिया) के संबंध में एक ऐतिहासिक निर्णय सुनाया।\nन्यायालय ने अरुणा के जीवन-रक्षक आहार को रोकने की याचिका को खारिज कर दिया और केईएम अस्पताल के नर्सिंग स्टाफ के रुख का सम्मान किया, जो उनकी देखभाल जारी रखना चाहते थे।\nहालांकि, फैसले ने उच्च न्यायालय की निगरानी सहित सख्त न्यायिक सुरक्षा उपायों के तहत पैसिव इच्छामृत्यु की प्रक्रिया को मान्यता दी।\n\n2018 — कॉमन कॉज़ बनाम भारत संघ, (2018) 5 SCC 1\n9 मार्च 2018 को, सर्वोच्च न्यायालय की पांच-न्यायाधीशों की संविधान पीठ ने अग्रिम चिकित्सा निर्देशों (लिविंग विल्स) को कानूनी मान्यता दी और उनके कार्यान्वयन की प्रक्रिया स्थापित की।\nयह 2011 के शानबाग फैसले से अलग एक बाद का कानूनी मील का पत्थर था।\n\nसाथ मिलकर, ये मामले रोगी की स्वायत्तता, चिकित्सा नैतिकता और जीवन के अंत के निर्णयों पर भारत की कानूनी चर्चा के ऐतिहासिक आधार बने।",
              "actionableLesson": "स्वास्थ्य सेवा संस्थानों को कार्यस्थल सुरक्षा और दीर्घकालिक चिकित्सा देखभाल प्राप्त करने वाले रोगियों की गरिमा दोनों को प्राथमिकता देनी चाहिए।\n\nस्वास्थ्य सेवा कार्यस्थल सुरक्षा:\n• अस्पताल के गलियारों और प्रतिबंधित नैदानिक क्षेत्रों में उचित सुरक्षा कवरेज सुनिश्चित करें।\n• रात्रि पाली के कर्मियों के लिए आपातकालीन प्रतिक्रिया तंत्र स्थापित करें।\n• नियमित कार्यस्थल सुरक्षा मूल्यांकन आयोजित करें।\n• गोपनीय घटना-रिपोर्टिंग तंत्र और संस्थागत जवाबदेही प्रदान करें।\n\nदीर्घकालिक रोगी गरिमा:\n• व्यक्तिगत चिकित्सा मूल्यांकन और उचित नर्सिंग देखभाल सुनिश्चित करें।\n• रोगी के अधिकारों और लागू चिकित्सा निर्णय प्रक्रियाओं का सम्मान करें।\n• परिवारों और देखभाल करने वालों के साथ पारदर्शी संवाद बनाए रखें।\n• दीर्घकालिक तंत्रिका संबंधी देखभाल के लिए साक्ष्य-आधारित नैदानिक और नैतिक मानकों का पालन करें।",
              "memorialPublication": {
                  "title": "दीर्घकालिक रोगी गरिमा एवं स्वास्थ्य सेवा कार्यस्थल सुरक्षा पहल",
                  "focus": "चिकित्सा नैतिकता, दीर्घकालिक देखभाल एवं स्वास्थ्य सेवा कर्मी सुरक्षा",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "अरुणा के अनुभव से प्रेरित एक प्रस्तावित पहल, जो दो परस्पर जुड़ी जिम्मेदारियों को संबोधित करती है:\n\nA. दीर्घकालिक रोगी देखभाल\n• सम्मानजनक नर्सिंग और व्यक्तिगत देखभाल।\n• व्यक्तिगत नैदानिक मूल्यांकन और उपचार निर्णय।\n• नैतिक अंत-जीवन निर्णय लेना।\n• उचित पारिवारिक भागीदारी और चिकित्सा निरीक्षण।\n\nB. स्वास्थ्य सेवा कार्यस्थल सुरक्षा\n• रात्रि पाली कार्यस्थल सुरक्षा मानक।\n• प्रतिबंधित क्षेत्र पहुंच नियंत्रण।\n• आपातकालीन प्रतिक्रिया और घटना रिपोर्टिंग तंत्र।\n• नियमित संस्थागत सुरक्षा मूल्यांकन।\n\nयह अल्टीमेटहेल्थ द्वारा एक प्रस्तावित सामाजिक और संस्थागत पहल है, न कि कोई मौजूदा नैदानिक प्रोटोकॉल या दावा कि ये उपाय सीधे शानबाग फैसले से शुरू किए गए थे।"
              }
          },
          "bn": {
              "name": "অরুণা শানবাগ",
              "roleAndField": "স্টাফ নার্স · কিং এডওয়ার্ড মেমোরিয়াল (কেইএম) হাসপাতাল, মুম্বই",
              "categoryLabel": "স্বাস্থ্যসেবা নীতি ও নার্সিং মর্যাদা",
              "coreMessage": "স্বাস্থ্যসেবা কর্মীদের নিরাপদ কর্মপরিবেশ প্রাপ্য, এবং দীর্ঘমেয়াদী রোগীর সেবায় জীবনের প্রতিটি পর্যায়ে মানবিক মর্যাদা, সহানুভূতি ও ব্যক্তিগত অধিকার রক্ষা করতে হবে।",
              "whoWasThisPerson": "১৯৪৮ সালের ১ জুন কর্ণাটকের হালদিপুরে জন্মগ্রহণকারী অরুণা শানবাগ মুম্বইয়ের কিং এডওয়ার্ড মেমোরিয়াল (কেইএম) হাসপাতালের একজন স্টাফ নার্স ছিলেন।\nতিনি সহকর্মীদের মধ্যে নার্সিং সেবায় নিষ্ঠার জন্য পরিচিত ছিলেন এবং যে বর্বর হামলার শিকার হয়ে তার জীবন বদলে যায়, সে সময় তিনি বিবাহবন্ধনে আবদ্ধ হতে যাচ্ছিলেন।",
              "contributions": "আক্রমণের পূর্বে অরুণা কেইএম হাসপাতালে ফ্রন্টলাইন জনস্বাস্থ্য সেবায় রোগীদের যত্ন নিতেন।\nপরবর্তীতে তার মামলাটি রোগীর মর্যাদা, চিকিৎসা সংক্রান্ত সিদ্ধান্ত গ্রহণ এবং জীবনের অন্তিম মুহূর্তের শুশ্রূষা বিষয়ক ভারতের আইনি ও নৈতিক আলোচনায় একটি ঐতিহাসিক মাইলফলক হয়ে ওঠে।\nচার দশকেরও বেশি সময় ধরে কেইএম হাসপাতালের নার্সদের প্রজন্মের পর প্রজন্ম যেভাবে তার সেবা করে গেছেন, তা তার স্মৃতির এক অবিচ্ছেদ্য অংশ।",
              "factualContext": "১৯৭৩ সালের ২৭ নভেম্বর কেইএম হাসপাতালে দায়িত্ব পালনকালে এক হাসপাতাল কর্মী অরুণার ওপর পাশবিক অত্যাচার চালায় এবং কুকুরের শিকল দিয়ে শ্বাসরোধ করে। এতে তার মস্তিষ্কে অক্সিজেনের তীব্র ঘাটতি দেখা দেয় এবং স্থায়ী স্নায়বিক ক্ষতি হয়।\nপরবর্তীতে তিনি স্থায়ী সংজ্ঞাহীন অবস্থায় (PVS) থাকেন, যা সুপ্রিম কোর্ট নিযুক্ত মেডিকেল টিম দ্বারা নথিভুক্ত করা হয়।\nপ্রায় ৪১ বছর ছয় মাস কেইএম হাসপাতালের নার্স ও চিকিৎসকরা নিরবচ্ছিন্নভাবে তার সেবা করেন।\n২০১৫ সালের মে মাসে তীব্র নিউমোনিয়ায় আক্রান্ত হয়ে সিসিইউতে চিকিৎসাধীন অবস্থায় ১৮ মে ২০১৫ তারিখে ৬৬ বছর বয়সে কেইএম হাসপাতালে তিনি শেষ নিঃশ্বাস ত্যাগ করেন।",
              "verifiedFacts": [
                  "জন্ম: ১ জুন ১৯৪৮, হালদিপুর, কর্ণাটক।",
                  "পেশা: স্টাফ নার্স, কেইএম হাসপাতাল, মুম্বই।",
                  "আক্রমণ: ২৭ নভেম্বর ১৯৭৩, অক্সিজেনের অভাবে মস্তিষ্কে স্থায়ী স্নায়বিক ক্ষতি।",
                  "চিকিৎসা অবস্থা: স্থায়ী সংজ্ঞাহীন অবস্থা (PVS), সুপ্রিম কোর্টের মেডিকেল টিম কর্তৃক প্রমাণিত।",
                  "সেবার মেয়াদ: প্রায় ৪১ বছর ছয় মাস।",
                  "মৃত্যু: ১৮ মে ২০১৫, তীব্র নিউমোনিয়া ও কার্ডিয়াক অ্যারেস্টে।",
                  "মৃত্যুকালে বয়স: ৬৬ বছর।"
              ],
              "societalImpact": "২০১১ — অরুণা রামচন্দ্র শানবাগ বনাম ভারত রাষ্ট্র, (২০১১) 4 SCC 454\n২০১১ সালের ৭ মার্চ ভারতের সুপ্রিম কোর্ট নিষ্ক্রিয় ইচ্ছামৃত্যু (প্যাসিভ ইউথানেশিয়া) সংক্রান্ত ঐতিহাসিক রায় প্রদান করে।\nআদালত অরুণার জীবনদায়ী খাদ্য সরবরাহ বন্ধের আবেদন প্রত্যাখ্যান করে কেইএম হাসপাতালের নার্সদের সেবার ইচ্ছাকে সম্মান জানায়।\nতবে রায়ে কঠোর বিচারিক সুরক্ষার অধীনে নিষ্ক্রিয় ইচ্ছামৃত্যুর নীতিমালা স্বীকৃতি পায়।\n\n২০১৮ — কমন কজ বনাম ভারত রাষ্ট্র, (২০১৮) 5 SCC 1\n২০১৮ সালের ৯ মার্চ সুপ্রিম কোর্টের ৫ বিচারপতির সংবিধান বেঞ্চ আগাম চিকিৎসা নির্দেশিকা (লিভিং উইল) স্বীকৃতি দেয়।\nএটি ২০১১ সালের মামলার পরবর্তী একটি পৃথক আইনি মাইলফলক।\n\nএকত্রে এই রায় দুটি রোগীর স্বায়ত্তশাসন ও চিকিৎসা নীতিশাস্ত্রে ভারতের আইনের ভিত্তি স্থাপন করে।",
              "actionableLesson": "স্বাস্থ্য প্রতিষ্ঠানগুলোকে কর্মক্ষেত্রের নিরাপত্তা এবং দীর্ঘমেয়াদী রোগীদের মর্যাদা উভয়কেই অগ্রাধিকার দিতে হবে।\n\nস্বাস্থ্যসেবা কর্মীদের কর্মক্ষেত্রের নিরাপত্তা:\n• হাসপাতালের করিডোর ও সংরক্ষিত ওয়ার্ডে উপযুক্ত নিরাপত্তা ব্যবস্থা নিশ্চিত করা।\n• নাইট শিফটের কর্মীদের জন্য জরুরি সহায়তা ব্যবস্থা গড়ে তোলা।\n• নিয়মিত নিরাপত্তা মূল্যায়ন ও গোপনীয় অভিযোগ জানানোর ব্যবস্থা রাখা।\n\nদীর্ঘমেয়াদী রোগীর মর্যাদা:\n• ব্যক্তিগত চিকিৎসা মূল্যায়ন ও উপযুক্ত নার্সিং কেয়ার নিশ্চিত করা।\n• রোগীর অধিকার ও নৈতিক চিকিৎসা মানদণ্ড কঠোরভাবে অনুসরণ করা।",
              "memorialPublication": {
                  "title": "দীর্ঘমেয়াদী রোগীর মর্যাদা ও স্বাস্থ্যসেবা কর্মক্ষেত্রের নিরাপত্তা উদ্যোগ",
                  "focus": "চিকিৎসা নীতিশাস্ত্র, দীর্ঘমেয়াদী যত্ন ও স্বাস্থ্যকর্মী সুরক্ষা",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "অরুণার জীবন থেকে অনুপ্রাণিত হয়ে দীর্ঘমেয়াদী রোগীর মানবিক শুশ্রূষা এবং চিকিৎসাকর্মীদের নৈশকালীন নিরাপত্তা নিশ্চিত করার একটি সমন্বিত প্রস্তাবনা।"
              }
          },
          "ta": {
              "name": "அருணா ஷான்பாக்",
              "roleAndField": "பணி செவிலியர் · கிங் எட்வர்ட் மெமோரியல் (KEM) மருத்துவமனை, மும்பை",
              "categoryLabel": "சுகாதார நெறிமுறைகள் & செவிலியர் கண்ணியம்",
              "coreMessage": "சுகாதாரப் பணியாளர்களுக்குப் பாதுகாப்பான பணிச்சூழல் அவசியமானது; மேலும் நீண்டகால நோயாளிப் பராமரிப்பு வாழ்வின் ஒவ்வொரு கட்டத்திலும் மனித கண்ணியம், இரக்கம் மற்றும் தனிநபர் உரிமைகளைப் பாதுகாக்க வேண்டும்.",
              "whoWasThisPerson": "ஜூன் 1, 1948 இல் கர்நாடகாவின் ஹல்திபூரில் பிறந்த அருணா ஷான்பாக், மும்பையில் உள்ள கே.இ.எம் மருத்துவமனையில் பணி செவிலியராகப் பணியாற்றினார்.\nசக ஊழியர்களால் போற்றப்பட்ட அவர், அவரது வாழ்க்கையை மாற்றிய தாக்குதலின் போது திருமண நிச்சயிக்கப்பட்டிருந்தார்.",
              "contributions": "தாக்குதலுக்கு முன்பு, அருணா கே.இ.எம் மருத்துவமனையில் தீவிர பொது சுகாதாரப் பிரிவில் நோயாளிகளுக்குப் பரிவோடு சேவை செய்தார்.\nஅவரது வழக்கு இந்தியாவின் நோயாளி கண்ணியம் மற்றும் மருத்துவ முடிவெடுக்கும் நெறிமுறைகளில் ஒரு வரலாற்று மைல்கல்லாக மாறியது.\nநான்கு தசாப்தங்களுக்கும் மேலாக அவரைப் பராமரித்த கே.இ.எம் மருத்துவமனை செவிலியர்களின் அர்ப்பணிப்பு அவரது நினைவின் முக்கிய பகுதியாகும்.",
              "factualContext": "நவம்பர் 27, 1973 அன்று, கே.இ.எம் மருத்துவமனையில் பணியில் இருந்தபோது, அருணா தாக்கப்பட்டுக் கழுத்து நெரிக்கப்பட்டார். இதனால் மூளைக்கு ஆக்சிஜன் தடைபட்டு நிரந்தர நரம்பியல் பாதிப்பு ஏற்பட்டது.\nசுமார் 41 ஆண்டுகள் ஆறு மாதங்கள் அவர் கே.இ.எம் மருத்துவமனை ஊழியர்களின் தொடர் கவனிப்பில் இருந்தார்.\nமே 18, 2015 அன்று தீவிர நிமோனியா மற்றும் மாரடைப்பால் தனது 66வது வயதில் காலமானார்.",
              "verifiedFacts": [
                  "பிறப்பு: ஜூன் 1, 1948, ஹல்திபூர், கர்நாடகா.",
                  "பணி: செவிலியர், கே.இ.எம் மருத்துவமனை, மும்பை.",
                  "தாக்குதல்: நவம்பர் 27, 1973, மூளைக்கு ஆக்சிஜன் இழப்பு.",
                  "மருத்துவ நிலை: நிரந்தர உணர்வற்ற நிலை (PVS).",
                  "பராமரிப்பு காலம்: சுமார் 41 ஆண்டுகள் 6 மாதங்கள்.",
                  "மறைவு: மே 18, 2015, வயது 66."
              ],
              "societalImpact": "2011 அருணா ஷான்பாக் வழக்கு மற்றும் 2018 காமன் காஸ் வழக்கின் மூலம் உச்சநீதிமன்றம் இந்தியாவில் செயலற்ற கருணைக்கொலை மற்றும் வாழும் உயில் (Living Wills) குறித்த வரலாற்றுச் சிறப்புமிக்க சட்ட விதிகளை வகுத்தது.",
              "actionableLesson": "மருத்துவமனைகளில் இரவுப் பணி ஊழியர்களின் பாதுகாப்பு மற்றும் நீண்டகால நோயாளிகளின் மனித கண்ணியத்தைப் பேணுதல் ஆகியவற்றை நிறுவனங்கள் உறுதிப்படுத்த வேண்டும்.",
              "memorialPublication": {
                  "title": "நீண்டகால நோயாளி கண்ணியம் & சுகாதாரப் பணியாளர் பாதுகாப்பு முன்முயற்சி",
                  "focus": "மருத்துவ நெறிமுறைகள் & பணியிட பாதுகாப்பு",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "நீண்டகால நோயாளிகளின் கண்ணியமான பராமரிப்பு மற்றும் மருத்துவப் பணியாளர்களின் இரவு நேரப் பாதுகாப்பை உறுதி செய்யும் சமூக முன்முயற்சி."
              }
          },
          "or": {
              "name": "ଅରୁଣା ଶାନବାଗ",
              "roleAndField": "ଷ୍ଟାଫ୍ ନର୍ସ · କିଙ୍ଗ୍ ଏଡୱାର୍ଡ ମେମୋରିଆଲ୍ (KEM) ହସ୍ପିଟାଲ, ମୁମ୍ବାଇ",
              "categoryLabel": "ସ୍ୱାସ୍ଥ୍ୟସେବା ନୈତିକତା ଏବଂ ନର୍ସିଂ ମର୍ଯ୍ୟାଦା",
              "coreMessage": "ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀମାନଙ୍କୁ ସୁରକ୍ଷିତ କାର୍ଯ୍ୟ ପରିବେଶ ମିଳିବା ଉଚିତ ଏବଂ ଦୀର୍ଘକାଳୀନ ରୋଗୀ ସେବାରେ ପ୍ରତ୍ୟେକ ପର୍ଯ୍ୟାୟରେ ମାନବୀୟ ମର୍ଯ୍ୟାଦା, ସହାନୁଭୂତି ଓ ବ୍ୟକ୍ତିଗତ ଅଧିକାରକୁ ସୁରକ୍ଷା ଦିଆଯିବା ଆବଶ୍ୟକ।",
              "whoWasThisPerson": "୧ ଜୁନ୍ ୧୯୪୮ ରେ କର୍ଣ୍ଣାଟକର ହାଲଦିପୁରରେ ଜନ୍ମିତ ଅରୁଣା ଶାନବାଗ ମୁମ୍ବାଇର KEM ହସ୍ପିଟାଲରେ ଜଣେ କର୍ତ୍ତବ୍ୟନିଷ୍ଠ ଷ୍ଟାଫ୍ ନର୍ସ ଥିଲେ।",
              "contributions": "ଅରୁଣା KEM ହସ୍ପିଟାଲରେ ରୋଗୀମାନଙ୍କ ନିଷ୍ଠାପର ସେବା କରିଥିଲେ। ତାଙ୍କ ମାମଲା ପରବର୍ତ୍ତୀ ସମୟରେ ଭାରତର ଚିକିତ୍ସା ନୈତିକତା ଏବଂ ରୋଗୀ ମର୍ଯ୍ୟାଦା କ୍ଷେତ୍ରରେ ଏକ ଐତିହାସିକ ମାଇଲଖୁଣ୍ଟ ସାବ୍ୟସ୍ତ ହୋଇଥିଲା।",
              "factualContext": "୨୭ ନଭେମ୍ବର ୧୯୭୩ ରେ କର୍ତ୍ତବ୍ୟରତ ଥିବା ବେଳେ ତାଙ୍କ ଉପରେ ହୋଇଥିବା ଆକ୍ରମଣ ଯୋଗୁଁ ମସ୍ତିଷ୍କରେ ଅମ୍ଳଜାନ ଅଭାବରୁ ସେ ସ୍ଥାୟୀ ନିଷ୍କ୍ରିୟ ଅବସ୍ଥା (PVS) ରେ ରହିଥିଲେ। ପ୍ରାୟ ୪୧ ବର୍ଷ ୬ ମାସ KEM ନର୍ସମାନଙ୍କ ଯତ୍ନ ପରେ ୧୮ ମଇ ୨୦୧୫ ରେ ୬୬ ବର୍ଷ ବୟସରେ ତାଙ୍କର ଦେହାନ୍ତ ହୋଇଥିଲା।",
              "verifiedFacts": [
                  "ଜନ୍ମ: ୧ ଜୁନ୍ ୧୯୪୮, ହାଲଦିପୁର, କର୍ଣ୍ଣାଟକ।",
                  "ପେଶା: ଷ୍ଟାଫ୍ ନର୍ସ, KEM ହସ୍ପିଟାଲ, ମୁମ୍ବାଇ।",
                  "ସେବା ଯତ୍ନ ଅବଧି: ପ୍ରାୟ ୪୧ ବର୍ଷ ୬ ମାସ।",
                  "ମୃତ୍ୟୁ: ୧୮ ମଇ ୨୦୧୫, ବୟସ ୬୬ ବର୍ଷ।"
              ],
              "societalImpact": "୨୦୧୧ ସୁପ୍ରିମକୋର୍ଟ ରାୟ ଦ୍ୱାରା ପାସିଭ୍ ଇଚ୍ଛାମୃତ୍ୟୁ ଏବଂ ୨୦୧୮ ରାୟ ଦ୍ୱାରା ଲିଭିଂ ୱିଲ୍ ସମ୍ପର୍କରେ ଐତିହାସିକ ଆଇନ ପ୍ରଣୟନ ହୋଇଥିଲା।",
              "actionableLesson": "ସ୍ୱାସ୍ଥ୍ୟ ଅନୁଷ୍ଠାନଗୁଡ଼ିକ ରାତ୍ରିକାଳୀନ ସୁରକ୍ଷା ଏବଂ ଦୀର୍ଘକାଳୀନ ରୋଗୀଙ୍କ ମର୍ଯ୍ୟାଦାପୂର୍ଣ୍ଣ ସେବାକୁ ସର୍ବୋଚ୍ଚ ପ୍ରାଥମିକତା ଦେବା ଉଚିତ।",
              "memorialPublication": {
                  "title": "ଦୀର୍ଘକାଳୀନ ରୋଗୀ ମର୍ଯ୍ୟାଦା ଓ ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀ ସୁରକ୍ଷା ପଦକ୍ଷେପ",
                  "focus": "ଚିକିତ୍ସା ନୈତିକତା ଏବଂ କାର୍ଯ୍ୟସ୍ଥଳୀ ସୁରକ୍ଷା",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ଅରୁଣାଙ୍କ ଜୀବନରୁ ପ୍ରେରିତ ଏକ ସାମାଜିକ ଓ ସାଂସ୍ଥାନିକ ସୁରକ୍ଷା ପ୍ରସ୍ତାବନା।"
              }
          },
          "es": {
              "name": "Aruna Shanbaug",
              "roleAndField": "Enfermera de Planta · Hospital King Edward Memorial (KEM), Bombay",
              "categoryLabel": "Ética Médica y Dignidad en la Enfermería",
              "coreMessage": "Los trabajadores de la salud merecen entornos laborales seguros, y la atención médica a largo plazo debe preservar la dignidad humana, la compasión y los derechos individuales en cada etapa de la vida.",
              "whoWasThisPerson": "Nacida el 1 de junio de 1948 en Haldipur, Karnataka, Aruna Shanbaug fue enfermera de planta en el Hospital King Edward Memorial (KEM) de Bombay.\nEra admirada entre sus compañeras por su compromiso vocacional y estaba comprometida para contraer matrimonio cuando el ataque cambió el rumbo de su vida.",
              "contributions": "Antes del ataque, Aruna trabajó en primera línea de la salud pública, cuidando a pacientes en el Hospital KEM.\nSu caso posterior se convirtió en un hito trascendental en los debates legales y éticos de la India sobre la dignidad del paciente, la toma de decisiones médicas y los cuidados al final de la vida.\nLa dedicación de sucesivas generaciones de enfermeras del Hospital KEM, que la cuidaron durante más de cuatro décadas, constituye una parte fundamental de su legado.",
              "factualContext": "El 27 de noviembre de 1973, durante su turno en el Hospital KEM, Aruna sufrió una agresión brutal y fue estrangulada con una cadena por un empleado del hospital. La agresión causó una grave privación de oxígeno en el cerebro, provocando daño neurológico permanente.\nPermaneció en un estado neurológico gravemente deteriorado, evaluado posteriormente por peritos de la Corte Suprema como estado vegetativo persistente.\nDurante aproximadamente 41 años y seis meses, recibió cuidados constantes del personal médico y de enfermería de KEM.\nEn mayo de 2015 contrajo neumonía grave y falleció tras un paro cardíaco el 18 de mayo de 2015 en el Hospital KEM, a los 66 años.",
              "verifiedFacts": [
                  "Nacimiento: 1 de junio de 1948, Haldipur, Karnataka.",
                  "Profesión: Enfermera de planta en el Hospital KEM, Bombay.",
                  "Ataque: 27 de noviembre de 1973, con lesión cerebral por anoxia.",
                  "Condición médica: Estado vegetativo persistente (PVS) certificado judicialmente.",
                  "Duración de los cuidados: Aproximadamente 41 años y seis meses.",
                  "Fallecimiento: 18 de mayo de 2015, por neumonía y paro cardíaco.",
                  "Edad al fallecer: 66 años."
              ],
              "societalImpact": "2011 — Aruna Ramchandra Shanbaug v. Union of India, (2011) 4 SCC 454\nEl 7 de marzo de 2011, la Corte Suprema de la India dictó una sentencia histórica sobre la eutanasia pasiva, rechazando retirar el soporte vital pero reconociendo el procedimiento legal bajo estrictas salvaguardas judiciales.\n\n2018 — Common Cause v. Union of India, (2018) 5 SCC 1\nEl 9 de marzo de 2018, la Corte Suprema reconoció legalmente las directivas médicas anticipadas (testamentos vitales).\n\nJuntos, estos casos marcaron la jurisprudencia india sobre autonomía del paciente y bioética.",
              "actionableLesson": "Las instituciones de salud deben priorizar tanto la seguridad física del personal sanitario como la dignidad de los pacientes en cuidados neurológicos de larga duración.",
              "memorialPublication": {
                  "title": "Iniciativa de Dignidad del Paciente y Seguridad Laboral en Salud",
                  "focus": "Ética Médica, Cuidados Crónicos y Seguridad de los Trabajadores Sanitarios",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Una propuesta institucional y social inspirada en la experiencia de Aruna para garantizar cuidados de enfermería dignos y protocolos de seguridad en turnos nocturnos."
              }
          },
          "fr": {
              "name": "Aruna Shanbaug",
              "roleAndField": "Infirmière Hospitalière · Hôpital King Edward Memorial (KEM), Mumbai",
              "categoryLabel": "Éthique Médicale et Dignité des Soignants",
              "coreMessage": "Les soignants méritent des environnements de travail sûrs, et les soins de longue durée doivent préserver la dignité humaine, la compassion et les droits individuels à chaque étape de la vie.",
              "whoWasThisPerson": "Née le 1er juin 1948 à Haldipur, dans le Karnataka, Aruna Shanbaug était une infirmière dévouée à l'hôpital King Edward Memorial (KEM) de Mumbai.\nElle était reconnue pour son dévouement professionnel et était fiancée au moment de l'agression qui bouleversa son existence.",
              "contributions": "Avant l'agression, Aruna travaillait en première ligne des soins de santé publique au KEM Hospital.\nSon histoire est devenue un repère majeur dans l'évolution juridique et éthique indienne sur la fin de vie, l'autonomie et la dignité des patients.\nLe dévouement sans faille de générations d'infirmières du KEM, qui ont veillé sur elle pendant plus de quatre décennies, fait partie intégrante de sa mémoire.",
              "factualContext": "Le 27 novembre 1973, pendant son service à l'hôpital KEM, Aruna fut sauvagement agressée et étranglée à l'aide d'une chaîne par un employé. La privation d'oxygène provoqua des lésions cérébrales irréversibles.\nElle vécut pendant près de 41 ans et six mois dans un état végétatif persistant, entourée de l'affection des soignants de l'hôpital, jusqu'à son décès le 18 mai 2015 à l'âge de 66 ans des suites d'une pneumonie.",
              "verifiedFacts": [
                  "Naissance : 1er juin 1948, Haldipur, Karnataka.",
                  "Profession : Infirmière au King Edward Memorial Hospital, Mumbai.",
                  "Agression : 27 novembre 1973, lésions cérébrales anoxiques permanentes.",
                  "État médical : État végétatif persistant attesté par expertise médicale judiciaire.",
                  "Durée des soins : Environ 41 ans et 6 mois.",
                  "Décès : 18 mai 2015, à l'âge de 66 ans."
              ],
              "societalImpact": "Son cas a abouti à l'arrêt historique de la Cour suprême de l'Inde de 2011 reconnaissant la procédure d'euthanasie passive sous strict contrôle judiciaire, complété en 2018 par la reconnaissance des directives anticipées (testaments de vie).",
              "actionableLesson": "Les établissements hospitaliers doivent garantir une sécurité absolue aux soignants de nuit tout en maintenant les plus hauts standards d'éthique et de respect pour les patients de longue durée.",
              "memorialPublication": {
                  "title": "Initiative pour la Dignité des Soins Longue Durée et la Sécurité des Soignants",
                  "focus": "Éthique Médicale, Soins Palliatifs et Sécurité Hospitalière",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Un cadre de recommandations alliant protocoles de sécurité pour le personnel de garde et respect inconditionnel de la personne vulnérable."
              }
          },
          "de": {
              "name": "Aruna Shanbaug",
              "roleAndField": "Krankenschwester · King Edward Memorial (KEM) Hospital, Mumbai",
              "categoryLabel": "Medizinethik und Würde in der Pflege",
              "coreMessage": "Pflegekräfte verdienen sichere Arbeitsbedingungen, und die langfristige Patientenversorgung muss die Menschenwürde, das Mitgefühl und die Rechte des Einzelnen in jeder Lebensphase wahren.",
              "whoWasThisPerson": "Geboren am 1. Juni 1948 in Haldipur, Karnataka, war Aruna Shanbaug Krankenschwester am King Edward Memorial (KEM) Hospital in Mumbai.\nSie war für ihre pflegerische Hingabe bekannt und stand kurz vor ihrer Heirat, als der verhängnisvolle Angriff ihr Leben veränderte.",
              "contributions": "Aruna leistete engagierten Dienst in der öffentlichen Gesundheitsversorgung.\nIhr Fall wurde zu einem historischen Wendepunkt in der indischen Debatte über Patientenwürde, medizinische Ethik und Entscheidungen am Lebensende.\nDie jahrzehntelange Pflege durch Generationen von KEM-Pflegekräften bleibt ein lebendiges Denkmal gelebter Solidarität.",
              "factualContext": "Am 27. November 1973 wurde Aruna während ihres Dienstes im KEM Hospital angegriffen und gewürgt, was zu einem schweren hypoxischen Hirnschaden führte.\nSie verblieb über 41 Jahre und sechs Monate in einem persistenten vegetativen Zustand unter der Fürsorge des KEM-Personals, bis sie am 18. Mai 2015 im Alter von 66 Jahren verstarb.",
              "verifiedFacts": [
                  "Geburt: 1. Juni 1948, Haldipur, Karnataka.",
                  "Beruf: Krankenschwester am KEM Hospital, Mumbai.",
                  "Angriff: 27. November 1973 mit dauerhaftem hypoxischem Hirnschaden.",
                  "Zustand: Persistenter vegetativer Status (Wachkoma), gerichtlich festgestellt.",
                  "Pflegedauer: Rund 41 Jahre und 6 Monate.",
                  "Tod: 18. Mai 2015 im Alter von 66 Jahren."
              ],
              "societalImpact": "Ihr Fall führte zum Grundsatzurteil des Obersten Gerichtshofs Indiens von 2011 zur passiven Sterbehilfe sowie zum Urteil von 2018 über Patientenverfügungen.",
              "actionableLesson": "Gesundheitseinrichtungen müssen sowohl den Schutz von Nachtdienstkräften als auch die Würde von Langzeitpflegepatienten bedingungslos gewährleisten.",
              "memorialPublication": {
                  "title": "Initiative für Patientenwürde in der Langzeitpflege und Arbeitssicherheit",
                  "focus": "Medizinethik, Langzeitpflege und Schutz von Gesundheitspersonal",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Ein Handlungsrahmen zur Gewährleistung sicherer Arbeitsbedingungen für Klinikpersonal und würdevoller Versorgung von Wachkomapatienten."
              }
          },
          "hr": {
              "name": "Aruna Shanbaug",
              "roleAndField": "Medicinska sestra · King Edward Memorial (KEM) bolnica, Mumbai",
              "categoryLabel": "Medicinska etika i dostojanstvo sestrinstva",
              "coreMessage": "Zdravstveni radnici zaslužuju sigurno radno okruženje, a dugotrajna skrb za pacijente mora očuvati ljudsko dostojanstvo, suosjećanje i prava pojedinca u svakoj fazi života.",
              "whoWasThisPerson": "Rođena 1. lipnja 1948. u Haldipuru, Karnataka, Aruna Shanbaug bila je medicinska sestra u bolnici King Edward Memorial (KEM) u Mumbaiju.",
              "contributions": "Aruna je radila u javnom zdravstvu brinući se o pacijentima. Njezin slučaj postao je povijesna prekretnica u pravnim i etičkim raspravama o dostojanstvu pacijenata i donošenju odluka na kraju života u Indiji.",
              "factualContext": "Dana 27. studenoga 1973. na radnom mjestu doživjela je težak napad koji je uzrokovao trajno oštećenje mozga zbog nedostatka kisika. U trajnom vegetativnom stanju ostala je približno 41 godinu i šest mjeseci uz neprekidnu skrb osoblja KEM bolnice, sve do smrti 18. svibnja 2015. u dobi od 66 godina.",
              "verifiedFacts": [
                  "Rođenje: 1. lipnja 1948., Haldipur, Karnataka.",
                  "Zanimanje: Medicinska sestra, KEM bolnica, Mumbai.",
                  "Napad: 27. studenoga 1973., teško hipoksično oštećenje mozga.",
                  "Trajanje skrbi: Približno 41 godina i 6 mjeseci.",
                  "Smrt: 18. svibnja 2015., u dobi od 66 godina."
              ],
              "societalImpact": "Presuda Vrhovnog suda Indije iz 2011. i 2018. postavila je temelje pasivne eutanazije i prava na institute naprednih medicinskih direktiva.",
              "actionableLesson": "Zdravstvene ustanove moraju osigurati zaštitu osoblja i očuvanje dostojanstva pacijenata u dugotrajnoj skrbi.",
              "memorialPublication": {
                  "title": "Inicijativa za dostojanstvo pacijenata i sigurnost zdravstvenih radnika",
                  "focus": "Medicinska etika i sigurnost na radnom mjestu",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Preporučeni institucionalni okvir za dostojanstvenu dugotrajnu skrb i sigurnost zdravstvenih djelatnika."
              }
          }
      }
  },
    {
      "id": 2,
      "slug": "dr-sarita-toshniwal",
      "name": "Dr. Sarita Toshniwal",
      "country": "India",
      "countryFlag": "🇮🇳",
      "category": "healthcare",
      "categoryLabel": "Healthcare & Medical Trainee Safety",
      "eraOrYear": "1988–2014",
      "roleAndField": "First-Year Postgraduate Medical Student · Obstetrics & Gynaecology · Assam Medical College and Hospital, Dibrugarh, Assam, India",
      "avatarUrl": "/assets/dr-sarita-toshniwal.jpeg",
      "verificationStatus": "Historically Verified",
      "lastVerifiedAt": "2026-11-07",
      "coreMessage": "Healthcare workers must be protected not only in public hospital areas but also in ICU rest rooms, doctors' duty rooms and other restricted spaces where medical professionals rest between demanding shifts.",
      "whoWasThisPerson": "Dr. Sarita Toshniwal was a first-year postgraduate medical student in the Department of Obstetrics and Gynaecology at Assam Medical College and Hospital (AMCH), Dibrugarh, Assam.\nOriginally from Sivasagar district, she had completed her MBBS at Assam Medical College and was pursuing postgraduate medical training.\nShe was working towards a career in a medical speciality central to maternal and reproductive healthcare.",
      "contributions": "Dr. Sarita Toshniwal was undertaking postgraduate medical training in a demanding hospital environment.\nContemporary reports confirm that she had been assigned overnight hospital duty in the gynaecology department before the incident.\nHer individual clinical achievements and specific patient-care contributions have not been independently established in the historical sources consulted. Accordingly, this profile does not attribute undocumented professional accomplishments to her.",
      "factualContext": "On the morning of 9 May 2014, Dr. Sarita Toshniwal was found murdered in the doctors' resting room inside the ICU of the gynaecology department at Assam Medical College and Hospital.\nShe had been working the previous night shift and had gone to the doctors' resting room after her duties.\nHospital ward boy Kiru Mech was arrested and prosecuted in connection with her murder.\nIn May 2023, following a nine-year trial, the Dibrugarh District and Sessions Court convicted Kiru Mech of murder under Section 302 of the Indian Penal Code and sentenced him to life imprisonment, along with a fine of ₹5,000.\nAnother accused, Dr. Deepmoni Saikia, was acquitted by the trial court due to insufficient evidence.\nThe judgment was delivered by District and Sessions Judge Aparna Ajitsaria. According to contemporary reporting, the 152-page judgment followed the examination of 61 witnesses.",
      "verifiedFacts": [
          "First-year postgraduate student in Obstetrics & Gynaecology at AMCH Dibrugarh.",
          "Originally from Sivasagar, Assam; completed MBBS at Assam Medical College.",
          "Assigned overnight hospital duty in the gynaecology department prior to the attack.",
          "Found murdered on the morning of 9 May 2014 in the doctors' resting room inside the ICU.",
          "Dibrugarh District and Sessions Court convicted ward boy Kiru Mech under Section 302 IPC in May 2023 (life imprisonment, ₹5,000 fine).",
          "Co-accused Dr. Deepmoni Saikia acquitted due to insufficient evidence.",
          "152-page judgment delivered by District and Sessions Judge Aparna Ajitsaria following examination of 61 witnesses."
      ],
      "societalImpact": "Her murder triggered protests by junior doctors and medical students across Assam.\nHealthcare professionals demanded stronger institutional security, particularly for women working overnight shifts.\n\nTheir demands included:\n• Improved security arrangements within hospital premises.\n• CCTV surveillance in ICU areas.\n• Verification of ward boys and other lower-grade hospital employees.\n• Better protection for medical professionals working alone during night shifts.\n• Institutional accountability for failures in workplace security.\n\nThe protests highlighted a critical concern: healthcare professionals must be able to perform their responsibilities without compromising their personal safety.\nThese demands are documented historical responses; this profile does not claim that all the requested reforms were subsequently implemented.",
      "actionableLesson": "Hospital security must extend beyond entrances, reception areas and public corridors.\n\nHealthcare institutions should evaluate and implement:\n1. Restricted access: Secure entry systems for doctors' duty rooms and staff resting facilities.\n2. Privacy-conscious surveillance: Appropriate monitoring of common access corridors without compromising the privacy of resting or clinical spaces.\n3. Emergency communication: Accessible emergency alarms and communication systems in isolated duty areas.\n4. Night-shift staffing: Adequate security personnel and appropriate staffing arrangements during overnight shifts.\n5. Safe movement: Escort arrangements for healthcare workers where necessary.\n6. Background verification: Documented identity and background verification procedures for hospital employees and contractual personnel.\n7. Incident accountability: Clear reporting procedures, escalation channels and independent investigation mechanisms.\n\nThese are proposed institutional safety standards, not claims about reforms already introduced following the incident.",
      "memorialPublication": {
          "title": "Hospital Duty Room & Night-Shift Physical Security Standards",
          "focus": "Clinical Architecture, Access Control & Staff Safety",
          "initiativeStatus": "Proposed Initiative",
          "deliverable": "A proposed actionable audit checklist for hospital administrators, medical college leadership and healthcare safety committees.\n\nObjective:\nTo evaluate whether doctors, nurses, postgraduate residents and other healthcare workers can safely perform their duties and access secure resting facilities during overnight shifts.\n\nThe initiative aims to translate historical lessons into practical institutional safety recommendations."
      },
      "references": [
          {
              "title": "The Indian Express, 10 May 2014 — In Dibrugarh hospital, ward boy kills medical student inside ICU",
              "url": "https://indianexpress.com/article/india/india-others/in-assam-hospital-ward-boy-kills-medical-student-inside-icu/",
              "publisher": "The Indian Express"
          },
          {
              "title": "Times of India, 10 May 2014 — Doctor murdered in Assam ICU, ward boy arrested",
              "url": "https://timesofindia.indiatimes.com/city/guwahati/doctor-murdered-in-assam-icu-ward-boy-arrested/articleshow/34896412.cms",
              "publisher": "Times of India"
          },
          {
              "title": "The Indian Express, 11 May 2014 — Medico's murder: No police verification of accused",
              "url": "https://indianexpress.com/article/india/india-others/medicos-murder-no-police-verification-of-accused/",
              "publisher": "The Indian Express"
          },
          {
              "title": "Press Trust of India / Business Standard, 11 May 2014 — Health minister meets striking doctors",
              "url": "https://www.business-standard.com/article/pti-stories/health-minister-meets-striking-doctors-114051100556_1.html",
              "publisher": "Press Trust of India / Business Standard"
          },
          {
              "title": "Times of India, 18 May 2023 — 9 yrs later, AMCH ward boy convicted in Sarita Toshniwal's murder case",
              "url": "https://timesofindia.indiatimes.com/city/guwahati/9-yrs-later-amch-ward-boy-convicted-in-sarita-toshniwals-murder-case/articleshow/100317631.cms",
              "publisher": "Times of India",
              "isPrimary": true
          },
          {
              "title": "Times of India, 19 May 2023 — Sarita Toshniwal's killer gets life imprisonment",
              "url": "https://timesofindia.indiatimes.com/city/guwahati/sarita-toshniwals-killer-gets-life-imprisonment/articleshow/100343775.cms",
              "publisher": "Times of India",
              "isPrimary": true
          },
          {
              "title": "The Sentinel Assam, 19 May 2023 — Ward boy Kiru Mech awarded life sentence",
              "url": "https://www.sentinelassam.com/amp/north-east-india-news/assam-news/ward-boy-kiru-mech-awarded-life-sentence-650134",
              "publisher": "The Sentinel Assam",
              "isPrimary": true
          },
          {
              "title": "Dibrugarh District Judiciary — Official eCourts portal",
              "url": "https://dibrugarh.dcourts.gov.in/",
              "publisher": "District Judiciary of Assam"
          }
      ],
      "translations": {
          "hi": {
              "name": "डॉ. सरिता तोशनीवाल",
              "roleAndField": "प्रथम वर्ष की स्नातकोत्तर मेडिकल छात्रा · प्रसूति एवं स्त्री रोग विभाग · असम मेडिकल कॉलेज एवं अस्पताल, डिब्रूगढ़, असम, भारत",
              "categoryLabel": "स्वास्थ्य सेवा एवं मेडिकल प्रशिक्षु सुरक्षा",
              "coreMessage": "स्वास्थ्य कर्मियों की सुरक्षा न केवल सार्वजनिक अस्पताल क्षेत्रों में बल्कि आईसीयू विश्राम कक्षों, डॉक्टरों के ड्यूटी रूम और अन्य प्रतिबंधित स्थानों में भी की जानी चाहिए जहाँ चिकित्सा पेशेवर व्यस्त पाली के बीच आराम करते हैं।",
              "whoWasThisPerson": "डॉ. सरिता तोशनीवाल असम मेडिकल कॉलेज एवं अस्पताल (AMCH), डिब्रूगढ़, असम में प्रसूति एवं स्त्री रोग विभाग में प्रथम वर्ष की स्नातकोत्तर मेडिकल छात्रा थीं।\nमूल रूप से शिवसागर जिले की रहने वाली, उन्होंने असम मेडिकल कॉलेज से अपना एमबीबीएस पूरा किया था और स्नातकोत्तर चिकित्सा प्रशिक्षण ले रही थीं।\nवे मातृ एवं प्रजनन स्वास्थ्य सेवा के लिए अत्यंत महत्वपूर्ण चिकित्सा विशेषज्ञता में अपना करियर बना रही थीं।",
              "contributions": "डॉ. सरिता तोशनीवाल एक चुनौतीपूर्ण अस्पताल परिवेश में स्नातकोत्तर चिकित्सा प्रशिक्षण प्राप्त कर रही थीं।\nसमकालीन रिपोर्टों से पुष्टि होती है कि घटना से पहले उन्हें स्त्री रोग विभाग में रात की ड्यूटी सौंपी गई थी।\nपरामर्श किए गए ऐतिहासिक स्रोतों में उनकी व्यक्तिगत नैदानिक उपलब्धियों और विशिष्ट रोगी-देखभाल योगदानों की स्वतंत्र रूप से पुष्टि नहीं हुई है। तदनुसार, यह प्रोफ़ाइल उन्हें अप्रमाणित व्यावसायिक उपलब्धियों का श्रेय नहीं देती है।",
              "factualContext": "9 मई 2014 की सुबह, डॉ. सरिता तोशनीवाल असम मेडिकल कॉलेज एवं अस्पताल के स्त्री रोग विभाग के आईसीयू के अंदर डॉक्टरों के विश्राम कक्ष में मृत पाई गईं।\nवे पिछली रात की पाली में काम कर रही थीं और अपनी ड्यूटी पूरी करने के बाद डॉक्टरों के विश्राम कक्ष में गई थीं।\nअस्पताल के वार्ड बॉय किरू मेच को उनकी हत्या के सिलसिले में गिरफ्तार किया गया और उन पर मुकदमा चलाया गया।\nमई 2023 में, नौ साल के लंबे मुकदमे के बाद, डिब्रूगढ़ जिला एवं सत्र न्यायालय ने किरू मेच को भारतीय दंड संहिता की धारा 302 के तहत हत्या का दोषी ठहराया और ₹5,000 के जुर्माने के साथ आजीवन कारावास की सजा सुनाई।\nएक अन्य आरोपी डॉ. दीपमोनी सैकिया को पर्याप्त सबूतों के अभाव में अदालत ने बरी कर दिया।\nयह फैसला जिला एवं सत्र न्यायाधीश अपर्णा अजितसारिया द्वारा सुनाया गया। समकालीन रिपोर्टिंग के अनुसार, 152 पन्नों का यह फैसला 61 गवाहों की गवाही के बाद आया।",
              "verifiedFacts": [
                  "एएमसीएच डिब्रूगढ़ में प्रसूति एवं स्त्री रोग विभाग में प्रथम वर्ष की पीजी छात्रा।",
                  "मूल रूप से शिवसागर, असम से; असम मेडिकल कॉलेज से एमबीबीएस पूरा किया।",
                  "हमले से पहले स्त्री रोग विभाग में रात की अस्पताल ड्यूटी सौंपी गई थी।",
                  "9 मई 2014 की सुबह आईसीयू के अंदर डॉक्टरों के विश्राम कक्ष में मृत पाई गईं।",
                  "डिब्रूगढ़ जिला एवं सत्र न्यायालय ने मई 2023 में वार्ड बॉय किरू मेच को धारा 302 आईपीसी के तहत दोषी ठहराया (आजीवन कारावास, ₹5,000 जुर्माना)।",
                  "सह-आरोपी डॉ. दीपमोनी सैकिया सबूतों के अभाव में बरी।",
                  "61 गवाहों की जांच के बाद जिला एवं सत्र न्यायाधीश अपर्णा अजितसारिया द्वारा 152 पन्नों का फैसला सुनाया गया।"
              ],
              "societalImpact": "उनकी हत्या ने पूरे असम में रेजिडेंट डॉक्टरों और मेडिकल छात्रों के व्यापक विरोध प्रदर्शनों को जन्म दिया।\nस्वास्थ्य पेशेवरों ने विशेष रूप से रात की पाली में काम करने वाली महिलाओं के लिए मजबूत संस्थागत सुरक्षा की मांग की।\n\nउनकी मांगों में शामिल थे:\n• अस्पताल परिसर में सुरक्षा व्यवस्था में सुधार।\n• आईसीयू क्षेत्रों में सीसीटीवी निगरानी।\n• वार्ड बॉय और अन्य निचले स्तर के अस्पताल कर्मचारियों का पुलिस सत्यापन।\n• रात की पाली में अकेले काम करने वाले पेशेवरों के लिए बेहतर सुरक्षा।\n• कार्यस्थल सुरक्षा में विफलताओं के लिए संस्थागत जवाबदेही।",
              "actionableLesson": "अस्पताल की सुरक्षा केवल प्रवेश द्वारों, स्वागत क्षेत्रों और सार्वजनिक गलियारों तक ही सीमित नहीं होनी चाहिए।\n\nसंस्थानों को लागू करना चाहिए:\n1. डॉक्टरों के ड्यूटी रूम के लिए सुरक्षित प्रवेश प्रणाली।\n2. गोपनीयता का ध्यान रखते हुए कॉमन कॉरिडोर की उचित निगरानी।\n3. एकांत कार्य क्षेत्रों में सुलभ आपातकालीन अलार्म।\n4. रात की पाली के दौरान पर्याप्त सुरक्षा कर्मी।\n5. महिला कर्मियों के लिए आवश्यकता पड़ने पर सुरक्षित एस्कॉर्ट व्यवस्था।\n6. अस्पताल कर्मियों और संविदा कर्मचारियों का दस्तावेजीकृत पृष्ठभूमि सत्यापन।\n7. स्पष्ट रिपोर्टिंग और स्वतंत्र जांच तंत्र।",
              "memorialPublication": {
                  "title": "अस्पताल ड्यूटी रूम एवं रात्रि-पाली भौतिक सुरक्षा मानक",
                  "focus": "क्लिनिकल आर्किटेक्चर, एक्सेस कंट्रोल एवं स्टाफ सुरक्षा",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "अस्पताल प्रशासकों, मेडिकल कॉलेज नेतृत्व और स्वास्थ्य सेवा सुरक्षा समितियों के लिए एक प्रस्तावित ऑडिट चेकलिस्ट।"
              }
          },
          "bn": {
              "name": "ডা. সরিতা তোশনিওয়াল",
              "roleAndField": "প্রথম বর্ষের স্নাতকোত্তর মেডিকেল শিক্ষার্থী · স্ত্রীরোগ ও প্রসূতিবিদ্যা বিভাগ · আসাম মেডিকেল কলেজ ও হাসপাতাল, ডিব্রুগড়, আসাম, ভারত",
              "categoryLabel": "স্বাস্থ্যসেবা ও মেডিকেল প্রশিক্ষণার্থী নিরাপত্তা",
              "coreMessage": "স্বাস্থ্যসেবা কর্মীদের কেবল সর্বজনীন অঞ্চলেই নয়, আইসিইউ বিশ্রামাগার, ডাক্তারদের ডিউটি রুম এবং দায়িত্বের মাঝে বিশ্রামের সুরক্ষিত স্থানগুলোতেও কঠোর নিরাপত্তা দিতে হবে।",
              "whoWasThisPerson": "ডা. সরিতা তোশনিওয়াল ছিলেন আসাম মেডিকেল কলেজ ও হাসপাতালের স্ত্রীরোগ ও প্রসূতিবিদ্যা বিভাগের প্রথম বর্ষের স্নাতকোত্তর ছাত্রী।\nমূলত শিবসাগর জেলার বাসিন্দা, তিনি আসাম মেডিকেল কলেজ থেকে এমবিবিএস সম্পন্ন করে বিশেষজ্ঞ প্রশিক্ষণ নিচ্ছিলেন।",
              "contributions": "তিনি একটি ব্যস্ত সরকারি হাসপাতালে প্রসূতি ও জরুরি সেবায় প্রশিক্ষণ নিচ্ছিলেন। ঘটনার আগের রাতে তিনি স্ত্রীরোগ বিভাগে দায়িত্ব পালন করছিলেন।",
              "factualContext": "২০১৪ সালের ৯ মে সকালে আসাম মেডিকেল কলেজের স্ত্রীরোগ আইসিইউ-এর ডাক্তারদের বিশ্রাম কক্ষে ডা. সরিতা তোশনিওয়ালের মরদেহ উদ্ধার করা হয়।\nহাসপাতালের ওয়ার্ড বয় কিরু মেচকে গ্রেপ্তার করা হয়। দীর্ঘ নয় বছর বিচার চলার পর ২০২৩ সালের মে মাসে ডিব্রুগড় জেলা ও দায়রা আদালত কিরু মেচকে ভারতীয় দণ্ডবিধির ৩০২ ধারায় যাবজ্জীবন কারাদণ্ড এবং ₹৫,০০০ জরিমানা প্রদান করে। অপর অভিযুক্ত ডা. দীপমণি শইকীয়া প্রমাণের অভাবে খালাস পান।",
              "verifiedFacts": [
                  "আসাম মেডিকেল কলেজে স্ত্রীরোগ বিভাগের প্রথম বর্ষের স্নাতকোত্তর ছাত্রী।",
                  "আসাম মেডিকেল কলেজ থেকেই এমবিবিএস সম্পন্ন করেন।",
                  "২০১৪ সালের ৯ মে সকালে আইসিইউ ডাক্তারদের রেস্টরুমে হত্যাকাণ্ডের শিকার হন।",
                  "২০২৩ সালের মে মাসে জেলা ও দায়রা আদালত অভিযুক্ত কিরু মেচকে যাবজ্জীবন কারাদণ্ড দেয়।"
              ],
              "societalImpact": "তার মৃত্যু পুরো আসাম জুড়ে জুনিয়র ডাক্তারদের আন্দোলনে রূপান্তরিত হয়, যা হাসপাতালের সংরক্ষিত স্থানে নজরদারি এবং কর্মীদের নিরাপত্তার কঠোর দাবি তোলে।",
              "actionableLesson": "হাসপাতালগুলোর ডিউটি রুমে সুরক্ষিত অ্যাক্সেস কন্ট্রোল, জরুরি অ্যালার্ম এবং কর্মীদের পূর্ণাঙ্গ পুলিশ ভেরিফিকেশন নিশ্চিত করতে হবে।",
              "memorialPublication": {
                  "title": "হাসপাতাল ডিউটি রুম ও নাইট শিফট শারীরিক নিরাপত্তা মানদণ্ড",
                  "focus": "ক্লিনিক্যাল স্থাপত্য, অ্যাক্সেস কন্ট্রোল ও কর্মী সুরক্ষা",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "মেডিকেল কলেজ এবং হাসপাতালের রাতের নিরাপত্তা নিশ্চিত করার প্রস্তাবিত প্রাতিষ্ঠানিক নির্দেশিকা।"
              }
          },
          "ta": {
              "name": "டாக்டர் சரிதா தோஷ்னிவால்",
              "roleAndField": "முதலாம் ஆண்டு முதுகலை மருத்துவ மாணவி · மகப்பேறியல் மற்றும் மகளிர் நலம் · அசாம் மருத்துவக் கல்லூரி, திப்ருகர், அசாம், இந்தியா",
              "categoryLabel": "சுகாதாரம் & மருத்துவப் பயிற்சிப் பாதுகாப்பு",
              "coreMessage": "சுகாதாரப் பணியாளர்களுக்கு பொது இடங்களில் மட்டுமல்லாது, மருத்துவர்கள் ஓய்வெடுக்கும் பணி அறைகளிலும் பாதுகாப்பு உறுதி செய்யப்பட வேண்டும்.",
              "whoWasThisPerson": "டாக்டர் சரிதா தோஷ்னிவால் அசாம் மருத்துவக் கல்லூரியின் மகளிர் நலப் பிரிவில் முதலாம் ஆண்டு முதுகலை மாணவியாகப் பயின்று வந்தார்.",
              "contributions": "கடினமான மருத்துவச் சூழலில் இரவுப் பணியில் இருந்து நோயாளிகளைக் கவனித்து வந்த இளம் மருத்துவர்.",
              "factualContext": "மே 9, 2014 அன்று காலை, ஐசியூ பிரிவின் மருத்துவர்கள் ஓய்வறையில் அவர் கொல்லப்பட்டுக் கிடந்தார். வார்டு பாய் கிரு மெச் கைது செய்யப்பட்டு, மே 2023 இல் அவருக்கு ஆயுள் தண்டனை விதிக்கப்பட்டது.",
              "verifiedFacts": [
                  "அசாம் மருத்துவக் கல்லூரியின் முதுகலை மருத்துவ மாணவி.",
                  "மே 9, 2014 அன்று மருத்துவமனை பணி அறையில் உயிரிழந்தார்.",
                  "மே 2023 இல் குற்றவாளி கிரு மெச்சிற்கு ஆயுள் தண்டனை வழங்கப்பட்டது."
              ],
              "societalImpact": "இச்சம்பவம் அசாம் முழுவதும் மருத்துவர்களின் வேலைநிறுத்தத்தைத் தூண்டி, இரவுப் பணி பெண்களுக்கான நிறுவனப் பாதுகாப்பை வலியுறுத்தியது.",
              "actionableLesson": "மருத்துவமனைகளில் தடைசெய்யப்பட்ட பகுதிகளில் தானியங்கி அணுகல் முறை மற்றும் அவசர எச்சரிக்கை அமைப்புகள் நிறுவப்பட வேண்டும்.",
              "memorialPublication": {
                  "title": "மருத்துவமனை பணி அறை மற்றும் இரவுப் பாதுகாப்பு வழிகாட்டுதல்கள்",
                  "focus": "மருத்துவமனை வடிவமைப்பு மற்றும் பணியாளர் பாதுகாப்பு",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "மருத்துவப் பணியாளர்களின் இரவு நேரப் பாதுகாப்பை உறுதி செய்யும் தணிக்கைப் பட்டியல்."
              }
          },
          "or": {
              "name": "ଡା. ସରିତା ତୋଷନିୱାଲ",
              "roleAndField": "ପ୍ରଥମ ବର୍ଷ ସ୍ନାତକୋତ୍ତର ମେଡିକାଲ ଛାତ୍ରୀ · ପ୍ରସୂତି ଓ ସ୍ତ୍ରୀରୋଗ ବିଭାଗ · ଆସାମ ମେଡିକାଲ କଲେଜ, ଡିବ୍ରୁଗଡ଼, ଭାରତ",
              "categoryLabel": "ସ୍ୱାସ୍ଥ୍ୟସେବା ଓ ଡାକ୍ତରୀ ଶିକ୍ଷାର୍ଥୀ ସୁରକ୍ଷା",
              "coreMessage": "ଡାକ୍ତରଖାନାର ସାଧାରଣ ସ୍ଥାନ ସହିତ ଡାକ୍ତରଙ୍କ ଡ୍ୟୁଟି ରୁମ ଓ ବିଶ୍ରାମ କକ୍ଷରେ ସୁରକ୍ଷା ବାଧ୍ୟତାମୂଳକ ହେବା ଆବଶ୍ୟକ।",
              "whoWasThisPerson": "ଡା. ସରିତା ତୋଷନିୱାଲ ଆସାମ ମେଡିକାଲ କଲେଜରେ ପ୍ରସୂତି ଓ ସ୍ତ୍ରୀରୋଗ ବିଭାଗରେ ସ୍ନାତକୋତ୍ତର ପ୍ରଶିକ୍ଷଣ ନେଉଥିଲେ।",
              "contributions": "ସେ ଡାକ୍ତରଖାନାରେ ରାତ୍ରିକାଳୀନ ଡ୍ୟୁଟିରେ ରହି ରୋଗୀସେବା ପ୍ରଦାନ କରୁଥିଲେ।",
              "factualContext": "୯ ମଇ ୨୦୧୪ ସକାଳେ ଆସାମ ମେଡିକାଲ କଲେଜର ଡାକ୍ତର ବିଶ୍ରାମ କକ୍ଷରେ ତାଙ୍କର ହତ୍ୟା ହୋଇଥିଲା। ୨୦୨୩ ମସିହା ମଇ ମାସରେ ଅଦାଲତ ଦୋଷୀ କିରୁ ମେଚକୁ ଆଜୀବନ କାରାଦଣ୍ଡ ପ୍ରଦାନ କରିଥିଲେ।",
              "verifiedFacts": [
                  "ଆସାମ ମେଡିକାଲ କଲେଜର ପିଜି ଛାତ୍ରୀ।",
                  "୯ ମଇ ୨୦୧୪ ରେ ଡ୍ୟୁଟି ରୁମରେ ହତ୍ୟାକାଣ୍ଡର ଶିକାର।",
                  "ମଇ ୨୦୨୩ ରେ ଦୋଷୀକୁ ଆଜୀବନ କାରାଦଣ୍ଡ।"
              ],
              "societalImpact": "ଏହି ଘଟଣା ସାରା ଆସାମରେ ଡାକ୍ତରୀ ଛାତ୍ରମାନଙ୍କ ମଧ୍ୟରେ ତୀବ୍ର ଆନ୍ଦୋଳନ ସୃଷ୍ଟି କରିଥିଲା।",
              "actionableLesson": "ହସ୍ପିଟାଲ ଡ୍ୟୁଟି ରୁମଗୁଡ଼ିକରେ ବାୟୋମେଟ୍ରିକ ପ୍ରବେଶ ଓ କର୍ମଚାରୀଙ୍କ ପୋଲିସ ଯାଞ୍ଚ ଅପରିହାର୍ଯ୍ୟ।",
              "memorialPublication": {
                  "title": "ଡାକ୍ତରଖାନା ଡ୍ୟୁଟି ରୁମ ଓ ରାତ୍ରିକାଳୀନ ସୁରକ୍ଷା ନିୟମାବଳୀ",
                  "focus": "ଡାକ୍ତରଖାନା ସୁରକ୍ଷା ଓ ପ୍ରବେଶ ନିୟନ୍ତ୍ରଣ",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀଙ୍କ ରାତ୍ରିକାଳୀନ ସୁରକ୍ଷା ପାଇଁ ପ୍ରସ୍ତାବିତ ଅଡିଟ୍ ଚେକଲିଷ୍ଟ।"
              }
          },
          "es": {
              "name": "Dra. Sarita Toshniwal",
              "roleAndField": "Estudiante de Posgrado de Primer Año · Obstetricia y Ginecología · Hospital y Facultad de Medicina de Assam (AMCH), Dibrugarh, Assam, India",
              "categoryLabel": "Seguridad Sanitaria y de Médicos Residentes",
              "coreMessage": "Los trabajadores de la salud deben estar protegidos no solo en las áreas públicas del hospital, sino también en las salas de descanso de la UCI y en las salas de guardia médica donde descansan entre turnos agotadores.",
              "whoWasThisPerson": "La Dra. Sarita Toshniwal cursaba el primer año de posgrado en Obstetricia y Ginecología en el AMCH de Dibrugarh, Assam.\nOriginaria de Sivasagar, completó su MBBS en Assam Medical College y se preparaba para una carrera dedicada a la salud materna y reproductiva.",
              "contributions": "La Dra. Toshniwal realizaba guardias médicas nocturnas en un entorno hospitalario de alta demanda.\nLos informes de la época confirman su asignación al turno de noche del departamento de ginecología previo al suceso.",
              "factualContext": "La mañana del 9 de mayo de 2014, la Dra. Sarita Toshniwal fue hallada asesinada en la sala de descanso de los médicos dentro de la UCI de ginecología del AMCH.\nHabía cumplido su turno nocturno de guardia. El celador Kiru Mech fue detenido y juzgado.\nEn mayo de 2023, tras nueve años de proceso judicial, el Tribunal de Distrito de Dibrugarh condenó a Kiru Mech a cadena perpetua y multa por asesinato (artículo 302 del Código Penal indio). El otro acusado fue absuelto por falta de pruebas.",
              "verifiedFacts": [
                  "Estudiante de posgrado de 1.er año en Obstetricia y Ginecología en AMCH Dibrugarh.",
                  "Originaria de Sivasagar, Assam; graduada MBBS en Assam Medical College.",
                  "Asesinada la mañana del 9 de mayo de 2014 en la sala de guardia médica de la UCI.",
                  "Kiru Mech condenado a cadena perpetua en mayo de 2023 tras 9 años de juicio oral."
              ],
              "societalImpact": "El crimen desencadenó huelgas masivas de médicos residentes en todo Assam exigiendo seguridad reforzada para el personal femenino de guardia.",
              "actionableLesson": "Control de acceso estricto a las salas de descanso médico, verificación de antecedentes del personal subalterno y protocolos de alarma en áreas aisladas.",
              "memorialPublication": {
                  "title": "Estándares de Seguridad Física en Salas de Guardia y Turnos Nocturnos",
                  "focus": "Arquitectura Clínica, Control de Acceso y Protección del Personal",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Una lista de verificación para auditorías hospitalarias sobre la seguridad del personal sanitario durante los turnos de noche."
              }
          },
          "fr": {
              "name": "Dre Sarita Toshniwal",
              "roleAndField": "Interne de Première Année · Gynécologie et Obstétrique · Faculté et Hôpital de Médecine d'Assam (AMCH), Dibrugarh, Assam, Inde",
              "categoryLabel": "Sécurité Hospitalière et des Internes en Médecine",
              "coreMessage": "Les soignants doivent être protégés non seulement dans les halls d'hôpitaux, mais également dans les salles de garde, les salles de repos des soins intensifs et les locaux réservés.",
              "whoWasThisPerson": "La Dre Sarita Toshniwal était interne de première année en gynécologie-obstétrique au centre hospitalier AMCH de Dibrugarh.\nOriginaire du district de Sivasagar, elle avait brillamment obtenu son diplôme de médecine et se destinait aux soins maternels.",
              "contributions": "Elle effectuait des gardes de nuit exigeantes au chevet des patientes du service de gynécologie.",
              "factualContext": "Le matin du 9 mai 2014, elle fut retrouvée assassinée dans la salle de repos des médecins située au sein des soins intensifs de gynécologie de l'AMCH.\nEn mai 2023, après neuf ans de procédure, le tribunal de Dibrugarh a condamné l'aide-soignant Kiru Mech à la réclusion criminelle à perpétuité pour meurtre.",
              "verifiedFacts": [
                  "Interne en gynécologie et obstétrique à l'AMCH de Dibrugarh.",
                  "Diplômée de l'Assam Medical College.",
                  "Assassinée le 9 mai 2014 dans la salle de repos des médecins en réanimation.",
                  "Kiru Mech condamné à la prison à perpétuité en mai 2023."
              ],
              "societalImpact": "Ce drame a provoqué un mouvement de grève historique des jeunes médecins en Assam pour exiger la sécurisation des services hospitaliers de nuit.",
              "actionableLesson": "Contrôle d'accès biométrique aux salles de garde, vérification systématique des antécédents des employés contractuels et alarmes d'urgence.",
              "memorialPublication": {
                  "title": "Normes de Sécurité Physique des Salles de Garde et Services de Nuit",
                  "focus": "Architecture Hospitalière, Sécurisation des Accès et Protection du Personnel",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Un protocole d'audit institutionnel pour garantir la sécurité et le repos des internes et soignants de garde."
              }
          },
          "de": {
              "name": "Dr. Sarita Toshniwal",
              "roleAndField": "Assistenzärztin im ersten Weiterbildungsjahr · Gynäkologie und Geburtshilfe · Assam Medical College and Hospital, Dibrugarh, Assam, Indien",
              "categoryLabel": "Sicherheit im Gesundheitswesen und Schutz von Ärzten in Weiterbildung",
              "coreMessage": "Medizinisches Personal muss nicht nur in öffentlichen Klinikbereichen geschützt werden, sondern insbesondere in Bereitschaftszimmern, Ruheräumen der Intensivstation und Personalbereichen.",
              "whoWasThisPerson": "Dr. Sarita Toshniwal war Assistenzärztin für Frauenheilkunde und Geburtshilfe am AMCH in Dibrugarh, Assam.\nSie stammte aus Sivasagar und hatte ihr Medizinstudium am Assam Medical College abgeschlossen.",
              "contributions": "Sie absolvierte anspruchsvolle Nachtdienste in der gynäkologischen Notfall- und Krankenversorgung.",
              "factualContext": "Am Morgen des 9. Mai 2014 wurde Dr. Toshniwal im Ruheraum der Intensivstation ermordet aufgefunden.\nIm Mai 2023 wurde der Stationshelfer Kiru Mech nach neunjährigem Verfahren zu lebenslanger Haft verurteilt.",
              "verifiedFacts": [
                  "Assistenzärztin für Gynäkologie am AMCH Dibrugarh.",
                  "Absolventin des Assam Medical College.",
                  "Am 9. Mai 2014 im Arztruheraum ermordet aufgefunden.",
                  "Täter Kiru Mech im Mai 2023 zu lebenslanger Haft verurteilt."
              ],
              "societalImpact": "Der Mord führte zu landesweiten Protesten von Assistenzärzten in Assam mit der Forderung nach lückenloser Sicherheit im Nachtdienst.",
              "actionableLesson": "Zutrittskontrollen für Arztzimmer, Zuverlässigkeitsüberprüfungen von Hilfskräften und Notrufsysteme.",
              "memorialPublication": {
                  "title": "Sicherheitsstandards für Bereitschaftsräume und Nachtdienste",
                  "focus": "Klinikarchitektur, Zugangskontrolle und Personalschutz",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Ein Audit-Katalog zur Überprüfung von Sicherheitsvorkehrungen in Bereitschaftsräumen von Krankenhäusern."
              }
          },
          "hr": {
              "name": "Dr. Sarita Toshniwal",
              "roleAndField": "Liječnica na prvoj godini specijalizacije · Ginekologija i opstetricija · Assam Medical College and Hospital, Dibrugarh, Assam, Indija",
              "categoryLabel": "Sigurnost zdravstvenog osoblja i specijalizanata",
              "coreMessage": "Zdravstveni radnici moraju biti zaštićeni ne samo u javnim bolničkim prostorima, već i u dežurnim sobama intenzivne njege i prostorijama za odmor osoblja.",
              "whoWasThisPerson": "Dr. Sarita Toshniwal bila je specijalizantica prve godine ginekologije i opstetricije u bolnici AMCH u Dibrugarhu, Assam.",
              "contributions": "Pružala je skrb pacijenticama tijekom zahtjevnih noćnih dežurstava u ginekološkom odjelu.",
              "factualContext": "Ujutro 9. svibnja 2014. pronađena je ubijena u sobi za odmor liječnika na odjelu intenzivne njege. U svibnju 2023. bolnički djelatnik Kiru Mech osuđen je na doživotni zatvor.",
              "verifiedFacts": [
                  "Specijalizantica ginekologije i opstetricije u AMCH Dibrugarh.",
                  "Diplomirala medicinu na Assam Medical Collegeu.",
                  "Ubijena 9. svibnja 2014. u dežurnoj sobi liječnika.",
                  "Počinitelj Kiru Mech osuđen na doživotni zatvor u svibnju 2023."
              ],
              "societalImpact": "Ubojstvo je potaknulo masovne prosvjede mladih liječnika širom Assama sa zahtjevima za bolničku sigurnost.",
              "actionableLesson": "Elektronička kontrola ulaza u dežurne sobe, provjera osoblja i hitni alarmni sustavi u izoliranim odjelima.",
              "memorialPublication": {
                  "title": "Standardi fizičke sigurnosti dežurnih soba i noćnih smjena",
                  "focus": "Sigurnost osoblja i kontrola pristupa",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Kontrolni popis za reviziju sigurnosnih standarda u bolničkim dežurnim sobama."
              }
          }
      }
  },
    {
      "id": 3,
      "slug": "dr-vandana-das",
      "name": "Dr. Vandana Das",
      "country": "India",
      "countryFlag": "🇮🇳",
      "category": "healthcare",
      "categoryLabel": "Emergency Medicine & Clinical Protection",
      "eraOrYear": "2023",
      "roleAndField": "House Surgeon · Kottarakkara Taluk Hospital, Kerala",
      "avatarUrl": "https://images.openai.com/static-rsc-4/WmEpQw-lqYO47-p4A7eQQMIWYeFkI4LlmCI17Np-wNnRtq2KyU3UISZoLOnbFm3z8LbgP6EVgVoahv3rvrfUIA1tD5GS9PuiV70pD4N2IxrSAaSc1tEMBfXqPNph8goJVT2Y_KKjjY25HIUsKoBgKybSwqmGd47-XhFbWEulCaM?purpose=inline",
      "verificationStatus": "Verified",
      "lastVerifiedAt": "2026-11-07",
      "coreMessage": "Healthcare workers must be protected while delivering care, including in emergency settings. A person's contribution to healthcare can also continue through the people who choose to carry their values forward.",
      "whoWasThisPerson": "Dr. Vandana Das was a young medical professional working as a house surgeon at Kottarakkara Taluk Hospital in Kerala. She had completed her MBBS at Azeezia Medical College.\nShe was at the beginning of her medical career, undertaking clinical responsibilities as part of her professional training. Her work placed her in a setting where healthcare personnel regularly attend to patients in urgent and unpredictable circumstances.",
      "contributions": "A Legacy Continued — Her Parents' Contribution (A separate and meaningful contribution to community healthcare)\n\nDr. Vandana Das's story did not end with the tragedy. Her parents chose to establish a memorial clinic in her memory, creating a continuing contribution to healthcare beyond the hospital where she had worked.\nThey established the Dr. Vandana Das Memorial Clinic at Thrikkunnappuzha, in Alappuzha district, Kerala. The clinic was inaugurated on 10 October 2024 by the then Governor of Kerala, Arif Mohammed Khan.\nThe initiative was intended to provide medical assistance to economically disadvantaged people.\nThis contribution deserves recognition in its own right. Her parents did not limit their remembrance to a memorial in name alone; they created a healthcare initiative intended to serve people who may otherwise face difficulties accessing medical assistance.\nTheir initiative connects remembrance with public service. It gives Dr. Vandana Das's name a continuing place in community healthcare while recognising her parents' decision to turn personal loss into an effort to help others.\n\nWhy this matters to UltimateHealth:\n• It recognises the contribution of family members who continue a healthcare-related public service initiative.\n• It highlights community-oriented healthcare beyond institutional settings.\n• It shows how memorial initiatives can create practical value when they are connected to accessible medical assistance.\n• It gives her parents independent recognition as contributors to this continuing effort.\n\nEditorial distinction: The clinic's establishment and inauguration are documented. Its current operating status, service schedule, patient numbers, and the full range of services should be verified separately before making claims about its ongoing activities.",
      "factualContext": "On 10 May 2023, Dr. Vandana Das was attending to a man who had been brought to the hospital by police for medical treatment following an altercation.\nWhile she was treating his injuries in the casualty department, the man attacked her with surgical scissors. Other people at the hospital were also injured during the incident.\nDr. Vandana Das sustained critical injuries. She was taken to KIMS Hospital in Thiruvananthapuram, where she later died.\nThe accused was identified as G. Sandeep. Early speculation about intoxication should not be treated as established fact. The circumstances and the accused's legal defence were matters considered during the subsequent criminal proceedings.\nHer death raised serious concerns about the safety of healthcare workers, particularly those working in emergency and casualty departments.\n\nJudicial Proceedings:\nThe criminal case proceeded through the trial court.\nIn March 2026, the Kollam Additional Sessions Court found G. Sandeep guilty in connection with Dr. Vandana Das's murder and other offences. The court subsequently imposed a life sentence for the murder, along with additional sentences for other offences.\nAn appeal was subsequently filed before the Kerala High Court. The trial court's verdict should therefore be described as the outcome at the trial stage, with the appeal proceedings noted separately.",
      "editorialNotes": "The trial judgment and the subsequent appeal should be checked against the relevant court records before publishing detailed sentence-by-sentence descriptions or stating the final status of the case. Publication note: The sources listed below are a research trail, not a substitute for checking the original court judgment and official legislative text. Add direct links to those primary records before marking the judicial and legislative sections fully verified.",
      "verifiedFacts": [
          "House surgeon at Kottarakkara Taluk Hospital, Kerala; completed MBBS at Azeezia Medical College.",
          "Fatally attacked on 10 May 2023 with surgical scissors while treating a patient brought by police to the casualty department; later died at KIMS Hospital, Thiruvananthapuram.",
          "In March 2026, Kollam Additional Sessions Court found accused G. Sandeep guilty and imposed a life sentence for murder along with additional sentences (subsequently appealed before the Kerala High Court).",
          "Kerala amended its legislation through the Kerala Healthcare Service Persons and Healthcare Service Institutions (Prevention of Violence and Damage to Property) Amendment legislation in 2023.",
          "Her parents established the Dr. Vandana Das Memorial Clinic at Thrikkunnappuzha, Alappuzha district, Kerala, inaugurated on 10 October 2024 by Governor Arif Mohammed Khan."
      ],
      "societalImpact": "Legislative Response: Protection of Healthcare Workers\n\nDr. Vandana Das's death intensified public concern about violence against healthcare professionals.\nKerala amended its legislation protecting healthcare service personnel through the Kerala Healthcare Service Persons and Healthcare Service Institutions (Prevention of Violence and Damage to Property) Amendment legislation in 2023.\nThe amendment strengthened the legal framework addressing violence against healthcare personnel and damage to healthcare institutions.\nThe legislation is an important part of the wider discussion about workplace safety in hospitals. However, passing stronger laws alone does not guarantee safety. Effective implementation, reporting mechanisms, staff training, and emergency-response arrangements remain essential.",
      "actionableLesson": "Dr. Vandana Das's case highlights the need for practical safeguards in emergency-care environments.\n\nHealthcare institutions should consider:\n1. Emergency risk assessment: Identify situations in which patients or accompanying individuals may pose an immediate risk to healthcare personnel.\n2. Rapid security response: Establish clear procedures for calling trained security staff when violence or threats occur.\n3. Casualty-area safety: Review the layout of emergency departments, staff access to exits, and the availability of emergency alerts.\n4. De-escalation training: Equip healthcare workers with practical training for handling threatening or aggressive situations.\n5. Incident reporting and accountability: Ensure that threats and assaults are documented, investigated, and addressed through appropriate institutional and legal processes.\n6. Post-incident support: Provide timely medical, psychological, and legal support to affected healthcare workers and their families.\n\nThese are proposed institutional safeguards, not claims that a particular hospital has implemented them.",
      "memorialPublication": {
          "title": "The UltimateHealth Perspective: Protecting Healthcare Workers & Continuing Community Service",
          "focus": "Emergency-Care Workplace Safeguards & Family-Led Community Healthcare",
          "initiativeStatus": "Proposed Initiative",
          "deliverable": "Dr. Vandana Das's story represents two connected dimensions of healthcare:\n• The responsibility to protect healthcare workers: Medical professionals should be able to provide treatment without facing violence in their workplace.\n• The responsibility to continue serving communities: Her parents' memorial clinic demonstrates how a family's initiative can extend a healthcare-related contribution beyond an individual lifetime.\n\nHer story should be remembered not only through the circumstances of her death, but also through the community-oriented initiative established in her memory.\nRemembering Dr. Vandana Das means recognising both the need for safer healthcare workplaces and the continuing contribution made by her parents."
      },
      "references": [
          {
              "title": "The Indian Express — Contemporary reporting on the attack and the death of Dr. Vandana Das, May 2023",
              "url": "https://indianexpress.com/article/india/kerala/kerala-young-doctor-stabbed-to-death-by-patient-at-kollam-hospital-8599940/",
              "publisher": "The Indian Express"
          },
          {
              "title": "The New Indian Express — Reporting on the incident and subsequent investigation",
              "url": "https://www.newindianexpress.com/states/kerala/2023/May/10/young-woman-doctor-stabbed-to-death-by-patient-in-keralas-kottarakkara-2574072.html",
              "publisher": "The New Indian Express"
          },
          {
              "title": "The New Indian Express / Kerala news coverage — Reporting on the 2023 legislative response to violence against healthcare workers",
              "url": "https://www.newindianexpress.com/states/kerala/2023/May/17/kerala-cabinet-approves-ordinance-to-ensure-strict-punishment-for-hospital-attacks-2576228.html",
              "publisher": "The New Indian Express"
          },
          {
              "title": "The Times of India — Inauguration of clinic for the poor in memory of Dr. Vandana Das (September 2024)",
              "url": "https://timesofindia.indiatimes.com/city/kochi/inauguration-of-clinic-for-the-poor-in-memory-of-dr-vandana-das/articleshow/113671835.cms",
              "publisher": "The Times of India",
              "isPrimary": true
          },
          {
              "title": "The Times of India — Governor inaugurates Dr. Vandana Das Memorial Clinic (October 2024)",
              "url": "https://timesofindia.indiatimes.com/city/kochi/governor-inaugurates-dr-vandana-das-memorial-clinic-a-lasting-tribute-to-healthcare-hero/articleshow/114125727.cms",
              "publisher": "The Times of India",
              "isPrimary": true
          },
          {
              "title": "Kerala legislative records — Kerala Healthcare Service Persons and Healthcare Service Institutions (Prevention of Violence and Damage to Property) Amendment legislation, 2023",
              "url": "https://prsindia.org/files/bills_acts/acts_states/kerala/2023/Act%2022%20of%202023%20Kerala.pdf",
              "publisher": "Government of Kerala",
              "isPrimary": true
          },
          {
              "title": "Court records and reporting — Kollam Additional Sessions Court trial outcome, March 2026, and subsequent Kerala High Court appeal proceedings",
              "url": "https://kollam.dcourts.gov.in/",
              "publisher": "Kollam Additional Sessions Court / Kerala High Court"
          }
      ],
      "translations": {
          "hi": {
              "name": "डॉ. वंदना दास",
              "roleAndField": "हाउस सर्जन · कोट्टारक्करा तालुक अस्पताल, केरल",
              "categoryLabel": "आपातकालीन चिकित्सा एवं क्लिनिकल सुरक्षा",
              "coreMessage": "आपातकालीन परिस्थितियों सहित देखभाल प्रदान करते समय स्वास्थ्य कर्मियों की सुरक्षा सुनिश्चित की जानी चाहिए। स्वास्थ्य सेवा में किसी व्यक्ति का योगदान उन लोगों के माध्यम से भी जारी रह सकता है जो उनके मूल्यों को आगे बढ़ाने का संकल्प लेते हैं।",
              "whoWasThisPerson": "डॉ. वंदना दास केरल के कोट्टारक्करा तालुक अस्पताल में हाउस सर्जन के रूप में कार्यरत एक युवा चिकित्सा पेशेवर थीं। उन्होंने अजीजिया मेडिकल कॉलेज से अपना एमबीबीएस पूरा किया था।\nवे अपने चिकित्सा करियर की शुरुआत में थीं और अपने पेशेवर प्रशिक्षण के हिस्से के रूप में नैदानिक जिम्मेदारियों का निर्वहन कर रही थीं। उनका कार्य एक ऐसे परिवेश में था जहाँ स्वास्थ्य कर्मी नियमित रूप से तत्काल और अप्रत्याशित परिस्थितियों में रोगियों की देखभाल करते हैं।",
              "contributions": "एक निरंतर विरासत — उनके माता-पिता का योगदान (सामुदायिक स्वास्थ्य सेवा में एक अलग और सार्थक योगदान)\n\nडॉ. वंदना दास की कहानी इस त्रासदी के साथ समाप्त नहीं हुई। उनके माता-पिता ने उनकी स्मृति में एक मेमोरियल क्लिनिक स्थापित करने का निर्णय लिया, जिससे उस अस्पताल से परे भी स्वास्थ्य सेवा में एक निरंतर योगदान शुरू हुआ जहाँ उन्होंने काम किया था।\nउन्होंने केरल के अलप्पुझा जिले के थ्रिक्कुन्नप्पुझा में 'डॉ. वंदना दास मेमोरियल क्लिनिक' की स्थापना की। इस क्लिनिक का उद्घाटन 10 अक्टूबर 2024 को केरल के तत्कालीन राज्यपाल आरिफ मोहम्मद खान द्वारा किया गया था।\nइस पहल का उद्देश्य आर्थिक रूप से वंचित लोगों को चिकित्सा सहायता प्रदान करना था।\nयह योगदान अपने आप में सम्मान का पात्र है। उनके माता-पिता ने अपनी स्मृति को केवल नाम के स्मारक तक सीमित नहीं रखा; उन्होंने एक ऐसी स्वास्थ्य पहल बनाई जिसका उद्देश्य उन लोगों की सेवा करना है जिन्हें अन्यथा चिकित्सा सहायता प्राप्त करने में कठिनाइयों का सामना करना पड़ सकता है।\nउनकी यह पहल स्मृति को जनसेवा से जोड़ती है।\n\nUltimateHealth के लिए यह क्यों महत्वपूर्ण है:\n• यह परिवार के उन सदस्यों के योगदान को मान्यता देता है जो स्वास्थ्य सेवा से जुड़ी जनसेवा पहल को आगे बढ़ाते हैं।\n• यह संस्थागत ढांचों से परे सामुदायिक-उन्मुख स्वास्थ्य सेवा को रेखांकित करता है।\n• यह दर्शाता है कि जब स्मारक पहल सुलभ चिकित्सा सहायता से जुड़ती हैं तो वे व्यावहारिक मूल्य कैसे पैदा कर सकती हैं।\n• यह इस निरंतर प्रयास के योगदानकर्ताओं के रूप में उनके माता-पिता को स्वतंत्र मान्यता देता है।\n\nसंपादकीय अंतर: क्लिनिक की स्थापना और उद्घाटन प्रलेखित हैं। इसकी वर्तमान संचालन स्थिति, सेवा समय-सारणी, रोगियों की संख्या और सेवाओं की पूरी श्रृंखला के बारे में दावे करने से पहले स्वतंत्र रूप से सत्यापन किया जाना चाहिए।",
              "factualContext": "10 मई 2023 को, डॉ. वंदना दास एक ऐसे व्यक्ति का उपचार कर रही थीं जिसे एक झगड़े के बाद चिकित्सा उपचार के लिए पुलिस द्वारा अस्पताल लाया गया था।\nजब वे कैजुअल्टी विभाग में उसके घावों का इलाज कर रही थीं, तभी उस व्यक्ति ने सर्जिकल कैंची से उन पर हमला कर दिया। घटना के दौरान अस्पताल में मौजूद अन्य लोग भी घायल हुए।\nडॉ. वंदना दास को गंभीर चोटें आईं। उन्हें तिरुवनंतपुरम के KIMS अस्पताल ले जाया गया, जहाँ बाद में उनकी मृत्यु हो गई।\nआरोपी की पहचान जी. संदीप के रूप में हुई। नशे के बारे में शुरुआती अटकलों को स्थापित तथ्य के रूप में नहीं माना जाना चाहिए। परिस्थितियाँ और आरोपी का कानूनी बचाव बाद की आपराधिक कार्यवाही के दौरान विचार किए गए विषय थे।\nउनकी मृत्यु ने स्वास्थ्य कर्मियों, विशेष रूप से आपातकालीन और कैजुअल्टी विभागों में काम करने वालों की सुरक्षा के बारे में गंभीर चिंताएँ पैदा कीं।\n\nन्यायिक कार्यवाही:\nआपराधिक मामला ट्रायल कोर्ट के माध्यम से आगे बढ़ा।\nमार्च 2026 में, कोल्लम अतिरिक्त सत्र न्यायालय ने डॉ. वंदना दास की हत्या और अन्य अपराधों के संबंध में जी. संदीप को दोषी पाया। अदालत ने बाद में हत्या के लिए आजीवन कारावास के साथ-साथ अन्य अपराधों के लिए अतिरिक्त सजा सुनाई।\nबाद में केरल उच्च न्यायालय के समक्ष एक अपील दायर की गई। इसलिए ट्रायल कोर्ट के फैसले को ट्रायल चरण के परिणाम के रूप में वर्णित किया जाना चाहिए, और अपील कार्यवाही को अलग से नोट किया जाना चाहिए।",
              "editorialNotes": "विस्तृत सजा-दर-सजा विवरण प्रकाशित करने या मामले की अंतिम स्थिति बताने से पहले ट्रायल निर्णय और बाद की अपील की जांच संबंधित अदालती रिकॉर्ड से की जानी चाहिए। प्रकाशन नोट: नीचे दिए गए स्रोत एक शोध श्रृंखला हैं, न कि मूल अदालती फैसले और आधिकारिक विधायी पाठ की जांच का विकल्प।",
              "verifiedFacts": [
                  "कोट्टारक्करा तालुक अस्पताल, केरल में हाउस सर्जन; अजीजिया मेडिकल कॉलेज से एमबीबीएस पूरा किया।",
                  "10 मई 2023 को कैजुअल्टी विभाग में पुलिस द्वारा लाए गए एक मरीज का इलाज करते समय सर्जिकल कैंची से किए गए हमले में गंभीर रूप से घायल; बाद में KIMS अस्पताल, तिरुवनंतपुरम में निधन।",
                  "मार्च 2026 में कोल्लम अतिरिक्त सत्र न्यायालय ने आरोपी जी. संदीप को दोषी पाया और हत्या के लिए आजीवन कारावास की सजा सुनाई (जिसके बाद केरल उच्च न्यायालय में अपील दायर की गई)।",
                  "केरल ने 2023 में केरल स्वास्थ्य सेवा व्यक्ति और स्वास्थ्य सेवा संस्थान (हिंसा और संपत्ति को नुकसान की रोकथाम) संशोधन कानून के माध्यम से अपने कानून में संशोधन किया।",
                  "उनके माता-पिता ने अलप्पुझा जिले के थ्रिक्कुन्नप्पुझा में डॉ. वंदना दास मेमोरियल क्लिनिक की स्थापना की, जिसका उद्घाटन 10 अक्टूबर 2024 को राज्यपाल आरिफ मोहम्मद खान ने किया।"
              ],
              "societalImpact": "विधायी प्रतिक्रिया: स्वास्थ्य कर्मियों की सुरक्षा\n\nडॉ. वंदना दास की मृत्यु ने स्वास्थ्य पेशेवरों के खिलाफ हिंसा को लेकर सार्वजनिक चिंता को गहरा कर दिया।\nकेरल ने 2023 में केरल स्वास्थ्य सेवा व्यक्ति और स्वास्थ्य सेवा संस्थान (हिंसा और संपत्ति को नुकसान की रोकथाम) संशोधन कानून के माध्यम से स्वास्थ्य सेवा कर्मियों की रक्षा करने वाले अपने कानून में संशोधन किया।\nइस संशोधन ने स्वास्थ्य कर्मियों के खिलाफ हिंसा और स्वास्थ्य संस्थानों को होने वाले नुकसान से निपटने वाले कानूनी ढांचे को मजबूत किया।\nहालांकि, केवल कड़े कानून पारित करने से ही सुरक्षा की गारंटी नहीं मिलती। प्रभावी कार्यान्वयन, रिपोर्टिंग तंत्र, स्टाफ प्रशिक्षण और आपातकालीन-प्रतिक्रिया व्यवस्थाएं अनिवार्य बनी हुई हैं।",
              "actionableLesson": "डॉ. वंदना दास का मामला आपातकालीन-देखभाल वातावरण में व्यावहारिक सुरक्षा उपायों की आवश्यकता को रेखांकित करता है।\n\nस्वास्थ्य संस्थानों को विचार करना चाहिए:\n1. आपातकालीन जोखिम मूल्यांकन: उन स्थितियों की पहचान करें जिनमें रोगी या साथ आने वाले व्यक्ति स्वास्थ्य कर्मियों के लिए तत्काल जोखिम पैदा कर सकते हैं।\n2. त्वरित सुरक्षा प्रतिक्रिया: हिंसा या धमकी होने पर प्रशिक्षित सुरक्षा कर्मचारियों को बुलाने के लिए स्पष्ट प्रक्रियाएं स्थापित करें।\n3. कैजुअल्टी-क्षेत्र की सुरक्षा: आपातकालीन विभागों के लेआउट, निकास द्वारों तक कर्मचारियों की पहुंच और आपातकालीन अलर्ट की उपलब्धता की समीक्षा करें।\n4. डी-एस्केलेशन प्रशिक्षण: धमकी भरी या आक्रामक स्थितियों से निपटने के लिए स्वास्थ्य कर्मियों को व्यावहारिक प्रशिक्षण से लैस करें।\n5. घटना की रिपोर्टिंग और जवाबदेही: सुनिश्चित करें कि धमकियों और हमलों का दस्तावेजीकरण, जांच और उचित संस्थागत और कानूनी प्रक्रियाओं के माध्यम से समाधान किया जाए।\n6. घटना के बाद सहायता: प्रभावित स्वास्थ्य कर्मियों और उनके परिवारों को समय पर चिकित्सा, मनोवैज्ञानिक और कानूनी सहायता प्रदान करें।\n\nये प्रस्तावित संस्थागत सुरक्षा उपाय हैं, न कि यह दावा कि किसी विशेष अस्पताल ने इन्हें लागू किया है।",
              "memorialPublication": {
                  "title": "UltimateHealth दृष्टिकोण: स्वास्थ्य कर्मियों की सुरक्षा और सामुदायिक सेवा की निरंतरता",
                  "focus": "आपातकालीन-देखभाल कार्यस्थल सुरक्षा उपाय और परिवार-नेतृत्व वाली सामुदायिक स्वास्थ्य सेवा",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "डॉ. वंदना दास की कहानी स्वास्थ्य सेवा के दो जुड़े हुए आयामों का प्रतिनिधित्व करती है:\n• स्वास्थ्य कर्मियों की रक्षा करने की जिम्मेदारी: चिकित्सा पेशेवरों को अपने कार्यस्थल में हिंसा का सामना किए बिना उपचार प्रदान करने में सक्षम होना चाहिए।\n• समुदायों की सेवा जारी रखने की जिम्मेदारी: उनके माता-पिता का मेमोरियल क्लिनिक यह दर्शाता है कि कैसे एक परिवार की पहल व्यक्तिगत जीवनकाल से परे स्वास्थ्य सेवा से जुड़े योगदान का विस्तार कर सकती है।\n\nडॉ. वंदना दास को याद करने का अर्थ है सुरक्षित स्वास्थ्य कार्यस्थलों की आवश्यकता और उनके माता-पिता द्वारा किए गए निरंतर योगदान दोनों को मान्यता देना।"
              }
          },
          "bn": {
              "name": "ডা. বন্দনা দাস",
              "roleAndField": "হাউস সার্জন · কোত্তারাক্কারা তালুক হাসপাতাল, কেরালা",
              "categoryLabel": "জরুরি চিকিৎসা ও ক্লিনিক্যাল সুরক্ষা",
              "coreMessage": "জরুরি বিভাগসহ যেকোনো পরিস্থিতিতে চিকিৎসাসেবা প্রদানের সময় স্বাস্থ্যকর্মীদের সুরক্ষা নিশ্চিত করতে হবে। একজন মানুষের স্বাস্থ্যসেবার অবদান তাঁদের মাধ্যমেও বেঁচে থাকতে পারে যাঁরা তাঁর মূল্যবোধকে এগিয়ে নিয়ে যাওয়ার সিদ্ধান্ত নেন।",
              "whoWasThisPerson": "ডা. বন্দনা দাস ছিলেন কেরালার কোত্তারাক্কারা তালুক হাসপাতালের একজন তরুণ হাউস সার্জন। তিনি আজিজিয়া মেডিকেল কলেজ থেকে এমবিবিএস সম্পন্ন করেছিলেন।\nতিনি তাঁর চিকিৎসা জীবনের শুরুতে পেশাগত প্রশিক্ষণের অংশ হিসেবে জরুরি ও অপ্রত্যাশিত পরিস্থিতিতে রোগীদের সেবা প্রদান করছিলেন।",
              "contributions": "একটি চলমান উত্তরাধিকার — তাঁর বাবা-মায়ের অবদান (কমিউনিটি স্বাস্থ্যসেবায় একটি স্বতন্ত্র ও অর্থবহ অবদান)\n\nডা. বন্দনা দাসের গল্প ট্র্যাজেডিতেই শেষ হয়ে যায়নি। তাঁর বাবা-মা তাঁর স্মৃতিতে কেরালার আলাপ্পুঝা জেলার থ্রিক্কুন্নপ্পুঝায় 'ডা. বন্দনা দাস মেমোরিয়াল ক্লিনিক' প্রতিষ্ঠা করেন, যা ১০ অক্টোবর ২০২৪-এ কেরালার তৎকালীন রাজ্যপাল আরিফ মোহাম্মদ খান উদ্বোধন করেন।\nঅর্থনৈতিকভাবে পিছিয়ে পড়া মানুষদের চিকিৎসা সহায়তা দেওয়ার লক্ষ্যে এই উদ্যোগ নেওয়া হয়।\n\nকেন এটি UltimateHealth-এর কাছে গুরুত্বপূর্ণ:\n• এটি পরিবারের সদস্যদের জনসেবামূলক স্বাস্থ্য উদ্যোগকে স্বীকৃতি দেয়।\n• এটি প্রাতিষ্ঠানিক গণ্ডির বাইরে কমিউনিটি-ভিত্তিক স্বাস্থ্যসেবাকে তুলে ধরে।\n• এটি তাঁর বাবা-মাকে এই চলমান প্রচেষ্টার স্বতন্ত্র অবদানকারী হিসেবে স্বীকৃতি দেয়।\n\nসম্পাদকীয় পার্থক্য: ক্লিনিকটির প্রতিষ্ঠা ও উদ্বোধন নথিবদ্ধ। তবে এর বর্তমান কার্যক্রম, সময়সূচি ও রোগীর সংখ্যা সম্পর্কে দাবি করার আগে তা আলাদাভাবে যাচাই করা প্রয়োজন।",
              "factualContext": "১০ মে ২০২৩ তারিখে ডা. বন্দনা দাস পুলিশ প্রহরায় হাসপাতালে আনা এক আহত ব্যক্তির চিকিৎসা করছিলেন। ক্যাজুয়ালটি বিভাগে ক্ষত ড্রেসিং করার সময় ওই ব্যক্তি সার্জিক্যাল কাঁচি দিয়ে তাঁকে আক্রমণ করে। গুরুতর আহত অবস্থায় তাঁকে তিরুবনন্তপুরমের কিমস (KIMS) হাসপাতালে নেওয়া হলে সেখানে তাঁর মৃত্যু হয়।\nঅভিযুক্তের নাম জি. সন্দীপ। নেশাগ্রস্ততা সংক্রান্ত প্রাথমিক জল্পনা প্রতিষ্ঠিত সত্য হিসেবে গণ্য করা উচিত নয়।\n\nবিচারিক প্রক্রিয়া:\nমার্চ ২০২৬-এ কোল্লাম অতিরিক্ত দায়রা আদালত জি. সন্দীপকে হত্যার দায়ে দোষী সাব্যস্ত করে যাবজ্জীবন কারাদণ্ড ও অন্যান্য অপরাধে অতিরিক্ত সাজা প্রদান করে। পরবর্তীতে কেরালা হাইকোর্টে আপিল দায়ের করা হয়।",
              "editorialNotes": "বিচারিক আদালতের রায় এবং পরবর্তী আপিল সম্পর্কে বিস্তারিত প্রকাশের পূর্বে মূল আদালতের নথি ও সরকারি আইনি পাঠ যাচাই করা আবশ্যক।",
              "verifiedFacts": [
                  "কেরালার কোত্তারাক্কারা তালুক হাসপাতালের হাউস সার্জন; আজিজিয়া মেডিকেল কলেজ থেকে এমবিবিএস সম্পন্ন করেন।",
                  "১০ মে ২০২৩-এ ক্যাজুয়ালটি বিভাগে চিকিৎসা চলাকালীন সার্জিক্যাল কাঁচি দিয়ে আক্রমণে গুরুতর আহত হন এবং পরে কিমস হাসপাতালে মৃত্যুবরণ করেন।",
                  "মার্চ ২০২৬-এ কোল্লাম অতিরিক্ত দায়রা আদালত অভিযুক্ত জি. সন্দীপকে যাবজ্জীবন কারাদণ্ড দেয় (যা পরবর্তীতে কেরালা হাইকোর্টে আপিল করা হয়)।",
                  "২০২৩ সালে কেরালা সরকার স্বাস্থ্যকর্মীদের সুরক্ষায় সংশোধনী আইন প্রণয়ন করে।",
                  "তাঁর বাবা-মা আলাপ্পুঝার থ্রিক্কুন্নপ্পুঝায় ডা. বন্দনা দাস মেমোরিয়াল ক্লিনিক প্রতিষ্ঠা করেন, যা ১০ অক্টোবর ২০২৪-এ উদ্বোধন করা হয়।"
              ],
              "societalImpact": "আইনি প্রতিক্রিয়া: স্বাস্থ্যকর্মীদের সুরক্ষা\n\nডা. বন্দনা দাসের মৃত্যু স্বাস্থ্যকর্মীদের বিরুদ্ধে সহিংসতা নিয়ে জনমনে তীব্র উদ্বেগ সৃষ্টি করে। ২০২৩ সালে কেরালা স্বাস্থ্যসেবা কর্মী ও প্রতিষ্ঠান সুরক্ষা (সহিংসতা ও সম্পত্তি ক্ষতি প্রতিরোধ) সংশোধনী আইন পাস হয়। তবে শুধু কঠোর আইন পাস করাই নিরাপত্তার নিশ্চয়তা দেয় না; কার্যকর বাস্তবায়ন, প্রশিক্ষণ ও জরুরি সাড়াদান ব্যবস্থা অপরিহার্য।",
              "actionableLesson": "জরুরি চিকিৎসা পরিবেশে ব্যবহারিক সুরক্ষার প্রয়োজনীয়তা:\n১. জরুরি ঝুঁকি মূল্যায়ন\n২. দ্রুত নিরাপত্তা সাড়া\n৩. ক্যাজুয়ালটি এলাকার নিরাপত্তা ও জরুরি অ্যালার্ট\n৪. ডি-এস্কেলেশন প্রশিক্ষণ\n৫. ঘটনার রিপোর্টিং ও জবাবদিহিতা\n৬. ঘটনা-পরবর্তী চিকিৎসা, মানসিক ও আইনি সহায়তা।\nএগুলো প্রস্তাবিত প্রাতিষ্ঠানিক সুরক্ষা ব্যবস্থা।",
              "memorialPublication": {
                  "title": "UltimateHealth দৃষ্টিভঙ্গি: স্বাস্থ্যকর্মীদের সুরক্ষা ও কমিউনিটি সেবা অব্যাহত রাখা",
                  "focus": "জরুরি বিভাগে কর্মস্থলের সুরক্ষা এবং পরিবার-পরিচালিত কমিউনিটি স্বাস্থ্যসেবা",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ডা. বন্দনা দাসের গল্প স্বাস্থ্যসেবার দুটি সংযুক্ত দিক তুলে ধরে:\n• স্বাস্থ্যকর্মীদের সুরক্ষার দায়িত্ব।\n• সমাজের সেবা অব্যাহত রাখার দায়িত্ব: তাঁর বাবা-মায়ের প্রতিষ্ঠিত মেমোরিয়াল ক্লিনিক দেখায় কীভাবে একটি পরিবারের উদ্যোগ একজন মানুষের জীবনকালের পরেও স্বাস্থ্যসেবার অবদানকে প্রসারিত করতে পারে।"
              }
          },
          "ta": {
              "name": "டாக்டர் வந்தனா தாஸ்",
              "roleAndField": "ஹவுஸ் சர்ஜன் (பயிற்சி மருத்துவர்) · கொட்டாரக்கரா தாலுகா மருத்துவமனை, கேரளா",
              "categoryLabel": "அவசர சிகிச்சை மற்றும் மருத்துவப் பாதுகாப்பு",
              "coreMessage": "அவசர சிகிச்சைப் பிரிவுகள் உட்பட அனைத்து இடங்களிலும் சிகிச்சை அளிக்கும் சுகாதாரப் பணியாளர்கள் பாதுகாக்கப்பட வேண்டும். ஒருவரின் மருத்துவப் பங்களிப்பு, அவரது விழுமியங்களை முன்னெடுத்துச் செல்லும் மனிதர்கள் மூலமாகவும் தொடர முடியும்.",
              "whoWasThisPerson": "டாக்டர் வந்தனா தாஸ் கேரளாவின் கொட்டாரக்கரா தாலுகா மருத்துவமனையில் ஹவுஸ் சர்ஜனாகப் பணியாற்றிய இளம் மருத்துவர். அசீசியா மருத்துவக் கல்லூரியில் தனது எம்பிபிஎஸ் படிப்பை முடித்திருந்தார்.\nதனது மருத்துவப் பணியின் தொடக்கத்தில் இருந்த அவர், அவசர மற்றும் கணிக்க முடியாத சூழல்களில் நோயாளிகளுக்கு சிகிச்சை அளிக்கும் பொறுப்பில் இருந்தார்.",
              "contributions": "தொடரும் மரபு — அவரது பெற்றோரின் பங்களிப்பு (சமூக சுகாதாரத்திற்கு ஒரு தனித்துவமான மற்றும் அர்த்தமுள்ள பங்களிப்பு)\n\nடாக்டர் வந்தனா தாஸின் கதை அந்தத் துயரத்துடன் முடிந்துவிடவில்லை. அவரது பெற்றோர் அவரது நினைவாக ஆலப்புழா மாவட்டம் த்ரிக்குன்னப்புழாவில் 'டாக்டர் வந்தனா தாஸ் நினைவு கிளினிக்கை' நிறுவினர். இது அக்டோபர் 10, 2024 அன்று அப்போதைய கேரள ஆளுநர் ஆரிப் முகமது கானால் திறந்து வைக்கப்பட்டது.\nபொருளாதாரத்தில் பின்தங்கிய மக்களுக்கு மருத்துவ உதவி வழங்குவதே இதன் நோக்கமாகும்.\n\nஇது ஏன் UltimateHealth-க்கு முக்கியமானது:\n• சுகாதாரப் பொதுச் சேவையைத் தொடரும் குடும்ப உறுப்பினர்களின் பங்களிப்பை அங்கீகரிக்கிறது.\n• நிறுவன அமைப்புகளுக்கு அப்பால் சமூக சார்ந்த மருத்துவ சேவையை முன்னிலைப்படுத்துகிறது.\n• அவரது பெற்றோருக்கு தனிப்பட்ட அங்கீகாரத்தை அளிக்கிறது.",
              "factualContext": "மே 10, 2023 அன்று, காவல்துறையினரால் மருத்துவமனைக்குக் கொண்டுவரப்பட்ட ஒருவருக்கு டாக்டர் வந்தனா தாஸ் அவசர சிகிச்சைப் பிரிவில் சிகிச்சை அளித்துக் கொண்டிருந்தார். அப்போது அந்நபர் அறுவை சிகிச்சை கத்திரிக்கோலால் அவரைத் தாக்கினார். பலத்த காயமடைந்த அவர் திருவனந்தபுரம் கிம்ஸ் (KIMS) மருத்துவமனையில் உயிரிழந்தார்.\nகுற்றம் சாட்டப்பட்டவர் ஜி. சந்தீப் என அடையாளம் காணப்பட்டார்.\n\nநீதித்துறை நடவடிக்கைகள்:\nமார்ச் 2026 இல், கொல்லம் கூடுதல் அமர்வு நீதிமன்றம் ஜி. சந்தீப்பைக் குற்றவாளி எனத் தீர்ப்பளித்து ஆயுள் தண்டனை விதித்தது. பின்னர் கேரள உயர் நீதிமன்றத்தில் மேல்முறையீடு செய்யப்பட்டது.",
              "editorialNotes": "விசாரணை நீதிமன்றத் தீர்ப்பு மற்றும் மேல்முறையீட்டு விவரங்களை வெளியிடும் முன் அதிகாரப்பூர்வ நீதிமன்ற ஆவணங்களுடன் சரிபார்க்கப்பட வேண்டும்.",
              "verifiedFacts": [
                  "கேரளாவின் கொட்டாரக்கரா தாலுகா மருத்துவமனையில் ஹவுஸ் சர்ஜன்; அசீசியா மருத்துவக் கல்லூரியில் எம்பிபிஎஸ் முடித்தவர்.",
                  "மே 10, 2023 அன்று அவசர சிகிச்சைப் பிரிவில் நோயாளிக்கு சிகிச்சை அளிக்கும்போது கத்திரிக்கோலால் தாக்கப்பட்டு உயிரிழந்தார்.",
                  "மார்ச் 2026 இல் கொல்லம் கூடுதல் அமர்வு நீதிமன்றம் குற்றவாளி ஜி. சந்தீப்பிற்கு ஆயுள் தண்டனை விதித்தது (கேரள உயர் நீதிமன்றத்தில் மேல்முறையீடு செய்யப்பட்டுள்ளது).",
                  "2023 இல் கேரள அரசு சுகாதாரப் பணியாளர்கள் பாதுகாப்புத் திருத்தச் சட்டத்தை இயற்றியது.",
                  "அவரது பெற்றோர் அக்டோபர் 10, 2024 அன்று ஆலப்புழாவில் டாக்டர் வந்தனா தாஸ் நினைவு கிளினிக்கைத் தொடங்கினர்."
              ],
              "societalImpact": "சட்டமன்ற நடவடிக்கை: சுகாதாரப் பணியாளர்கள் பாதுகாப்பு\n\nடாக்டர் வந்தனா தாஸின் மரணம் சுகாதாரப் பணியாளர்கள் மீதான வன்முறை குறித்த கவலையை அதிகரித்தது. கேரளா 2023 இல் சுகாதாரப் பணியாளர்கள் மற்றும் நிறுவனங்கள் பாதுகாப்புத் திருத்தச் சட்டத்தைக் கொண்டு வந்தது. இருப்பினும், சட்டங்கள் மட்டுமே பாதுகாப்பை உறுதி செய்யாது; முறையான செயல்படுத்தல் மற்றும் அவசரப் பாதுகாப்பு ஏற்பாடுகள் அவசியம்.",
              "actionableLesson": "மருத்துவ நிறுவனங்கள் கவனத்தில் கொள்ள வேண்டியவை:\n1. அவசர ஆபத்து மதிப்பீடு\n2. விரைவான பாதுகாப்பு நடவடிக்கை\n3. அவசர சிகிச்சைப் பிரிவு பாதுகாப்பு\n4. பதற்றம் தணிக்கும் பயிற்சி\n5. சம்பவப் பதிவு மற்றும் பொறுப்புக்கூறல்\n6. சம்பவத்திற்குப் பிந்தைய மருத்துவ, உளவியல் மற்றும் சட்ட ஆதரவு.",
              "memorialPublication": {
                  "title": "UltimateHealth பார்வை: சுகாதாரப் பணியாளர்களைப் பாதுகாப்பதும் சமூக சேவையைத் தொடர்வதும்",
                  "focus": "அவசர சிகிச்சைப் பிரிவு பாதுகாப்பு மற்றும் குடும்பத்தினர் வழிநடத்தும் சமூக மருத்துவம்",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "டாக்டர் வந்தனா தாஸை நினைவுகூர்வது என்பது பாதுகாப்பான மருத்துவப் பணியிடங்களின் தேவையையும், அவரது பெற்றோர் ஆற்றிவரும் தொடர்ச்சியான பங்களிப்பையும் அங்கீகரிப்பதாகும்."
              }
          },
          "or": {
              "name": "ଡା. ବନ୍ଦନା ଦାସ",
              "roleAndField": "ହାଉସ୍ ସର୍ଜନ · କୋଟ୍ଟାରକ୍କରା ତାଲୁକ ହସ୍ପିଟାଲ, କେରଳ",
              "categoryLabel": "ଜରୁରୀକାଳୀନ ଚିକିତ୍ସା ଓ କ୍ଲିନିକାଲ୍ ସୁରକ୍ଷା",
              "coreMessage": "ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତି ସମେତ ରୋଗୀ সেবা ପ୍ରଦାନ ସମୟରେ ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀଙ୍କୁ ସୁରକ୍ଷା ଦିଆଯିବା ଆବଶ୍ୟକ। ଜଣେ ବ୍ୟକ୍ତିଙ୍କ ସ୍ୱାସ୍ଥ୍ୟସେବା ଅବଦାନ ସେମାନଙ୍କ ମୂଲ୍ୟବୋଧକୁ ଆଗକୁ ନେଉଥିବା ଲୋକଙ୍କ ମାଧ୍ୟମରେ ମଧ୍ୟ ଜାରି ରହିପାରେ।",
              "whoWasThisPerson": "ଡା. ବନ୍ଦନା ଦାସ କେରଳର କୋଟ୍ଟାରକ୍କରା ତାଲୁକ ହସ୍ପିଟାଲରେ ହାଉସ୍ ସର୍ଜନ ଭାବେ କାର୍ଯ୍ୟରତ ଜଣେ ଯୁବ ଚିକିତ୍ସକ ଥିଲେ। ସେ ଆଜିଜିଆ ମେଡିକାଲ କଲେଜରୁ ଏମବିବିଏସ ସମାପ୍ତ କରିଥିଲେ।",
              "contributions": "ଏକ ନିରନ୍ତର ପରମ୍ପରା — ତାଙ୍କ ପିତାମାତାଙ୍କ ଅବଦାନ (ସାମୁଦାୟିକ ସ୍ୱାସ୍ଥ୍ୟସେବାରେ ଏକ ସ୍ୱତନ୍ତ୍ର ଓ ଅର୍ଥପୂର୍ଣ୍ଣ ଅବଦାନ)\n\nଡା. ବନ୍ଦନା ଦାସଙ୍କ ପିତାମାତା ତାଙ୍କ স্মୃତିରେ କେରଳର ଆଲାପ୍ପୁଝା ଜିଲ୍ଲାର ଥ୍ରିକୁନ୍ନପ୍ପୁଝାରେ 'ଡା. ବନ୍ଦନା ଦାସ ମେମୋରିଆଲ କ୍ଲିନିକ୍' ସ୍ଥାପନ କରିଥିଲେ, ଯାହା ୧୦ ଅକ୍ଟୋବର ୨୦୨୪ରେ ତତ୍କାଳୀନ ରାଜ୍ୟପାଳ ଆରିଫ ମହମ୍ମଦ ଖାନଙ୍କ ଦ୍ୱାରା ଉଦଘାଟିତ ହୋଇଥିଲା। ଆର୍ଥିକ ଭାବେ ଦୁର୍ବଳ ଲୋକଙ୍କୁ ଚିକିତ୍ସା ସହାୟତା ଯୋଗାଇବା ଏହାର ଉଦ୍ଦେଶ୍ୟ।",
              "factualContext": "୧୦ ମଇ ୨୦୨୩ରେ ପୋଲିସ ଦ୍ୱାରା ଚିକିତ୍ସା ପାଇଁ ଅଣାଯାଇଥିବା ଜଣେ ବ୍ୟକ୍ତିର ଚିକିତ୍ସା କରୁଥିବା ସମୟରେ ଡା. ବନ୍ଦନା ଦାସଙ୍କୁ ସର୍ଜିକାଲ କଇଁଚିରେ ଆକ୍ରମଣ କରାଯାଇଥିଲା। ପରେ ତିରୁବନନ୍ତପୁରମର KIMS ହସ୍ପିଟାଲରେ ତାଙ୍କର ମୃତ୍ୟୁ ଘଟିଥିଲା।\n\nନ୍ୟାୟିକ ପ୍ରକ୍ରିୟା:\nମାର୍ଚ୍ଚ ୨୦୨୬ରେ କୋଲ୍ଲାମ ଅତିରିକ୍ତ ଦୌରା କୋର୍ଟ ଅଭିଯୁକ୍ତ ଜି. ସନ୍ଦୀପକୁ ଦୋଷୀ ସାବ୍ୟସ୍ତ କରି ଆଜୀବନ କାରାଦଣ୍ଡ ଶୁଣାଇଥିଲେ। ପରେ କେରଳ ହାଇକୋର୍ଟରେ ଅପିଲ୍ ଦାୟର କରାଯାଇଥିଲା।",
              "editorialNotes": "ଅଦାଲତଙ୍କ ରାୟ ଏବଂ ପରବର୍ତ୍ତୀ ଅପିଲ୍ ସମ୍ବନ୍ଧୀୟ ବିବରଣୀ ପ୍ରକାଶ କରିବା ପୂର୍ବରୁ ମୂଳ ନଥିପତ୍ର ଯାଞ୍ଚ କରାଯିବା ଉଚିତ।",
              "verifiedFacts": [
                  "କୋଟ୍ଟାରକ୍କରା ତାଲୁକ ହସ୍ପିଟାଲ, କେରଳରେ ହାଉସ୍ ସର୍ଜନ; ଆଜିଜିଆ ମେଡିକାଲ କଲେଜରୁ ଏମବିବିଏସ।",
                  "୧୦ ମଇ ୨୦୨୩ରେ କାଜୁଆଲିଟି ବିଭାଗରେ ସର୍ଜିକାଲ କଇଁଚି ଆକ୍ରମଣରେ ଗୁରୁତର ଆହତ ହୋଇ ଶহୀଦ ହୋଇଥିଲେ।",
                  "ମାର୍ଚ୍ଚ ୨୦୨୬ରେ କୋଲ୍ଲାମ ଅତିରିକ୍ତ ଦୌରା କୋର୍ଟ ଜି. ସନ୍ଦୀପକୁ ଆଜୀବନ କାରାଦଣ୍ଡ ପ୍ରଦାନ କରିଥିଲେ।",
                  "୨୦୨୩ରେ କେରଳ ସରକାର ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀ ସୁରକ୍ଷା ସଂଶୋଧନ ଆଇନ ପ୍ରଣୟନ କରିଥିଲେ।",
                  "ତାଙ୍କ ପିତାମାତା ୧୦ ଅକ୍ଟୋବର ୨୦୨୪ରେ ଡା. ବନ୍ଦନା ଦାସ ମେମୋରିଆଲ କ୍ଲିନିକ୍ ଉଦଘାଟନ କରିଥିଲେ।"
              ],
              "societalImpact": "୨୦୨୩ରେ କେରଳ ସରକାର ସ୍ୱାସ୍ଥ୍ୟସେବା କର୍ମୀ ଏବଂ ଅନୁଷ୍ଠାନ ସୁରକ୍ଷା ସଂଶୋଧନ ଆଇନ ଆଣିଥିଲେ। କିନ୍ତୁ କେବଳ ଆଇନ ନୁହେଁ, ଏହାର ସଠିକ୍ କାର୍ଯ୍ୟାନ୍ୱୟନ ଓ ଜରୁରୀକାଳୀନ ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା ଅପରିହାର୍ଯ୍ୟ।",
              "actionableLesson": "ଡାକ୍ତରଖାନାଗୁଡ଼ିକ ଜରୁରୀକାଳୀନ ବିପଦ ଆକଳନ, ତ୍ୱରିତ ସୁରକ୍ଷା ପ୍ରତିକ୍ରିୟା, କାଜୁଆଲିଟି ସୁରକ୍ଷା, ଡି-ଏସ୍କେଲେସନ ତାଲିମ ଏବଂ ଘଟଣା ପରବର୍ତ୍ତୀ ସହାୟତା ସୁନିଶ୍ଚିତ କରିବା ଉଚିତ।",
              "memorialPublication": {
                  "title": "UltimateHealth ଦୃଷ୍ଟିକୋଣ: ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀଙ୍କ ସୁରକ୍ଷା ଓ ଗୋଷ୍ଠୀ ସେବାର ନିରନ୍ତରତା",
                  "focus": "ଜରୁରୀକାଳୀନ କାର୍ଯ୍ୟସ୍ଥଳୀ ସୁରକ୍ଷା ଓ ପରିବାର ଦ୍ୱାରା ପରିଚାଳିତ ଗୋଷ୍ଠୀ ସ୍ୱାସ୍ଥ୍ୟସେବା",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ଡା. ବନ୍ଦନା ଦାସଙ୍କୁ ସ୍ମରଣ କରିବାର ଅର୍ଥ ହେଉଛି ସୁରକ୍ଷିତ ଚିକିତ୍ସା କାର୍ଯ୍ୟସ୍ଥଳীর ଆବଶ୍ୟକତା ଏବଂ ତାଙ୍କ ପିତାମାତାଙ୍କ ଦ୍ୱାରା ଜାରି ରହିଥିବା ଜନସେବା ଅବଦାନକୁ ସମ୍ମାନ ଜଣାଇବା।"
              }
          },
          "es": {
              "name": "Dra. Vandana Das",
              "roleAndField": "Médica Interna (House Surgeon) · Hospital Taluk de Kottarakkara, Kerala",
              "categoryLabel": "Medicina de Urgencias y Protección Clínica",
              "coreMessage": "Los trabajadores sanitarios deben estar protegidos mientras brindan atención, incluso en entornos de urgencias. La contribución de una persona a la salud también puede continuar a través de quienes eligen llevar adelante sus valores.",
              "whoWasThisPerson": "La Dra. Vandana Das era una joven profesional médica que trabajaba como médica interna (house surgeon) en el Hospital Taluk de Kottarakkara en Kerala. Había completado su licenciatura en medicina (MBBS) en el Azeezia Medical College.\nSe encontraba al inicio de su carrera médica, asumiendo responsabilidades clínicas como parte de su formación profesional en un entorno donde el personal atiende regularmente a pacientes en circunstancias urgentes e impredecibles.",
              "contributions": "Un legado que continúa — La contribución de sus padres (Una contribución independiente y significativa a la salud comunitaria)\n\nLa historia de la Dra. Vandana Das no terminó con la tragedia. Sus padres decidieron establecer una clínica conmemorativa en su memoria, creando una contribución continua a la atención médica más allá del hospital donde ella trabajaba.\nFundaron la Clínica Conmemorativa Dra. Vandana Das en Thrikkunnappuzha, en el distrito de Alappuzha, Kerala. La clínica fue inaugurada el 10 de octubre de 2024 por el entonces gobernador de Kerala, Arif Mohammed Khan.\nLa iniciativa fue concebida para brindar asistencia médica a personas económicamente desfavorecidas.\nEsta contribución merece reconocimiento por derecho propio. Sus padres conectaron el recuerdo con el servicio público, dando al nombre de la Dra. Vandana Das un lugar continuo en la salud comunitaria.\n\nPor qué esto es importante para UltimateHealth:\n• Reconoce la contribución de los familiares que continúan una iniciativa de servicio público relacionada con la salud.\n• Destaca la atención sanitaria orientada a la comunidad más allá de los entornos institucionales.\n• Muestra cómo las iniciativas conmemorativas pueden crear valor práctico cuando se conectan con asistencia médica accesible.\n• Otorga a sus padres un reconocimiento independiente como colaboradores de este esfuerzo continuo.\n\nDistinción editorial: El establecimiento y la inauguración de la clínica están documentados. Su estado operativo actual, horario de servicio, número de pacientes y gama completa de servicios deben verificarse por separado antes de realizar afirmaciones sobre sus actividades en curso.",
              "factualContext": "El 10 de mayo de 2023, la Dra. Vandana Das atendía a un hombre que había sido llevado al hospital por la policía para recibir tratamiento médico tras un altercado.\nMientras ella trataba sus heridas en el departamento de urgencias, el hombre la atacó con tijeras quirúrgicas. Otras personas en el hospital también resultaron heridas durante el incidente.\nLa Dra. Vandana Das sufrió heridas críticas y fue trasladada al Hospital KIMS en Thiruvananthapuram, donde posteriormente falleció.\nEl acusado fue identificado como G. Sandeep. Las especulaciones iniciales sobre intoxicación no deben tratarse como hechos establecidos. Las circunstancias y la defensa legal del acusado fueron asuntos considerados durante el proceso penal posterior.\n\nProcedimientos judiciales:\nEn marzo de 2026, el Tribunal de Sesiones Adicional de Kollam declaró culpable a G. Sandeep en relación con el asesinato de la Dra. Vandana Das y otros delitos, imponiendo una condena a cadena perpetua por el asesinato junto con penas adicionales.\nPosteriormente se presentó una apelación ante el Tribunal Superior de Kerala. Por lo tanto, el veredicto del tribunal de primera instancia debe describirse como el resultado en la etapa de juicio, señalando por separado el proceso de apelación.",
              "editorialNotes": "La sentencia del juicio y la apelación posterior deben verificarse con los registros judiciales pertinentes antes de publicar descripciones detalladas de las penas o afirmar el estado definitivo del caso. Nota de publicación: Las fuentes enumeradas son un rastro de investigación, no un sustituto de la verificación de la sentencia judicial original y el texto legislativo oficial.",
              "verifiedFacts": [
                  "Médica interna (house surgeon) en el Hospital Taluk de Kottarakkara, Kerala; graduada MBBS en Azeezia Medical College.",
                  "Atacada mortalmente el 10 de mayo de 2023 con tijeras quirúrgicas mientras atendía a un paciente llevado por la policía al servicio de urgencias; falleció en el Hospital KIMS de Thiruvananthapuram.",
                  "En marzo de 2026, el Tribunal de Sesiones Adicional de Kollam declaró culpable a G. Sandeep y le impuso cadena perpetua por asesinato (con apelación posterior ante el Tribunal Superior de Kerala).",
                  "Kerala reformó su legislación mediante la Ley de Enmienda de Personas e Instituciones de Servicios de Salud de Kerala de 2023.",
                  "Sus padres fundaron la Clínica Conmemorativa Dra. Vandana Das en Thrikkunnappuzha, distrito de Alappuzha, inaugurada el 10 de octubre de 2024 por el gobernador Arif Mohammed Khan."
              ],
              "societalImpact": "Respuesta legislativa: Protección de los trabajadores sanitarios\n\nLa muerte de la Dra. Vandana Das intensificó la preocupación pública por la violencia contra los profesionales de la salud.\nKerala modificó su legislación mediante la enmienda de 2023 a la Ley de Personas e Instituciones de Servicios de Salud de Kerala (Prevención de la Violencia y Daños a la Propiedad), fortaleciendo el marco legal.\nSin embargo, aprobar leyes más estrictas por sí solo no garantiza la seguridad. La implementación efectiva, los mecanismos de denuncia, la capacitación del personal y los protocolos de respuesta de emergencia siguen siendo esenciales.",
              "actionableLesson": "El caso de la Dra. Vandana Das destaca la necesidad de salvaguardias prácticas en entornos de atención de urgencias.\n\nLas instituciones sanitarias deben considerar:\n1. Evaluación de riesgos en urgencias: Identificar situaciones en las que pacientes o acompañantes puedan representar un riesgo inmediato.\n2. Respuesta rápida de seguridad: Procedimientos claros para llamar a personal de seguridad capacitado.\n3. Seguridad en el área de urgencias: Revisar el diseño de los departamentos de emergencia, el acceso a salidas y las alertas de emergencia.\n4. Capacitación en desescalada: Dotar al personal sanitario de formación práctica ante situaciones amenazantes.\n5. Notificación de incidentes y rendición de cuentas: Garantizar que las amenazas y agresiones se documenten e investiguen.\n6. Apoyo posterior al incidente: Brindar apoyo médico, psicológico y legal oportuno.\n\nEstas son salvaguardias institucionales propuestas, no afirmaciones de que un hospital en particular las haya implementado.",
              "memorialPublication": {
                  "title": "La perspectiva de UltimateHealth: Proteger al personal sanitario y continuar el servicio comunitario",
                  "focus": "Salvaguardias en salas de urgencias y atención sanitaria comunitaria impulsada por la familia",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "La historia de la Dra. Vandana Das representa dos dimensiones conectadas de la atención sanitaria:\n• La responsabilidad de proteger a los trabajadores de la salud.\n• La responsabilidad de seguir sirviendo a las comunidades: la clínica conmemorativa de sus padres demuestra cómo la iniciativa de una familia puede extender una contribución sanitaria más allá de una vida individual.\n\nRecordar a la Dra. Vandana Das significa reconocer tanto la necesidad de lugares de trabajo sanitarios más seguros como la contribución continua realizada por sus padres."
              }
          },
          "fr": {
              "name": "Dre Vandana Das",
              "roleAndField": "Interne en médecine (House Surgeon) · Hôpital Taluk de Kottarakkara, Kerala",
              "categoryLabel": "Médecine d'Urgence et Protection Clinique",
              "coreMessage": "Les professionnels de santé doivent être protégés lorsqu'ils prodiguent des soins, y compris dans les services d'urgence. La contribution d'une personne à la santé peut également se poursuivre à travers celles et ceux qui choisissent de faire vivre ses valeurs.",
              "whoWasThisPerson": "La Dre Vandana Das était une jeune professionnelle de santé travaillant comme interne (house surgeon) à l'hôpital Taluk de Kottarakkara, au Kerala. Elle avait obtenu son diplôme MBBS à l'Azeezia Medical College.\nElle était au début de sa carrière médicale, assumant des responsabilités cliniques dans un environnement où le personnel soignant prend régulièrement en charge des patients dans des circonstances urgentes et imprévisibles.",
              "contributions": "Un héritage poursuivi — La contribution de ses parents (Une contribution distincte et significative à la santé communautaire)\n\nL'histoire de la Dre Vandana Das ne s'est pas arrêtée à la tragédie. Ses parents ont choisi de créer une clinique commémorative en sa mémoire, prolongeant sa contribution aux soins de santé au-delà de l'hôpital où elle avait travaillé.\nIls ont fondé la Clinique commémorative Dre Vandana Das à Thrikkunnappuzha, dans le district d'Alappuzha, au Kerala. La clinique a été inaugurée le 10 octobre 2024 par le gouverneur du Kerala de l'époque, Arif Mohammed Khan, afin d'offrir une assistance médicale aux personnes économiquement défavorisées.\n\nPourquoi cela compte pour UltimateHealth :\n• Cela reconnaît la contribution des membres de la famille qui poursuivent une initiative de service public liée à la santé.\n• Cela met en lumière des soins de santé tournés vers la communauté au-delà des cadres institutionnels.\n• Cela montre comment les initiatives commémoratives peuvent créer une valeur concrète lorsqu'elles sont liées à une aide médicale accessible.\n• Cela accorde à ses parents une reconnaissance indépendante en tant que contributeurs à cet effort continu.\n\nDistinction éditoriale : La création et l'inauguration de la clinique sont documentées. Son statut opérationnel actuel, ses horaires, le nombre de patients et l'éventail complet des services doivent être vérifiés séparément avant toute affirmation sur ses activités en cours.",
              "factualContext": "Le 10 mai 2023, la Dre Vandana Das soignait un homme amené à l'hôpital par la police pour recevoir des soins médicaux à la suite d'une altercation.\nAlors qu'elle soignait ses blessures aux urgences, l'homme l'a attaquée avec des ciseaux chirurgicaux. D'autres personnes présentes à l'hôpital ont également été blessées.\nGrièvement blessée, la Dre Vandana Das a été transportée à l'hôpital KIMS de Thiruvananthapuram, où elle est décédée.\nL'accusé a été identifié comme G. Sandeep. Les premières spéculations sur une éventuelle intoxication ne doivent pas être traitées comme des faits établis.\n\nProcédures judiciaires :\nEn mars 2026, le tribunal correctionnel supplémentaire de Kollam a déclaré G. Sandeep coupable du meurtre de la Dre Vandana Das et d'autres infractions, le condamnant à la réclusion à perpétuité ainsi qu'à des peines complémentaires.\nUn appel a ensuite été interjeté devant la Haute Cour du Kerala. Le verdict doit donc être décrit comme l'issue en première instance, la procédure d'appel étant mentionnée séparément.",
              "editorialNotes": "Le jugement de première instance et l'appel ultérieur doivent être vérifiés auprès des registres judiciaires compétents avant de publier le détail des peines ou d'indiquer le statut définitif de l'affaire.",
              "verifiedFacts": [
                  "Interne (house surgeon) à l'hôpital Taluk de Kottarakkara, Kerala ; diplômée MBBS de l'Azeezia Medical College.",
                  "Mortellement attaquée le 10 mai 2023 avec des ciseaux chirurgicaux alors qu'elle soignait un patient amené par la police aux urgences ; décédée à l'hôpital KIMS de Thiruvananthapuram.",
                  "En mars 2026, le tribunal de Kollam a reconnu G. Sandeep coupable et l'a condamné à la prison à perpétuité (décision frappée d'appel devant la Haute Cour du Kerala).",
                  "Le Kerala a amendé sa législation en 2023 pour renforcer la protection des personnels et établissements de santé.",
                  "Ses parents ont créé la Clinique commémorative Dre Vandana Das à Thrikkunnappuzha (district d'Alappuzha), inaugurée le 10 octobre 2024 par le gouverneur Arif Mohammed Khan."
              ],
              "societalImpact": "Réponse législative : Protection des professionnels de santé\n\nLe décès de la Dre Vandana Das a accru l'inquiétude publique face aux violences contre les soignants.\nEn 2023, le Kerala a amendé sa législation protégeant le personnel et les établissements de santé contre la violence et les dégradations.\nToutefois, l'adoption de lois plus strictes ne garantit pas à elle seule la sécurité : une mise en œuvre effective, des mécanismes de signalement, la formation du personnel et des dispositifs d'intervention d'urgence demeurent essentiels.",
              "actionableLesson": "Le cas de la Dre Vandana Das souligne la nécessité de garanties pratiques dans les services d'urgence :\n1. Évaluation des risques aux urgences\n2. Intervention rapide de sécurité\n3. Sécurité de la zone d'accueil des urgences (issues, alertes)\n4. Formation à la désescalade\n5. Signalement des incidents et responsabilité institutionnelle\n6. Soutien médical, psychologique et juridique après un incident.\n\nIl s'agit de mesures de protection institutionnelles proposées, et non d'affirmations selon lesquelles un hôpital particulier les aurait mises en œuvre.",
              "memorialPublication": {
                  "title": "La perspective d'UltimateHealth : Protéger les soignants et poursuivre le service communautaire",
                  "focus": "Mesures de sécurité aux urgences et soins de santé communautaires portés par la famille",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "L'histoire de la Dre Vandana Das incarne deux dimensions liées des soins de santé :\n• La responsabilité de protéger les travailleurs de la santé.\n• La responsabilité de continuer à servir les communautés : la clinique commémorative créée par ses parents montre comment l'initiative d'une famille peut prolonger une contribution médicale au-delà d'une vie individuelle.\n\nSe souvenir de la Dre Vandana Das signifie reconnaître à la fois le besoin de lieux de travail hospitaliers plus sûrs et la contribution continue apportée par ses parents."
              }
          },
          "de": {
              "name": "Dr. Vandana Das",
              "roleAndField": "Assistenzärztin im Praktikum (House Surgeon) · Kottarakkara Taluk Hospital, Kerala",
              "categoryLabel": "Notfallmedizin & Klinischer Arbeitsschutz",
              "coreMessage": "Medizinisches Personal muss bei der Patientenversorgung geschützt werden, insbesondere in Notaufnahmen. Der Beitrag eines Menschen zur Gesundheitsversorgung kann auch durch jene weiterleben, die seine Werte fortführen.",
              "whoWasThisPerson": "Dr. Vandana Das war eine junge Ärztin, die als House Surgeon am Kottarakkara Taluk Hospital in Kerala arbeitete. Ihr MBBS-Studium hatte sie am Azeezia Medical College abgeschlossen.\nSie stand am Beginn ihrer medizinischen Laufbahn und übernahm im Rahmen ihrer klinischen Ausbildung Verantwortung in einem Umfeld, in dem medizinisches Personal regelmäßig Patienten unter dringenden und unvorhersehbaren Umständen versorgt.",
              "contributions": "Ein fortgeführtes Vermächtnis — Der Beitrag ihrer Eltern (Ein eigenständiger und bedeutsamer Beitrag zur kommunalen Gesundheitsversorgung)\n\nDie Geschichte von Dr. Vandana Das endete nicht mit der Tragödie. Ihre Eltern entschieden sich, zu ihrem Gedenken eine Gedächtnisklinik zu gründen und damit einen fortlaufenden Beitrag zur Gesundheitsversorgung über das Krankenhaus hinaus zu schaffen, in dem sie gearbeitet hatte.\nSie gründeten die Dr. Vandana Das Memorial Clinic in Thrikkunnappuzha im Distrikt Alappuzha, Kerala. Die Klinik wurde am 10. Oktober 2024 vom damaligen Gouverneur von Kerala, Arif Mohammed Khan, eingeweiht, um wirtschaftlich benachteiligten Menschen medizinische Hilfe zu bieten.\n\nWarum dies für UltimateHealth wichtig ist:\n• Es würdigt den Beitrag von Familienangehörigen, die eine gemeinnützige Gesundheitsinitiative weiterführen.\n• Es hebt die gemeindeorientierte Gesundheitsversorgung jenseits institutioneller Einrichtungen hervor.\n• Es zeigt, wie Gedenkinitiativen praktischen Nutzen stiften, wenn sie mit zugänglicher medizinischer Hilfe verbunden sind.\n• Es gibt ihren Eltern eine eigenständige Anerkennung als Träger dieses fortlaufenden Engagements.\n\nRedaktionelle Abgrenzung: Die Gründung und Einweihung der Klinik sind dokumentiert. Ihr aktueller Betriebsstatus, die Öffnungszeiten, Patientenzahlen und das genaue Leistungsspektrum sollten separat überprüft werden, bevor Aussagen über den laufenden Betrieb getroffen werden.",
              "factualContext": "Am 10. Mai 2023 behandelte Dr. Vandana Das einen Mann, der nach einer Auseinandersetzung von der Polizei zur medizinischen Versorgung ins Krankenhaus gebracht worden war.\nWährend sie seine Verletzungen in der Notaufnahme versorgte, griff der Mann sie mit einer chirurgischen Schere an. Auch weitere Personen im Krankenhaus wurden verletzt.\nDr. Vandana Das erlitt lebensgefährliche Verletzungen und wurde in das KIMS Hospital in Thiruvananthapuram gebracht, wo sie später verstarb.\nDer Beschuldigte wurde als G. Sandeep identifiziert. Frühe Spekulationen über eine Intoxikation sollten nicht als gesicherte Tatsache behandelt werden.\n\nGerichtsverfahren:\nIm März 2026 sprach das Kollam Additional Sessions Court G. Sandeep im Zusammenhang mit dem Mord an Dr. Vandana Das und weiteren Straftaten schuldig und verhängte eine lebenslange Freiheitsstrafe sowie weitere Strafen.\nAnschließend wurde Berufung beim Kerala High Court eingelegt. Das Urteil ist daher als Ergebnis der ersten Instanz zu beschreiben, wobei das Berufungsverfahren gesondert zu vermerken ist.",
              "editorialNotes": "Das erstinstanzliche Urteil und das anschließende Berufungsverfahren sollten anhand der Gerichtsakten überprüft werden, bevor detaillierte Strafmaße veröffentlicht oder Aussagen zum endgültigen Verfahrensstand getroffen werden.",
              "verifiedFacts": [
                  "House Surgeon am Kottarakkara Taluk Hospital, Kerala; MBBS-Abschluss am Azeezia Medical College.",
                  "Am 10. Mai 2023 in der Notaufnahme bei der Behandlung eines von der Polizei gebrachten Patienten mit einer chirurgischen Schere tödlich angegriffen; verstarb später im KIMS Hospital, Thiruvananthapuram.",
                  "Im März 2026 verurteilte das Kollam Additional Sessions Court G. Sandeep wegen Mordes zu lebenslanger Haft (Berufung beim Kerala High Court anhängig).",
                  "Kerala verschärfte 2023 sein Gesetz zum Schutz von Gesundheitspersonal und medizinischen Einrichtungen.",
                  "Ihre Eltern gründeten die Dr. Vandana Das Memorial Clinic in Thrikkunnappuzha (Distrikt Alappuzha), die am 10. Oktober 2024 von Gouverneur Arif Mohammed Khan eingeweiht wurde."
              ],
              "societalImpact": "Gesetzgeberische Reaktion: Schutz von Gesundheitspersonal\n\nDer Tod von Dr. Vandana Das verstärkte die öffentliche Besorgnis über Gewalt gegen medizinisches Fachpersonal.\nKerala änderte 2023 seine Gesetzgebung zum Schutz des Gesundheitspersonals und der Gesundheitseinrichtungen vor Gewalt und Sachbeschädigung.\nStrengere Gesetze allein garantieren jedoch noch keine Sicherheit: Eine wirksame Umsetzung, Meldesysteme, Personalschulungen und Notfallmaßnahmen bleiben unerlässlich.",
              "actionableLesson": "Der Fall von Dr. Vandana Das verdeutlicht die Notwendigkeit praktischer Schutzmaßnahmen in Notaufnahmen:\n1. Risikobewertung in der Notaufnahme\n2. Schnelle Sicherheitsreaktion\n3. Sicherheit im Behandlungsbereich (Fluchtwege, Notrufknöpfe)\n4. Deeskalationstraining\n5. Vorfallmeldung und institutionelle Rechenschaftspflicht\n6. Medizinische, psychologische und rechtliche Unterstützung nach Vorfällen.\n\nDies sind vorgeschlagene institutionelle Schutzmaßnahmen und keine Behauptungen, dass ein bestimmtes Krankenhaus sie bereits umgesetzt hat.",
              "memorialPublication": {
                  "title": "Die UltimateHealth-Perspektive: Schutz des Gesundheitspersonals & Fortführung des Dienstes an der Gemeinschaft",
                  "focus": "Sicherheitsstandards in der Notaufnahme & familiengeführte kommunale Gesundheitsversorgung",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Die Geschichte von Dr. Vandana Das steht für zwei miteinander verbundene Dimensionen des Gesundheitswesens:\n• Die Verantwortung, medizinisches Personal am Arbeitsplatz vor Gewalt zu schützen.\n• Die Verantwortung, Gemeinschaften weiter zu dienen: Die Gedächtnisklinik ihrer Eltern zeigt, wie eine Familieninitiative einen Beitrag zur Gesundheitsversorgung über ein einzelnes Leben hinaus weiterführen kann.\n\nDr. Vandana Das zu gedenken bedeutet, sowohl die Notwendigkeit sicherer medizinischer Arbeitsplätze als auch den fortlaufenden Beitrag ihrer Eltern anzuerkennen."
              }
          },
          "hr": {
              "name": "Dr. Vandana Das",
              "roleAndField": "Liječnica pripravnica (House Surgeon) · Bolnica Kottarakkara Taluk, Kerala",
              "categoryLabel": "Hitna medicina i klinička zaštita",
              "coreMessage": "Zdravstveni radnici moraju biti zaštićeni dok pružaju skrb, uključujući i u hitnim službama. Doprinos osobe zdravstvu može se nastaviti i kroz ljude koji odluče dalje nositi njezine vrijednosti.",
              "whoWasThisPerson": "Dr. Vandana Das bila je mlada liječnica koja je radila kao pripravnica (house surgeon) u bolnici Kottarakkara Taluk u Kerali. Završila je studij medicine (MBBS) na Azeezia Medical Collegeu.\nBila je na početku svoje liječničke karijere, preuzimajući kliničke odgovornosti u okruženju u kojem zdravstveno osoblje redovito zbrinjava pacijente u hitnim i nepredvidivim okolnostima.",
              "contributions": "Nastavljeno nasljeđe — Doprinos njezinih roditelja (Zaseban i značajan doprinos zdravstvenoj skrbi u zajednici)\n\nPriča dr. Vandane Das nije završila tragedijom. Njezini su roditelji odlučili osnovati memorijalnu kliniku u njezin spomen, stvarajući trajni doprinos zdravstvu izvan bolnice u kojoj je radila.\nOsnovali su Memorijalnu kliniku dr. Vandana Das u Thrikkunnappuzhi, u okrugu Alappuzha u Kerali. Kliniku je 10. listopada 2024. svečano otvorio tadašnji guverner Kerale Arif Mohammed Khan kako bi pružala medicinsku pomoć ekonomski ugroženim osobama.\n\nZašto je ovo važno za UltimateHealth:\n• Priznaje doprinos članova obitelji koji nastavljaju javnozdravstvenu inicijativu.\n• Ističe zdravstvenu skrb usmjerenu na zajednicu izvan institucionalnih okvira.\n• Pokazuje kako memorijalne inicijative mogu stvoriti praktičnu vrijednost kada su povezane s dostupnom medicinskom pomoći.\n• Daje njezinim roditeljima neovisno priznanje kao sudionicima ovog trajnog pothvata.\n\nUrednička napomena: Osnivanje i otvaranje klinike su dokumentirani. Njezin trenutačni radni status, raspored rada, broj pacijenata i puni opseg usluga trebaju se zasebno provjeriti prije iznošenja tvrdnji o tekućim aktivnostima.",
              "factualContext": "Dana 10. svibnja 2023. dr. Vandana Das pružala je liječničku pomoć muškarcu kojeg je policija dovela u bolnicu nakon sukoba.\nDok mu je obrađivala ozljede na hitnom prijemu, muškarac ju je napao kirurškim škarama. U incidentu su ozlijeđene i druge osobe u bolnici.\nDr. Vandana Das zadobila je teške ozljede te je prevezena u bolnicu KIMS u Thiruvananthapuramu, gdje je kasnije preminula.\nOptuženik je identificiran kao G. Sandeep. Rana nagađanja o intoksikaciji ne bi se trebala tretirati kao utvrđena činjenica.\n\nSudski postupak:\nU ožujku 2026. Dodatni okružni sud u Kollamu proglasio je G. Sandeepa krivim za ubojstvo dr. Vandane Das i druga kaznena djela te mu izrekao kaznu doživotnog zatvora.\nNaknadno je podnesena žalba Visokom sudu u Kerali, stoga se presuda treba opisati kao ishod prvostupanjskog postupka uz zasebno navođenje žalbenog postupka.",
              "editorialNotes": "Prvostupanjsku presudu i naknadnu žalbu potrebno je provjeriti u odgovarajućim sudskim spisima prije objavljivanja detaljnih opisa kazni ili navođenja konačnog statusa predmeta.",
              "verifiedFacts": [
                  "Liječnica pripravnica (house surgeon) u bolnici Kottarakkara Taluk, Kerala; diplomirala MBBS na Azeezia Medical Collegeu.",
                  "Smrtno napadnuta 10. svibnja 2023. kirurškim škarama dok je liječila pacijenta dovedenog u pratnji policije na hitni prijem; preminula u bolnici KIMS u Thiruvananthapuramu.",
                  "U ožujku 2026. sud u Kollamu osudio je G. Sandeepa na doživotni zatvor zbog ubojstva (podnesena žalba Visokom sudu u Kerali).",
                  "Kerala je 2023. izmijenila zakon o zaštiti zdravstvenih djelatnika i zdravstvenih ustanova od nasilja.",
                  "Njezini roditelji osnovali su Memorijalnu kliniku dr. Vandana Das u Thrikkunnappuzhi (okrug Alappuzha), otvorenu 10. listopada 2024."
              ],
              "societalImpact": "Zakonodavni odgovor: Zaštita zdravstvenih radnika\n\nSmrt dr. Vandane Das pojačala je zabrinutost javnosti zbog nasilja nad zdravstvenim djelatnicima.\nKerala je 2023. izmijenila zakonodavstvo kojim se štite zdravstveni radnici i ustanove od nasilja i oštećenja imovine.\nMeđutim, samo donošenje strožih zakona ne jamči sigurnost; učinkovita provedba, mehanizmi prijave, edukacija osoblja i protokoli hitnog reagiranja ostaju ključni.",
              "actionableLesson": "Slučaj dr. Vandane Das naglašava potrebu za praktičnim zaštitnim mjerama u hitnim službama:\n1. Procjena rizika u hitnom prijemu\n2. Brza reakcija službe sigurnosti\n3. Sigurnost prostora hitnog prijema (izlazi, hitni alarmi)\n4. Edukacija o deeskalaciji sukoba\n5. Prijavljivanje incidenata i odgovornost\n6. Medicinska, psihološka i pravna podrška nakon incidenta.\n\nOvo su predložene institucionalne mjere zaštite, a ne tvrdnje da ih je određena bolnica provela.",
              "memorialPublication": {
                  "title": "Perspektiva UltimateHealtha: Zaštita zdravstvenih radnika i nastavak služenja zajednici",
                  "focus": "Zaštitne mjere u hitnoj službi i obiteljski vođena zdravstvena skrb u zajednici",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Priča dr. Vandane Das predstavlja dvije povezane dimenzije zdravstva:\n• Odgovornost za zaštitu zdravstvenih radnika.\n• Odgovornost za nastavak služenja zajednici: memorijalna klinika njezinih roditelja pokazuje kako obiteljska inicijativa može produžiti zdravstveni doprinos izvan pojedinačnog života.\n\nSjećanje na dr. Vandanu Das znači prepoznavanje potrebe za sigurnijim zdravstvenim radnim mjestima i trajnog doprinosa njezinih roditelja."
              }
          }
      }
  },
    {
      "id": 4,
      "slug": "dr-tamara-oneal",
      "name": "Dr. Tamara O’Neal",
      "country": "United States",
      "countryFlag": "🇺🇸",
      "category": "healthcare",
      "categoryLabel": "Emergency Medicine & Workplace Defense",
      "eraOrYear": "2018",
      "roleAndField": "Attending Emergency Medicine Physician · Mercy Hospital & Medical Center, Chicago, Illinois",
      "avatarUrl": "/assets/dr-tamara-oneal.jpeg",
      "verificationStatus": "Verified",
      "lastVerifiedAt": "2026-11-07",
      "coreMessage": "Intimate-partner violence can follow people into their workplaces. Healthcare institutions must take credible threats seriously, provide confidential reporting and support mechanisms, and coordinate emergency responses that protect employees, patients, and visitors.",
      "whoWasThisPerson": "Dr. Tamara O’Neal was a 38-year-old emergency medicine physician at Mercy Hospital & Medical Center in Chicago.\nShe graduated from the University of Illinois College of Medicine in 2014 and completed her emergency medicine residency in 2017. She had also participated in Southern Illinois University's Medical/Dental Education Preparatory Program (MEDPREP) between 2007 and 2009.\nBeyond her clinical work, she volunteered to teach clinical residents at Mercy Hospital. She was remembered by colleagues and friends for her commitment to community service, her generosity, and her ability to bring people together.\nShe also led her church choir and raised money for disadvantaged children. Her commitment to helping underserved communities was reflected in her choice of emergency medicine, a field in which she could care for people who might otherwise struggle to access timely medical attention.",
      "contributions": "Dr. O’Neal's contribution extended beyond treating patients in the emergency department.\n\nClinical service:\n• Worked as an emergency medicine attending physician at Mercy Hospital in Chicago.\n• Provided emergency care to patients in an urban hospital setting.\n• Continued to support medical education by volunteering to teach clinical residents.\n\nEducation and mentorship:\n• Participated in UIC's Urban Health Program.\n• Encouraged underrepresented students to consider careers in medicine.\n• Supported the development of future healthcare professionals through her teaching and personal mentorship.\n\nCommunity service:\n• Raised money for disadvantaged children.\n• Led her church choir.\n• Demonstrated a strong commitment to serving underserved communities, particularly Chicago's South Side.\n\nHer university and professional communities remembered her not only as a physician, but also as someone who actively supported the people around her.\n\nA Legacy Continued — Scholarships and Medical Education:\nDr. O’Neal's educational and community legacy has continued through scholarships established in her memory.\n\nA. Tamara O’Neal MD Scholarship Fund — University of Illinois Chicago\nIn March 2019, a group of twelve fellow UIC College of Medicine alumni established the Tamara O’Neal MD Scholarship Fund.\nThe fund was created to support medical students and honour her commitment to medical education and underserved communities.\nThe initial fundraising effort raised more than $68,000. The alumni hoped to build an ongoing endowed scholarship.\nThe scholarship was designed to support:\n• A first-year medical student participating in UIC's Urban Health Program.\n• Potential additional support for a fourth-year medical student pursuing emergency medicine residency, depending on available funding.\nUIC also highlighted Dr. O’Neal's commitment to encouraging underrepresented students to consider medicine as a career.\n\nB. Dr. Tamara O’Neal MEDPREP Scholarship — Southern Illinois University\nSouthern Illinois University Foundation also recognises Dr. O’Neal through the Dr. Tamara O’Neal MEDPREP Scholarship.\nThe scholarship honours her as a former MEDPREP student from 2007–2009.\nThe university's foundation describes her passion for helping her community and her desire to serve people in Chicago, particularly on the South Side.\nThe MEDPREP scholarship supports students pursuing medical or dental education. Awards are based on academic performance, community service, and/or financial need.\n\nWhy These Scholarships Matter:\nThese are more than commemorative names. They connect Dr. O’Neal's educational journey with opportunities for future students. Her participation in preparatory education, medical school, residency, and emergency medicine is now remembered through initiatives that can help other students pursue healthcare careers.\nThe scholarships also recognise the role of medical education in building a more representative healthcare workforce.\nUltimateHealth recognises these scholarship initiatives as a distinct and continuing part of her legacy.",
      "factualContext": "On 19 November 2018, Dr. Tamara O’Neal was fatally shot in the parking lot of Mercy Hospital & Medical Center in Chicago.\nHer former fiancé, Juan Lopez, had gone to the hospital and was waiting for her. According to the official Cook County investigation, he confronted her in the parking lot. After an argument, he produced a semi-automatic handgun and shot her several times.\nContemporary reporting stated that Dr. O’Neal had called 911 to report that her former fiancé was at the hospital with a gun.\nAfter shooting her, Lopez entered the hospital building and shot pharmacy resident Dayna Less, who was in the lobby near an elevator.\nHe subsequently encountered responding police officers inside the hospital. Chicago Police Officer Samuel Jimenez was shot and later died from his injuries during the confrontation.\nLopez was fatally shot by a responding police officer. The Cook County review concluded that the officer's use of deadly force was legally justified under the circumstances. The official medical findings also documented a self-inflicted gunshot wound to Lopez's head, but his death was classified as a homicide because another gunshot wound was inflicted by the officer.\n\nThe incident resulted in the deaths of three victims:\n• Dr. Tamara O’Neal — Emergency medicine physician.\n• Dayna Less — Pharmacy resident.\n• Samuel Jimenez — Chicago Police Officer.\n\nThe gunman's death was also confirmed in the official investigation.\nThis incident exposed a particularly difficult workplace-safety challenge: a threat originating from an individual's personal life can enter a healthcare facility and endanger employees, patients, visitors, and responding personnel.",
      "editorialNotes": "Publication note: The biographical, scholarship, and incident details above are supported by institutional records and contemporary reporting. The proposed workplace-safety guide is an UltimateHealth initiative, not a historical reform attributed to Dr. O’Neal's death. The H.R. 1195 legislative history is included for context, not as a direct consequence of this case.",
      "verifiedFacts": [
          "38-year-old attending emergency medicine physician at Mercy Hospital & Medical Center, Chicago; graduated UIC College of Medicine (2014), completed residency (2017), and attended SIU MEDPREP (2007–2009).",
          "Fatally shot on 19 November 2018 in the Mercy Hospital parking lot by her former fiancé, Juan Lopez, who then entered the hospital and killed pharmacy resident Dayna Less and Chicago Police Officer Samuel Jimenez.",
          "Cook County State's Attorney investigation documented that Lopez sustained a self-inflicted gunshot wound to the head and a fatal gunshot wound inflicted by a responding officer (classified as justifiable homicide).",
          "Memorial scholarships established in her honour at the University of Illinois Chicago (Tamara O’Neal MD Scholarship Fund, March 2019) and Southern Illinois University (Dr. Tamara O’Neal MEDPREP Scholarship).",
          "Mourned in official statements by the American College of Emergency Physicians (ACEP, 20 Nov 2018), National Medical Association (NMA, 21 Nov 2018), and Emergency Medicine Residents' Association (EMRA, 26 Nov 2018)."
      ],
      "societalImpact": "Professional and Institutional Response:\n\nAmerican College of Emergency Physicians (ACEP)\nOn 20 November 2018, the American College of Emergency Physicians issued an official statement mourning Dr. O’Neal and the other victims.\nACEP described the incident as an apparent domestic-violence-related shooting and expressed concern about the wider problem of firearm violence.\nThe organisation also reaffirmed its support for:\n• Research into firearm-related injuries and deaths.\n• Extreme Risk Protection Orders (ERPOs) and Gun Violence Restraining Orders (GVROs).\n• Public-health approaches to firearm injury prevention.\n• Legislative and regulatory measures addressing firearm-related risks.\n\nEmergency Medicine Residents' Association (EMRA)\nThe Emergency Medicine Residents' Association issued a statement on 26 November 2018, expressing condolences and recognising Dr. O’Neal's contribution to emergency medicine and the people around her.\n\nEmergency Nurses Association (ENA)\nENA has continued to advocate for safer emergency departments and stronger workplace-violence prevention practices. Its later collaboration with ACEP included the No Silence on ED Violence campaign, launched in 2019.\nThese organisational initiatives should be understood as part of a broader, continuing response to violence against healthcare workers. They should not be represented as reforms caused solely by Dr. O’Neal's death.\n\nSocietal Impact and the Legislative Context — Workplace Violence Prevention for Healthcare Workers:\nThe Mercy Hospital shooting became part of the wider national discussion about healthcare workplace safety.\nHowever, one legislative claim requires careful distinction.\nH.R. 1195, the Workplace Violence Prevention for Health Care and Social Service Workers Act, was introduced in the 117th United States Congress on 22 February 2021.\nThe proposed legislation sought to require covered healthcare and social-service employers to develop and implement comprehensive workplace-violence prevention plans.\nThe House passed the bill on 16 April 2021. It was subsequently received in the Senate and referred to the Senate Committee on Health, Education, Labor, and Pensions.\nImportant factual distinction: H.R. 1195 was part of a broader legislative effort to address workplace violence. Its introduction and progress cannot be attributed specifically to Dr. O’Neal's death. It should also not be described as an enacted federal law.\nThe case remains relevant to the broader discussion of how healthcare facilities should prepare for threats involving employees' personal safety.",
      "actionableLesson": "Workplace Threat Screening and Healthcare Campus Security\nHealthcare institutions should recognise that threats to employees do not always originate from patients or visitors. They may also arise from external individuals who have personal relationships with staff members.\n\nA comprehensive prevention approach should include:\n1. Confidential threat reporting:\n• Provide employees with confidential ways to report threats, stalking, harassment, or intimidation.\n• Establish clear procedures for escalating credible threats.\n• Ensure that staff can seek help without fear of professional retaliation.\n\n2. Domestic-violence-informed workplace support:\n• Train designated HR, occupational health, and security personnel to respond sensitively to reports of intimate-partner violence.\n• Help affected employees develop workplace safety plans.\n• Respect confidentiality and share information only when necessary for safety and lawful response.\n\n3. Coordinated security response:\n• Establish clear communication between hospital security, local law enforcement, and emergency management teams.\n• Define procedures for responding to armed individuals and credible threats.\n• Train staff to recognise emergency alerts and follow lockdown or evacuation instructions.\n\n4. Access control and campus preparedness:\n• Review parking areas, staff entrances, emergency exits, and visitor access arrangements.\n• Ensure that security personnel can respond rapidly to incidents in parking lots and other external areas.\n• Conduct regular emergency-response exercises.\n\n5. Post-incident support:\n• Provide psychological, medical, and legal support to affected employees and families.\n• Review incidents to identify weaknesses in existing safety procedures.\n• Ensure that lessons learned lead to measurable improvements.\n\nThese are proposed safety practices for healthcare institutions, not claims that a particular hospital has implemented them.",
      "memorialPublication": {
          "title": "Workplace Threat Screening & Healthcare Campus Security Guide",
          "focus": "Occupational Safety · Intimate-Partner Violence · Threat Reporting · Hospital Emergency Preparedness",
          "initiativeStatus": "Proposed Initiative",
          "deliverable": "Purpose:\nDevelop a practical educational resource for healthcare institutions and professionals on identifying, reporting, and responding to external threats that may endanger employees at their workplace.\n\nProposed guide sections:\n• Recognising stalking, harassment, and credible threats.\n• Confidential workplace threat-reporting procedures.\n• Supporting employees experiencing intimate-partner violence.\n• Coordinating HR, hospital security, and law enforcement.\n• Parking-lot and campus access safety.\n• Active-threat response, lockdown, and evacuation procedures.\n• Post-incident support and institutional review.\n\nIntended audience:\nHospital administrators, Emergency department leadership, Human resources and occupational health teams, Hospital security professionals, Healthcare workers and medical residents.\n\nEditorial principle: The guide should be educational, evidence-based, and developed with input from workplace-safety professionals. It should not replace local emergency procedures, legal advice, or specialist domestic-violence support.\n\nThe UltimateHealth Perspective:\nDr. Tamara O’Neal's story brings together three important dimensions of healthcare:\n• Clinical service: Her work as an emergency physician and volunteer clinical educator.\n• Community contribution: Her commitment to underserved communities, disadvantaged children, and medical education.\n• Workplace safety: The need for institutions to recognise and respond to credible threats against employees, including threats arising from intimate-partner violence.\nHer scholarships at UIC and Southern Illinois University offer a continuing educational legacy. They connect her memory with the opportunities of future medical and healthcare students.\nRemembering Dr. Tamara O’Neal means recognising the physician she was, the people she supported, the students who may benefit from her memorial scholarships, and the importance of making healthcare workplaces safer.\nA healthcare professional should never have to face a threat to their life simply because their workplace is accessible to the person threatening them."
      },
      "references": [
          {
              "title": "American College of Emergency Physicians (ACEP) — ACEP Statement on Chicago Hospital Shooting, 20 November 2018",
              "url": "https://www.emergencyphysicians.org/press-releases/2018/11-20-2018-acep-statement-on-chicago-hospital-shooting",
              "publisher": "American College of Emergency Physicians",
              "isPrimary": true
          },
          {
              "title": "University of Illinois Chicago (UIC Today) — Scholarship to honor memory of slain emergency medicine alumna, 13 March 2019",
              "url": "https://today.uic.edu/scholarship-to-honor-memory-of-slain-emergency-medicine-alumna/",
              "publisher": "University of Illinois Chicago",
              "isPrimary": true
          },
          {
              "title": "Southern Illinois University Foundation — MEDPREP Scholarships (Dr. Tamara O’Neal MEDPREP Scholarship)",
              "url": "https://siuf.org/giving/college-unit/medprep.php",
              "publisher": "Southern Illinois University Foundation",
              "isPrimary": true
          },
          {
              "title": "Cook County State's Attorney's Office — Police Involved Death Decision Memorandum: Juan Lopez",
              "url": "https://www.cookcountystatesattorney.org/sites/g/files/ywwepo351/files/document/file/2024-08/Juan%20Lopez%20Memo.pdf",
              "publisher": "Cook County State's Attorney's Office",
              "isPrimary": true
          },
          {
              "title": "Emergency Medicine Residents' Association (EMRA) — Statement on Mercy Hospital Mass Shootings, 26 November 2018",
              "url": "https://www.emra.org/news/emra-statement-on-mercy-hospital-mass-shootings",
              "publisher": "Emergency Medicine Residents' Association",
              "isPrimary": true
          },
          {
              "title": "U.S. Government Publishing Office — H.R. 1195, Workplace Violence Prevention for Health Care and Social Service Workers Act (Introduced in House)",
              "url": "https://www.govinfo.gov/app/details/BILLS-117hr1195ih",
              "publisher": "U.S. Government Publishing Office",
              "isPrimary": true
          },
          {
              "title": "U.S. Government Publishing Office — H.R. 1195, Referred in Senate (19 April 2021)",
              "url": "https://www.govinfo.gov/app/details/BILLS-117hr1195rfs",
              "publisher": "U.S. Government Publishing Office",
              "isPrimary": true
          },
          {
              "title": "Chicago Sun-Times — Slain Mercy Hospital doctor called 911 before ex-fiancé killed her, 21 November 2018",
              "url": "https://chicago.suntimes.com/2018/11/21/18315209/slain-mercy-hospital-doctor-called-911-before-ex-fiance-killed-her",
              "publisher": "Chicago Sun-Times"
          },
          {
              "title": "CBS Chicago — The Promising Life and Tragic Death of Dr. Tamara O’Neal, 20 November 2018",
              "url": "https://www.cbsnews.com/chicago/news/promising-life-tragic-death-dr-tamara-oneal/",
              "publisher": "CBS Chicago"
          },
          {
              "title": "ABC7 Chicago — Scholarship established in honor of slain Mercy Hospital doctor, 14 March 2019",
              "url": "https://abc7chicago.com/amp/post/scholarship-established-honoring-slain-mercy-hospital-doctor-uic-grad/5193862/",
              "publisher": "ABC7 Chicago"
          },
          {
              "title": "National Medical Association (NMA) — NMA Responds to the Tragic Death of Dr. Tamara O’Neal, 21 November 2018",
              "url": "https://members.nmanet.org/news/429072/NMA-Responds-to-the-Tragic-Death-of-a-Healer-and-True-First-Responder-Dr.-Tamara-ONeal.htm",
              "publisher": "National Medical Association"
          }
      ],
      "translations": {
          "hi": {
              "name": "डॉ. तमारा ओ’नील",
              "roleAndField": "अटेंडिंग आपातकालीन चिकित्सा चिकित्सक · मर्सी हॉस्पिटल एंड मेडिकल सेंटर, शिकागो, इलिनोइस",
              "categoryLabel": "आपातकालीन चिकित्सा एवं कार्यस्थल सुरक्षा",
              "coreMessage": "अंतरंग-साथी की हिंसा (Intimate-partner violence) लोगों का उनके कार्यस्थलों तक पीछा कर सकती है। स्वास्थ्य संस्थानों को विश्वसनीय खतरों को गंभीरता से लेना चाहिए, गोपनीय रिपोर्टिंग और सहायता तंत्र प्रदान करना चाहिए, और ऐसे आपातकालीन प्रतिक्रिया उपायों का समन्वय करना चाहिए जो कर्मचारियों, रोगियों और आगंतुकों की रक्षा करें।",
              "whoWasThisPerson": "डॉ. तमारा ओ’नील शिकागो के मर्सी हॉस्पिटल एंड मेडिकल सेंटर में 38 वर्षीय आपातकालीन चिकित्सा चिकित्सक थीं।\nउन्होंने 2014 में इलिनोइस विश्वविद्यालय कॉलेज ऑफ मेडिसिन से स्नातक किया और 2017 में अपनी आपातकालीन चिकित्सा रेजिडेंसी पूरी की। उन्होंने 2007 और 2009 के बीच सदर्न इलिनोइस यूनिवर्सिटी के मेडिकल/डेंटल एजुकेशन प्रिपरेटरी प्रोग्राम (MEDPREP) में भी भाग लिया था।\nअपने नैदानिक कार्य के अलावा, उन्होंने मर्सी अस्पताल में क्लिनिकल रेजिडेंट्स को पढ़ाने के लिए स्वेच्छा से काम किया। उन्हें सहकर्मियों और मित्रों द्वारा सामुदायिक सेवा के प्रति उनकी प्रतिबद्धता, उदारता और लोगों को एक साथ लाने की क्षमता के लिए याद किया जाता था।\nवे अपने चर्च के गायक मंडल (choir) का नेतृत्व भी करती थीं और वंचित बच्चों के लिए धन जुटाती थीं। वंचित समुदायों की मदद करने की उनकी प्रतिबद्धता आपातकालीन चिकित्सा के उनके चुनाव में झलकती थी।",
              "contributions": "डॉ. ओ’नील का योगदान आपातकालीन विभाग में रोगियों के इलाज से कहीं आगे तक फैला हुआ था।\n\nनैदानिक सेवा:\n• शिकागो के मर्सी अस्पताल में आपातकालीन चिकित्सा अटेंडिंग चिकित्सक के रूप में कार्य किया।\n• शहरी अस्पताल परिवेश में रोगियों को आपातकालीन देखभाल प्रदान की और क्लिनिकल रेजिडेंट्स को स्वेच्छा से पढ़ाया।\n\nशिक्षा और मार्गदर्शन:\n• UIC के अर्बन हेल्थ प्रोग्राम में भाग लिया और कम प्रतिनिधित्व वाले छात्रों को चिकित्सा में करियर बनाने के लिए प्रोत्साहित किया।\n\nसामुदायिक सेवा:\n• वंचित बच्चों के लिए धन जुटाया, चर्च गायक मंडल का नेतृत्व किया और शिकागो के साउथ साइड के वंचित समुदायों की सेवा की।\n\nएक निरंतर विरासत — छात्रवृत्तियाँ और चिकित्सा शिक्षा:\nA. तमारा ओ’नील एमडी स्कॉलरशिप फंड — यूनिवर्सिटी ऑफ इलिनोइस शिकागो (UIC): मार्च 2019 में 12 पूर्व छात्रों द्वारा स्थापित, जिसने प्रारंभिक रूप से $68,000 से अधिक जुटाए ताकि अर्बन हेल्थ प्रोग्राम के प्रथम वर्ष के मेडिकल छात्रों और आपातकालीन चिकित्सा में जाने वाले छात्रों को सहायता मिल सके।\nB. डॉ. तमारा ओ’नील MEDPREP स्कॉलरशिप — सदर्न इलिनोइस यूनिवर्सिटी (SIU): 2007–2009 की पूर्व MEDPREP छात्रा के रूप में उनके सम्मान में स्थापित, जो चिकित्सा या दंत चिकित्सा शिक्षा प्राप्त करने वाले छात्रों की सहायता करती है।\nUltimateHealth इन छात्रवृत्ति पहलों को उनकी विरासत के एक विशिष्ट और निरंतर हिस्से के रूप में मान्यता देता है।",
              "factualContext": "19 नवंबर 2018 को, शिकागो में मर्सी हॉस्पिटल एंड मेडिकल सेंटर की पार्किंग में डॉ. तमारा ओ’नील की गोली मारकर हत्या कर दी गई।\nउनका पूर्व मंगेतर, जुआन लोपेज, अस्पताल गया था और उनका इंतजार कर रहा था। कुक काउंटी की आधिकारिक जांच के अनुसार, उसने पार्किंग में उनका सामना किया और बहस के बाद सेमी-ऑटोमैटिक हैंडगन से उन्हें कई गोलियां मारीं।\nसमकालीन रिपोर्टिंग में कहा गया कि डॉ. ओ’नील ने यह बताने के लिए 911 पर कॉल किया था कि उनका पूर्व मंगेतर बंदूक के साथ अस्पताल में है।\nउन्हें गोली मारने के बाद, लोपेज ने अस्पताल की इमारत में प्रवेश किया और लॉबी में फार्मेसी रेजिडेंट डेना लेस (Dayna Less) को गोली मार दी। इसके बाद हुई मुठभेड़ में शिकागो पुलिस अधिकारी सैमुअल जिमेनेज (Samuel Jimenez) को गोली लगी और बाद में उनकी मृत्यु हो गई।\nजवाबी कार्रवाई में पुलिस अधिकारी की गोली से लोपेज मारा गया (मेडिकल जांच में उसके सिर पर खुद को मारी गई गोली का घाव भी दर्ज किया गया, लेकिन पुलिस की गोली के कारण मृत्यु को होमिसाइड वर्गीकृत किया गया)।\n\nइस घटना में तीन पीड़ितों की मृत्यु हुई:\n• डॉ. तमारा ओ’नील — आपातकालीन चिकित्सा चिकित्सक।\n• डेना लेस — फार्मेसी रेजिडेंट।\n• सैमुअल जिमेनेज — शिकागो पुलिस अधिकारी।",
              "editorialNotes": "प्रकाशन नोट: उपरोक्त जीवनी, छात्रवृत्ति और घटना का विवरण संस्थागत रिकॉर्ड और समकालीन रिपोर्टिंग द्वारा समर्थित है। प्रस्तावित कार्यस्थल-सुरक्षा मार्गदर्शिका एक UltimateHealth पहल है। H.R. 1195 का विधायी इतिहास संदर्भ के लिए शामिल किया गया है, न कि इस मामले के प्रत्यक्ष परिणाम के रूप में।",
              "verifiedFacts": [
                  "मर्सी हॉस्पिटल एंड मेडिकल सेंटर, शिकागो में 38 वर्षीय आपातकालीन चिकित्सा चिकित्सक; UIC कॉलेज ऑफ मेडिसिन (2014) से स्नातक और SIU MEDPREP (2007–2009) की पूर्व छात्रा।",
                  "19 नवंबर 2018 को अस्पताल की पार्किंग में पूर्व मंगेतर जुआन लोपेज द्वारा गोली मारकर हत्या; हमलावर ने फार्मेसी रेजिडेंट डेना लेस और पुलिस अधिकारी सैमुअल जिमेनेज की भी हत्या की।",
                  "कुक काउंटी स्टेट अटॉर्नी की जांच ने पुष्टि की कि जवाबी पुलिस कार्रवाई कानूनी रूप से न्यायोचित थी।",
                  "उनकी स्मृति में UIC (तमारा ओ’नील एमडी स्कॉलरशिप फंड, मार्च 2019) और सदर्न इलिनोइस यूनिवर्सिटी (MEDPREP स्कॉलरशिप) में छात्रवृत्तियाँ स्थापित की गईं।",
                  "ACEP (20 नवंबर 2018), NMA (21 नवंबर 2018) और EMRA (26 नवंबर 2018) द्वारा आधिकारिक शोक और सम्मान वक्तव्य जारी किए गए।"
              ],
              "societalImpact": "पेशेवर और संस्थागत प्रतिक्रिया:\n• अमेरिकन कॉलेज ऑफ इमरजेंसी फिजिशियन (ACEP): 20 नवंबर 2018 को शोक वक्तव्य जारी किया और आग्नेयास्त्र हिंसा की रोकथाम व ERPO/GVRO कानूनों के प्रति समर्थन दोहराया।\n• इमरजेंसी मेडिसिन रेजिडेंट्स एसोसिएशन (EMRA) और इमरजेंसी नर्सेज एसोसिएशन (ENA): शोक व्यक्त किया और 2019 में 'No Silence on ED Violence' अभियान चलाया।\n\nविधायी संदर्भ — H.R. 1195:\nH.R. 1195 (Workplace Violence Prevention for Health Care and Social Service Workers Act) 22 फरवरी 2021 को 117वीं अमेरिकी कांग्रेस में पेश किया गया और 16 अप्रैल 2021 को हाउस द्वारा पारित कर सीनेट समिति को भेजा गया।\nमहत्वपूर्ण तथ्यात्मक अंतर: H.R. 1195 कार्यस्थल हिंसा को संबोधित करने के व्यापक विधायी प्रयास का हिस्सा था; इसे विशेष रूप से डॉ. ओ’नील की मृत्यु के परिणाम के रूप में या अधिनियमित संघीय कानून के रूप में वर्णित नहीं किया जाना चाहिए।",
              "actionableLesson": "कार्यस्थल खतरा स्क्रीनिंग और स्वास्थ्य परिसर सुरक्षा:\n1. गोपनीय खतरा रिपोर्टिंग: कर्मचारियों को बिना किसी पेशेवर प्रतिशोध के डर के खतरों, पीछा करने (stalking) या उत्पीड़न की गोपनीय रिपोर्ट करने के तरीके प्रदान करें।\n2. घरेलू-हिंसा-सूचित कार्यस्थल सहायता: अंतरंग-साथी की हिंसा की रिपोर्टों पर संवेदनशीलता से प्रतिक्रिया करने के लिए HR और सुरक्षा कर्मियों को प्रशिक्षित करें।\n3. समन्वित सुरक्षा प्रतिक्रिया: अस्पताल सुरक्षा, स्थानीय पुलिस और आपातकालीन प्रबंधन टीमों के बीच स्पष्ट संचार स्थापित करें।\n4. प्रवेश नियंत्रण और परिसर की तैयारी: पार्किंग क्षेत्रों, स्टाफ प्रवेश द्वारों और निकास की समीक्षा करें।\n5. घटना के बाद सहायता: प्रभावित कर्मचारियों और परिवारों को मनोवैज्ञानिक, चिकित्सा और कानूनी सहायता प्रदान करें।",
              "memorialPublication": {
                  "title": "कार्यस्थल खतरा स्क्रीनिंग और स्वास्थ्य परिसर सुरक्षा मार्गदर्शिका",
                  "focus": "व्यावसायिक सुरक्षा · अंतरंग-साथी हिंसा · खतरा रिपोर्टिंग · अस्पताल आपातकालीन तैयारी",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "उद्देश्य: कार्यस्थल पर कर्मचारियों को खतरे में डालने वाले बाहरी खतरों की पहचान करने, रिपोर्ट करने और उन पर प्रतिक्रिया देने के लिए स्वास्थ्य संस्थानों हेतु एक व्यावहारिक शैक्षिक संसाधन विकसित करना।\n\nUltimateHealth दृष्टिकोण:\nडॉ. तमारा ओ’नील को याद करने का अर्थ है उस चिकित्सक को पहचानना जो वे थीं, जिन लोगों का उन्होंने समर्थन किया, वे छात्र जो उनकी स्मारक छात्रवृत्तियों से लाभान्वित हो सकते हैं, और स्वास्थ्य कार्यस्थलों को सुरक्षित बनाने का महत्व।"
              }
          },
          "bn": {
              "name": "ডা. তামারা ও’নিল",
              "roleAndField": "অ্যাটেন্ডিং জরুরি চিকিৎসা চিকিৎসক · মার্সি হাসপাতাল অ্যান্ড মেডিকেল সেন্টার, শিকাগো, ইলিনয়",
              "categoryLabel": "জরুরি চিকিৎসা ও কর্মস্থল সুরক্ষা",
              "coreMessage": "ঘনিষ্ঠ সঙ্গীর সহিংসতা (Intimate-partner violence) মানুষের কর্মস্থল পর্যন্ত অনুসরণ করতে পারে। স্বাস্থ্যসেবা প্রতিষ্ঠানগুলোকে বিশ্বাসযোগ্য হুমকিগুলো গুরুত্বের সাথে নিতে হবে, গোপনীয় রিপোর্টিং ও সহায়তা ব্যবস্থা প্রদান করতে হবে এবং কর্মী, রোগী ও দর্শনার্থীদের সুরক্ষায় সমন্বিত জরুরি পদক্ষেপ নিতে হবে।",
              "whoWasThisPerson": "ডা. তামারা ও’নিল ছিলেন শিকাগোর মার্সি হাসপাতাল অ্যান্ড মেডিকেল সেন্টারের ৩৮ বছর বয়সী জরুরি চিকিৎসা চিকিৎসক।\nতিনি ২০১৪ সালে ইউনিভার্সিটি অব ইলিনয় কলেজ অব মেডিসিন থেকে স্নাতক হন এবং ২০১৭ সালে জরুরি মেডিসিন রেসিডেন্সি সম্পন্ন করেন। এর আগে ২০০৭–২০০৯ সালে তিনি সাউদার্ন ইলিনয় ইউনিভার্সিটির MEDPREP প্রোগ্রামে অংশ নিয়েছিলেন।\nক্লিনিক্যাল কাজের পাশাপাশি তিনি স্বেচ্ছাসেবী হিসেবে রেসিডেন্ট ডাক্তারদের পড়াতেন, চার্চের গায়কদল পরিচালনা করতেন এবং সুবিধাবঞ্চিত শিশুদের জন্য তহবিল সংগ্রহ করতেন।",
              "contributions": "ক্লিনিক্যাল সেবা, শিক্ষা ও মেন্টরশিপ এবং সমাজসেবায় তাঁর অবদান ছিল অনন্য।\n\nএকটি চলমান উত্তরাধিকার — শিক্ষাবৃত্তি ও চিকিৎসা শিক্ষা:\nA. তামারা ও’নিল এমডি স্কলারশিপ ফান্ড (ইউনিভার্সিটি অব ইলিনয় শিকাগো - UIC): মার্চ ২০১৯-এ তাঁর ১২ জন সহপাঠী এই তহবিল গঠন করেন, যা প্রাথমিক পর্যায়ে $৬৮,০০০-এর বেশি সংগ্রহ করে আরবান হেলথ প্রোগ্রামের মেডিকেল শিক্ষার্থীদের সহায়তা করে।\nB. ডা. তামারা ও’নিল MEDPREP স্কলারশিপ (সাউদার্ন ইলিনয় ইউনিভার্সিটি - SIU): প্রাক্তন MEDPREP শিক্ষার্থী হিসেবে তাঁর স্মৃতিতে প্রতিষ্ঠিত এই বৃত্তি মেডিকেল ও ডেন্টাল শিক্ষার্থীদের সহায়তা প্রদান করে।",
              "factualContext": "১৯ নভেম্বর ২০১৮ তারিখে শিকাগোর মার্সি হাসপাতালের পার্কিং লটে ডা. তামারা ও’নিলকে তাঁর প্রাক্তন বাগদত্তা হুয়ান লোপেজ গুলি করে হত্যা করে। সমসাময়িক প্রতিবেদন অনুসারে, ডা. ও’নিল ৯১১-এ কল করে জানিয়েছিলেন যে তাঁর প্রাক্তন বাগদত্তা বন্দুক নিয়ে হাসপাতালে এসেছে।\nতাঁকে গুলি করার পর লোপেজ হাসপাতালের ভেতরে প্রবেশ করে ফার্মেসি রেসিডেন্ট ডায়না লেস (Dayna Less) এবং শিকাগো পুলিশ অফিসার স্যামুয়েল জিমেনেজকে (Samuel Jimenez) গুলি করে হত্যা করে। পরবর্তীতে পুলিশের গুলিতে লোপেজ নিহত হয় (কুক কাউন্টির তদন্তে পুলিশের বলপ্রয়োগ আইনগতভাবে যুক্তিসঙ্গত বলে প্রমাণিত হয়)।",
              "editorialNotes": "প্রকাশনা নোট: উপরের জীবনী, শিক্ষাবৃত্তি এবং ঘটনার বিবরণ প্রাতিষ্ঠানিক নথি ও সমসাময়িক প্রতিবেদনের ওপর ভিত্তি করে রচিত। প্রস্তাবিত নিরাপত্তা নির্দেশিকাটি UltimateHealth-এর একটি উদ্যোগ। H.R. 1195 বিলের ইতিহাসটি প্রেক্ষাপট হিসেবে যুক্ত করা হয়েছে, এই ঘটনার সরাসরি ফলাফল হিসেবে নয়।",
              "verifiedFacts": [
                  "শিকাগোর মার্সি হাসপাতালের ৩৮ বছর বয়সী জরুরি বিভাগের চিকিৎসক; UIC (২০১৪) এবং SIU MEDPREP (২০০৭–২০০৯)-এর প্রাক্তন শিক্ষার্থী।",
                  "১৯ নভেম্বর ২০১৮-এ হাসপাতালের পার্কিং লটে প্রাক্তন বাগদত্তা হুয়ান লোপেজের গুলিতে নিহত হন; হামলায় ফার্মেসি রেসিডেন্ট ডায়না লেস এবং পুলিশ অফিসার স্যামুয়েল জিমেনেজও প্রাণ হারান।",
                  "তাঁর স্মৃতিতে UIC (তামারা ও’নিল এমডি স্কলারশিপ ফান্ড) এবং SIU (MEDPREP স্কলারশিপ)-এ দুটি শিক্ষাবৃত্তি প্রতিষ্ঠিত হয়েছে।",
                  "ACEP, EMRA এবং NMA আনুষ্ঠানিক শোকবার্তা ও বিবৃতি প্রকাশ করে।"
              ],
              "societalImpact": "পেশাগত ও প্রাতিষ্ঠানিক প্রতিক্রিয়া:\nACEP (২০ নভেম্বর ২০১৮) এবং EMRA (২৬ নভেম্বর ২০১৮) শোক প্রকাশ করে বিবৃতি দেয় এবং আগ্নেয়াস্ত্র সহিংসতা রোধে জনস্বাস্থ্যমূলক পদক্ষেপের আহ্বান জানায়।\n\nআইনি প্রেক্ষাপট (H.R. 1195):\nফেব্রুয়ারি ২০২১-এ মার্কিন কংগ্রেসে H.R. 1195 (Workplace Violence Prevention for Health Care and Social Service Workers Act) উত্থাপিত হয় এবং এপ্রিল ২০২১-এ হাউসে পাস হয়ে সিনেটে প্রেরিত হয়। উল্লেখ্য, এটি একটি বৃহত্তর আইনি প্রচেষ্টার অংশ ছিল এবং এটি এখনো চূড়ান্ত ফেডারেল আইন হিসেবে প্রণীত হয়নি।",
              "actionableLesson": "কর্মস্থলের হুমকি যাচাই এবং হাসপাতাল ক্যাম্পাস নিরাপত্তা:\n১. গোপনীয় হুমকি রিপোর্টিং ব্যবস্থা\n২. পারিবারিক সহিংসতা বিষয়ে সংবেদনশীল কর্মস্থল সহায়তা\n৩. হাসপাতাল নিরাপত্তা ও পুলিশের মধ্যে সমন্বিত সাড়াদান\n৪. পার্কিং লট ও ক্যাম্পাস প্রবেশাধিকার নিয়ন্ত্রণ\n৫. ঘটনা-পরবর্তী মানসিক, চিকিৎসা ও আইনি সহায়তা।",
              "memorialPublication": {
                  "title": "কর্মস্থল হুমকি যাচাই ও হাসপাতাল ক্যাম্পাস নিরাপত্তা নির্দেশিকা",
                  "focus": "পেশাগত নিরাপত্তা · ঘনিষ্ঠ সঙ্গীর সহিংসতা · হুমকি রিপোর্টিং · হাসপাতাল জরুরি প্রস্তুতি",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ডা. তামারা ও’নিলকে স্মরণ করার অর্থ হলো একজন নিবেদিতপ্রাণ চিকিৎসক, তাঁর সমাজসেবা, তাঁর স্মৃতিতে প্রতিষ্ঠিত শিক্ষাবৃত্তি এবং স্বাস্থ্যকর্মীদের জন্য নিরাপদ কর্মস্থল গড়ার গুরুত্বকে স্বীকৃতি দেওয়া।"
              }
          },
          "ta": {
              "name": "டாக்டர் தமாரா ஓ’நீல்",
              "roleAndField": "அவசர சிகிச்சை மருத்துவர் · மெர்சி மருத்துவமனை மற்றும் மருத்துவ மையம், சிகாகோ, இல்லினாய்ஸ்",
              "categoryLabel": "அவசர மருத்துவம் மற்றும் பணியிடப் பாதுகாப்பு",
              "coreMessage": "நெருக்கமானவர்களால் ஏற்படும் குடும்ப வன்முறை பணியிடங்களுக்கும் ஒருவரைப் பின்தொடரக்கூடும். சுகாதார நிறுவனங்கள் அத்தகைய அச்சுறுத்தல்களைத் தீவிரமாகக் கருதி, இரகசியப் புகார் மற்றும் பாதுகாப்பு வழிமுறைகளை உருவாக்க வேண்டும்.",
              "whoWasThisPerson": "டாக்டர் தமாரா ஓ’நீல் சிகாகோவில் உள்ள மெர்சி மருத்துவமனையில் 38 வயதான அவசர சிகிச்சை மருத்துவராகப் பணியாற்றினார்.\n2014 இல் இல்லினாய்ஸ் பல்கலைக்கழக மருத்துவக் கல்லூரியில் பட்டம் பெற்றார் மற்றும் 2017 இல் அவசர மருத்துவப் பயிற்சியை முடித்தார் (2007–2009 இல் SIU MEDPREP திட்டத்தில் பயின்றார்). மருத்துவப் பணிக்கு அப்பால், பயிற்சி மருத்துவர்களுக்குக் கற்பிப்பதிலும், தேவாலயப் பாடகர் குழுவை வழிநடத்துவதிலும், ஏழை குழந்தைகளுக்கு உதவுவதிலும் சிறந்து விளங்கினார்.",
              "contributions": "மருத்துவ சேவை, கல்வி வழிகாட்டல் மற்றும் சமூக சேவையில் அவரது பங்களிப்பு குறிப்பிடத்தக்கது.\n\nதொடரும் மரபு — கல்வி உதவித்தொகைகள்:\nA. தமாரா ஓ’நீல் எம்டி கல்வி உதவித்தொகை நிதி (UIC): மார்ச் 2019 இல் அவரது சக முன்னாள் மாணவர்களால் தொடங்கப்பட்டு $68,000 க்கும் மேல் நிதி திரட்டப்பட்டது.\nB. டாக்டர் தமாரா ஓ’நீல் MEDPREP கல்வி உதவித்தொகை (தெற்கு இல்லினாய்ஸ் பல்கலைக்கழகம் - SIU): மருத்துவம் மற்றும் பல் மருத்துவம் பயிலும் மாணவர்களுக்கு உதவும் வகையில் நிறுவப்பட்டது.",
              "factualContext": "நவம்பர் 19, 2018 அன்று, சிகாகோவின் மெர்சி மருத்துவமனை வாகன நிறுத்துமிடத்தில் டாக்டர் தமாரா ஓ’நீல் அவரது முன்னாள் வருங்கால கணவர் ஜுவான் லோபஸால் சுட்டுக் கொல்லப்பட்டார்.\nஅவரைச் சுட்ட பிறகு, லோபஸ் மருத்துவமனைக்குள் நுழைந்து மருந்தகப் பயிற்சி மருத்துவர் டேனா லெஸ் (Dayna Less) மற்றும் சிகாகோ காவல்துறை அதிகாரி சாமுவேல் ஜிமெனெஸ் (Samuel Jimenez) ஆகியோரைச் சுட்டுக் கொன்றார். பின்னர் காவல்துறையினரின் துப்பாக்கிச் சூட்டில் லோபஸ் உயிரிழந்தார்.",
              "editorialNotes": "வெளியீட்டுக் குறிப்பு: மேற்கண்ட விவரங்கள் நிறுவன ஆவணங்கள் மற்றும் செய்திகளின் அடிப்படையில் அமைந்தவை. H.R. 1195 சட்ட விவரம் சூழலுக்காக மட்டுமே சேர்க்கப்பட்டுள்ளது.",
              "verifiedFacts": [
                  "சிகாகோ மெர்சி மருத்துவமனையின் 38 வயது அவசர சிகிச்சை மருத்துவர்; UIC (2014) மற்றும் SIU MEDPREP (2007–2009) முன்னாள் மாணவி.",
                  "நவம்பர் 19, 2018 அன்று மருத்துவமனை வளாகத்தில் சுட்டுக் கொல்லப்பட்டார்; மருந்தக உறைவிட மருத்துவர் டேனா லெஸ் மற்றும் காவல்துறை அதிகாரி சாமுவேல் ஜிமெனெஸ் ஆகியோரும் கொல்லப்பட்டனர்.",
                  "UIC மற்றும் SIU பல்கலைக்கழகங்களில் அவரது நினைவாக மருத்துவக் கல்வி உதவித்தொகைகள் நிறுவப்பட்டுள்ளன.",
                  "ACEP, EMRA மற்றும் NMA அமைப்புகள் அதிகாரப்பூர்வ இரங்கல் அறிக்கைகளை வெளியிட்டன."
              ],
              "societalImpact": "ACEP, EMRA மற்றும் ENA ஆகிய மருத்துவ அமைப்புகள் இச்சம்பவத்திற்குக் கண்டனம் தெரிவித்து பணியிடப் பாதுகாப்பை வலியுறுத்தின. 2021 இல் அமெரிக்க நாடாளுமன்றத்தில் அறிமுகப்படுத்தப்பட்ட H.R. 1195 மசோதா பணியிட வன்முறைத் தடுப்புக்கான பரந்த முயற்சியின் ஒரு பகுதியாகும்.",
              "actionableLesson": "சுகாதார நிறுவனங்களுக்கான பாதுகாப்பு நடைமுறைகள்:\n1. இரகசிய அச்சுறுத்தல் புகார் முறை\n2. குடும்ப வன்முறை குறித்த விழிப்புணர்வு கொண்ட பணியிட ஆதரவு\n3. ஒருங்கிணைந்த பாதுகாப்பு நடவடிக்கை\n4. வாகன நிறுத்துமிடம் மற்றும் வளாகப் பாதுகாப்பு\n5. சம்பவத்திற்குப் பிந்தைய ஆதரவு.",
              "memorialPublication": {
                  "title": "பணியிட அச்சுறுத்தல் தடுப்பு மற்றும் மருத்துவமனை வளாகப் பாதுகாப்பு வழிகாட்டி",
                  "focus": "பணியிடப் பாதுகாப்பு · குடும்ப வன்முறைத் தடுப்பு · அவசரகாலத் தயார்நிலை",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "டாக்டர் தமாரா ஓ’நீலை நினைவுகூர்வது என்பது அவரது மருத்துவ சேவை, அவரது பெயரில் வழங்கப்படும் கல்வி உதவித்தொகைகள் மற்றும் பாதுகாப்பான மருத்துவப் பணியிடங்களின் அவசியத்தை அங்கீகரிப்பதாகும்."
              }
          },
          "or": {
              "name": "ଡା. ତାମାରା ଓ’ନିଲ୍",
              "roleAndField": "ଜରୁରୀକାଳୀନ ଚିକିତ୍ସା ବିଶେଷଜ୍ଞ · ମର୍ସି ହସ୍ପିଟାଲ ଆଣ୍ଡ ମେଡିକାଲ ସେଣ୍ଟର, শିକାଗୋ, ଇଲିନୋଇସ୍",
              "categoryLabel": "ଜରୁରୀକାଳୀନ ଚିକିତ୍ସା ଓ କାର୍ଯ୍ୟସ୍ଥଳୀ ସୁରକ୍ଷା",
              "coreMessage": "ଘରୋଇ ବା ବ୍ୟକ୍ତିଗତ ହିଂସା କର୍ମଚାରୀଙ୍କୁ ସେମାନଙ୍କ କାର୍ଯ୍ୟସ୍ଥଳୀ ପର୍ଯ୍ୟନ୍ତ ଅନୁସରଣ କରିପାରେ। ସ୍ୱାସ୍ଥ୍ୟ ଅନୁଷ୍ଠାନଗୁଡ଼ିକ ଏଭଳି ବିପଦକୁ ଗୁରୁତ୍ୱର ସହ ନେଇ ଗୋପନୀୟ ରିପୋର୍ଟିଂ ଏବଂ ସମନ୍ୱିତ ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା ଗ୍ରହଣ କରିବା ଆବଶ୍ୟକ।",
              "whoWasThisPerson": "ଡା. ତାମାରା ଓ’ନିଲ୍ ଶିକାଗୋର ମର୍ସି ହସ୍ପିଟାଲରେ ଜଣେ ୩୮ ବର୍ଷୀୟା ଜରୁରୀକାଳୀନ ଚିକିତ୍ସକ ଥିଲେ। ସେ ୨୦୧୪ରେ ୟୁନିଭର୍ସିଟି ଅଫ୍ ଇଲିନୋଇସ୍ କଲେଜ ଅଫ୍ ମେଡିସିନରୁ ସ୍ନାତକ ଏବଂ ୨୦୧୭ରେ রেসিડેन्സി ସମାପ୍ତ କରିଥିଲେ। ସେ ରେସିଡେଣ୍ଟ ଡାକ୍ତରମାନଙ୍କୁ ପଢ଼ାଇବା ସହ ଚର୍ଚ୍ଚ କ୍ୱାୟରର ନେତୃତ୍ୱ ନେଉଥିଲେ ଏବଂ ଗରିବ ପିଲାମାନଙ୍କ ପାଇଁ ପାଣ୍ଠି ସଂଗ୍ରହ କରୁଥିଲେ।",
              "contributions": "ରୋଗୀ ସେବା, ଶିକ୍ଷା ଓ ସମାଜସେବା ସହିତ ତାଙ୍କ ସ୍ମୃତିରେ ଦୁଇଟି ପ୍ରಮುଖ ଶିକ୍ଷାବୃତ୍ତି ସ୍ଥାପିତ ହୋଇଛି:\nA. ତାମାରା ଓ’ନିଲ୍ ଏମଡି ସ୍କଲାରଶିପ୍ ଫଣ୍ଡ (UIC, ମାର୍ଚ୍ଚ ୨୦୧୯) — ଯାହା ମେଡିକାଲ ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ସହାୟତା କରେ।\nB. ଡା. ତାମାରା ଓ’ନିଲ୍ MEDPREP ସ୍କଲାରଶିପ୍ (ସଦର୍ଣ୍ଣ ଇଲିନୋଇସ୍ ୟୁନିଭର୍ସିଟି - SIU)।",
              "factualContext": "୧୯ ନଭେମ୍ବର ୨୦୧୮ରେ ଶିକାଗୋର ମର୍ସି ହସ୍ପିଟାଲ ପାର୍କିଂ লটରେ ଡା. ତାମାରା ଓ’ନିଲଙ୍କୁ ତାଙ୍କ ପୂର୍ବତନ ଭାବୀ ସ୍ୱାମୀ ଜୁଆନ୍ ଲୋପେଜ୍ ଗୁଳି କରି ହତ୍ୟା କରିଥିଲା। ଏହାପରେ ଲୋପେଜ୍ ହସ୍ପିଟାଲ ଭିତରେ ଫାର୍ମାସି ରେସିଡେଣ୍ଟ ଡେନା ଲେସ୍ ଏବଂ ପୋଲିସ ଅଫିସର ସାମୁଏଲ୍ ଜିମେନେଜଙ୍କୁ ମଧ୍ୟ ଗୁଳି କରି ହତ୍ୟା କରିଥିଲା ଏବଂ ପୋଲିସ ଗୁଳିରେ ନିହତ ହୋଇଥିଲା।",
              "editorialNotes": "ପ୍ରକାଶନ ଟିପ୍ପଣୀ: ଉପରୋକ୍ତ ବିବରଣୀ ସରକାରୀ ତଦନ୍ତ ଓ ଆନୁଷ୍ଠାନିକ ରେକର୍ଡ ଉପରେ ଆଧାରିତ। H.R. 1195 ବିଲ୍ କେବଳ ପ୍ରସଙ୍ଗ ପାଇଁ ଉଲ୍ଲେଖ କରାଯାଇଛି।",
              "verifiedFacts": [
                  "ମର୍ସି ହସ୍ପିଟାଲ, ଶିକାଗୋର ୩୮ ବର୍ଷୀୟା ଜରୁରୀକାଳୀନ ଚିକିତ୍ସକ; UIC (୨୦୧୪) ଏବଂ SIU MEDPREP (୨୦୦୭–୨୦୦୯) ର ପୂର୍ବତନ ଛାତ୍ରୀ।",
                  "୧୯ ନଭେମ୍ବର ୨୦୧୮ରେ ହସ୍ପିଟାଲ ପାର୍କିଂରେ ଗୁଳିମାଡ଼ରେ নিহত; ଫାର୍ମାସି ରେସିଡେଣ୍ଟ ଡେନା ଲେସ୍ ଓ ପୋଲିସ ଅଫିସର ସାମୁଏଲ୍ ଜିମେନେଜ୍ ମଧ୍ୟ ଶହୀଦ ହୋଇଥିଲେ।",
                  "UIC ଏବଂ SIU ରେ ତାଙ୍କ ସ୍ମୃତିରେ ମେଡିକାଲ ସ୍କଲାରଶିପ୍ ସ୍ଥାପିତ ହୋଇଛି।",
                  "ACEP, EMRA ଏବଂ NMA ପକ୍ଷରୁ ଆନୁଷ୍ଠାନିକ ଶୋକ ପ୍ରକାଶ କରାଯାଇଥିଲା।"
              ],
              "societalImpact": "ACEP, EMRA ଏବଂ ENA ଭଳି ସଂଗଠନ ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀଙ୍କ ସୁରକ୍ଷା ପାଇଁ ସ୍ୱର ଉତ୍ତୋଳନ করেছিলেন। ୨୦୨୧ରେ ଆମେରିକା କଂଗ୍ରେସରେ ଆଗତ H.R. 1195 ବିଲ୍ କାର୍ଯ୍ୟସ୍ଥଳୀ ହିଂସା ରୋକିବା ପାଇଁ ଏକ ବ୍ୟାପକ ପ୍ରୟାସର ଅଂଶ ଥିଲା।",
              "actionableLesson": "ସ୍ୱାସ୍ଥ୍ୟ ଅନୁଷ୍ଠାନଗୁଡ଼ିକ ପାଇଁ ପ୍ରସ୍ତାବିତ ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା:\n୧. ଗୋପନୀୟ ବିପଦ ରିପୋର୍ଟିଂ\n୨. ଘରୋଇ ହିଂସା ସମ୍ବନ୍ଧୀୟ କାର୍ଯ୍ୟସ୍ଥଳୀ ସହାୟତା\n୩. ସମନ୍ୱିତ ସୁରକ୍ଷା ପ୍ରତିକ୍ରିୟା\n୪. ପାର୍କିଂ ଓ କ୍ୟାମ୍ପସ୍ ପ୍ରବେଶ ନିୟନ୍ତ୍ରଣ\n୫. ଘଟଣା ପରବର୍ତ୍ତୀ ସହାୟତା।",
              "memorialPublication": {
                  "title": "କାର୍ଯ୍ୟସ୍ଥଳୀ ବିପଦ ଯାଞ୍ଚ ଓ ହସ୍ପିଟାଲ କ୍ୟାମ୍ପସ୍ ସୁରକ୍ଷା ମାର୍ଗଦର୍ଶିକା",
                  "focus": "ବୃତ୍ତିଗତ ସୁରକ୍ଷା · ଘରୋଇ ହିଂସା · ବିପଦ ରିପୋର୍ଟିଂ · ହସ୍ପିଟାଲ ଜରୁରୀକାଳୀନ ପ୍ରସ୍ତୁତି",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ଡା. ତାମାରା ଓ’ନିଲଙ୍କୁ ସ୍ମରଣ କରିବାର ଅର୍ଥ ହେଉଛି ତାଙ୍କର ଚିକିତ୍ସା ସେବା, ତାଙ୍କ ନାମରେ ଥିବା ଶିକ୍ଷାବୃତ୍ତି ଏବଂ ସୁରକ୍ଷିତ ହସ୍ପିଟାଲ କାର୍ଯ୍ୟସ୍ଥଳীর ଆବଶ୍ୟକତାକୁ ସମ୍ମାନ ଜଣାଇବା।"
              }
          },
          "es": {
              "name": "Dra. Tamara O’Neal",
              "roleAndField": "Médica Adjunta de Medicina de Urgencias · Mercy Hospital & Medical Center, Chicago, Illinois",
              "categoryLabel": "Medicina de Urgencias y Defensa en el Lugar de Trabajo",
              "coreMessage": "La violencia de pareja puede perseguir a las personas hasta sus lugares de trabajo. Las instituciones sanitarias deben tomar en serio las amenazas creíbles, proporcionar mecanismos confidenciales de denuncia y apoyo, y coordinar respuestas de emergencia que protejan a empleados, pacientes y visitantes.",
              "whoWasThisPerson": "La Dra. Tamara O’Neal era una médica de urgencias de 38 años en el Mercy Hospital & Medical Center de Chicago.\nSe graduó de la Facultad de Medicina de la Universidad de Illinois (UIC) en 2014 y completó su residencia en medicina de urgencias en 2017. También participó en el Programa Preparatorio de Educación Médica/Dental (MEDPREP) de la Southern Illinois University entre 2007 y 2009.\nAdemás de su labor clínica, se ofreció como voluntaria para enseñar a médicos residentes en el Mercy Hospital. También dirigía el coro de su iglesia y recaudaba fondos para niños desfavorecidos, reflejando su compromiso con las comunidades desatendidas del sur de Chicago.",
              "contributions": "La contribución de la Dra. O’Neal se extendió más allá del tratamiento de pacientes en urgencias:\n• Servicio clínico: Médica adjunta de urgencias en Mercy Hospital y docente voluntaria de residentes.\n• Educación y mentoría: Participó en el Urban Health Program de UIC y alentó a estudiantes subrepresentados a seguir carreras médicas.\n• Servicio comunitario: Recaudó fondos para niños desfavorecidos y dirigió el coro de su iglesia.\n\nUn legado que continúa — Becas y educación médica:\nA. Fondo de Becas Tamara O’Neal MD — University of Illinois Chicago (UIC): Establecido en marzo de 2019 por doce exalumnos de UIC, recaudando más de $68,000 iniciales para apoyar a estudiantes de medicina del Urban Health Program y futuros residentes de urgencias.\nB. Beca MEDPREP Dra. Tamara O’Neal — Southern Illinois University (SIU): Reconoce a la Dra. O’Neal como exalumna de MEDPREP (2007–2009) y apoya a estudiantes de medicina u odontología según mérito académico, servicio comunitario y necesidad financiera.\nUltimateHealth reconoce estas becas como una parte distinta y continua de su legado.",
              "factualContext": "El 19 de noviembre de 2018, la Dra. Tamara O’Neal fue asesinada a tiros en el estacionamiento del Mercy Hospital & Medical Center en Chicago.\nSu exprometido, Juan Lopez, la confrontó en el estacionamiento y, tras una discusión, le disparó varias veces con una pistola semiautomática. Los informes contemporáneos indicaron que la Dra. O’Neal había llamado al 911 para informar que su exprometido estaba en el hospital con un arma.\nDespués de dispararle, Lopez entró al hospital y mató a tiros a la residente de farmacia Dayna Less en el vestíbulo, y posteriormente hirió mortalmente al oficial de policía de Chicago Samuel Jimenez.\nLopez murió tras recibir un disparo de un oficial que respondió al ataque (la investigación oficial del Condado de Cook concluyó que el uso de fuerza letal estuvo legalmente justificado y documentó también una herida autoinfligida en la cabeza, clasificando su muerte como homicidio).\n\nEl incidente resultó en la muerte de tres víctimas:\n• Dra. Tamara O’Neal — Médica de urgencias.\n• Dayna Less — Residente de farmacia.\n• Samuel Jimenez — Oficial de Policía de Chicago.",
              "editorialNotes": "Nota de publicación: Los detalles biográficos, de becas y del incidente están respaldados por registros institucionales y reportajes contemporáneos. La guía propuesta de seguridad laboral es una iniciativa de UltimateHealth, no una reforma histórica atribuida a su muerte. El historial legislativo de H.R. 1195 se incluye como contexto, no como consecuencia directa de este caso.",
              "verifiedFacts": [
                  "Médica adjunta de urgencias de 38 años en Mercy Hospital, Chicago; graduada de UIC College of Medicine (2014) y exalumna de SIU MEDPREP (2007–2009).",
                  "Asesinada a tiros el 19 de noviembre de 2018 en el estacionamiento del Mercy Hospital por su exprometido Juan Lopez, quien luego mató a la residente de farmacia Dayna Less y al oficial Samuel Jimenez.",
                  "El memorando de la Fiscalía Estatal del Condado de Cook documentó el tiroteo, las víctimas y la respuesta policial justificada.",
                  "Se establecieron becas conmemorativas en su honor en la University of Illinois Chicago (marzo de 2019) y en la Southern Illinois University (MEDPREP).",
                  "Conmemorada oficialmente por ACEP (20 nov 2018), NMA (21 nov 2018) y EMRA (26 nov 2018)."
              ],
              "societalImpact": "Respuesta profesional e institucional:\n• American College of Emergency Physicians (ACEP): Emitió una declaración oficial el 20 de noviembre de 2018 lamentando la pérdida y reafirmando su apoyo a la investigación sobre violencia con armas de fuego y órdenes de protección de riesgo extremo (ERPO/GVRO).\n• Emergency Medicine Residents' Association (EMRA) y Emergency Nurses Association (ENA): Emitieron declaraciones de condolencia y continuaron abogando por departamentos de urgencias más seguros (campaña No Silence on ED Violence en 2019).\n\nContexto legislativo — H.R. 1195:\nEl proyecto de ley H.R. 1195 (Workplace Violence Prevention for Health Care and Social Service Workers Act) se presentó en el 117.º Congreso de EE. UU. el 22 de febrero de 2021 y fue aprobado por la Cámara de Representantes el 16 de abril de 2021, pasando al Senado.\nDistinción fáctica importante: H.R. 1195 formó parte de un esfuerzo legislativo más amplio; no puede atribuirse específicamente a la muerte de la Dra. O’Neal ni describirse como una ley federal promulgada.",
              "actionableLesson": "Evaluación de amenazas laborales y seguridad en campus hospitalarios:\n1. Denuncia confidencial de amenazas, acoso o intimidación sin temor a represalias.\n2. Apoyo laboral informado sobre violencia doméstica (planes de seguridad personalizados con RR. HH. y seguridad).\n3. Respuesta de seguridad coordinada con las fuerzas del orden locales y protocolos de bloqueo/evacuación.\n4. Control de acceso y preparación en estacionamientos, entradas de personal y áreas externas.\n5. Apoyo médico, psicológico y legal posterior al incidente.\n\nEstas son prácticas de seguridad propuestas para instituciones sanitarias, no afirmaciones de que un hospital en particular las haya implementado.",
              "memorialPublication": {
                  "title": "Guía de Evaluación de Amenazas Laborales y Seguridad en Campus Sanitarios",
                  "focus": "Seguridad Ocupacional · Violencia de Pareja · Denuncia de Amenazas · Preparación Hospitalaria",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Propósito: Desarrollar un recurso educativo práctico para instituciones sanitarias sobre cómo identificar, reportar y responder a amenazas externas que puedan poner en peligro a los empleados.\n\nLa perspectiva de UltimateHealth:\nRecordar a la Dra. Tamara O’Neal significa reconocer a la médica que fue, a las personas a las que apoyó, a los estudiantes que se benefician de sus becas conmemorativas y la importancia de hacer que los lugares de trabajo sanitarios sean más seguros."
              }
          },
          "fr": {
              "name": "Dre Tamara O’Neal",
              "roleAndField": "Médecin Urgentiste Titulaire · Mercy Hospital & Medical Center, Chicago, Illinois",
              "categoryLabel": "Médecine d'Urgence et Sécurité au Travail",
              "coreMessage": "Les violences conjugales peuvent poursuivre les personnes jusque sur leur lieu de travail. Les établissements de santé doivent prendre les menaces crédibles au sérieux, offrir des mécanismes confidentiels de signalement et de soutien, et coordonner des réponses d'urgence protégeant le personnel, les patients et les visiteurs.",
              "whoWasThisPerson": "La Dre Tamara O’Neal était une médecin urgentiste de 38 ans au Mercy Hospital & Medical Center de Chicago.\nDiplômée du College of Medicine de l'Université de l'Illinois (UIC) en 2014, elle a terminé son internat en médecine d'urgence en 2017 après avoir participé au programme préparatoire MEDPREP de la Southern Illinois University entre 2007 et 2009.\nAu-delà de son travail clinique, elle enseignait bénévolement aux internes, dirigeait la chorale de son église et collectait des fonds pour les enfants défavorisés des quartiers sud de Chicago.",
              "contributions": "La contribution de la Dre O’Neal s'étendait bien au-delà des soins d'urgence :\n• Service clinique : Médecin urgentiste au Mercy Hospital et formatrice bénévole auprès des internes.\n• Éducation et mentorat : Engagement dans l'Urban Health Program de l'UIC pour encourager les étudiants sous-représentés à poursuivre des études de médecine.\n• Engagement communautaire : Collecte de fonds pour les enfants défavorisés et direction de sa chorale.\n\nUn héritage poursuivi — Bourses d'études et formation médicale :\nA. Tamara O’Neal MD Scholarship Fund — University of Illinois Chicago (UIC) : Créé en mars 2019 par douze anciens camarades de promotion (plus de 68 000 $ réunis initialement) pour soutenir les étudiants en médecine de l'Urban Health Program et les futurs urgentistes.\nB. Bourse MEDPREP Dre Tamara O’Neal — Southern Illinois University (SIU) : Honore son parcours d'ancienne étudiante MEDPREP (2007–2009) et soutient les étudiants en médecine ou chirurgie dentaire.\nUltimateHealth reconnaît ces bourses comme une composante distincte et durable de son héritage.",
              "factualContext": "Le 19 novembre 2018, la Dre Tamara O’Neal a été mortellement abattue sur le parking du Mercy Hospital & Medical Center à Chicago.\nSon ex-fiancé, Juan Lopez, l'attendait sur le parking et, après une dispute, lui a tiré dessus à plusieurs reprises avec un pistolet semi-automatique. Selon les articles de presse de l'époque, la Dre O’Neal avait appelé le 911 pour signaler que son ex-fiancé se trouvait à l'hôpital avec une arme.\nAprès lui avoir tiré dessus, Lopez est entré dans le bâtiment et a abattu Dayna Less, interne en pharmacie, dans le hall, puis a mortellement blessé l'officier de police de Chicago Samuel Jimenez.\nLopez a été mortellement touché par un policier intervenant sur les lieux (l'enquête officielle du comté de Cook a conclu que l'usage de la force meurtrière était légalement justifié et a également relevé une blessure par balle auto-infligée à la tête, classant le décès comme homicide).\n\nL'attaque a coûté la vie à trois victimes :\n• Dre Tamara O’Neal — Médecin urgentiste.\n• Dayna Less — Interne en pharmacie.\n• Samuel Jimenez — Officier de police de Chicago.",
              "editorialNotes": "Note de publication : Les éléments biographiques, les bourses et les faits relatifs à l'incident s'appuient sur des archives institutionnelles et la presse de l'époque. Le guide de sécurité au travail proposé est une initiative d'UltimateHealth. L'historique législatif du projet H.R. 1195 est mentionné à titre de contexte et non comme une conséquence directe de cette affaire.",
              "verifiedFacts": [
                  "Médecin urgentiste de 38 ans au Mercy Hospital de Chicago ; diplômée de l'UIC College of Medicine (2014) et ancienne étudiante SIU MEDPREP (2007–2009).",
                  "Tuée par balle le 19 novembre 2018 sur le parking du Mercy Hospital par son ex-fiancé Juan Lopez, qui a ensuite tué l'interne en pharmacie Dayna Less et le policier Samuel Jimenez.",
                  "Le mémorandum officiel du procureur du comté de Cook a documenté la fusillade, les victimes et la réponse policière.",
                  "Deux bourses d'études commémoratives ont été créées en son honneur à l'UIC (mars 2019) et à la Southern Illinois University (MEDPREP).",
                  "Hommages officiels publiés par l'ACEP (20 nov. 2018), la NMA (21 nov. 2018) et l'EMRA (26 nov. 2018)."
              ],
              "societalImpact": "Réponse professionnelle et institutionnelle :\n• American College of Emergency Physicians (ACEP) : Déclaration officielle du 20 novembre 2018 saluant sa mémoire et soutenant la prévention des violences par armes à feu et les ordonnances de protection (ERPO/GVRO).\n• Emergency Medicine Residents' Association (EMRA) et Emergency Nurses Association (ENA) : Hommages officiels et campagne No Silence on ED Violence (2019).\n\nContexte législatif — H.R. 1195 :\nLe projet de loi H.R. 1195 (Workplace Violence Prevention for Health Care and Social Service Workers Act) a été présenté au 117e Congrès américain le 22 février 2021 et adopté par la Chambre des représentants le 16 avril 2021 avant d'être transmis au Sénat.\nDistinction factuelle importante : H.R. 1195 s'inscrivait dans un effort législatif plus large ; il ne doit pas être présenté comme une conséquence directe du décès de la Dre O’Neal ni comme une loi fédérale promulguée.",
              "actionableLesson": "Évaluation des menaces au travail et sécurité des campus hospitaliers :\n1. Signalement confidentiel des menaces, du harcèlement ou de la traque sans crainte de représailles.\n2. Soutien professionnel sensibilisé aux violences conjugales (plans de sécurité individualisés).\n3. Réponse de sécurité coordonnée entre la sécurité hospitalière et les forces de l'ordre.\n4. Contrôle des accès et sécurisation des parkings et entrées du personnel.\n5. Soutien médical, psychologique et juridique après un incident.",
              "memorialPublication": {
                  "title": "Guide d'Évaluation des Menaces au Travail et de Sécurité des Campus Hospitaliers",
                  "focus": "Sécurité au Travail · Violences Conjugales · Signalement des Menaces · Préparation aux Urgences",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Objectif : Élaborer une ressource éducative pratique pour aider les établissements de santé à identifier, signaler et gérer les menaces extérieures ciblant le personnel.\n\nLa perspective d'UltimateHealth :\nSe souvenir de la Dre Tamara O’Neal, c'est honorer la médecin qu'elle était, les personnes qu'elle a soutenues, les étudiants bénéficiaires de ses bourses commémoratives et la nécessité de sécuriser les lieux de travail hospitaliers."
              }
          },
          "de": {
              "name": "Dr. Tamara O’Neal",
              "roleAndField": "Oberärztin für Notfallmedizin · Mercy Hospital & Medical Center, Chicago, Illinois",
              "categoryLabel": "Notfallmedizin & Arbeitsplatzsicherheit",
              "coreMessage": "Gewalt durch Intimpartner kann Betroffene bis an ihren Arbeitsplatz verfolgen. Gesundheitseinrichtungen müssen glaubwürdige Bedrohungen ernst nehmen, vertrauliche Melde- und Unterstützungsmechanismen bereitstellen und Notfallmaßnahmen koordinieren, die Beschäftigte, Patienten und Besucher schützen.",
              "whoWasThisPerson": "Dr. Tamara O’Neal war eine 38-jährige Notfallmedizinerin am Mercy Hospital & Medical Center in Chicago.\nSie schloss 2014 ihr Medizinstudium am University of Illinois College of Medicine (UIC) ab und beendete 2017 ihre Facharztausbildung für Notfallmedizin. Von 2007 bis 2009 hatte sie am Vorbereitungsprogramm MEDPREP der Southern Illinois University teilgenommen.\nNeben ihrer klinischen Tätigkeit unterrichtete sie ehrenamtlich Assistenzärzte, leitete ihren Kirchenchor und sammelte Spenden für benachteiligte Kinder in Chicagos South Side.",
              "contributions": "Dr. O’Neals Beitrag reichte weit über die Notaufnahme hinaus:\n• Klinischer Dienst: Notfallmedizinerin am Mercy Hospital und ehrenamtliche Ausbilderin für Assistenzärzte.\n• Bildung und Mentoring: Engagement im Urban Health Program der UIC zur Förderung unterrepräsentierter Medizinstudierender.\n• Gemeindedienst: Spendensammlungen für benachteiligte Kinder und Chorleitung.\n\nEin fortgeführtes Vermächtnis — Stipendien und medizinische Ausbildung:\nA. Tamara O’Neal MD Scholarship Fund — University of Illinois Chicago (UIC): Im März 2019 von zwölf UIC-Alumni gegründet (über 68.000 $ Startkapital) zur Förderung von Medizinstudierenden im Urban Health Program und angehenden Notfallmedizinern.\nB. Dr. Tamara O’Neal MEDPREP Scholarship — Southern Illinois University (SIU): Würdigt sie als ehemalige MEDPREP-Studentin (2007–2009) und unterstützt Studierende der Medizin und Zahnmedizin.\nUltimateHealth würdigt diese Stipendieninitiativen als eigenständigen und fortdauernden Teil ihres Vermächtnisses.",
              "factualContext": "Am 19. November 2018 wurde Dr. Tamara O’Neal auf dem Parkplatz des Mercy Hospital & Medical Center in Chicago tödlich angeschossen.\nIhr ehemaliger Verlobter Juan Lopez hatte dort auf sie gewartet und schoss nach einem Streit mehrmals mit einer halbautomatischen Pistole auf sie. Zeitgenössischen Berichten zufolge hatte Dr. O’Neal zuvor den Notruf 911 gewählt, um zu melden, dass ihr Ex-Verlobter bewaffnet am Krankenhaus sei.\nAnschließend betrat Lopez das Krankenhausgebäude und erschoss die Pharmazie-Assistenzärztin Dayna Less in der Lobby sowie im weiteren Verlauf den Polizisten Samuel Jimenez vom Chicago Police Department.\nLopez wurde von einem einschreitenden Polizisten tödlich getroffen (die offizielle Untersuchung von Cook County stufte den Schusswaffengebrauch der Polizei als rechtmäßig ein und dokumentierte zudem eine selbst zugefügte Kopfschusswunde bei Lopez).\n\nBei dem Vorfall kamen drei Opfer ums Leben:\n• Dr. Tamara O’Neal — Notfallmedizinerin.\n• Dayna Less — Pharmazie-Assistenzärztin.\n• Samuel Jimenez — Polizeibeamter der Stadt Chicago.",
              "editorialNotes": "Publikationshinweis: Die Angaben zu Biografie, Stipendien und Tatverlauf stützen sich auf institutionelle Dokumente und zeitgenössische Berichte. Der vorgeschlagene Sicherheitsleitfaden ist eine Initiative von UltimateHealth. Die Gesetzgebungsgeschichte zu H.R. 1195 dient der Einordnung und wird nicht als direkte Folge dieses Falls dargestellt.",
              "verifiedFacts": [
                  "38-jährige Notfallmedizinerin am Mercy Hospital, Chicago; Absolventin des UIC College of Medicine (2014) und des SIU MEDPREP-Programms (2007–2009).",
                  "Am 19. November 2018 auf dem Parkplatz des Mercy Hospital von ihrem Ex-Verlobten Juan Lopez erschossen, der anschließend auch die Pharmazie-Assistenzärztin Dayna Less und den Polizisten Samuel Jimenez tötete.",
                  "Offizieller Untersuchungsbericht der Staatsanwaltschaft von Cook County dokumentierte den Tatverlauf und den gerechtfertigten Polizeieinsatz.",
                  "Gedächtnisstipendien an der University of Illinois Chicago (März 2019) und der Southern Illinois University (MEDPREP) eingerichtet.",
                  "Offizielle Gedenkerklärungen von ACEP (20. Nov. 2018), NMA (21. Nov. 2018) und EMRA (26. Nov. 2018)."
              ],
              "societalImpact": "Berufsständische und institutionelle Reaktion:\n• American College of Emergency Physicians (ACEP): Offizielle Stellungnahme vom 20. November 2018 zur Trauer um die Opfer und zur Prävention von Schusswaffengewalt (einschließlich ERPOs/GVROs).\n• Emergency Medicine Residents' Association (EMRA) und Emergency Nurses Association (ENA): Gedenkerklärungen und Einsatz für sicherere Notaufnahmen (Kampagne No Silence on ED Violence, 2019).\n\nGesetzgeberischer Kontext — H.R. 1195:\nDer Gesetzentwurf H.R. 1195 (Workplace Violence Prevention for Health Care and Social Service Workers Act) wurde am 22. Februar 2021 im 117. US-Kongress eingebracht, am 16. April 2021 vom Repräsentantenhaus verabschiedet und an den Senat überwiesen.\nWichtige sachliche Abgrenzung: H.R. 1195 war Teil einer breiteren gesetzgeberischen Initiative; er kann weder spezifisch Dr. O’Neals Tod zugeschrieben noch als verabschiedetes Bundesgesetz bezeichnet werden.",
              "actionableLesson": "Bedrohungsanalyse am Arbeitsplatz und Krankenhaussicherheit:\n1. Vertrauliche Meldung von Bedrohungen, Stalking oder Belästigung ohne Angst vor beruflichen Nachteilen.\n2. Unterstützung am Arbeitsplatz bei Partnerschaftsgewalt (individuelle Sicherheitspläne mit Personalabteilung und Sicherheitsdienst).\n3. Koordinierte Sicherheitsreaktion zwischen Krankenhaussicherheit und Polizei.\n4. Zugangskontrolle und Überwachung von Parkplätzen und Personaleingängen.\n5. Psychologische, medizinische und rechtliche Nachsorge nach Vorfällen.",
              "memorialPublication": {
                  "title": "Leitfaden zur Bedrohungsanalyse am Arbeitsplatz und zur Campus-Sicherheit im Gesundheitswesen",
                  "focus": "Arbeitsschutz · Partnerschaftsgewalt · Bedrohungsmeldung · Notfallvorsorge im Krankenhaus",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Ziel: Entwicklung eines praxisnahen Leitfadens für Gesundheitseinrichtungen zur Erkennung, Meldung und Abwehr externer Bedrohungen gegen Beschäftigte.\n\nDie UltimateHealth-Perspektive:\nDr. Tamara O’Neal zu gedenken bedeutet, ihre ärztliche Arbeit, ihr gesellschaftliches Engagement, die durch ihre Gedächtnisstipendien geförderten Studierenden und die Notwendigkeit sicherer Arbeitsplätze im Gesundheitswesen zu würdigen."
              }
          },
          "hr": {
              "name": "Dr. Tamara O’Neal",
              "roleAndField": "Specijalistica hitne medicine · Mercy Hospital & Medical Center, Chicago, Illinois",
              "categoryLabel": "Hitna medicina i sigurnost na radnom mjestu",
              "coreMessage": "Nasilje intimnog partnera može pratiti osobe i do njihova radnog mjesta. Zdravstvene ustanove moraju ozbiljno shvatiti vjerodostojne prijetnje, osigurati povjerljive mehanizme prijave i podrške te koordinirati hitne протоkole koji štite zaposlenike, pacijente i posjetitelje.",
              "whoWasThisPerson": "Dr. Tamara O’Neal bila je 38-godišnja liječnica hitne medicine u bolnici Mercy Hospital & Medical Center u Chicagu.\nDiplomirala je na Medicinskom fakultetu Sveučilišta Illinois (UIC) 2014. godine, a specijalizaciju iz hitne medicine završila 2017. godine. Između 2007. i 2009. sudjelovala je u pripremnom programu MEDPREP na Sveučilištu Southern Illinois.\nUz klinički rad, volontirala je подуčavajući specijalizante, vodila crkveni zbor i prikupljala sredstva za djecu u nepovoljnom položaju u južnom dijelu Chicaga.",
              "contributions": "Doprinos dr. O’Neal nadilazio je liječenje pacijenata u hitnoj službi:\n• Klinička služba: Specijalistica hitne medicine u bolnici Mercy i volonterska mentorica specijalizantima.\n• Obrazovanje i mentorstvo: Sudjelovala u UIC-ovu Urban Health Programu i poticala studente iz nedovoljno zastupljenih skupina na studij medicine.\n• Rad u zajednici: Prikupljala pomoć za djecu i vodila crkveni zbor.\n\nNastavljeno nasljeđe — Stipendije i medicinsko obrazovanje:\nA. Stipendijski fond Tamara O’Neal MD — University of Illinois Chicago (UIC): Osnovan u ožujku 2019. od strane dvanaest kolega диплоmanata UIC-a (prikupljeno više od 68.000 USD) za potporu studentima medicine.\nB. MEDPREP stipendija dr. Tamara O’Neal — Southern Illinois University (SIU): Odaje joj priznanje kao bivšoj polaznici MEDPREP-a (2007.–2009.) i pomaže studentima medicine i dentalne medicine.\nUltimateHealth prepoznaje ove stipendijske inicijative kao zaseban i trajan dio njezina nasljeđa.",
              "factualContext": "Dana 19. studenoga 2018. dr. Tamara O’Neal smrtno je stradala u pucnjavi na parkiralištu bolnice Mercy Hospital & Medical Center u Chicagu.\nNjezin bivši zaručnik Juan Lopez čekao ju je na parkiralištu te je nakon prepirke u nju ispalio više hitaca iz poluautomatskog pištolja. Prema tadašnjim izvješćima, dr. O’Neal nazvala je 911 kako bi prijavila da je njezin bivši zaručnik u bolnici s oružjem.\nNakon toga Lopez je ušao u zgradu bolnice i usmrtio specijalizanticu farmacije Daynu Less u предvorju te policijskog službenika Chicaga Samuela Jimeneza.\nLopeza je potom smrtno pogodio policajac koji je intervenirao (službena istraga okruga Cook potvrdila je da je uporaba smrtonosne sile bila zakonski opravdana).\n\nU incidentu su ubijene tri žrtve:\n• Dr. Tamara O’Neal — Liječnica hitne medicine.\n• Dayna Less — Specijalizantica farmacije.\n• Samuel Jimenez — Policijski službenik Chicaga.",
              "editorialNotes": "Napomena o objavi: Biografski podaci, podaci o stipendijama i opis događaja temelje se na institucionalnim zapisima i izvješćima iz tog vremena. Predloženi vodič za sigurnost na radnom mjestu inicijativa je UltimateHealtha, a zakonodavni kontekst H.R. 1195 naveden je radi šireg uvida.",
              "verifiedFacts": [
                  "38-godišnja specijalistica hitne medicine u bolnici Mercy u Chicagu; diplomirala na UIC College of Medicine (2014.) i pohađala SIU MEDPREP (2007.–2009.).",
                  "Ubijena 19. studenoga 2018. na parkiralištu bolnice Mercy od strane bivšeg zaručnika Juana Lopeza, koji je potom usmrtio specijalizanticu farmacije Daynu Less i policajca Samuela Jimeneza.",
                  "Službeni memorandum Državnog odvjetništva okruga Cook dokumentirao je napad, žrtve i opravdanu policijsku intervenciju.",
                  "U njezinu čast osnovane su memorijalne stipendije na Sveučilištu Illinois u Chicagu (ožujak 2019.) i Sveučilištu Southern Illinois (MEDPREP).",
                  "Službena priopćenja objavili su ACEP (20. stu 2018.), NMA (21. stu 2018.) i EMRA (26. stu 2018.)."
              ],
              "societalImpact": "Strukovni i institucionalni odgovor:\n• American College of Emergency Physicians (ACEP): Službeno priopćenje od 20. studenoga 2018. o prevenciji оруžanog nasilja i zaštitnim mjerama (ERPO/GVRO).\n• EMRA i ENA: Izrazi sućuti i kampanja No Silence on ED Violence (2019.).\n\nZakonodavni kontekst — H.R. 1195:\nPrijedlog zakona H.R. 1195 (Workplace Violence Prevention for Health Care and Social Service Workers Act) upućen je u 117. Kongres SAD-a 22. veljače 2021., a Zastupnički dom usvojio ga je 16. travnja 2021. te uputio u Senat.\nVažna činjenična napomena: H.R. 1195 bio je dio šireg zakonodavnog nastojanja te se ne smije pripisati isključivo smrti dr. O’Neal niti opisivati kao doneseni savezni zakon.",
              "actionableLesson": "Procjena prijetnji na radnom mjestu i sigurnost bolničkog kampusa:\n1. Povjerljivo prijavljivanje prijetnji, uhođenja ili uznemiravanja bez straha od odmazde.\n2. Podrška na radnom mjestu usmjerena na zaštitu od obiteljskog i partnerskog nasilja.\n3. Koordinirana sigurnosna reakcija između bolničkog osiguranja i policije.\n4. Kontrola pristupa i sigurnost parkirališta te ulaza za osoblje.\n5. Psihološka, medicinska i pravna podrška nakon incidenta.",
              "memorialPublication": {
                  "title": "Vodič za procjenu prijetnji na radnom mjestu i sigurnost bolničkog kampusa",
                  "focus": "Zaštita na radu · Nasilje intimnog partnera · Prijava prijetnji · Hitna pripravnost bolnica",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Svrha: Razviti praktični edukativni vodič za zdravstvene ustanove o prepoznavanju, prijavljivanju i reagiranju na vanjske prijetnje koje mogu ugroziti zaposlenike.\n\nPerspektiva UltimateHealtha:\nSjećanje na dr. Tamaru O’Neal znači prepoznavanje liječnice kakva je bila, zajednice koju je podržavala, studenata kojima pomažu njezine memorijalne stipendije i važnosti stvaranja sigurnijih zdravstvenih radnih mjesta."
              }
          }
      }
  },
  {
    id: 5,
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

  // ── 2. Women Whose Stories Changed Conversations on Safety & Justice ──
    {
      "id": 6,
      "slug": "jyoti-singh",
      "name": "Jyoti Singh (Nirbhaya)",
      "country": "India",
      "countryFlag": "🇮🇳",
      "category": "safety-and-justice",
      "categoryLabel": "Safety, Freedom & Legal Reform",
      "eraOrYear": "2012",
      "roleAndField": "Physiotherapy Student · Delhi, India",
      "avatarUrl": "https://images.openai.com/static-rsc-4/_9b-LBXORzakkaP-CpLE4ue7n5b9iHneqVDtug_dU227vP2AXAorSGvEg_bHG_uQAfWmARFkc7YA3l0WT8NOEBWQwEeKbAPExYBBOwDqP3Ww7R3n_zltmW0Ni67iWc5yZPgSJ2lhJiXfQifA8blm-IHBwg7WkR3rjHmPAcivueM?purpose=inline",
      "verificationStatus": "Verified",
      "lastVerifiedAt": "2026-11-07",
      "coreMessage": "Safety, freedom, and dignity must be everyday rights. Women should never have to negotiate their right to education, professional independence, or movement through public spaces. Justice requires more than stronger laws: it requires institutions that prevent violence, respond responsibly, and protect survivors.",
      "whoWasThisPerson": "Jyoti Singh was a 23-year-old student pursuing physiotherapy in Delhi.\nShe came from a family originally from Uttar Pradesh. Her father had moved the family to Delhi in search of better opportunities and worked to support his children's education.\nHer family made considerable sacrifices to support her ambitions. Her father reportedly sold ancestral land to help pay for her education. She also worked to support herself financially, including tutoring children and undertaking other work alongside her studies.\nShe was determined to build a professional career and become the first professional in her family.\nHer aspirations reflected the hopes of many young women seeking education, financial independence, and the opportunity to build meaningful careers.\n\nEditorial distinction: Jyoti was a physiotherapy student, not an established practising physiotherapist. Her professional contribution should be described through her educational journey and aspirations rather than unverified claims about clinical practice.",
      "contributions": "What She Represented to Society:\nJyoti Singh's life represented the aspirations of young women pursuing education and professional independence despite financial and social barriers.\n\nHer story brought attention to several important realities:\n• The sacrifices families make to educate their daughters.\n• The importance of access to higher education and professional opportunities for women.\n• The right of women to travel independently and participate in public life.\n• The need for public institutions to protect individual safety and dignity.\n\nHer contribution to society should not be measured through an invented professional career. She was still preparing to enter her chosen profession.\nHer story became a powerful reminder of the opportunities that are lost when violence takes away a young person's future.",
      "factualContext": "On the evening of 16 December 2012, Jyoti Singh and a male friend were returning after watching a film in Delhi.\nAt Munirka bus stand, they boarded a privately operated chartered bus that was not authorised to pick up passengers.\nSix men were on board. During the journey, Jyoti's friend was assaulted, and Jyoti was subjected to a brutal sexual assault. Both were subsequently thrown out of the vehicle near Mahipalpur.\nThey were taken to Safdarjung Hospital in Delhi for emergency treatment.\nDespite intensive medical treatment, her condition remained critical. On 26 December, doctors decided to transfer her to Mount Elizabeth Hospital in Singapore for further treatment.\nJyoti Singh died on 29 December 2012 from complications arising from her injuries.\nThe incident shocked India and generated widespread public outrage. Protests took place across Delhi and other cities, with citizens demanding justice, accountability, and meaningful action to address violence against women.\nThe case became widely known as the Nirbhaya case. The word Nirbhaya means fearless and was used as a pseudonym in accordance with the legal protections surrounding the identity of sexual-assault victims.\nHer parents later publicly called for their daughter's real name to be recognised rather than allowing the pseudonym to define her identity.\n\nJudicial Proceedings and Accountability:\nThe case proceeded through a fast-track trial and subsequent appeals.\nFour adult accused were convicted and sentenced to death. The Delhi High Court upheld the convictions and sentences, and the Supreme Court affirmed the decision in May 2017.\nThe Supreme Court subsequently dismissed review petitions, including a review petition in July 2018.\nThe four adult convicts were executed on 20 March 2020 at Tihar Jail in Delhi.\nOne accused, who was a juvenile at the time of the offence, was tried separately under the juvenile justice system and received the maximum period of institutional custody permitted under the law then in force.\nAnother accused died in custody during the proceedings.\nThe case raised significant questions about criminal accountability, the treatment of sexual-violence cases, juvenile justice, and the responsibilities of public institutions.",
      "editorialNotes": "Publication note: This profile distinguishes verified biographical facts, the documented criminal case, subsequent legal reforms, and UltimateHealth's proposed initiative. It does not claim that all recommendations of the Justice Verma Committee became law or that the proposed transport-safety measures have been implemented nationwide.",
      "verifiedFacts": [
          "23-year-old physiotherapy student in Delhi from a family originally from Uttar Pradesh.",
          "Brutally assaulted on the evening of 16 December 2012 aboard an unauthorised privately operated chartered bus boarded at Munirka, Delhi; treated at Safdarjung Hospital and Mount Elizabeth Hospital, Singapore, before dying on 29 December 2012.",
          "Supreme Court of India affirmed the convictions and death sentences of four adult accused in May 2017 and dismissed review petitions in July 2018; the four adult convicts were executed at Tihar Jail on 20 March 2020.",
          "Government of India constituted the three-member Justice J.S. Verma Committee on 23 December 2012 (report submitted 23 January 2013).",
          "The Criminal Law (Amendment) Act, 2013 (Act No. 13 of 2013) received presidential assent on 2 April 2013, and the dedicated Nirbhaya Fund was established in 2013."
      ],
      "societalImpact": "The incident triggered widespread public demonstrations and an unprecedented national discussion about women's safety, sexual violence, policing, and criminal justice.\nTwo major developments and a dedicated national fund followed.\n\nA. Justice J.S. Verma Committee\nOn 23 December 2012, the Government of India constituted a three-member committee chaired by former Chief Justice of India Justice J.S. Verma.\nThe other members were:\n• Justice Leila Seth, former Chief Justice of the Himachal Pradesh High Court.\n• Gopal Subramanium, former Solicitor General of India.\nThe committee was tasked with recommending amendments to criminal law to address sexual assault and improve the justice system's response. It submitted its report on 23 January 2013.\nThe report addressed a broad range of issues, including:\n• Sexual assault and the legal definition of rape.\n• Sexual harassment and violence against women.\n• Human trafficking and child sexual abuse.\n• Medical examination and treatment of survivors.\n• Police accountability and investigation procedures.\n• Electoral, educational, and institutional reforms.\n• The responsibilities of public authorities in protecting women.\nThe committee also emphasised that sexual violence should be understood as an expression of power, not merely as an act of passion. Its recommendations became an important reference point in India's subsequent criminal-law reform.\n\nB. Criminal Law (Amendment) Act, 2013\nThe Criminal Law (Amendment) Act, 2013 received presidential assent on 2 April 2013. It amended the Indian Penal Code, the Code of Criminal Procedure, the Indian Evidence Act, and the Protection of Children from Sexual Offences Act.\nAmong its important changes were:\n• Recognition of new offences, including acid attacks, stalking, and voyeurism.\n• Introduction of specific provisions addressing sexual harassment.\n• Expansion of the legal definition of rape.\n• Stronger provisions addressing certain forms of sexual violence.\n• Criminal consequences for public servants who fail to follow specified legal duties.\n• Accountability for hospitals that fail to provide treatment to victims of certain sexual offences.\n• Procedural protections intended to reduce humiliation and harassment during investigation and trial.\nImportant editorial distinction: The Act followed the public outcry surrounding the Nirbhaya case and drew on the wider process of criminal-law review. It did not incorporate every recommendation made by the Justice Verma Committee. The committee report and the legislation should therefore be presented as related but distinct developments.\n\nC. Nirbhaya Fund\nThe Government of India established the Nirbhaya Fund in 2013 as a dedicated, non-lapsable corpus to support initiatives intended to improve women's safety and security.\nThe fund is administered by the Department of Economic Affairs, Ministry of Finance. The Ministry of Women and Child Development serves as the nodal ministry for appraising and recommending proposals under the fund's framework.\nIts intended areas of support include initiatives addressing safety in public spaces, transportation, emergency response, and access to protection and support services.\nHowever, the existence of a fund or the approval of a scheme should not automatically be treated as proof that safety has improved everywhere. Implementation, monitoring, accessibility, and measurable outcomes remain essential.",
      "actionableLesson": "Public Transit Safety and Women's Right to Mobility\nJyoti Singh's case exposed the risks that can arise when unregulated transport operations, inadequate oversight, and unsafe public environments intersect.\n\nThe following measures should be considered by transport authorities, operators, urban planners, and law-enforcement agencies:\n1. Verified driver and operator credentials:\n• Require proper verification of commercial and contract-transport drivers.\n• Maintain accurate records of vehicle ownership, permits, and authorised operators.\n• Conduct periodic checks of driver eligibility and vehicle documentation.\n• Establish accountability for unauthorised passenger pickup.\n\n2. GPS-enabled transport monitoring:\n• Use GPS tracking for applicable commercial and contract-transport services.\n• Maintain reliable trip records and appropriate monitoring arrangements.\n• Provide mechanisms for reporting route deviations or suspicious activity.\n• Establish clear protocols for responding to distress alerts.\n\n3. Safer public transport environments:\n• Improve lighting at bus stops, stations, access roads, and walking routes.\n• Maintain visible emergency contact information.\n• Ensure that public transport vehicles and stations have accessible emergency-reporting mechanisms.\n• Conduct regular safety audits of routes and transport facilities.\n\n4. Emergency response and rapid assistance:\n• Strengthen coordination between transport operators, police, and emergency services.\n• Make emergency assistance accessible through India's ERSS number, 112.\n• Train relevant staff to respond to distress reports.\n• Ensure that complaints are recorded and escalated rather than ignored.\n\n5. Responsible bystander intervention:\n• Educate students and commuters about safe ways to intervene when someone appears to be in danger.\n• Encourage reporting and seeking professional assistance rather than placing untrained bystanders at unnecessary risk.\n• Promote practical awareness of emergency services and available support systems.\n\n6. Institutional accountability:\n• Establish transparent mechanisms for reporting unsafe transport operations.\n• Investigate failures in licensing, vehicle oversight, and emergency response.\n• Publish meaningful safety and implementation indicators.\n• Ensure that safety policies are reviewed regularly and improved using evidence.\n\nThese measures are proposed recommendations for safer public transportation. They should not be presented as a complete list of requirements already mandated by Indian law.",
      "memorialPublication": {
          "title": "Public Transit Safety & Universal Bystander Intervention Toolkit",
          "focus": "Urban Infrastructure · Women's Mobility · Public Transport Safety · Community Rapid Response",
          "initiativeStatus": "Proposed Initiative",
          "deliverable": "Purpose:\nDevelop an open-source educational and audit resource that helps academic institutions, transport operators, community organisations, and urban authorities evaluate public-transit safety and understand how to respond responsibly to emergencies.\n\nProposed toolkit components:\nA. Public Transport Safety Audit: Structured checklist to evaluate bus stops and station lighting, passenger information and emergency contacts, vehicle and operator verification, GPS and trip-monitoring arrangements, accessibility of emergency reporting, and coordination with local emergency services.\nB. Bystander Intervention Education: Educational material explaining how to recognise potentially dangerous situations, when and how to seek emergency assistance, how to report incidents safely, how to support someone experiencing harassment, and why survivor dignity and privacy must be respected.\nC. Campus and Community Safety Resources: Resources for colleges and universities, student transport services, women's safety organisations, community volunteers, and public transport operators.\nD. Evidence and Accountability Framework: Framework for recording safety-audit findings, reported infrastructure gaps, availability of emergency assistance, corrective actions, and follow-up assessments.\n\nThe UltimateHealth Perspective:\nJyoti Singh's story represents more than a criminal case or a moment of public outrage. It represents a young woman's pursuit of education, independence, and a professional future. It also represents the responsibility of society to ensure that women can participate in everyday life without fear.\nHer case contributed to a major national conversation about sexual violence and institutional accountability. The Justice Verma Committee, the Criminal Law (Amendment) Act, 2013, and the Nirbhaya Fund became important parts of the subsequent policy response.\nYet laws and funds are only meaningful when they translate into safety, dignity, access to justice, and accountability in everyday life.\nRemembering Jyoti Singh means recognising her aspirations, respecting her identity, and continuing to work towards a society where every woman can study, work, travel, and live freely."
      },
      "references": [
          {
              "title": "Supreme Court of India — Mukesh v. State (NCT of Delhi), Review Judgment, 9 July 2018",
              "url": "https://api.sci.gov.in/supremecourt/2017/35383/35383_2017_Judgement_09-Jul-2018.pdf",
              "publisher": "Supreme Court of India",
              "isPrimary": true
          },
          {
              "title": "Government of India — India Code — The Criminal Law (Amendment) Act, 2013, Act No. 13 of 2013",
              "url": "https://www.indiacode.nic.in/bitstream/123456789/15357/1/criminal_law_ammend_act_2013.pdf",
              "publisher": "Government of India",
              "isPrimary": true
          },
          {
              "title": "Press Information Bureau, Ministry of Home Affairs — Year End Review 2013: Criminal Law (Amendment) Act",
              "url": "https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=2&reg=3&relid=102166",
              "publisher": "Press Information Bureau, Government of India",
              "isPrimary": true
          },
          {
              "title": "Press Information Bureau, Ministry of Home Affairs — Statement of the Union Home Minister on the South Delhi incident, 18 December 2012",
              "url": "https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=48&relid=90911",
              "publisher": "Press Information Bureau, Government of India",
              "isPrimary": true
          },
          {
              "title": "PRS Legislative Research — Justice Verma Committee Report Summary (23 January 2013)",
              "url": "https://prsindia.org/policy/report-summaries/justice-verma-committee-report-summary",
              "publisher": "PRS Legislative Research",
              "isPrimary": true
          },
          {
              "title": "Ministry of Women and Child Development — Nirbhaya Fund: Official Government Framework",
              "url": "https://wcd.gov.in/offerings/nirbhaya",
              "publisher": "Ministry of Women and Child Development, India",
              "isPrimary": true
          },
          {
              "title": "The Guardian — Jyoti Singh's parents call for her real name to be used, 16 February 2017",
              "url": "https://www.theguardian.com/world/2017/feb/16/jyoti-singh-parents-call-for-honorary-museum-nirbhaya-to-use-her-real-name",
              "publisher": "The Guardian"
          },
          {
              "title": "The Jakarta Post — Q&A: What do we know about the 2012 gang-rape case that rocked India?",
              "url": "https://www.thejakartapost.com/news/2018/07/09/qa-what-do-we-know-about-2012-gang-rape-case-that-rocked-india",
              "publisher": "The Jakarta Post"
          },
          {
              "title": "Business Standard / Press Trust of India — Chronology of events in the Nirbhaya case",
              "url": "https://www.business-standard.com/article/pti-stories/chronology-of-events-in-nirbhaya-case-119121800928_1.html",
              "publisher": "Business Standard / Press Trust of India"
          },
          {
              "title": "The Guardian — Five years after the gang-rape and murder of Jyoti Singh, what has changed for women in India?",
              "url": "https://www.theguardian.com/society/2017/dec/03/five-years-after-gang-murder-jyoti-singh-how-has-delhi-changed",
              "publisher": "The Guardian"
          }
      ],
      "translations": {
          "hi": {
              "name": "ज्योति सिंह (निर्भया)",
              "roleAndField": "फिजियोथेरेपी छात्रा · दिल्ली, भारत",
              "categoryLabel": "सुरक्षा, स्वतंत्रता एवं कानूनी सुधार",
              "coreMessage": "सुरक्षा, स्वतंत्रता और गरिमा रोजमर्रा के अधिकार होने चाहिए। महिलाओं को शिक्षा, पेशेवर स्वतंत्रता या सार्वजनिक स्थानों पर आवाजाही के अपने अधिकार के लिए कभी भी समझौता नहीं करना पड़ना चाहिए। न्याय के लिए केवल कड़े कानूनों से अधिक की आवश्यकता है: इसके लिए ऐसे संस्थानों की आवश्यकता है जो हिंसा को रोकें, जिम्मेदारी से प्रतिक्रिया दें और उत्तरजीवियों की रक्षा करें।",
              "whoWasThisPerson": "ज्योति सिंह दिल्ली में फिजियोथेरेपी की पढ़ाई कर रही 23 वर्षीय छात्रा थीं।\nवे मूल रूप से उत्तर प्रदेश के एक परिवार से थीं। उनके पिता बेहतर अवसरों की तलाश में परिवार को दिल्ली ले आए थे और अपने बच्चों की शिक्षा के लिए कड़ी मेहनत करते थे।\nउनके परिवार ने उनकी महत्वाकांक्षाओं का समर्थन करने के लिए काफी बलिदान दिए। बताया जाता है कि उनके पिता ने उनकी शिक्षा का खर्च उठाने के लिए पैतृक जमीन बेच दी थी। उन्होंने अपनी पढ़ाई के साथ-साथ बच्चों को ट्यूशन पढ़ाने और अन्य कार्य करके खुद को आर्थिक रूप से भी सहारा दिया।\nवे एक पेशेवर करियर बनाने और अपने परिवार में पहली प्रोफेशनल बनने के लिए दृढ़ संकल्पित थीं।\n\nसंपादकीय अंतर: ज्योति फिजियोथेरेपी की छात्रा थीं, न कि एक स्थापित प्रैक्टिसिंग फिजियोथेरेपिस्ट। उनके पेशेवर योगदान को क्लिनिकल प्रैक्टिस के अप्रमाणित दावों के बजाय उनकी शैक्षिक यात्रा और आकांक्षाओं के माध्यम से वर्णित किया जाना चाहिए।",
              "contributions": "समाज के लिए उनका जीवन क्या दर्शाता था:\nज्योति सिंह का जीवन वित्तीय और सामाजिक बाधाओं के बावजूद शिक्षा और पेशेवर स्वतंत्रता प्राप्त करने वाली युवा महिलाओं की आकांक्षाओं का प्रतिनिधित्व करता था।\n\nउनकी कहानी ने कई महत्वपूर्ण वास्तविकताओं की ओर ध्यान आकर्षित किया:\n• बेटियों को शिक्षित करने के लिए परिवारों द्वारा किए जाने वाले बलिदान।\n• महिलाओं के लिए उच्च शिक्षा और पेशेवर अवसरों तक पहुंच का महत्व।\n• महिलाओं का स्वतंत्र रूप से यात्रा करने और सार्वजनिक जीवन में भाग लेने का अधिकार।\n• व्यक्तिगत सुरक्षा और गरिमा की रक्षा के लिए सार्वजनिक संस्थानों की आवश्यकता।\nउनकी कहानी इस बात की एक सशक्त अनुस्मारक बन गई कि जब हिंसा किसी युवा व्यक्ति का भविष्य छीन लेती है तो कौन से अवसर खो जाते हैं।",
              "factualContext": "16 दिसंबर 2012 की शाम को, ज्योति सिंह और उनके एक पुरुष मित्र दिल्ली में एक फिल्म देखने के बाद लौट रहे थे।\nमुनिरका बस स्टैंड पर, वे एक निजी रूप से संचालित चार्टर्ड बस में चढ़े जो यात्रियों को बैठाने के लिए अधिकृत नहीं थी।\nबस में छह लोग सवार थे। यात्रा के दौरान, ज्योति के मित्र पर हमला किया गया और ज्योति के साथ क्रूर यौन हिंसा की गई। बाद में दोनों को महिपालपुर के पास वाहन से बाहर फेंक दिया गया।\nउन्हें आपातकालीन उपचार के लिए दिल्ली के सफदरजंग अस्पताल ले जाया गया। 26 दिसंबर को आगे के इलाज के लिए उन्हें सिंगापुर के माउंट एलिजाबेथ अस्पताल में स्थानांतरित किया गया, जहाँ 29 दिसंबर 2012 को चोटों से उत्पन्न जटिलताओं के कारण ज्योति सिंह का निधन हो गया।\nइस मामले को व्यापक रूप से 'निर्भया' मामले के रूप में जाना गया। बाद में उनके माता-पिता ने सार्वजनिक रूप से आह्वान किया कि उनकी बेटी को उसके वास्तविक नाम से पहचाना जाए।\n\nन्यायिक कार्यवाही और जवाबदेही:\nफास्ट-ट्रैक ट्रायल में चार वयस्क आरोपियों को दोषी ठहराया गया और मृत्युदंड की सजा सुनाई गई, जिसे दिल्ली उच्च न्यायालय और मई 2017 में सर्वोच्च न्यायालय ने बरकरार रखा (जुलाई 2018 में पुनर्विचार याचिकाएं खारिज कर दी गईं)। चारों वयस्क दोषियों को 20 मार्च 2020 को तिहाड़ जेल में फांसी दी गई। एक नाबालिग आरोपी पर किशोर न्याय प्रणाली के तहत मुकदमा चलाया गया, और एक अन्य आरोपी की कार्यवाही के दौरान हिरासत में मृत्यु हो गई।",
              "editorialNotes": "प्रकाशन नोट: यह प्रोफ़ाइल सत्यापित जीवनी तथ्यों, प्रलेखित आपराधिक मामले, बाद के कानूनी सुधारों और UltimateHealth की प्रस्तावित पहल के बीच अंतर करती है। यह दावा नहीं करती कि न्यायमूर्ति वर्मा समिति की सभी सिफारिशें कानून बन गईं या प्रस्तावित परिवहन-सुरक्षा उपाय देश भर में लागू हो चुके हैं।",
              "verifiedFacts": [
                  "दिल्ली में फिजियोथेरेपी की पढ़ाई कर रही 23 वर्षीय छात्रा (मूल रूप से उत्तर प्रदेश के परिवार से)।",
                  "16 दिसंबर 2012 की शाम को मुनिरका से एक अनधिकृत निजी चार्टर्ड बस में क्रूर हमला; सफदरजंग अस्पताल और माउंट एलिजाबेथ अस्पताल, सिंगापुर में उपचार के बाद 29 दिसंबर 2012 को निधन।",
                  "सर्वोच्च न्यायालय ने मई 2017 में चार वयस्क दोषियों की सजा बरकरार रखी और जुलाई 2018 में पुनर्विचार याचिका खारिज की; 20 मार्च 2020 को तिहाड़ जेल में फांसी दी गई।",
                  "भारत सरकार ने 23 दिसंबर 2012 को तीन-सदस्यीय न्यायमूर्ति जे.एस. वर्मा समिति का गठन किया (23 जनवरी 2013 को रिपोर्ट प्रस्तुत)।",
                  "दंड विधि (संशोधन) अधिनियम, 2013 को 2 अप्रैल 2013 को राष्ट्रपति की स्वीकृति मिली और 2013 में निर्भया फंड की स्थापना हुई।"
              ],
              "societalImpact": "इस घटना ने महिला सुरक्षा, पुलिसिंग और आपराधिक न्याय पर अभूतपूर्व राष्ट्रीय चर्चा को जन्म दिया।\n\nA. न्यायमूर्ति जे.एस. वर्मा समिति (23 दिसंबर 2012 – 23 जनवरी 2013):\nपूर्व मुख्य न्यायाधीश जे.एस. वर्मा की अध्यक्षता में (न्यायमूर्ति लीला सेठ और गोपाल सुब्रमण्यम के साथ) गठित समिति ने यौन अपराधों, पुलिस जवाबदेही, उत्तरजीवियों की चिकित्सा जांच और संस्थागत सुधारों पर व्यापक सिफारिशें दीं।\n\nB. दंड विधि (संशोधन) अधिनियम, 2013 (2 अप्रैल 2013):\nइस अधिनियम ने भारतीय दंड संहिता, दंड प्रक्रिया संहिता, भारतीय साक्ष्य अधिनियम और POCSO अधिनियम में संशोधन किया—जिसमें एसिड अटैक, पीछा करना (stalking), ताक-झांक (voyeurism), यौन उत्पीड़न, बलात्कार की विस्तारित परिभाषा, और इलाज से इनकार करने वाले अस्पतालों व कर्तव्य में विफल लोक सेवकों की जवाबदेही शामिल थी।\nमहत्वपूर्ण संपादकीय अंतर: इस अधिनियम में वर्मा समिति की हर सिफारिश शामिल नहीं थी; इसलिए समिति की रिपोर्ट और कानून को संबंधित लेकिन अलग-अलग विकास के रूप में देखा जाना चाहिए।\n\nC. निर्भया फंड (2013):\nमहिलाओं की सुरक्षा के लिए वित्त मंत्रालय (आर्थिक कार्य विभाग) द्वारा प्रशासित और महिला एवं बाल विकास मंत्रालय की नोडल भूमिका वाला एक समर्पित फंड। हालांकि, केवल फंड या कानून का होना ही हर जगह सुरक्षा में सुधार का प्रमाण नहीं है; प्रभावी कार्यान्वयन और निगरानी अनिवार्य हैं।",
              "actionableLesson": "सार्वजनिक परिवहन सुरक्षा और महिलाओं की गतिशीलता का अधिकार:\n1. सत्यापित ड्राइवर और ऑपरेटर क्रेडेंशियल (वाहन परमिट और अनधिकृत यात्री पिकअप पर रोक)।\n2. जीपीएस-सक्षम परिवहन निगरानी और मार्ग विचलन या संकट अलर्ट पर त्वरित प्रोटोकॉल।\n3. सुरक्षित सार्वजनिक परिवहन वातावरण (बस स्टॉप और सड़कों पर पर्याप्त रोशनी व नियमित सुरक्षा ऑडिट)।\n4. आपातकालीन प्रतिक्रिया और ERSS नंबर 112 के माध्यम से त्वरित सहायता।\n5. जिम्मेदार बाईस्टैंडर (राहगीर) हस्तक्षेप शिक्षा।\n6. संस्थागत जवाबदेही और पारदर्शी सुरक्षा संकेतक।",
              "memorialPublication": {
                  "title": "सार्वजनिक परिवहन सुरक्षा और सार्वभौमिक बाईस्टैंडर हस्तक्षेप टूलकिट",
                  "focus": "शहरी बुनियादी ढांचा · महिलाओं की गतिशीलता · सार्वजनिक परिवहन सुरक्षा · सामुदायिक त्वरित प्रतिक्रिया",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "उद्देश्य: शैक्षणिक संस्थानों, परिवहन ऑपरेटरों और शहरी प्राधिकरणों के लिए सार्वजनिक-परिवहन सुरक्षा का मूल्यांकन करने हेतु एक ओपन-सोर्स शैक्षिक और ऑडिट संसाधन विकसित करना।\n\nUltimateHealth दृष्टिकोण:\nज्योति सिंह को याद करने का अर्थ है उनकी आकांक्षाओं को पहचानना, उनकी पहचान का सम्मान करना और एक ऐसे समाज के निर्माण की दिशा में काम करना जहाँ हर महिला बिना किसी डर के पढ़ सके, काम कर सके, यात्रा कर सके और स्वतंत्र रूप से जी सके।"
              }
          },
          "bn": {
              "name": "জ্যোতি সিং (নির্ভয়া)",
              "roleAndField": "ফিজিওথেরাপি শিক্ষার্থী · দিল্লি, ভারত",
              "categoryLabel": "নিরাপত্তা, স্বাধীনতা ও আইনি সংস্কার",
              "coreMessage": "নিরাপত্তা, স্বাধীনতা এবং মর্যাদা প্রতিদিনের মৌলিক অধিকার হতে হবে। শিক্ষা, পেশাগত স্বাধীনতা বা জনসমাগমস্থলে চলাচলের অধিকারের জন্য নারীদের কখনোই আপস করতে হওয়া উচিত নয়। ন্যায়বিচারের জন্য কেবল কঠোর আইনই যথেষ্ট নয়—প্রয়োজন সহিংসতা প্রতিরোধকারী ও দায়িত্বশীল প্রতিষ্ঠান।",
              "whoWasThisPerson": "জ্যোতি সিং ছিলেন দিল্লিতে ফিজিওথেরাপি অধ্যয়নরত ২৩ বছর বয়সী এক তরুণী। তাঁর পরিবার মূলত উত্তরপ্রদেশের বাসিন্দা ছিল। তাঁর শিক্ষার খরচ জোগাতে তাঁর বাবা পৈতৃক জমি বিক্রি করেছিলেন এবং জ্যোতি নিজেও টিউশনি ও খণ্ডকালীন কাজ করে নিজের পড়াশোনার খরচ চালাতেন।\nসম্পাদকীয় পার্থক্য: জ্যোতি ছিলেন একজন ফিজিওথেরাপি শিক্ষার্থী, প্রতিষ্ঠিত ফিজিওথেরাপিস্ট নন। তাঁর অবদানকে তাঁর শিক্ষাগত সংগ্রাম ও আকাঙ্ক্ষার মাধ্যমেই তুলে ধরা হয়েছে।",
              "contributions": "সমাজের কাছে তাঁর জীবন যা তুলে ধরেছিল:\nআর্থিক ও সামাজিক বাধা পেরিয়ে উচ্চশিক্ষা ও পেশাগত স্বাবলম্বিতা অর্জনের লক্ষ্যে তরুণীদের সংগ্রামের প্রতীক ছিলেন জ্যোতি সিং। তাঁর ঘটনা নারীদের নিরাপদ চলাচল এবং প্রাতিষ্ঠানিক সুরক্ষার প্রয়োজনীয়তাকে সামনে নিয়ে আসে।",
              "factualContext": "১৬ ডিসেম্বর ২০১২ সন্ধ্যায় দিল্লির মুনিরকা বাস স্ট্যান্ড থেকে জ্যোতি সিং ও তাঁর এক বন্ধু একটি অননুমোদিত বেসরকারি চার্টার্ড বাসে ওঠেন। চলন্ত বাসে ছয়জন ব্যক্তি তাঁর বন্ধুকে মারধর করে এবং জ্যোতির ওপর নৃশংস যৌন সহিংসতা চালায়। সফদরজং হাসপাতাল এবং পরে সিঙ্গাপুরের মাউন্ট এলিজাবেথ হাসপাতালে চিকিৎসাধীন অবস্থায় ২৯ ডিসেম্বর ২০১২-এ তাঁর মৃত্যু হয়।\n\nবিচারিক প্রক্রিয়া:\nচারজন প্রাপ্তবয়স্ক আসামিকে মৃত্যুদণ্ড দেওয়া হয়, যা সুপ্রিম কোর্ট মে ২০১৭ ও জুলাই ২০১৮-তে বহাল রাখে। ২০ মার্চ ২০২০ তারিখে তিহার জেলে চার আসামির মৃত্যুদণ্ড কার্যকর করা হয়।",
              "editorialNotes": "প্রকাশনা নোট: এই প্রোফাইলটি যাচাইকৃত জীবনীমূলক তথ্য, বিচারিক নথি, পরবর্তী আইনি সংস্কার এবং UltimateHealth-এর প্রস্তাবিত উদ্যোগের মধ্যে স্পষ্ট পার্থক্য বজায় রাখে।",
              "verifiedFacts": [
                  "দিল্লিতে ফিজিওথেরাপি অধ্যয়নরত ২৩ বছর বয়সী শিক্ষার্থী।",
                  "১৬ ডিসেম্বর ২০১২ সন্ধ্যায় মুনিরকা থেকে অননুমোদিত চার্টার্ড বাসে নৃশংস হামলার শিকার; ২৯ ডিসেম্বর ২০১২-এ সিঙ্গাপুরের মাউন্ট এলিজাবেথ হাসপাতালে মৃত্যু।",
                  "সুপ্রিম কোর্ট মে ২০১৭ ও জুলাই ২০১৮-এ রায় বহাল রাখার পর ২০ মার্চ ২০২০-এ তিহার জেলে চার প্রাপ্তবয়স্ক আসামির মৃত্যুদণ্ড কার্যকর হয়।",
                  "২৩ ডিসেম্বর ২০১২-এ বিচারপতি জে.এস. ভার্মা কমিটি গঠিত হয় (প্রতিবেদন দাখিল ২৩ জানুয়ারি ২০১৩)।",
                  "ফৌজদারি আইন (সংশোধনী) আইন, ২০১৩ (২ এপ্রিল ২০১৩) এবং নির্ভয়া তহবিল (২০১৩) প্রতিষ্ঠিত হয়।"
              ],
              "societalImpact": "A. বিচারপতি জে.এস. ভার্মা কমিটি (২৩ ডিসেম্বর ২০১২ – ২৩ জানুয়ারি ২০১৩): যৌন সহিংসতা রোধ ও পুলিশি জবাবদিহিতার ওপর ঐতিহাসিক সুপারিশমালা পেশ করে।\nB. ফৌজদারি আইন (সংশোধনী) আইন, ২০১৩: অ্যাসিড হামলা, স্টকিং, ভয়ারিজম এবং ধর্ষণের বিস্তৃত সংজ্ঞাসহ কঠোর বিধান যুক্ত হয় (যদিও ভার্মা কমিটির সব সুপারিশ এতে অন্তর্ভুক্ত হয়নি)।\nC. নির্ভয়া তহবিল (২০১৩): নারীদের নিরাপত্তার জন্য গঠিত বিশেষ সরকারি তহবিল।",
              "actionableLesson": "গণপরিবহন নিরাপত্তা ও নারীদের চলাচলের অধিকার:\n১. চালক ও অপারেটরের নথি যাচাই\n২. জিপিএস ট্র্যাকিং ও রুট নজরদারি\n৩. বাস স্টপ ও রাস্তায় পর্যাপ্ত আলোর ব্যবস্থা\n৪. জরুরি নম্বর ১১২ (ERSS)-এর মাধ্যমে দ্রুত সহায়তা\n৫. নিরাপদ ও দায়িত্বশীল পথচারী (bystander) হস্তক্ষেপ শিক্ষা\n৬. প্রাতিষ্ঠানিক জবাবদিহিতা।",
              "memorialPublication": {
                  "title": "গণপরিবহন নিরাপত্তা ও সার্বজনীন বাইস্ট্যান্ডার ইন্টারভেনশন টুলকিট",
                  "focus": "নগর অবকাঠামো · নারীর চলাচল · গণপরিবহন নিরাপত্তা · কমিউনিটি র‍্যাপিড রেসপন্স",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "জ্যোতি সিংকে স্মরণ করার অর্থ হলো তাঁর শিক্ষার স্বপ্নকে সম্মান জানানো এবং এমন এক সমাজ গড়ে তোলা যেখানে প্রতিটি নারী নির্ভয়ে পড়াশোনা, কাজ ও চলাচল করতে পারেন।"
              }
          },
          "ta": {
              "name": "ஜோதி சிங் (நிர்பயா)",
              "roleAndField": "பிசியோதெரபி மாணவி · டெல்லி, இந்தியா",
              "categoryLabel": "பாதுகாப்பு, சுதந்திரம் மற்றும் சட்டச் சீர்திருத்தம்",
              "coreMessage": "பாதுகாப்பு, சுதந்திரம் மற்றும் கண்ணியம் ஆகியவை அன்றாட அடிப்படை உரிமைகளாக இருக்க வேண்டும். பெண்கள் கல்வி, தொழில் சுதந்திரம் அல்லது பொது இடங்களில் நடமாடும் உரிமைக்காக ஒருபோதும் சமரசம் செய்யக் கூடாது.",
              "whoWasThisPerson": "ஜோதி சிங் டெல்லியில் பிசியோதெரபி பயின்று வந்த 23 வயது மாணவி. உத்தரப் பிரதேசத்தைப் பூர்வீகமாகக் கொண்ட அவரது குடும்பம், அவரது கல்விக்காகப் பெரும் தியாகங்களைச் செய்தது. அவரும் குழந்தைகளுக்கு டியூஷன் எடுத்தும் பகுதிநேர வேலை செய்தும் தனது கல்விச் செலவுகளுக்கு உதவினார்.\nஆசிரியர் குறிப்பு: ஜோதி ஒரு பிசியோதெரபி மாணவி; அவரது பங்களிப்பு அவரது கல்விப் பயணம் மற்றும் கனவுகள் வழியாகவே விவரிக்கப்படுகிறது.",
              "contributions": "நிதி மற்றும் சமூகத் தடைகளைத் தாண்டி உயர்கல்வி மற்றும் சுயசார்பை நோக்கிப் பயணிக்கும் இளம் பெண்களின் கனவுகளை அவரது வாழ்க்கை பிரதிபலித்தது.",
              "factualContext": "டிசம்பர் 16, 2012 மாலை, டெல்லி முனிர்கா பேருந்து நிறுத்தத்தில் ஜோதி சிங்கும் அவரது நண்பரும் அங்கீகரிக்கப்படாத தனியார் பேருந்தில் ஏறினர். பேருந்தில் இருந்த ஆறு பேரால் அவர் கொடூரமாகத் தாக்கப்பட்டார். சப்தர்ஜங் மருத்துவமனை மற்றும் சிங்கப்பூர் மவுண்ட் எலிசபெத் மருத்துவமனையில் சிகிச்சை பெற்றும், டிசம்பர் 29, 2012 அன்று உயிரிழந்தார்.\n\nநீதித்துறை நடவடிக்கைகள்:\nநான்கு குற்றவாளிகளுக்கு விதிக்கப்பட்ட மரண தண்டனையை மே 2017 மற்றும் ஜூலை 2018 இல் உச்ச நீதிமன்றம் உறுதி செய்தது. மார்ச் 20, 2020 அன்று திகார் சிறையில் தண்டனை நிறைவேற்றப்பட்டது.",
              "editorialNotes": "வெளியீட்டுக் குறிப்பு: நீதிபதி வர்மா குழுவின் அனைத்துப் பரிந்துரைகளும் சட்டமாகவில்லை என்பதையும், முன்மொழியப்பட்ட போக்குவரத்துப் பாதுகாப்பு நடவடிக்கைகள் UltimateHealth-இன் பரிந்துரைகள் என்பதையும் இப்பதிவு தெளிவுபடுத்துகிறது.",
              "verifiedFacts": [
                  "டெல்லியில் பிசியோதெரபி பயின்ற 23 வயது மாணவி.",
                  "டிசம்பர் 16, 2012 அன்று முனிர்காவில் தனியார் பேருந்தில் தாக்கப்பட்டு, டிசம்பர் 29, 2012 அன்று சிங்கப்பூர் மருத்துவமனையில் உயிரிழந்தார்.",
                  "உச்ச நீதிமன்றத் தீர்ப்பைத் தொடர்ந்து மார்ச் 20, 2020 அன்று திகார் சிறையில் நான்கு குற்றவாளிகளின் மரண தண்டனை நிறைவேற்றப்பட்டது.",
                  "டிசம்பர் 23, 2012 அன்று நீதிபதி ஜே.எஸ். வர்மா குழு அமைக்கப்பட்டது (ஜனவரி 23, 2013 இல் அறிக்கை சமர்ப்பிப்பு).",
                  "குற்றவியல் சட்டத் திருத்தச் சட்டம் 2013 (ஏப்ரல் 2, 2013) மற்றும் நிர்பயா நிதி (2013) உருவாக்கப்பட்டன."
              ],
              "societalImpact": "A. நீதிபதி ஜே.எஸ். வர்மா குழு (2012–2013): பாலியல் வன்கொடுமைத் தடுப்பு மற்றும் காவல்துறை சீர்திருத்தங்களுக்கான பரிந்துரைகளை வழங்கியது.\nB. குற்றவியல் சட்ட (திருத்த) சட்டம், 2013: அமில வீச்சு, பின்தொடர்தல் (stalking) மற்றும் பாலியல் குற்றங்களுக்குக் கடுமையான தண்டனைகளை அறிமுகப்படுத்தியது.\nC. நிர்பயா நிதி (2013): பெண்களின் பாதுகாப்புத் திட்டங்களுக்காக உருவாக்கப்பட்ட மத்திய அரசு நிதி.",
              "actionableLesson": "பொதுப் போக்குவரத்துப் பாதுகாப்பு நடைமுறைகள்:\n1. ஓட்டுநர் மற்றும் வாகன உரிமச் சரிபார்ப்பு\n2. ஜிபிஎஸ் கண்காணிப்பு\n3. பேருந்து நிறுத்தங்களில் போதிய வெளிச்சம் மற்றும் அவசரத் தொடர்பு வசதி\n4. அவசர எண் 112 (ERSS) மூலம் விரைவான உதவி\n5. பொறுப்பான பொதுமக்கள் தலையீடு குறித்த விழிப்புணர்வு\n6. நிறுவனப் பொறுப்புக்கூறல்.",
              "memorialPublication": {
                  "title": "பொதுப் போக்குவரத்துப் பாதுகாப்பு மற்றும் விழிப்புணர்வு கையேடு",
                  "focus": "நகர்ப்புற உள்கட்டமைப்பு · பெண்களின் பாதுகாப்பான பயணம் · சமூகப் பாதுகாப்பு",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ஜோதி சிங்கை நினைவுகூர்வது என்பது அவரது கல்வி கனவுகளை மதிப்பதும், ஒவ்வொரு பெண்ணும் அச்சமின்றிப் படிக்கவும் பணியாற்றவும் பயணம் செய்யவும் கூடிய சமுதாயத்தை உருவாக்குவதுமாகும்."
              }
          },
          "or": {
              "name": "ଜ୍ୟୋତି ସିଂହ (ନିର୍ଭୟା)",
              "roleAndField": "ଫିଜିଓଥେରାପି ଛାତ୍ରୀ · ଦିଲ୍ଲୀ, ଭାରତ",
              "categoryLabel": "ସୁରକ୍ଷା, ସ୍ୱାଧୀନତା ଓ ଆଇନଗତ ସଂସ୍କାର",
              "coreMessage": "ସୁରକ୍ଷା, ସ୍ୱାଧୀନତା ଏବଂ ମର୍ଯ୍ୟାଦା ପ୍ରତ୍ୟେକ ଦିନର ମୌଳିକ ଅଧିକାର ହେବା ଉଚିତ। ଶିକ୍ଷା, ବୃତ୍ତିଗତ ସ୍ୱାଧୀନତା କିମ୍ବା ସାର୍ବଜନୀନ ସ୍ଥାନରେ ଯାତାୟାତ ପାଇଁ ମହିଳାମାନଙ୍କୁ କେବେବି ବୁଝାମଣା କରିବାକୁ ପଡ଼ିବା ଉଚିତ ନୁହେଁ।",
              "whoWasThisPerson": "ଜ୍ୟୋତି ସିଂହ ଦିଲ୍ଲୀରେ ଫିଜିଓଥେରାପି ପଢ଼ୁଥିବା ଜଣେ ୨୩ ବର୍ଷୀୟା ଛାତ୍ରୀ ଥିଲେ। ତାଙ୍କ ପিতা ତାଙ୍କ ଶିକ୍ଷା ପାଇଁ ପৈତୃକ ଜମି ବିକ୍ରି କରିଥିଲେ ଏବଂ ଜ୍ୟୋତି ନିଜେ ମଧ୍ୟ ଟ୍ୟୁସନ କରି ନିଜ ପଢ଼ା ଖର୍ଚ୍ଚ ତୁଲାଉଥିଲେ।\nସମ୍ପାଦକୀୟ ସ୍ପଷ୍ଟীকରଣ: ଜ୍ୟୋତି ଜଣେ ଫିଜିଓଥେରାପି ଛାତ୍ରୀ ଥିଲେ; ତାଙ୍କର ଅବଦାନକୁ ତାଙ୍କର ଶିକ୍ଷାଗତ ସଂଘର୍ଷ ଓ ଆକାଂକ୍ଷା ମାଧ୍ୟମରେ ବର୍ଣ୍ଣନା କରାଯାଇଛି।",
              "contributions": "ଆର୍ଥିକ ଓ ସାମାଜିକ ପ୍ରତିବନ୍ଧକ সତ୍ତ୍ୱେ ଉଚ୍ଚଶିକ୍ଷା ଏବଂ ସ୍ୱಾವଲମ୍বୀ ହେવા ପାଇଁ ଯୁବତୀମାନଙ୍କ ସ୍ୱପ୍ନର ପ୍ରତୀକ ଥିଲେ ଜ୍ୟୋତି ସିଂହ।",
              "factualContext": "୧୬ ଡିସେମ୍ବର ୨୦୧୨ ସନ୍ଧ୍ୟାରେ ଦିଲ୍ଲୀର ମୁନିରକା ବସ୍ ଷ୍ଟାଣ୍ଡରୁ ଜ୍ୟୋତି ସିଂହ ଓ ତାଙ୍କର ଜଣେ ବନ୍ଧୁ ଏକ ଅନଧିକୃତ ଘରୋଇ ବସରେ ଚଢ଼ିଥିଲେ, ଯେଉଁଠାରେ ଛଅ ଜଣ ବ୍ୟକ୍ତିଙ୍କ ଦ୍ୱାରା ସେ ନିର୍ମମ ଆକ୍ରମଣର ଶିକାର ହୋଇଥିଲେ। ସଫଦରଜଙ୍ଗ ହସ୍ପିଟାଲ ଏବଂ ପରେ ସିଙ୍ଗାପୁରର ମାଉଣ୍ଟ ଏଲିଜାବେଥ ହସ୍ପିଟାଲରେ ଚିକିତ୍ସାଧୀନ ଅବସ୍ଥାରେ ୨୯ ଡିସେମ୍ବର ୨୦୧୨ରେ ତାଙ୍କର ମୃତ୍ୟୁ ଘଟିଥିଲା।\n\nନ୍ୟାୟିକ ପ୍ରକ୍ରିୟା:\nସୁପ୍ରିମକୋର୍ଟ ମଇ ୨୦୧୭ ଓ ଜୁଲାଇ ୨୦୧୮ରେ ଚାରି ଦୋଷୀଙ୍କ ମୃତ୍ୟୁଦଣ୍ଡ କାଏମ ରଖିଥିଲେ ଏବଂ ୨୦ ମାର୍ଚ୍ଚ ୨୦୨୦ରେ ତିହାର ଜେଲରେ ଦଣ୍ଡ কার্যকর କରାଯାଇଥିଲା।",
              "editorialNotes": "ପ୍ରକାଶନ ଟିପ୍ପଣୀ: ଏହି ପ୍ରୋଫାଇଲ୍ ପ୍ରମାଣିତ ଜୀବନୀ ତଥ୍ୟ, ଅଦାଲତ ରେକର୍ଡ, ଆଇନଗତ ସଂସ୍କାର ଏବଂ UltimateHealth ର ପ୍ରସ୍ତାବିତ ପଦକ୍ଷେପ ମଧ୍ୟରେ ପାର୍ଥକ୍ୟ ବজାୟ ରଖେ।",
              "verifiedFacts": [
                  "ଦିଲ୍ଲୀରେ ଫିଜିଓଥେରାପି ପଢ଼ୁଥିବା ୨୩ ବର୍ଷୀୟା ଛାତ୍ରୀ।",
                  "୧୬ ଡିସେମ୍ବର ୨୦୧୨ରେ ଅନଧିକୃତ ବସରେ ଆକ୍ରମଣର ଶିକାର; ୨୯ ଡିସେମ୍ବର ୨୦୧୨ରେ ସିଙ୍ଗାପୁରରେ ପରଲୋକ।",
                  "୨୦ ମାର୍ଚ୍ଚ ୨୦୨୦ରେ ତିହାର ଜେଲରେ ଚାରି ଦୋଷୀଙ୍କ ମୃତ୍ୟୁଦଣ୍ଡ କାର୍ଯ୍ୟକାରୀ।",
                  "୨୩ ଡିସେମ୍ବର ୨୦୧୨ରେ ଜଷ୍ଟିସ୍ ଜେ.ଏସ୍. ବର୍ମା କମିଟି ଗଠন (୨୩ ଜାନୁଆରୀ ୨୦୧୩ରେ ରିପୋର୍ଟ ପ୍ରଦାନ)।",
                  "ଫୌଜଦାରୀ ଆଇନ (ସଂଶୋଧନ) ଅଧିନିୟମ, ୨୦୧୩ (୨ ଏପ୍ରିଲ ୨୦୧୩) ଏବଂ ନିର୍ଭୟା ପାଣ୍ଠି (୨୦୧୩) ଗଠିତ।"
              ],
              "societalImpact": "A. ଜଷ୍ଟିସ୍ ଜେ.ଏସ୍. ବର୍ମା କମିଟି (୨୦୧୨–୨୦୧୩): ଯୌନ ହିଂସା ନିରୋଧ ଓ ପୋଲିସ ଉତ୍ତରଦାୟିତ୍ୱ ଉପରେ ଐତିହାସିକ ସୁପାରିଶ।\nB. ଫୌଜଦାରୀ ଆଇନ (ସଂଶୋଧନ) ଅଧିନିୟମ, ୨୦୧୩: ଏସିଡ୍ ଆକ୍ରମଣ, ପିଛା କରିବା (stalking) ଆଦି ନୂତନ ଅପରାଧ ଓ କଠୋର ଦଣ୍ଡବିଧାନ।\nC. ନିର୍ଭୟା ପାଣ୍ଠି (୨୦୧୩): ମହିଳା ସୁରକ୍ଷା ପ୍ରକଳ୍ପ ପାଇଁ ସମର୍ପିତ ସରକାରୀ ପାଣ୍ଠି।",
              "actionableLesson": "ସାର୍ବଜନୀନ ପରିବହନ ସୁରକ୍ଷା:\n୧. ଡ୍ରାଇଭର ଓ ଅପରେଟରଙ୍କ ଯାଞ୍ଚ\n୨. ଜିପିଏସ୍ ଟ୍ରାକିଂ\n୩. ବସ୍ ଷ୍ଟପ୍ ଓ ରାସ୍ତାରେ ଆଲୋକୀକରଣ\n୪. ଜରୁରୀକାଳୀନ ନମ୍ବର ୧୧୨ (ERSS) ମାଧ୍ୟମରେ ତ୍ୱରିତ ସହାୟତା\n୫. ଦାୟିତ୍ୱশীল ନାଗରିକ ହସ୍ତକ୍ଷେପ ଶିକ୍ଷା\n୬. ଆନୁଷ୍ଠାନିକ ଉତ୍ତରଦାୟିତ୍ୱ।",
              "memorialPublication": {
                  "title": "ସାର୍ବଜନୀନ ପରିବହନ ସୁରକ୍ଷା ଓ ନାଗରିକ ସଚେତନତା ଟୁଲକିଟ୍",
                  "focus": "ସହରୀ ଭିତ୍ତିଭୂମି · ମହିଳାଙ୍କ ଯାତାୟାତ ସୁରକ୍ଷା · ଗୋଷ୍ଠୀ ତ୍ୱରିତ ପ୍ରତିକ୍ରିୟା",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ଜ୍ୟୋତି ସିଂହଙ୍କୁ ସ୍ମରଣ କରିବାର ଅର୍ଥ ହେଉଛି ତାଙ୍କର ଶିକ୍ଷାଗତ ସ୍ୱପ୍ନକୁ ସମ୍ମାନ ଦେବା ଏବଂ ପ୍ରତ୍ୟେକ ମହିଳାଙ୍କ ପାଇଁ ଏକ ସୁରକ୍ଷିତ ସମାଜ ଗଠନ କରିବା।"
              }
          },
          "es": {
              "name": "Jyoti Singh (Nirbhaya)",
              "roleAndField": "Estudiante de Fisioterapia · Delhi, India",
              "categoryLabel": "Seguridad, Libertad y Reforma Legal",
              "coreMessage": "La seguridad, la libertad y la dignidad deben ser derechos cotidianos. Las mujeres nunca deberían tener que negociar su derecho a la educación, la independencia profesional o la libre circulación por los espacios públicos. La justicia requiere más que leyes más estrictas: exige instituciones que prevengan la violencia, respondan con responsabilidad y protejan a las sobrevivientes.",
              "whoWasThisPerson": "Jyoti Singh era una estudiante de 23 años que cursaba fisioterapia en Delhi.\nProvenía de una familia originaria de Uttar Pradesh que se había mudado a Delhi en busca de mejores oportunidades. Su familia hizo considerables sacrificios para apoyar sus ambiciones; su padre vendió tierras ancestrales para financiar su educación, y ella misma daba clases particulares y trabajaba mientras estudiaba.\nEstaba decidida a construir una carrera profesional y convertirse en la primera profesional de su familia.\n\nDistinción editorial: Jyoti era estudiante de fisioterapia, no una fisioterapeuta en ejercicio establecido. Su contribución debe describirse a través de su trayectoria educativa y sus aspiraciones en lugar de afirmaciones no verificadas sobre práctica clínica.",
              "contributions": "Lo que representó para la sociedad:\nLa vida de Jyoti Singh representó las aspiraciones de las mujeres jóvenes que buscan educación e independencia profesional a pesar de las barreras económicas y sociales.\nSu historia visibilizó:\n• Los sacrificios que hacen las familias para educar a sus hijas.\n• La importancia del acceso a la educación superior y a las oportunidades profesionales para las mujeres.\n• El derecho de las mujeres a viajar de forma independiente y participar en la vida pública.\n• La necesidad de que las instituciones públicas protejan la seguridad y la dignidad individuales.",
              "factualContext": "En la tarde del 16 de diciembre de 2012, Jyoti Singh y un amigo regresaban después de ver una película en Delhi. En la parada de Munirka abordaron un autobús privado fletado que no estaba autorizado para recoger pasajeros.\nSeis hombres iban a bordo. Durante el trayecto, su amigo fue agredido y Jyoti sufrió una brutal agresión sexual. Ambos fueron arrojados del vehículo cerca de Mahipalpur y trasladados al Hospital Safdarjung en Delhi.\nEl 26 de diciembre fue trasladada al Hospital Mount Elizabeth en Singapur, donde falleció el 29 de diciembre de 2012 debido a complicaciones derivadas de sus heridas.\nEl caso fue ampliamente conocido como el caso Nirbhaya («sin miedo»), seudónimo utilizado conforme a la protección legal de identidad. Sus padres pidieron posteriormente que se reconociera el nombre real de su hija.\n\nProcedimientos judiciales:\nCuatro acusados adultos fueron declarados culpables y condenados a muerte; el Tribunal Superior de Delhi y la Corte Suprema de la India (mayo de 2017 y julio de 2018) confirmaron las sentencias, y fueron ejecutados el 20 de marzo de 2020 en la prisión de Tihar. Un acusado menor de edad fue juzgado bajo el sistema de justicia juvenil y otro murió bajo custodia durante el proceso.",
              "editorialNotes": "Nota de publicación: Este perfil distingue los hechos biográficos verificados, el caso penal documentado, las reformas legales posteriores y la iniciativa propuesta por UltimateHealth. No afirma que todas las recomendaciones del Comité Verma se convirtieran en ley ni que las medidas de seguridad en el transporte propuestas se hayan implementado en todo el país.",
              "verifiedFacts": [
                  "Estudiante de fisioterapia de 23 años en Delhi, de una familia originaria de Uttar Pradesh.",
                  "Agredida brutalmente el 16 de diciembre de 2012 en un autobús privado no autorizado abordado en Munirka, Delhi; falleció el 29 de diciembre de 2012 en el Hospital Mount Elizabeth de Singapur.",
                  "La Corte Suprema de la India confirmó las condenas de cuatro adultos en mayo de 2017 y rechazó las peticiones de revisión en julio de 2018; las ejecuciones tuvieron lugar el 20 de marzo de 2020.",
                  "El Gobierno de la India constituyó el Comité del Juez J.S. Verma el 23 de diciembre de 2012 (informe presentado el 23 de enero de 2013).",
                  "La Ley de Enmienda del Derecho Penal de 2013 (Ley N.º 13 de 2013) recibió sanción presidencial el 2 de abril de 2013, y en 2013 se creó el Fondo Nirbhaya."
              ],
              "societalImpact": "A. Comité del Juez J.S. Verma (23 de diciembre de 2012 – 23 de enero de 2013):\nPresidido por el expresidente de la Corte Suprema J.S. Verma, junto con la jueza Leila Seth y Gopal Subramanium, recomendó reformas profundas sobre agresión sexual, trata, atención médica a sobrevivientes y responsabilidad policial, subrayando que la violencia sexual es una expresión de poder.\n\nB. Ley de Enmienda del Derecho Penal de 2013 (2 de abril de 2013):\nModificó el Código Penal Indio, el Código de Procedimiento Penal, la Ley de Pruebas y la Ley POCSO, tipificando ataques con ácido, acoso (stalking) y voyeurismo, ampliando la definición de violación y estableciendo sanciones para funcionarios y hospitales que incumplan sus deberes legales.\nDistinción editorial importante: La ley no incorporó todas las recomendaciones del Comité Verma; ambos deben presentarse como desarrollos relacionados pero distintos.\n\nC. Fondo Nirbhaya (2013):\nFondo gubernamental dedicado a proyectos de seguridad para las mujeres administrado por el Ministerio de Finanzas con el Ministerio de Desarrollo de la Mujer y el Niño como ministerio nodal.",
              "actionableLesson": "Seguridad en el transporte público y derecho de las mujeres a la movilidad:\n1. Credenciales verificadas de conductores y operadores comerciales.\n2. Monitoreo de transporte mediante GPS y protocolos ante desvíos de ruta.\n3. Entornos de transporte público más seguros (iluminación en paradas, auditorías periódicas).\n4. Respuesta de emergencia y asistencia rápida a través del número único 112 (ERSS).\n5. Educación para la intervención responsable de testigos (bystanders).\n6. Rendición de cuentas institucional y transparencia en indicadores de seguridad.",
              "memorialPublication": {
                  "title": "Kit de Herramientas de Seguridad en el Transporte Público e Intervención Responsable de Testigos",
                  "focus": "Infraestructura Urbana · Movilidad de las Mujeres · Seguridad en el Transporte · Respuesta Comunitaria",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Propósito: Desarrollar un recurso educativo y de auditoría de código abierto para evaluar la seguridad del transporte público y promover respuestas responsables ante emergencias.\n\nLa perspectiva de UltimateHealth:\nRecordar a Jyoti Singh significa reconocer sus aspiraciones educativas, respetar su identidad y seguir trabajando por una sociedad donde cada mujer pueda estudiar, trabajar, viajar y vivir libremente."
              }
          },
          "fr": {
              "name": "Jyoti Singh (Nirbhaya)",
              "roleAndField": "Étudiante en Kinésithérapie · Delhi, Inde",
              "categoryLabel": "Sécurité, Liberté et Réforme Juridique",
              "coreMessage": "La sécurité, la liberté et la dignité doivent être des droits quotidiens. Les femmes ne devraient jamais avoir à négocier leur droit à l'éducation, à l'indépendance professionnelle ou à la libre circulation dans l'espace public. La justice exige plus que des lois renforcées : elle nécessite des institutions qui préviennent la violence, agissent de manière responsable et protègent les survivantes.",
              "whoWasThisPerson": "Jyoti Singh était une étudiante en kinésithérapie âgée de 23 ans à Delhi.\nIssue d'une famille originaire de l'Uttar Pradesh installée à Delhi, elle bénéficiait des lourds sacrifices de ses parents—son père ayant vendu des terres familiales pour financer ses études—tout en donnant elle-même des cours particuliers et en travaillant parallèlement à ses études.\nElle était déterminée à bâtir une carrière professionnelle et à devenir la première diplômée de sa famille.\n\nDistinction éditoriale : Jyoti était étudiante en kinésithérapie et non kinésithérapeute déjà en exercice. Sa contribution doit être décrite à travers son parcours d'études et ses aspirations plutôt que par des affirmations non vérifiées sur une pratique clinique.",
              "contributions": "Ce qu'elle représentait pour la société :\nLa vie de Jyoti Singh incarnait les aspirations des jeunes femmes poursuivant des études supérieures et l'indépendance professionnelle malgré les obstacles financiers et sociaux.\nSon histoire a mis en lumière :\n• Les sacrifices consentis par les familles pour instruire leurs filles.\n• L'importance de l'accès des femmes à l'enseignement supérieur.\n• Le droit des femmes de se déplacer librement et de participer à la vie publique.\n• Le devoir des institutions publiques de protéger la sécurité et la dignité de chacun.",
              "factualContext": "Le soir du 16 décembre 2012, Jyoti Singh et un ami rentraient après avoir vu un film à Delhi. À l'arrêt de bus de Munirka, ils sont montés à bord d'un bus privé affrété qui n'était pas autorisé à prendre des passagers.\nSix hommes se trouvaient à bord. Au cours du trajet, son ami a été agressé et Jyoti a subi une violente agression sexuelle avant qu'ils ne soient tous deux jetés hors du véhicule près de Mahipalpur.\nPrise en charge à l'hôpital Safdarjung de Delhi puis transférée le 26 décembre à l'hôpital Mount Elizabeth de Singapour, Jyoti Singh est décédée le 29 décembre 2012 des suites de ses blessures.\nConnue sous le pseudonyme légal de « Nirbhaya » (« Sans peur »), ses parents ont par la suite demandé publiquement que son vrai nom soit reconnu.\n\nProcédures judiciaires :\nQuatre accusés majeurs ont été condamnés à mort, peine confirmée par la Haute Cour de Delhi et la Cour suprême de l'Inde (mai 2017 et juillet 2018), puis exécutés le 20 mars 2020 à la prison de Tihar. Un mineur au moment des faits a été jugé par la justice des mineurs et un sixième accusé est décédé en détention.",
              "editorialNotes": "Note de publication : Ce profil distingue les faits biographiques vérifiés, la procédure judiciaire documentée, les réformes législatives ultérieures et l'initiative proposée par UltimateHealth. Il n'affirme pas que toutes les recommandations de la Commission Verma ont force de loi ni que les mesures de sécurité des transports proposées ont été appliquées à l'échelle nationale.",
              "verifiedFacts": [
                  "Étudiante en kinésithérapie de 23 ans à Delhi, issue d'une famille originaire de l'Uttar Pradesh.",
                  "Violemment agressée le 16 décembre 2012 dans un bus privé non autorisé pris à Munirka (Delhi) ; décédée le 29 décembre 2012 à l'hôpital Mount Elizabeth de Singapour.",
                  "Condamnations confirmées par la Cour suprême de l'Inde en mai 2017 et juillet 2018 ; exécution des quatre condamnés majeurs le 20 mars 2020 à la prison de Tihar.",
                  "Création de la Commission du juge J.S. Verma le 23 décembre 2012 (rapport remis le 23 janvier 2013).",
                  "Promulgation de la loi d'amendement du droit pénal de 2013 (2 avril 2013) et création du Fonds Nirbhaya en 2013."
              ],
              "societalImpact": "A. Commission du juge J.S. Verma (23 décembre 2012 – 23 janvier 2013) :\nPrésidée par l'ancien président de la Cour suprême J.S. Verma aux côtés de la juge Leila Seth et de Gopal Subramanium, elle a formulé des recommandations majeures sur les violences sexuelles, la responsabilité policière et la prise en charge médicale des survivantes.\n\nB. Loi d'amendement du droit pénal de 2013 (2 avril 2013) :\nElle a modifié le Code pénal indien, le Code de procédure pénale, la Loi sur la preuve et la loi POCSO, incriminant les attaques à l'acide, le harcèlement (stalking) et le voyeurisme, élargissant la définition du viol et sanctionnant le refus de soins hospitaliers.\nDistinction éditoriale importante : La loi n'a pas repris l'intégralité des recommandations de la Commission Verma ; le rapport et la loi doivent donc être présentés comme deux développements liés mais distincts.\n\nC. Fonds Nirbhaya (2013) :\nFonds public dédié au financement de projets améliorant la sécurité des femmes dans les espaces publics et les transports.",
              "actionableLesson": "Sécurité des transports publics et droit des femmes à la mobilité :\n1. Vérification des permis et antécédents des conducteurs et opérateurs.\n2. Suivi GPS des véhicules commerciaux et protocoles d'alerte.\n3. Éclairage sécurisé des arrêts de bus et audits réguliers des infrastructures.\n4. Coordination des secours via le numéro d'urgence national 112 (ERSS).\n5. Sensibilisation à l'intervention responsable des témoins.\n6. Responsabilité institutionnelle et publication d'indicateurs de suivi.",
              "memorialPublication": {
                  "title": "Boîte à Outils pour la Sécurité des Transports Publics et l'Intervention Responsable des Témoins",
                  "focus": "Infrastructures Urbaines · Mobilité des Femmes · Sécurité des Transports · Réponse Communautaire",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Objectif : Développer une ressource éducative et d'audit en libre accès permettant d'évaluer la sécurité des transports en commun et de promouvoir des réactions responsables face aux urgences.\n\nLa perspective d'UltimateHealth :\nSe souvenir de Jyoti Singh signifie reconnaître ses aspirations, respecter son identité et œuvrer pour une société où chaque femme peut étudier, travailler, voyager et vivre librement."
              }
          },
          "de": {
              "name": "Jyoti Singh (Nirbhaya)",
              "roleAndField": "Physiotherapie-Studentin · Delhi, Indien",
              "categoryLabel": "Sicherheit, Freiheit & Rechtsreform",
              "coreMessage": "Sicherheit, Freiheit und Würde müssen alltägliche Grundrechte sein. Frauen sollten niemals um ihr Recht auf Bildung, berufliche Unabhängigkeit oder freie Bewegung im öffentlichen Raum verhandeln müssen. Gerechtigkeit erfordert mehr als strengere Gesetze: Sie braucht Institutionen, die Gewalt verhindern, verantwortungsvoll handeln und Überlebende schützen.",
              "whoWasThisPerson": "Jyoti Singh war eine 23-jährige Physiotherapie-Studentin in Delhi.\nSie stammte aus einer Familie aus Uttar Pradesh, die auf der Suche nach besseren Bildungschancen nach Delhi gezogen war. Ihre Familie brachte große Opfer für ihre Ausbildung—ihr Vater verkaufte Berichten zufolge familieneigenes Land—, und Jyoti finanzierte ihr Studium durch Nachhilfeunterricht und Nebentätigkeiten mit.\nSie war entschlossen, eine berufliche Laufbahn einzuschlagen.\n\nRedaktionelle Abgrenzung: Jyoti war Physiotherapie-Studentin und noch keine praktizierende Physiotherapeutin. Ihr Beitrag wird daher anhand ihres Bildungswegs und ihrer Ziele beschrieben, nicht durch unbelegte Angaben über eine klinische Berufspraxis.",
              "contributions": "Was sie für die Gesellschaft verkörperte:\nJyoti Singhs Leben stand für das Streben junger Frauen nach Bildung und beruflicher Selbstständigkeit trotz finanzieller und sozialer Hürden.\nIhre Geschichte lenkte den Blick auf:\n• Die Opfer, die Familien für die Bildung ihrer Töchter aufbringen.\n• Die Bedeutung des Zugangs von Frauen zu Hochschulbildung und Berufen.\n• Das Recht von Frauen, sich frei und sicher im öffentlichen Raum zu bewegen.\n• Die Pflicht öffentlicher Institutionen, Sicherheit und Würde zu schützen.",
              "factualContext": "Am Abend des 16. Dezember 2012 kehrten Jyoti Singh und ein Freund nach einem Kinobesuch in Delhi zurück. An der Bushaltestelle Munirka stiegen sie in einen privat betriebenen Charterbus, der nicht zur Fahrgastbeförderung zugelassen war.\nSechs Männer befanden sich an Bord. Während der Fahrt wurde ihr Freund zusammengeschlagen und Jyoti Opfer schwerster сексуeller Gewalt; beide wurden anschließend nahe Mahipalpur aus dem fahrenden Bus geworfen.\nNach einer Notfallbehandlung im Safdarjung Hospital in Delhi wurde sie am 26. Dezember in das Mount Elizabeth Hospital nach Singapur verlegt, wo sie am 29. Dezember 2012 an den Folgen ihrer Verletzungen starb.\nDer Fall wurde unter dem Schutzpseudonym „Nirbhaya“ („Furchtlose“) bekannt; später sprachen sich ihre Eltern öffentlich dafür aus, ihre Tochter bei ihrem wirklichen Namen Jyoti Singh zu nennen.\n\nGerichtsverfahren:\nVier erwachsene Angeklagte wurden zum Tode verurteilt; der Delhi High Court und der Oberste Gerichtshof Indiens (Mai 2017 und Juli 2018) bestätigten die Urteile, die am 20. März 2020 im Tihar-Gefängnis vollstreckt wurden. Ein zur Tatzeit jugendlicher Täter wurde nach dem Jugendstrafrecht verurteilt, ein weiterer Angeklagter starb während des Verfahrens in Haft.",
              "editorialNotes": "Publikationshinweis: Dieses Profil unterscheidet strikt zwischen belegten biografischen Fakten, dem dokumentierten Strafverfahren, den anschließenden Gesetzesreformen und der vorgeschlagenen Initiative von UltimateHealth. Es erhebt nicht den Anspruch, dass alle Empfehlungen der Verma-Kommission Gesetz wurden oder dass die vorgeschlagenen Verkehrssicherheitsmaßnahmen landesweit umgesetzt sind.",
              "verifiedFacts": [
                  "23-jährige Physiotherapie-Studentin in Delhi aus einer Familie mit Wurzeln in Uttar Pradesh.",
                  "Am Abend des 16. Dezember 2012 in einem nicht autorisierten privaten Charterbus ab Munirka (Delhi) schwer misshandelt; verstarb am 29. Dezember 2012 im Mount Elizabeth Hospital in Singapur.",
                  "Der Oberste Gerichtshof Indiens bestätigte die Urteile gegen vier erwachsene Täter im Mai 2017 und Juli 2018; Vollstreckung am 20. März 2020 im Tihar-Gefängnis.",
                  "Einsetzung des dreiköpfigen Justice-J.S.-Verma-Komitees am 23. Dezember 2012 (Bericht vorgelegt am 23. Januar 2013).",
                  "Verabschiedung des Criminal Law (Amendment) Act, 2013 (2. April 2013) sowie Einrichtung des Nirbhaya Fund (2013)."
              ],
              "societalImpact": "A. Justice-J.S.-Verma-Komitee (23. Dezember 2012 – 23. Januar 2013):\nUnter Vorsitz des ehemaligen obersten Richters J.S. Verma (mit Richterin Leila Seth und Gopal Subramanium) legte das Komitee umfassende Reformvorschläge zu Sexualstraftaten, Polizeiverantwortung und medizinischer Versorgung von Überlebenden vor.\n\nB. Criminal Law (Amendment) Act, 2013 (2. April 2013):\nÄnderte das indische Straf- und Strafprozessrecht, stellte Säureangriffe, Stalking und Voyeurismus unter spezifische Strafe, erweiterte den Vergewaltigungsbegriff und führte Sanktionen bei verweigerter Krankenhausbehandlung ein.\nWichtige redaktionelle Abgrenzung: Das Gesetz übernahm nicht jede Empfehlung der Verma-Kommission; Kommissionsbericht und Gesetz sind daher als verbundene, aber eigenständige Entwicklungen zu betrachten.\n\nC. Nirbhaya Fund (2013):\nStaatlicher Fonds zur Förderung von Projekten für die Sicherheit von Frauen im öffentlichen Raum und im Verkehrswesen.",
              "actionableLesson": "Sicherheit im öffentlichen Nahverkehr und das Recht auf Mobilität:\n1. Überprüfte Fahrer- und Betreiberlizenzen.\n2. GPS-gestützte Fahrzeugüberwachung und Notfallprotokolle.\n3. Sichere Gestaltung und Beleuchtung von Haltestellen und Fußwegen.\n4. Schnelle Notfallhilfe über die landesweite Notrufnummer 112 (ERSS).\n5. Schulung zu verantwortungsvollem Einschreiten von Passanten (Bystander Intervention).\n6. Institutionelle Rechenschaftspflicht und transparente Sicherheitsprüfungen.",
              "memorialPublication": {
                  "title": "Toolkit für Sicherheit im Öffentlichen Verkehr & Verantwortungsvolle Zivilcourage",
                  "focus": "Städtische Infrastruktur · Mobilität von Frauen · Verkehrssicherheit · Kommunale Notfallhilfe",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Ziel: Bereitstellung eines quelloffenen Prüf- und Bildungsleitfadens für Hochschulen, Verkehrsbetriebe und Kommunen zur Bewertung der Sicherheit im öffentlichen Nahverkehr.\n\nDie UltimateHealth-Perspektive:\nJyoti Singh zu gedenken bedeutet, ihre Bildungsziele zu würdigen, ihre Identität zu achten und weiter an einer Gesellschaft zu arbeiten, in der jede Frau frei und ohne Angst studieren, arbeiten, reisen und leben kann."
              }
          },
          "hr": {
              "name": "Jyoti Singh (Nirbhaya)",
              "roleAndField": "Studentica fizioterapije · Delhi, Indija",
              "categoryLabel": "Sigurnost, sloboda i pravna reforma",
              "coreMessage": "Sigurnost, sloboda i dostojanstvo moraju biti svakodnevna prava. Žene nikada ne bi smjele pregovarati o svom pravu na obrazovanje, profesionalnu neovisnost ili kretanje javnim prostorom. Pravda zahtijeva više od strožih zakona: zahtijeva institucije koje sprječavaju nasilje, odgovorno reagiraju i štite preživjele.",
              "whoWasThisPerson": "Jyoti Singh bila je 23-godišnja studentica fizioterapije u Delhiju.\nPotjecala je iz obitelji podrijetlom iz Uttar Pradesha koja se preselila u Delhi radi boljih mogućnosti obrazovanja. Njezina je obitelj podnijela velike žrtve kako bi podržala njezine ambicije, a Jyoti je i sama davala instrukcije i radila uz studij kako bi pomogla u financiranju školovanja.\n\nUrednička napomena: Jyoti je bila studentica fizioterapije, a ne već zaposlena fizioterapeutkinja. Njezin doprinos opisuje se kroz njezin obrazovni put i težnje, a ne kroz nepotvrđene tvrdnje o kliničkoj praksi.",
              "contributions": "Što je predstavljala za društvo:\nŽivot Jyoti Singh predstavljao je težnje mladih žena koje настоje steći obrazovanje i profesionalnu neovisnost unatoč financijskim i društvenim preprekama, ističući važnost sigurnog kretanja i institucionalne zaštite.",
              "factualContext": "Uvečer 16. prosinca 2012. Jyoti Singh i njezin prijatelj vraćali su se iz kina u Delhiju te su na autobusnom stajalištu Munirka ušli u privatni čarter-autobus koji nije imao дозвоlu za prijevoz putnika.\nŠest muškaraca u vozilu napalo je njezina prijatelja, a Jyoti podvrgnulo brutalnom seksualnom nasilju. Nakon liječenja u bolnici Safdarjung u Delhiju, 26. prosinca prebačena je u bolnicu Mount Elizabeth u Singapuru, gdje je preminula 29. prosinca 2012.\nSlučaj je postao poznat pod pseudonimom „Nirbhaya“ („Neustrašiva“), a njezini su roditelji kasnije javno zatražili da se prepoznaje njezino pravo ime.\n\nSudski postupak:\nČetvorica punoljetnih optuženika osuđena su na smrt, što je Vrhovni sud Indije potvrdio u svibnju 2017. i srpnju 2018., a kazne su izvršene 20. ožujka 2020. u zatvoru Tihar.",
              "editorialNotes": "Napomena o objavi: Ovaj profil razlikuje potvrđene biografske činjenice, sudski postupak, zakonske reforme i predloženu inicijativu UltimateHealtha, bez tvrdnje da su sve препоruke Odbora Verma postale zakon.",
              "verifiedFacts": [
                  "23-godišnja studentica fizioterapije u Delhiju iz obitelji podrijetlom iz Uttar Pradesha.",
                  "Brutalno napadnuta 16. prosinca 2012. u neovlaštenom privatnom autobusu u Delhiju; preminula 29. prosinca 2012. u bolnici Mount Elizabeth u Singapuru.",
                  "Vrhovni sud Indije potvrdio je presude četvorici punoljetnih počinitelja u svibnju 2017. i srpnju 2018.; pogubljenja su izvršena 20. ožujka 2020.",
                  "Vlada Indije osnovala je Odbor suca J.S. Verme 23. prosinca 2012. (izvješće podneseno 23. siječnja 2013.).",
                  "Zakon o izmjenama i dopunama kaznenog zakona iz 2013. stupio je na snagu u travnju 2013., uz osnivanje Fonda Nirbhaya."
              ],
              "societalImpact": "A. Odbor suca J.S. Verme (prosinac 2012. – siječanj 2013.): Preporučio sveobuhvatne reforme kaznenog prava, policijske odgovornosti i medicinske skrbi za žrtve.\nB. Zakon o izmjenama i dopunama kaznenog zakona iz 2013. (2. travnja 2013.): Uveo strože odredbe za napade kiselinom, uhođenje, voajerizam i seksualno nasilje te odgovornost bolnica i javnih službenika.\nC. Fond Nirbhaya (2013.): Namjenski državni fond za projekte sigurnosti žena.",
              "actionableLesson": "Sigurnost javnog prijevoza i pravo žena na mobilnost:\n1. Provjera dozvola vozača i prijevoznika\n2. GPS nadzor vozila\n3. Osvjetljenje i sigurnost autobusnih stajališta\n4. Brza hitna pomoć putem broja 112 (ERSS)\n5. Edukacija o odgovornoj intervenciji promatrača\n6. Institucionalna odgovornost.",
              "memorialPublication": {
                  "title": "Priručnik za sigurnost javnog prijevoza i odgovornu intervenciju građana",
                  "focus": "Urbana infrastruktura · Mobilnost žena · Sigurnost javnog prijevoza · Brza reakcija zajednice",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Sjećanje na Jyoti Singh znači poštivanje njezinih obrazovnih težnji, njezina identiteta i trajni rad na društvu u kojem svaka žena može slobodno studirati, raditi, putovati i živjeti."
              }
          }
      }
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


export function getLocalizedProfile(profile: TributeProfile, locale?: string): TributeProfile {
  if (!locale || !profile.translations || !profile.translations[locale]) {
    return profile;
  }
  const t = profile.translations[locale];
  return {
    ...profile,
    name: t.name ?? profile.name,
    roleAndField: t.roleAndField ?? profile.roleAndField,
    categoryLabel: t.categoryLabel ?? profile.categoryLabel,
    coreMessage: t.coreMessage ?? profile.coreMessage,
    whoWasThisPerson: t.whoWasThisPerson ?? profile.whoWasThisPerson,
    contributions: t.contributions ?? profile.contributions,
    factualContext: t.factualContext ?? profile.factualContext,
    societalImpact: t.societalImpact ?? profile.societalImpact,
    actionableLesson: t.actionableLesson ?? profile.actionableLesson,
    verifiedFacts: t.verifiedFacts ?? profile.verifiedFacts,
    editorialNotes: t.editorialNotes ?? profile.editorialNotes,
    memorialPublication: t.memorialPublication
      ? {
          ...profile.memorialPublication,
          title: t.memorialPublication.title ?? profile.memorialPublication.title,
          focus: t.memorialPublication.focus ?? profile.memorialPublication.focus,
          deliverable: t.memorialPublication.deliverable ?? profile.memorialPublication.deliverable,
          initiativeStatus: (t.memorialPublication.initiativeStatus as any) ?? profile.memorialPublication.initiativeStatus,
        }
      : profile.memorialPublication,
  };
}
