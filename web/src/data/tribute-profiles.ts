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
    id: 3,
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
