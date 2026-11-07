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
      "id": 7,
      "slug": "sarah-everard",
      "name": "Sarah Everard",
      "country": "United Kingdom",
      "countryFlag": "🇬🇧",
      "category": "safety-and-justice",
      "categoryLabel": "Public Trust & Women's Street Safety",
      "eraOrYear": "2021",
      "roleAndField": "Marketing Executive · London, England",
      "avatarUrl": "https://images.openai.com/static-rsc-4/DOKUtCp9ZqEvNj1GLduBA7jfysPzHED7DEIAEsC-qQGHhQFViaIhxBl676LvDAOlkd1eTXPtDHPBoO11qaPeNR5AooAOGRYXbpCgQomQnsd9-cz7QhcBg1O5AepJAP1MEBTiLqxS-MICJ6A7NEyPT57awmEYGVtlMX8PEdYluKA?purpose=inline",
      "verificationStatus": "Verified",
      "lastVerifiedAt": "2026-11-07",
      "coreMessage": "Public safety must be built into everyday civic infrastructure, and institutions entrusted with protecting citizens must remain accountable for the authority they exercise. Women should be able to walk through public spaces without fear, and no individual should be able to exploit institutional power to commit violence.",
      "whoWasThisPerson": "Sarah Everard was a 33-year-old marketing executive who lived in Brixton, South London.\nShe grew up in York and attended Fulford School before studying Human Geography at St Cuthbert's Society, Durham University, from 2005 to 2008.\nAfter graduating, she moved to London and built her professional career in marketing.\nFriends and family remembered her as intelligent, kind, thoughtful, and independent. She enjoyed spending time with friends and was described as someone with a bright personality and a strong interest in the world around her.\nSarah was living an ordinary independent life in London: working, maintaining friendships, and travelling around the city.\nHer story is important not because her life should be reduced to the circumstances of her death, but because she was an individual with her own relationships, ambitions, and future.",
      "contributions": "Sarah worked as a marketing professional and was a Durham University graduate.\nUnlike a public figure or a person whose contribution can be measured through a major institutional achievement, her life was primarily that of a private individual building her career and maintaining relationships with the people around her.\nThere is insufficient reliable evidence to attribute specific major branding campaigns, public initiatives, or formal civic leadership activities to her.\n\nHer story nevertheless became significant in the wider public discussion about:\n• Women's freedom to move independently through cities.\n• The right to feel safe while travelling home.\n• Public trust in police officers and other authority figures.\n• Institutional responsibility when individuals entrusted with public power abuse that authority.\n• The importance of taking violence against women seriously before it becomes fatal.\n\nEditorial principle: A person's worth does not depend on having an extraordinary public achievement. Sarah's life deserves recognition as a person in its own right, not merely as a symbol of a social issue.",
      "factualContext": "On the evening of 3 March 2021, Sarah Everard was walking home after visiting a friend in Clapham, South London.\nShe was approached by Wayne Couzens, who was then a serving Metropolitan Police officer.\nCouzens used his position as a police officer to falsely detain her. He handcuffed her under the pretext that she had breached COVID-19 restrictions and placed her in a hired vehicle.\nThe judicial record established that this was not a legitimate police stop. Couzens had planned the abduction and used the authority associated with his position to carry it out.\nHe abducted, raped, and murdered Sarah.\nHer remains were subsequently discovered in woodland in Kent.\nThe investigation and subsequent court proceedings exposed the extraordinary abuse of public authority involved in the crime.\nThe case shocked the United Kingdom and prompted widespread public discussion about women's safety, police accountability, institutional vetting, and the misuse of authority.\n\nJudicial Proceedings and Accountability:\nWayne Couzens pleaded guilty to the kidnapping, rape, and murder of Sarah Everard.\nOn 30 September 2021, Lord Justice Fulford sentenced him at the Central Criminal Court, commonly known as the Old Bailey.\nHe received a whole-life order, meaning that he must spend the remainder of his life in prison, subject only to the exceptional legal provisions applicable to such sentences.\nIn his sentencing remarks, the judge emphasised the seriousness of the abuse of police authority and the damage the crime had caused to public confidence.\nThe judgment recognised that members of the public must be able to trust police officers when they encounter them and submit to their authority.\nThe case therefore involved not only the murder of an individual but also a profound breach of the public trust attached to policing.",
      "editorialNotes": "Publication note: The judicial account is grounded in sentencing and appellate records. The Baroness Casey Review and Angiolini Inquiry are distinct investigations with different scopes. The Angiolini Part 2 First Report, published in December 2025, is included because it materially updates the public-safety discussion. The proposed UltimateHealth guide is a new educational initiative, not an existing government programme.",
      "verifiedFacts": [
          "33-year-old marketing executive living in Brixton, South London; grew up in York (Fulford School) and studied Human Geography at St Cuthbert's Society, Durham University (2005–2008).",
          "Abducted on the evening of 3 March 2021 while walking home from Clapham by serving Metropolitan Police officer Wayne Couzens under the false pretext of a COVID-19 police stop.",
          "On 30 September 2021, Lord Justice Fulford sentenced Couzens at the Old Bailey to a whole-life order for kidnapping, rape, and murder.",
          "Baroness Casey Review (appointed October 2021, final report published 21 March 2023) concluded the Metropolitan Police was institutionally racist, misogynistic, and homophobic.",
          "Independent Angiolini Inquiry published its Part 1 Report on 29 February 2024 (16 recommendations on police vetting and misconduct) and its Part 2 First Report on 2 December 2025 (13 recommendations on preventing sexually motivated crimes against women in public spaces)."
      ],
      "societalImpact": "Sarah Everard's murder prompted significant public scrutiny of the Metropolitan Police Service and the wider systems responsible for policing standards, misconduct, and women's safety.\nThree developments deserve particular attention.\n\nA. Baroness Casey Review — Standards and Culture of the Metropolitan Police\nFollowing the murder and other serious concerns about policing standards, the Metropolitan Police appointed Baroness Louise Casey in October 2021 to lead an independent review of the force's culture and standards of behaviour. The review began in February 2022, and its final report was published on 21 March 2023.\nIt examined leadership and organisational accountability, recruitment and vetting, police misconduct and disciplinary systems, internal workplace culture, the treatment of women and minority communities, and the Metropolitan Police's ability to maintain public trust.\nThe review concluded that the Metropolitan Police was institutionally racist, misogynistic, and homophobic. It also identified serious failures in the handling of complaints and misconduct.\nWhy it matters: Sarah's murder became a central catalyst for examining whether a police force was adequately identifying and addressing misconduct among the people entrusted with its authority.\n\nB. Angiolini Inquiry — Part 1 Report, 2024\nThe independent Angiolini Inquiry was established to investigate how Wayne Couzens was able to abduct, rape, and murder Sarah Everard while serving as a Metropolitan Police officer.\nPart 1 of the inquiry examined his police career, previous conduct, behaviour, and the institutional opportunities that had been missed. The report was published on 29 February 2024.\nIt identified serious warning signs and missed opportunities in the handling of Couzens' conduct and police service record, and made 16 recommendations intended to strengthen safeguards against the abuse of police authority.\nThe inquiry highlighted that the authority of a police officer must never become a means of intimidating, coercing, or exploiting members of the public.\n\nC. Angiolini Inquiry — Part 2 First Report, 2025\nOn 2 December 2025, the inquiry published its Part 2 First Report, examining the prevention of sexually motivated crimes against women in public spaces, making a further 13 recommendations.\nThe report highlighted the need for a more coordinated approach to prevention, including a stronger focus on perpetrators and the institutions responsible for identifying and disrupting their behaviour.\nIt also warned against placing the burden of safety primarily on women through advice to avoid certain streets, change travel routes, or limit their activities. Safer streets and better lighting matter, but they cannot substitute for effective action against those who commit or threaten violence.\nWhy it matters: This development moves the discussion beyond individual precautions towards a society-wide responsibility to prevent violence against women.",
      "actionableLesson": "Urban Safety Audits and Institutional Power Accountability\nSarah Everard's case highlights two connected responsibilities: designing public spaces and transport environments that support safety, and ensuring that institutions entrusted with public authority cannot operate without effective oversight.\n\nThe following measures are proposed for public authorities, police forces, transport operators, and urban planners:\n1. Accountable police recruitment and vetting:\n• Conduct thorough background checks before recruitment and review relevant misconduct and disciplinary information.\n• Establish clear procedures for reassessing officers when credible concerns emerge.\n• Ensure that vetting decisions are documented and independently reviewable, removing disqualified individuals following appropriate procedures.\n\n2. Verification of plainclothes police encounters:\n• Provide clear ways for members of the public to verify an officer's identity and confirm the legitimacy of an encounter through official police channels.\n• Improve public awareness of police identification and verification processes.\n\n3. Accessible misconduct reporting:\n• Provide confidential and accessible channels for reporting inappropriate behaviour by police personnel.\n• Protect complainants and witnesses from intimidation or retaliation, and publish meaningful information about disciplinary outcomes.\n\n4. Safer public infrastructure:\n• Audit pedestrian routes, parks, transport connections, and poorly lit streets.\n• Improve lighting, visibility, and accessible emergency communication systems.\n\n5. Institutional transparency:\n• Publish clear information about police accountability processes, maintain independent oversight, and track implementation of public inquiry recommendations using measurable indicators.\n\n6. Perpetrator-focused prevention:\n• Improve the identification and investigation of stalking, harassment, sexual offences, and threatening behaviour.\n• Use evidence-based interventions to disrupt patterns of offending rather than placing the burden of prevention primarily on potential victims.\n\nThese are proposed measures and areas for institutional improvement. They should not be presented as a complete description of current UK law or as reforms already implemented by every police force.",
      "memorialPublication": {
          "title": "Urban Safety Audits & Institutional Power Accountability Guide",
          "focus": "Civic Infrastructure · Women's Safety · Public Trust in Policing · Institutional Accountability",
          "initiativeStatus": "Proposed Initiative",
          "deliverable": "Purpose:\nDevelop an open-source civic education and safety-audit resource that helps communities, academic institutions, local authorities, and public-service organisations evaluate the safety of public spaces and understand how to report institutional misconduct.\n\nProposed toolkit components:\nA. Neighbourhood and Pedestrian Safety Audit: Practical checklist for evaluating street lighting and visibility, pedestrian routes and transport connections, public access to emergency assistance, isolated areas, and accessibility of public safety information.\nB. Public Authority Verification Guide: Educational resources explaining how police identification works, how to seek official confirmation of a police encounter, how to document and report suspected abuse of authority, and where to seek independent advice.\nC. Institutional Accountability Framework: Structured guide for examining recruitment and vetting processes, misconduct reporting systems, whistleblower protection, independent oversight, and implementation of public inquiry recommendations.\nD. Community Safety and Bystander Education: Educational material on recognising threatening behaviour, reporting dangerous situations, supporting people experiencing harassment, and safe bystander intervention.\nE. Evidence-Based Urban Safety Reporting: Framework for recording infrastructure gaps, lighting and accessibility issues, institutional reporting barriers, and corrective actions.\n\nThe UltimateHealth Perspective:\nSarah Everard's story raises a difficult but essential question: What happens when the person entrusted with protecting the public becomes the person who harms it?\nHer murder exposed the consequences of an individual abusing institutional authority. The subsequent Baroness Casey Review and Angiolini Inquiry brought wider organisational failures and prevention responsibilities into public scrutiny. The 2025 Angiolini report further reinforced that women's safety cannot depend primarily on individual precautions.\nSarah was a daughter, friend, university graduate, and marketing professional with a life and future of her own. Remembering Sarah Everard means defending the right of every person to move freely, questioning the misuse of public authority, and demanding institutions that earn the trust placed in them."
      },
      "references": [
          {
              "title": "Judiciary of England and Wales — R v Wayne Couzens: Sentencing Remarks, 30 September 2021",
              "url": "https://www.judiciary.uk/wp-content/uploads/2021/09/Wayne-Couzens-Sentencing-Remarks.pdf",
              "publisher": "Judiciary of England and Wales",
              "isPrimary": true
          },
          {
              "title": "Court of Appeal (Criminal Division) — R v Monaghan and Others, 2022 EWCA Crim 1063",
              "url": "https://www.judiciary.uk/wp-content/uploads/2022/10/R-v-Monaghan-and-others-2022-EWCA-Crim-1063.pdf",
              "publisher": "Judiciary of England and Wales",
              "isPrimary": true
          },
          {
              "title": "Metropolitan Police — The Baroness Casey Review (Official Collection)",
              "url": "https://www.met.police.uk/police-forces/metropolitan-police/areas/about-us/about-the-met/bcr/baroness-casey-review/",
              "publisher": "Metropolitan Police",
              "isPrimary": true
          },
          {
              "title": "Baroness Casey Review — Final Report into the Standards of Behaviour and Internal Culture of the Metropolitan Police Service, March 2023",
              "url": "https://www.met.police.uk/SysSiteAssets/media/downloads/met/about-us/baroness-casey-review/update-march-2023/baroness-casey-review-march-2023a.pdf",
              "publisher": "Baroness Casey Review / Metropolitan Police",
              "isPrimary": true
          },
          {
              "title": "UK Home Office — The Angiolini Inquiry Part 1 Report, 29 February 2024",
              "url": "https://www.gov.uk/government/publications/angiolini-inquiry-part-1-report",
              "publisher": "UK Home Office",
              "isPrimary": true
          },
          {
              "title": "The Angiolini Inquiry — Part 1 Report and Recommendations",
              "url": "https://www.angiolini.independent-inquiry.uk/reports/",
              "publisher": "The Angiolini Inquiry",
              "isPrimary": true
          },
          {
              "title": "UK Home Office — The Angiolini Inquiry Part 2 First Report, 2 December 2025",
              "url": "https://www.gov.uk/government/publications/angiolini-inquiry-part-2-first-report",
              "publisher": "UK Home Office",
              "isPrimary": true
          },
          {
              "title": "The Angiolini Inquiry — Part 2 First Report: Prevention of Sexually Motivated Crimes Against Women in Public (December 2025)",
              "url": "https://www.angiolini.independent-inquiry.uk/reports-2/the-angiolini-inquiry-part-2-first-report-prevention-of-sexually-motivated-crimes-against-women-in-public/",
              "publisher": "The Angiolini Inquiry",
              "isPrimary": true
          },
          {
              "title": "College of Policing — Sarah Everard murder sentencing: statement from the Chief Executive, 30 September 2021",
              "url": "https://www.college.police.uk/article/sarah-everard-murder-verdict-statement",
              "publisher": "College of Policing"
          },
          {
              "title": "London Assembly — Baroness Casey Review: One Year On",
              "url": "https://www.london.gov.uk/who-we-are/what-london-assembly-does/london-assembly-press-releases/baroness-casey-review-one-year",
              "publisher": "London Assembly"
          },
          {
              "title": "HMICFRS — Inspection of the Metropolitan Police Service's policing of the Sarah Everard vigil at Clapham Common",
              "url": "https://assets-hmicfrs.justiceinspectorates.gov.uk/uploads/inspection-of-mps-policing-vigil-commemoration-sarah-everard-clapham-common.pdf",
              "publisher": "HMICFRS",
              "isPrimary": true
          },
          {
              "title": "ITV News — Timeline of Sarah Everard's disappearance in South London, March 2021",
              "url": "https://www.itv.com/news/london/2021-03-10/timeline-of-sarah-everards-disappearance-in-south-london",
              "publisher": "ITV News"
          },
          {
              "title": "The Evening Standard — Who was Sarah Everard?",
              "url": "https://app.standard.co.uk/news/london/who-missing-sarah-everard-what-do-we-know-b923327.html",
              "publisher": "The Evening Standard"
          }
      ],
      "translations": {
          "hi": {
              "name": "सारा एवरार्ड",
              "roleAndField": "मार्केटिंग एग्जीक्यूटिव · लंदन, इंग्लैंड",
              "categoryLabel": "सार्वजनिक विश्वास एवं महिला सड़क सुरक्षा",
              "coreMessage": "सार्वजनिक सुरक्षा को रोजमर्रा के नागरिक बुनियादी ढांचे में निर्मित किया जाना चाहिए, और नागरिकों की रक्षा का दायित्व संभालने वाले संस्थानों को अपने द्वारा प्रयोग किए जाने वाले अधिकार के लिए जवाबदेह रहना चाहिए। महिलाओं को बिना किसी डर के सार्वजनिक स्थानों पर चलने में सक्षम होना चाहिए, और किसी भी व्यक्ति को हिंसा करने के लिए संस्थागत शक्ति का दुरुपयोग करने में सक्षम नहीं होना चाहिए।",
              "whoWasThisPerson": "सारा एवरार्ड 33 वर्षीय मार्केटिंग एग्जीक्यूटिव थीं जो ब्रिक्सटन, साउथ लंदन में रहती थीं।\nवे यॉर्क में पली-बढ़ीं और 2005 से 2008 तक डरहम विश्वविद्यालय के सेंट कथबर्ट सोसाइटी में मानव भूगोल (Human Geography) का अध्ययन करने से पहले फुलफोर्ड स्कूल में पढ़ीं।\nस्नातक होने के बाद, वे लंदन चली गईं और मार्केटिंग में अपना पेशेवर करियर बनाया।\nमित्रों और परिवार ने उन्हें बुद्धिमान, दयालु, विचारशील और स्वतंत्र के रूप में याद किया। सारा लंदन में एक सामान्य स्वतंत्र जीवन जी रही थीं। उनकी कहानी इसलिए महत्वपूर्ण है क्योंकि वे अपने स्वयं के संबंधों, महत्वाकांक्षाओं और भविष्य वाली एक व्यक्ति थीं।",
              "contributions": "सारा एक मार्केटिंग पेशेवर के रूप में काम करती थीं और डरहम विश्वविद्यालय से स्नातक थीं।\nकिसी सार्वजनिक हस्ती के विपरीत, उनका जीवन मुख्य रूप से एक निजी व्यक्ति का था जो अपना करियर बना रही थीं। उन्हें विशिष्ट बड़े ब्रांडिंग अभियानों या औपचारिक नागरिक नेतृत्व गतिविधियों का श्रेय देने के लिए पर्याप्त विश्वसनीय साक्ष्य नहीं हैं।\nफिर भी उनकी कहानी निम्नलिखित विषयों पर व्यापक सार्वजनिक चर्चा में महत्वपूर्ण बन गई:\n• शहरों में स्वतंत्र रूप से आने-जाने की महिलाओं की स्वतंत्रता।\n• घर लौटते समय सुरक्षित महसूस करने का अधिकार।\n• पुलिस अधिकारियों और अन्य प्राधिकारियों में जनता का विश्वास।\n• जब सार्वजनिक शक्ति से लैस व्यक्ति उस अधिकार का दुरुपयोग करते हैं तो संस्थागत जिम्मेदारी।\n\nसंपादकीय सिद्धांत: किसी व्यक्ति का मूल्य किसी असाधारण सार्वजनिक उपलब्धि होने पर निर्भर नहीं करता है। सारा का जीवन केवल एक सामाजिक मुद्दे के प्रतीक के रूप में नहीं, बल्कि अपने आप में एक व्यक्ति के रूप में सम्मान का पात्र है।",
              "factualContext": "3 मार्च 2021 की शाम को, सारा एवरार्ड क्लैपहम, साउथ लंदन में एक मित्र से मिलने के बाद पैदल घर लौट रही थीं।\nतत्कालीन कार्यरत मेट्रोपॉलिटन पुलिस अधिकारी वेन कूज़ेंस (Wayne Couzens) ने उन्हें रोका।\nकूज़ेंस ने उन्हें गलत तरीके से हिरासत में लेने के लिए पुलिस अधिकारी के रूप में अपने पद का दुरुपयोग किया। उसने इस बहाने से उन्हें हथकड़ी लगाई कि उन्होंने कोविड-19 प्रतिबंधों का उल्लंघन किया है और उन्हें किराए के वाहन में बैठा लिया।\nन्यायिक रिकॉर्ड ने स्थापित किया कि यह कोई वैध पुलिस स्टॉप नहीं था। कूज़ेंस ने उनका अपहरण, बलात्कार और हत्या की। बाद में उनके अवशेष केंट के जंगल में मिले।\n\nन्यायिक कार्यवाही और जवाबदेही:\nवेन कूज़ेंस ने सारा एवरार्ड के अपहरण, बलात्कार और हत्या का अपराध स्वीकार किया।\n30 सितंबर 2021 को, लॉर्ड जस्टिस फुलफोर्ड ने ओल्ड बेली (Central Criminal Court) में उसे 'होल-लाइफ ऑर्डर' (आजीवन कारावास बिना पैरोल) की सजा सुनाई और पुलिस अधिकार के दुरुपयोग तथा सार्वजनिक विश्वास को पहुंची क्षति को रेखांकित किया।",
              "editorialNotes": "प्रकाशन नोट: न्यायिक विवरण सजा और अपीलीय रिकॉर्ड पर आधारित है। बैरोनेस केसी रिव्यू और एंजियोलिनी इंक्वायरी अलग-अलग जांच हैं। दिसंबर 2025 में प्रकाशित एंजियोलिनी पार्ट 2 की पहली रिपोर्ट को इसलिए शामिल किया गया है क्योंकि यह सार्वजनिक-सुरक्षा चर्चा को अद्यतन करती है। प्रस्तावित UltimateHealth मार्गदर्शिका एक नई शैक्षिक पहल है।",
              "verifiedFacts": [
                  "ब्रिक्सटन, साउथ लंदन में रहने वाली 33 वर्षीय मार्केटिंग एग्जीक्यूटिव; यॉर्क में पली-बढ़ीं और डरहम विश्वविद्यालय (2005–2008) से मानव भूगोल में स्नातक।",
                  "3 मार्च 2021 की शाम को क्लैपहम से घर लौटते समय कार्यरत मेट्रोपॉलिटन पुलिस अधिकारी वेन कूज़ेंस द्वारा कोविड-19 नियम उल्लंघन के झूठे बहाने से अपहरण और हत्या।",
                  "30 सितंबर 2021 को ओल्ड बेली में लॉर्ड जस्टिस फुलफोर्ड द्वारा कूज़ेंस को 'होल-लाइफ ऑर्डर' की सजा सुनाई गई।",
                  "बैरोनेस केसी रिव्यू (अंतिम रिपोर्ट 21 मार्च 2023) ने पाया कि मेट्रोपॉलिटन पुलिस संस्थागत रूप से नस्लवादी, महिला-विरोधी (misogynistic) और होमोफोबिक थी।",
                  "स्वतंत्र एंजियोलिनी इंक्वायरी ने 29 फरवरी 2024 को पार्ट 1 रिपोर्ट (16 सिफारिशें) और 2 दिसंबर 2025 को पार्ट 2 की पहली रिपोर्ट (सार्वजनिक स्थानों पर महिलाओं के खिलाफ यौन अपराधों की रोकथाम पर 13 सिफारिशें) प्रकाशित की।"
              ],
              "societalImpact": "सारा एवरार्ड की हत्या ने मेट्रोपॉलिटन पुलिस सर्विस और पुलिसिंग मानकों की गहन सार्वजनिक जांच को प्रेरित किया:\n\nA. बैरोनेस केसी रिव्यू (मार्च 2023):\nअक्टूबर 2021 में नियुक्त बैरोनेस लुईस केसी की स्वतंत्र समीक्षा (21 मार्च 2023 को प्रकाशित) ने निष्कर्ष निकाला कि मेट्रोपॉलिटन पुलिस संस्थागत रूप से नस्लवादी, महिला-विरोधी और होमोफोबिक थी तथा कदाचार की शिकायतों से निपटने में गंभीर विफलताएं थीं।\n\nB. एंजियोलिनी इंक्वायरी — पार्ट 1 रिपोर्ट (29 फरवरी 2024):\nइस स्वतंत्र जांच ने कूज़ेंस के पुलिस करियर में अनदेखे किए गए गंभीर चेतावनी संकेतों की पहचान की और पुलिस अधिकार के दुरुपयोग को रोकने के लिए 16 सिफारिशें कीं।\n\nC. एंजियोलिनी इंक्वायरी — पार्ट 2 पहली रिपोर्ट (2 दिसंबर 2025):\nसार्वजनिक स्थानों पर महिलाओं के खिलाफ यौन प्रेरित अपराधों की रोकथाम की जांच करते हुए 13 और सिफारिशें कीं। इसने चेतावनी दी कि सुरक्षा का बोझ मुख्य रूप से महिलाओं पर (रास्ते बदलने या गतिविधियों को सीमित करने की सलाह देकर) नहीं डाला जाना चाहिए, बल्कि अपराधियों की पहचान और रोकथाम पर ध्यान केंद्रित किया जाना चाहिए।",
              "actionableLesson": "शहरी सुरक्षा ऑडिट और संस्थागत शक्ति जवाबदेही:\n1. जवाबदेह पुलिस भर्ती और पृष्ठभूमि सत्यापन (Vetting)।\n2. सादे कपड़ों में पुलिस मुठभेड़ों के सत्यापन के लिए स्पष्ट और आधिकारिक चैनल।\n3. पुलिस कर्मियों द्वारा अनुचित व्यवहार की गोपनीय और सुलभ रिपोर्टिंग।\n4. सुरक्षित सार्वजनिक बुनियादी ढांचा (पैदल मार्ग, पार्क और स्ट्रीट लाइटिंग का ऑडिट)।\n5. संस्थागत पारदर्शिता और स्वतंत्र निगरानी।\n6. अपराधी-केंद्रित रोकथाम (पीड़ितों पर जिम्मेदारी डालने के बजाय अपराध के पैटर्न को बाधित करना)।",
              "memorialPublication": {
                  "title": "शहरी सुरक्षा ऑडिट और संस्थागत शक्ति जवाबदेही मार्गदर्शिका",
                  "focus": "नागरिक बुनियादी ढांचा · महिला सुरक्षा · पुलिसिंग में सार्वजनिक विश्वास · संस्थागत जवाबदेही",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "उद्देश्य: समुदायों, शैक्षणिक संस्थानों और स्थानीय प्राधिकरणों के लिए सार्वजनिक स्थानों की सुरक्षा का मूल्यांकन करने और संस्थागत कदाचार की रिपोर्ट करने के तरीके को समझने हेतु एक ओपन-सोर्स संसाधन विकसित करना।\n\nUltimateHealth दृष्टिकोण:\nसारा एवरार्ड को याद करने का अर्थ है प्रत्येक व्यक्ति के स्वतंत्र रूप से चलने के अधिकार की रक्षा करना, सार्वजनिक अधिकार के दुरुपयोग पर सवाल उठाना और ऐसे संस्थानों की मांग करना जो उन पर रखे गए विश्वास के योग्य हों।"
              }
          },
          "bn": {
              "name": "সারা এভারার্ড",
              "roleAndField": "মার্কেটিং এক্সিকিউটিভ · লন্ডন, ইংল্যান্ড",
              "categoryLabel": "জনআস্থা ও নারীদের পথচলার নিরাপত্তা",
              "coreMessage": "জননিরাপত্তা প্রতিদিনের নাগরিক অবকাঠামোর অংশ হতে হবে এবং নাগরিকদের সুরক্ষায় নিয়োজিত প্রতিষ্ঠানগুলোকে তাদের ক্ষমতার ব্যবহারের জন্য জবাবদিহি করতে হবে। নারীদের নির্ভয়ে জনসমাগমস্থলে চলাফেরা করার অধিকার থাকতে হবে এবং কোনো ব্যক্তিই যেন প্রাতিষ্ঠানিক ক্ষমতার অপব্যবহার করে সহিংসতা চালাতে না পারে।",
              "whoWasThisPerson": "সারা এভারার্ড ছিলেন দক্ষিণ লন্ডনের ব্রিক্সটনে বসবাসকারী ৩৩ বছর বয়সী একজন মার্কেটিং এক্সিকিউটিভ। তিনি ইয়র্কে বেড়ে ওঠেন এবং ২০০৫ থেকে ২০০৮ সাল পর্যন্ত ডারহাম ইউনিভার্সিটির সেন্ট কাথবার্টস সোসাইটিতে হিউম্যান জিওগ্রাফি নিয়ে পড়াশোনা করেন।\nস্নাতক শেষ করে তিনি লন্ডনে চলে আসেন এবং মার্কেটিংয়ে পেশাগত জীবন গড়ে তোলেন।",
              "contributions": "সারা একজন মার্কেটিং পেশাজীবী এবং ডারহাম ইউনিভার্সিটির স্নাতক ছিলেন। কোনো সুনির্দিষ্ট বড় ব্র্যান্ডিং ক্যাম্পেইনের অপ্রমাণিত দাবি না করেও তাঁর জীবন একজন স্বাধীনচেতা মানুষ হিসেবে স্বীকৃতি পাওয়ার যোগ্য।\nতাঁর ঘটনা শহরে নারীদের স্বাধীন চলাচল, পুলিশের প্রতি জনআস্থা এবং প্রাতিষ্ঠানিক ক্ষমতার অপব্যবহার রোধের আলোচনায় গভীর প্রভাব ফেলে।",
              "factualContext": "৩ মার্চ ২০২১ সন্ধ্যায় দক্ষিণ লন্ডনের ক্ল্যাপহামে এক বন্ধুর বাসা থেকে পায়ে হেঁটে বাড়ি ফেরার পথে কর্মরত মেট্রোপলিটন পুলিশ অফিসার ওয়েন কুজেন্স (Wayne Couzens) কোভিড-১৯ বিধি ভঙ্গের মিথ্যা অজুহাতে তাঁকে হাতকড়া পরিয়ে অপহরণ, ধর্ষণ ও হত্যা করে।\n\nবিচারিক প্রক্রিয়া:\n৩০ সেপ্টেম্বর ২০২১ তারিখে ওল্ড বেইলি আদালতে লর্ড জাস্টিস ফুলফোর্ড কুজেন্সকে 'হোল-লাইফ অর্ডার' (আমৃত্যু কারাদণ্ড) প্রদান করেন।",
              "editorialNotes": "প্রকাশনা নোট: বিচারিক বিবরণটি আদালতের রায়ের নথির ওপর ভিত্তি করে রচিত। ব্যারোনেস কেসি রিভিউ (২০২৩) এবং অ্যাঞ্জিওলিনি ইনকোয়ারি পার্ট ১ (২০২৪) ও পার্ট ২ প্রথম প্রতিবেদন (ডিসেম্বর ২০২৫) পৃথক তদন্ত হিসেবে অন্তর্ভুক্ত করা হয়েছে।",
              "verifiedFacts": [
                  "দক্ষিণ লন্ডনের ব্রিক্সটনে বসবাসকারী ৩৩ বছর বয়সী মার্কেটিং এক্সিকিউটিভ; ডারহাম ইউনিভার্সিটির (২০০৫–২০০৮) স্নাতক।",
                  "৩ মার্চ ২০২১ সন্ধ্যায় ক্ল্যাপহাম থেকে ফেরার পথে কর্মরত মেট পুলিশ অফিসার ওয়েন কুজেন্স কর্তৃক মিথ্যা পুলিশি তল্লাশির অজুহাতে অপহৃত ও নিহত।",
                  "৩০ সেপ্টেম্বর ২০২১-এ ওল্ড বেইলিতে লর্ড জাস্টিস ফুলফোর্ড কুজেন্সকে আমৃত্যু কারাদণ্ড (whole-life order) প্রদান করেন।",
                  "ব্যারোনেস কেসি রিভিউ (২১ মার্চ ২০২৩) মেট্রোপলিটন পুলিশকে প্রাতিষ্ঠানিকভাবে বর্ণবাদী, নারীবিদ্বেষী ও সমকামীভীতিপূর্ণ বলে চিহ্নিত করে।",
                  "অ্যাঞ্জিওলিনি ইনকোয়ারি ২৯ ফেব্রুয়ারি ২০২৪-এ পার্ট ১ রিপোর্ট (১৬টি সুপারিশ) এবং ২ ডিসেম্বর ২০২৫-এ পার্ট ২ প্রথম রিপোর্ট (১৩টি সুপারিশ) প্রকাশ করে।"
              ],
              "societalImpact": "A. ব্যারোনেস কেসি রিভিউ (মার্চ ২০২৩): মেট্রোপলিটন পুলিশের অভ্যন্তরীণ সংস্কৃতি ও আচরণগত মানের ওপর স্বাধীন তদন্ত।\nB. অ্যাঞ্জিওলিনি ইনকোয়ারি — পার্ট ১ রিপোর্ট (ফেব্রুয়ারি ২০২৪): কুজেন্সের পুলিশ কর্মজীবনে উপেক্ষিত সতর্কবার্তাগুলো চিহ্নিত করে ১৬টি সুপারিশ পেশ করে।\nC. অ্যাঞ্জিওলিনি ইনকোয়ারি — পার্ট ২ প্রথম রিপোর্ট (ডিসেম্বর ২০২৫): জনসমাগমস্থলে নারীদের বিরুদ্ধে যৌন উদ্দেশ্যপ্রণোদিত অপরাধ প্রতিরোধে ১৩টি সুপারিশ করে এবং নিরাপত্তার দায় কেবল নারীদের ওপর চাপিয়ে দেওয়ার বিরুদ্ধে সতর্ক করে।",
              "actionableLesson": "নগর নিরাপত্তা অডিট ও প্রাতিষ্ঠানিক ক্ষমতার জবাবদিহিতা:\n১. পুলিশের নিয়োগ ও ব্যাকগ্রাউন্ড যাচাই (Vetting) কঠোর করা\n২. সাদা পোশাকের পুলিশের পরিচয় যাচাইয়ের সুস্পষ্ট ব্যবস্থা\n৩. অসদাচরণের গোপনীয় ও সহজলভ্য অভিযোগ ব্যবস্থা\n৪. নিরাপদ নাগরিক অবকাঠামো ও পর্যাপ্ত স্ট্রিট লাইটিং\n৫. প্রাতিষ্ঠানিক স্বচ্ছতা ও স্বাধীন নজরদারি\n৬. অপরাধী-কেন্দ্রিক প্রতিরোধ ব্যবস্থা।",
              "memorialPublication": {
                  "title": "নগর নিরাপত্তা অডিট ও প্রাতিষ্ঠানিক ক্ষমতার জবাবদিহিতা নির্দেশিকা",
                  "focus": "নাগরিক অবকাঠামো · নারীর নিরাপত্তা · পুলিশিংয়ে জনআস্থা · প্রাতিষ্ঠানিক জবাবদিহিতা",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "সারা এভারার্ডকে স্মরণ করার অর্থ হলো প্রতিটি মানুষের নির্ভয়ে চলাফেরার অধিকার রক্ষা করা, সরকারি ক্ষমতার অপব্যবহারের বিরুদ্ধে প্রশ্ন তোলা এবং জনআস্থার যোগ্য প্রতিষ্ঠান দাবি করা।"
              }
          },
          "ta": {
              "name": "சாரா எவரார்ட்",
              "roleAndField": "மார்க்கெட்டிங் அதிகாரி · லண்டன், இங்கிலாந்து",
              "categoryLabel": "பொது நம்பிக்கை மற்றும் பெண்களின் தெருப் பாதுகாப்பு",
              "coreMessage": "பொதுப் பாதுகாப்பு என்பது அன்றாட குடிமை உள்கட்டமைப்பில் இணைக்கப்பட வேண்டும், மேலும் குடிமக்களைப் பாதுகாக்கும் நிறுவனங்கள் தங்கள் அதிகாரத்திற்குப் பொறுப்புக்கூற வேண்டும்.",
              "whoWasThisPerson": "சாரா எவரார்ட் தெற்கு லண்டனின் பிரிக்ஸ்டனில் வசித்து வந்த 33 வயது மார்க்கெட்டிங் அதிகாரி. யார்க்கில் வளர்ந்த அவர், 2005 முதல் 2008 வரை டர்ஹாம் பல்கலைக்கழகத்தில் மனித புவியியல் பயின்றார்.",
              "contributions": "மார்க்கெட்டிங் துறையில் பணியாற்றிய இளம் தொழில்முறை வல்லுநரான அவரது வாழ்க்கை, நகரங்களில் பெண்களின் சுதந்திரமான நடமாட்டம் மற்றும் காவல்துறை அதிகாரத்தின் பொறுப்புக்கூறல் குறித்த முக்கிய விவாதத்தைத் தூண்டியது.",
              "factualContext": "மார்ச் 3, 2021 மாலை, தெற்கு லண்டனின் கிளாபமில் இருந்து வீடு திரும்பிக்கொண்டிருந்த சாராவை, பணியில் இருந்த மெட்ரோபாலிட்டன் காவல்துறை அதிகாரி வெய்ன் கௌசன்ஸ் (Wayne Couzens) கோவிட்-19 விதிகளை மீறியதாகப் பொய்க் கூறி கடத்திச் சென்று கொலை செய்தார்.\n\nநீதித்துறை நடவடிக்கைகள்:\nசெப்டம்பர் 30, 2021 அன்று ஓல்ட் பெய்லி நீதிமன்றத்தில் நீதிபதி ஃபுல்ஃபோர்ட் கௌசன்ஸுக்கு ஆயுள் முழுவதும் சிறையில் இருக்கும் தண்டனையை (whole-life order) விதித்தார்.",
              "editorialNotes": "வெளியீட்டுக் குறிப்பு: பரோனஸ் கேசி ஆய்வு (2023) மற்றும் அஞ்சியோலினி விசாரணை அறிக்கை (பாகம் 1 - 2024 மற்றும் பாகம் 2 முதல் அறிக்கை - டிசம்பர் 2025) ஆகியவை அதிகாரப்பூர்வ ஆவணங்களின் அடிப்படையில் சேர்க்கப்பட்டுள்ளன.",
              "verifiedFacts": [
                  "தெற்கு லண்டனின் பிரிக்ஸ்டனில் வசித்த 33 வயது மார்க்கெட்டிங் அதிகாரி; டர்ஹாம் பல்கலைக்கழக (2005–2008) பட்டதாரி.",
                  "மார்ச் 3, 2021 அன்று காவல்துறை அதிகாரி வெய்ன் கௌசன்ஸால் பொய்யான காரணங்களுக்காகக் கைது செய்யப்பட்டுக் கடத்திக் கொல்லப்பட்டார்.",
                  "செப்டம்பர் 30, 2021 அன்று கௌசன்ஸுக்கு முழு ஆயுள் தண்டனை (whole-life order) விதிக்கப்பட்டது.",
                  "பரோனஸ் கேசி அறிக்கை (மார்ச் 2023) மெட்ரோபாலிட்டன் காவல்துறையின் நிறுவனக் குறைபாடுகளை வெளிப்படுத்தியது.",
                  "அஞ்சியோலினி விசாரணை பாகம் 1 அறிக்கை (பிப்ரவரி 2024, 16 பரிந்துரைகள்) மற்றும் பாகம் 2 முதல் அறிக்கை (டிசம்பர் 2025, 13 பரிந்துரைகள்) வெளியிடப்பட்டன."
              ],
              "societalImpact": "A. பரோனஸ் கேசி ஆய்வு (மார்ச் 2023): மெட்ரோபாலிட்டன் காவல்துறையின் கலாச்சாரம் மற்றும் நடத்தைத் தரங்களை ஆய்வு செய்தது.\nB. அஞ்சியோலினி விசாரணை பாகம் 1 (பிப்ரவரி 2024): காவல்துறை ஆட்சேர்ப்பு மற்றும் நடத்தை கண்காணிப்பு குறித்து 16 பரிந்துரைகளை வழங்கியது.\nC. அஞ்சியோலினி விசாரணை பாகம் 2 முதல் அறிக்கை (டிசம்பர் 2025): பொது இடங்களில் பெண்களுக்கு எதிரான பாலியல் குற்றங்களைத் தடுக்க 13 பரிந்துரைகளை வழங்கியது.",
              "actionableLesson": "நகர்ப்புறப் பாதுகாப்பு மற்றும் நிறுவனப் பொறுப்புக்கூறல்:\n1. கடுமையான காவல்துறை ஆட்சேர்ப்பு மற்றும் பின்னணிச் சரிபார்ப்பு\n2. சாதாரண உடையில் இருக்கும் காவல்துறையினரைச் சரிபார்க்கும் முறை\n3. அதிகார துஷ்பிரயோகப் புகார் முறை\n4. பாதுகாப்பான பொது உள்கட்டமைப்பு மற்றும் தெரு விளக்குகள்\n5. நிறுவன வெளிப்படைத்தன்மை\n6. குற்றவாளிகளை மையமாகக் கொண்ட தடுப்பு நடவடிக்கைகள்.",
              "memorialPublication": {
                  "title": "நகர்ப்புறப் பாதுகாப்புத் தணிக்கை மற்றும் நிறுவனப் பொறுப்புக்கூறல் வழிகாட்டி",
                  "focus": "குடிமை உள்கட்டமைப்பு · பெண்களின் பாதுகாப்பு · காவல்துறை மீதான பொது நம்பிக்கை",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "சாரா எவரார்டை நினைவுகூர்வது என்பது ஒவ்வொருவரின் சுதந்திரமான நடமாடும் உரிமையைப் பாதுகாப்பதும், பொது அதிகாரத்தின் தவறான பயன்பாட்டைத் தடுப்பதும் ஆகும்."
              }
          },
          "or": {
              "name": "ସାରା ଏଭରାର୍ଡ",
              "roleAndField": "ମାର୍କେଟିଂ ଏକ୍‌ଜିକ୍ୟୁଟିଭ୍ · ଲଣ୍ଡନ, ଇଂଲଣ୍ଡ",
              "categoryLabel": "ଜନବିଶ୍ୱାସ ଓ ମହିଳାଙ୍କ ସଡ଼କ ସୁରକ୍ଷା",
              "coreMessage": "ଜନସୁରକ୍ଷା ଦୈନନ୍ଦିନ ନାଗରିକ ଭିତ୍ତିଭୂମିର ଅଂଶ ହେବା ଉଚିତ ଏବଂ ନାଗରିକଙ୍କ ସୁରକ୍ଷା ଦାୟିତ୍ୱରେ ଥିବା ଅନୁଷ୍ଠାନଗୁଡ଼ିକ ସେମାନଙ୍କ କ୍ଷମତାର ବ୍ୟବହାର ପାଇଁ ଉତ୍ତରଦାୟୀ ରହିବା ଆବଶ୍ୟକ।",
              "whoWasThisPerson": "ସାରା ଏଭରାର୍ଡ ଦକ୍ଷିଣ ଲଣ୍ଡନର ବ୍ରିକ୍ସଟନରେ ରହୁଥିବା ଜଣେ ୩୩ ବର୍ଷୀୟା ମାର୍କେଟିଂ ଏକ୍‌ଜିକ୍ୟୁଟିଭ୍ ଥିଲେ। ସେ ୟର୍କରେ ବଢ଼ିଥିଲେ ଏବଂ ୨୦୦୫ରୁ ୨୦୦୮ ପର୍ଯ୍ୟନ୍ତ ଡରହାম ୟୁନିଭର୍ସିଟିରେ ମାନବ ଭୂଗୋଳ অধ্যয়ন କରିଥିଲେ।",
              "contributions": "ଜଣେ ମାର୍କେଟିଂ ପେଶାଦାର ଭାବେ ତାଙ୍କର ସ୍ୱାଧୀନ ଜୀବନ ଏବଂ ତାଙ୍କର କାହାଣୀ ସହରରେ ମହିଳାଙ୍କ ସୁରକ୍ଷিত ଯାତାୟାତ ଓ ପୋଲିସ କ୍ଷମତାର ଉତ୍ତରଦାୟିତ୍ୱ ଉପରେ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଆଲୋଚନା ସୃଷ୍ଟି କରିଥିଲା।",
              "factualContext": "୩ ମାର୍ଚ୍ଚ ୨୦୨୧ ସନ୍ଧ୍ୟାରେ ଦକ୍ଷିଣ ଲଣ୍ଡନର କ୍ଲାপହାମରୁ ଚାଲି ଚାଲି ଘରକୁ ଫେରୁଥିବା ସମୟରେ କାର୍ଯ୍ୟରତ ମେଟ୍ରୋପলিଟାନ ପୋଲିସ ଅଫିସର ୱେନ୍ କୁଜେନ୍ସ (Wayne Couzens) କୋଭିଡ୍-୧୯ ନିୟମ ଉଲ୍ଲଂଘନର ମିଥ୍ୟା ବାହାନାରେ ତାଙ୍କୁ ଅପହରଣ ও ହତ୍ୟା କରିଥିଲା।\n\nନ୍ୟାୟିକ ପ୍ରକ୍ରିୟା:\n୩୦ ସେପ୍ଟେମ୍ବର ୨୦୨୧ରେ ଓଲ୍ଡ ବେলি କୋର୍ଟରେ ଲର୍ଡ ଜଷ୍ଟିସ୍ ଫୁଲଫୋର୍ଡ କୁଜେନ୍ସକୁ ଆମୃତ୍ୟୁ କାରାଦଣ୍ଡ (whole-life order) ଶୁଣାଇଥିଲେ।",
              "editorialNotes": "ପ୍ରକାଶନ ଟିପ୍ପଣୀ: ବారୋନେସ୍ କେସି ରିଭ୍ୟୁ (୨୦୨୩) ଏବଂ ଆଞ୍ଜିଓଲିନି ତଦନ୍ତ ପାର୍ଟ ୧ (୨୦୨୪) ଓ ପାର୍ଟ ୨ ପ୍ରଥମ ରିପୋର୍ଟ (ଡିସେମ୍ବର ୨୦୨୫) ସରକାରୀ ରେକର୍ଡ ଅନୁଯାୟୀ ଅନ୍ତର୍ଭୁକ୍ତ କରାଯାଇଛି।",
              "verifiedFacts": [
                  "ଦକ୍ଷିଣ ଲଣ୍ଡନର ବ୍ରିକ୍ସଟନରେ ରହୁଥିବା ୩୩ ବର୍ଷୀୟା ମାର୍କେଟିଂ ଏକ୍‌ଜିକ୍ୟୁଟିଭ୍; ଡରହାମ ୟୁନିଭର୍ସିଟି (୨୦୦୫–୨୦୦୮) ସ୍ନାତକ।",
                  "୩ ମାର୍ଚ୍ଚ ୨୦୨୧ରେ ପୋଲିସ ଅଫିସର ୱେନ୍ କୁଜେନ୍ସ ଦ୍ୱାରା ମିଥ୍ୟା ଗିରଫଦାରୀ ବାହାନାରେ ଅପହରଣ ଓ ହତ୍ୟା।",
                  "୩୦ ସେପ୍ଟେମ୍ବର ୨୦୨୧ରେ କୁଜେନ୍ସକୁ ଆମୃତ୍ୟୁ କାରାଦଣ୍ଡ (whole-life order) ପ୍ରଦାନ।",
                  "ବାରୋନେସ୍ କେସି ରିଭ୍ୟୁ (୨୧ ମାର୍ଚ୍ଚ ୨୦୨୩) ମେଟ୍ରୋପଲିଟାନ ପୋଲିସର ଆନୁଷ୍ଠାନିକ ତ୍ରୁଟି ପ୍ରକାଶ କରିଥିଲା।",
                  "ଆଞ୍ଜିଓଲିନି ତଦନ୍ତ ୨୯ ଫେବୃଆରୀ ୨୦୨୪ରେ ପାର୍ଟ ୧ ରିପୋର୍ଟ (୧୬ଟି ସୁପାରିଶ) ଏବଂ ୨ ଡିସେମ୍ବର ୨୦୨୫ରେ ପାର୍ଟ ୨ ପ୍ରଥମ ରିପୋର୍ଟ (୧୩ଟି ସୁପାରିଶ) ପ୍ରକାଶ କରିଥିଲା।"
              ],
              "societalImpact": "A. ବାରୋନେସ୍ କେସି ରିଭ୍ୟୁ (ମାର୍ଚ୍ଚ ୨୦୨୩): ମେଟ୍ରୋପଲିଟାନ ପୋଲିସର ଆଭ୍ୟନ୍ତରୀଣ ସଂସ୍କୃତି ଓ ମାନদଣ୍ଡର ସମୀକ୍ଷା।\nB. ଆଞ୍ଜିଓଲିନି ତଦନ୍ତ ପାର୍ଟ ୧ (ଫେବୃଆରୀ ୨୦୨୪): ପୋଲିସ ଯାଞ୍ଚ ଓ ଅসଦାଚରଣ ରୋକିବାକୁ ୧୬ଟି ସୁପାରିଶ।\nC. ଆଞ୍ଜିଓଲିନି ତଦନ୍ତ ପାର୍ଟ ୨ ପ୍ରଥମ ରିପୋର୍ଟ (ଡିସେମ୍ବର ୨୦୨୫): ସାର୍ବଜନୀନ ସ୍ଥାନରେ ମହିଳାଙ୍କ ବିରୁଦ୍ଧରେ ଅପରାଧ ରୋକିବାକୁ ୧୩ଟି ସୁପାରିଶ।",
              "actionableLesson": "ସହରୀ ସୁରକ୍ଷା ଅଡିଟ୍ ଓ ଆନୁଷ୍ଠାନିକ ଉତ୍ତରଦାୟିତ୍ୱ:\n୧. ପୋଲିସ ନିଯୁକ୍ତି ଓ ପୃଷ୍ଠଭୂମି ଯାଞ୍ଚ\n୨. ସାଦା ପୋଷାକধারୀ ପୋଲିସଙ୍କ ପରିଚୟ ଯାଞ୍ଚ ବ୍ୟବସ୍ଥା\n୩. ଅসଦାଚରଣ ରିପୋର୍ଟିଂ\n୪. ସୁରକ୍ଷିତ ସାର୍ବଜନୀନ ଭିତ୍ତିଭୂମି ଓ ଆଲୋକୀକରଣ\n୫. ଆନୁଷ୍ଠାନିକ ସ୍ୱଚ୍ଛତା\n୬. ଅପରାଧୀ-କେନ୍ଦ୍ରିକ ନିରୋଧ ବ୍ୟବସ୍ଥା।",
              "memorialPublication": {
                  "title": "ସହରୀ ସୁରକ୍ଷା ଅଡିଟ୍ ଓ ଆନୁଷ୍ଠାନିକ ଉତ୍ତରଦାୟିତ୍ୱ ମାର୍ଗଦର୍ଶିକା",
                  "focus": "ନାଗରିକ ଭିତ୍ତିଭୂମି · ମହିଳା ସୁରକ୍ଷା · ପୋଲିସିଂରେ ଜନବିଶ୍ୱାସ",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ସାରା ଏଭରାର୍ଡଙ୍କୁ ସ୍ମରଣ କରିବାର ଅର୍ଥ ହେଉଛି ପ୍ରତ୍ୟେକ ବ୍ୟକ୍ତିଙ୍କ ମୁକ୍ତ ଯାତାୟାତ ଅଧିକାରର ସୁରକ୍ଷା ଏବଂ ଆନୁଷ୍ଠାନିକ କ୍ଷମତାର ଦुरुपयोग ରୋକିବା।"
              }
          },
          "es": {
              "name": "Sarah Everard",
              "roleAndField": "Ejecutiva de Marketing · Londres, Inglaterra",
              "categoryLabel": "Confianza Pública y Seguridad Vial de las Mujeres",
              "coreMessage": "La seguridad pública debe integrarse en la infraestructura cívica cotidiana, y las instituciones encargadas de proteger a los ciudadanos deben rendir cuentas por la autoridad que ejercen. Las mujeres deben poder caminar por los espacios públicos sin miedo, y ningún individuo debe poder explotar el poder institucional para cometer actos de violencia.",
              "whoWasThisPerson": "Sarah Everard era una ejecutiva de marketing de 33 años que vivía en Brixton, al sur de Londres.\nCreció en York y asistió a la Fulford School antes de estudiar Geografía Humana en la St Cuthbert's Society de la Universidad de Durham entre 2005 y 2008.\nDespués de graduarse, se mudó a Londres y desarrolló su carrera profesional en marketing. Amigos y familiares la recordaban como inteligente, amable, reflexiva e independiente.\nSu historia es importante no porque su vida deba reducirse a las circunstancias de su muerte, sino porque era una persona con sus propias relaciones, ambiciones y futuro.",
              "contributions": "Sarah trabajaba como profesional del marketing y era graduada de la Universidad de Durham.\nA diferencia de una figura pública, su vida fue principalmente la de una ciudadana privada que construía su carrera y mantenía relaciones con las personas que la rodeaban. No existen pruebas fiables suficientes para atribuirle campañas específicas de grandes marcas o cargos formales de liderazgo cívico.\n\nNo obstante, su historia adquirió gran relevancia en el debate público sobre:\n• La libertad de las mujeres para desplazarse de forma independiente por las ciudades.\n• El derecho a sentirse seguras al regresar a casa.\n• La confianza pública en los agentes de policía y otras figuras de autoridad.\n• La responsabilidad institucional cuando personas investidas de poder público abusan de esa autoridad.\n\nPrincipio editorial: El valor de una persona no depende de haber logrado una hazaña pública extraordinaria. La vida de Sarah merece reconocimiento por derecho propio.",
              "factualContext": "En la tarde del 3 de marzo de 2021, Sarah Everard caminaba hacia su casa después de visitar a una amiga en Clapham, al sur de Londres.\nFue abordada por Wayne Couzens, entonces agente en activo de la Policía Metropolitana de Londres, quien utilizó su condición policial para detenerla falsamente, esposándola bajo el pretexto de haber infringido las restricciones de la COVID-19 e introduciéndola en un vehículo alquilado.\nEl expediente judicial estableció que no fue una detención policial legítima. Couzens había planeado el secuestro y utilizó la autoridad asociada a su cargo para llevarlo a cabo. Secuestró, violó y asesinó a Sarah; sus restos fueron hallados posteriormente en una zona boscosa de Kent.\n\nProcedimientos judiciales y rendición de cuentas:\nWayne Couzens se declaró culpable del secuestro, violación y asesinato de Sarah Everard.\nEl 30 de septiembre de 2021, el juez Lord Justice Fulford lo condenó en el Tribunal Penal Central (Old Bailey) a cadena perpetua íntegra (whole-life order), subrayando la gravedad del abuso de autoridad policial y el grave quebrantamiento de la confianza pública.",
              "editorialNotes": "Nota de publicación: El relato judicial se basa en las actas de sentencia y apelación. El Informe de la Baronesa Casey y la Investigación Angiolini son investigaciones distintas con alcances diferentes. El Primer Informe de la Parte 2 de la Investigación Angiolini, publicado en diciembre de 2025, se incluye porque actualiza sustancialmente el debate sobre seguridad pública. La guía propuesta por UltimateHealth es una iniciativa educativa nueva, no un programa gubernamental existente.",
              "verifiedFacts": [
                  "Ejecutiva de marketing de 33 años residente en Brixton, Londres; creció en York y estudió Geografía Humana en la Universidad de Durham (2005–2008).",
                  "Secuestrada la tarde del 3 de marzo de 2021 mientras caminaba a casa desde Clapham por el agente en activo de la Policía Metropolitana Wayne Couzens bajo el falso pretexto de un control por COVID-19.",
                  "El 30 de septiembre de 2021, Lord Justice Fulford condenó a Couzens en Old Bailey a cadena perpetua íntegra (whole-life order).",
                  "El Informe de la Baronesa Casey (publicado el 21 de marzo de 2023) concluyó que la Policía Metropolitana era institucionalmente racista, misógina y homofóbica.",
                  "La Investigación independiente Angiolini publicó su Informe de la Parte 1 el 29 de febrero de 2024 (16 recomendaciones) y el Primer Informe de la Parte 2 el 2 de diciembre de 2025 (13 recomendaciones sobre la prevención de delitos de motivación sexual contra las mujeres en espacios públicos)."
              ],
              "societalImpact": "A. Revisión de la Baronesa Casey (marzo de 2023):\nDesignada en octubre de 2021 y publicada el 21 de marzo de 2023, examinó el liderazgo, la selección de personal, el sistema disciplinario y la cultura interna de la Policía Metropolitana, concluyendo que existían racismo, misoginia y homofobia institucionales y graves fallos en la gestión de denuncias por mala conducta.\n\nB. Investigación Angiolini — Informe de la Parte 1 (29 de febrero de 2024):\nInvestigó la carrera policial de Couzens e identificó graves señales de advertencia y oportunidades perdidas, formulando 16 recomendaciones para reforzar las salvaguardias contra el abuso de la autoridad policial.\n\nC. Investigación Angiolini — Primer Informe de la Parte 2 (2 de diciembre de 2025):\nExaminó la prevención de delitos de motivación sexual contra las mujeres en espacios públicos, formulando 13 recomendaciones adicionales y advirtiendo contra hacer recaer la carga de la seguridad principalmente sobre las mujeres en lugar de actuar eficazmente contra los perpetradores.",
              "actionableLesson": "Auditorías de seguridad urbana y rendición de cuentas del poder institucional:\n1. Selección y verificación de antecedentes policiales (vetting) rigurosas y auditables.\n2. Verificación clara de intervenciones policiales de agentes de paisano a través de canales oficiales.\n3. Canales confidenciales y accesibles para denunciar mala conducta policial.\n4. Infraestructura pública más segura (auditorías de rutas peatonales, parques e iluminación).\n5. Transparencia institucional y supervisión independiente con indicadores medibles.\n6. Prevención centrada en los perpetradores (identificación e interrupción de patrones de acoso y delitos sexuales).",
              "memorialPublication": {
                  "title": "Guía de Auditorías de Seguridad Urbana y Rendición de Cuentas del Poder Institucional",
                  "focus": "Infraestructura Cívica · Seguridad de las Mujeres · Confianza Pública en la Policía · Rendición de Cuentas",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Propósito: Desarrollar un recurso de código abierto de educación cívica y auditoría de seguridad para evaluar espacios públicos y comprender cómo denunciar conductas institucionales indebidas.\n\nLa perspectiva de UltimateHealth:\nRecordar a Sarah Everard significa defender el derecho de toda persona a desplazarse libremente, cuestionar el abuso de la autoridad pública y exigir instituciones que merezcan la confianza depositada en ellas."
              }
          },
          "fr": {
              "name": "Sarah Everard",
              "roleAndField": "Cadre en Marketing · Londres, Angleterre",
              "categoryLabel": "Confiance Publique et Sécurité des Femmes dans l'Espace Public",
              "coreMessage": "La sécurité publique doit être intégrée aux infrastructures civiques du quotidien, et les institutions chargées de protéger les citoyens doivent rendre compte de l'autorité qu'elles exercent. Les femmes doivent pouvoir circuler dans l'espace public sans crainte, et nul ne doit pouvoir détourner un pouvoir institutionnel pour commettre des violences.",
              "whoWasThisPerson": "Sarah Everard était une cadre en marketing de 33 ans vivant à Brixton, dans le sud de Londres.\nElle avait grandi à York et fréquenté la Fulford School avant d'étudier la géographie humaine à la St Cuthbert's Society de l'Université de Durham de 2005 à 2008.\nAprès ses études, elle s'était installée à Londres pour y construire sa carrière. Ses proches se souviennent d'elle comme d'une personne intelligente, bienveillante, réfléchie et indépendante.\nSon histoire compte non pas parce que sa vie devrait être réduite aux circonstances de sa mort, mais parce qu'elle était une personne à part entière, avec ses propres liens, ses projets et son avenir.",
              "contributions": "Sarah travaillait comme professionnelle du marketing et était diplômée de l'Université de Durham.\nContrairement à une personnalité publique, sa vie était avant tout celle d'une citoyenne menant sa carrière et cultivant ses amitiés. Il n'existe pas d'éléments probants permettant de lui attribuer des campagnes publicitaires majeures ou des fonctions officielles d'engagement civique.\n\nSon histoire a néanmoins pris une place centrale dans le débat public concernant :\n• La liberté des femmes de se déplacer de manière autonome en ville.\n• Le droit de rentrer chez soi en sécurité.\n• La confiance du public envers la police et les dépositaires de l'autorité.\n• La responsabilité des institutions lorsque des agents investis de la puissance publique en abusent.\n\nPrincipe éditorial : La valeur d'une vie humaine ne dépend pas d'une réalisation publique extraordinaire. La vie de Sarah mérite d'être reconnue pour elle-même.",
              "factualContext": "Le soir du 3 mars 2021, Sarah Everard rentrait chez elle à pied après avoir rendu visite à une amie à Clapham, dans le sud de Londres.\nElle a été abordée par Wayne Couzens, alors policier en exercice au sein de la Metropolitan Police, qui a usé de sa qualité de policier pour procéder à une arrestation fictive sous prétexte d'une infraction aux restrictions liées à la COVID-19, la menottant avant de la faire monter dans un véhicule loué.\nLes actes judiciaires ont établi qu'il ne s'agissait nullement d'un contrôle légitime : Couzens avait prémédité l'enlèvement et utilisé les attributs de sa fonction pour l'exécuter. Il a enlevé, violé et assassiné Sarah, dont le corps a été retrouvé dans un bois du Kent.\n\nProcédures judiciaires :\nWayne Couzens a plaidé coupable d'enlèvement, de viol et de meurtre. Le 30 septembre 2021, le juge Lord Justice Fulford l'a condamné à la Cour criminelle centrale (Old Bailey) à une peine de perpétuité incompressible (whole-life order), soulignant la gravité exceptionnelle du détournement de l'autorité policière.",
              "editorialNotes": "Note de publication : Le récit judiciaire s'appuie sur les décisions de condamnation et d'appel. Le rapport de la baronne Casey et l'enquête Angiolini sont deux procédures distinctes. Le premier rapport de la deuxième partie de l'enquête Angiolini, publié en décembre 2025, est inclus car il actualise de manière déterminante le débat sur la sécurité publique.",
              "verifiedFacts": [
                  "Cadre en marketing de 33 ans vivant à Brixton (Londres) ; a grandi à York et étudié la géographie humaine à l'Université de Durham (2005–2008).",
                  "Enlevée le soir du 3 mars 2021 alors qu'elle rentrait à pied de Clapham par Wayne Couzens, policier en service de la Metropolitan Police, sous le faux prétexte d'un contrôle COVID-19.",
                  "Le 30 septembre 2021, Lord Justice Fulford a condamné Couzens à l'Old Bailey à une peine de perpétuité incompressible (whole-life order).",
                  "Le rapport de la baronne Casey (publié le 21 mars 2023) a conclu que la Metropolitan Police souffrait de racisme, de misogynie et d'homophobie institutionnels.",
                  "L'enquête indépendante Angiolini a publié le rapport de sa 1re partie le 29 février 2024 (16 recommandations) et le premier rapport de sa 2e partie le 2 décembre 2025 (13 recommandations sur la prévention des crimes à caractère sexuel contre les femmes dans l'espace public)."
              ],
              "societalImpact": "A. Rapport de la baronne Casey (mars 2023) :\nCommandé en octobre 2021 et publié le 21 mars 2023, cet audit indépendant sur la culture et les normes de la Metropolitan Police a mis en évidence un racisme, une misogynie et une homophobie institutionnels ainsi que de graves défaillances dans le traitement des plaintes et des fautes disciplinaires.\n\nB. Enquête Angiolini — Rapport de la 1re partie (29 février 2024) :\nA examiné la carrière policière de Couzens, relevé de nombreux signaux d'alerte ignorés et formulé 16 recommandations pour renforcer le contrôle des antécédents (vetting) et prévenir les abus d'autorité.\n\nC. Enquête Angiolini — Premier rapport de la 2e partie (2 décembre 2025) :\nConsacré à la prévention des crimes à motivation sexuelle contre les femmes dans l'espace public (13 recommandations), il met en garde contre le fait de faire peser la responsabilité de la sécurité principalement sur les femmes plutôt que de cibler et neutraliser les auteurs de violences.",
              "actionableLesson": "Audits de sécurité urbaine et responsabilité du pouvoir institutionnel :\n1. Recrutement et vérification rigoureuse des antécédents (vetting) au sein des forces de police.\n2. Procédures claires de vérification de l'identité des policiers en civil.\n3. Canaux confidentiels et accessibles de signalement des fautes professionnelles.\n4. Infrastructures publiques sécurisées (audit de l'éclairage, des cheminements piétons et des transports).\n5. Transparence institutionnelle et suivi indépendant des recommandations d'enquêtes publiques.\n6. Prévention centrée sur les auteurs d'infractions (détection du harcèlement et des comportements prédateurs).",
              "memorialPublication": {
                  "title": "Guide d'Audits de Sécurité Urbaine et de Responsabilité du Pouvoir Institutionnel",
                  "focus": "Infrastructures Civiques · Sécurité des Femmes · Confiance dans la Police · Responsabilité Institutionnelle",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Objectif : Développer une ressource citoyenne en libre accès permettant d'évaluer la sécurité des espaces publics et de comprendre comment signaler les abus d'autorité.\n\nLa perspective d'UltimateHealth :\nSe souvenir de Sarah Everard signifie défendre le droit de chaque personne à circuler librement, mettre en cause les détournements de l'autorité publique et exiger des institutions dignes de la confiance qui leur est accordée."
              }
          },
          "de": {
              "name": "Sarah Everard",
              "roleAndField": "Marketing-Managerin · London, England",
              "categoryLabel": "Öffentliches Vertrauen & Sicherheit von Frauen im Öffentlichen Raum",
              "coreMessage": "Öffentliche Sicherheit muss in die alltägliche städtische Infrastruktur integriert sein, und Institutionen, denen der Schutz der Bürgerinnen und Bürger anvertraut ist, müssen für die Ausübung ihrer Befugnisse rechenschaftspflichtig bleiben. Frauen müssen sich angstfrei im öffentlichen Raum bewegen können, und niemand darf institutionelle Macht für Gewalttaten missbrauchen können.",
              "whoWasThisPerson": "Sarah Everard war eine 33-jährige Marketing-Managerin, die in Brixton im Süden Londons lebte.\nSie wuchs in York auf, besuchte die Fulford School und studierte von 2005 bis 2008 Humangeographie an der St Cuthbert's Society der University of Durham.\nNach ihrem Abschluss zog sie nach London und baute sich eine berufliche Laufbahn im Marketing auf. Freunde und Familie erinnerten sich an sie als klug, herzlich, umsichtig und unabhängig.\nIhre Geschichte ist wichtig, weil ihr Leben nicht auf die Umstände ihres Todes reduziert werden darf: Sie war ein Mensch mit eigenen Beziehungen, Zielen und einer eigenen Zukunft.",
              "contributions": "Sarah arbeitete als Marketing-Fachkraft und war Absolventin der University of Durham.\nAnders als bei einer Person des öffentlichen Lebens war ihr Leben vor allem das einer Privatperson, die ihren Beruf ausübte und ihren Freundes- und Familienkreis pflegte. Es gibt keine hinreichenden Belege, um ihr spezifische Großkampagnen oder formelle öffentliche Ämter zuzuschreiben.\n\nDennoch erlangte ihre Geschichte große Bedeutung in der gesellschaftlichen Debatte über:\n• Die Freiheit von Frauen, sich unabhängig durch Städte zu bewegen.\n• Das Recht, sich auf dem Heimweg sicher zu fühlen.\n• Das Vertrauen der Öffentlichkeit in Polizeibeamte und staatliche Autorität.\n• Die institutionelle Verantwortung, wenn Träger öffentlicher Gewalt ihre Befugnisse missbrauchen.\n\nRedaktioneller Grundsatz: Der Wert eines Menschen hängt nicht von außergewöhnlichen öffentlichen Leistungen ab. Sarahs Leben verdient Anerkennung um ihrer selbst willen.",
              "factualContext": "Am Abend des 3. März 2021 ging Sarah Everard zu Fuß nach Hause, nachdem sie eine Freundin in Clapham im Süden Londons besucht hatte.\nSie wurde von Wayne Couzens angesprochen, der damals aktiver Polizeibeamter der Metropolitan Police war.\nCouzens nutzte seine Stellung als Polizist, um eine Festnahme wegen eines angeblichen Verstoßes gegen COVID-19-Auflagen vorzutäuschen, legte ihr Handschellen an und brachte sie in ein gemietetes Fahrzeug.\nDie Gerichtsakten belegen, dass es sich um keine rechtmäßige Polizeikontrolle handelte: Couzens hatte die Entführung geplant und die Autorität seines Amtes gezielt missbraucht. Er entführte, vergewaltigte und ermordete Sarah; ihre sterblichen Überreste wurden später in einem Waldstück in Kent gefunden.\n\nGerichtsverfahren:\nWayne Couzens bekannte sich der Entführung, Vergewaltigung und des Mordes schuldig. Am 30. September 2021 verurteilte ihn Richter Lord Justice Fulford am Central Criminal Court (Old Bailey) zu einer lebenslangen Freiheitsstrafe ohne vorzeitige Entlassungsmöglichkeit (whole-life order) und betonte den schweren Missbrauch polizeilicher Amtsgewalt.",
              "editorialNotes": "Publikationshinweis: Die Darstellung des Strafverfahrens stützt sich auf die Urteils- und Berufungsdokumente. Der Baroness-Casey-Bericht und die Angiolini Inquiry sind eigenständige Untersuchungen. Der im Dezember 2025 veröffentlichte erste Bericht von Teil 2 der Angiolini Inquiry wurde aufgenommen, da er die Debatte über öffentliche Sicherheit wesentlich fortschreibt.",
              "verifiedFacts": [
                  "33-jährige Marketing-Managerin aus Brixton, Süd-London; aufgewachsen in York, Studium der Humangeographie an der University of Durham (2005–2008).",
                  "Am Abend des 3. März 2021 auf dem Heimweg von Clapham durch den aktiven Beamten der Metropolitan Police Wayne Couzens unter dem Vorwand einer COVID-19-Kontrolle entführt und ermordet.",
                  "Am 30. September 2021 verurteilte Lord Justice Fulford Couzens am Old Bailey zu einer lebenslangen Haftstrafe ohne Bewährung (whole-life order).",
                  "Der Baroness-Casey-Bericht (veröffentlicht am 21. März 2023) stellte institutionellen Rassismus, Frauenfeindlichkeit und Homophobie bei der Metropolitan Police fest.",
                  "Die unabhängige Angiolini Inquiry veröffentlichte am 29. Februar 2024 ihren Teil-1-Bericht (16 Empfehlungen) und am 2. Dezember 2025 ihren ersten Bericht zu Teil 2 (13 Empfehlungen zur Prävention sexuell motivierter Straftaten gegen Frauen im öffentlichen Raum)."
              ],
              "societalImpact": "A. Baroness Casey Review (März 2023):\nDie im Oktober 2021 eingesetzte unabhängige Untersuchung (Abschlussbericht vom 21. März 2023) prüfte Führung, Einstellungsverfahren, Disziplinarsystem und Organisationskultur der Metropolitan Police und stellte institutionellen Rassismus, Misogynie und Homophobie sowie gravierende Mängel im Umgang mit Fehlverhalten fest.\n\nB. Angiolini Inquiry — Teil-1-Bericht (29. Februar 2024):\nUntersuchte Couzens' Polizeilaufbahn, deckte übersehene Warnsignale auf und sprach 16 Empfehlungen zur Verschärfung von Sicherheitsüberprüfungen (Vetting) und Dienstaufsicht aus.\n\nC. Angiolini Inquiry — Erster Bericht zu Teil 2 (2. Dezember 2025):\nUntersuchte die Prävention sexuell motivierter Straftaten gegen Frauen im öffentlichen Raum (13 Empfehlungen) und warnte davor, die Verantwortung für Sicherheit primär auf Frauen abzuwälzen, statt konsequent gegen Täter vorzugehen.",
              "actionableLesson": "Städtische Sicherheitsprüfungen und Rechenschaftspflicht öffentlicher Gewalt:\n1. Gründliche Einstellungs- und Zuverlässigkeitsüberprüfungen (Vetting) bei der Polizei.\n2. Klare Verifikationsmöglichkeiten bei Kontrollen durch Polizeibeamte in Zivil.\n3. Vertrauliche und zugängliche Meldestellen für polizeiliches Fehlverhalten.\n4. Sichere öffentliche Infrastruktur (Prüfung von Fußwegen, Beleuchtung und Notrufsystemen).\n5. Institutionelle Transparenz und unabhängige Aufsicht mit messbaren Indikatoren.\n6. Täterorientierte Prävention zur frühzeitigen Unterbindung von Stalking, Belästigung und Sexualdelikten.",
              "memorialPublication": {
                  "title": "Leitfaden für Städtische Sicherheitsaudits & Institutionelle Rechenschaftspflicht",
                  "focus": "Städtische Infrastruktur · Sicherheit von Frauen · Vertrauen in die Polizei · Institutionelle Aufsicht",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Ziel: Entwicklung eines offenen Bildungs- und Prüfinstruments für Kommunen, Hochschulen und Bürgerinitiativen zur Bewertung der Sicherheit öffentlicher Räume und zum Umgang mit Amtsmissbrauch.\n\nDie UltimateHealth-Perspektive:\nSarah Everard zu gedenken bedeutet, das Recht jedes Menschen auf freie Bewegung zu verteidigen, den Missbrauch öffentlicher Gewalt konsequent zu hinterfragen und Institutionen einzufordern, die das in sie gesetzte Vertrauen verdienen."
              }
          },
          "hr": {
              "name": "Sarah Everard",
              "roleAndField": "Marketinška stručnjakinja · London, Engleska",
              "categoryLabel": "Javno povjerenje i sigurnost žena na ulicama",
              "coreMessage": "Javna sigurnost mora biti ugrađena u svakodnevnu građansku infrastrukturu, a institucije kojima je povjerena zaštita građana moraju odgovarati za ovlasti koje izvršavaju. Žene moraju moći hodati javnim prostorima bez straha, a nijedan pojedinac ne smije moći zloupotrijebiti institucionalnu moć za počinjenje nasilja.",
              "whoWasThisPerson": "Sarah Everard bila je 33-godišnja marketinška stručnjakinja koja je živjela u Brixtonu u južnom Londonu.\nOdrasla je u Yorku i pohađala školu Fulford prije studija antropogeografije na Sveučilištu Durham (St Cuthbert's Society) od 2005. do 2008. godine.\nNakon diplome preselila se u London i izgradila karijeru u marketingu. Prijatelji i obitelj pamtili su je kao inteligentnu, brižnu, promišljenu i neovisnu osobu.\nNjezina je priča važna ne zato što bi njezin život trebalo svesti na okolnosti njezine smrti, već zato što je bila pojedinka s vlastitim odnosima, амbicijama i budućnošću.",
              "contributions": "Sarah je radila kao stručnjakinja za marketing i bila diplomantica Sveučilišta Durham.\nZa razliku od javnih osoba, njezin je život prvenstveno bio život privatne osobe koja gradi karijeru i njeguje prijateljstva. Nema dovoljno pouzdanih dokaza koji bi joj pripisali specifične velike brend-kampanje ili formalne građanske funkcije.\n\nNjezina je priča ipak postala iznimno važna u široj javnoj raspravi o:\n• Slobodi žena da se samostalno kreću gradovima.\n• Pravu na osjećaj sigurnosti pri povratku kući.\n• Povjerenju javnosti u policijske službenike i javne ovlasti.\n• Institucionalnoj odgovornosti kada pojedinci zloupotrijebe javnu ovlast.\n\nUredničko načelo: Vrijednost osobe ne ovisi o izvanrednom javnom postignuću; život Sarah Everard zaslužuje poštovanje sam po sebi.",
              "factualContext": "Uvečer 3. ožujka 2021. Sarah Everard vraćala se pješice kući nakon posjeta prijateljici u Claphamu u južnom Londonu.\nPrišao joj je Wayne Couzens, tada активni policijski službenik лондонske Metropolitanske policije, koji je zloupotrijebio svoj položaj kako bi je lažno priveo pod izlikom kršenja mjera vezanih uz COVID-19, stavio joj lisice i uveo je u unajmljeno vozilo.\nSudski спиsi utvrdili su da to nije bilo zakonito policijsko postupanje, već unaprijed планиrana otmica. Couzens je oteo, silovao i ubio Sarah, a njezini su posmrtni ostaci kasnije pronađeni u šumi u Kentu.\n\nSudski postupak:\nWayne Couzens priznao je krivnju za otmicu, silovanje i ubojstvo. Dana 30. rujna 2021. sudac Lord Justice Fulford osudio ga je na Središnjem kaznenom sudu (Old Bailey) na kaznu doživotnog zatvora bez mogućnosti pomilovanja (whole-life order), istaknuvši težinu zloupotrebe policijskih ovlasti.",
              "editorialNotes": "Napomena o objavi: Sudski prikaz temelji se na presudi i žalbenim spisima. Izvješće barunice Casey i Istraga Angiolini zasebne su istrage. Prvo izvješće 2. dijela Istrage Angiolini iz prosinca 2025. uključeno je jer značajno ažurira raspravu o javnoj sigurnosti.",
              "verifiedFacts": [
                  "33-godišnja marketinška stručnjakinja iz Brixtona u Londonu; odrasla u Yorku i diplomirala na Sveučilištu Durham (2005.–2008.).",
                  "Oteta 3. ožujka 2021. pri povratku iz Claphama od strane aktivnog policajca Metropolitanske policije Waynea Couzensa pod lažnom izlikom kršenja mjera za COVID-19.",
                  "Dana 30. rujna 2021. Lord Justice Fulford izrekao je Couzensu na sudu Old Bailey kaznu doživotnog zatvora (whole-life order).",
                  "Izvješće barunice Casey (objavljeno 21. ožujka 2023.) utvrdilo je institucionalni rasizam, mizoginiju i homofobiju u Metropolitanskoj policiji.",
                  "Neovisna istraga Angiolini objavila je Izvješće 1. dijela 29. veljače 2024. (16 preporuka) i Prvo izvješće 2. dijela 2. prosinca 2025. (13 preporuka o sprječavanju сексуalno motiviranih zločina nad ženama u javnom prostoru)."
              ],
              "societalImpact": "A. Izvješće barunice Casey (ožujak 2023.):\nNeovisna revizija kulture i standarda ponašanja Metropolitanske policije utvrdila je institucionalni rasizam, mizoginiju i homofobiju te ozbiljne propuste u rješavanju pritužbi.\n\nB. Istraga Angiolini — Izvješće 1. dijela (29. veljače 2024.):\nIspitala je Couzensovu policijsku karijeru i propuštene znakove upozorenja te donijela 16 preporuka za jačanje sigurnosnih provjera.\n\nC. Istraga Angiolini — Prvo izvješće 2. dijela (2. prosinca 2025.):\nUsmjereno na sprječavanje seksualno motiviranih zločina nad ženama u javnim prostorima (13 preporuka), uz upozorenje da se teret sigurnosti ne smije prebacivati na žene nego na suzbijanje počinitelja.",
              "actionableLesson": "Revizije urbane sigurnosti i odgovornost institucionalne moći:\n1. Temeljita provjera kandidata i policijskih službenika (vetting)\n2. Jasni начиni provjere identiteta policajaca u civilu\n3. Povjerljivi kanali za prijavu policijskog nedoličnog ponašanja\n4. Sigurnija javna infrastruktura i rasvjeta pješačkih ruta\n5. Institucionalna transparentnost i neovisni nadzor\n6. Prevencija usmjerena na počinitelje.",
              "memorialPublication": {
                  "title": "Vodič za reviziju urbane sigurnosti i odgovornost institucionalnih ovlasti",
                  "focus": "Građanska infrastruktura · Sigurnost žena · Javno povjerenje u policiju · Institucionalna odgovornost",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Sjećanje na Sarah Everard znači obranu prava svake osobe na slobodno kretanje, preispitivanje zloupotrebe javnih ovlasti i zahtijevanje institucija koje opravdavaju povjerenje građana."
              }
          }
      }
  },
    {
      "id": 8,
      "slug": "anene-booysen",
      "name": "Anene Booysen",
      "country": "South Africa",
      "countryFlag": "🇿🇦",
      "category": "safety-and-justice",
      "categoryLabel": "Child Protection & Youth Community Care",
      "eraOrYear": "2013",
      "roleAndField": "Young Community Member & Construction Worker · Bredasdorp, Western Cape",
      "avatarUrl": "https://images.openai.com/static-rsc-4/0Id69OwDdqBc6YBcdUcdd2sOzS8jWP4jv7jCvvsNLvx-x1o7U3_lpoXGGZ10o5r7m-njzc_2efEiF34LRMelCQAEQYqePvzBfFb0hz1C1zeJ6CiNqDpzBgoac9K21q6-r4hzI8AX8emyrRjGkPYm3VXS0zw0X4KEZH1pAzharEU?purpose=inline",
      "verificationStatus": "Verified",
      "lastVerifiedAt": "2026-11-07",
      "coreMessage": "Children and young people must grow up in communities where their safety, dignity, and development are protected. Preventing violence requires more than criminal punishment: it requires accessible education, effective child-protection systems, accountable institutions, and safe community environments.",
      "whoWasThisPerson": "Anene Booysen was a 17-year-old girl from Bredasdorp, a town in the Overberg region of South Africa's Western Cape.\n\nShe was part of a working-class community in which access to education, employment, and opportunities for young people remained important challenges.\n\nAnene was working at a construction site involved in building Reconstruction and Development Programme (RDP) houses. Her life was connected to the everyday realities of young people in rural and economically disadvantaged communities.\n\nHer death brought national and international attention to Bredasdorp and to the wider problem of violence against women and girls in South Africa.\n\nEditorial distinction: Reliable institutional records establish her age, community, and connection to the construction site. Avoid adding unverified descriptions of her academic achievements, personal ambitions, or professional plans.",
      "contributions": "Anene was a young person at the beginning of her life, not a public figure or an established professional.\n\nHer contribution should not be exaggerated through achievements that cannot be documented.\n\nInstead, her story drew attention to the circumstances faced by young people in communities where poverty, unemployment, limited opportunities, and gender-based violence intersect.\n\nHer remembrance subsequently became connected to an important community-development initiative: the Anene Booysen Skills Development Centre.\n\nThis initiative sought to provide vocational education and skills-development opportunities to young people in and around Bredasdorp.\n\nHer name therefore became associated with a continuing effort to expand educational and employment opportunities for underserved communities.",
      "factualContext": "During the early hours of 2 February 2013, Anene Booysen was found severely injured at a construction site in Bredasdorp.\n\nShe had suffered a brutal sexual assault and serious physical injuries.\n\nShe was taken to Tygerberg Hospital in Cape Town, where she died later that day.\n\nThe incident shocked South Africa and attracted international attention because of the extreme violence involved and the fact that the victim was only 17 years old.\n\nThe case raised urgent questions about the safety of women and girls, the protection of minors, the investigation of sexual offences, and the responsibilities of public institutions.\n\nThe South African government publicly condemned the crime, while the Commission for Gender Equality called attention to the wider pattern of sexual violence against women and girls.\n\nJudicial Proceedings and Accountability:\nThe criminal case was heard before the Western Cape High Court sitting at the Swellendam Circuit.\n\nJohannes Kana was charged with rape and murder.\n\nOn 29 October 2013, Judge Patricia Goliath found him guilty of both offences.\n\nThe court considered the evidence presented during the trial, including the accused's admissions concerning the assault and rape, the medical evidence, and the surrounding circumstances.\n\nOn 1 November 2013, Kana was sentenced to two life terms:\n• One life sentence for rape.\n• One life sentence for murder.\n\nThe sentences were ordered to run concurrently.\n\nOther individuals had initially been arrested in connection with the case. However, charges against the other suspects were withdrawn because the available evidence was insufficient to proceed against them.\n\nImportant editorial distinction: The conviction and sentence of Johannes Kana are established by the court proceedings. Do not describe other individuals as convicted participants or state that the court established a larger group of perpetrators.",
      "editorialNotes": "Publication note: The criminal proceedings, government response, and skills-centre initiative are supported by court and government records. The historical relationship between Anene's case and the re-establishment of Sexual Offences Courts is deliberately qualified: the relevant government task team was established in June 2012, before her death. The establishers and official opening (28 July 2016) of the Anene Booysen Skills Development Centre are documented, while its present operational status, current enrolment, and measurable long-term outcomes should be independently verified. The proposed UltimateHealth child-protection manual is a new educational initiative, not an existing government programme.",
      "verifiedFacts": [
          "Anene Booysen was a 17-year-old girl from Bredasdorp in the Overberg region of South Africa's Western Cape who was working at a construction site involved in building Reconstruction and Development Programme (RDP) houses.",
          "During the early hours of 2 February 2013, she was found severely injured at a construction site in Bredasdorp following a brutal sexual assault and died later that day at Tygerberg Hospital in Cape Town.",
          "On 29 October 2013, Judge Patricia Goliath in the Western Cape High Court sitting at the Swellendam Circuit convicted Johannes Kana of rape and murder (S v Kana [2013] ZAWCHC 33), and on 1 November 2013 sentenced him to two concurrent life terms.",
          "Charges against other initially arrested suspects were withdrawn due to insufficient evidence; only Johannes Kana's conviction and sentence were established by the court.",
          "While Anene's death heightened national urgency around gender-based violence, the formal process to re-establish South Africa's Sexual Offences Courts had already begun in June 2012 via a Ministerial Advisory Task Team, with the first renewed court opening in Butterworth on 23 August 2013.",
          "The R10 million Anene Booysen Skills Development Centre in Bredasdorp—developed through DHET, CETA, Boland TVET College, and Cape Agulhas Municipality—held its sod-turning on 13 March 2014 and was officially opened on 28 July 2016 by Minister Dr Blade Nzimande; Anene's mother Corlia Olivier died in May 2014 before its opening."
      ],
      "societalImpact": "Anene's death triggered widespread public concern and renewed national debate about gender-based violence, the protection of children, and the responsibilities of the criminal justice system. Several developments deserve attention.\n\nA. National Attention to Gender-Based Violence\nThe South African Presidency publicly condemned the crime in February 2013. The incident prompted:\n• National discussion about sexual violence against women and children.\n• Public calls for stronger protection of vulnerable communities.\n• Parliamentary debate about violence against women and girls.\n• Renewed attention to police investigation and prosecution of sexual offences.\n• Community mobilisation demanding justice and greater institutional accountability.\n\nThe Commission for Gender Equality also called for stronger monitoring of sexual-assault cases and more effective investigation and prosecution. The case became part of a wider national conversation about gender-based violence, rather than an isolated criminal incident.\n\nB. Sexual Offences Courts — An Important Historical Distinction\nSouth Africa's specialised Sexual Offences Courts were not first created in response to Anene's murder. The country had previously introduced specialised courts, beginning with a pilot court at Wynberg in 1993.\n\nA process to re-establish these courts had already begun in June 2012, when the Department of Justice established a Ministerial Advisory Task Team to investigate their reintroduction. The first court under the renewed programme opened in Butterworth, Eastern Cape, on 23 August 2013. The programme subsequently expanded, with the government committing to upgrading and establishing additional specialised courts.\n\nThese courts were designed to:\n• Reduce secondary victimisation of complainants.\n• Improve the handling of sexual-offence cases.\n• Provide specialised support services.\n• Improve the speed and quality of trials.\n• Strengthen coordination between prosecutors, police, courts, and support organisations.\n\nWhy it matters: Anene's case contributed to the wider public urgency surrounding sexual violence, but the formal re-establishment process predated her death. The two developments should not be presented as a direct cause-and-effect relationship.\n\nC. Thuthuzela Care Centres and Survivor Support\nSouth Africa's broader response to sexual violence also includes Thuthuzela Care Centres, which provide coordinated services for survivors of sexual offences. These centres bring together services such as:\n• Medical assistance.\n• Reporting and police support.\n• Counselling.\n• Assistance with prosecution processes.\n• Preparation for court proceedings.\n\nTheir purpose includes reducing secondary victimisation and making it easier for survivors to access support through a coordinated system. These initiatives are part of the wider institutional response to sexual violence and should not be attributed exclusively to Anene's case.\n\nD. A Legacy Continued — Anene Booysen Skills Development Centre (A community-development initiative established in her memory)\nOne of the most meaningful developments connected to Anene's remembrance was the establishment of the Anene Booysen Skills Development Centre in Bredasdorp. The initiative was developed through the Department of Higher Education and Training, the Construction Education and Training Authority (CETA), Boland Technical and Vocational Education and Training College, and the Cape Agulhas Municipality.\n\nHow the Initiative Began:\nOn 13 March 2014, the Department of Higher Education and Training held a sod-turning ceremony marking the beginning of construction of the centre. The project was announced as a R10 million initiative intended to expand skills development and employment opportunities for the local community. The government described the project as a way of transforming a tragedy into an opportunity for education, training, and community development.\n\nOfficial Opening — July 2016:\nThe Anene Booysen Skills Development Centre was officially opened on 28 July 2016 by the Minister of Higher Education and Training, Dr Blade Nzimande. According to the Department of Higher Education and Training, the centre was intended to:\n• Expand access to occupational training.\n• Provide educational facilities to underserved rural communities.\n• Improve employment prospects.\n• Address poverty and unemployment.\n• Support skills development in and around Bredasdorp.\n\nThe Construction Education and Training Authority recruited 75 local learners for practical training during the construction of the centre. The initiative was a partnership involving government, a sector education and training authority, a TVET college, and the local municipality.\n\nRemembering Her Mother, Corlia Olivier:\nAn important part of this story is the contribution and experience of Anene's mother, Corlia Olivier. In March 2014, the Minister announced that Anene's mother would be employed as the housekeeper at the proposed centre. However, Corlia Olivier was seriously ill and died in May 2014, before the centre's official opening. The Department of Higher Education and Training publicly acknowledged her passing and the family's connection to the initiative. Her story should be treated with care and dignity. The centre was not simply a memorial building; it was intended to create educational and employment opportunities for a community that needed them.\n\nWhy This Legacy Matters to UltimateHealth:\nThe skills centre represents a meaningful connection between remembrance and community development. It demonstrates how a public memorial initiative can be linked to:\n• Access to vocational education.\n• Youth skills development.\n• Employment opportunities.\n• Rural community development.\n• Long-term investment in underserved populations.\n\nEditorial distinction: The centre's establishment and official opening are documented. Its present operational status, current enrolment, available programmes, and measurable long-term outcomes should be independently verified before publication.",
      "actionableLesson": "Community Child Protection and Peri-Urban Youth Safety:\nAnene's case highlights the need for a coordinated approach to child protection and community safety. The following measures are proposed for local authorities, schools, community organisations, and social-service institutions:\n\n1. Community-based child protection\n• Establish accessible channels for children to report abuse, exploitation, and threats.\n• Train teachers, community workers, and youth mentors to recognise safeguarding concerns.\n• Strengthen referral systems between schools, social workers, healthcare providers, and law enforcement.\n• Protect the privacy and dignity of children who report abuse.\n\n2. Accessible social-work support\n• Improve access to trained social workers in rural and peri-urban communities.\n• Ensure that vulnerable children and families can access counselling and support.\n• Strengthen coordination between schools, child-protection organisations, and local authorities.\n• Establish clear procedures for responding to reports of abuse or neglect.\n\n3. Safer public and community spaces\n• Improve lighting around pedestrian routes, public facilities, and community centres.\n• Conduct safety assessments of isolated areas and poorly maintained infrastructure.\n• Provide safe and accessible recreational spaces for young people.\n• Encourage community participation in identifying local safety concerns.\n\n4. Education and economic opportunity\n• Expand access to vocational training and skills-development programmes.\n• Support young people who face financial barriers to education.\n• Develop partnerships between local institutions, employers, and training providers.\n• Connect skills development with realistic employment opportunities.\n\n5. Survivor-centred response\n• Ensure access to medical treatment and psychological support.\n• Reduce repeated questioning and unnecessary exposure during investigations.\n• Provide clear information about legal rights and available services.\n• Maintain confidentiality and protect survivors from stigma and intimidation.\n\n6. Institutional accountability\n• Investigate reports of violence and abuse promptly.\n• Monitor the effectiveness of child-protection services.\n• Publish meaningful indicators of service accessibility and response times.\n• Ensure that public institutions act on identified safeguarding failures.\n\nThese are proposed recommendations for community protection and development. They should not be presented as existing statutory requirements in every South African municipality.",
      "memorialPublication": {
          "title": "Community Child Protection & Peri-Urban Youth Safety Manual",
          "focus": "Child Safeguarding · Rural Community Development · Youth Education · Community Intervention",
          "initiativeStatus": "Proposed Initiative",
          "deliverable": "Purpose:\nDevelop an open-source educational and community-organising resource to help local organisations identify safeguarding risks, improve access to support, and create safer environments for children and young people.\n\nProposed toolkit components:\nA. Child Safeguarding Framework — A practical resource covering:\n• Recognising abuse, exploitation, and neglect.\n• Safe reporting channels.\n• Referral to appropriate child-protection services.\n• Confidentiality and child dignity.\n• Responsibilities of schools and community organisations.\n\nB. Community Safety Audit — A structured checklist to evaluate:\n• Street lighting and pedestrian routes.\n• Safety around schools and community facilities.\n• Access to recreational spaces.\n• Availability of emergency services.\n• Community reporting mechanisms.\n\nC. Youth Development and Skills Access — A resource for identifying:\n• Local vocational training opportunities.\n• Barriers to education.\n• Youth unemployment challenges.\n• Community mentorship opportunities.\n• Partnerships with TVET colleges and training organisations.\n\nD. Social Support and Referral Directory — A locally adaptable directory template for:\n• Social workers.\n• Healthcare facilities.\n• Child-protection organisations.\n• Police and emergency services.\n• Counselling and survivor-support organisations.\n\nE. Community Accountability Framework — A simple method for documenting:\n• Identified safeguarding gaps.\n• Community safety concerns.\n• Available support services.\n• Actions taken by local authorities.\n• Follow-up and improvement measures.\n\nThe toolkit should be reviewed by child-protection specialists, social workers, educators, and local community organisations before implementation. It must prioritise children's privacy, informed safeguarding practices, and safe referral procedures.\n\nThe UltimateHealth Perspective:\nAnene Booysen was only 17 years old. Her story brought national and international attention to the violence experienced by women and girls in South Africa. It also highlighted the vulnerabilities faced by young people in communities where access to education, employment, and support services can be limited.\n\nThe Anene Booysen Skills Development Centre provides a documented example of how her remembrance became connected to a community-development initiative.\n\nHer legacy should be understood through two connected responsibilities:\n• Protecting young people: Every child deserves access to safety, dignity, education, and effective protection.\n• Creating opportunities: Communities need meaningful investment in education, vocational skills, and employment so that young people can build independent futures.\n\nRemembering Anene should not mean remembering only the violence that ended her life. It should also mean recognising the importance of safer communities, stronger child-protection systems, and opportunities for the next generation. A young person's future should be protected by the community around them, not left to chance."
      },
      "references": [
          {
              "title": "S v Kana (SS31/2013) [2013] ZAWCHC 33, 29 October 2013 — Primary court judgment recording the rape and murder charges, the evidence, and the conviction",
              "url": "https://www3.saflii.org/za/cases/ZAWCHC/2013/33.html",
              "publisher": "South African Legal Information Institute (SAFLII)",
              "isPrimary": true
          },
          {
              "title": "Minister Mthethwa congratulates Police in Anene Booysen case sentencing, 1 November 2013 — Official statement confirming the two life sentences imposed on Johannes Kana",
              "url": "https://www.saps.gov.za/newsroom/msspeechdetail.php?nid=1431",
              "publisher": "South African Police Service (SAPS)",
              "isPrimary": true
          },
          {
              "title": "State vs Johannes Kana: Why the State rejected Kana's guilty plea, 5 June 2013 — Official explanation of the prosecution's position and the charges",
              "url": "https://www.gov.za/news/media-statements/state-vs-johannes-kana-why-state-rejected-kanas-guilty-plea-05-jun-2013",
              "publisher": "South African Government",
              "isPrimary": true
          },
          {
              "title": "Presidency expresses outrage at the rape and murder of a teenager, 7 February 2013 — Contemporary official response to Anene's death",
              "url": "https://www.gov.za/news/media-statements/presidency-expresses-outrage-rape-and-murder-teenager-07-feb-2013",
              "publisher": "South African Government",
              "isPrimary": true
          },
          {
              "title": "Commission for Gender Equality responds to reports of sexual assaults and violence, 13 February 2013 — Institutional response to the wider pattern of violence against women and girls",
              "url": "https://www.gov.za/news/media-statements/commission-gender-equality-responds-reports-sexual-assaults-and-violence-13",
              "publisher": "South African Government",
              "isPrimary": true
          },
          {
              "title": "New skills development centre in Bredasdorp officially opens, 28 July 2016 — Official record of the centre's opening, purpose, partnership, and local learner training",
              "url": "https://www.dhet.gov.za/SiteAssets/Latest%20News/July%202016/Anene%20Booysens%20article%20AC.pdf",
              "publisher": "Department of Higher Education and Training",
              "isPrimary": true
          },
          {
              "title": "Sod-turning ceremony for construction of Anene Booysen Skills Development Centre, 13 March 2014 — Government announcement explaining the project's objectives and community-development purpose",
              "url": "https://www.gov.za/news/speeches/minister-blade-nzimande-sod-turning-ceremony-construction-anene-booysen-skills",
              "publisher": "South African Government",
              "isPrimary": true
          },
          {
              "title": "Minister Nzimande mourns the passing of Anene Booysen's mother, 15 May 2014 — Official acknowledgement of Corlia Olivier's passing and her connection to the development initiative",
              "url": "https://www.gov.za/news/media-statements/minister-nzimande-mourns-passing-anene-booysens-mother-15-may-2014",
              "publisher": "South African Government",
              "isPrimary": true
          },
          {
              "title": "Minister Michael Masutha: Launch of Sexual Offences Court in Schweizer-Reneke, 22 July 2015 — Government record documenting the June 2012 task team, the 2013 re-establishment programme, and the first court's opening in August 2013",
              "url": "https://www.gov.za/news/speeches/minister-michael-masutha-launch-sexual-offences-court-schweizer-reneke-magistrates",
              "publisher": "South African Government",
              "isPrimary": true
          },
          {
              "title": "Administration of Justice: South African Courts — Government overview of Sexual Offences Courts and their objectives",
              "url": "https://www.justice.gov.za/about/sa-courts.html",
              "publisher": "Department of Justice and Constitutional Development",
              "isPrimary": true
          },
          {
              "title": "Frequently asked questions about South Africa's Sexual Offences Courts — Independent fact-checking resource explaining the history and re-establishment of specialised courts",
              "url": "https://africacheck.org/fact-checks/factsheets/frequently-asked-questions-about-south-africas-sexual-offences-courts",
              "publisher": "Africa Check"
          },
          {
              "title": "Administration of Justice — Overview of the justice system and measures addressing gender-based violence",
              "url": "https://www.gov.za/about-government/government-system/administration-justice",
              "publisher": "South African Government",
              "isPrimary": true
          },
          {
              "title": "Kana given double life sentence for Booysen's rape and murder, 1 November 2013 — Contemporary reporting on the conviction, sentencing, and withdrawal of charges against other suspects",
              "url": "https://mg.co.za/news/south-africa/2013-11-01-kana-given-double-life-sentence-for-booysens-rape-murder/",
              "publisher": "Mail & Guardian"
          },
          {
              "title": "Project of hope rises out of Anene tragedy, 21 April 2013 — Reporting on the proposed skills-development project and its intended benefits for local young people",
              "url": "https://iol.co.za/news/south-africa/western-cape/2013-04-21-project-of-hope-rises-out-of-anene-tragedy/",
              "publisher": "IOL"
          }
      ],
      "translations": {
          "hi": {
              "country": "दक्षिण अफ्रीका",
              "categoryLabel": "बाल संरक्षण एवं युवा सामुदायिक देखभाल",
              "roleAndField": "युवा सामुदायिक सदस्य एवं निर्माण श्रमिक · ब्रेडसडॉर्प, वेस्टर्न केप",
              "coreMessage": "बच्चों और युवाओं को ऐसे समुदायों में बड़ा होना चाहिए जहाँ उनकी सुरक्षा, गरिमा और विकास सुरक्षित हों। हिंसा को रोकने के लिए केवल आपराधिक दंड से अधिक की आवश्यकता है: इसके लिए सुलभ शिक्षा, प्रभावी बाल-संरक्षण प्रणाली, जवाबदेह संस्थाएँ और सुरक्षित सामुदायिक वातावरण आवश्यक हैं।",
              "whoWasThisPerson": "एनीने बूयसेन (Anene Booysen) दक्षिण अफ्रीका के वेस्टर्न केप के ओवरबर्ग क्षेत्र के एक कस्बे ब्रेडसडॉर्प की 17 वर्षीय लड़की थीं।\n\nवह एक ऐसे श्रमजीवी समुदाय का हिस्सा थीं जहाँ युवाओं के लिए शिक्षा, रोजगार और अवसरों तक पहुँच महत्वपूर्ण चुनौतियाँ बनी हुई थीं।\n\nएनीने रिकंस्ट्रक्शन एंड डेवलपमेंट प्रोग्राम (RDP) के घरों के निर्माण से जुड़े एक निर्माण स्थल पर काम कर रही थीं। उनका जीवन ग्रामीण और आर्थिक रूप से वंचित समुदायों के युवाओं की रोज़मर्रा की वास्तविकताओं से जुड़ा था।\n\nउनकी मृत्यु ने ब्रेडसडॉर्प और दक्षिण अफ्रीका में महिलाओं और लड़कियों के खिलाफ हिंसा की व्यापक समस्या की ओर राष्ट्रीय और अंतर्राष्ट्रीय ध्यान आकर्षित किया।\n\nसंपादकीय अंतर: विश्वसनीय संस्थागत अभिलेख उनकी आयु, समुदाय और निर्माण स्थल से उनके संबंध को स्थापित करते हैं। उनकी शैक्षणिक उपलब्धियों, व्यक्तिगत महत्वाकांक्षाओं या व्यावसायिक योजनाओं के असत्यापित विवरण जोड़ने से बचें।",
              "contributions": "एनीने अपने जीवन की शुरुआत में एक युवा व्यक्ति थीं, न कि कोई सार्वजनिक हस्ती या स्थापित पेशेवर।\n\nउनके योगदान को ऐसी उपलब्धियों के माध्यम से बढ़ा-चढ़ाकर पेश नहीं किया जाना चाहिए जिनका दस्तावेजीकरण नहीं किया जा सकता।\n\nइसके बजाय, उनकी कहानी ने उन परिस्थितियों की ओर ध्यान आकर्षित किया जिनका सामना युवा लोग ऐसे समुदायों में करते हैं जहाँ गरीबी, बेरोजगारी, सीमित अवसर और लिंग-आधारित हिंसा आपस में जुड़ते हैं।\n\nउनकी स्मृति बाद में एक महत्वपूर्ण सामुदायिक-विकास पहल से जुड़ गई: एनीने बूयसेन कौशल विकास केंद्र (Anene Booysen Skills Development Centre)।\n\nइस पहल ने ब्रेडसडॉर्प और उसके आसपास के युवाओं को व्यावसायिक शिक्षा और कौशल-विकास के अवसर प्रदान करने का प्रयास किया।\n\nइसलिए उनका नाम वंचित समुदायों के लिए शैक्षिक और रोजगार के अवसरों का विस्तार करने के निरंतर प्रयास से जुड़ गया।",
              "factualContext": "2 फरवरी 2013 के शुरुआती घंटों के दौरान, एनीने बूयसेन ब्रेडसडॉर्प में एक निर्माण स्थल पर गंभीर रूप से घायल अवस्था में मिलीं।\n\nउन्हें क्रूर यौन हमले और गंभीर शारीरिक चोटों का सामना करना पड़ा था। उन्हें केप टाउन के टाइगरबर्ग अस्पताल ले जाया गया, जहाँ उसी दिन बाद में उनकी मृत्यु हो गई।\n\nअत्यधिक हिंसा और पीड़िता की आयु मात्र 17 वर्ष होने के कारण इस घटना ने दक्षिण अफ्रीका को झकझोर दिया और अंतर्राष्ट्रीय ध्यान आकर्षित किया।\n\nन्यायिक कार्यवाही और जवाबदेही:\nआपराधिक मामले की सुनवाई स्वेलेंडम सर्किट में बैठने वाले वेस्टर्न केप हाई कोर्ट के समक्ष हुई। जोहानेस काना (Johannes Kana) पर बलात्कार और हत्या का आरोप लगाया गया।\n\n29 अक्टूबर 2013 को न्यायाधीश पैट्रिशिया गोलियथ (Judge Patricia Goliath) ने उन्हें दोनों अपराधों का दोषी पाया। 1 नवंबर 2013 को काना को दो आजीवन कारावास की सजा सुनाई गई (बलात्कार के लिए एक आजीवन कारावास और हत्या के लिए एक आजीवन कारावास, दोनों साथ-साथ चलने के आदेश के साथ)।\n\nअन्य व्यक्तियों को शुरू में इस मामले के संबंध में गिरफ्तार किया गया था, लेकिन पर्याप्त साक्ष्य न होने के कारण उनके खिलाफ आरोप वापस ले लिए गए।\n\nमहत्वपूर्ण संपादकीय अंतर: जोहानेस काना की दोषसिद्धि और सजा अदालती कार्यवाही द्वारा स्थापित हैं। अन्य व्यक्तियों को दोषी प्रतिभागियों के रूप में वर्णित न करें।",
              "editorialNotes": "प्रकाशन टिप्पणी: आपराधिक कार्यवाही, सरकारी प्रतिक्रिया और कौशल-केंद्र पहल को अदालती और सरकारी अभिलेखों का समर्थन प्राप्त है। एनीने के मामले और यौन अपराध न्यायालयों (Sexual Offences Courts) की पुनर्स्थापना के बीच ऐतिहासिक संबंध को स्पष्ट रूप से संदर्भित किया गया है: संबंधित सरकारी टास्क टीम की स्थापना उनकी मृत्यु से पहले जून 2012 में हुई थी। प्रस्तावित UltimateHealth बाल-संरक्षण मैनुअल एक नई शैक्षिक पहल है, न कि कोई मौजूदा सरकारी कार्यक्रम।",
              "verifiedFacts": [
                  "एनीने बूयसेन दक्षिण अफ्रीका के वेस्टर्न केप के ब्रेडसडॉर्प की 17 वर्षीय लड़की थीं, जो RDP घरों के निर्माण स्थल पर काम कर रही थीं।",
                  "2 फरवरी 2013 की सुबह वह ब्रेडसडॉर्प में एक निर्माण स्थल पर क्रूर यौन हमले के बाद गंभीर रूप से घायल मिलीं और उसी दिन केप टाउन के टाइगरबर्ग अस्पताल में उनकी मृत्यु हो गई।",
                  "29 अक्टूबर 2013 को वेस्टर्न केप हाई कोर्ट (स्वेलेंडम सर्किट) में न्यायाधीश पैट्रिशिया गोलियथ ने जोहानेस काना को बलात्कार और हत्या का दोषी ठहराया और 1 नवंबर 2013 को दो समवर्ती आजीवन कारावास की सजा सुनाई।",
                  "पर्याप्त साक्ष्य के अभाव में अन्य शुरुआती संदिग्धों के खिलाफ आरोप वापस ले लिए गए।",
                  "यौन अपराध न्यायालयों को फिर से स्थापित करने की औपचारिक प्रक्रिया जून 2012 में मंत्रिस्तरीय सलाहकार टास्क टीम के माध्यम से पहले ही शुरू हो चुकी थी, और पहला नवीनीकृत न्यायालय 23 अगस्त 2013 को बटरवर्थ में खुला।",
                  "ब्रेडसडॉर्प में R10 मिलियन के एनीने बूयसेन कौशल विकास केंद्र का भूमिपूजन 13 मार्च 2014 को हुआ और 28 जुलाई 2016 को मंत्री डॉ. ब्लेड न्ज़िमांडे द्वारा आधिकारिक तौर पर उद्घाटन किया गया; एनीने की माँ कोर्लिया ओलिवियर का मई 2014 में निधन हो गया।"
              ],
              "societalImpact": "एनीने की मृत्यु ने लिंग-आधारित हिंसा, बच्चों की सुरक्षा और आपराधिक न्याय प्रणाली की जिम्मेदारियों के बारे में व्यापक सार्वजनिक चिंता और राष्ट्रीय बहस को जन्म दिया।\n\nA. लिंग-आधारित हिंसा पर राष्ट्रीय ध्यान:\nदक्षिण अफ्रीकी राष्ट्रपति भवन ने फरवरी 2013 में सार्वजनिक रूप से इस अपराध की निंदा की। लैंगिक समानता आयोग ने भी यौन-हमले के मामलों की मजबूत निगरानी और अधिक प्रभावी जांच एवं अभियोजन का आह्वान किया।\n\nB. यौन अपराध न्यायालय (Sexual Offences Courts) — एक महत्वपूर्ण ऐतिहासिक अंतर:\nदक्षिण अफ्रीका के विशेष यौन अपराध न्यायालय पहली बार एनीने की हत्या के जवाब में नहीं बनाए गए थे। 1993 में वाइनबर्ग में पायलट कोर्ट के साथ इनकी शुरुआत हुई थी, और जून 2012 में न्याय विभाग ने इन्हें फिर से शुरू करने के लिए एक मंत्रिस्तरीय सलाहकार टास्क टीम का गठन किया था। नवीनीकृत कार्यक्रम के तहत पहला न्यायालय 23 अगस्त 2013 को बटरवर्थ, ईस्टर्न केप में खुला।\n\nC. थुथुज़ेला केयर सेंटर (Thuthuzela Care Centres) और उत्तरजीवी सहायता:\nये केंद्र यौन अपराधों के उत्तरजीवियों के लिए चिकित्सा सहायता, पुलिस रिपोर्टिंग, परामर्श और अदालती कार्यवाही की तैयारी जैसी समन्वित सेवाएँ प्रदान करते हैं।\n\nD. एक निरंतर विरासत — एनीने बूयसेन कौशल विकास केंद्र (Anene Booysen Skills Development Centre):\n13 मार्च 2014 को उच्च शिक्षा और प्रशिक्षण विभाग (DHET) ने इस R10 मिलियन की परियोजना का भूमिपूजन किया और 28 जुलाई 2016 को मंत्री डॉ. ब्लेड न्ज़िमांडे ने इसका आधिकारिक उद्घाटन किया। निर्माण के दौरान CETA ने व्यावहारिक प्रशिक्षण के लिए 75 स्थानीय शिक्षार्थियों की भर्ती की। मार्च 2014 में घोषणा की गई थी कि एनीने की माँ कोर्लिया ओलिवियर (Corlia Olivier) को प्रस्तावित केंद्र में हाउसकीपर के रूप में नियुक्त किया जाएगा, किंतु गंभीर बीमारी के कारण मई 2014 में केंद्र के खुलने से पहले ही उनका निधन हो गया।",
              "actionableLesson": "सामुदायिक बाल संरक्षण और अर्ध-शहरी युवा सुरक्षा:\n1. समुदाय-आधारित बाल संरक्षण: बच्चों के लिए दुर्व्यवहार और खतरों की रिपोर्ट करने हेतु सुलभ चैनल स्थापित करें और गोपनीयता की रक्षा करें।\n2. सुलभ सामाजिक-कार्य सहायता: ग्रामीण और अर्ध-शहरी समुदायों में प्रशिक्षित सामाजिक कार्यकर्ताओं और परामर्श तक पहुँच में सुधार करें।\n3. सुरक्षित सार्वजनिक और सामुदायिक स्थान: पैदल मार्गों और सामुदायिक केंद्रों के आसपास प्रकाश व्यवस्था में सुधार करें और युवाओं के लिए सुरक्षित मनोरंजन स्थान प्रदान करें।\n4. शिक्षा और आर्थिक अवसर: व्यावसायिक प्रशिक्षण और कौशल-विकास कार्यक्रमों तक पहुँच का विस्तार करें और उन्हें वास्तविक रोजगार अवसरों से जोड़ें।\n5. उत्तरजीवी-केंद्रित प्रतिक्रिया: चिकित्सा उपचार, मनोवैज्ञानिक सहायता और गोपनीयता सुनिश्चित करें तथा बार-बार पूछताछ से बचें।\n6. संस्थागत जवाबदेही: हिंसा और दुर्व्यवहार की रिपोर्टों की तुरंत जांच करें और बाल-संरक्षण सेवाओं की प्रभावशीलता की निगरानी करें।",
              "memorialPublication": {
                  "title": "सामुदायिक बाल संरक्षण और अर्ध-शहरी युवा सुरक्षा मैनुअल",
                  "focus": "बाल सुरक्षा · ग्रामीण सामुदायिक विकास · युवा शिक्षा · सामुदायिक हस्तक्षेप",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "उद्देश्य: स्थानीय संगठनों को सुरक्षा जोखिमों की पहचान करने, सहायता तक पहुँच सुधारने और बच्चों व युवाओं के लिए सुरक्षित वातावरण बनाने में मदद करने हेतु एक ओपन-सोर्स शैक्षिक संसाधन विकसित करना।\n\nप्रस्तावित टूलकिट घटक:\nA. बाल सुरक्षा ढाँचा (Child Safeguarding Framework)\nB. सामुदायिक सुरक्षा ऑडिट (Community Safety Audit)\nC. युवा विकास और कौशल पहुँच (Youth Development and Skills Access)\nD. सामाजिक सहायता और रेफरल निर्देशिका (Social Support and Referral Directory)\nE. सामुदायिक जवाबदेही ढाँचा (Community Accountability Framework)\n\nUltimateHealth का दृष्टिकोण: किसी युवा व्यक्ति का भविष्य उसके आसपास के समुदाय द्वारा सुरक्षित किया जाना चाहिए, उसे संयोग पर नहीं छोड़ा जाना चाहिए।"
              }
          },
          "bn": {
              "country": "দক্ষিণ আফ্রিকা",
              "categoryLabel": "শিশু সুরক্ষা ও যুব কমিউনিটি যত্ন",
              "roleAndField": "তরুণ কমিউনিটি সদস্য ও নির্মাণ শ্রমিক · ব্রেডাসডর্প, ওয়েস্টার্ন কেপ",
              "coreMessage": "শিশু এবং তরুণদের এমন সমাজে বেড়ে ওঠা উচিত যেখানে তাদের নিরাপত্তা, মর্যাদা এবং বিকাশ সুরক্ষিত থাকে। সহিংসতা প্রতিরোধের জন্য কেবল ফৌজদারি শাস্তিই যথেষ্ট নয়: এর জন্য প্রয়োজন সহজলভ্য শিক্ষা, কার্যকর শিশু-সুরক্ষা ব্যবস্থা, জবাবদিহিমূলক প্রতিষ্ঠান এবং নিরাপদ সামাজিক পরিবেশ।",
              "whoWasThisPerson": "আনেনে বুইসেন (Anene Booysen) ছিলেন দক্ষিণ আফ্রিকার ওয়েস্টার্ন কেপের ওভারবার্গ অঞ্চলের ব্রেডাসডর্প শহরের ১৭ বছর বয়সী এক কিশোরী।\n\nতিনি এমন এক শ্রমজীবী সম্প্রদায়ের অংশ ছিলেন যেখানে শিক্ষা, কর্মসংস্থান এবং তরুণদের জন্য সুযোগ পাওয়া বড় চ্যালেঞ্জ ছিল।\n\nআনেনে রিকনস্ট্রাকশন অ্যান্ড ডেভেলপমেন্ট প্রোগ্রাম (RDP)-এর ঘর নির্মাণের সাথে যুক্ত একটি নির্মাণ সাইটে কাজ করতেন। তাঁর মৃত্যু ব্রেডাসডর্প এবং দক্ষিণ আফ্রিকায় নারী ও মেয়েদের বিরুদ্ধে সহিংসতার বৃহত্তর সমস্যার প্রতি জাতীয় ও আন্তর্জাতিক মনোযোগ আকর্ষণ করে।\n\nসম্পাদকীয় পার্থক্য: নির্ভরযোগ্য প্রাতিষ্ঠানিক নথি তাঁর বয়স, সম্প্রদায় এবং নির্মাণ সাইটের সাথে সম্পর্ক নিশ্চিত করে। তাঁর শিক্ষাগত অর্জন বা ব্যক্তিগত উচ্চাকাঙ্ক্ষার অপ্রমাণিত বিবরণ যোগ করা থেকে বিরত থাকুন।",
              "contributions": "আনেনে ছিলেন তাঁর জীবনের শুরুতে থাকা একজন তরুণী, কোনো পাবলিক ফিগার বা প্রতিষ্ঠিত পেশাদার নন।\n\nতাঁর গল্প এমন সম্প্রদায়ের তরুণদের পরিস্থিতির প্রতি দৃষ্টি আকর্ষণ করেছে যেখানে দারিদ্র্য, বেকারত্ব, সীমিত সুযোগ এবং লিঙ্গ-ভিত্তিক সহিংসতা একত্রিত হয়।\n\nপরবর্তীতে তাঁর স্মৃতি একটি গুরুত্বপূর্ণ কমিউনিটি-উন্নয়ন উদ্যোগের সাথে যুক্ত হয়: আনেনে বুইসেন স্কিলস ডেভেলপমেন্ট সেন্টার (Anene Booysen Skills Development Centre)। এই উদ্যোগটি ব্রেডাসডর্প এবং এর আশেপাশের তরুণদের বৃত্তিমূলক শিক্ষা এবং দক্ষতা উন্নয়নের সুযোগ প্রদানের চেষ্টা করেছিল।",
              "factualContext": "২০১৩ সালের ২ ফেব্রুয়ারির ভোরবেলায় ব্রেডাসডর্পের একটি নির্মাণ সাইটে আনেনে বুইসেনকে গুরুতর আহত অবস্থায় পাওয়া যায়। তিনি নৃশংস যৌন নিপীড়ন এবং গুরুতর শারীরিক আঘাতের শিকার হয়েছিলেন। তাঁকে কেপ টাউনের টাইগারবার্গ হাসপাতালে নিয়ে যাওয়া হয়, যেখানে সেদিন পরেই তাঁর মৃত্যু হয়।\n\nবিচারিক কার্যক্রম ও জবাবদিহিতা:\nওয়েস্টার্ন কেপ হাই কোর্টের সোয়েলেনডাম সার্কিটে এই ফৌজদারি মামলার শুনানি হয়। জোহানেস কানা (Johannes Kana)-এর বিরুদ্ধে ধর্ষণ ও হত্যার অভিযোগ আনা হয়। ২০১৩ সালের ২৯ অক্টোবর বিচারপতি প্যাট্রিসিয়া গোলিয়াথ তাঁকে উভয় অপরাধে দোষী সাব্যস্ত করেন এবং ১ নভেম্বর ২০১৩ তারিখে তাঁকে দুটি যাবজ্জীবন কারাদণ্ড দেওয়া হয়। প্রমাণের অভাবে অন্যান্য সন্দেহভাজনদের বিরুদ্ধে অভিযোগ প্রত্যাহার করা হয়।",
              "editorialNotes": "প্রকাশনা নোট: ফৌজদারি কার্যক্রম, সরকারি প্রতিক্রিয়া এবং দক্ষতা-কেন্দ্র উদ্যোগটি আদালত ও সরকারি নথি দ্বারা সমর্থিত। আনেনের ঘটনা এবং যৌন অপরাধ আদালত (Sexual Offences Courts) পুনঃপ্রতিষ্ঠার ঐতিহাসিক সম্পর্কটি সুনির্দিষ্টভাবে উল্লেখ করা হয়েছে: সংশ্লিষ্ট সরকারি টাস্ক টিম তাঁর মৃত্যুর আগে ২০১২ সালের জুন মাসে গঠিত হয়েছিল।",
              "verifiedFacts": [
                  "আনেনে বুইসেন ছিলেন দক্ষিণ আফ্রিকার ওয়েস্টার্ন কেপের ব্রেডাসডর্পের ১৭ বছর বয়সী এক কিশোরী যিনি RDP আবাসন নির্মাণ সাইটে কাজ করতেন।",
                  "২০১৩ সালের ২ ফেব্রুয়ারি সকালে ব্রেডাসডর্পের একটি নির্মাণ সাইটে নৃশংস যৌন নিপীড়নের পর তাঁকে গুরুতর আহত অবস্থায় পাওয়া যায় এবং সেদিনই টাইগারবার্গ হাসপাতালে তাঁর মৃত্যু হয়।",
                  "২০১৩ সালের ২৯ অক্টোবর বিচারপতি প্যাট্রিসিয়া গোলিয়াথ জোহানেস কানাকে ধর্ষণ ও হত্যার দায়ে দোষী সাব্যস্ত করেন এবং ১ নভেম্বর ২০১৩ তারিখে দুটি যাবজ্জীবন কারাদণ্ড প্রদান করেন।",
                  "পর্যাপ্ত প্রমাণের অভাবে প্রাথমিকভাবে গ্রেপ্তার হওয়া অন্য সন্দেহভাজনদের বিরুদ্ধে অভিযোগ প্রত্যাহার করা হয়।",
                  "যৌন অপরাধ আদালত পুনঃপ্রতিষ্ঠার আনুষ্ঠানিক প্রক্রিয়া ২০১২ সালের জুন মাসে মিনিস্টারিয়াল অ্যাডভাইজরি টাস্ক টিমের মাধ্যমে শুরু হয়েছিল এবং প্রথম আদালতটি ২০১৩ সালের ২৩ আগস্ট বাটারওয়ার্থে চালু হয়।",
                  "ব্রেডাসডর্পে ১ কোটি র্যান্ড (R10 million) ব্যয়ে নির্মিত আনেনে বুইসেন স্কিলস ডেভেলপমেন্ট সেন্টারের ভিত্তিপ্রস্তর স্থাপিত হয় ১৩ মার্চ ২০১৪ এবং ২৮ জুলাই ২০১৬ তারিখে মন্ত্রী ড. ব্লেড নজিমান্ডে এর আনুষ্ঠানিক উদ্বোধন করেন; আনেনের মা কর্লিয়া অলিভিয়ার ২০১৪ সালের মে মাসে মারা যান।"
              ],
              "societalImpact": "A. লিঙ্গ-ভিত্তিক সহিংসতার প্রতি জাতীয় মনোযোগ: দক্ষিণ আফ্রিকার প্রেসিডেন্সি এবং লিঙ্গ সমতা কমিশন (CGE) এই অপরাধের নিন্দা জানায় এবং যৌন নিপীড়ন মামলার কার্যকর তদন্ত ও বিচারের আহ্বান জানায়।\n\nB. যৌন অপরাধ আদালত (Sexual Offences Courts) — একটি গুরুত্বপূর্ণ ঐতিহাসিক পার্থক্য: এই বিশেষ আদালতগুলো প্রথম ১৯৯৩ সালে ওয়াইনবার্গে শুরু হয়েছিল এবং ২০১২ সালের জুন মাসে বিচার বিভাগ এগুলো পুনরায় চালুর জন্য টাস্ক টিম গঠন করে। ২৩ আগস্ট ২০১৩ তারিখে বাটারওয়ার্থে প্রথম আদালতটি পুনরায় খোলা হয়।\n\nC. থুথুজেলা কেয়ার সেন্টার (Thuthuzela Care Centres): যৌন সহিংসতা থেকে বেঁচে ফেরা ব্যক্তিদের চিকিৎসা, আইনি ও মানসিক সহায়তা প্রদানের সমন্বিত কেন্দ্র।\n\nD. আনেনে বুইসেন স্কিলস ডেভেলপমেন্ট সেন্টার: ১৩ মার্চ ২০১৪ তারিখে ভিত্তিপ্রস্তর স্থাপনের পর ২৮ জুলাই ২০১৬ তারিখে ব্রেডাসডর্পে এই কেন্দ্রটি আনুষ্ঠানিকভাবে উদ্বোধন করা হয়। নির্মাণকালে ৭৫ জন স্থানীয় শিক্ষার্থীকে প্রশিক্ষণ দেওয়া হয়। আনেনের মা কর্লিয়া অলিভিয়ারকে কেন্দ্রের হাউসকিপার হিসেবে নিয়োগের ঘোষণা দেওয়া হলেও ২০১৪ সালের মে মাসে তাঁর মৃত্যু হয়।",
              "actionableLesson": "কমিউনিটি শিশু সুরক্ষা এবং উপ-শহুরে যুব নিরাপত্তা:\n১. কমিউনিটি-ভিত্তিক শিশু সুরক্ষা এবং নিরাপদ রিপোর্টিং চ্যানেল।\n২. গ্রামীণ ও উপ-শহুরে এলাকায় প্রশিক্ষিত সমাজকর্মী ও মানসিক সহায়তার সহজলভ্যতা।\n৩. নিরাপদ পাবলিক স্পেস, রাস্তার আলো এবং তরুণদের জন্য নিরাপদ বিনোদন কেন্দ্র।\n৪. বৃত্তিমূলক শিক্ষা এবং কর্মসংস্থানের সুযোগ সম্প্রসারণ।\n৫. ভুক্তভোগী-কেন্দ্রিক চিকিৎসা, মানসিক ও আইনি সহায়তা।\n৬. প্রাতিষ্ঠানিক জবাবদিহিতা এবং দ্রুত তদন্ত।",
              "memorialPublication": {
                  "title": "কমিউনিটি শিশু সুরক্ষা ও উপ-শহুরে যুব নিরাপত্তা ম্যানুয়াল",
                  "focus": "শিশু সুরক্ষা · গ্রামীণ কমিউনিটি উন্নয়ন · যুব শিক্ষা · কমিউনিটি হস্তক্ষেপ",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "শিশু সুরক্ষা কাঠামো, কমিউনিটি নিরাপত্তা অডিট, যুব দক্ষতা উন্নয়ন, সামাজিক সহায়তা ডিরেক্টরি এবং প্রাতিষ্ঠানিক জবাবদিহিতা কাঠামো সংবলিত একটি উন্মুক্ত শিক্ষামূলক ও কমিউনিটি রিসোর্স।"
              }
          },
          "ta": {
              "country": "தென்னாப்பிரிக்கா",
              "categoryLabel": "குழந்தைகள் பாதுகாப்பு மற்றும் இளைஞர் சமூகப் பராமரிப்பு",
              "roleAndField": "இளம் சமூக உறுப்பினர் மற்றும் கட்டுமானத் தொழிலாளி · பிரெடாஸ்டார்ப், வெஸ்டர்ன் கேப்",
              "coreMessage": "குழந்தைகளும் இளைஞர்களும் தங்கள் பாதுகாப்பு, கண்ணியம் மற்றும் வளர்ச்சி பாதுகாக்கப்படும் சமூகங்களில் வளர வேண்டும். வன்முறையைத் தடுக்க குற்றவியல் தண்டனை மட்டும் போதாது: அதற்கு அணுகக்கூடிய கல்வி, பயனுள்ள குழந்தைகள் பாதுகாப்பு அமைப்புகள், பொறுப்புக்கூறும் நிறுவனங்கள் மற்றும் பாதுகாப்பான சமூகச் சூழல்கள் தேவை.",
              "whoWasThisPerson": "அனென் பூய்சன் (Anene Booysen) தென்னாப்பிரிக்காவின் வெஸ்டர்ன் கேப்பில் உள்ள பிரெடாஸ்டார்ப் நகரைச் சேர்ந்த 17 வயது பெண்.\n\nஅவர் மறுசீரமைப்பு மற்றும் மேம்பாட்டுத் திட்ட (RDP) வீடுகளைக் கட்டும் கட்டுமானத் தளத்தில் பணியாற்றி வந்தார். அவரது மரணம் தென்னாப்பிரிக்காவில் பெண்கள் மற்றும் சிறுமிகளுக்கு எதிரான வன்முறை குறித்த தேசிய மற்றும் சர்வதேச கவனத்தை ஈர்த்தது.",
              "contributions": "அனென் தனது வாழ்க்கையின் தொடக்கத்தில் இருந்த ஒரு இளம் பெண். அவரது நினைவு பிரெடாஸ்டார்ப்பில் உள்ள இளைஞர்களுக்கு தொழிற்கல்வி மற்றும் திறன் மேம்பாட்டு வாய்ப்புகளை வழங்க உருவாக்கப்பட்ட 'அனென் பூய்சன் திறன் மேம்பாட்டு மையத்துடன்' (Anene Booysen Skills Development Centre) இணைக்கப்பட்டது.",
              "factualContext": "2 பிப்ரவரி 2013 அன்று அதிகாலையில் பிரெடாஸ்டார்ப்பில் உள்ள ஒரு கட்டுமானத் தளத்தில் கொடூரமான பாலியல் தாக்குதலுக்குள்ளாகி பலத்த காயங்களுடன் கண்டெடுக்கப்பட்ட அனென் பூய்சன், அன்று பிற்பகல் கேப் டவுனில் உள்ள டைகர்பெர்க் மருத்துவமனையில் உயிரிழந்தார்.\n\nநீதித்துறை நடவடிக்கைகள்: வெஸ்டர்ன் கேப் உயர் நீதிமன்றத்தில் (ஸ்வெல்லெண்டம் சர்க்யூட்) நீதிபதி பாட்ரிசியா கோலியாத் 29 அக்டோபர் 2013 அன்று ஜோகன்னஸ் கானா (Johannes Kana) என்பவரை பாலியல் வன்கொடுமை மற்றும் கொலைக் குற்றவாளியாகத் தீர்ப்பளித்தார், மேலும் 1 நவம்பர் 2013 அன்று அவருக்கு দুটি ஆயுள் தண்டனைகள் விதிக்கப்பட்டன. போதிய ஆதாரங்கள் இல்லாததால் மற்ற சந்தேக நபர்கள் மீதான குற்றச்சாட்டுகள் திரும்பப் பெறப்பட்டன.",
              "editorialNotes": "வெளியீட்டுக் குறிப்பு: தென்னாப்பிரிக்காவின் பாலியல் குற்ற நீதிமன்றங்களை (Sexual Offences Courts) மீண்டும் நிறுவும் பணி அனெனின் மரணத்திற்கு முன்பே ஜூன் 2012 இல் தொடங்கப்பட்டது. அனென் பூய்சன் திறன் மேம்பாட்டு மையம் 28 ஜூலை 2016 அன்று அதிகாரப்பூர்வமாகத் திறக்கப்பட்டது.",
              "verifiedFacts": [
                  "அனென் பூய்சன் தென்னாப்பிரிக்காவின் வெஸ்டர்ன் கேப்பில் உள்ள பிரெடாஸ்டார்ப்பைச் சேர்ந்த 17 வயது இளம் பெண்.",
                  "2 பிப்ரவரி 2013 அன்று கட்டுமானத் தளத்தில் தாக்கப்பட்ட அவர், கேப் டவுன் டைகர்பெர்க் மருத்துவமனையில் உயிரிழந்தார்.",
                  "29 அக்டோபர் 2013 அன்று நீதிபதி பாட்ரிசியா கோலியாத் ஜோகன்னஸ் கானாவை குற்றவாளியாகத் தீர்ப்பளித்து, 1 நவம்பர் 2013 அன்று இரட்டை ஆயுள் தண்டனை விதித்தார்.",
                  "போதுமான ஆதாரங்கள் இல்லாததால் மற்ற சந்தேக நபர்கள் மீதான குற்றச்சாட்டுகள் கைவிடப்பட்டன.",
                  "பாலியல் குற்ற நீதிமன்றங்களை மீண்டும் அமைக்கும் பணி ஜூன் 2012 இல் தொடங்கப்பட்டு, முதல் நீதிமன்றம் 23 ஆகஸ்ட் 2013 அன்று பட்டர்வொர்த்தில் திறக்கப்பட்டது.",
                  "R10 மில்லியன் மதிப்பிலான அனென் பூய்சன் திறன் மேம்பாட்டு மையம் 13 மார்ச் 2014 அன்று தொடங்கப்பட்டு 28 ஜூலை 2016 அன்று திறக்கப்பட்டது; அவரது தாயார் கோர்லியா ஆலிவியர் மே 2014 இல் காலமானார்."
              ],
              "societalImpact": "A. பாலின அடிப்படையிலான வன்முறை மீதான தேசிய கவனம்.\nB. பாலியல் குற்ற நீதிமன்றங்கள் (ஜூன் 2012 பணிக்குழு மற்றும் ஆகஸ்ட் 2013 மறுதொடக்கம்).\nC. துத்துசேலா பராமரிப்பு மையங்கள் (Thuthuzela Care Centres).\nD. அனென் பூய்சன் திறன் மேம்பாட்டு மையம் (28 ஜூலை 2016 அன்று திறக்கப்பட்டது, கட்டுமானத்தின் போது 75 உள்ளூர் இளைஞர்களுக்குப் பயிற்சி அளிக்கப்பட்டது) மற்றும் அவரது தாயார் கோர்லியா ஆலிவியரின் நினைவு.",
              "actionableLesson": "1. சமூக அடிப்படையிலான குழந்தைகள் பாதுகாப்பு.\n2. அணுகக்கூடிய சமூகப் பணி ஆதரவு.\n3. பாதுகாப்பான பொது மற்றும் சமூக இடங்கள்.\n4. தொழிற்கல்வி மற்றும் பொருளாதார வாய்ப்புகள்.\n5. பாதிக்கப்பட்டவர்களை மையமாகக் கொண்ட ஆதரவு.\n6. நிறுவனப் பொறுப்புக்கூறல்.",
              "memorialPublication": {
                  "title": "சமூக குழந்தைகள் பாதுகாப்பு மற்றும் புறநகர் இளைஞர் பாதுகாப்பு கையேடு",
                  "focus": "குழந்தைகள் பாதுகாப்பு · கிராமப்புற சமூக மேம்பாடு · இளைஞர் கல்வி · சமூக தலையீடு",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "குழந்தைகள் பாதுகாப்பு கட்டமைப்பு, சமூக பாதுகாப்பு தணிக்கை, இளைஞர் திறன் மேம்பாடு மற்றும் சமூகப் பொறுப்புக்கூறலுக்கான திறந்தநிலை வழிகாட்டி."
              }
          },
          "or": {
              "country": "ଦକ୍ଷିଣ ଆଫ୍ରିକା",
              "categoryLabel": "ଶିଶୁ ସୁରକ୍ଷା ଏବଂ ଯୁବ ଗୋଷ୍ଠୀ ଯତ୍ନ",
              "roleAndField": "ଯୁବ ଗୋଷ୍ଠୀ ସଦସ୍ୟ ଏବଂ ନିର୍ମାଣ ଶ୍ରମିକ · ବ୍ରେଡାସଡର୍ପ, ୱେଷ୍ଟର୍ଣ୍ଣ କେପ୍",
              "coreMessage": "ଶିଶୁ ଏବଂ ଯୁବକମାନେ ଏପରି ସମାଜରେ ବଢ଼ିବା ଉଚିତ୍ ଯେଉଁଠାରେ ସେମାନଙ୍କର ସୁରକ୍ଷା, ମର୍ଯ୍ୟାଦା ଏବଂ ବିକାଶ ସୁରକ୍ଷିତ ରହେ। ହିଂସା ରୋକିବା ପାଇଁ କେବଳ ଅପରାଧିକ ଦଣ୍ଡ ଯଥେଷ୍ଟ ନୁହେଁ: ଏଥିପାଇଁ ସୁଲଭ ଶିକ୍ଷା, ପ୍ରଭାବଶାଳୀ ଶିଶୁ-ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା, ଉତ୍ତରଦାୟୀ ଅନୁଷ୍ଠାନ ଏବଂ ସୁରକ୍ଷିତ ଗୋଷ୍ଠୀ ପରିବେଶ ଆବଶ୍ୟକ।",
              "whoWasThisPerson": "ଆନେନେ ବୁଇସେନ୍ (Anene Booysen) ଦକ୍ଷିଣ ଆଫ୍ରିକାର ୱେଷ୍ଟର୍ଣ୍ଣ କେପ୍ ଅଞ୍ଚଳର ବ୍ରେଡାସଡର୍ପ ସହରର ଜଣେ ୧୭ ବର୍ଷୀୟା ବାଳିକା ଥିଲେ। ସେ RDP ଗୃହ ନିର୍ମାଣ ସ୍ଥଳରେ କାର୍ଯ୍ୟ କରୁଥିଲେ। ତାଙ୍କର ମୃତ୍ୟୁ ଦକ୍ଷିଣ ଆଫ୍ରିକାରେ ମହିଳା ଓ ବାଳିକାଙ୍କ ବିରୁଦ୍ଧରେ ହେଉଥିବା ହିଂସା প্রতি ଜାତୀୟ ଓ ଆନ୍ତର୍ଜାତୀୟ ଧ୍ୟାନ ଆକର୍ଷଣ କରିଥିଲା।",
              "contributions": "ଆନେନେଙ୍କ ସ୍ମୃତି ବ୍ରେଡାସଡର୍ପରେ ଯୁବକମାନଙ୍କୁ ଧନ୍ଦାମୂଳକ ଶିକ୍ଷା ଏବଂ ଦକ୍ଷତା ବିକାଶ ସୁଯୋଗ ପ୍ରଦାନ କରିବା ପାଇଁ ସ୍ଥାପିତ 'ଆନେନେ ବୁଇସେନ୍ ସ୍କିଲ୍ସ ଡେଭଲପମେଣ୍ଟ ସେଣ୍ଟର' ସହିତ ଜଡ଼ିତ ହେଲା।",
              "factualContext": "୨ ଫେବୃଆରୀ ୨୦୧୩ ଭୋର ସମୟରେ ବ୍ରେଡାସଡର୍ପର ଏକ ନିର୍ମାଣ ସ୍ଥଳରେ ଆନେନେ ବୁଇସେନ୍ ଗୁରୁତର ଆହତ ଅବସ୍ଥାରେ ମିଳିଥିଲେ ଏବଂ ସେହିଦିନ କେପ୍ ଟାଉନର ଟାଇଗରବର୍ଗ ହସ୍ପିଟାଲରେ ତାଙ୍କର ମୃତ୍ୟୁ ଘଟିଥିଲା।\n\nନ୍ୟାୟିକ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ: ୨୯ ଅକ୍ଟୋବର ୨୦୧୩ ରେ ବିଚାରପତି ପ୍ୟାଟ୍ରିସିଆ ଗୋଲିଆଥ୍ ଜୋହାନେସ୍ କାନା (Johannes Kana)ଙ୍କୁ ଦୁଷ୍କର୍ମ ଓ ହତ୍ୟା ପାଇଁ ଦୋଷୀ ସାବ୍ୟସ୍ତ କରିଥିଲେ ଏବଂ ୧ ନଭେମ୍ବର ୨୦୧୩ ରେ ତାଙ୍କୁ ଦୁଇଟି ଆଜୀବନ କାରାଦଣ୍ଡରେ ଦଣ୍ଡିତ କରାଯାଇଥିଲା। ପ୍ରମାଣ ଅଭାବରୁ ଅନ୍ୟ ସନ୍ଦିଗ୍ଧମାନଙ୍କ ବିରୁଦ୍ଧରେ ଅଭିଯୋଗ ପ୍ରତ୍ୟାହାର କରାଯାଇଥିଲା।",
              "editorialNotes": "ପ୍ରକାଶନ ଟିପ୍ପଣୀ: ଦକ୍ଷିଣ ଆଫ୍ରିକার ଯୌନ ଅପରାଧ ନ୍ୟାୟାଳୟ (Sexual Offences Courts) ପୁନଃସ୍ଥାପନ ପ୍ରକ୍ରିୟା ଆନେନେଙ୍କ ମୃତ୍ୟୁ ପୂର୍ବରୁ ଜୁନ୍ ୨୦୧୨ ରେ ଆରମ୍ଭ ହୋଇଥିଲା। ଆନେନେ ବୁଇସେନ୍ ଦକ୍ଷତା ବିକାଶ କେନ୍ଦ୍ର ୨୮ ଜୁଲାଇ ୨୦୧୬ ରେ ଆନୁଷ୍ଠାନିକ ଭାବରେ ଉଦଘାଟିତ ହୋଇଥିଲା।",
              "verifiedFacts": [
                  "ଆନେନେ ବୁଇସେନ୍ ଦକ୍ଷିଣ ଆଫ୍ରିକାର ବ୍ରେଡାସଡର୍ପର ଜଣେ ୧୭ ବର୍ଷୀୟା ବାଳିକା ଥିଲେ ଯିଏ RDP ଗୃହ ନିର୍ମାଣ ସ୍ଥଳରେ କାମ କରୁଥିଲେ।",
                  "୨ ଫେବୃଆରୀ ୨୦୧୩ ରେ ଏକ ନିର୍ମାଣ ସ୍ଥଳରେ କ୍ରୂର ଯୌନ ଆକ୍ରମଣ ପରେ ସେହିଦିନ ଟାଇଗରବର୍ଗ ହସ୍ପିଟାଲରେ ତାଙ୍କର ମୃତ୍ୟୁ ହୋଇଥିଲା।",
                  "୨୯ ଅକ୍ଟୋବର ୨୦୧୩ ରେ ବିଚାରପତି ପ୍ୟାଟ୍ରିସିଆ ଗୋଲିଆଥ୍ ଜୋହାନେସ୍ କାନାଙ୍କୁ ଦୋଷୀ ସାବ୍ୟସ୍ତ କରି ୧ ନଭେମ୍ବର ୨୦୧୩ ରେ ଦୁଇଟି ଆଜୀବନ କାରାଦଣ୍ଡ ଦେଇଥିଲେ।",
                  "ପ୍ରମାଣ ଅଭାବରୁ ଅନ୍ୟ ପ୍ରାରମ୍ଭିକ ସନ୍ଦିଗ୍ଧମାନଙ୍କ ବିରୁଦ୍ଧରେ ଅଭିଯୋଗ ପ୍ରତ୍ୟାହାର କରାଯାଇଥିଲା।",
                  "ଯୌନ ଅପରାଧ ନ୍ୟାୟାଳୟ ପୁନଃସ୍ଥାପନ ପାଇଁ ଜୁନ୍ ୨୦୧୨ ରେ ଟାସ୍କ ଟିମ୍ ଗଠିତ ହୋଇଥିଲା ଏବଂ ୨୩ ଅଗଷ୍ଟ ୨୦୧୩ ରେ ବଟରୱର୍ଥରେ ପ୍ରଥମ କୋର୍ଟ ଖୋଲିଥିଲା।",
                  "ବ୍ରେଡାସଡର୍ପରେ R10 ମିଲିୟନର ଆନେନେ ବୁଇସେନ୍ ସ୍କିଲ୍ସ ଡେଭଲପମେଣ୍ଟ ସେଣ୍ଟର ୧୩ ମାର୍ଚ୍ଚ ୨୦୧୪ ରେ ଆରମ୍ଭ ହୋଇ ୨୮ ଜୁଲାଇ ୨୦୧୬ ରେ ଉଦଘାଟିତ ହୋଇଥିଲା; ତାଙ୍କ ମା’ କର୍লিଆ ଅଲିଭିୟରଙ୍କର ମେ ୨୦୧୪ ରେ ପରଲୋକ ହୋଇଥିଲା।"
              ],
              "societalImpact": "A. ଲିଙ୍ଗ-ଭିତ୍ତିକ ହିଂସା ପ୍ରତି ଜାତୀୟ ଧ୍ୟାନ।\nB. ଯୌନ ଅପରାଧ ନ୍ୟାୟାଳୟ (ଜୁନ୍ ୨୦୧୨ ଟାସ୍କ ଟିମ୍ ଏବଂ ଅଗଷ୍ଟ ୨୦୧୩ ପୁନଃସ୍ଥାପନ)।\nC. ଥୁଥୁଜେଲା କେୟାର ସେଣ୍ଟର (Thuthuzela Care Centres)।\nD. ଆନେନେ ବୁଇସେନ୍ ଦକ୍ଷତା ବିକାଶ କେନ୍ଦ୍ର (୨୮ ଜୁଲାଇ ୨୦୧୬ ରେ ଉଦଘାଟିତ, ୭୫ ଜଣ ସ୍ଥାନୀୟ ଶିକ୍ଷାର୍ଥୀଙ୍କୁ ତାଲିମ) ଏବଂ ତାଙ୍କ ମା’ କର୍ଲିଆ ଅଲିଭିୟରଙ୍କ ସ୍ମୃତି।",
              "actionableLesson": "୧. ଗୋଷ୍ଠୀ-ଭିତ୍ତିକ ଶିଶୁ ସୁରକ୍ଷା।\n୨. ସୁଲଭ ସାମାଜିକ-କାର୍ଯ୍ୟ ସହାୟତା।\n୩. ସୁରକ୍ଷିତ ସାର୍ବଜନୀନ ଏବଂ ଗୋଷ୍ଠୀ ସ୍ଥାନ।\n୪. ଧନ୍ଦାମୂଳକ ଶିକ୍ଷା ଏବଂ ଅର୍ଥନୈତିକ ସୁଯୋଗ।\n୫. ଉତ୍ତରଜୀବୀ-କେନ୍ଦ୍ରିକ ପ୍ରତିକ୍ରିୟା।\n୬. ଆନୁଷ୍ଠାନିକ ଉତ୍ତରଦାୟିତ୍ୱ।",
              "memorialPublication": {
                  "title": "ଗୋଷ୍ଠୀ ଶିଶୁ ସୁରକ୍ଷା ଏବଂ ଉପ-ସହରୀ ଯୁବ ସୁରକ୍ଷା ମାନୁଆଲ୍",
                  "focus": "ଶିଶୁ ସୁରକ୍ଷା · ଗ୍ରାମୀଣ ଗୋଷ୍ଠୀ ବିକାଶ · ଯୁବ ଶିକ୍ଷା · ଗୋଷ୍ଠୀ ହସ୍ତକ୍ଷେପ",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ଶିଶୁ ସୁରକ୍ଷା, ଗୋଷ୍ଠୀ ସୁରକ୍ଷା ଅଡିଟ୍, ଯୁବ ଦକ୍ଷତା ବିକାଶ ଏବଂ ଆନୁଷ୍ଠାନିକ ଉତ୍ତରଦାୟିତ୍ୱ ପାଇଁ ଏକ ମୁକ୍ତ ଶିକ୍ଷଣୀୟ ସାଧନ।"
              }
          },
          "de": {
              "country": "Südafrika",
              "categoryLabel": "Kinderschutz & Jugend-Gemeinschaftsfürsorge",
              "roleAndField": "Junges Gemeindemitglied & Bauarbeiterin · Bredasdorp, Westkap",
              "coreMessage": "Kinder und Jugendliche müssen in Gemeinschaften aufwachsen, in denen ihre Sicherheit, ihre Würde und ihre Entwicklung geschützt sind. Gewaltprävention erfordert mehr als strafrechtliche Sanktionen: Sie braucht zugängliche Bildung, wirksame Kinderschutzsysteme, rechenschaftspflichtige Institutionen und ein sicheres Lebensumfeld.",
              "whoWasThisPerson": "Anene Booysen war ein 17-jähriges Mädchen aus Bredasdorp, einer Stadt in der Region Overberg in der südafrikanischen Provinz Westkap.\n\nSie gehörte einer Arbeitergemeinde an, in der der Zugang zu Bildung, Beschäftigung und Perspektiven für junge Menschen eine große Herausforderung darstellte.\n\nAnene arbeitete auf einer Baustelle, auf der Häuser im Rahmen des Reconstruction and Development Programme (RDP) errichtet wurden. Ihr Tod lenkte die nationale und internationale Aufmerksamkeit auf Bredasdorp und das umfassendere Problem der Gewalt gegen Frauen und Mädchen in Südafrika.\n\nRedaktionelle Differenzierung: Verlässliche institutionelle Quellen belegen ihr Alter, ihre Gemeinde und ihre Tätigkeit auf der Baustelle. Unbelegte Angaben über schulische Leistungen oder berufliche Pläne werden bewusst nicht hinzugefügt.",
              "contributions": "Anene stand am Beginn ihres Lebens und war keine Person des öffentlichen Lebens. Ihre Geschichte lenkte den Blick auf die Lebensrealität junger Menschen in Gemeinden, in denen Armut, Arbeitslosigkeit, fehlende Perspektiven und geschlechtsspezifische Gewalt zusammentreffen.\n\nDas Gedenken an sie wurde später mit einer wichtigen Gemeindeentwicklungsinitiative verbunden: dem Anene Booysen Skills Development Centre in Bredasdorp, das berufliche Bildung und Qualifizierungsmöglichkeiten für Jugendliche in der Region schaffen sollte.",
              "factualContext": "In den frühen Morgenstunden des 2. Februar 2013 wurde Anene Booysen schwer verletzt auf einer Baustelle in Bredasdorp aufgefunden. Sie war Opfer eines brutalen sexuellen Übergriffs geworden und starb noch am selben Tag im Tygerberg Hospital in Kapstadt.\n\nGerichtsverfahren und Rechenschaftspflicht:\nDer Strafprozess fand vor dem Western Cape High Court (Swellendam Circuit) statt. Am 29. Oktober 2013 sprach Richterin Patricia Goliath den Angeklagten Johannes Kana wegen Vergewaltigung und Mordes schuldig (S v Kana [2013] ZAWCHC 33). Am 1. November 2013 wurde Kana zu zwei lebenslangen Freiheitsstrafen verurteilt. Verfahren gegen weitere zunächst festgenommene Verdächtige wurden mangels ausreichender Beweise eingestellt.",
              "editorialNotes": "Publikationshinweis: Die Wiedereinführung spezialisierter Gerichte für Sexualdelikte (Sexual Offences Courts) in Südafrika wurde bereits im Juni 2012 durch ein ministerielles Beratungsteam eingeleitet, also vor Anenes Tod. Das Anene Booysen Skills Development Centre wurde am 28. Juli 2016 offiziell eröffnet.",
              "verifiedFacts": [
                  "Anene Booysen war eine 17-jährige Jugendliche aus Bredasdorp (Westkap, Südafrika), die auf einer RDP-Wohnungsbaustelle arbeitete.",
                  "Am 2. Februar 2013 wurde sie nach einem schweren sexuellen Übergriff auf einer Baustelle in Bredasdorp schwer verletzt aufgefunden und starb am selben Tag im Tygerberg Hospital in Kapstadt.",
                  "Am 29. Oktober 2013 verurteilte Richterin Patricia Goliath vor dem Western Cape High Court (Swellendam Circuit) Johannes Kana wegen Vergewaltigung und Mordes; am 1. November 2013 erhielt er zwei lebenslange Haftstrafen.",
                  "Die Anklagen gegen andere zunächst festgenommene Verdächtige wurden mangels Beweisen fallen gelassen.",
                  "Der formelle Prozess zur Wiedereinführung der Sexual Offences Courts begann bereits im Juni 2012 durch eine Ministerial Advisory Task Team; das erste erneuerte Gericht öffnete am 23. August 2013 in Butterworth.",
                  "Das mit 10 Mio. Rand geförderte Anene Booysen Skills Development Centre in Bredasdorp hatte am 13. März 2014 seinen ersten Spatenstich und wurde am 28. Juli 2016 von Minister Dr. Blade Nzimande offiziell eröffnet; Anenes Mutter Corlia Olivier verstarb im Mai 2014 vor der Eröffnung."
              ],
              "societalImpact": "A. Nationale Aufmerksamkeit für geschlechtsspezifische Gewalt durch das südafrikanische Präsidialamt und die Commission for Gender Equality.\nB. Sexual Offences Courts — Wichtige historische Einordnung: Der Prozess zur Wiedereinführung begann bereits im Juni 2012 (Pilotgericht 1993 in Wynberg; Wiedereröffnung des ersten Gerichts am 23. August 2013 in Butterworth).\nC. Thuthuzela Care Centres zur koordinierten medizinischen, psychologischen und rechtlichen Unterstützung Überlebender.\nD. Anene Booysen Skills Development Centre (Spatenstich am 13. März 2014, offizielle Eröffnung am 28. Juli 2016, praktische Ausbildung von 75 lokalen Lernenden durch CETA) sowie Gedenken an ihre Mutter Corlia Olivier († Mai 2014).",
              "actionableLesson": "1. Gemeindebasierter Kinderschutz und sichere Meldewege.\n2. Zugängliche Sozialarbeit in ländlichen und stadtnahen Gemeinden.\n3. Sicherere öffentliche Räume, Beleuchtung und Jugendfreizeiteinrichtungen.\n4. Zugang zu beruflicher Bildung und wirtschaftlichen Perspektiven.\n5. Überlebendenzentrierte medizinische, psychologische und rechtliche Hilfe.\n6. Institutionelle Rechenschaftspflicht und transparente Schutzindikatoren.",
              "memorialPublication": {
                  "title": "Handbuch für kommunalen Kinderschutz und Jugendsicherheit im stadtnahen Raum",
                  "focus": "Kinderschutz · Ländliche Gemeindeentwicklung · Jugendbildung · Kommunale Intervention",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Ein quelloffenes Bildungs- und Gemeindehandbuch mit Kinderschutz-Rahmenwerk, kommunalem Sicherheitsaudit, Zugang zu Berufsausbildung, Überweisungsverzeichnis und Rechenschaftsrahmen."
              }
          },
          "es": {
              "country": "Sudáfrica",
              "categoryLabel": "Protección Infantil y Cuidado Comunitario Juvenil",
              "roleAndField": "Joven Miembro de la Comunidad y Trabajadora de la Construcción · Bredasdorp, Cabo Occidental",
              "coreMessage": "Los niños y los jóvenes deben crecer en comunidades donde se protejan su seguridad, su dignidad y su desarrollo. Prevenir la violencia requiere más que el castigo penal: exige educación accesible, sistemas eficaces de protección infantil, instituciones responsables y entornos comunitarios seguros.",
              "whoWasThisPerson": "Anene Booysen era una joven de 17 años de Bredasdorp, una localidad de la región de Overberg en el Cabo Occidental de Sudáfrica.\n\nFormaba parte de una comunidad de clase trabajadora en la que el acceso a la educación, el empleo y las oportunidades para los jóvenes seguía siendo un desafío importante.\n\nAnene trabajaba en una obra dedicada a la construcción de viviendas del Programa de Reconstrucción y Desarrollo (RDP). Su muerte atrajo la atención nacional e internacional hacia Bredasdorp y hacia el problema más amplio de la violencia contra las mujeres y las niñas en Sudáfrica.\n\nDistinción editorial: Los registros institucionales fiables establecen su edad, su comunidad y su vínculo con la obra de construcción. Evítese añadir descripciones no verificadas sobre logros académicos o planes profesionales.",
              "contributions": "Anene era una joven al comienzo de su vida, no una figura pública. Su historia puso de relieve las circunstancias que enfrentan los jóvenes en comunidades donde convergen la pobreza, el desempleo, la falta de oportunidades y la violencia de género.\n\nPosteriormente, su memoria quedó vinculada a una importante iniciativa de desarrollo comunitario: el Centro de Desarrollo de Habilidades Anene Booysen (Anene Booysen Skills Development Centre), destinado a ofrecer formación profesional a jóvenes de Bredasdorp y sus alrededores.",
              "factualContext": "En la madrugada del 2 de febrero de 2013, Anene Booysen fue hallada gravemente herida en una obra en construcción en Bredasdorp tras sufrir una brutal agresión sexual y graves lesiones físicas. Fue trasladada al Hospital Tygerberg en Ciudad del Cabo, donde falleció ese mismo día.\n\nProcedimientos judiciales y rendición de cuentas:\nEl caso penal se vio ante el Tribunal Superior del Cabo Occidental (Circuito de Swellendam). El 29 de octubre de 2013, la jueza Patricia Goliath declaró a Johannes Kana culpable de violación y asesinato (S v Kana [2013] ZAWCHC 33), y el 1 de noviembre de 2013 fue condenado a dos cadenas perpetuas concurrentes. Los cargos contra otros sospechosos detenidos inicialmente fueron retirados por falta de pruebas suficientes.",
              "editorialNotes": "Nota de publicación: El proceso formal para restablecer los Tribunales de Delitos Sexuales (Sexual Offences Courts) en Sudáfrica comenzó en junio de 2012 mediante un equipo de trabajo ministerial, antes de la muerte de Anene. El Centro de Desarrollo de Habilidades Anene Booysen se inauguró oficialmente el 28 de julio de 2016.",
              "verifiedFacts": [
                  "Anene Booysen era una joven de 17 años de Bredasdorp, Cabo Occidental (Sudáfrica), que trabajaba en una obra de viviendas del programa RDP.",
                  "El 2 de febrero de 2013 fue hallada gravemente herida en una obra en Bredasdorp tras una brutal agresión sexual y falleció ese mismo día en el Hospital Tygerberg de Ciudad del Cabo.",
                  "El 29 de octubre de 2013, la jueza Patricia Goliath condenó a Johannes Kana por violación y asesinato ante el Tribunal Superior del Cabo Occidental, imponiéndole dos cadenas perpetuas el 1 de noviembre de 2013.",
                  "Los cargos contra otros sospechosos arrestados inicialmente se retiraron por falta de pruebas.",
                  "El proceso para restablecer los Tribunales de Delitos Sexuales comenzó en junio de 2012 y el primer tribunal renovado abrió en Butterworth el 23 de agosto de 2013.",
                  "El Centro de Desarrollo de Habilidades Anene Booysen (inversión de 10 millones de rands) inició sus obras el 13 de marzo de 2014 y fue inaugurado el 28 de julio de 2016 por el ministro Dr. Blade Nzimande; la madre de Anene, Corlia Olivier, falleció en mayo de 2014."
              ],
              "societalImpact": "A. Atención nacional a la violencia de género por parte de la Presidencia sudafricana y la Comisión para la Igualdad de Género.\nB. Tribunales de Delitos Sexuales — Distinción histórica importante: El equipo de trabajo ministerial se creó en junio de 2012 y el primer tribunal renovado se inauguró en Butterworth el 23 de agosto de 2013.\nC. Centros de Atención Thuthuzela (Thuthuzela Care Centres) de apoyo integral a supervivientes.\nD. Centro de Desarrollo de Habilidades Anene Booysen (primera piedra el 13 de marzo de 2014, inauguración oficial el 28 de julio de 2016 con formación práctica para 75 jóvenes locales) y recuerdo digno de su madre, Corlia Olivier († mayo de 2014).",
              "actionableLesson": "1. Protección infantil comunitaria y canales seguros de denuncia.\n2. Acceso a trabajadores sociales en comunidades rurales y periurbanas.\n3. Espacios públicos y comunitarios más seguros e iluminados.\n4. Educación vocacional y oportunidades económicas para jóvenes.\n5. Respuesta centrada en los supervivientes con apoyo médico y psicológico.\n6. Responsabilidad institucional y seguimiento de los servicios de protección infantil.",
              "memorialPublication": {
                  "title": "Manual de Protección Infantil Comunitaria y Seguridad Juvenil Periurbana",
                  "focus": "Salvaguardia Infantil · Desarrollo Comunitario Rural · Educación Juvenil · Intervención Comunitaria",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Un recurso educativo abierto con marco de protección infantil, auditoría de seguridad comunitaria, acceso a formación profesional, directorio de derivación social y rendición de cuentas."
              }
          },
          "fr": {
              "country": "Afrique du Sud",
              "categoryLabel": "Protection de l'enfance et soutien communautaire à la jeunesse",
              "roleAndField": "Jeune membre de la communauté et ouvrière du bâtiment · Bredasdorp, Cap-Occidental",
              "coreMessage": "Les enfants et les jeunes doivent grandir dans des communautés où leur sécurité, leur dignité et leur développement sont protégés. Prévenir la violence exige bien plus que des sanctions pénales : cela nécessite une éducation accessible, des systèmes efficaces de protection de l'enfance, des institutions responsables et des environnements communautaires sûrs.",
              "whoWasThisPerson": "Anene Booysen était une jeune fille de 17 ans originaire de Bredasdorp, une ville de la région de l'Overberg dans la province du Cap-Occidental en Afrique du Sud.\n\nElle faisait partie d'une communauté ouvrière où l'accès à l'éducation, à l'emploi et aux perspectives d'avenir pour les jeunes demeurait un défi majeur.\n\nAnene travaillait sur un chantier de construction de logements relevant du Programme de reconstruction et de développement (RDP). Sa mort a attiré l'attention nationale et internationale sur Bredasdorp et sur le problème plus large des violences faites aux femmes et aux filles en Afrique du Sud.\n\nDistinction éditoriale : Les archives institutionnelles fiables établissent son âge, sa communauté et son lien avec le chantier de construction. Évitez d'ajouter des descriptions non vérifiées de ses résultats scolaires ou de ses projets professionnels.",
              "contributions": "Anene était une jeune personne au début de sa vie, et non une personnalité publique. Son histoire a mis en lumière les réalités vécues par les jeunes dans les communautés où se croisent pauvreté, chômage, manque de perspectives et violences basées sur le genre.\n\nSa mémoire a ensuite été associée à une importante initiative de développement communautaire : le Centre de développement des compétences Anene Booysen (Anene Booysen Skills Development Centre) à Bredasdorp, visant à offrir une formation professionnelle aux jeunes de la région.",
              "factualContext": "Aux premières heures du 2 février 2013, Anene Booysen a été retrouvée grièvement blessée sur un chantier de construction à Bredasdorp après avoir subi une agression sexuelle d'une extrême brutalité. Transportée à l'hôpital Tygerberg du Cap, elle y est décédée plus tard dans la journée.\n\nProcédures judiciaires et responsabilité :\nL'affaire pénale a été jugée devant la Haute Cour du Cap-Occidental siégeant au circuit de Swellendam. Le 29 octobre 2013, la juge Patricia Goliath a déclaré Johannes Kana coupable de viol et de meurtre (S v Kana [2013] ZAWCHC 33), et le 1er novembre 2013, il a été condamné à deux peines de prison à perpétuité confondues. Les poursuites contre d'autres suspects initialement arrêtés ont été abandonnées faute de preuves suffisantes.",
              "editorialNotes": "Note de publication : Le processus formel de rétablissement des tribunaux spécialisés dans les infractions sexuelles (Sexual Offences Courts) en Afrique du Sud avait débuté en juin 2012 via un groupe de travail ministériel, avant le décès d'Anene. Le Centre de développement des compétences Anene Booysen a été officiellement inauguré le 28 juillet 2016.",
              "verifiedFacts": [
                  "Anene Booysen était une jeune fille de 17 ans de Bredasdorp (Cap-Occidental, Afrique du Sud) qui travaillait sur un chantier de logements RDP.",
                  "Le 2 février 2013, elle a été retrouvée grièvement blessée sur un chantier à Bredasdorp après une violente agression sexuelle et est décédée le jour même à l'hôpital Tygerberg du Cap.",
                  "Le 29 octobre 2013, la juge Patricia Goliath a reconnu Johannes Kana coupable de viol et de meurtre devant la Haute Cour du Cap-Occidental et l'a condamné le 1er novembre 2013 à deux peines de réclusion à perpétuité.",
                  "Les charges retenues contre d'autres suspects initialement arrêtés ont été abandonnées faute de preuves suffisantes.",
                  "Le processus de rétablissement des tribunaux pour infractions sexuelles avait déjà commencé en juin 2012 et le premier tribunal renouvelé a ouvert à Butterworth le 23 août 2013.",
                  "Le Centre de développement des compétences Anene Booysen (10 millions de rands) a fait l'objet d'une cérémonie de lancement des travaux le 13 mars 2014 et a été inauguré le 28 juillet 2016 par le ministre Dr Blade Nzimande ; la mère d'Anene, Corlia Olivier, est décédée en mai 2014."
              ],
              "societalImpact": "A. Attention nationale portée aux violences basées sur le genre par la Présidence sud-africaine et la Commission pour l'égalité des genres.\nB. Tribunaux des infractions sexuelles (Sexual Offences Courts) — Distinction historique importante : Le groupe de travail ministériel a été créé en juin 2012 et le premier tribunal renouvelé a ouvert ses portes à Butterworth le 23 août 2013.\nC. Centres de soins Thuthuzela (Thuthuzela Care Centres) offrant une prise en charge coordonnée aux survivants.\nD. Centre de développement des compétences Anene Booysen (lancement des travaux le 13 mars 2014, inauguration officielle le 28 juillet 2016, formation pratique de 75 apprenants locaux par la CETA) et mémoire de sa mère, Corlia Olivier († mai 2014).",
              "actionableLesson": "1. Protection de l'enfance à base communautaire et canaux de signalement sûrs.\n2. Accès renforcé aux travailleurs sociaux dans les zones rurales et périurbaines.\n3. Espaces publics et communautaires plus sûrs et mieux éclairés.\n4. Formation professionnelle et perspectives économiques pour les jeunes.\n5. Réponse centrée sur les survivants (soins médicaux, soutien psychologique et confidentialité).\n6. Responsabilité institutionnelle et suivi des services de protection de l'enfance.",
              "memorialPublication": {
                  "title": "Manuel de protection communautaire de l'enfance et de sécurité des jeunes en milieu périurbain",
                  "focus": "Protection de l'enfance · Développement rural · Éducation des jeunes · Intervention communautaire",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Une ressource éducative ouverte comprenant un cadre de protection de l'enfance, un audit de sécurité communautaire, un guide d'accès à la formation professionnelle, un répertoire d'orientation sociale et un cadre de responsabilité."
              }
          },
          "hr": {
              "country": "Južnoafrička Republika",
              "categoryLabel": "Zaštita djece i skrb o mladima u zajednici",
              "roleAndField": "Mlada članica zajednice i građevinska radnica · Bredasdorp, Zapadni Kap",
              "coreMessage": "Djeca i mladi moraju odrastati u zajednicama u kojima su zaštićeni njihova sigurnost, dostojanstvo i razvoj. Sprječavanje nasilja zahtijeva više od kaznenog progona: zahtijeva dostupno obrazovanje, učinkovite sustave zaštite djece, odgovorne institucije i sigurno okruženje u zajednici.",
              "whoWasThisPerson": "Anene Booysen bila je 17-godišnja djevojka iz Bredasdorpa, grada u regiji Overberg u južnoafričkoj pokrajini Zapadni Kap.\n\nBila je dio radničke zajednice u kojoj su pristup obrazovanju, zapošljavanju i prilikama za mlade ostali važni izazovi.\n\nAnene je radila na gradilištu uključenom u izgradnju kuća u sklopu Programa obnove i razvoja (RDP). Njezina smrt privukla je nacionalnu i međunarodnu pozornost na Bredasdorp i na širi problem nasilja nad ženama i djevojčicama u Južnoafričkoj Republici.\n\nUrednička napomena: Pouzdani institucionalni zapisi potvrđuju njezinu dob, zajednicu i povezanost s gradilištem. Izbjegavajte dodavanje neprovjerenih opisa njezinih školskih postignuća ili profesionalnih planova.",
              "contributions": "Anene je bila mlada osoba na početku života, a ne javna osoba. Njezina priča skrenula je pozornost na okolnosti s kojima se suočavaju mladi u zajednicama u kojima se isprepliću siromaštvo, nezaposlenost, ograničene prilike i rodno uvjetovano nasilje.\n\nNjezino sjećanje kasnije je povezano s važnom inicijativom za razvoj zajednice: Centrom za razvoj vještina Anene Booysen (Anene Booysen Skills Development Centre) u Bredasdorpu.",
              "factualContext": "U ranim jutarnjim satima 2. veljače 2013. Anene Booysen pronađena je teško ozlijeđena na gradilištu u Bredasdorpu nakon brutalnog seksualnog napada. Prevezena je u bolnicu Tygerberg u Cape Townu, gdje je kasnije tog dana preminula.\n\nSudski postupak i odgovornost:\nKazneni postupak vođen je pred Visokim sudom Zapadnog Kapa (okrug Swellendam). Dana 29. listopada 2013. sutkinja Patricia Goliath proglasila je Johannesa Kanu krivim za silovanje i ubojstvo (S v Kana [2013] ZAWCHC 33), a 1. studenoga 2013. osuđen je na dvije доживотne kazne zatvora. Optužbe protiv ostalih prvotno uhićenih osumnjičenika povučene su zbog nedostatka dokaza.",
              "editorialNotes": "Napomena o objavi: Formalni proces ponovne uspostave specijaliziranih Sudova za seksualne delikte (Sexual Offences Courts) u Južnoafričkoj Republici započeo je u lipnju 2012. putem ministarske radne skupine, prije Aneneine smrti. Centar za razvoj vještina Anene Booysen službeno je otvoren 28. srpnja 2016.",
              "verifiedFacts": [
                  "Anene Booysen bila je 17-godišnja djevojka iz Bredasdorpa (Zapadni Kap, Južnoafrička Republika) koja je radila na gradilištu RDP kuća.",
                  "Dana 2. veljače 2013. pronađena je teško ozlijeđena na gradilištu u Bredasdorpu nakon brutalnog seksualnog napada te je istog dana preminula u bolnici Tygerberg u Cape Townu.",
                  "Dana 29. listopada 2013. sutkinja Patricia Goliath osudila je Johannesa Kanu za silovanje i ubojstvo, a 1. studenoga 2013. izrečene su mu dvije istodobne kazne doživotnog zatvora.",
                  "Optužbe protiv ostalih prvotno uhićenih osumnjičenika odbačene su zbog nedostatka dokaza.",
                  "Formalni proces ponovne uspostave Sudova za seksualne delikte započeo je u lipnju 2012., a prvi obnovljeni sud otvoren je u Butterworthu 23. kolovoza 2013.",
                  "Centar za razvoj vještina Anene Booysen u Bredasdorpu (vrijedan 10 milijuna randa) započeo je s gradnjom 13. ožujka 2014., a službeno ga je otvorio ministar dr. Blade Nzimande 28. srpnja 2016.; Aneneina majka Corlia Olivier preminula je u svibnju 2014."
              ],
              "societalImpact": "A. Nacionalna pozornost usmjerena na rodno uvjetovano nasilje od strane Predsjedništva Južnoafričke Republike i Komisije za ravnopravnost spolova.\nB. Sudovi za seksualne delikte — Važna povijesna razlika: Ministarska radna skupina osnovana je u lipnju 2012., a prvi obnovljeni sud otvoren je u Butterworthu 23. kolovoza 2013.\nC. Skrbnički centri Thuthuzela (Thuthuzela Care Centres) za koordiniranu podršku preživjelima.\nD. Centar za razvoj vještina Anene Booysen (početak gradnje 13. ožujka 2014., službeno otvorenje 28. srpnja 2016. uz praktičnu obuku 75 lokalnih polaznika) i sjećanje na njezinu majku Corliju Olivier († svibanj 2014.).",
              "actionableLesson": "1. Zaštita djece u zajednici i sigurni kanali prijave.\n2. Dostupna podrška socijalnih radnika u ruralnim i prigradskim sredinama.\n3. Sigurniji i bolje osvijetljeni javni prostori te prostori za mlade.\n4. Strukovno obrazovanje i ekonomske prilike za mlade.\n5. Pristup usmjeren na preživjele uz medicinsku i psihološku pomoć.\n6. Institucionalna odgovornost i nadzor nad službama za zaštitu djece.",
              "memorialPublication": {
                  "title": "Priručnik za zaštitu djece u zajednici i sigurnost mladih u prigradskim sredinama",
                  "focus": "Zaštita djece · Ruralni razvoj zajednice · Obrazovanje mladih · Intervencija u zajednici",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Otvoreni edukativni resurs koji obuhvaća okvir za zaštitu djece, reviziju sigurnosti u zajednici, pristup strukovnom obrazovanju, adresar socijalne podrške i okvir institucionalne odgovornosti."
              }
          }
      }
  },
    {
      "id": 9,
      "slug": "reeva-steenkamp",
      "name": "Reeva Steenkamp",
      "country": "South Africa",
      "countryFlag": "🇿🇦",
      "category": "safety-and-justice",
      "categoryLabel": "Law, Advocacy & Anti-Abuse Education",
      "eraOrYear": "1983–2013",
      "roleAndField": "Law Graduate (LLB) · Professional Model · Emerging Advocate Against Domestic Abuse",
      "avatarUrl": "https://images.openai.com/static-rsc-4/hzeyU8Iua_FaPgOtqTcib-tzJP2Lg4OKfZK_JFVLpjkFtceiT5-KA0kOvsYEw5z1Q1WN3cdunGHkpK1Hl9k8ldCquQSQZMnJmbS8HwNt-LM0nzKw3IyvZpixzVZT1b2bwiyySBnzICeKErtQsBnACokSMPdrFOfZ54kUdAKlum4?purpose=inline",
      "verificationStatus": "Verified",
      "lastVerifiedAt": "2026-11-07",
      "coreMessage": "A person's identity should never be reduced to the violence that ended their life. Reeva Steenkamp was a law graduate, a successful model, a media personality, and a young woman who had begun using her public platform to speak against domestic abuse and rape.",
      "whoWasThisPerson": "Reeva Rebecca Steenkamp was born on 19 August 1983 in Cape Town, South Africa, and grew up in Port Elizabeth.\n\nShe studied law at Nelson Mandela Metropolitan University, graduating with a Bachelor of Laws degree in 2005. Alongside her education, she developed a successful modelling career, which she had begun pursuing as a teenager.\n\nHer professional work extended beyond modelling. She appeared as a presenter on Fashion TV and participated in the reality television programme Tropika Island of Treasure, filmed in Jamaica and broadcast shortly after her death.\n\nReeva had not abandoned her legal ambitions. A contemporary BBC profile reported that she had applied to the bar in late 2011 and hoped to become a legal advocate. Her interest in law and her modelling career were both important parts of her identity.",
      "contributions": "Reeva had begun using her public profile to raise awareness about domestic abuse and rape.\n\nHer mother, June Steenkamp, later confirmed in a victim impact statement that Reeva had started speaking up for people affected by these forms of violence.\n\nOne particularly meaningful example was a school talk Reeva had prepared for 14 February 2013. She intended to speak to young students about self-worth, relationships, and the importance of valuing people for who they are rather than their physical appearance.\n\nShe never delivered that talk.\n\nHer planned appearance and the speech she had prepared provide a documented example of her intention to use her visibility to encourage young people and speak about issues affecting women.\n\nIt is important to distinguish this emerging advocacy from a long-established formal campaign. Reeva was beginning this work when her life was taken.",
      "factualContext": "In the early hours of 14 February 2013, Reeva was fatally shot at the Pretoria home of her boyfriend, Oscar Pistorius.\n\nPistorius fired four shots through the closed door of a toilet cubicle in the bathroom. Reeva, who was inside, was struck and died from her injuries.\n\nThe case received extraordinary international attention and proceeded through multiple stages of criminal proceedings and appeals.\n\nThe Supreme Court of Appeal later overturned Pistorius's culpable-homicide conviction and substituted a conviction for murder.\n\nThis profile does not need graphic descriptions of her injuries to communicate the seriousness of the crime.\n\nJudicial Proceedings and Legal Outcome:\nThe legal proceedings developed over several years:\n• September 2014: Pistorius was convicted of culpable homicide by the Pretoria High Court.\n• December 2015: The Supreme Court of Appeal set aside that conviction and substituted a murder conviction, finding that the legal requirements for dolus eventualis had been met.\n• July 2016: The High Court sentenced him to six years' imprisonment for murder.\n• November 2017: Following further appeal proceedings, the sentence was increased to 13 years and five months.\n• January 2024: South Africa's Department of Correctional Services confirmed that Pistorius was placed on parole, effective 5 January 2024.\n\nThe distinction between the original culpable-homicide conviction and the later murder conviction matters. The Supreme Court of Appeal's December 2015 judgment is the central legal record establishing that change.",
      "editorialNotes": "Important editorial qualifications: The claim that Reeva had begun anti-abuse advocacy is supported by her mother's statement and contemporary reporting; she is accurately described as an emerging advocate rather than having led a long-established formal campaign. The school speech is documented by contemporary reporting. The Reeva Rebecca Steenkamp Foundation's official website describes its programmes and mission as continued by her mother, June Steenkamp, without claiming unverified current beneficiary numbers. June Steenkamp's 24 November 2023 Victim Impact Statement also records that Reeva had written about feeling afraid of Pistorius's anger at times, which provides relevant historical context without being presented as a separate legal finding.",
      "verifiedFacts": [
          "Reeva Rebecca Steenkamp (born 19 August 1983 in Cape Town, raised in Port Elizabeth) graduated with a Bachelor of Laws (LLB) degree from Nelson Mandela Metropolitan University in 2005 and built a professional modelling and media career.",
          "Contemporary BBC reporting documented that she had applied to the bar in late 2011 with the ambition to become a legal advocate, and her mother June Steenkamp's 2023 Victim Impact Statement confirmed she had begun using her public voice to advocate for people affected by domestic abuse and rape.",
          "She had prepared a school talk for 14 February 2013 on self-worth and relationships that she never had the opportunity to deliver.",
          "In the early hours of 14 February 2013, Oscar Pistorius fired four shots through the closed door of a toilet cubicle in the bathroom of his Pretoria home, fatally striking Reeva.",
          "On 3 December 2015, the Supreme Court of Appeal of South Africa (DPP, Gauteng v Pistorius [2015] ZASCA 204) overturned the September 2014 culpable-homicide conviction and substituted a conviction for murder under dolus eventualis; his sentence was increased in November 2017 to 13 years and five months, with parole effective 5 January 2024.",
          "Her mother, June Steenkamp, continued Reeva's work through the Reeva Rebecca Steenkamp Foundation (registered in November 2015 and officially launched in August 2016), focused on abuse education, victim support, legal assistance, and a yearly law bursary."
      ],
      "societalImpact": "A Legacy Continued — The Reeva Rebecca Steenkamp Foundation:\nAfter Reeva's death, her mother, June Steenkamp, took forward the work Reeva had begun.\n\nThe Reeva Rebecca Steenkamp Foundation was registered in November 2015 and officially launched in August 2016.\n\nIts stated mission is to educate and empower women and children against violence and abuse. Its work has included:\n• Abuse education: Helping people recognise physical, sexual, emotional, verbal, psychological and economic abuse, as well as intimidation, stalking and isolation.\n• Victim support and advocacy: Providing support to people who approach the foundation for assistance.\n• Legal assistance: Developing a pilot project with attorneys in Port Elizabeth.\n• Education and empowerment: Promoting education and skills development to help women become self-supporting.\n• Reeva Bursary: Providing a yearly bursary to a third-year law student with an interest in Family Law.\n• REEVA Pack: An educational resource intended to help prevent domestic violence and abuse.\n\nThe foundation also developed the #BluePurpleBlack campaign, using the symbolism of bruising to draw attention to different forms of abuse, including those that leave no visible physical injury.\n\nThis is an important part of Reeva's continuing legacy: her name is associated not only with remembrance, but with practical education, victim support and opportunities for future legal professionals.",
      "actionableLesson": "Reeva's story highlights the importance of recognising that abuse is not limited to physical violence.\n\nEducation should help young people understand:\n• Coercive and controlling behaviour.\n• Possessiveness, intimidation and repeated humiliation.\n• Emotional and psychological abuse.\n• Isolation from friends, family and support networks.\n• How to seek help safely and access legal protections.\n• How friends, schools and institutions can respond without blaming or pressuring someone experiencing abuse.\n\nEducation must also avoid placing the responsibility for preventing violence solely on the person experiencing it. Responsibility belongs to perpetrators, institutions and the wider community.",
      "memorialPublication": {
          "title": "Coercive Control Recognition & Safe Relationship Education Curriculum",
          "focus": "Intimate Partner Violence Prevention · Youth Education · Legal Literacy",
          "initiativeStatus": "Proposed Initiative",
          "deliverable": "A proposed educational curriculum for schools, colleges and universities.\n\nPotential modules:\n• Understanding Abuse: Recognising physical, emotional, psychological, sexual and economic abuse.\n• Recognising Coercive Control: Understanding intimidation, isolation, monitoring, possessiveness and patterns of controlling behaviour.\n• Healthy Relationships: Consent, respect, boundaries, communication and personal autonomy.\n• Safe Support Pathways: How to approach trusted people, professional support services and emergency assistance.\n• Legal Literacy: Understanding relevant domestic-violence protections, reporting options and support resources.\n• Bystander Responsibility: Helping friends and peers without judgement, victim-blaming or unsafe intervention.\n\nThe curriculum should be developed with domestic-violence specialists, legal professionals, educators and survivor-support organisations. It is a proposed UltimateHealth initiative, not an existing programme of the Reeva Rebecca Steenkamp Foundation.\n\nUltimateHealth Editorial Perspective:\nReeva Steenkamp was more than a headline in an internationally publicised criminal case.\n\nShe had completed a law degree, built a professional modelling career, worked in media, and was beginning to use her public visibility to speak against domestic abuse and rape.\n\nHer mother continued that work through a foundation that supports education, legal assistance and people affected by abuse.\n\nA meaningful memorial should preserve both parts of this history: the life Reeva built and the work that others have continued in her name.\n\nRemember the person. Understand the failures. Support the work that protects others."
      },
      "references": [
          {
              "title": "Director of Public Prosecutions, Gauteng v Pistorius (96/2015), [2015] ZASCA 204, 3 December 2015 — The primary legal record for the substitution of the culpable-homicide conviction with murder",
              "url": "https://www3.saflii.org/za/cases/ZASCA/2015/204.html",
              "publisher": "Supreme Court of Appeal of South Africa (SAFLII)",
              "isPrimary": true
          },
          {
              "title": "June Steenkamp — Victim Impact Statement, 24 November 2023 — Confirms Reeva's law degree, modelling career and emerging advocacy against domestic abuse and rape",
              "url": "https://cdn.24.co.za/files/Cms/General/d/9955/69282ae973db4f8f9cfc6e8a566a4951.pdf",
              "publisher": "June Steenkamp (Victim Impact Statement PDF)",
              "isPrimary": true
          },
          {
              "title": "Reeva Rebecca Steenkamp Foundation — Official website documenting its stated mission, history, bursary, victim-support work, legal assistance and campaigns",
              "url": "https://reevasteenkampfoundation.org/",
              "publisher": "Reeva Rebecca Steenkamp Foundation",
              "isPrimary": true
          },
          {
              "title": "Profile: Reeva Steenkamp, the victim (5 March 2014) — Biographical reporting on her birth, education, modelling and media career",
              "url": "https://www.sabcnews.com/sabcnews/profile-reeva-steenkamp-the-victim/",
              "publisher": "South African Broadcasting Corporation (SABC News)"
          },
          {
              "title": "Reeva Steenkamp: 1983–2013 — Contemporary biographical reporting on her legal ambitions, modelling career and plans to help abused women",
              "url": "https://www.bbc.com/news/world-africa-28349666",
              "publisher": "BBC News"
          },
          {
              "title": "Reeva Steenkamp was to speak out against domestic abuse hours after shooting death — Reporting on the school speech she had prepared and her intended message to young students",
              "url": "https://www.cbsnews.com/news/48-hours-the-advice-reeva-steenkamp-never-got-to-give/",
              "publisher": "CBS News"
          },
          {
              "title": "June Steenkamp announces foundation to honour the memory of Reeva (10 March 2015) — Documents June's stated intention to fulfil Reeva's dream of creating a foundation for women and children affected by domestic abuse",
              "url": "https://news.uj.ac.za/news/uj-june-steenkamp-announces-foundation-to-honour-the-memory-of-reeva-2/",
              "publisher": "University of Johannesburg (UJ News)"
          },
          {
              "title": "Anti-abuse foundation in honour of Reeva (21 August 2016) — Reports on the foundation's official launch in Port Elizabeth",
              "url": "https://www.news24.com/citypress/news/anti-abuse-foundation-in-honour-of-reeva-20160821",
              "publisher": "News24"
          },
          {
              "title": "Correctional Services on Oscar Pistorius placed on parole (24 November 2023) — Official confirmation of the 13-year-and-five-month sentence and parole effective 5 January 2024",
              "url": "https://www.gov.za/news/media-statements/correctional-services-oscar-pistorius-placed-parole-24-nov-2023",
              "publisher": "South African Government (Department of Correctional Services)",
              "isPrimary": true
          },
          {
              "title": "June launches Reeva Steenkamp foundation (21 October 2015) — Contemporary reporting on the foundation's early establishment and its intended support for abused women",
              "url": "https://iol.co.za/news/south-africa/eastern-cape/2015-10-21-june-launches-reeva-steenkamp-foundation/",
              "publisher": "IOL"
          }
      ],
      "translations": {
          "hi": {
              "country": "दक्षिण अफ्रीका",
              "categoryLabel": "कानून, वकालत एवं दुर्व्यवहार-विरोधी शिक्षा",
              "roleAndField": "विधि स्नातक (LLB) · पेशेवर मॉडल · घरेलू दुर्व्यवहार के विरुद्ध उभरती अधिवक्ता",
              "coreMessage": "किसी व्यक्ति की पहचान को कभी भी उस हिंसा तक सीमित नहीं किया जाना चाहिए जिसने उसका जीवन समाप्त कर दिया। रीवा स्टीनकैंप एक कानून स्नातक, एक सफल मॉडल, एक मीडिया व्यक्तित्व और एक ऐसी युवा महिला थीं जिन्होंने घरेलू दुर्व्यवहार और बलात्कार के खिलाफ बोलने के लिए अपने सार्वजनिक मंच का उपयोग करना शुरू कर दिया था।",
              "whoWasThisPerson": "रीवा रेबेका स्टीनकैंप (Reeva Rebecca Steenkamp) का जन्म 19 अगस्त 1983 को केप टाउन, दक्षिण अफ्रीका में हुआ था और उनका पालन-पोषण पोर्ट एलिज़ाबेथ में हुआ।\n\nउन्होंने नेल्सन मंडेला मेट्रोपॉलिटन यूनिवर्सिटी में कानून की पढ़ाई की और 2005 में बैचलर ऑफ लॉज़ (LLB) की डिग्री के साथ स्नातक किया। अपनी शिक्षा के साथ-साथ, उन्होंने एक सफल मॉडलिंग करियर विकसित किया, जिसे उन्होंने किशोरावस्था में शुरू किया था।\n\nउनका पेशेवर काम मॉडलिंग से आगे भी बढ़ा। वह फ़ैशन टीवी (Fashion TV) पर एक प्रस्तोता के रूप में दिखाई दीं और जमैका में फिल्माए गए रियलिटी टेलीविजन कार्यक्रम 'ट्रॉपिका आइलैंड ऑफ ट्रेज़र' (Tropika Island of Treasure) में भाग लिया, जिसका प्रसारण उनकी मृत्यु के कुछ समय बाद हुआ।\n\nरीवा ने अपनी कानूनी महत्वाकांक्षाओं को नहीं छोड़ा था। एक समकालीन बीबीसी (BBC) प्रोफ़ाइल में बताया गया कि उन्होंने 2011 के अंत में बार (Bar) के लिए आवेदन किया था और एक कानूनी अधिवक्ता (Advocate) बनने की उम्मीद रखती थीं। कानून में उनकी रुचि और उनका मॉडलिंग करियर दोनों ही उनकी पहचान के महत्वपूर्ण हिस्से थे।",
              "contributions": "रीवा ने घरेलू दुर्व्यवहार और बलात्कार के बारे में जागरूकता बढ़ाने के लिए अपनी सार्वजनिक प्रोफ़ाइल का उपयोग करना शुरू कर दिया था।\n\nउनकी माँ, जून स्टीनकैंप (June Steenkamp) ने बाद में एक पीड़ित प्रभाव बयान (Victim Impact Statement) में पुष्टि की कि रीवा ने हिंसा के इन रूपों से प्रभावित लोगों के लिए बोलना शुरू कर दिया था।\n\nएक विशेष रूप से सार्थक उदाहरण वह स्कूल भाषण था जिसे रीवा ने 14 फरवरी 2013 के लिए तैयार किया था। वह युवा छात्रों से आत्म-सम्मान, रिश्तों और लोगों को उनके शारीरिक रूप के बजाय उनके वास्तविक व्यक्तित्व के लिए महत्व देने के बारे में बात करने का इरादा रखती थीं। वह कभी वह भाषण नहीं दे सकीं।\n\nइस उभरती हुई वकालत को किसी लंबे समय से स्थापित औपचारिक अभियान से अलग समझना महत्वपूर्ण है। जब रीवा का जीवन छीन लिया गया, तब वह इस कार्य की शुरुआत कर रही थीं।",
              "factualContext": "14 फरवरी 2013 के शुरुआती घंटों में, रीवा को उनके प्रेमी ऑस्कर पिस्टोरियस (Oscar Pistorius) के प्रिटोरिया स्थित घर में गोली मार दी गई।\n\nपिस्टोरियस ने बाथरूम के भीतर शौचालय कक्ष (toilet cubicle) के बंद दरवाजे से चार गोलियाँ चलाईं। रीवा, जो अंदर थीं, को गोलियाँ लगीं और उनकी चोटों के कारण मृत्यु हो गई।\n\nअपील की सर्वोच्च अदालत (Supreme Court of Appeal) ने बाद में पिस्टोरियस की गैर-इरादतन हत्या (culpable homicide) की दोषसिद्धि को पलट दिया और हत्या (murder) की दोषसिद्धि को प्रतिस्थापित किया।\n\nन्यायिक कार्यवाही और कानूनी परिणाम:\n• सितंबर 2014: प्रिटोरिया हाई कोर्ट द्वारा पिस्टोरियस को गैर-इरादतन हत्या (culpable homicide) का दोषी ठहराया गया।\n• दिसंबर 2015: सुप्रीम कोर्ट ऑफ अपील ने उस दोषसिद्धि को रद्द कर दिया और हत्या (murder) की दोषसिद्धि को प्रतिस्थापित किया, यह पाते हुए कि डॉलस इवेंटुअलिस (dolus eventualis) की कानूनी आवश्यकताएँ पूरी हुई थीं।\n• जुलाई 2016: हाई कोर्ट ने उन्हें हत्या के लिए छह साल के कारावास की सजा सुनाई।\n• नवंबर 2017: आगे की अपील कार्यवाही के बाद, सजा को बढ़ाकर 13 साल और पाँच महीने कर दिया गया।\n• जनवरी 2024: दक्षिण अफ्रीका के सुधारात्मक सेवा विभाग ने पुष्टि की कि पिस्टोरियस को 5 जनवरी 2024 से पैरोल पर रखा गया।",
              "editorialNotes": "महत्वपूर्ण संपादकीय योग्यताएँ: यह तथ्य कि रीवा ने दुर्व्यवहार-विरोधी वकालत शुरू कर दी थी, उनकी माँ के बयान और समकालीन रिपोर्टिंग द्वारा समर्थित है; उन्हें किसी लंबे औपचारिक अभियान के बजाय एक उभरती हुई अधिवक्ता के रूप में वर्णित करना सटीक है। रीवा रेबेका स्टीनकैंप फाउंडेशन का कार्य उनकी माँ जून स्टीनकैंप द्वारा आगे बढ़ाया गया है।",
              "verifiedFacts": [
                  "रीवा रेबेका स्टीनकैंप (जन्म 19 अगस्त 1983, केप टाउन) ने 2005 में नेल्सन मंडेला मेट्रोपॉलिटन यूनिवर्सिटी से बैचलर ऑफ लॉज़ (LLB) की डिग्री प्राप्त की और मॉडलिंग व मीडिया में सफल करियर बनाया।",
                  "समकालीन बीबीसी रिपोर्टिंग के अनुसार उन्होंने 2011 के अंत में कानूनी अधिवक्ता बनने की महत्वाकांक्षा के साथ बार में आवेदन किया था, और उनकी माँ जून स्टीनकैंप के 2023 के बयान ने पुष्टि की कि उन्होंने घरेलू दुर्व्यवहार के खिलाफ अपनी सार्वजनिक आवाज़ उठाना शुरू कर दिया था।",
                  "उन्होंने 14 फरवरी 2013 के लिए आत्म-सम्मान और रिश्तों पर एक स्कूल भाषण तैयार किया था जिसे वह कभी नहीं दे सकीं।",
                  "14 फरवरी 2013 की सुबह ऑस्कर पिस्टोरियस ने बाथरूम के बंद शौचालय-कक्ष (toilet-cubicle) के दरवाजे से चार गोलियाँ चलाईं, जिससे रीवा की मृत्यु हो गई।",
                  "3 दिसंबर 2015 को दक्षिण अफ्रीका के सुप्रीम कोर्ट ऑफ अपील ([2015] ZASCA 204) ने गैर-इरादतन हत्या की दोषसिद्धि को बदलकर हत्या (murder) कर दिया; नवंबर 2017 में सजा बढ़ाकर 13 वर्ष 5 माह की गई और 5 जनवरी 2024 से पैरोल प्रभावी हुई।",
                  "उनकी माँ जून स्टीनकैंप ने नवंबर 2015 में पंजीकृत और अगस्त 2016 में आधिकारिक रूप से शुरू किए गए 'रीवा रेबेका स्टीनकैंप फाउंडेशन' के माध्यम से उनके कार्य को आगे बढ़ाया।"
              ],
              "societalImpact": "एक निरंतर विरासत — रीवा रेबेका स्टीनकैंप फाउंडेशन (The Reeva Rebecca Steenkamp Foundation):\nरीवा की मृत्यु के बाद, उनकी माँ जून स्टीनकैंप ने उस काम को आगे बढ़ाया जो रीवा ने शुरू किया था। फाउंडेशन नवंबर 2015 में पंजीकृत हुआ और अगस्त 2016 में आधिकारिक रूप से शुरू किया गया।\n\nइसका घोषित मिशन हिंसा और दुर्व्यवहार के खिलाफ महिलाओं और बच्चों को शिक्षित और सशक्त बनाना है:\n• दुर्व्यवहार शिक्षा (Abuse education): शारीरिक, यौन, भावनात्मक, मौखिक, मनोवैज्ञानिक और आर्थिक दुर्व्यवहार के साथ-साथ डराने-धमकाने, पीछा करने और अलगाव को पहचानने में मदद करना।\n• पीड़ित सहायता और वकालत (Victim support and advocacy)।\n• कानूनी सहायता (Legal assistance): पोर्ट एलिज़ाबेथ में वकीलों के साथ एक पायलट प्रोजेक्ट विकसित करना।\n• शिक्षा और सशक्तिकरण (Education and empowerment)।\n• रीवा बर्सरी (Reeva Bursary): पारिवारिक कानून (Family Law) में रुचि रखने वाले तीसरे वर्ष के कानून के छात्र को वार्षिक छात्रवृत्ति प्रदान करना।\n• REEVA Pack और #BluePurpleBlack अभियान: उन विभिन्न प्रकार के दुर्व्यवहारों की ओर ध्यान आकर्षित करना जो कोई दृश्यमान शारीरिक चोट नहीं छोड़ते।",
              "actionableLesson": "रीवा की कहानी यह पहचानने के महत्व को रेखांकित करती है कि दुर्व्यवहार केवल शारीरिक हिंसा तक सीमित नहीं है।\n\nशिक्षा को युवाओं को यह समझने में मदद करनी चाहिए:\n• बलपूर्वक और नियंत्रित करने वाला व्यवहार (Coercive and controlling behaviour)।\n• अधिकार जताने की प्रवृत्ति, डराना-धमकाना और बार-बार अपमानित करना।\n• भावनात्मक और मनोवैज्ञानिक दुर्व्यवहार।\n• मित्रों, परिवार और सहायता नेटवर्क से अलगाव।\n• सुरक्षित रूप से सहायता कैसे प्राप्त करें और कानूनी सुरक्षा तक कैसे पहुँचें।\n• मित्र, स्कूल और संस्थाएँ बिना दोषारोपण या दबाव डाले कैसे प्रतिक्रिया दे सकते हैं।\n\nशिक्षा को हिंसा रोकने की जिम्मेदारी केवल पीड़ित व्यक्ति पर डालने से बचना चाहिए; जिम्मेदारी अपराधियों, संस्थाओं और व्यापक समुदाय की है।",
              "memorialPublication": {
                  "title": "बलपूर्वक नियंत्रण की पहचान और सुरक्षित संबंध शिक्षा पाठ्यक्रम",
                  "focus": "अंतरंग साथी हिंसा की रोकथाम · युवा शिक्षा · कानूनी साक्षरता",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "स्कूलों, कॉलेजों और विश्वविद्यालयों के लिए एक प्रस्तावित शैक्षिक पाठ्यक्रम:\n• दुर्व्यवहार को समझना (Understanding Abuse)\n• बलपूर्वक नियंत्रण को पहचानना (Recognising Coercive Control)\n• स्वस्थ संबंध (Healthy Relationships)\n• सुरक्षित सहायता मार्ग (Safe Support Pathways)\n• कानूनी साक्षरता (Legal Literacy)\n• प्रत्यक्षदर्शी जिम्मेदारी (Bystander Responsibility)\n\nUltimateHealth का संपादकीय दृष्टिकोण: रीवा स्टीनकैंप अंतरराष्ट्रीय स्तर पर प्रचारित आपराधिक मामले की एक सुर्खी से कहीं अधिक थीं। व्यक्ति को याद रखें, विफलताओं को समझें, और दूसरों की रक्षा करने वाले कार्यों का समर्थन करें।"
              }
          },
          "bn": {
              "country": "দক্ষিণ আফ্রিকা",
              "categoryLabel": "আইন, ওকালতি ও নির্যাতন-বিরোধী শিক্ষা",
              "roleAndField": "আইন স্নাতক (LLB) · পেশাদার মডেল · পারিবারিক নির্যাতনের বিরুদ্ধে উদীয়মান প্রবক্তা",
              "coreMessage": "কোনো ব্যক্তির পরিচয় কখনোই সেই সহিংসতার মধ্যে সীমাবদ্ধ করা উচিত নয় যা তাঁর জীবন কেড়ে নিয়েছে। রিভা স্টিনক্যাম্প ছিলেন একজন আইন স্নাতক, একজন সফল মডেল, একজন মিডিয়া ব্যক্তিত্ব এবং একজন তরুণী যিনি পারিবারিক নির্যাতন ও ধর্ষণের বিরুদ্ধে কথা বলার জন্য তাঁর পাবলিক প্ল্যাটফর্ম ব্যবহার করতে শুরু করেছিলেন।",
              "whoWasThisPerson": "রিভা রেবেকা স্টিনক্যাম্প (Reeva Rebecca Steenkamp) ১৯৮৩ সালের ১৯ আগস্ট দক্ষিণ আফ্রিকার কেপ টাউনে জন্মগ্রহণ করেন এবং পোর্ট এলিজাবেথে বেড়ে ওঠেন।\n\nতিনি নেলসন ম্যান্ডেলা মেট্রোপলিটন ইউনিভার্সিটিতে আইন বিষয়ে পড়াশোনা করেন এবং ২০০৫ সালে ব্যাচেলর অফ লজ (LLB) ডিগ্রি অর্জন করেন। শিক্ষার পাশাপাশি তিনি কৈশোর থেকে শুরু করা একটি সফল মডেলিং ক্যারিয়ার গড়ে তোলেন এবং ফ্যাশন টিভি (Fashion TV) ও 'ট্রপিকা আইল্যান্ড অফ ট্রেজার' অনুষ্ঠানে অংশ নেন।\n\nসমসাময়িক বিবিসি (BBC) প্রতিবেদন অনুযায়ী, তিনি ২০১১ সালের শেষের দিকে বারে (Bar) আবেদন করেছিলেন এবং একজন আইনজীবী (Advocate) হওয়ার স্বপ্ন দেখতেন।",
              "contributions": "রিভা পারিবারিক নির্যাতন এবং ধর্ষণ সম্পর্কে সচেতনতা বাড়াতে তাঁর পাবলিক প্রোফাইল ব্যবহার করতে শুরু করেছিলেন, যা তাঁর মা জুন স্টিনক্যাম্প (June Steenkamp) পরবর্তীতে ভিকটিম ইমপ্যাক্ট স্টেটমেন্টে নিশ্চিত করেন।\n\n২০১৩ সালের ১৪ ফেব্রুয়ারির জন্য তিনি তরুণ শিক্ষার্থীদের উদ্দেশ্যে আত্মমর্যাদা এবং সুস্থ সম্পর্ক নিয়ে একটি স্কুল বক্তৃতা প্রস্তুত করেছিলেন, যা তিনি আর কখনো দিতে পারেননি। এই উদীয়মান ওকালতিকে একটি দীর্ঘস্থায়ী আনুষ্ঠানিক প্রচারাভিযান থেকে আলাদা করে দেখা গুরুত্বপূর্ণ।",
              "factualContext": "২০১৩ সালের ১৪ ফেব্রুয়ারি ভোরে প্রিটোরিয়ায় তাঁর প্রেমিক অস্কার পিস্টোরিয়াস (Oscar Pistorius)-এর বাড়িতে রিভাকে গুলি করে হত্যা করা হয়। পিস্টোরিয়াস বাথরুমের ভেতরে টয়লেট কিউবিকলের বন্ধ দরজার মধ্য দিয়ে চারটি গুলি চালান।\n\nবিচারিক কার্যক্রম ও আইনি ফলাফল:\n• সেপ্টেম্বর ২০১৪: প্রিটোরিয়া হাই কোর্ট পিস্টোরিয়াসকে অনিচ্ছাকৃত নরহত্যার (culpable homicide) দায়ে দোষী সাব্যস্ত করে।\n• ডিসেম্বর ২০১৫: সুপ্রিম কোর্ট অফ আপিল সেই রায় বাতিল করে এবং ডোলাস ইভেনচুয়ালিস (dolus eventualis)-এর অধীনে হত্যার (murder) দায়ে দোষী সাব্যস্ত করে।\n• জুলাই ২০১৬: হাই কোর্ট তাঁকে হত্যার দায়ে ছয় বছরের কারাদণ্ড দেয়।\n• নভেম্বর ২০১৭: আপিলের পর সাজা বাড়িয়ে ১৩ বছর ৫ মাস করা হয়।\n• জানুয়ারি ২০২৪: দক্ষিণ আফ্রিকার সংশোধনাগার পরিষেবা বিভাগ নিশ্চিত করে যে ৫ জানুয়ারি ২০২৪ থেকে পিস্টোরিয়াসকে প্যারোলে মুক্তি দেওয়া হয়েছে।",
              "editorialNotes": "গুরুত্বপূর্ণ সম্পাদকীয় যোগ্যতা: রিভা যে নির্যাতন-বিরোধী সচেতনতার কাজ শুরু করেছিলেন তা তাঁর মায়ের বিবৃতি এবং সমসাময়িক প্রতিবেদনে সমর্থিত। রিভা রেবেকা স্টিনক্যাম্প ফাউন্ডেশনটি তাঁর মা জুন স্টিনক্যাম্প এগিয়ে নিয়ে গেছেন।",
              "verifiedFacts": [
                  "রিভা রেবেকা স্টিনক্যাম্প (জন্ম ১৯ আগস্ট ১৯৮৩, কেপ টাউন) ২০০৫ সালে নেলসন ম্যান্ডেলা মেট্রোপলিটন ইউনিভার্সিটি থেকে LLB ডিগ্রি অর্জন করেন।",
                  "বিবিসি প্রতিবেদন অনুযায়ী তিনি ২০১১ সালের শেষে আইনজীবী হওয়ার লক্ষ্যে বারে আবেদন করেছিলেন এবং পারিবারিক নির্যাতনের বিরুদ্ধে কথা বলতে শুরু করেছিলেন।",
                  "১৪ ফেব্রুয়ারি ২০১৩ তারিখে তিনি আত্মমর্যাদা ও সম্পর্ক বিষয়ে একটি স্কুল বক্তৃতা প্রস্তুত করেছিলেন যা তাঁর আর দেওয়া হয়নি।",
                  "১৪ ফেব্রুয়ারি ২০১৩ ভোরে অস্কার পিস্টোরিয়াস বাথরুমের বন্ধ টয়লেট-কিউবিকল দরজার মধ্য দিয়ে চারটি গুলি চালিয়ে রিভাকে হত্যা করেন।",
                  "৩ ডিসেম্বর ২০১৫ তারিখে দক্ষিণ আফ্রিকার সুপ্রিম কোর্ট অফ আপিল ([2015] ZASCA 204) অনিচ্ছাকৃত নরহত্যার রায় পরিবর্তন করে হত্যার রায় দেয়; নভেম্বর ২০১৭ সালে সাজা ১৩ বছর ৫ মাস করা হয় এবং ৫ জানুয়ারি ২০২৪ থেকে প্যারোল কার্যকর হয়।",
                  "তাঁর মা জুন স্টিনক্যাম্প নভেম্বর ২০১৫ সালে নিবন্ধিত এবং আগস্ট ২০১৬ সালে আনুষ্ঠানিকভাবে চালু হওয়া 'রিভা রেবেকা স্টিনক্যাম্প ফাউন্ডেশন'-এর মাধ্যমে রিভার কাজ এগিয়ে নিয়ে যান।"
              ],
              "societalImpact": "রিভা রেবেকা স্টিনক্যাম্প ফাউন্ডেশন (নভেম্বর ২০১৫-এ নিবন্ধিত, আগস্ট ২০১৬-এ আনুষ্ঠানিকভাবে চালু):\nরিভার মৃত্যুর পর তাঁর মা জুন স্টিনক্যাম্প এই ফাউন্ডেশন প্রতিষ্ঠা করেন। এর কাজের মধ্যে রয়েছে:\n• নির্যাতন বিষয়ক শিক্ষা (Abuse education)\n• ভুক্তভোগী সহায়তা ও ওকালতি (Victim support and advocacy)\n• আইনি সহায়তা (Legal assistance — পোর্ট এলিজাবেথে আইনজীবীদের সাথে পাইলট প্রকল্প)\n• শিক্ষা ও ক্ষমতায়ন\n• রিভা বৃত্তি (Reeva Bursary — পারিবারিক আইনে আগ্রহী তৃতীয় বর্ষের আইন শিক্ষার্থীর জন্য বার্ষিক বৃত্তি)\n• REEVA Pack এবং #BluePurpleBlack প্রচারাভিযান।",
              "actionableLesson": "নির্যাতন কেবল শারীরিক সহিংসতার মধ্যে সীমাবদ্ধ নয়। তরুণদের শেখানো উচিত:\n• জবরদস্তিমূলক এবং নিয়ন্ত্রণমূলক আচরণ (Coercive and controlling behaviour) চেনা।\n• অধিকারবোধ, ভীতি প্রদর্শন এবং বারবার অপমান।\n• মানসিক ও মনস্তাত্ত্বিক নির্যাতন এবং বন্ধু ও পরিবার থেকে বিচ্ছিন্নকরণ।\n• নিরাপদে সাহায্য চাওয়া এবং আইনি সুরক্ষা লাভের উপায়।",
              "memorialPublication": {
                  "title": "জবরদস্তিমূলক নিয়ন্ত্রণ শনাক্তকরণ ও নিরাপদ সম্পর্ক শিক্ষা পাঠ্যক্রম",
                  "focus": "অন্তরঙ্গ সঙ্গীর সহিংসতা প্রতিরোধ · যুব শিক্ষা · আইনি সাক্ষরতা",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের জন্য প্রস্তাবিত পাঠ্যক্রম: নির্যাতন বোঝা, জবরদস্তিমূলক নিয়ন্ত্রণ শনাক্ত করা, সুস্থ সম্পর্ক, নিরাপদ সহায়তা পথ, আইনি সাক্ষরতা এবং প্রত্যক্ষদর্শীর দায়িত্ব।"
              }
          },
          "ta": {
              "country": "தென்னாப்பிரிக்கா",
              "categoryLabel": "சட்டம், வकालத்து மற்றும் வன்கொடுமை எதிர்ப்பு கல்வி",
              "roleAndField": "சட்டப் பட்டதாரி (LLB) · தொழில்முறை மாடல் · குடும்ப வன்கொடுமைக்கு எதிரான வளர்ந்து வந்த ஆதரவாளர்",
              "coreMessage": "ஒரு நபரின் அடையாளம் அவரது வாழ்க்கையை முடிவுக்குக் கொண்டுவந்த வன்முறைக்குள் சுருக்கப்படக் கூடாது. ரீவா ஸ்டீன்காம்ப் ஒரு சட்டப் பட்டதாரி, வெற்றிகரமான மாடல், ஊடக ஆளுமை மற்றும் குடும்ப வன்கொடுமைக்கு எதிராகக் குரல் கொடுக்கத் தொடங்கிய இளம் பெண்.",
              "whoWasThisPerson": "ரீவா ரெபேக்கா ஸ்டீன்காம்ப் (Reeva Rebecca Steenkamp) 19 ஆகஸ்ட் 1983 அன்று தென்னாப்பிரிக்காவின் கேப் டவுனில் பிறந்து போர்ட் எலிசபெத்தில் வளர்ந்தார்.\n\n2005 ஆம் ஆண்டு நெல்சன் மண்டேலா மெட்ரோபாலிட்டன் பல்கலைக்கழகத்தில் சட்டப் பட்டம் (LLB) பெற்றார். மாடலிங் மற்றும் தொலைக்காட்சித் துறையிலும் பணியாற்றிய அவர், 2011 ஆம் ஆண்டின் இறுதியில் வழக்கறிஞராகப் (Advocate) பதிவு செய்ய விண்ணப்பித்திருந்தார்.",
              "contributions": "குடும்ப வன்கொடுமை மற்றும் பாலியல் வன்கொடுமை குறித்து விழிப்புணர்வு ஏற்படுத்த ரீவா தனது பொதுத் தளத்தைப் பயன்படுத்தத் தொடங்கியிருந்தார் என்பதை அவரது தாயார் ஜூன் ஸ்டீன்காம்ப் (June Steenkamp) உறுதிப்படுத்தியுள்ளார். 14 பிப்ரவரி 2013 அன்று பள்ளி மாணவர்களிடையே சுயமரியாதை மற்றும் உறவுகள் குறித்துப் பேச அவர் உரை தயாரித்திருந்தார், ஆனால் அந்த உரையை அவரால் நிகழ்த்த முடியவில்லை.",
              "factualContext": "14 பிப்ரவரி 2013 அதிகாலையில் பிரிட்டோரியாவில் உள்ள அவரது ஆண் நண்பர் ஆஸ்கார் பிஸ்டோரியஸின் இல்லத்தில், குளியலறையின் மூடிய கழிப்பறை அறைக் கதவு (toilet-cubicle door) வழியாக பிஸ்டோரியஸ் சுட்ட நான்கு தோட்டாக்களால் ரீவா உயிரிழந்தார்.\n\nநீதித்துறை நிகழ்வுகள்:\n• செப்டம்பர் 2014: பிரிட்டோரியா உயர் நீதிமன்றம் பிஸ்டோரியஸை 'culpable homicide' குற்றவாளியாகத் தீர்ப்பளித்தது.\n• டிசம்பர் 2015: மேல்முறையீட்டு உச்ச நீதிமன்றம் ([2015] ZASCA 204) அதனை ரத்து செய்து கொலைக் குற்றவாளியாக (murder) அறிவித்தது.\n• ஜூலை 2016: 6 ஆண்டுகள் சிறைத்தண்டனை விதிக்கப்பட்டது.\n• நவம்பர் 2017: தண்டனை 13 ஆண்டுகள் மற்றும் 5 மாதங்களாக உயர்த்தப்பட்டது.\n• ஜனவரி 2024: 5 ஜனவரி 2024 முதல் பரோல் வழங்கப்பட்டது.",
              "editorialNotes": "முக்கிய ஆசிரியர் குறிப்பு: ரீவா வன்கொடுமை எதிர்ப்பு விழிப்புணர்வைத் தொடங்கியிருந்தார் என்பது அவரது தாயாரின் வாக்குமூலம் மற்றும் செய்தி அறிக்கைகளால் உறுதிப்படுத்தப்பட்டுள்ளது. ரீவா ரெபேக்கா ஸ்டீன்காம்ப் அறக்கட்டளை அவரது தாயார் ஜூன் ஸ்டீன்காம்ப் அவர்களால் முன்னெடுக்கப்படுகிறது.",
              "verifiedFacts": [
                  "ரீவா ரெபேக்கா ஸ்டீன்காம்ப் (பிறப்பு 19 ஆகஸ்ட் 1983) 2005 இல் நெல்சன் மண்டேலா மெட்ரோபாலிட்டன் பல்கலைக்கழகத்தில் LLB பட்டம் பெற்றார்.",
                  "2011 இறுதியில் வழக்கறிஞராக விண்ணப்பித்திருந்தார் மற்றும் குடும்ப வன்கொடுமைக்கு எதிராகக் குரல் கொடுக்கத் தொடங்கியிருந்தார்.",
                  "14 பிப்ரவரி 2013 அன்று பள்ளி மாணவர்களுக்காக சுயமரியாதை மற்றும் உறவுகள் குறித்த உரையைத் தயாரித்திருந்தார்.",
                  "14 பிப்ரவரி 2013 அதிகாலையில் ஆஸ்கார் பிஸ்டோரியஸ் மூடிய கழிப்பறை அறைக் கதவு வழியாக நான்கு முறை சுட்டதில் ரீவா உயிரிழந்தார்.",
                  "3 டிசம்பர் 2015 அன்று தென்னாப்பிரிக்க மேல்முறையீட்டு உச்ச நீதிமன்றம் ([2015] ZASCA 204) கொலைக் குற்றத்தை உறுதி செய்தது; நவம்பர் 2017 இல் தண்டனை 13 ஆண்டுகள் 5 மாதங்களாக உயர்த்தப்பட்டது; 5 ஜனவரி 2024 முதல் பரோல் வழங்கப்பட்டது.",
                  "அவரது தாயார் ஜூன் ஸ்டீன்காம்ப் நவம்பர் 2015 இல் பதிவு செய்யப்பட்டு ஆகஸ்ட் 2016 இல் தொடங்கப்பட்ட 'ரீவா ரெபேக்கா ஸ்டீன்காம்ப் அறக்கட்டளை' மூலம் அவரது பணியைத் தொடர்ந்தார்."
              ],
              "societalImpact": "ரீவா ரெபேக்கா ஸ்டீன்காம்ப் அறக்கட்டளை (நவம்பர் 2015 இல் பதிவு செய்யப்பட்டு ஆகஸ்ட் 2016 இல் தொடங்கப்பட்டது):\nஜூன் ஸ்டீன்காம்ப் அவர்களால் தொடங்கப்பட்ட இந்த அறக்கட்டளை வன்கொடுமை கல்வி, பாதிக்கப்பட்டோருக்கான ஆதரவு, போர்ட் எலிசபெத்தில் சட்ட உதவி, குடும்பச் சட்டத்தில் ஆர்வமுள்ள மூன்றாம் ஆண்டு சட்ட மாணவருக்கான 'Reeva Bursary', 'REEVA Pack' மற்றும் #BluePurpleBlack பிரச்சாரத்தை முன்னெடுத்துள்ளது.",
              "actionableLesson": "வன்கொடுமை என்பது உடல் ரீதியான வன்முறை மட்டுமல்ல; கட்டாயக் கட்டுப்பாடு (coercive control), மிரட்டல், உணர்ச்சி மற்றும் உளவியல் ரீதியான துன்புறுத்தல், தனிமைப்படுத்துதல் ஆகியவற்றை இளைஞர்கள் அடையாளம் காணவும் பாதுகாப்பாக சட்ட உதவியை நாடவும் கல்வி உதவ வேண்டும்.",
              "memorialPublication": {
                  "title": "கட்டாயக் கட்டுப்பாடு கண்டறிதல் மற்றும் பாதுகாப்பான உறவுக் கல்விப் பாடத்திட்டம்",
                  "focus": "நெருக்கமான இணையர் வன்முறைத் தடுப்பு · இளைஞர் கல்வி · சட்ட விழிப்புணர்வு",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "பள்ளிகள் மற்றும் பல்கலைக்கழகங்களுக்கான முன்மொழியப்பட்ட பாடத்திட்டம்: வன்கொடுமையைப் புரிந்துகொள்ளுதல், கட்டாயக் கட்டுப்பாட்டைக் கண்டறிதல், ஆரோக்கியமான உறவுகள், பாதுகாப்பான ஆதரவு வழிகள் மற்றும் சட்ட விழிப்புணர்வு."
              }
          },
          "or": {
              "country": "ଦକ୍ଷିଣ ଆଫ୍ରିକା",
              "categoryLabel": "ଆଇନ, ଓକାଲତି ଏବଂ ନିର୍ଯାତନା-ବିରୋଧୀ ଶିକ୍ଷା",
              "roleAndField": "ଆଇନ ସ୍ନାତକ (LLB) · ପେଶାଦାର ମଡେଲ୍ · ଘରୋଇ ନିର୍ଯାତନା ବିରୁଦ୍ଧରେ ଉଦୀୟମାନ ପ୍ରବକ୍ତା",
              "coreMessage": "ଜଣେ ବ୍ୟକ୍ତିଙ୍କ ପରିଚୟ କେବେବି সেই ହିଂସା ମଧ୍ୟରେ ସୀମିତ ହେବା ଉଚିତ୍ ନୁହେଁ ଯାହା ତାଙ୍କର ଜୀବନ ନେଇଗଲା। ରିভা ଷ୍ଟିନক୍ୟାମ୍ପ ଜଣେ ଆଇନ ସ୍ନାତକ, ସଫଳ ମଡେଲ୍, ମିଡିଆ ବ୍ୟକ୍ତିତ୍ୱ ଏବଂ ଜଣେ ଯୁବତୀ ଥିଲେ ଯିଏ ଘରୋଇ ନିର୍ଯାତନା ଓ ଦୁଷ୍କର୍ମ ବିରୁଦ୍ଧରେ ସ୍ୱର ଉତ୍ତୋଳନ କରିବାକୁ ଆରମ୍ଭ କରିଥିଲେ।",
              "whoWasThisPerson": "ରିভা ରେବେକା ଷ୍ଟିନক୍ୟାମ୍ପ (Reeva Rebecca Steenkamp) ୧୯ ଅଗଷ୍ଟ ୧୯୮୩ ରେ ଦକ୍ଷିଣ ଆଫ୍ରିକାର କେପ୍ ଟାଉନରେ ଜନ୍ମଗ୍ରହଣ କରିଥିଲେ ଏବଂ ପୋର୍ଟ ଏଲିଜାବେଥରେ ବଢ଼ିଥିଲେ। ସେ ୨୦୦୫ ମସିହାରେ ନେଲସନ୍ ମାଣ୍ଡେଲା ମେଟ୍ରୋପଲିଟାନ୍ ୟୁନିଭର୍ସିଟିରୁ ଆଇନରେ ସ୍ନାତକ (LLB) ডিগ୍ରୀ ହାସଲ କରିଥିଲେ ଏବଂ ୨୦୧୧ ଶେଷভাଗରେ ଜଣେ ଆଇନଜୀବୀ (Advocate) ହେବା ପାଇଁ ଆବେଦନ କରିଥିଲେ।",
              "contributions": "ରିভা ଘରୋଇ ନିର୍ଯାତନା ବିରୁଦ୍ଧରେ ସଚେତନତା ସୃଷ୍ଟି କରିବା ଆରମ୍ଭ କରିଥିଲେ, ଯାହା ତାଙ୍କ ମା’ ଜୁନ୍ ଷ୍ଟିନক୍ୟାମ୍ପ (June Steenkamp) ନିଶ୍ଚିତ করেছেন। ୧୪ ଫେବୃଆରୀ ୨୦୧୩ ପାଇଁ ସେ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ଉଦ୍ଦେଶ୍ୟରେ ଆତ୍ମ-ସମ୍ମାନ ଏବଂ ସୁସ୍ଥ ସମ୍ପର୍କ ବିଷୟରେ ଏକ ଭାଷଣ ପ୍ରସ୍ତୁତ କରିଥିଲେ, ଯାହା ସେ କେବେ ଦେଇপାରିଲେ ନାହିଁ।",
              "factualContext": "୧୪ ଫେବୃଆରୀ ୨୦୧୩ ଭୋର ସମୟରେ প্রିଟୋରିଆରେ ତାଙ୍କ ପ୍ରେମିକ ଅସ୍କାର ପିଷ୍ଟୋରିଅସଙ୍କ ଘରେ ବାଥରୁମର ବନ୍ଦ ଟଏଲେଟ୍-କ୍ୟୁବିକଲ୍ କବାଟ ମଧ୍ୟ ଦେଇ ଚାରିটি ଗୁଳି ଚଳାଇବାରୁ ରିভাଙ୍କର ମୃତ୍ୟୁ ଘଟିଥିଲା।\n\nନ୍ୟାୟିକ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ:\n• ସେପ୍ଟେମ୍ବର ୨୦୧୪: ପ୍ରିଟୋରିଆ ହାଇକୋର୍ଟ ପିଷ୍ଟୋରିଅସଙ୍କୁ 'culpable homicide' ରେ ଦୋଷୀ ସାବ୍ୟସ୍ତ କଲେ।\n• ଡିସେମ୍ବର ୨୦୧୫: ସୁପ୍ରିମ୍ କୋର୍ଟ ଅଫ୍ ଅପିଲ୍ ([2015] ZASCA 204) ଏହାକୁ ପରିବର୍ତ୍ତନ କରି ହତ୍ୟା (murder) ପାଇଁ ଦୋଷୀ ସାବ୍ୟସ୍ତ କଲେ।\n• ଜୁଲାଇ ୨୦୧୬: ୬ ବର୍ଷ କାରାଦଣ୍ଡ।\n• ନଭେମ୍ବର ୨୦୧୭: ଦଣ୍ଡ ୧୩ ବର୍ଷ ୫ ମାସକୁ ବୃଦ୍ଧି କରାଗଲା।\n• ଜାନୁଆରୀ ୨୦୨୪: ୫ ଜାନୁଆରୀ ୨୦୨୪ ରୁ ପ্যারୋଲ୍ ପ୍ରଦାନ କରାଗଲା।",
              "editorialNotes": "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସମ୍ପାଦକୀୟ ଟିପ୍ପଣୀ: ରିভা ଜଣେ ଉଦୀୟମାନ ନିର୍ଯାତନା-ବିରୋଧୀ ପ୍ରବକ୍ତା ଥିଲେ ଏବଂ ତାଙ୍କ ମୃତ୍ୟୁ ପରେ ତାଙ୍କ ମା’ ଜୁନ୍ ଷ୍ଟିନক୍ୟାମ୍ପ 'Reeva Rebecca Steenkamp Foundation' ମାଧ୍ୟମରେ ତାଙ୍କର କାର୍ଯ୍ୟକୁ ଆଗେଇ ନେଇଛନ୍ତି।",
              "verifiedFacts": [
                  "ରିভা ରେବେକା ଷ୍ଟିନক୍ୟାମ୍ପ (ଜନ୍ମ ୧୯ ଅଗଷ୍ଟ ୧୯୮୩) ୨୦୦୫ ରେ ନେଲସନ୍ ମାଣ୍ଡେଲା ମେଟ୍ରୋପଲିଟାନ୍ ୟୁନିଭର୍ସିଟିରୁ LLB ଡିଗ୍ରୀ ହାସଲ କରିଥିଲେ।",
                  "୨୦୧୧ ଶେଷରେ ସେ ଆଇନଜୀବୀ ହେବାକୁ ଆବେଦନ କରିଥିଲେ ଏବଂ ଘରୋଇ ନିର୍ଯାତନା ବିରୁଦ୍ଧରେ ସ୍ୱର ଉତ୍ତୋଳନ କରିବା ଆରମ୍ଭ କରିଥିଲେ।",
                  "୧୪ ଫେବୃଆରୀ ୨୦୧୩ ପାଇଁ ସେ ଏକ ବିଦ୍ୟାଳୟ ଭାଷଣ ପ୍ରସ୍ତୁତ କରିଥିଲେ ଯାହା ସେ ଦେଇପାରିନଥିଲେ।",
                  "୧୪ ଫେବୃଆରୀ ୨୦୧୩ ଭୋରରେ ଅସ୍କାର ପିଷ୍ଟୋରିଅସ୍ ବନ୍ଦ ଟଏଲେଟ୍-କ୍ୟୁବିକଲ୍ କବାଟ ଦେଇ ଚାରିଟି ଗୁଳି ଚଳାଇବାରୁ ରିভাଙ୍କର ମୃତ୍ୟୁ ହୋଇଥିଲା।",
                  "୩ ଡିସେମ୍ବର ୨୦୧୫ ରେ ସୁପ୍ରିମ୍ କୋର୍ଟ ଅଫ୍ ଅପିଲ୍ ([2015] ZASCA 204) ହତ୍ୟା ଦୋଷ ସାବ୍ୟସ୍ତ କରିଥିଲେ; ନଭେମ୍ବର ୨୦୧୭ ରେ ଦଣ୍ଡ ୧୩ ବର୍ଷ ୫ ମାସ କରାଯାଇଥିଲା ଏବଂ ୫ ଜାନୁଆରୀ ୨୦୨୪ ରୁ ପ্যারୋଲ୍ ଲାଗୁ ହୋଇଥିଲା।",
                  "ତାଙ୍କ ମା’ ଜୁନ୍ ଷ୍ଟିନক୍ୟାମ୍ପ ନଭେମ୍ବର ୨୦୧୫ ରେ ପଞ୍ଜୀକୃତ ଏବଂ ଅଗଷ୍ଟ ୨୦୧୬ ରେ ଉଦଘାଟିତ 'ରିভা ରେବେକା ଷ୍ଟିନক୍ୟାମ୍ପ ଫାଉଣ୍ଡେସନ୍' ମାଧ୍ୟମରେ ତାଙ୍କ କାର୍ଯ୍ୟ ଜାରି ରଖିଛନ୍ତି।"
              ],
              "societalImpact": "ରିভা ରେବେକା ଷ୍ଟିନক୍ୟାମ୍ପ ଫାଉଣ୍ଡେସନ୍ (ନଭେମ୍ବର ୨୦୧୫ ରେ ପଞ୍ଜୀକୃତ, ଅଗଷ୍ଟ ୨୦୧୬ ରେ ଆରମ୍ଭ):\nଜୁନ୍ ଷ୍ଟିନক୍ୟାମ୍ପଙ୍କ ଦ୍ୱାରା ପରିଚାଳିତ ଏହି ଅନୁଷ୍ଠାନ ନିର୍ଯାତନା ଶିକ୍ଷା, ପୀଡ଼ିତା ସହାୟତା, ପୋର୍ଟ ଏଲିଜାବେଥରେ ଆଇନଗତ ସହାୟତା, ତୃତୀୟ ବର୍ଷର ଆଇନ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ 'Reeva Bursary', 'REEVA Pack' ଏବଂ #BluePurpleBlack ଅଭିଯାନ ପରିଚାଳନା କରିଆସିଛି।",
              "actionableLesson": "ନିର୍ଯାତନା କେବଳ ଶାରୀରିକ ହିଂସା ନୁହେଁ; ବାଧ୍ୟତାମୂଳକ ନିୟନ୍ତ୍ରଣ (coercive control), ଭୟଭୀତ କରିବା, ମାନସିକ ନିର୍ଯାତନା ଏବଂ ଏକଘରିକିଆ କରିଦେବା ଭଳି ଆଚରଣକୁ ଚିହ୍ନିବା ଏବଂ ସୁରକ୍ଷିତ ଆଇନଗତ ସହାୟତା ପାଇବା ପାଇଁ ଶିକ୍ଷା ଅତ୍ୟନ୍ତ ଜରୁରୀ।",
              "memorialPublication": {
                  "title": "ବାଧ୍ୟତାମୂଳକ ନିୟନ୍ତ୍ରଣ ଚିହ୍ନଟ ଏବଂ ସୁରକ୍ଷିତ ସମ୍ପର୍କ ଶିକ୍ଷା ପାଠ୍ୟକ୍ରମ",
                  "focus": "ଅନ୍ତରଙ୍ଗ ସାଥୀ ହିଂସା ପ୍ରତିରୋଧ · ଯୁବ ଶିକ୍ଷା · ଆଇନଗତ ସାକ୍ଷରତା",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ବିଦ୍ୟାଳୟ ଓ ବିଶ୍ୱବିଦ୍ୟାଳୟ ପାଇଁ ପ୍ରସ୍ତାବିତ ପାଠ୍ୟକ୍ରମ: ନିର୍ଯାତନା ବୁଝିବା, ବାଧ୍ୟତାମୂଳକ ନିୟନ୍ତ୍ରଣ ଚିହ୍ନିବା, ସୁସ୍ଥ ସମ୍ପର୍କ, ସୁରକ୍ଷିତ ସହାୟତା ମାର୍ଗ ଏବଂ ଆଇନଗତ ସାକ୍ଷରତା।"
              }
          },
          "de": {
              "country": "Südafrika",
              "categoryLabel": "Recht, Fürsprache & Aufklärung gegen Missbrauch",
              "roleAndField": "Juristin (LLB) · Professionelles Model · Angehende Fürsprecherin gegen häusliche Gewalt",
              "coreMessage": "Die Identität eines Menschen darf niemals auf die Gewalt reduziert werden, die sein Leben beendet hat. Reeva Steenkamp war eine Juristin, ein erfolgreiches Model, eine Medienpersönlichkeit und eine junge Frau, die begonnen hatte, ihre öffentliche Plattform zu nutzen, um sich gegen häusliche Gewalt und Vergewaltigung einzusetzen.",
              "whoWasThisPerson": "Reeva Rebecca Steenkamp wurde am 19. August 1983 in Kapstadt, Südafrika, geboren und wuchs in Port Elizabeth auf.\n\nSie studierte Rechtswissenschaften an der Nelson Mandela Metropolitan University und schloss ihr Studium 2005 mit dem Bachelor of Laws (LLB) ab. Parallel zu ihrer Ausbildung baute sie eine erfolgreiche Modelkarriere auf, die sie bereits als Teenager begonnen hatte. Darüber hinaus arbeitete sie als Moderatorin bei Fashion TV und nahm an der Reality-TV-Sendung Tropika Island of Treasure teil.\n\nReeva hatte ihre juristischen Ambitionen nicht aufgegeben. Einem zeitgenössischen BBC-Porträt zufolge hatte sie sich Ende 2011 um die Zulassung zur Rechtsanwaltschaft (Bar) beworben und hoffte, als Prozessanwältin (Advocate) tätig zu werden.",
              "contributions": "Reeva hatte begonnen, ihre Bekanntheit zu nutzen, um das Bewusstsein für häusliche Gewalt und Vergewaltigung zu schärfen. Ihre Mutter June Steenkamp bestätigte später in ihrer Opfer-Auswirkungserklärung (Victim Impact Statement), dass Reeva begonnen hatte, sich für Betroffene dieser Gewaltformen einzusetzen.\n\nEin besonders bedeutsames Beispiel war ein Schulvortrag, den Reeva für den 14. Februar 2013 vorbereitet hatte. Sie wollte vor jungen Schülerinnen und Schülern über Selbstwertgefühl, Beziehungen und die Bedeutung innerer Werte sprechen. Sie konnte diesen Vortrag nie halten.\n\nEs ist wichtig, dieses beginnende Engagement von einer langjährigen formellen Kampagne zu unterscheiden: Reeva stand am Anfang dieser Arbeit, als ihr das Leben genommen wurde.",
              "factualContext": "In den frühen Morgenstunden des 14. Februar 2013 wurde Reeva im Haus ihres Freundes Oscar Pistorius in Pretoria tödlich angeschossen. Pistorius feuerte vier Schüsse durch die geschlossene Tür einer Toilettenkabine (toilet cubicle) im Badezimmer ab. Reeva, die sich darin befand, wurde getroffen und erlag ihren Verletzungen.\n\nGerichtsverfahren und rechtliches Ergebnis:\n• September 2014: Pistorius wurde vom High Court in Pretoria wegen fahrlässiger Tötung (culpable homicide) verurteilt.\n• Dezember 2015: Der Supreme Court of Appeal hob dieses Urteil auf und ersetzte es durch eine Verurteilung wegen Mordes (murder), da die rechtlichen Voraussetzungen für dolus eventualis erfüllt waren.\n• Juli 2016: Das High Court verurteilte ihn wegen Mordes zu sechs Jahren Freiheitsstrafe.\n• November 2017: Nach weiteren Berufungsverfahren wurde das Strafmaß auf 13 Jahre und fünf Monate erhöht.\n• Januar 2024: Die südafrikanische Strafvollzugsbehörde bestätigte, dass Pistorius mit Wirkung vom 5. Januar 2024 auf Bewährung (Parole) entlassen wurde.",
              "editorialNotes": "Wichtige redaktionelle Differenzierungen: Dass Reeva begonnen hatte, sich gegen Missbrauch einzusetzen, wird durch die Erklärung ihrer Mutter und zeitgenössische Berichte gestützt; sie wird präzise als angehende Fürsprecherin beschrieben. Die Arbeit der Reeva Rebecca Steenkamp Foundation wurde von ihrer Mutter June Steenkamp fortgeführt.",
              "verifiedFacts": [
                  "Reeva Rebecca Steenkamp (geb. 19. August 1983 in Kapstadt, aufgewachsen in Port Elizabeth) schloss 2005 ihr Jurastudium (LLB) an der Nelson Mandela Metropolitan University ab und arbeitete erfolgreich als Model und im Medienbereich.",
                  "Laut BBC-Berichten hatte sie sich Ende 2011 um die Zulassung als Rechtsanwältin (Advocate) beworben, und die Victim Impact Statement ihrer Mutter June Steenkamp (2023) bestätigt ihr beginnendes Engagement gegen häusliche Gewalt.",
                  "Für den 14. Februar 2013 hatte sie eine Schulrede über Selbstwertgefühl und Beziehungen vorbereitet, die sie nicht mehr halten konnte.",
                  "Am frühen Morgen des 14. Februar 2013 feuerte Oscar Pistorius vier Schüsse durch die geschlossene Toilettenkabinentür im Badezimmer seines Hauses in Pretoria ab und tötete Reeva.",
                  "Am 3. Dezember 2015 wandelte der Supreme Court of Appeal ([2015] ZASCA 204) das Urteil wegen fahrlässiger Tötung in eine Verurteilung wegen Mordes um; im November 2017 wurde die Strafe auf 13 Jahre und 5 Monate erhöht, mit Bewährung ab dem 5. Januar 2024.",
                  "Ihre Mutter June Steenkamp führte Reevas Arbeit durch die Reeva Rebecca Steenkamp Foundation (registriert im November 2015, offiziell eröffnet im August 2016) fort."
              ],
              "societalImpact": "Ein fortgeführtes Vermächtnis — Die Reeva Rebecca Steenkamp Foundation:\nNach Reevas Tod führte ihre Mutter June Steenkamp die Arbeit fort, die Reeva begonnen hatte. Die Stiftung wurde im November 2015 registriert und im August 2016 offiziell ins Leben gerufen. Zu ihren Aufgaben gehören:\n• Aufklärung über Missbrauch (physischer, sexueller, emotionaler, verbaler, psychologischer und ökonomischer Missbrauch sowie Einschüchterung, Stalking und Isolation).\n• Opferunterstützung und Fürsprache.\n• Rechtshilfe (Pilotprojekt mit Anwälten in Port Elizabeth).\n• Bildung und Stärkung von Frauen.\n• Reeva Bursary: Ein jährliches Stipendium für Studierende der Rechtswissenschaften im dritten Studienjahr mit Schwerpunkt Familienrecht.\n• REEVA Pack sowie die Kampagne #BluePurpleBlack.",
              "actionableLesson": "Reevas Geschichte verdeutlicht, dass Missbrauch nicht auf körperliche Gewalt beschränkt ist. Bildung sollte jungen Menschen helfen, Folgendes zu erkennen:\n• Zwanghaftes und kontrollierendes Verhalten (Coercive Control).\n• Besitzergreifendes Verhalten, Einschüchterung und wiederholte Demütigung.\n• Emotionalen und psychologischen Missbrauch sowie soziale Isolation.\n• Sichere Wege zur Hilfesuche und den Zugang zu rechtlichem Schutz.\nDie Verantwortung für die Verhinderung von Gewalt liegt bei den Tätern, den Institutionen und der Gesellschaft – niemals allein bei den Betroffenen.",
              "memorialPublication": {
                  "title": "Lehrplan zur Erkennung von Zwangskontrolle und für sichere Beziehungen",
                  "focus": "Prävention von Partnerschaftsgewalt · Jugendbildung · Rechtliche Grundbildung",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Ein vorgeschlagener Lehrplan für Schulen, Hochschulen und Universitäten mit Modulen zu Missbrauchserkennung, Zwangskontrolle (Coercive Control), gesunden Beziehungen, sicheren Unterstützungswegen, rechtlicher Grundbildung und Zivilcourage."
              }
          },
          "es": {
              "country": "Sudáfrica",
              "categoryLabel": "Derecho, Defensa y Educación contra el Abuso",
              "roleAndField": "Licenciada en Derecho (LLB) · Modelo Profesional · Defensora Emergente contra el Abuso Doméstico",
              "coreMessage": "La identidad de una persona nunca debe reducirse a la violencia que puso fin a su vida. Reeva Steenkamp era licenciada en Derecho, una modelo de éxito, una personalidad de los medios y una joven que había comenzado a utilizar su plataforma pública para hablar en contra del abuso doméstico y la violación.",
              "whoWasThisPerson": "Reeva Rebecca Steenkamp nació el 19 de agosto de 1983 en Ciudad del Cabo, Sudáfrica, y creció en Port Elizabeth.\n\nEstudió Derecho en la Universidad Metropolitana Nelson Mandela, donde se graduó con una licenciatura en Derecho (LLB) en 2005. Junto con su formación académica, desarrolló una exitosa carrera como modelo y trabajó como presentadora en Fashion TV y participante en el programa Tropika Island of Treasure.\n\nReeva no había abandonado sus ambiciones jurídicas. Un perfil contemporáneo de la BBC informó que había solicitado el ingreso al colegio de abogados a finales de 2011 con la esperanza de ejercer como abogada defensora (advocate).",
              "contributions": "Reeva había comenzado a utilizar su perfil público para concienciar sobre el abuso doméstico y la violación, según confirmó posteriormente su madre, June Steenkamp, en su declaración de impacto de la víctima.\n\nUn ejemplo especialmente significativo fue una charla escolar que Reeva había preparado para el 14 de febrero de 2013, en la que tenía previsto hablar a jóvenes estudiantes sobre la autoestima, las relaciones y la importancia de valorar a las personas por quienes son. Nunca llegó a pronunciar esa charla.\n\nEs importante distinguir esta defensa emergente de una campaña formal consolidada: Reeva estaba iniciando esta labor cuando le arrebataron la vida.",
              "factualContext": "En la madrugada del 14 de febrero de 2013, Reeva murió tiroteada en el domicilio de su novio, Oscar Pistorius, en Pretoria. Pistorius efectuó cuatro disparos a través de la puerta cerrada del cubículo del inodoro (toilet cubicle) dentro del cuarto de baño.\n\nProcedimientos judiciales y resultado legal:\n• Septiembre de 2014: Pistorius fue declarado culpable de homicidio culposo (culpable homicide) por el Tribunal Superior de Pretoria.\n• Diciembre de 2015: El Tribunal Supremo de Apelación anuló esa condena y la sustituyó por una condena por asesinato (murder), al determinar que se cumplían los requisitos legales de dolus eventualis.\n• Julio de 2016: El Tribunal Superior lo condenó a seis años de prisión por asesinato.\n• Noviembre de 2017: Tras nuevos recursos de apelación, la pena fue aumentada a 13 años y cinco meses.\n• Enero de 2024: El Departamento de Servicios Correccionales de Sudáfrica confirmó su puesta en libertad condicional efectiva el 5 de enero de 2024.",
              "editorialNotes": "Precisiones editoriales importantes: El compromiso emergente de Reeva contra el abuso está respaldado por la declaración de su madre y los informes de prensa contemporáneos. La Fundación Reeva Rebecca Steenkamp fue impulsada y continuada por su madre, June Steenkamp.",
              "verifiedFacts": [
                  "Reeva Rebecca Steenkamp (nacida el 19 de agosto de 1983 en Ciudad del Cabo y criada en Port Elizabeth) se graduó en Derecho (LLB) por la Universidad Metropolitana Nelson Mandela en 2005.",
                  "Según informes de la BBC, solicitó el ingreso a la abogacía a finales de 2011 y, como confirmó su madre June Steenkamp en su declaración de 2023, había empezado a alzar su voz contra el abuso doméstico y la violación.",
                  "Había preparado una charla escolar para el 14 de febrero de 2013 sobre autoestima y relaciones que nunca pudo pronunciar.",
                  "En la madrugada del 14 de febrero de 2013, Oscar Pistorius disparó cuatro veces a través de la puerta cerrada del cubículo del inodoro en el baño de su casa de Pretoria, causando la muerte de Reeva.",
                  "El 3 de diciembre de 2015, el Tribunal Supremo de Apelación de Sudáfrica ([2015] ZASCA 204) sustituyó la condena de homicidio culposo por la de asesinato; en noviembre de 2017 la pena se elevó a 13 años y 5 meses, con libertad condicional efectiva el 5 de enero de 2024.",
                  "Su madre, June Steenkamp, continuó su labor a través de la Fundación Reeva Rebecca Steenkamp (registrada en noviembre de 2015 e inaugurada oficialmente en agosto de 2016)."
              ],
              "societalImpact": "Un legado continuado — La Fundación Reeva Rebecca Steenkamp:\nTras la muerte de Reeva, su madre, June Steenkamp, llevó adelante el trabajo que Reeva había comenzado. Registrada en noviembre de 2015 y lanzada oficialmente en agosto de 2016, su labor incluye:\n• Educación sobre el abuso (físico, sexual, emocional, verbal, psicológico y económico, así como intimidación, acoso y aislamiento).\n• Apoyo y defensa de las víctimas.\n• Asistencia jurídica (proyecto piloto con abogados en Port Elizabeth).\n• Educación y empoderamiento femenino.\n• Beca Reeva (Reeva Bursary): Beca anual para un estudiante de tercer año de Derecho interesado en Derecho de Familia.\n• REEVA Pack y la campaña #BluePurpleBlack.",
              "actionableLesson": "La historia de Reeva subraya la importancia de reconocer que el abuso no se limita a la violencia física. La educación debe ayudar a los jóvenes a comprender:\n• El comportamiento coercitivo y controlador.\n• La posesividad, la intimidación y la humillación repetida.\n• El abuso emocional y psicológico y el aislamiento de amigos y familiares.\n• Cómo buscar ayuda de forma segura y acceder a la protección legal sin culpar a la víctima.",
              "memorialPublication": {
                  "title": "Currículo de Reconocimiento del Control Coercitivo y Educación sobre Relaciones Seguras",
                  "focus": "Prevención de la Violencia de Pareja · Educación Juvenil · Alfabetización Jurídica",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Un currículo educativo propuesto para escuelas, colegios y universidades con módulos sobre comprensión del abuso, reconocimiento del control coercitivo, relaciones saludables, vías seguras de apoyo, alfabetización jurídica y responsabilidad de los testigos."
              }
          },
          "fr": {
              "country": "Afrique du Sud",
              "categoryLabel": "Droit, Plaidoyer et Éducation contre les Violences",
              "roleAndField": "Diplômée en droit (LLB) · Mannequin professionnelle · Défenseure émergente contre les violences conjugales",
              "coreMessage": "L'identité d'une personne ne doit jamais être réduite à la violence qui a mis fin à ses jours. Reeva Steenkamp était diplômée en droit, mannequin accomplie, personnalité des médias et une jeune femme qui commençait à utiliser sa notoriété publique pour dénoncer les violences conjugales et le viol.",
              "whoWasThisPerson": "Reeva Rebecca Steenkamp est née le 19 août 1983 au Cap, en Afrique du Sud, et a grandi à Port Elizabeth.\n\nElle a étudié le droit à l'Université métropolitaine Nelson Mandela, où elle a obtenu une licence en droit (Bachelor of Laws, LLB) en 2005. Parallèlement à ses études, elle a mené une brillante carrière de mannequin, travaillant également comme présentatrice sur Fashion TV et participant à l'émission Tropika Island of Treasure.\n\nReeva n'avait pas renoncé à ses ambitions juridiques. Un portrait contemporain de la BBC rapportait qu'elle avait postulé au barreau fin 2011 dans l'espoir de devenir avocate plaidante (advocate).",
              "contributions": "Reeva avait commencé à utiliser sa notoriété publique pour sensibiliser aux violences conjugales et au viol, comme l'a confirmé sa mère, June Steenkamp, dans sa déclaration de victime (Victim Impact Statement).\n\nUn exemple particulièrement significatif était une intervention scolaire que Reeva avait préparée pour le 14 février 2013 afin de parler aux jeunes élèves de l'estime de soi, des relations et de l'importance d'apprécier les personnes pour ce qu'elles sont. Elle n'a jamais pu prononcer ce discours.\n\nIl importe de distinguer cet engagement émergent d'une campagne formelle établie de longue date : Reeva commençait ce travail lorsque sa vie lui a été ôtée.",
              "factualContext": "Aux premières heures du 14 février 2013, Reeva a été mortellement touchée par balles au domicile de son compagnon, Oscar Pistorius, à Pretoria. Pistorius a tiré quatre coups de feu à travers la porte fermée d'une cabine de toilettes (toilet cubicle) située dans la salle de bain.\n\nProcédures judiciaires et issue juridique :\n• Septembre 2014 : Pistorius est reconnu coupable d'homicide involontaire (culpable homicide) par la Haute Cour de Pretoria.\n• Décembre 2015 : La Cour suprême d'appel annule cette condamnation et lui substitue une condamnation pour meurtre (murder), jugeant que les critères juridiques du dolus eventualis étaient réunis.\n• Juillet 2016 : La Haute Cour le condamne à six ans de prison pour meurtre.\n• Novembre 2017 : À la suite d'un nouvel appel, la peine est portée à 13 ans et cinq mois.\n• Janvier 2024 : Le Département des services correctionnels d'Afrique du Sud confirme sa libération conditionnelle à compter du 5 janvier 2024.",
              "editorialNotes": "Précisions éditoriales importantes : L'engagement émergent de Reeva contre les violences est attesté par la déclaration de sa mère et les reportages de l'époque. La Fondation Reeva Rebecca Steenkamp a été créée et poursuivie par sa mère, June Steenkamp.",
              "verifiedFacts": [
                  "Reeva Rebecca Steenkamp (née le 19 août 1983 au Cap, ayant grandi à Port Elizabeth) a obtenu son diplôme de droit (LLB) à l'Université métropolitaine Nelson Mandela en 2005.",
                  "Selon la BBC, elle avait postulé au barreau fin 2011 avec l'ambition de devenir avocate, et la déclaration de sa mère June Steenkamp (2023) confirme qu'elle avait commencé à s'exprimer publiquement contre les violences conjugales.",
                  "Elle avait préparé un discours scolaire pour le 14 février 2013 sur l'estime de soi et les relations qu'elle n'a jamais pu prononcer.",
                  "Au matin du 14 février 2013, Oscar Pistorius a tiré quatre coups de feu à travers la porte fermée de la cabine de toilettes de sa salle de bain à Pretoria, tuant Reeva.",
                  "Le 3 décembre 2015, la Cour suprême d'appel d'Afrique du Sud ([2015] ZASCA 204) a requalifié l'homicide involontaire en meurtre ; en novembre 2017, la peine a été portée à 13 ans et 5 mois, avec libération conditionnelle le 5 janvier 2024.",
                  "Sa mère, June Steenkamp, a poursuivi son engagement à travers la Fondation Reeva Rebecca Steenkamp (enregistrée en novembre 2015 et lancée officiellement en août 2016)."
              ],
              "societalImpact": "Un héritage poursuivi — La Fondation Reeva Rebecca Steenkamp :\nAprès la mort de Reeva, sa mère, June Steenkamp, a poursuivi l'œuvre que Reeva avait amorcée. Enregistrée en novembre 2015 et officiellement lancée en août 2016, la fondation œuvre dans les domaines suivants :\n• Éducation sur les violences (physiques, sexuelles, émotionnelles, verbales, psychologiques et économiques, ainsi que l'intimidation, le harcèlement et l'isolement).\n• Soutien et accompagnement des victimes.\n• Assistance juridique (projet pilote avec des avocats à Port Elizabeth).\n• Bourse Reeva (Reeva Bursary) : Bourse annuelle attribuée à un étudiant en troisième année de droit s'intéressant au droit de la famille.\n• REEVA Pack et campagne #BluePurpleBlack.",
              "actionableLesson": "L'histoire de Reeva rappelle que la maltraitance ne se limite pas à la violence physique. L'éducation doit aider les jeunes à identifier :\n• Les comportements coercitifs et de contrôle.\n• La possessivité, l'intimidation et l'humiliation répétée.\n• Les violences émotionnelles et psychologiques ainsi que l'isolement.\n• Les moyens de demander de l'aide en toute sécurité et d'accéder aux protections juridiques.",
              "memorialPublication": {
                  "title": "Programme d'éducation à la reconnaissance du contrôle coercitif et aux relations saines",
                  "focus": "Prévention des violences entre partenaires intimes · Éducation des jeunes · Culture juridique",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Un programme éducatif proposé pour les écoles, collèges et universités comprenant des modules sur la compréhension des violences, le contrôle coercitif, les relations respectueuses, les parcours d'aide sécurisés, la culture juridique et la responsabilité des témoins."
              }
          },
          "hr": {
              "country": "Južnoafrička Republika",
              "categoryLabel": "Pravo, zagovaranje i edukacija protiv zlostavljanja",
              "roleAndField": "Diplomirana pravnica (LLB) · Profesionalni model · Nova zagovornica borbe protiv obiteljskog nasilja",
              "coreMessage": "Identitet osobe nikada se ne smije svesti na nasilje koje je prekinulo njezin život. Reeva Steenkamp bila je diplomirana pravnica, uspješan model, medijska ličnost i mlada žena koja je počela koristiti svoju javnu platformu kako bi govorila protiv obiteljskog zlostavljanja i silovanja.",
              "whoWasThisPerson": "Reeva Rebecca Steenkamp rođena je 19. kolovoza 1983. u Cape Townu u Južnoafričkoj Republici, a odrasla je u Port Elizabethu.\n\nStudirala je pravo na Sveučilištu Nelson Mandela Metropolitan, gdje je 2005. godine diplomirala kao prvostupnica prava (Bachelor of Laws, LLB). Uz obrazovanje izgradila je uspješnu manekensku karijeru te radila kao voditeljica na Fashion TV-u i sudjelovala u televizijskoj emisiji Tropika Island of Treasure.\n\nReeva nije odustala od svojih pravnih ambicija. Prema tadašnjem profilu BBC-ja, krajem 2011. prijavila se u odvjetničku komoru s nadom da će postati odvjetnica (advocate).",
              "contributions": "Reeva je počela koristiti svoju javnu prepoznatljivost za podizanje svijesti o obiteljskom zlostavljanju i silovanju, što je njezina majka June Steenkamp kasnije potvrdila u svojoj izjavi o učinku kaznenog djela na žrtvu.\n\nPosebno značajan primjer bio je školski govor koji je Reeva pripremila za 14. veljače 2013., u kojem je namjeravala govoriti mladim učenicima o samopoštovanju, odnosima i važnosti vrednovanja ljudi prema tome tko su, a ne prema fizičkom izgledu. Taj govor nikada nije održala.\n\nVažno je razlikovati ovo početno zagovaranje od dugotrajne formalne kampanje: Reeva je tek započinjala taj rad kada joj je oduzet život.",
              "factualContext": "U ranim jutarnjim satima 14. veljače 2013. Reeva je smrtno nastrijeljena u domu svog dečka Oscara Pistoriusa u Pretoriji. Pistorius je ispalio četiri hica kroz zatvorena vrata toaletne kabine (toilet cubicle) u kupaonici.\n\nSudski postupak i pravni epilog:\n• Rujan 2014.: Visoki sud u Pretoriji osudio je Pistoriusa za ubojstvo iz nehaja (culpable homicide).\n• Prosinac 2015.: Vrhovni žalbeni sud ukinuo je tu presudu i preinačio je u presudu za ubojstvo (murder), utvrdivši da su ispunjeni pravni uvjeti za dolus eventualis.\n• Srpanj 2016.: Visoki sud osudio ga je na šest godina zatvora zbog ubojstva.\n• Studeni 2017.: Nakon daljnjeg žalbenog postupka kazna je povećana na 13 godina i pet mjeseci.\n• Siječanj 2024.: Južnoafrički Odjel za korektivne službe potvrdio je da je Pistorius pušten na uvjetni otpust s učinkom od 5. siječnja 2024.",
              "editorialNotes": "Važne uredničke napomene: Tvrdnja da je Reeva započela zagovaranje protiv zlostavljanja potkrijepljena je izjavom njezine majke i tadašnjim izvješćima; precizno se opisuje kao nova zagovornica. Rad Zaklade Reeva Rebecca Steenkamp nastavila je njezina majka June Steenkamp.",
              "verifiedFacts": [
                  "Reeva Rebecca Steenkamp (rođena 19. kolovoza 1983. u Cape Townu, odrasla u Port Elizabethu) diplomirala je pravo (LLB) na Sveučilištu Nelson Mandela Metropolitan 2005. godine.",
                  "Prema izvješćima BBC-ja, krajem 2011. prijavila se za odvjetničku komoru, a izjava njezine majke June Steenkamp iz 2023. potvrđuje da je počela javno govoriti protiv obiteljskog zlostavljanja.",
                  "Za 14. veljače 2013. pripremila je školski govor o samopoštovanju i odnosima koji nikada nije održala.",
                  "Ujutro 14. veljače 2013. Oscar Pistorius ispalio je četiri hica kroz zatvorena vrata toaletne kabine u kupaonici svog doma u Pretoriji, usmrtivši Reevu.",
                  "Dana 3. prosinca 2015. Vrhovni žalbeni sud Južnoafričke Republike ([2015] ZASCA 204) preinačio je presudu za ubojstvo iz nehaja u presudu za ubojstvo; u studenome 2017. kazna je povećana na 13 godina i 5 mjeseci, uz uvjetni otpust od 5. siječnja 2024.",
                  "Njezina majka June Steenkamp nastavila je Reevin rad kroz Zakladu Reeva Rebecca Steenkamp (registriranu u studenome 2015. i službeno pokrenutu u kolovozu 2016.)."
              ],
              "societalImpact": "Nastavljeno nasljeđe — Zaklada Reeva Rebecca Steenkamp:\nNakon Reevine smrti njezina majka June Steenkamp nastavila je rad koji je Reeva započela. Zaklada je registrirana u studenome 2015. i službeno predstavljena u kolovozu 2016., a njezin rad obuhvaća:\n• Edukaciju o zlostavljanju (fizičkom, seksualnom, emocionalnom, verbalnom, psihološkom i ekonomskom te zastrašivanju, uhođenju i izolaciji).\n• Podršku i zagovaranje žrtava.\n• Pravnu pomoć (pilot-projekt s odvjetnicima u Port Elizabethu).\n• Stipendiju Reeva (Reeva Bursary): Godišnju stipendiju za studenta treće godine prava zainteresiranog za obiteljsko pravo.\n• REEVA Pack i kampanju #BluePurpleBlack.",
              "actionableLesson": "Reevina priča naglašava važnost prepoznavanja da zlostavljanje nije ograničeno samo na fizičko nasilje. Obrazovanje treba pomoći mladima razumjeti:\n• Prisilno i kontrolirajuće ponašanje (Coercive Control).\n• Posesivnost, zastrašivanje i opetovano ponižavanje.\n• Emocionalno i psihološko zlostavljanje te izolaciju od prijatelja i obitelji.\n• Kako sigurno potražiti pomoć i ostvariti pravnu zaštitu.",
              "memorialPublication": {
                  "title": "Kurikulum za prepoznavanje prisilne kontrole i obrazovanje o sigurnim odnosima",
                  "focus": "Prevencija nasilja u intimnim vezama · Obrazovanje mladih · Pravna pismenost",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Predloženi obrazovni kurikulum za škole, veleučilišta i sveučilišta s modulima o razumijevanju zlostavljanja, prepoznavanju prisilne kontrole, zdravim odnosima, sigurnim putovima podrške, pravnoj pismenosti i odgovornosti promatrača."
              }
          }
      }
  },
    {
      "id": 10,
      "slug": "mahsa-amini",
      "name": "Jina Mahsa Amini",
      "country": "Iran",
      "countryFlag": "🇮🇷",
      "category": "safety-and-justice",
      "categoryLabel": "Human Rights, Autonomy & Freedom",
      "eraOrYear": "2022",
      "roleAndField": "Student · Iranian Kurdish Woman · Catalyst of the Woman, Life, Freedom Movement",
      "avatarUrl": "https://images.openai.com/static-rsc-4/TIazFq5aohG1GLxEeGRmgNeaiyuYNA6Ytwt497ME-KDW7PWzAN_VejFEeX9Ciz_NletvQ_fRpFeovgrCS4OCpaGHZLjecJQ00olJS8J_3nORuJtbiLREg-nd0Arws1j9jjF_WEJuj2aG1-drFM1qkROkTmA-UlIrAwGdm0ZjKq4?purpose=inline",
      "verificationStatus": "Verified",
      "lastVerifiedAt": "2026-11-07",
      "coreMessage": "Personal dignity, bodily autonomy and fundamental human rights must be protected regardless of gender, ethnicity, religion or political circumstances. No person should lose their freedom or life through discriminatory enforcement of state policies.",
      "whoWasThisPerson": "Jina Mahsa Amini was a 22-year-old Kurdish woman from Saqqez, in Iran's Kurdistan Province.\n\nHer family and close relatives knew her as Jina, her Kurdish name. Mahsa was the name used in her official documents. Her Kurdish identity is an important part of her story and should not be omitted from her memorial.\n\nShe was interested in music and the performing arts. The UN Fact-Finding Mission's detailed investigation records that she played the violin, performed in local theatre, enjoyed singing and traditional Kurdish clothing, and spent time hiking and playing tennis.\n\nShe had been admitted to study microbiology at the Faculty of Medicine at Urmia University in West Azerbaijan Province. She was expected to begin her studies in late September 2022.\n\nHer ambitions included pursuing education and a future in healthcare-related studies. She was a young person preparing for the next stage of her life.",
      "contributions": "Jina was not a political leader or the organiser of a human rights campaign. Her importance in modern history arose from what happened to her and the public response that followed.\n\nHer death became the catalyst for the Woman, Life, Freedom movement, known in Kurdish as Jin, Jiyan, Azadî.\n\nThe movement brought together people across Iran and beyond, including women, young people, students, ethnic minorities and other communities. Its demands extended beyond the circumstances of Jina's arrest to include equality, freedom, bodily autonomy and an end to institutional discrimination.\n\nIt is important to preserve this distinction: Jina did not personally lead the movement. The people who protested, organised, documented abuses and continued to demand accountability gave the movement its strength.\n\nHer name became a symbol of a much wider struggle for human dignity.",
      "factualContext": "On 13 September 2022, Jina travelled with her family to Tehran.\n\nAt approximately 6:30 p.m., after leaving the Shahid Haqqani metro station with her brother, she was stopped and arrested by Iran's Guidance Patrol, commonly known as the morality police.\n\nAuthorities alleged that her clothing did not comply with mandatory hijab regulations. She was taken to the Vozara detention facility for what officials described as a re-education session.\n\nAccording to the UN Fact-Finding Mission:\n• She collapsed approximately 26 minutes after arriving at the detention facility.\n• She was transferred to Kasra Hospital in Tehran.\n• Her family was informed that she had been admitted in an extremely critical condition.\n• She remained in a coma and died on 16 September 2022.\n\nHer death occurred while she was in state custody.\n\nUN Investigation and Disputed Circumstances:\nThe Iranian authorities initially attributed her collapse to a medical emergency and subsequently presented an explanation involving a pre-existing medical condition and complications from childhood brain surgery.\n\nHer family disputed the official account and raised concerns about injuries sustained during detention.\n\nThe UN Independent International Fact-Finding Mission investigated the circumstances using witness interviews, medical material, expert assessments, official records and other evidence.\n\nIn its report A/HRC/55/67, dated 2 February 2024, and its detailed findings (A/HRC/55/CRP.1) published on 19 March 2024, the Mission concluded that:\n• Her arrest and detention were arbitrary and based on discriminatory mandatory-hijab laws and policies.\n• There was evidence of trauma to her body inflicted while she was in the custody of the morality police.\n• The Mission was satisfied that physical violence inflicted in custody led to her death.\n• The State bore responsibility for her unlawful death.\n• The Iranian authorities failed to conduct an investigation that met international standards of independence, impartiality, effectiveness and transparency.\n\nAn important medical and legal qualification: The Mission could not determine the precise immediate medical cause of death because the Iranian authorities did not disclose key police and medical records. However, it found that the alleged complications from her childhood surgery could be excluded as the immediate cause and that the available evidence supported its conclusion that physical violence in custody led to her death.\n\nThis distinction matters. The UN's conclusion was not merely an allegation or an unverified family claim; it was the finding of an independent international investigation applying the UN's reasonable-grounds standard of proof.",
      "editorialNotes": "Editorial and legal qualifications: (1) Her Kurdish name 'Jina' is preserved alongside 'Mahsa Amini' as 'Jina Mahsa Amini'. (2) Jina was not a political activist who organised the protests; her death was the catalyst for a movement led by many people. (3) The UN Independent International Fact-Finding Mission concluded under its reasonable-grounds standard that physical violence in custody led to her death and that the State bore responsibility for her unlawful death, while noting that the precise immediate medical mechanism could not be determined due to the State's non-disclosure of key medical and police records. (4) The 2023 Sakharov Prize was awarded jointly to Jina Mahsa Amini and the Woman, Life, Freedom movement. (5) Per the UN's March 2025 report (A/HRC/58/63), accountability remained unresolved and discriminatory enforcement continued. (6) The proposed custodial healthcare protocol is an UltimateHealth educational initiative, not an existing UN or governmental programme.",
      "verifiedFacts": [
          "Jina Mahsa Amini was a 22-year-old Iranian Kurdish woman from Saqqez, Kurdistan Province (known to her family as Jina), who had been admitted to study microbiology at the Faculty of Medicine at Urmia University starting in late September 2022.",
          "On 13 September 2022 at approximately 6:30 p.m., after leaving the Shahid Haqqani metro station in Tehran with her brother, she was arrested by Iran's Guidance Patrol (morality police) and taken to the Vozara detention facility, where she collapsed ~26 minutes after arrival and died in Kasra Hospital on 16 September 2022.",
          "In its March 2024 findings (A/HRC/55/67 and A/HRC/55/CRP.1), the UN Independent International Fact-Finding Mission on Iran concluded that her arrest was arbitrary, that she was subjected to physical violence in morality-police custody that led to her death, and that the State bore responsibility for her unlawful death.",
          "While the UN Mission could not determine the precise immediate medical mechanism of death because Iranian authorities withheld key records, it excluded alleged complications from childhood brain surgery as the immediate cause.",
          "Her death catalysed the Woman, Life, Freedom (Jin, Jiyan, Azadî) movement, and in October 2023 the European Parliament jointly awarded the 2023 Sakharov Prize for Freedom of Thought to Jina Mahsa Amini and the Woman, Life, Freedom movement (presented in Strasbourg on 12 December 2023).",
          "In its March 2025 report (A/HRC/58/63), the UN Fact-Finding Mission documented that the domestic case concerning her death remained stalled after more than two years without effective judicial proceedings, while her family faced continued pressure and restrictions."
      ],
      "disputedFacts": [
          "Iranian authorities claimed her collapse resulted from a pre-existing medical condition linked to childhood brain surgery; this official explanation was disputed by her family and excluded by the UN Independent International Fact-Finding Mission (A/HRC/55/67, March 2024), which concluded that physical violence in custody led to her unlawful death."
      ],
      "societalImpact": "Societal Impact — Woman, Life, Freedom (Jin, Jiyan, Azadî):\nFollowing news of Jina's death, protests began on 16 September 2022 and spread across Iran. The Kurdish slogan Jin, Jiyan, Azadî — Woman, Life, Freedom became the defining expression of the movement.\n\nThe protests were notable for the leadership and participation of women and young people. Demonstrators challenged compulsory veiling, discrimination and restrictions on fundamental freedoms. The movement also drew international attention to the treatment of women, children, protesters and ethnic minorities in Iran.\n\nThe UN Fact-Finding Mission documented serious violations in the State's response, including arbitrary detention, torture and ill-treatment, sexual and gender-based violence, unlawful killings and repression of peaceful dissent. Its broader investigation found reasonable grounds to believe that several of these violations constituted crimes against humanity.\n\nInternational Recognition — 2023 Sakharov Prize:\nIn October 2023, the European Parliament awarded the 2023 Sakharov Prize for Freedom of Thought jointly to Jina Mahsa Amini and the Woman, Life, Freedom movement in Iran. The award was formally presented in Strasbourg on 12 December 2023. Jina's family was represented at the ceremony by Saleh Nikbakht, the academic and lawyer representing the family. Other Iranian women's rights defenders also represented the movement. The award recognised both Jina's symbolic significance and the courage of the people who continued to demand equality, dignity and freedom.\n\nAccountability and Subsequent Developments:\nInternational recognition did not automatically produce justice or meaningful institutional reform. The UN Fact-Finding Mission's 2025 report, A/HRC/58/63, recorded continuing pressure on Jina's family. Among its findings:\n• Her family was prevented from commemorating her death in September 2024.\n• Her father was charged with propaganda against the State in January 2025 after protesting the death sentence of another activist.\n• The Mission reported that the case concerning Jina's death remained stalled for more than two years without effective judicial proceedings.\n• The Mission documented continuing discrimination and enforcement of mandatory-hijab policies, despite the protests and international attention.\n\nThe report also noted that the Iranian Government had communicated information about a proposed compensation and redress mechanism, but did not provide sufficient supporting details for the Mission to verify its operation or effectiveness.\n\nEditorial conclusion: It would be inaccurate to describe the Woman, Life, Freedom movement as having secured comprehensive legal reforms or accountability for Jina's death. The international findings and public mobilisation are significant, but the accountability process remained unresolved in the UN's 2025 reporting.",
      "actionableLesson": "Jina's case raises fundamental questions about the limits of state authority and the protection of people in detention.\n\nSociety and institutions must uphold:\n• Bodily autonomy: Personal dignity and freedom of conscience must not be overridden through discriminatory coercion.\n• Protection from arbitrary detention: No person should be deprived of liberty under discriminatory or unlawful policies.\n• Independent medical care: Detainees must receive prompt, impartial medical assessment and treatment.\n• Transparent investigations: Deaths and serious injuries in custody require independent investigation, preservation of evidence and access to relevant records.\n• Protection of families and witnesses: People seeking truth and accountability must be protected from intimidation and retaliation.\n• Equal protection: Ethnic, religious and gender identity must never become grounds for discrimination or unequal access to justice.",
      "memorialPublication": {
          "title": "Independent Custodial Healthcare & Human Rights Protection Protocol",
          "focus": "Custodial Health · Medical Independence · Forensic Accountability · Human Rights",
          "initiativeStatus": "Proposed Initiative",
          "deliverable": "A proposed framework to help healthcare professionals, independent investigators and human rights organisations protect the rights and medical safety of people in detention.\n\nPotential components:\n• Independent Medical Assessment: Ensure detainees can access qualified healthcare professionals without interference from custodial authorities.\n• Emergency Response Standards: Establish clear procedures for immediate medical intervention, emergency transfer and documentation.\n• Medical Record Integrity: Protect clinical records, imaging, examination findings and treatment documentation from alteration or suppression.\n• Independent Forensic Investigation: Use recognised international standards, including the Minnesota Protocol, when investigating potentially unlawful deaths.\n• Protection of Healthcare Workers: Develop safeguards against coercion, intimidation and interference with professional medical judgement.\n• Family and Legal Access: Establish transparent processes for families and legal representatives to obtain relevant medical and investigative information.\n• Accountability and Evidence Preservation: Maintain clear procedures for documenting injuries, preserving evidence and referring suspected violations to independent oversight bodies.\n\nThe framework should be developed with forensic specialists, medical associations, human rights organisations and legal experts. It is a proposed UltimateHealth initiative, not an existing UN or Iranian programme.\n\nUltimateHealth Editorial Perspective:\nJina Mahsa Amini was a young Kurdish woman with interests, relationships, education plans and aspirations of her own.\n\nHer life should not be remembered only through the political consequences of her death. Her Kurdish identity, her name, her interests and the future she was preparing for deserve recognition.\n\nHer death also exposed the consequences of discriminatory state policies and the dangers of failing to protect people in custody.\n\nThe movement that followed demonstrated how a personal tragedy can become a collective demand for dignity, freedom and accountability.\n\nRemember Jina. Respect her identity. Protect human dignity. Demand accountability."
      },
      "references": [
          {
              "title": "UN Human Rights Council — A/HRC/55/67 (2 February 2024): Primary report of the Independent International Fact-Finding Mission on Iran",
              "url": "https://documents.un.org/api/symbol/access?l=en&s=A%2FHRC%2F55%2F67&t=pdf",
              "publisher": "UN Human Rights Council",
              "isPrimary": true
          },
          {
              "title": "UN Independent International Fact-Finding Mission — A/HRC/55/CRP.1 (19 March 2024): Detailed factual investigation, biography, detention chronology, medical evidence and conclusions about State responsibility",
              "url": "https://www.zagros-centre.org/en/?p=533",
              "publisher": "UN Independent International Fact-Finding Mission (CRP.1)",
              "isPrimary": true
          },
          {
              "title": "UN Human Rights Council — A/HRC/58/63 (28 March 2025): Update on continued discrimination, harassment of the family, and lack of effective judicial proceedings in Jina's case",
              "url": "https://documents.un.org/api/symbol/access?l=en&s=A%2FHRC%2F58%2F63&t=pdf",
              "publisher": "UN Human Rights Council",
              "isPrimary": true
          },
          {
              "title": "European Parliament — 2023 Sakharov Prize announcement (19 October 2023): Confirms the joint award to Jina Mahsa Amini and the Woman, Life, Freedom movement",
              "url": "https://www.europarl.europa.eu/news/en/press-room/20231013IPR07134/2023-m-europos-parlamento-sacharovo-premija-pelne-mahsa-amini-ir-irano-moterys",
              "publisher": "European Parliament",
              "isPrimary": true
          },
          {
              "title": "European Parliament — Sakharov Prize ceremony (12 December 2023): Confirms the award ceremony in Strasbourg and the representatives of the laureates",
              "url": "https://www.europarl.europa.eu/news/en/press-room/20231208IPR15773/sacharov-2023-tributo-del-pe-a-jina-",
              "publisher": "European Parliament",
              "isPrimary": true
          },
          {
              "title": "Abdorrahman Boroumand Center for Human Rights in Iran — Mahsa (Jina) Amini: One Person's Story",
              "url": "https://www.iranrights.org/memorial/story/-8952/mahsa-jina-amini",
              "publisher": "Abdorrahman Boroumand Center for Human Rights in Iran"
          },
          {
              "title": "Farangis Ghaderi, University of Exeter — “Jin, Jiyan, Azadi and the Historical Erasure of Kurds,” International Journal of Middle East Studies (2024)",
              "url": "https://www.cambridge.org/core/journals/international-journal-of-middle-east-studies/article/jin-jiyan-azadi-and-the-historical-erasure-of-kurds/ABD2F2585A3AD4F0FF3735CD0B4FECAA",
              "publisher": "Cambridge University Press (IJMES)"
          },
          {
              "title": "Amnesty International — Iran: UN Must Act Over Death in Custody of Mahsa Amini (September 2022)",
              "url": "https://www.amnesty.org/en/latest/news/2022/09/iran-un-must-act-over-death-in-custody-of-mahsa-amini/",
              "publisher": "Amnesty International"
          }
      ],
      "translations": {
          "hi": {
              "country": "ईरान",
              "categoryLabel": "मानवाधिकार, स्वायत्तता एवं स्वतंत्रता",
              "roleAndField": "छात्रा · ईरानी कुर्द महिला · 'महिला, जीवन, स्वतंत्रता' आंदोलन की उत्प्रेरक",
              "coreMessage": "लिंग, जातीयता, धर्म या राजनीतिक परिस्थितियों की परवाह किए बिना व्यक्तिगत गरिमा, शारीरिक स्वायत्तता और मौलिक मानवाधिकारों की रक्षा की जानी चाहिए। राज्य की नीतियों के भेदभावपूर्ण प्रवर्तन के कारण किसी भी व्यक्ति को अपनी स्वतंत्रता या जीवन नहीं खोना चाहिए।",
              "whoWasThisPerson": "जीना महसा अमीनी (Jina Mahsa Amini) ईरान के कुर्दिस्तान प्रांत के सक्केज़ (Saqqez) की 22 वर्षीय कुर्द महिला थीं।\n\nउनका परिवार और करीबी रिश्तेदार उन्हें उनके कुर्द नाम 'जीना' (Jina) से जानते थे। 'महसा' वह नाम था जिसका उपयोग उनके आधिकारिक दस्तावेजों में किया गया था। उनकी कुर्द पहचान उनकी कहानी का एक महत्वपूर्ण हिस्सा है और इसे उनके स्मारक से हटाया नहीं जाना चाहिए।\n\nउन्हें संगीत और प्रदर्शन कलाओं में रुचि थी। संयुक्त राष्ट्र तथ्य-खोज मिशन (UN Fact-Finding Mission) की विस्तृत जांच में दर्ज है कि वह वायलिन बजाती थीं, स्थानीय थिएटर में अभिनय करती थीं, गायन और पारंपरिक कुर्द परिधान पसंद करती थीं, और हाइकिंग तथा टेनिस खेलने में समय बिताती थीं।\n\nउन्हें पश्चिमी अज़रबैजान प्रांत के उर्मिया विश्वविद्यालय (Urmia University) के चिकित्सा संकाय में सूक्ष्मजीव विज्ञान (Microbiology) का अध्ययन करने के लिए प्रवेश मिला था। वह सितंबर 2022 के अंत में अपनी पढ़ाई शुरू करने वाली थीं। उनकी महत्वाकांक्षाओं में शिक्षा प्राप्त करना और स्वास्थ्य-संबंधी अध्ययन में भविष्य बनाना शामिल था।",
              "contributions": "जीना कोई राजनीतिक नेता या मानवाधिकार अभियान की आयोजक नहीं थीं। आधुनिक इतिहास में उनका महत्व उनके साथ हुई घटना और उसके बाद हुई सार्वजनिक प्रतिक्रिया से उत्पन्न हुआ।\n\nउनकी मृत्यु 'महिला, जीवन, स्वतंत्रता' (Woman, Life, Freedom) आंदोलन की उत्प्रेरक बनी, जिसे कुर्द भाषा में 'जिन, जियान, आज़ादी' (Jin, Jiyan, Azadî) के नाम से जाना जाता है।\n\nइस अंतर को बनाए रखना महत्वपूर्ण है: जीना ने व्यक्तिगत रूप से आंदोलन का नेतृत्व नहीं किया था। जिन लोगों ने विरोध किया, संगठित हुए, दुर्व्यवहारों का दस्तावेजीकरण किया और जवाबदेही की मांग जारी रखी, उन्होंने इस आंदोलन को शक्ति दी। उनका नाम मानवीय गरिमा के लिए एक व्यापक संघर्ष का प्रतीक बन गया।",
              "factualContext": "13 सितंबर 2022 को जीना अपने परिवार के साथ तेहरान गईं। शाम लगभग 6:30 बजे, अपने भाई के साथ शाहिद हक्कानी मेट्रो स्टेशन से बाहर निकलने के बाद, उन्हें ईरान के गाइडेंस पेट्रोल (मॉरैलिटी पुलिस) द्वारा रोका गया और गिरफ्तार कर लिया गया।\n\nअधिकारियों ने आरोप लगाया कि उनके कपड़े अनिवार्य हिजाब नियमों के अनुरूप नहीं थे। उन्हें वोज़ारा (Vozara) हिरासत केंद्र ले जाया गया।\n\nसंयुक्त राष्ट्र तथ्य-खोज मिशन के अनुसार:\n• हिरासत केंद्र में पहुँचने के लगभग 26 मिनट बाद वह गिर पड़ीं।\n• उन्हें तेहरान के कसरा अस्पताल (Kasra Hospital) में स्थानांतरित किया गया।\n• वह कोमा में रहीं और 16 सितंबर 2022 को राज्य की हिरासत में रहते हुए उनकी मृत्यु हो गई।\n\nसंयुक्त राष्ट्र की जांच और विवादित परिस्थितियाँ:\n2 फरवरी 2024 की अपनी रिपोर्ट A/HRC/55/67 और 19 मार्च 2024 को प्रकाशित विस्तृत निष्कर्षों (A/HRC/55/CRP.1) में, संयुक्त राष्ट्र के स्वतंत्र अंतर्राष्ट्रीय तथ्य-खोज मिशन ने निष्कर्ष निकाला कि:\n• उनकी गिरफ्तारी और हिरासत मनमानी थी और भेदभावपूर्ण अनिवार्य-हिजाब कानूनों पर आधारित थी।\n• मॉरैलिटी पुलिस की हिरासत में रहते हुए उनके शरीर पर आघात (trauma) के प्रमाण थे।\n• मिशन संतुष्ट था कि हिरासत में की गई शारीरिक हिंसा के कारण उनकी मृत्यु हुई और उनकी गैरकानूनी मृत्यु के लिए राज्य जिम्मेदार था।\n\nमहत्वपूर्ण चिकित्सा और कानूनी योग्यता: मिशन मृत्यु के सटीक तात्कालिक चिकित्सा कारण का निर्धारण नहीं कर सका क्योंकि ईरानी अधिकारियों ने प्रमुख पुलिस और चिकित्सा अभिलेखों का खुलासा नहीं किया। हालांकि, मिशन ने पाया कि बचपन की सर्जरी की कथित जटिलताओं को तात्कालिक कारण के रूप में खारिज किया जा सकता है और उपलब्ध साक्ष्य इस निष्कर्ष का समर्थन करते हैं कि हिरासत में शारीरिक हिंसा से उनकी मृत्यु हुई।",
              "editorialNotes": "संपादकीय और कानूनी योग्यताएँ: (1) उनके कुर्द नाम 'जीना' को 'जीना महसा अमीनी' के रूप में संरक्षित किया गया है। (2) जीना स्वयं आंदोलन की आयोजक नहीं थीं; उनकी मृत्यु ने आंदोलन के लिए उत्प्रेरक का काम किया। (3) संयुक्त राष्ट्र मिशन ने निष्कर्ष निकाला कि हिरासत में शारीरिक हिंसा से उनकी मृत्यु हुई और राज्य इसके लिए जिम्मेदार था। (4) 2023 का सखारोव पुरस्कार जीना महसा अमीनी और 'महिला, जीवन, स्वतंत्रता' आंदोलन को संयुक्त रूप से दिया गया था। (5) संयुक्त राष्ट्र की मार्च 2025 की रिपोर्ट (A/HRC/58/63) के अनुसार जवाबदेही की प्रक्रिया अनसुलझी रही।",
              "verifiedFacts": [
                  "जीना महसा अमीनी ईरान के कुर्दिस्तान प्रांत के सक्केज़ की 22 वर्षीय कुर्द महिला थीं, जिन्हें सितंबर 2022 के अंत में उर्मिया विश्वविद्यालय के चिकित्सा संकाय में माइक्रोबायोलॉजी के अध्ययन के लिए प्रवेश मिला था।",
                  "13 सितंबर 2022 को तेहरान में गाइडेंस पेट्रोल द्वारा गिरफ्तारी के बाद वोज़ारा हिरासत केंद्र में पहुँचने के लगभग 26 मिनट बाद वह गिर पड़ीं और 16 सितंबर 2022 को कसरा अस्पताल में उनकी मृत्यु हो गई।",
                  "मार्च 2024 में संयुक्त राष्ट्र तथ्य-खोज मिशन (A/HRC/55/67 और A/HRC/55/CRP.1) ने निष्कर्ष निकाला कि हिरासत में शारीरिक हिंसा से उनकी मृत्यु हुई और उनकी गैरकानूनी मृत्यु के लिए राज्य जिम्मेदार था।",
                  "उनकी मृत्यु ने 'महिला, जीवन, स्वतंत्रता' (Jin, Jiyan, Azadî) आंदोलन को जन्म दिया और अक्टूबर 2023 में यूरोपीय संसद ने उन्हें और आंदोलन को संयुक्त रूप से 2023 सखारोव पुरस्कार प्रदान किया।",
                  "संयुक्त राष्ट्र की मार्च 2025 की रिपोर्ट (A/HRC/58/63) ने दर्ज किया कि दो वर्षों से अधिक समय के बाद भी उनके मामले में कोई प्रभावी न्यायिक कार्यवाही नहीं हुई और परिवार पर दबाव जारी रहा।"
              ],
              "societalImpact": "सामाजिक प्रभाव — महिला, जीवन, स्वतंत्रता (Jin, Jiyan, Azadî):\n16 सितंबर 2022 से पूरे ईरान में विरोध प्रदर्शन शुरू हुए और कुर्द नारा 'जिन, जियान, आज़ादी' आंदोलन की पहचान बन गया। संयुक्त राष्ट्र मिशन ने राज्य की प्रतिक्रिया में गंभीर मानवाधिकार उल्लंघनों का दस्तावेजीकरण किया।\n\nअंतर्राष्ट्रीय मान्यता — 2023 सखारोव पुरस्कार:\nअक्टूबर 2023 में यूरोपीय संसद ने विचार की स्वतंत्रता के लिए 2023 का सखारोव पुरस्कार संयुक्त रूप से जीना महसा अमीनी और ईरान के 'महिला, जीवन, स्वतंत्रता' आंदोलन को प्रदान किया (12 दिसंबर 2023 को स्ट्रासबर्ग में प्रस्तुत, जहाँ वकील सालेह निकबख्त ने परिवार का प्रतिनिधित्व किया)।\n\nजवाबदेही और बाद के घटनाक्रम (UN रिपोर्ट A/HRC/58/63, मार्च 2025):\n• सितंबर 2024 में उनके परिवार को उनकी पुण्यतिथि मनाने से रोका गया।\n• जनवरी 2025 में उनके पिता पर राज्य के खिलाफ प्रचार का आरोप लगाया गया।\n• दो साल से अधिक समय के बाद भी उनकी मृत्यु के मामले में कोई प्रभावी न्यायिक कार्यवाही नहीं हुई।",
              "actionableLesson": "समाज और संस्थाओं को निम्नलिखित सिद्धांतों को बनाए रखना चाहिए:\n• शारीरिक स्वायत्तता (Bodily autonomy): भेदभावपूर्ण दबाव के माध्यम से व्यक्तिगत गरिमा और अंतरात्मा की स्वतंत्रता को कुचला नहीं जाना चाहिए।\n• मनमानी हिरासत से सुरक्षा (Protection from arbitrary detention)।\n• स्वतंत्र चिकित्सा देखभाल (Independent medical care): बंदियों को तुरंत और निष्पक्ष चिकित्सा मूल्यांकन व उपचार मिलना चाहिए।\n• पारदर्शी जांच (Transparent investigations): हिरासत में होने वाली मौतों की स्वतंत्र जांच और साक्ष्यों का संरक्षण आवश्यक है।\n• परिवारों और गवाहों की सुरक्षा (Protection of families and witnesses)।\n• समान संरक्षण (Equal protection): जातीय, धार्मिक और लैंगिक पहचान कभी भी भेदभाव का आधार नहीं बननी चाहिए।",
              "memorialPublication": {
                  "title": "स्वतंत्र हिरासत स्वास्थ्य देखभाल और मानवाधिकार संरक्षण प्रोटोकॉल",
                  "focus": "हिरासत स्वास्थ्य · चिकित्सा स्वतंत्रता · फॉरेंसिक जवाबदेही · मानवाधिकार",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "हिरासत में बंद लोगों के अधिकारों और चिकित्सा सुरक्षा की रक्षा के लिए एक प्रस्तावित UltimateHealth रूपरेखा:\n• स्वतंत्र चिकित्सा मूल्यांकन (Independent Medical Assessment)\n• आपातकालीन प्रतिक्रिया मानक (Emergency Response Standards)\n• चिकित्सा अभिलेख अखंडता (Medical Record Integrity)\n• स्वतंत्र फॉरेंसिक जांच (मिनेसोटा प्रोटोकॉल सहित अंतर्राष्ट्रीय मानकों का उपयोग)\n• स्वास्थ्य कर्मियों की सुरक्षा (Protection of Healthcare Workers)\n• परिवार और कानूनी पहुँच तथा साक्ष्य संरक्षण।"
              }
          },
          "bn": {
              "country": "ইরান",
              "categoryLabel": "মানবাধিকার, স্বায়ত্তশাসন ও স্বাধীনতা",
              "roleAndField": "ছাত্রী · ইরানি কুর্দি নারী · 'নারী, জীবন, স্বাধীনতা' আন্দোলনের অনুঘটক",
              "coreMessage": "লিঙ্গ, জাতিসত্তা, ধর্ম বা রাজনৈতিক পরিস্থিতি নির্বিশেষে ব্যক্তিগত মর্যাদা, শারীরিক স্বায়ত্তশাসন এবং মৌলিক মানবাধিকার সুরক্ষিত করতে হবে। রাষ্ট্রীয় নীতির বৈষম্যমূলক প্রয়োগের কারণে কোনো ব্যক্তিরই স্বাধীনতা বা জীবন হারানো উচিত নয়।",
              "whoWasThisPerson": "জিনা মাহসা আমিনি (Jina Mahsa Amini) ছিলেন ইরানের কুর্দিস্তান প্রদেশের সাক্কেজ (Saqqez) শহরের ২২ বছর বয়সী একজন কুর্দি তরুণী।\n\nতাঁর পরিবার এবং নিকটাত্মীয়রা তাঁকে তাঁর কুর্দি নাম 'জিনা' (Jina) নামে ডাকতেন, আর সরকারি নথিতে ব্যবহৃত নাম ছিল 'মাহসা'। তাঁর কুর্দি পরিচয় তাঁর জীবনের একটি অপরিহার্য অংশ।\n\nজাতিসংঘের ফ্যাক্ট-ফাইন্ডিং মিশনের বিস্তারিত তদন্তে (A/HRC/55/CRP.1) উল্লেখ করা হয়েছে যে তিনি বেহালা বাজাতেন, স্থানীয় থিয়েটারে অভিনয় করতেন, গান ও ঐতিহ্যবাহী কুর্দি পোশাক ভালোবাসতেন এবং হাইকিং ও টেনিস খেলতেন। তিনি পশ্চিম আজারবাইজান প্রদেশের উর্মিয়া বিশ্ববিদ্যালয়ের চিকিৎসা অনুষদে মাইক্রোবায়োলজি বিভাগে ভর্তির সুযোগ পেয়েছিলেন এবং ২০২২ সালের সেপ্টেম্বরের শেষে তাঁর ক্লাস শুরু হওয়ার কথা ছিল।",
              "contributions": "জিনা কোনো রাজনৈতিক নেতা বা মানবাধিকার প্রচারাভিযানের সংগঠক ছিলেন না। তাঁর মৃত্যু 'নারী, জীবন, স্বাধীনতা' (Woman, Life, Freedom — কুর্দি ভাষায় Jin, Jiyan, Azadî) আন্দোলনের অনুঘটক হয়ে ওঠে।\n\nএই পার্থক্যটি বজায় রাখা গুরুত্বপূর্ণ: জিনা নিজে এই আন্দোলনের নেতৃত্ব দেননি; যাঁরা প্রতিবাদ করেছেন, সংগঠিত হয়েছেন এবং জবাবদিহিতা দাবি করেছেন তাঁরাই এই আন্দোলনকে শক্তি দিয়েছেন।",
              "factualContext": "২০২২ সালের ১৩ সেপ্টেম্বর জিনা তাঁর পরিবারের সাথে তেহরানে যান। সন্ধ্যা আনুমানিক ৬:৩০টায় তাঁর ভাইয়ের সাথে শহীদ হাক্কানি মেট্রো স্টেশন থেকে বের হওয়ার পর ইরানের গাইডেন্স পেট্রোল (মরালিটি পুলিশ) তাঁকে গ্রেপ্তার করে এবং ভোজারা (Vozara) আটক কেন্দ্রে নিয়ে যায়।\n\nজাতিসংঘের ফ্যাক্ট-ফাইন্ডিং মিশনের তথ্য অনুযায়ী:\n• আটক কেন্দ্রে পৌঁছানোর প্রায় ২৬ মিনিট পর তিনি লুটিয়ে পড়েন।\n• তাঁকে তেহরানের কাসরা হাসপাতালে স্থানান্তর করা হয়, যেখানে কোমায় থাকার পর ১৬ সেপ্টেম্বর ২০২২ তারিখে রাষ্ট্রীয় হেফাজতে তাঁর মৃত্যু হয়।\n\nজাতিসংঘের তদন্ত ও বিতর্কিত পরিস্থিতি:\n২ ফেব্রুয়ারি ২০২৪ তারিখের প্রতিবেদন (A/HRC/55/67) এবং ১৯ মার্চ ২০২৪ তারিখের বিস্তারিত প্রতিবেদনে (A/HRC/55/CRP.1) জাতিসংঘের স্বাধীন আন্তর্জাতিক ফ্যাক্ট-ফাইন্ডিং মিশন সিদ্ধান্তে পৌঁছায় যে:\n• তাঁর গ্রেপ্তার ও আটক ছিল নির্বিচার এবং বৈষম্যমূলক বাধ্যতামূলক হিজাব আইনের ওপর ভিত্তি করে।\n• মরালিটি পুলিশের হেফাজতে থাকাকালীন তাঁর শরীরে আঘাতের প্রমাণ পাওয়া গেছে এবং হেফাজতে শারীরিক সহিংসতার ফলেই তাঁর মৃত্যু হয়েছে।\n• তাঁর বেআইনি মৃত্যুর জন্য রাষ্ট্র দায়ী ছিল।\n\nগুরুত্বপূর্ণ চিকিৎসা ও আইনি যোগ্যতা: ইরানি কর্তৃপক্ষ মূল পুলিশ ও চিকিৎসা নথি প্রকাশ না করায় মিশন মৃত্যুর সুনির্দিষ্ট তাৎক্ষণিক চিকিৎসা কারণ নির্ধারণ করতে পারেনি, তবে শৈশবের মস্তিষ্কের অস্ত্রোপচারের জটিলতার সরকারি দাবিকে তাৎক্ষণিক কারণ হিসেবে বাতিল করেছে।",
              "editorialNotes": "সম্পাদকীয় ও আইনি যোগ্যতা: (১) তাঁর কুর্দি নাম 'জিনা' সংরক্ষণ করে 'জিনা মাহসা আমিনি' ব্যবহার করা হয়েছে। (২) তিনি নিজে আন্দোলনের সংগঠক ছিলেন না; তাঁর মৃত্যু ছিল আন্দোলনের অনুঘটক। (৩) জাতিসংঘ মিশন নিশ্চিত করেছে যে হেফাজতে শারীরিক সহিংসতার ফলেই তাঁর মৃত্যু হয়েছে এবং রাষ্ট্র এর জন্য দায়ী। (৪) ২০২৩ সালের শাখারভ পুরস্কার জিনা মাহসা আমিনি এবং 'নারী, জীবন, স্বাধীনতা' আন্দোলনকে যৌথভাবে প্রদান করা হয়। (৫) জাতিসংঘের মার্চ ২০২৫-এর প্রতিবেদন (A/HRC/58/63) অনুযায়ী বিচার প্রক্রিয়া এখনো অমীমাংসিত রয়েছে।",
              "verifiedFacts": [
                  "জিনা মাহসা আমিনি ছিলেন ইরানের কুর্দিস্তান প্রদেশের সাক্কেজের ২২ বছর বয়সী কুর্দি তরুণী, যিনি উর্মিয়া বিশ্ববিদ্যালয়ের চিকিৎসা অনুষদে মাইক্রোবায়োলজি পড়ার সুযোগ পেয়েছিলেন।",
                  "১৩ সেপ্টেম্বর ২০২২ তারিখে তেহরানে গাইডেন্স পেট্রোল কর্তৃক গ্রেপ্তারের পর ভোজারা আটক কেন্দ্রে পৌঁছানোর ২৬ মিনিটের মাথায় তিনি লুটিয়ে পড়েন এবং ১৬ সেপ্টেম্বর ২০২২ তারিখে কাসরা হাসপাতালে মারা যান।",
                  "মার্চ ২০২৪-এ জাতিসংঘের ফ্যাক্ট-ফাইন্ডিং মিশন (A/HRC/55/67 ও A/HRC/55/CRP.1) সিদ্ধান্তে পৌঁছায় যে হেফাজতে শারীরিক সহিংসতার কারণে তাঁর মৃত্যু হয়েছে এবং রাষ্ট্র এর জন্য দায়ী।",
                  "অক্টোবর ২০২৩-এ ইউরোপীয় পার্লামেন্ট জিনা মাহসা আমিনি এবং 'নারী, জীবন, স্বাধীনতা' আন্দোলনকে যৌথভাবে ২০২৩ সালের শাখারভ পুরস্কার প্রদান করে (১২ ডিসেম্বর ২০২৩ তারিখে স্ট্রাসবুর্গে অর্পিত)।",
                  "জাতিসংঘের মার্চ ২০২৫-এর প্রতিবেদন (A/HRC/58/63) নথিভুক্ত করেছে যে দুই বছরের বেশি সময় পেরিয়ে গেলেও তাঁর মৃত্যুর ঘটনায় কোনো কার্যকর বিচারিক প্রক্রিয়া হয়নি এবং তাঁর পরিবারের ওপর চাপ অব্যাহত রয়েছে।"
              ],
              "societalImpact": "সামাজিক প্রভাব — নারী, জীবন, স্বাধীনতা (Jin, Jiyan, Azadî):\n১৬ সেপ্টেম্বর ২০২২ থেকে ইরানজুড়ে প্রতিবাদ ছড়িয়ে পড়ে। অক্টোবর ২০২৩-এ ইউরোপীয় পার্লামেন্ট জিনা মাহসা আমিনি এবং এই আন্দোলনকে যৌথভাবে শাখারভ পুরস্কার প্রদান করে (অনুষ্ঠানে পরিবারের পক্ষে আইনজীবী সালেহ নিকবখত উপস্থিত ছিলেন)।\n\nজবাবদিহিতা ও পরবর্তী ঘটনাপ্রবাহ (জাতিসংঘ প্রতিবেদন A/HRC/58/63, মার্চ ২০২৫):\n• সেপ্টেম্বর ২০২৪-এ তাঁর পরিবারকে তাঁর মৃত্যুবার্ষিকী পালনে বাধা দেওয়া হয়।\n• জানুয়ারি ২০২৫-এ তাঁর বাবার বিরুদ্ধে রাষ্ট্রবিরোধী প্রচারণার অভিযোগ আনা হয়।\n• দুই বছরের বেশি সময় ধরে তাঁর মৃত্যুর তদন্ত ও বিচার প্রক্রিয়া স্থবির হয়ে আছে এবং বাধ্যতামূলক হিজাব নীতির বৈষম্যমূলক প্রয়োগ অব্যাহত রয়েছে।",
              "actionableLesson": "সমাজ ও প্রতিষ্ঠানগুলোকে অবশ্যই নিশ্চিত করতে হবে:\n• শারীরিক স্বায়ত্তশাসন ও বিবেকের স্বাধীনতা।\n• নির্বিচার আটক থেকে সুরক্ষা।\n• হেফাজতে থাকা ব্যক্তিদের জন্য স্বাধীন ও নিরপেক্ষ চিকিৎসা সেবা।\n• হেফাজতে মৃত্যুর ঘটনায় স্বচ্ছ ও স্বাধীন তদন্ত।\n• ভুক্তভোগী পরিবার ও সাক্ষীদের ভয়ভীতি থেকে সুরক্ষা এবং সমান আইনি অধিকার।",
              "memorialPublication": {
                  "title": "স্বাধীন হেফাজতকালীন স্বাস্থ্যসেবা ও মানবাধিকার সুরক্ষা প্রোটোকল",
                  "focus": "হেফাজতকালীন স্বাস্থ্য · চিকিৎসা স্বাধীনতা · ফরেনসিক জবাবদিহিতা · মানবাধিকার",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "আটক ব্যক্তিদের চিকিৎসা নিরাপত্তা ও মানবাধিকার রক্ষায় একটি প্রস্তাবিত UltimateHealth কাঠামো: স্বাধীন চিকিৎসা মূল্যায়ন, জরুরি হস্তক্ষেপ মানদণ্ড, চিকিৎসা নথির অখণ্ডতা, মিনেসোটা প্রটোকল অনুযায়ী স্বাধীন ফরেনসিক তদন্ত এবং স্বাস্থ্যকর্মীদের সুরক্ষা।"
              }
          },
          "ta": {
              "country": "ஈரான்",
              "categoryLabel": "மனித உரிமைகள், தன்னாட்சி மற்றும் சுதந்திரம்",
              "roleAndField": "மாணவி · ஈரானிய குர்திஷ் பெண் · 'பெண், வாழ்வு, சுதந்திரம்' இயக்கத்தின் தூண்டுகோல்",
              "coreMessage": "பாலினம், இனம், மதம் அல்லது அரசியல் சூழ்நிலைகளைப் பொருட்படுத்தாமல் தனிநபர் கண்ணியம், உடல் தன்னாட்சி மற்றும் அடிப்படை மனித உரிமைகள் பாதுகாக்கப்பட வேண்டும். அரசின் பாரபட்சமான கொள்கைகளால் எவரும் தங்கள் சுதந்திரத்தையோ உயிரையோ இழக்கக் கூடாது.",
              "whoWasThisPerson": "ஜினா மஹ்சா அமினி (Jina Mahsa Amini) ஈரானின் குர்திஸ்தான் மாகாணத்தில் உள்ள சக்கெஸ் (Saqqez) நகரைச் சேர்ந்த 22 வயது குர்திஷ் பெண். அவரது குடும்பத்தினர் அவரை 'ஜினா' என்ற குர்திஷ் பெயரால் அழைத்தனர். வயலின் வாசிப்பு, நாடகம் மற்றும் இசையில் ஆர்வம் கொண்டிருந்த அவர், உர்மியா பல்கலைக்கழக மருத்துவப் புலத்தில் நுண்ணுயிரியல் (Microbiology) பயிலத் தேர்வாகியிருந்தார்.",
              "contributions": "ஜினா ஒரு அரசியல் தலைவர் அல்ல; ஆனால் அவரது மரணம் 'பெண், வாழ்வு, சுதந்திரம்' (Jin, Jiyan, Azadî) இயக்கத்தின் தூண்டுகோலாக மாறியது. போராடிய மக்களும் மனித உரிமைப் பாதுகாவலர்களுமே அந்த இயக்கத்தை முன்னெடுத்தனர்.",
              "factualContext": "13 செப்டம்பர் 2022 அன்று தெஹ்ரானில் தனது சகோதரருடன் சென்றபோது ஈரானின் கலாச்சாரக் காவல்துறையால் (Guidance Patrol) கைது செய்யப்பட்டு வோசாரா தடுப்பு மையத்திற்குக் கொண்டு செல்லப்பட்டார். அங்கு சென்ற சுமார் 26 நிமிடங்களில் மயங்கி விழுந்த அவர், கஸ்ரா மருத்துவமனையில் 16 செப்டம்பர் 2022 அன்று உயிரிழந்தார்.\n\nஐ.நா. விசாரணை (A/HRC/55/67 மற்றும் A/HRC/55/CRP.1, மார்ச் 2024): அவரது கைது தன்னிச்சையானது என்றும், காவலில் வைக்கப்பட்டிருந்தபோது இழைக்கப்பட்ட உடல் ரீதியான வன்முறையே அவரது மரணத்திற்குக் காரணம் என்றும், அவரது சட்டவிரோத மரணத்திற்கு அரசே பொறுப்பு என்றும் ஐ.நா. உண்மை கண்டறியும் குழு முடிவு செய்தது.",
              "editorialNotes": "ஆசிரியர் குறிப்பு: ஜினா மஹ்சா அமினியின் குர்திஷ் பெயர் பாதுகாக்கப்பட்டுள்ளது. 2023 சகாரோவ் விருது ஜினா மஹ்சா அமினிக்கும் 'பெண், வாழ்வு, சுதந்திரம்' இயக்கத்திற்கும் கூட்டாக வழங்கப்பட்டது. மார்ச் 2025 ஐ.நா. அறிக்கையின்படி (A/HRC/58/63) நீதி விசாரணை இன்னும் முடங்கியுள்ளது.",
              "verifiedFacts": [
                  "ஜினா மஹ்சா அமினி ஈரானின் சக்கெஸ் நகரைச் சேர்ந்த 22 வயது குர்திஷ் மாணவி; உர்மியா பல்கலைக்கழகத்தில் நுண்ணுயிரியல் பயிலத் தேர்வாகியிருந்தார்.",
                  "13 செப்டம்பர் 2022 அன்று தெஹ்ரானில் கைது செய்யப்பட்ட அவர், 16 செப்டம்பர் 2022 அன்று கஸ்ரா மருத்துவமனையில் காவலில் இருந்தபோது உயிரிழந்தார்.",
                  "மார்ச் 2024 ஐ.நா. அறிக்கை (A/HRC/55/67) காவலில் இழைக்கப்பட்ட உடல் ரீதியான வன்முறையே அவரது மரணத்திற்குக் காரணம் என்றும் அரசே பொறுப்பு என்றும் உறுதிப்படுத்தியது.",
                  "2023 சகாரோவ் விருது ஜினா மஹ்சா அமினிக்கும் 'பெண், வாழ்வு, சுதந்திரம்' இயக்கத்திற்கும் கூட்டாக வழங்கப்பட்டது.",
                  "மார்ச் 2025 ஐ.நா. அறிக்கை (A/HRC/58/63) அவரது குடும்பத்தினர் மீதான தொடர்ச்சியான அழுத்தங்களையும் நீதி விசாரணையின்மையையும் பதிவு செய்தது."
              ],
              "societalImpact": "'பெண், வாழ்வு, சுதந்திரம்' (Jin, Jiyan, Azadî) இயக்கம், 2023 ஐரோப்பிய நாடாளுமன்ற சகாரோவ் விருது (வழக்கறிஞர் சாலே நிக்பக்த் குடும்பத்தின் சார்பில் பங்கேற்றார்), மற்றும் மார்ச் 2025 ஐ.நா. அறிக்கை (A/HRC/58/63) பதிவு செய்த தொடர்ச்சியான குடும்ப அடக்குமுறைகள்.",
              "actionableLesson": "உடல் தன்னாட்சி, தன்னிச்சையான கைதிலிருந்து பாதுகாப்பு, காவலில் உள்ளவர்களுக்கு சுதந்திரமான மருத்துவ சிகிச்சை, நேர்மையான தடயவியல் விசாரணை மற்றும் குடும்பத்தினரின் பாதுகாப்பு.",
              "memorialPublication": {
                  "title": "சுதந்திரமான காவல் மருத்துவப் பராமரிப்பு மற்றும் மனித உரிமைகள் பாதுகாப்பு நெறிமுறை",
                  "focus": "காவல் স্বাস্থ্য · மருத்துவ சுதந்திரம் · தடயவியல் பொறுப்புக்கூறல் · மனித உரிமைகள்",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "காவலில் உள்ளவர்களின் மருத்துவப் பாதுகாப்பு, மருத்துவ ஆவணங்களின் ஒருமைப்பாடு மற்றும் மின்னசோட்டா நெறிமுறைப்படி சுதந்திரமான தடயவியல் விசாரணைக்கான முன்மொழியப்பட்ட UltimateHealth வழிகாட்டி."
              }
          },
          "or": {
              "country": "ଇରାନ",
              "categoryLabel": "ମାନବାଧିକାର, ସ୍ୱାୟତ୍ତତା ଏବଂ ସ୍ୱାଧୀନତା",
              "roleAndField": "ଛାତ୍ରୀ · ଇରାନୀ କୁର୍ଦ୍ଦି ମହିଳା · 'ମହିଳା, ଜୀବନ, ସ୍ୱାଧୀନତା' ଆନ୍ଦୋଳନର ଉତ୍ପ୍ରେରକ",
              "coreMessage": "ଲିଙ୍ଗ, ଜାତି, ଧର୍ମ କିମ୍ବା ରାଜନୈତିକ ପରିସ୍ଥିତି ନିର୍ବିଶେଷରେ ବ୍ୟକ୍ତିଗତ ମର୍ଯ୍ୟାଦା, ଶାରୀରିକ ସ୍ୱାୟତ୍ତତା ଏବଂ ମୌଳିକ ମାନବାଧିକାର ସୁରକ୍ଷିତ ହେବା ଉଚିତ୍। ରାଷ୍ଟ୍ର ନୀତିର ଭେଦଭାବପୂର୍ଣ୍ଣ ପ୍ରয়োগ ଯୋଗୁଁ କୌଣସି ବ୍ୟକ୍ତି নিজের ସ୍ୱାଧୀନତା କିମ୍ବା ଜୀବନ ହରାଇବା ଉଚିତ୍ ନୁହେଁ।",
              "whoWasThisPerson": "ଜିନା ମାହସା ଆମିନି (Jina Mahsa Amini) ଇରାନର କୁର୍ଦ୍ଦିସ୍ତାନ ପ୍ରଦେଶର ସାକେଜ୍ ସହରର ଜଣେ ୨୨ ବର୍ଷୀୟା କୁର୍ଦ୍ଦି ତରୁଣୀ ଥିଲେ। ତାଙ୍କ ପରିବାର ତାଙ୍କୁ 'ଜିନା' ନାମରେ ଜାଣୁଥିଲେ। ସେ ଉর্মিଆ ବିଶ୍ୱବିଦ୍ୟାଳୟର ଚିକିତ୍ସା অনুষদରେ ମାଇକ୍ରୋବାୟୋଲୋଜି ପଢ଼ିବା ପାଇଁ ମନୋନୀତ ହୋଇଥିଲେ।",
              "contributions": "ଜିନା କୌଣସି ରାଜନୈତିକ ନେତ୍ରୀ ନଥିଲେ; କିନ୍ତୁ ତାଙ୍କର ମୃତ୍ୟୁ 'ମହିଳା, ଜୀବନ, ସ୍ୱାଧୀନତା' (Jin, Jiyan, Azadî) ଆନ୍ଦୋଳନର ଉତ୍ପ୍ରେରକ ପାଲଟିଥିଲା।",
              "factualContext": "୧୩ ସେପ୍ଟେମ୍ବର ୨୦୨୨ ରେ তেହରାନରେ ଗାଇଡାନ୍ସ ପାଟ୍ରୋଲ୍ ଦ୍ୱାରା ଗିରଫ ହେବା ପରେ ଭୋଜାରା ଅଟକ କେନ୍ଦ୍ରରେ ପହଞ୍ଚିବାର ପ୍ରାୟ ୨୬ ମିନିଟ୍ ପରେ ସେ ଅଚେତ ହୋଇপଡ଼ିଥିଲେ ଏବଂ ୧୬ ସେପ୍ଟେମ୍ବର ୨୦୨୨ ରେ କାସ୍ରା ହସ୍ପିଟାଲରେ ତାଙ୍କର ମୃତ୍ୟୁ ଘଟିଥିଲା।\n\nଜାତିସଂଘର ତଦନ୍ତ (A/HRC/55/67 ଏବଂ A/HRC/55/CRP.1, ମାର୍ଚ୍ଚ ୨୦୨୪): ଜାତିସଂଘର ସ୍ୱାଧୀନ ତଥ୍ୟ-ଅନুসନ୍ଧାନ ମିଶନ୍ ନିଷ୍କର୍ଷରେ ପହଞ୍ଚିଥିଲା ଯେ ଅଟକ ଅବସ୍ଥାରେ ହୋଇଥିବା ଶାରୀରିକ ହିଂସା ଯୋଗୁଁ ତାଙ୍କର ମୃତ୍ୟୁ ହୋଇଥିଲା ଏବଂ ତାଙ୍କର ବେଆଇନ ମୃତ୍ୟୁ ପାଇଁ ରାଷ୍ଟ୍ର ଦାୟୀ ଥିଲା।",
              "editorialNotes": "ସମ୍ପାଦକୀୟ ଟିପ୍ପଣୀ: ତାଙ୍କର କୁର୍ଦ୍ଦି ନାମ 'ଜିନା ମାହସା ଆମିନି' ସଂରକ୍ଷିତ ରଖାଯାଇଛି। ୨୦୨୩ ସାଖାରୋଭ ପୁରସ୍କାର ଜିନା ମାହସା ଆମିନି ଏବଂ 'ମହିଳା, ଜୀବନ, ସ୍ୱାଧୀନତା' ଆନ୍ଦୋଳନକୁ ମିଳିତ ଭାବେ ପ୍ରଦାନ କରାଯାଇଥିଲା। ମାର୍ଚ୍ଚ ୨୦୨୫ ଜାତିସଂଘ ରିପୋର୍ଟ (A/HRC/58/63) ଅନୁଯାୟୀ ନ୍ୟାୟিক ପ୍ରକ୍ରିୟା ଏବେ ବି ଅମୀମାଂସିତ ରହିଛି।",
              "verifiedFacts": [
                  "ଜିନା ମାହସା ଆମିନି ଇରାନର ସାକେଜ୍ ସହରର ୨୨ ବର୍ଷୀୟା କୁର୍ଦ୍ଦି ଛାତ୍ରୀ ଥିଲେ ଯିଏ ଉର୍ମିଆ ବିଶ୍ୱବିଦ୍ୟାଳୟରେ ମାଇକ୍ରୋବାୟୋଲୋଜି ପଢ଼ିବାକୁ ମନୋନୀତ ହୋଇଥିଲେ।",
                  "୧୩ ସେପ୍ଟେମ୍ବର ୨୦୨୨ ରେ ତେହରାନରେ ଗିରଫ ହେବା ପରେ ୧୬ ସେପ୍ଟେମ୍ବର ୨୦୨୨ ରେ କାସ୍ରା ହସ୍ପିଟାଲରେ ରାଷ୍ଟ୍ରୀୟ ହେପାଜତରେ ତାଙ୍କର ମୃତ୍ୟୁ ହୋଇଥିଲା।",
                  "ମାର୍ଚ୍ଚ ୨୦୨୪ ରେ ଜାତିସଂଘ ମିଶନ୍ (A/HRC/55/67) ସ୍পଷ୍ଟ କରିଥିଲା ଯେ ହେପାଜତରେ ଶାରୀରିକ ହିଂସା ଯୋଗୁଁ ତାଙ୍କର ମୃତ୍ୟୁ ହୋଇଥିଲା ଏବଂ ରାଷ୍ଟ୍ର ଏଥିପାଇଁ ଦାୟୀ।",
                  "ଅକ୍ଟୋବର ୨୦୨୩ ରେ ୟୁରୋପୀୟ ସଂସଦ ଜିନା ମାହସା ଆମିନି ଏବଂ 'ମହିଳା, ଜୀବନ, ସ୍ୱାଧୀନତା' ଆନ୍ଦୋଳନକୁ ମିଳିତ ଭାବେ ୨୦୨୩ ସାଖାରୋଭ ପୁରସ୍କାର ପ୍ରଦାନ କରିଥିଲା।",
                  "ମାର୍ଚ୍ଚ ୨୦୨୫ ର ଜାତିସଂଘ ରିପୋର୍ଟ (A/HRC/58/63) ତାଙ୍କ ପରିବାର ଉପରେ ଚାପ ଏବଂ ନ୍ୟାୟିକ ତଦନ୍ତର ଅଭାବକୁ ନথিଭୁକ୍ତ କରିଛି।"
              ],
              "societalImpact": "'ମହିଳା, ଜୀବନ, ସ୍ୱାଧୀନତା' (Jin, Jiyan, Azadî) ଆନ୍ଦୋଳନ, ୨୦୨୩ ସାଖାରୋଭ ପୁରସ୍କାର (ଓକିଲ ସାଲେହ ନିକବଖତ ପରିବାରର ପ୍ରତିନିଧିତ୍ୱ କରିଥିଲେ) ଏବଂ ମାର୍ଚ୍ଚ ୨୦୨୫ ଜାତିସଂଘ ରିପୋର୍ଟ (A/HRC/58/63)।",
              "actionableLesson": "ଶାରୀରିକ ସ୍ୱାୟତ୍ତତା, ମନମାନୀ ଗିରଫଦାରୀରୁ ସୁରକ୍ଷା, ଅଟକ ବ୍ୟକ୍ତିଙ୍କ ପାଇଁ ସ୍ୱାଧୀନ ଚିକିତ୍ସା ସେବା, ନିରପେକ୍ଷ ତଦନ୍ତ ଏବଂ ପରିବାର ଓ ସାକ୍ଷୀଙ୍କ ସୁରକ୍ଷା।",
              "memorialPublication": {
                  "title": "ସ୍ୱାଧୀନ ହେପାଜତ ସ୍ୱାସ୍ଥ୍ୟସେବା ଏବଂ ମାନବାଧିକାର ସୁରକ୍ଷା ପ୍ରୋଟୋକଲ୍",
                  "focus": "ହେପାଜତ ସ୍ୱାସ୍ଥ୍ୟ · ଚିକିତ୍ସା ସ୍ୱାଧୀନତା · ଫରେନସିକ୍ ଉତ୍ତରଦାୟିତ୍ୱ · ମାନବାଧିକାର",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "ଅଟକ ବ୍ୟକ୍ତିଙ୍କ ଚିକିତ୍ସା ସୁରକ୍ଷା, ମେଡିକାଲ୍ ରେକର୍ଡର ସୁରକ୍ଷା ଏବଂ ମିନେସୋଟା ପ୍ରୋଟୋକଲ୍ ଅନୁଯାୟୀ ସ୍ୱାଧୀନ ଫରେନସିକ୍ ତଦନ୍ତ ପାଇଁ ଏକ ପ୍ରସ୍ତାବିତ UltimateHealth ପଦକ୍ଷେପ।"
              }
          },
          "de": {
              "country": "Iran",
              "categoryLabel": "Menschenrechte, Selbstbestimmung & Freiheit",
              "roleAndField": "Studentin · Iranisch-kurdische Frau · Auslöserin der Bewegung „Frau, Leben, Freiheit“",
              "coreMessage": "Persönliche Würde, körperliche Selbstbestimmung und grundlegende Menschenrechte müssen unabhängig von Geschlecht, ethnischer Zugehörigkeit, Religion oder politischen Umständen geschützt werden. Kein Mensch darf durch die diskriminierende Durchsetzung staatlicher Vorschriften seine Freiheit oder sein Leben verlieren.",
              "whoWasThisPerson": "Jina Mahsa Amini war eine 22-jährige kurdische Frau aus Saqqez in der iranischen Provinz Kurdistan.\n\nIhre Familie und engen Verwandten kannten sie unter ihrem kurdischen Namen Jina; Mahsa war der Name in ihren offiziellen Dokumenten. Ihre kurdische Identität ist ein wesentlicher Teil ihrer Geschichte und darf in ihrem Gedenken nicht ausgelassen werden.\n\nSie interessierte sich für Musik und darstellende Kunst. Die detaillierte Untersuchung der UN-Unabhängigen Internationalen Untersuchungskommission (A/HRC/55/CRP.1) hält fest, dass sie Geige spielte, im lokalen Theater auftrat, gerne sang, traditionelle kurdische Kleidung trug sowie wanderte und Tennis spielte.\n\nSie war zum Studium der Mikrobiologie an der Medizinischen Fakultät der Universität Urmia (Provinz West-Aserbaidschan) zugelassen worden und wollte ihr Studium Ende September 2022 aufnehmen.",
              "contributions": "Jina war keine politische Anführerin oder Organisatorin einer Menschenrechtskampagne. Ihre Bedeutung in der modernen Geschichte entstand aus dem, was ihr widerfuhr, und der darauffolgenden öffentlichen Reaktion.\n\nIhr Tod wurde zum Auslöser (Katalysator) der Bewegung „Frau, Leben, Freiheit“ (auf Kurdisch: Jin, Jiyan, Azadî). Es ist wichtig, diese Unterscheidung zu wahren: Jina führte die Bewegung nicht selbst an; die Menschen, die protestierten, sich organisierten und Rechenschaft forderten, verliehen der Bewegung ihre Kraft.",
              "factualContext": "Am 13. September 2022 reiste Jina mit ihrer Familie nach Teheran. Gegen 18:30 Uhr wurde sie nach dem Verlassen der Metrostation Schahid Haqqani gemeinsam mit ihrem Bruder von der iranischen Sittenpolizei (Guidance Patrol) angehalten, wegen angeblicher Verstöße gegen die Hidschab-Vorschriften festgenommen und in die Haftanstalt Vozara gebracht.\n\nNach Feststellungen der UN-Untersuchungskommission:\n• Sie brach etwa 26 Minuten nach ihrer Ankunft in der Haftanstalt zusammen.\n• Sie wurde in das Kasra-Krankenhaus in Teheran eingeliefert, lag im Koma und starb am 16. September 2022 im staatlichen Gewahrsam.\n\nUN-Untersuchung und bestrittene Umstände:\nIn ihrem Bericht A/HRC/55/67 vom 2. Februar 2024 und den detaillierten Feststellungen vom 19. März 2024 (A/HRC/55/CRP.1) kam die UN-Kommission zu dem Schluss:\n• Ihre Festnahme und Inhaftierung waren willkürlich und beruhten auf diskriminierenden Gesetzen.\n• Es lagen Beweise für körperliche Traumata vor, die ihr im Gewahrsam der Sittenpolizei zugefügt wurden.\n• Physische Gewalt im Gewahrsam führte zu ihrem Tod, und der Staat trägt die Verantwortung für ihren rechtswidrigen Tod.\n\nWichtige medizinische und rechtliche Einordnung: Die Kommission konnte die genaue unmittelbare medizinische Todesursache nicht bestimmen, da die iranischen Behörden zentrale Polizei- und Krankenakten zurückhielten; sie schloss jedoch angebliche Spätfolgen einer Gehirnoperation im Kindesalter als unmittelbare Ursache aus.",
              "editorialNotes": "Redaktionelle und rechtliche Hinweise: (1) Ihr kurdischer Name „Jina Mahsa Amini“ wird als Hauptname geführt. (2) Ihr Tod war der Auslöser der Bewegung, nicht eine von ihr selbst geleitete Kampagne. (3) Die UN-Kommission stellte fest, dass körperliche Gewalt in Haft zu ihrem Tod führte und der Staat verantwortlich ist. (4) Der Sacharow-Preis 2023 wurde gemeinsam an Jina Mahsa Amini und die Bewegung „Frau, Leben, Freiheit“ verliehen. (5) Laut UN-Bericht A/HRC/58/63 (März 2025) blieb die strafrechtliche Aufarbeitung blockiert.",
              "verifiedFacts": [
                  "Jina Mahsa Amini war eine 22-jährige iranisch-kurdische Frau aus Saqqez (Provinz Kurdistan), die Ende September 2022 ein Mikrobiologie-Studium an der Medizinischen Fakultät der Universität Urmia beginnen sollte.",
                  "Am 13. September 2022 wurde sie in Teheran von der Sittenpolizei festgenommen, brach rund 26 Minuten nach der Ankunft in der Haftanstalt Vozara zusammen und starb am 16. September 2022 im Kasra-Krankenhaus.",
                  "Die UN-Untersuchungskommission (A/HRC/55/67 und A/HRC/55/CRP.1, März 2024) stellte fest, dass körperliche Gewalt in staatlichem Gewahrsam zu ihrem Tod führte und der Staat die Verantwortung für ihren rechtswidrigen Tod trägt.",
                  "Im Oktober 2023 verlieh das Europäische Parlament den Sacharow-Preis für geistige Freiheit gemeinsam an Jina Mahsa Amini und die Bewegung „Frau, Leben, Freiheit“ (Überreichung am 12. Dezember 2023 in Straßburg).",
                  "Der UN-Bericht A/HRC/58/63 vom März 2025 dokumentierte anhaltende Repressionen gegen ihre Familie (u. a. Verhinderung des Gedenkens im September 2024 und Anklage gegen ihren Vater im Januar 2025) sowie das Fehlen wirksamer Gerichtsverfahren."
              ],
              "societalImpact": "Gesellschaftliche Auswirkungen — Frau, Leben, Freiheit (Jin, Jiyan, Azadî):\nLandesweite und internationale Proteste ab dem 16. September 2022; Dokumentation schwerster Menschenrechtsverletzungen durch die UN-Kommission.\n\nInternationale Anerkennung — Sacharow-Preis 2023:\nGemeinsame Verleihung durch das Europäische Parlament im Oktober 2023 (Überreichung am 12. Dezember 2023 in Straßburg; Vertretung der Familie durch den Rechtsanwalt Saleh Nikbakht).\n\nRechenschaftspflicht und weitere Entwicklungen (UN-Bericht A/HRC/58/63, März 2025):\nVerhinderung der Gedenkfeier im September 2024, Anklage gegen ihren Vater im Januar 2025, seit über zwei Jahren blockiertes Verfahren und fortdauernde diskriminierende Hidschab-Durchsetzung.",
              "actionableLesson": "Gesellschaft und Institutionen müssen gewährleisten:\n• Körperliche Selbstbestimmung und Gewissensfreiheit.\n• Schutz vor willkürlicher Inhaftierung.\n• Unabhängige medizinische Versorgung für Inhaftierte.\n• Transparente, unabhängige Untersuchungen bei Todesfällen in Haft.\n• Schutz von Familien und Zeugen vor Einschüchterung.\n• Gleichen Rechtsschutz ohne Diskriminierung aufgrund ethnischer, religiöser oder geschlechtlicher Identität.",
              "memorialPublication": {
                  "title": "Protokoll für unabhängige Gesundheitsversorgung im Gewahrsam und Menschenrechtsschutz",
                  "focus": "Gesundheit im Gewahrsam · Medizinische Unabhängigkeit · Forensische Rechenschaftspflicht · Menschenrechte",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Ein vorgeschlagenes UltimateHealth-Rahmenwerk für unabhängige medizinische Untersuchungen in Haft, Notfallstandards, Schutz von Krankenakten vor Manipulation, unabhängige forensische Untersuchungen nach dem Minnesota-Protokoll und Schutz des medizinischen Personals."
              }
          },
          "es": {
              "country": "Irán",
              "categoryLabel": "Derechos Humanos, Autonomía y Libertad",
              "roleAndField": "Estudiante · Mujer Kurda Iraní · Catalizadora del Movimiento «Mujer, Vida, Libertad»",
              "coreMessage": "La dignidad personal, la autonomía corporal y los derechos humanos fundamentales deben protegerse sin importar el género, el origen étnico, la religión o las circunstancias políticas. Ninguna persona debería perder su libertad o su vida debido a la aplicación discriminatoria de políticas estatales.",
              "whoWasThisPerson": "Jina Mahsa Amini era una joven kurda de 22 años originaria de Saqqez, en la provincia iraní del Kurdistán.\n\nSu familia y parientes cercanos la conocían como Jina, su nombre kurdo; Mahsa era el nombre utilizado en sus documentos oficiales. Su identidad kurda es una parte esencial de su historia y no debe omitirse de su memoria.\n\nLe interesaban la música y las artes escénicas. La investigación detallada de la Misión Internacional Independiente de Determinación de los Hechos de la ONU (A/HRC/55/CRP.1) registra que tocaba el violín, actuaba en el teatro local, disfrutaba del canto y de la vestimenta tradicional kurda, y practicaba senderismo y tenis.\n\nHabía sido admitida para estudiar microbiología en la Facultad de Medicina de la Universidad de Urmía, en la provincia de Azerbaiyán Occidental, donde debía comenzar sus estudios a finales de septiembre de 2022.",
              "contributions": "Jina no era una líder política ni la organizadora de una campaña de derechos humanos. Su muerte se convirtió en el catalizador del movimiento «Mujer, Vida, Libertad», conocido en kurdo como Jin, Jiyan, Azadî.\n\nEs importante preservar esta distinción: Jina no dirigió personalmente el movimiento; las personas que protestaron, se organizaron, documentaron abusos y exigieron rendición de cuentas dieron fuerza al movimiento.",
              "factualContext": "El 13 de septiembre de 2022, Jina viajó con su familia a Teherán. Aproximadamente a las 18:30 horas, tras salir de la estación de metro Shahid Haqqani con su hermano, fue detenida por la Patrulla de Orientación de Irán (policía de la moral) y trasladada al centro de detención de Vozara.\n\nSegún la Misión de Determinación de los Hechos de la ONU:\n• Se desplomó aproximadamente 26 minutos después de llegar al centro de detención.\n• Fue trasladada al Hospital Kasra de Teherán, donde permaneció en coma y falleció el 16 de septiembre de 2022 bajo custodia estatal.\n\nInvestigación de la ONU y circunstancias disputadas:\nEn su informe A/HRC/55/67 (2 de febrero de 2024) y sus conclusiones detalladas (A/HRC/55/CRP.1, 19 de marzo de 2024), la Misión de la ONU concluyó que:\n• Su arresto y detención fueron arbitrarios y basados en leyes discriminatorias.\n• Existían pruebas de traumatismos infligidos mientras estaba bajo custodia de la policía de la moral.\n• La violencia física infligida bajo custodia provocó su muerte y el Estado era responsable de su muerte ilícita.\n\nPrecisión médica y jurídica importante: La Misión no pudo determinar la causa médica inmediata exacta de la muerte porque las autoridades iraníes no divulgaron registros policiales y médicos clave, pero excluyó las supuestas complicaciones de su cirugía cerebral infantil como causa inmediata.",
              "editorialNotes": "Precisiones editoriales y jurídicas: (1) Se utiliza «Jina Mahsa Amini» como nombre principal para preservar su identidad kurda. (2) Su muerte fue el catalizador del movimiento, no una campaña organizada por ella. (3) La Misión de la ONU concluyó que la violencia física bajo custodia causó su muerte y estableció la responsabilidad del Estado. (4) El Premio Sájarov 2023 fue otorgado conjuntamente a Jina Mahsa Amini y al movimiento «Mujer, Vida, Libertad». (5) El informe de la ONU de marzo de 2025 (A/HRC/58/63) documentó la falta de avances judiciales y el acoso continuado a su familia.",
              "verifiedFacts": [
                  "Jina Mahsa Amini era una joven kurda iraní de 22 años de Saqqez (provincia del Kurdistán), admitida para estudiar microbiología en la Facultad de Medicina de la Universidad de Urmía en septiembre de 2022.",
                  "Detenida el 13 de septiembre de 2022 en Teherán por la Patrulla de Orientación, se desplomó unos 26 minutos después de llegar al centro de Vozara y murió el 16 de septiembre de 2022 en el Hospital Kasra.",
                  "En marzo de 2024, la Misión de la ONU (A/HRC/55/67 y A/HRC/55/CRP.1) concluyó que fue sometida a violencia física bajo custodia que condujo a su muerte y que el Estado era responsable de su muerte ilícita.",
                  "En octubre de 2023, el Parlamento Europeo concedió conjuntamente el Premio Sájarov 2023 a Jina Mahsa Amini y al movimiento «Mujer, Vida, Libertad» (entregado en Estrasburgo el 12 de diciembre de 2023).",
                  "El informe de la ONU de marzo de 2025 (A/HRC/58/63) registró presiones continuas contra su familia y más de dos años de parálisis judicial."
              ],
              "societalImpact": "Impacto social — Mujer, Vida, Libertad (Jin, Jiyan, Azadî), reconocimiento internacional mediante el Premio Sájarov 2023 del Parlamento Europeo (con el abogado Saleh Nikbakht en representación de la familia), y hallazgos del informe de la ONU de marzo de 2025 (A/HRC/58/63) sobre la ausencia de rendición de cuentas efectiva y la prohibición de conmemorar su muerte en septiembre de 2024.",
              "actionableLesson": "La sociedad y las instituciones deben garantizar:\n• Autonomía corporal y libertad de conciencia.\n• Protección frente a detenciones arbitrarias.\n• Atención médica independiente e imparcial para las personas detenidas.\n• Investigaciones transparentes e independientes sobre muertes bajo custodia.\n• Protección de familiares y testigos frente a represalias.\n• Igualdad ante la ley sin discriminación étnica, religiosa o de género.",
              "memorialPublication": {
                  "title": "Protocolo de Atención Médica Independiente bajo Custodia y Protección de los Derechos Humanos",
                  "focus": "Salud bajo Custodia · Independencia Médica · Responsabilidad Forense · Derechos Humanos",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Un marco propuesto por UltimateHealth para garantizar evaluaciones médicas independientes en centros de detención, integridad de los historiales clínicos, investigaciones forenses conforme al Protocolo de Minnesota y protección del personal sanitario frente a coacciones."
              }
          },
          "fr": {
              "country": "Iran",
              "categoryLabel": "Droits humains, autonomie et liberté",
              "roleAndField": "Étudiante · Femme kurde iranienne · Catalyseur du mouvement « Femme, Vie, Liberté »",
              "coreMessage": "La dignité personnelle, l'autonomie corporelle et les droits humains fondamentaux doivent être protégés quels que soient le genre, l'origine ethnique, la religion ou les circonstances politiques. Nul ne devrait perdre sa liberté ou la vie en raison de l'application discriminatoire de politiques d'État.",
              "whoWasThisPerson": "Jina Mahsa Amini était une jeune femme kurde de 22 ans originaire de Saqqez, dans la province iranienne du Kurdistan.\n\nSa famille et ses proches l'appelaient Jina, son prénom kurde, tandis que Mahsa figurait sur ses documents officiels. Son identité kurde fait partie intégrante de son histoire et ne doit pas être effacée de sa mémoire.\n\nPassionnée de musique et d'arts du spectacle, l'enquête détaillée de la Mission internationale indépendante d'établissement des faits de l'ONU (A/HRC/55/CRP.1) rapporte qu'elle jouait du violon, faisait du théâtre local, aimait le chant et les vêtements traditionnels kurdes, et pratiquait la randonnée et le tennis.\n\nElle avait été admise pour étudier la microbiologie à la faculté de médecine de l'Université d'Ourmia (province d'Azerbaïdjan occidental) et devait commencer ses cours fin septembre 2022.",
              "contributions": "Jina n'était ni une dirigeante politique ni l'organisatrice d'une campagne de défense des droits humains. Sa mort est devenue le catalyseur du mouvement « Femme, Vie, Liberté » (en kurde : Jin, Jiyan, Azadî).\n\nIl est essentiel de préserver cette distinction : Jina n'a pas personnellement dirigé le mouvement ; ce sont les personnes qui ont manifesté, documenté les abus et exigé des comptes qui lui ont donné sa force.",
              "factualContext": "Le 13 septembre 2022, Jina s'est rendue à Téhéran avec sa famille. Vers 18 h 30, à la sortie de la station de métro Shahid Haqqani avec son frère, elle a été arrêtée par la Patrouille d'orientation iranienne (police des mœurs) et conduite au centre de détention de Vozara.\n\nSelon la Mission d'établissement des faits de l'ONU :\n• Elle s'est effondrée environ 26 minutes après son arrivée au centre de détention.\n• Transférée à l'hôpital Kasra de Téhéran dans le coma, elle y est décédée le 16 septembre 2022 alors qu'elle se trouvait sous la garde de l'État.\n\nEnquête de l'ONU et circonstances contestées :\nDans son rapport A/HRC/55/67 (2 février 2024) et ses conclusions détaillées (A/HRC/55/CRP.1, 19 mars 2024), la Mission de l'ONU a conclu que :\n• Son arrestation et sa détention étaient arbitraires et fondées sur des lois discriminatoires.\n• Des preuves attestent de traumatismes corporels infligés pendant sa garde à vue par la police des mœurs.\n• Les violences physiques subies en détention ont entraîné sa mort et l'État porte la responsabilité de son décès illicite.\n\nPrécision médicale et juridique importante : La Mission n'a pas pu déterminer la cause médicale immédiate exacte du décès en raison du refus des autorités iraniennes de communiquer des dossiers médicaux et policiers clés, mais elle a exclu les complications présumées de son opération cérébrale infantile.",
              "editorialNotes": "Précisions éditoriales et juridiques : (1) Le nom principal « Jina Mahsa Amini » préserve son prénom kurde. (2) Sa mort a été le catalyseur du mouvement et non une campagne dirigée par elle. (3) L'ONU a établi que des violences physiques en détention ont causé sa mort et engagé la responsabilité de l'État. (4) Le Prix Sakharov 2023 a été décerné conjointement à Jina Mahsa Amini et au mouvement « Femme, Vie, Liberté ». (5) Le rapport de l'ONU de mars 2025 (A/HRC/58/63) souligne l'absence de poursuites judiciaires effectives.",
              "verifiedFacts": [
                  "Jina Mahsa Amini était une jeune femme kurde iranienne de 22 ans originaire de Saqqez (province du Kurdistan), admise en microbiologie à la faculté de médecine de l'Université d'Ourmia pour la rentrée de septembre 2022.",
                  "Arrêtée le 13 septembre 2022 à Téhéran par la police des mœurs, elle s'est effondrée environ 26 minutes après son arrivée au centre de Vozara et est décédée le 16 septembre 2022 à l'hôpital Kasra.",
                  "En mars 2024, la Mission de l'ONU (A/HRC/55/67 et A/HRC/55/CRP.1) a conclu qu'elle avait subi des violences physiques en détention ayant entraîné sa mort et que l'État était responsable de son décès illicite.",
                  "En octobre 2023, le Parlement européen a décerné conjointement le Prix Sakharov 2023 à Jina Mahsa Amini et au mouvement « Femme, Vie, Liberté » (remis à Strasbourg le 12 décembre 2023).",
                  "Le rapport de l'ONU de mars 2025 (A/HRC/58/63) a documenté les pressions continues exercées sur sa famille et le blocage de toute procédure judiciaire effective depuis plus de deux ans."
              ],
              "societalImpact": "Impact sociétal — Femme, Vie, Liberté (Jin, Jiyan, Azadî), reconnaissance internationale par le Prix Sakharov 2023 du Parlement européen (avec Me Saleh Nikbakht représentant la famille à Strasbourg), et conclusions du rapport de l'ONU de mars 2025 (A/HRC/58/63) sur les représailles contre sa famille (interdiction de commémoration en septembre 2024, poursuites contre son père en janvier 2025) et l'impunité persistante.",
              "actionableLesson": "La société et les institutions doivent garantir :\n• L'autonomie corporelle et la liberté de conscience.\n• La protection contre la détention arbitraire.\n• Des soins médicaux indépendants et impartiaux pour les personnes détenues.\n• Des enquêtes transparentes et indépendantes sur les décès en détention.\n• La protection des familles et des témoins contre les représailles.\n• L'égalité devant la loi sans discrimination ethnique, religieuse ou de genre.",
              "memorialPublication": {
                  "title": "Protocole de soins de santé indépendants en détention et de protection des droits humains",
                  "focus": "Santé en détention · Indépendance médicale · Responsabilité médico-légale · Droits humains",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Un cadre proposé par UltimateHealth visant à garantir l'examen médical indépendant des détenus, l'intégrité des dossiers médicaux, des enquêtes médico-légales conformes au Protocole du Minnesota et la protection des soignants contre toute coercition."
              }
          },
          "hr": {
              "country": "Iran",
              "categoryLabel": "Ljudska prava, autonomija i sloboda",
              "roleAndField": "Studentica · Iranska Kurdkinja · Katalizatorica pokreta „Žena, život, sloboda”",
              "coreMessage": "Osobno dostojanstvo, tjelesna autonomija i temeljna ljudska prava moraju biti zaštićeni bez obzira na spol, etničku pripadnost, vjeru ili političke okolnosti. Nitko ne bi smio izgubiti slobodu ili život zbog diskriminatornog provođenja državnih politika.",
              "whoWasThisPerson": "Jina Mahsa Amini bila je 22-godišnja Kurdkinja iz Saqqeza u iranskoj pokrajini Kurdistan.\n\nNjezina obitelj i bliski rođaci poznavali su je kao Jinu, njezino kurdsko ime, dok je Mahsa bilo ime u njezinim službenim dokumentima. Njezin kurdski identitet važan je dio njezine priče i ne smije se izostaviti iz sjećanja na nju.\n\nZanimala se za glazbu i izvedbene umjetnosti. Detaljna istraga Neovisne međunarodne misije UN-a za utvrđivanje činjenica (A/HRC/55/CRP.1) bilježi da je svirala violinu, nastupala u lokalnom kazalištu, voljela pjevanje i tradicionalnu kurdsku odjeću te provodila vrijeme planinareći i igrajući tenis.\n\nBila je primljena na studij mikrobiologije na Medicinskom fakultetu Sveučilišta u Urmiji (pokrajina Zapadni Azerbajdžan), gdje je trebala započeti studij krajem rujna 2022.",
              "contributions": "Jina nije bila politička čelnica niti organizatorica kampanje za ljudska prava. Njezina smrt postala je katalizator pokreta „Žena, život, sloboda”, poznatog na kurdskom kao Jin, Jiyan, Azadî.\n\nVažno je očuvati tu razliku: Jina nije osobno vodila pokret; snagu su mu dali ljudi koji su prosvjedovali, organizirali se, dokumentirali zloupotrebe i zahtijevali odgovornost.",
              "factualContext": "Dana 13. rujna 2022. Jina je s obitelji отпутовала u Teheran. Oko 18:30 sati, nakon izlaska iz postaje podzemne željeznice Shahid Haqqani sa svojim bratom, zaustavila ju je i uhitila iranska Patrola za usmjeravanje (moralna policija) te je odvedena u pritvorski centar Vozara.\n\nPrema Misiji UN-a za utvrđivanje činjenica:\n• Srušila se približno 26 minuta nakon dolaska u pritvorski centar.\n• Prebačena je u bolnicu Kasra u Teheranu, gdje je ostala u komi i preminula 16. rujna 2022. u državnom pritvoru.\n\nIstraga UN-a i osporene okolnosti:\nU svojem izvješću A/HRC/55/67 (2. veljače 2024.) i detaljnim nalazima (A/HRC/55/CRP.1, 19. ožujka 2024.), Misija UN-a zaključila je da:\n• Njezino uhićenje i pritvaranje bili su proizvoljni i temeljeni na diskriminatornim zakonima.\n• Postojali su dokazi o tjelesnim traumama nanesenim dok je bila u pritvoru moralne policije.\n• Fizičko nasilje u pritvoru dovelo je do njezine smrti te država snosi odgovornost za njezinu nezakonitu smrt.\n\nVažna medicinska i pravna napomena: Misija nije mogla utvrditi točan neposredni medicinski uzrok smrti jer iranske vlasti nisu otkrile ključnu policijsku i medicinsku dokumentaciju, ali je isključila navodne komplikacije operacije mozga iz djetinjstva kao neposredni uzrok.",
              "editorialNotes": "Uredničke i pravne napomene: (1) Koristi se puno ime „Jina Mahsa Amini” radi očuvanja njezina kurdskog imena. (2) Njezina smrt bila je katalizator pokreta, a ne kampanja koju je sama vodila. (3) Misija UN-a zaključila je da je fizičko nasilje u pritvoru dovelo do njezine smrti te utvrdila odgovornost države. (4) Nagrada Saharov 2023. dodijeljena je zajednički Jini Mahsi Amini i pokretu „Žena, život, sloboda”. (5) Izvješće UN-a iz ožujka 2025. (A/HRC/58/63) bilježi izostanak učinkovitog sudskog postupka.",
              "verifiedFacts": [
                  "Jina Mahsa Amini bila je 22-godišnja iranska Kurdkinja iz Saqqeza (pokrajina Kurdistan), primljena na studij mikrobiologije na Medicinskom fakultetu Sveučilišta u Urmiji.",
                  "Uhićena 13. rujna 2022. u Teheranu od strane moralne policije, srušila se oko 26 minuta nakon dolaska u pritvorski centar Vozara i preminula 16. rujna 2022. u bolnici Kasra.",
                  "U ožujku 2024. Misija UN-a (A/HRC/55/67 i A/HRC/55/CRP.1) zaključila je da je bila izložena fizičkom nasilju u pritvoru koje je dovelo do njezine smrti te da država snosi odgovornost.",
                  "U listopadu 2023. Europski parlament zajednički je dodijelio Nagradu Saharov 2023. Jini Mahsi Amini i pokretu „Žena, život, sloboda” (uručena u Strasbourgu 12. prosinca 2023.).",
                  "Izvješće UN-a iz ožujka 2025. (A/HRC/58/63) dokumentiralo je nastavak pritisaka na njezinu obitelj i zastoj sudskog postupka dulji od dvije godine."
              ],
              "societalImpact": "Društveni utjecaj — Žena, život, sloboda (Jin, Jiyan, Azadî), međunarodno priznanje Nagradom Saharov 2023. Europskog parlamenta (obitelj je u Strasbourgu zastupao odvjetnik Saleh Nikbakht) te nalazi izvješća UN-a iz ožujka 2025. (A/HRC/58/63) o sprječavanju komemoracije u rujnu 2024., optužnici protiv njezina oca u siječnju 2025. i neriješenom pitanju odgovornosti.",
              "actionableLesson": "Društvo i institucije moraju jamčiti:\n• Tjelesnu autonomiju i slobodu savjesti.\n• Zaštitu od proizvoljnog pritvaranja.\n• Neovisnu i nepristranu medicinsku skrb za pritvorenike.\n• Transparentne neovisne istrage smrti u pritvoru.\n• Zaštitu obitelji i svjedoka od zastrašivanja.\n• Jednaku pravnu zaštitu bez etničke, vjerske ili rodne diskriminacije.",
              "memorialPublication": {
                  "title": "Protokol za neovisnu zdravstvenu skrb u pritvoru i zaštitu ljudskih prava",
                  "focus": "Zdravlje u pritvoru · Medicinska neovisnost · Forenzička odgovornost · Ljudska prava",
                  "initiativeStatus": "Proposed Initiative",
                  "deliverable": "Predloženi okvir UltimateHealtha za neovisnu medicinsku procjenu pritvorenika, nepovredivost medicinske dokumentacije, neovisne forenzičke istrage prema Protokolu iz Minnesote i zaštitu zdravstvenih radnika od prisile."
              }
          }
      }
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
