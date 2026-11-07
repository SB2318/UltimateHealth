import type { SurvivorVoice, Changemaker, SocietalLesson } from "@/types/tribute";

export interface LocalizedEndingManifesto {
  headline: string;
  paragraphs: string[];
  finalCallout: string;
}

export interface LocalizedConsentFramework {
  title: string;
  description: string;
  steps: {
    step: number;
    title: string;
    detail: string;
  }[];
  privacyPledge: string[];
}

export const PILLARS_LOCALIZED_DATA: Record<
  string,
  {
    survivorVoices: SurvivorVoice[];
    consentFramework: LocalizedConsentFramework;
    changemakers: Changemaker[];
    societalLessons: SocietalLesson[];
    editorialPromise: string[];
    endingManifesto: LocalizedEndingManifesto;
  }
> = {
  "en": {
    "survivorVoices": [
      {
        "id": "malala-yousafzai",
        "slug": "malala-yousafzai",
        "name": "Malala Yousafzai",
        "displayRole": "Nobel Peace Laureate · Education Advocate & Co-Founder of Malala Fund",
        "country": "Pakistan",
        "countryFlag": "🇵🇰",
        "eraOrYear": "1997–Present · 2012 Attack Survivor",
        "summary": "Survivor of targeted extremist violence who transformed her lived experience into a global movement for free, safe, quality education for girls and its critical link to lifelong health.",
        "livedExperienceAndAdvocacy": "Targeted on 9 October 2012 for writing a BBC Urdu diary and speaking out for female schooling in Swat Valley, Pakistan, she survived catastrophic gunshot injuries following emergency care and neurosurgery in Birmingham, UK. She co-founded the Malala Fund in 2013, campaigning internationally to guarantee 12 years of free, safe, quality education for all children and funding educational infrastructure across South Asia, Latin America, and Africa.",
        "societalReformMessage": "Universal access to secondary education for girls is the most transformative intervention for public health, maternal welfare, economic autonomy, and poverty eradication worldwide.",
        "verifiedQuote": {
          "quote": "One child, one teacher, one book, and one pen can change the world.",
          "source": "Address before the United Nations Youth Assembly (12 July 2013)"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2014 Citation: Malala Yousafzai",
            "url": "https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Malala Fund: Girls' Education and Research Reports",
            "url": "https://malala.org",
            "publisher": "Malala Fund"
          }
        ]
      },
      {
        "id": "nadia-murad",
        "slug": "nadia-murad",
        "name": "Nadia Murad",
        "displayRole": "Nobel Peace Laureate · UNODC Goodwill Ambassador · Founder of Nadia's Initiative",
        "country": "Iraq",
        "countryFlag": "🇮🇶",
        "eraOrYear": "1993–Present · 2014 Yazidi Genocide Survivor",
        "summary": "Yazidi human rights defender who escaped wartime enslavement and led global legal efforts to classify weaponized sexual violence as an international crime, while rebuilding rural public health.",
        "livedExperienceAndAdvocacy": "In August 2014, ISIS invaded Sinjar and her village of Kocho, murdering her mother and six brothers while enslaving thousands of Yazidi women and girls. Following her perilous escape in November 2014 with help from a Sunni Muslim family, she testified before the UN Security Council, authored 'The Last Girl,' and founded Nadia's Initiative, rebuilding schools, clean water networks, and spearheading the Sinjar French Medical Center, opened on 19 February 2026.",
        "societalReformMessage": "Survivors of conflict-related sexual violence must receive tangible reparations, trauma-informed psychological healthcare, and direct leadership roles in rebuilding their societies.",
        "verifiedQuote": {
          "quote": "I want to be the last girl in the world with a story like mine.",
          "source": "Nobel Lecture & Global Human Rights Advocacy"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/murad/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Nadia's Initiative: Sinjar French Medical Center Opening (2026)",
            "url": "https://www.nadiasinitiative.org/healthcare",
            "publisher": "Nadia's Initiative"
          }
        ]
      }
    ],
    "consentFramework": {
      "title": "Seven-Step Survivor Consent & Privacy Framework",
      "description": "UltimateHealth operates an ethical, trauma-informed publication protocol that respects individual agency, personal autonomy, and unconditional privacy.",
      "steps": [
        {
          "step": 1,
          "title": "Story Submission / Ethical Nomination",
          "detail": "Stories are accepted only via confidential, encrypted communication channels or authorized organizational referrals. We do not operate open, unmoderated submission boards."
        },
        {
          "step": 2,
          "title": "Initial Editorial & Safety Screening",
          "detail": "Our editorial board evaluates each story for human dignity, educational purpose, and safety implications, ensuring disclosure does not create immediate personal danger."
        },
        {
          "step": 3,
          "title": "Informed Consent & Identity Selection",
          "detail": "Contributors specify their exact preferred public attribution: Full Name, Verified Pseudonym, or Anonymous Community Voice."
        },
        {
          "step": 4,
          "title": "Fact-Checking & Legal Corroboration",
          "detail": "Biographical dates, organizational initiatives, and public records are corroborated using primary documents without imposing interrogative burdens on the contributor."
        },
        {
          "step": 5,
          "title": "Contributor Review of Draft",
          "detail": "The contributor reviews the final proposed editorial text and retains absolute veto power over every word, date, and description prior to publication."
        },
        {
          "step": 6,
          "title": "Final Editorial Ethics Sign-Off",
          "detail": "Final review confirms compliance with our dignity standard: zero sensationalism, zero graphic depictions of violence, and complete omission of sensitive personal metadata."
        },
        {
          "step": 7,
          "title": "Ongoing Corrections & Unconditional Withdrawal",
          "detail": "Contributors retain the permanent right to update information, amend identity preferences, or request immediate and permanent removal from the initiative at any time."
        }
      ],
      "privacyPledge": [
        "No private phone numbers, residential addresses, or real-time location details are ever recorded or displayed.",
        "No identifying details of family members or minors are disclosed without explicit independent consent.",
        "Lived experiences are never monetized, sensationalized, or utilized for commercial marketing."
      ]
    },
    "changemakers": [
      {
        "id": "dr-denis-mukwege",
        "slug": "dr-denis-mukwege",
        "name": "Dr. Denis Mukwege",
        "roleAndField": "Gynecological Surgeon & Humanitarian Physician",
        "organization": "Panzi Hospital & Foundation",
        "country": "Democratic Republic of Congo",
        "countryFlag": "🇨🇩",
        "eraOrYear": "1999–Present",
        "focusArea": "Reconstructive Trauma Surgery & Holistic Healing for Survivors of Conflict Violence",
        "documentedActions": "Founded Panzi Hospital in Bukavu (1999), pioneering a holistic four-pillar treatment model encompassing specialized reconstructive surgery, trauma psychology, socio-economic reintegration, and legal advocacy for tens of thousands of victims of conflict-related sexual violence.",
        "measurableImpact": "Co-recipient of the 2018 Nobel Peace Prize with Nadia Murad for efforts to end sexual violence as a weapon of war; co-founded the Global Survivors Fund in 2019, providing direct interim reparations across multiple global conflict zones.",
        "relevanceToHumanity": "Exemplifies how clinical surgical excellence paired with unyielding moral courage can rebuild human dignity and bodily integrity from the trauma of armed conflict.",
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/mukwege/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "The Panzi Model of Holistic Healing & Reconstructive Surgery",
            "url": "https://panzifoundation.org",
            "publisher": "Panzi Foundation"
          }
        ]
      },
      {
        "id": "dr-sunitha-krishnan",
        "slug": "dr-sunitha-krishnan",
        "name": "Dr. Sunitha Krishnan",
        "roleAndField": "Social Reformer & Anti-Trafficking Pioneer",
        "organization": "Prajwala",
        "country": "India",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1996–Present",
        "focusArea": "Rescue, Rehabilitation & Reintegration of Human Trafficking Survivors",
        "documentedActions": "Co-founded Prajwala in Hyderabad in 1996, creating an integrated intervention model across prevention, rescue, psychological healing, child protection, and economic restoration for women and girls rescued from commercial sexual exploitation.",
        "measurableImpact": "Rescued and rehabilitated over 24,000 survivors of sex trafficking; played an instrumental role in shaping landmark anti-trafficking legal frameworks in India; awarded the Padma Shri by the Government of India in 2016.",
        "relevanceToHumanity": "Proves that sustainable community rescue requires long-term psychological rehabilitation, vocational economic independence, and relentless legal advocacy against institutional exploitation.",
        "references": [
          {
            "title": "Prajwala Institutional Impact & Survivor Rehabilitation Data",
            "url": "https://prajwalaindia.com",
            "publisher": "Prajwala"
          },
          {
            "title": "Government of India Padma Awards Gazette (2016)",
            "url": "https://padmaawards.gov.in",
            "publisher": "Government of India"
          }
        ]
      },
      {
        "id": "dr-abhay-rani-bang",
        "slug": "dr-abhay-rani-bang",
        "name": "Dr. Abhay & Dr. Rani Bang",
        "roleAndField": "Public Health Physicians & Clinical Researchers",
        "organization": "SEARCH (Society for Education, Action and Research in Community Health)",
        "country": "India",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1986–Present",
        "focusArea": "Home-Based Newborn and Child Care (HBNC) & Rural Healthcare Equity",
        "documentedActions": "In the remote tribal district of Gadchiroli, Maharashtra, they pioneered the Home-Based Newborn and Child Care (HBNC) model, training village women (Arogyadoot) to diagnose and manage neonatal sepsis, hypothermia, and low birthweight directly in home settings.",
        "measurableImpact": "Their landmark clinical trial published in The Lancet (1999) documented a 62% reduction in infant mortality; the HBNC architecture was adopted as India's national ASHA home-care guideline reaching millions of rural families and endorsed by WHO/UNICEF; awarded the Padma Shri in 2018.",
        "relevanceToHumanity": "Revolutionized decentralized, evidence-based public health by placing life-saving clinical knowledge directly into the hands of rural women and community healthcare workers.",
        "references": [
          {
            "title": "The Lancet: Effect of Home-Based Neonatal Care on Neonatal Mortality",
            "url": "https://www.thelancet.com",
            "publisher": "The Lancet (1999)"
          },
          {
            "title": "SEARCH Gadchiroli Field Research and HBNC Architecture",
            "url": "https://searchgadchiroli.org.in",
            "publisher": "SEARCH"
          }
        ]
      }
    ],
    "societalLessons": [
      {
        "theme": "Healthcare Safety",
        "whatWeCanImprove": "Secure hospitals, duty rooms, triage de-escalation, and emergency facilities with biometric access controls and protective protocols.",
        "actionableInitiatives": [
          "Mandatory secure, locked, well-lit duty rooms for on-call resident doctors and nursing staff",
          "Panic alarms and round-the-clock trained security in casualty and triage zones",
          "Mandatory restraint and police screening for belligerent or intoxicated patients brought under custody"
        ],
        "profilesRef": [
          "Dr. Moumita Debnath",
          "Aruna Shanbaug",
          "Dr. Sarita Toshniwal",
          "Dr. Vandana Das",
          "Dr. Tamara O'Neal"
        ]
      },
      {
        "theme": "Women's Safety",
        "whatWeCanImprove": "Better reporting systems, transit infrastructure, prevention, and strict institutional accountability across public and private spaces.",
        "actionableInitiatives": [
          "GPS-monitored, well-lit public transit corridors and verified driver credentials",
          "Early education on coercive control and warning signs of domestic intimidation",
          "Independent civic audits of public streets, parks, and night transit stops"
        ],
        "profilesRef": [
          "Jyoti Singh",
          "Sarah Everard",
          "Reeva Steenkamp",
          "Anene Booysen",
          "Mahsa Amini"
        ]
      },
      {
        "theme": "Child Protection",
        "whatWeCanImprove": "Accessible safeguarding, early reporting, and timely non-discriminatory intervention regardless of ethnic or economic background.",
        "actionableInitiatives": [
          "Universal trauma-informed screening in pediatric and primary care clinics",
          "Safe community recreational spaces and rapid child welfare outreach in marginalized areas",
          "Fast-track judicial resolution with complete child witness protection"
        ],
        "profilesRef": [
          "The Kathua Child",
          "Anene Booysen",
          "Anne Frank"
        ]
      },
      {
        "theme": "Education & Literacy",
        "whatWeCanImprove": "Equal, uninterrupted access to 12 years of quality education and health literacy for every child, especially young girls.",
        "actionableInitiatives": [
          "Abolishing economic and infrastructural barriers to secondary school attendance",
          "School-based reproductive, menstrual, and mental health curriculums",
          "Community protection for female educators and students in conservative areas"
        ],
        "profilesRef": [
          "Malala Yousafzai",
          "Anne Frank",
          "Sophie Scholl"
        ]
      },
      {
        "theme": "Journalism & Truth",
        "whatWeCanImprove": "Protect independent reporting, anti-SLAPP legal safeguards, and open public access to vital civic information.",
        "actionableInitiatives": [
          "Statutory anti-SLAPP legislation to stop wealthy entities from silencing journalists through predatory litigation",
          "Emergency digital security and evacuation funds for investigative reporters under threat",
          "Universal respect for protective 'PRESS' markings by all state and military security forces"
        ],
        "profilesRef": [
          "Daphne Caruana Galizia",
          "Anna Politkovskaya",
          "Veronica Guerin",
          "Shireen Abu Akleh",
          "Gauri Lankesh"
        ]
      },
      {
        "theme": "Environmental Justice",
        "whatWeCanImprove": "Involve local and indigenous communities in all development, land-use, and watershed decisions through meaningful consent.",
        "actionableInitiatives": [
          "Mandatory enforcement of Free, Prior, and Informed Consent (FPIC) before concession approvals",
          "Immediate cessation of strategic criminalization and misuse of penal law against peaceful land defenders",
          "Community-led environmental impact monitoring for heavy metal contamination and watershed degradation"
        ],
        "profilesRef": [
          "Berta Cáceres",
          "Marielle Franco",
          "Aysim Büyüknohutçu",
          "Efigenia Vásquez Astudillo",
          "Emilsen Manyoma",
          "Leonila Tapdasan Pesadilla",
          "Laura Leonor Vásquez Pineda",
          "Jane Júlia de Oliveira"
        ]
      },
      {
        "theme": "Human Rights & Dignity",
        "whatWeCanImprove": "Ensure equal dignity, bodily autonomy, and equal rights under the law regardless of gender, faith, race, or background.",
        "actionableInitiatives": [
          "Decoupling civil rights and public mobility from authoritarian morality policing",
          "Equal access to political representation for marginalized racial and socio-economic groups",
          "Institutional safeguards against religious and caste discrimination in state services"
        ],
        "profilesRef": [
          "Mahsa Amini",
          "Sophie Scholl",
          "Marielle Franco",
          "Qandeel Baloch"
        ]
      },
      {
        "theme": "Mental & Social Rehabilitation",
        "whatWeCanImprove": "Provide long-term medical, psychosocial, and economic support for survivors and bereaved families.",
        "actionableInitiatives": [
          "Community-based sanctuary shelters with integrated medical and legal defense assistance",
          "Specialized trauma therapy for survivors of conflict-related sexual violence and trafficking",
          "Direct survivor-led management of reconstruction and reparations funds"
        ],
        "profilesRef": [
          "Yanar Mohammed",
          "Nadia Murad",
          "Malala Yousafzai"
        ]
      },
      {
        "theme": "Institutional Justice",
        "whatWeCanImprove": "Transparent, independent investigations and expeditious legal processes without corporate or political interference.",
        "actionableInitiatives": [
          "Judicial task forces to review workplace security failures across public hospitals",
          "Seizure of unexplained illicit assets derived from criminal enterprises",
          "Zero tolerance for state impunity when officials or police are implicated in violence"
        ],
        "profilesRef": [
          "Dr. Moumita Debnath",
          "Aruna Shanbaug",
          "Veronica Guerin",
          "Sarah Everard"
        ]
      },
      {
        "theme": "Community Responsibility",
        "whatWeCanImprove": "Encourage people to intervene safely when someone needs help, refusing to remain indifferent to suffering.",
        "actionableInitiatives": [
          "Active bystander intervention training in schools, universities, and workplaces",
          "Neighborhood mutual-aid networks for vulnerable individuals facing domestic threats",
          "Community awareness campaigns challenging the normalization of street harassment"
        ],
        "profilesRef": [
          "Anene Booysen",
          "Jyoti Singh",
          "Sarah Everard"
        ]
      }
    ],
    "editorialPromise": [
      "No graphic, sensational, or gratuitous depictions of violence or trauma.",
      "Strict avoidance of sensationalist headlines designed to exploit human tragedy.",
      "No unverified allegations — all historical, judicial, and scientific claims cross-referenced with primary legal and archival records.",
      "Clear distinction between documented biographical facts, judicial findings, and UltimateHealth's proposed advocacy initiatives.",
      "Living survivors (Malala Yousafzai, Nadia Murad) are honored as active leaders with agency, distinct from memorial profiles.",
      "Rigorous privacy protection and non-disclosure of sensitive metadata in compliance with judicial orders (such as Section 73 BNS / 228A IPC and Nipun Saxena v. Union of India).",
      "Explicit tracking of editorial verification status, audit dates, and direct links to primary source documents.",
      "Transparent acknowledgment of disputed or unresolved investigative findings rather than presenting unproven claims as established fact.",
      "No political or communal targeting of any demographic group.",
      "Unconditional dedication to human dignity, truth, and institutional safety for all people."
    ],
    "endingManifesto": {
      "headline": "The world does not need more memorials alone.\nIt needs more humanity.",
      "paragraphs": [
        "Some people wanted to become doctors. Some wanted to educate children. Some wanted to protect forests, report the truth, or give a voice to people who were ignored.",
        "Their lives remind us that behind every name is a person with dreams, relationships, responsibilities and possibilities.",
        "We cannot rewrite their past. But we can make their stories meaningful by improving the systems around us, protecting vulnerable people, supporting education, respecting dignity and refusing to remain indifferent to suffering."
      ],
      "finalCallout": "Let us not remember them only for how they left this world. Let us remember what they wanted to contribute to it."
    }
  },
  "hi": {
    "survivorVoices": [
      {
        "id": "malala-yousafzai",
        "slug": "malala-yousafzai",
        "name": "मलाला यूसुफ़ज़ई",
        "displayRole": "नोबेल शांति पुरस्कार विजेता · शिक्षा पैरोकार एवं सह-संस्थापक · मलाला फंड",
        "country": "पाकिस्तान",
        "countryFlag": "🇵🇰",
        "eraOrYear": "1997–वर्तमान · 2012 हमले की उत्तरजीवी",
        "summary": "कट्टरपंथी हिंसा की उत्तरजीवी, जिन्होंने अपने व्यक्तिगत अनुभव को बालिकाओं के लिए निःशुल्क, सुरक्षित और गुणवत्तापूर्ण शिक्षा तथा आजीवन स्वास्थ्य के अधिकार के वैश्विक आंदोलन में बदल दिया।",
        "livedExperienceAndAdvocacy": "9 अक्टूबर 2012 को स्वात घाटी, पाकिस्तान में बीबीसी उर्दू डायरी लिखने और बालिका शिक्षा के पक्ष में बोलने के कारण तालिबानी आतंकियों ने उन पर घातक हमला किया। आपातकालीन न्यूरोसर्जरी और बर्मिंघम, ब्रिटेन में गहन उपचार के बाद वह जीवित बचीं। उन्होंने 2013 में 'मलाला फंड' की सह-स्थापना की, जो दुनिया भर में 12 वर्षों की मुफ्त एवं सुरक्षित शिक्षा सुनिश्चित करने और दक्षिण एशिया, लैटिन अमेरिका व अफ्रीका में शैक्षणिक बुनियादी ढांचे के वित्तपोषण का कार्य कर रहा है।",
        "societalReformMessage": "बालिकाओं के लिए माध्यमिक शिक्षा तक सार्वभौमिक पहुंच सार्वजनिक स्वास्थ्य, मातृ कल्याण, आर्थिक स्वावलंबन और गरीबी उन्मूलन का सबसे प्रभावी माध्यम है।",
        "verifiedQuote": {
          "quote": "एक बच्चा, एक शिक्षक, एक किताब और एक कलम पूरी दुनिया बदल सकते हैं।",
          "source": "संयुक्त राष्ट्र युवा सभा में संबोधन (12 जुलाई 2013)"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2014 Citation: Malala Yousafzai",
            "url": "https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Malala Fund: Girls' Education and Research Reports",
            "url": "https://malala.org",
            "publisher": "Malala Fund"
          }
        ]
      },
      {
        "id": "nadia-murad",
        "slug": "nadia-murad",
        "name": "नादिया मुराद",
        "displayRole": "नोबेल शांति पुरस्कार विजेता · यूएनओडीसी सद्भावना राजदूत · संस्थापक · नादियाज़ इनिशिएटिव",
        "country": "इराक",
        "countryFlag": "🇮🇶",
        "eraOrYear": "1993–वर्तमान · 2014 यज़ीदी नरसंहार की उत्तरजीवी",
        "summary": "यज़ीदी मानवाधिकार रक्षक, जिन्होंने युद्धकालीन दासता से बचकर यौन हिंसा को अंतरराष्ट्रीय युद्ध अपराध घोषित कराने के वैश्विक कानूनी अभियान का नेतृत्व किया और ग्रामीण स्वास्थ्य सेवा का पुनर्निर्माण किया।",
        "livedExperienceAndAdvocacy": "अगस्त 2014 में आईएसआईएस ने सिंजार और उनके गांव कोचो पर हमला कर उनकी मां और छह भाइयों की हत्या कर दी तथा हजारों महिलाओं को बंदी बना लिया। नवंबर 2014 में एक साहसी सुन्नी मुस्लिम परिवार की मदद से पलायन कर उन्होंने संयुक्त राष्ट्र सुरक्षा परिषद में गवाही दी, 'द लास्ट गर्ल' पुस्तक लिखी और 'नादियाज़ इनिशिएटिव' की स्थापना की। उन्होंने सिंजार में स्कूलों व पेयजल का पुनर्निर्माण किया और 19 फरवरी 2026 को सिंजार फ्रेंच मेडिकल सेंटर का सार्वजनिक उद्घाटन कराया।",
        "societalReformMessage": "संघर्ष-संबंधी यौन हिंसा के उत्तरजीवियों को प्रत्यक्ष क्षतिपूर्ति, आघात-संवेदनशील मनोवैज्ञानिक स्वास्थ्य सेवा और अपने समाजों के पुनर्निर्माण में सीधी नेतृत्वकारी भूमिका मिलनी चाहिए।",
        "verifiedQuote": {
          "quote": "मैं दुनिया की ऐसी आखिरी लड़की बनना चाहती हूं जिसकी मेरे जैसी दर्दनाक कहानी हो।",
          "source": "नोबेल व्याख्यान एवं वैश्विक मानवाधिकार वकालत"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/murad/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Nadia's Initiative: Sinjar French Medical Center Opening (2026)",
            "url": "https://www.nadiasinitiative.org/healthcare",
            "publisher": "Nadia's Initiative"
          }
        ]
      }
    ],
    "consentFramework": {
      "title": "उत्तरजीवी सहमति एवं गोपनीयता की सात-चरणीय आचार संहिता",
      "description": "अल्टीमेटहेल्थ एक नैतिक एवं आघात-संवेदनशील प्रकाशन नीति का पालन करता है जो व्यक्तिगत गरिमा, स्वायत्तता और बिना शर्त गोपनीयता का सम्मान करती है।",
      "steps": [
        {
          "step": 1,
          "title": "कहानी प्रस्तुति / नैतिक नामांकन",
          "detail": "कहानियां केवल गोपनीय, एन्क्रिप्टेड संचार माध्यमों या अधिकृत संस्थागत संदर्भों के माध्यम से ही स्वीकार की जाती हैं। हम कोई खुला या अनियंत्रित सबमिशन बोर्ड नहीं चलाते।"
        },
        {
          "step": 2,
          "title": "प्रारंभिक संपादकीय एवं सुरक्षा समीक्षा",
          "detail": "हमारा संपादकीय बोर्ड मानवीय गरिमा, शैक्षिक उद्देश्य और सुरक्षा पहलुओं का मूल्यांकन करता है ताकि विवरण सार्वजनिक करने से किसी के जीवन पर कोई संकट न आए।"
        },
        {
          "step": 3,
          "title": "सूचित सहमति एवं पहचान का चयन",
          "detail": "योगदानकर्ता अपनी सार्वजनिक पहचान की प्राथमिकता स्वयं तय करते हैं: पूर्ण नाम, सत्यापित उपनाम, या अनाम सामुदायिक स्वर।"
        },
        {
          "step": 4,
          "title": "तथ्य-जांच एवं विधिक सत्यापन",
          "detail": "योगदानकर्ता पर बिना कोई पूछताछ का बोझ डाले प्राथमिक अभिलेखों और सार्वजनिक दस्तावेजों से जीवनवृत्त के तथ्यों का सत्यापन किया जाता है।"
        },
        {
          "step": 5,
          "title": "योगदानकर्ता द्वारा आलेख की समीक्षा",
          "detail": "प्रकाशन से पूर्व योगदानकर्ता अंतिम संपादकीय पाठ की समीक्षा करते हैं और प्रत्येक शब्द, तिथि तथा विवरण पर उनका पूर्ण वीटो अधिकार रहता है।"
        },
        {
          "step": 6,
          "title": "अंतिम संपादकीय नीति अनुमोदन",
          "detail": "अंतिम समीक्षा यह सुनिश्चित करती है कि विवरण में कोई सनसनीखेज भाषा न हो, हिंसा का वीभत्स चित्रण न हो, और संवेदनशील व्यक्तिगत मेटाडेटा पूरी तरह बाहर रखा गया हो।"
        },
        {
          "step": 7,
          "title": "निरंतर सुधार एवं वापसी का बिना शर्त अधिकार",
          "detail": "योगदानकर्ताओं के पास किसी भी समय जानकारी अद्यतन करने, पहचान प्राथमिकता बदलने या पहल से अपना विवरण स्थायी रूप से हटाने का पूर्ण अधिकार सुरक्षित रहता है।"
        }
      ],
      "privacyPledge": [
        "कोई भी व्यक्तिगत फोन नंबर, आवासीय पता या वास्तविक समय की लोकेशन कभी रिकॉर्ड या प्रदर्शित नहीं की जाती।",
        "स्वतंत्र सहमति के बिना परिवार के सदस्यों या नाबालिगों की कोई भी पहचान उजागर नहीं की जाती।",
        "जीवन के अनुभवों का कभी भी मुद्रीकरण, सनसनीखेज प्रस्तुति या व्यावसायिक प्रचार के लिए उपयोग नहीं किया जाता।"
      ]
    },
    "changemakers": [
      {
        "id": "dr-denis-mukwege",
        "slug": "dr-denis-mukwege",
        "name": "डॉ. डेनिस मुकवेगे",
        "roleAndField": "स्त्री रोग शल्य चिकित्सक एवं मानवीय चिकित्सक",
        "organization": "पंजी अस्पताल एवं फाउंडेशन",
        "country": "कांगो लोकतांत्रिक गणराज्य",
        "countryFlag": "🇨🇩",
        "eraOrYear": "1999–वर्तमान",
        "focusArea": "पुनर्निर्माण ट्रॉमा सर्जरी एवं संघर्ष हिंसा के उत्तरजीवियों का समग्र उपचार",
        "documentedActions": "1999 में बुकावु में पंजी अस्पताल की स्थापना की, जहां उन्होंने संघर्ष-संबंधी यौन हिंसा के शिकार हजारों उत्तरजीवियों के लिए शल्य चिकित्सा, आघात मनोविज्ञान, सामाजिक-आर्थिक पुनर्वास और कानूनी सहायता का चार-स्तंभीय समग्र उपचार मॉडल विकसित किया।",
        "measurableImpact": "युद्ध में यौन हिंसा के प्रयोग को रोकने के प्रयासों के लिए नादिया मुराद के साथ 2018 के नोबेल शांति पुरस्कार से सम्मानित; 2019 में ग्लोबल सर्वाइवर्स फंड की सह-स्थापना की जो संघर्ष क्षेत्रों में उत्तरजीवियों को प्रत्यक्ष अंतरिम मुआवजा प्रदान करता है।",
        "relevanceToHumanity": "यह प्रमाणित करता है कि उच्चस्तरीय चिकित्सीय दक्षता और नैतिक साहस मिलकर सशस्त्र संघर्ष की विभीषिका के बीच भी मानवीय गरिमा और शारीरिक अखंडता को पुनः स्थापित कर सकते हैं।",
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/mukwege/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "The Panzi Model of Holistic Healing & Reconstructive Surgery",
            "url": "https://panzifoundation.org",
            "publisher": "Panzi Foundation"
          }
        ]
      },
      {
        "id": "dr-sunitha-krishnan",
        "slug": "dr-sunitha-krishnan",
        "name": "डॉ. सुनीता कृष्णन",
        "roleAndField": "सामाजिक सुधारक एवं मानव तस्करी विरोधी अग्रदूत",
        "organization": "प्रज्वला",
        "country": "भारत",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1996–वर्तमान",
        "focusArea": "मानव तस्करी के उत्तरजीवियों का बचाव, पुनर्वास एवं सामाजिक पुनर्एकीकरण",
        "documentedActions": "1996 में हैदराबाद में प्रज्वला की सह-स्थापना की, जिसने व्यावसायिक यौन शोषण से बचाई गई बालिकाओं और महिलाओं के लिए रोकथाम, बचाव, मनोवैज्ञानिक उपचार, बाल संरक्षण और आजीविका प्रशिक्षण का एकीकृत मॉडल तैयार किया।",
        "measurableImpact": "यौन तस्करी से 24,000 से अधिक उत्तरजीवियों को बचाया और पुनर्वासित किया; भारत में ऐतिहासिक तस्करी-रोधी कानूनी ढांचे को आकार देने में निर्णायक भूमिका निभाई; 2016 में भारत सरकार द्वारा पद्म श्री से सम्मानित।",
        "relevanceToHumanity": "यह सिद्ध करता है कि केवल बचाव पर्याप्त नहीं है; स्थायी मुक्ति के लिए दीर्घकालिक मनोवैज्ञानिक उपचार, आर्थिक स्वावलंबन और संस्थागत शोषण के खिलाफ निरंतर कानूनी पैरवी आवश्यक है।",
        "references": [
          {
            "title": "Prajwala Institutional Impact & Survivor Rehabilitation Data",
            "url": "https://prajwalaindia.com",
            "publisher": "Prajwala"
          },
          {
            "title": "Government of India Padma Awards Gazette (2016)",
            "url": "https://padmaawards.gov.in",
            "publisher": "Government of India"
          }
        ]
      },
      {
        "id": "dr-abhay-rani-bang",
        "slug": "dr-abhay-rani-bang",
        "name": "डॉ. अभय एवं डॉ. रानी बंग",
        "roleAndField": "सार्वजनिक स्वास्थ्य चिकित्सक एवं नैदानिक शोधकर्ता",
        "organization": "सर्च (सोसाइटी फॉर एजुकेशन, एक्शन एंड रिसर्च इन कम्युनिटी हेल्थ)",
        "country": "भारत",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1986–वर्तमान",
        "focusArea": "गृह-आधारित नवजात एवं बाल देखभाल (HBNC) तथा ग्रामीण स्वास्थ्य समानता",
        "documentedActions": "महाराष्ट्र के दूरस्थ आदिवासी जिले गढ़चिरौली में गृह-आधारित नवजात देखभाल (HBNC) मॉडल विकसित किया, जिसमें ग्रामीण महिलाओं (आरोग्यदूत) को घरों में नवजात सेप्सिस, हाइपोथर्मिया और कम वजन का निदान व प्रबंधन करने का वैज्ञानिक प्रशिक्षण दिया गया।",
        "measurableImpact": "द लांसेट (1999) में प्रकाशित उनके ऐतिहासिक शोध ने शिशु मृत्यु दर में 62% की कमी दर्ज की; इस मॉडल को भारत सरकार के राष्ट्रीय आशा (ASHA) कार्यक्रम के मुख्य दिशा-निर्देश के रूप में अपनाया गया और डब्ल्यूएचओ/यूनिसेफ द्वारा अनुशंसित किया गया; 2018 में पद्म श्री से सम्मानित।",
        "relevanceToHumanity": "जीवनरक्षक चिकित्सीय ज्ञान को सीधे ग्रामीण महिलाओं और सामुदायिक स्वास्थ्य कार्यकर्ताओं के हाथों में सौंपकर विकेंद्रीकृत, साक्ष्य-आधारित सार्वजनिक स्वास्थ्य में क्रांति ला दी।",
        "references": [
          {
            "title": "The Lancet: Effect of Home-Based Neonatal Care on Neonatal Mortality",
            "url": "https://www.thelancet.com",
            "publisher": "The Lancet (1999)"
          },
          {
            "title": "SEARCH Gadchiroli Field Research and HBNC Architecture",
            "url": "https://searchgadchiroli.org.in",
            "publisher": "SEARCH"
          }
        ]
      }
    ],
    "societalLessons": [
      {
        "theme": "स्वास्थ्य सेवा सुरक्षा",
        "whatWeCanImprove": "बायोमेट्रिक एक्सेस कंट्रोल और सुरक्षा प्रोटोकॉल के साथ अस्पतालों, ड्यूटी रूम और आपातकालीन वार्डों को सुरक्षित बनाना।",
        "actionableInitiatives": [
          "ऑन-कॉल रेजिडेंट डॉक्टरों और नर्सिंग स्टाफ के लिए अनिवार्य सुरक्षित, बंद और रोशनीयुक्त ड्यूटी रूम",
          "आपातकालीन और ट्राइएज वार्डों में पैनिक अलार्म और 24 घंटे प्रशिक्षित सुरक्षाकर्मी",
          "हिरासत में लाए गए आक्रामक या नशे में धुत मरीजों के लिए अनिवार्य पुलिस जांच और सुरक्षा नियंत्रण"
        ],
        "profilesRef": [
          "डॉ. मौमिता देबनाथ",
          "अरुणा शानबाग",
          "डॉ. सरिता तोषनीवाल",
          "डॉ. वंदना दास",
          "डॉ. तमारा ओ'नील"
        ]
      },
      {
        "theme": "महिला सुरक्षा",
        "whatWeCanImprove": "सार्वजनिक और निजी स्थानों पर बेहतर रिपोर्टिंग प्रणाली, पारगमन ढांचा, रोकथाम और सख्त संस्थागत जवाबदेही।",
        "actionableInitiatives": [
          "जीपीएस-युक्त, रोशनी से भरपूर सार्वजनिक परिवहन गलियारे और सत्यापित चालक पहचान",
          "जबरन नियंत्रण और घरेलू उत्पीड़न के प्रारंभिक संकेतों पर प्रारंभिक नागरिक शिक्षा",
          "सार्वजनिक सड़कों, पार्कों और रात्रि बस अड्डों का स्वतंत्र नागरिक सुरक्षा ऑडिट"
        ],
        "profilesRef": [
          "ज्योति सिंह",
          "सारा एवरार्ड",
          "रीवा स्टीनकैंप",
          "अनेने बोयसेन",
          "महसा अमिनी"
        ]
      },
      {
        "theme": "बाल संरक्षण",
        "whatWeCanImprove": "जातीय या आर्थिक पृष्ठभूमि से परे सभी बच्चों के लिए सुलभ सुरक्षा, प्रारंभिक रिपोर्टिंग और समय पर गैर-भेदभावपूर्ण हस्तक्षेप।",
        "actionableInitiatives": [
          "बाल रोग और प्राथमिक स्वास्थ्य क्लीनिकों में आघात-संवेदनशील सार्वभौमिक स्क्रीनिंग",
          "हाशिए पर मौजूद क्षेत्रों में सुरक्षित सामुदायिक खेल स्थल और बाल कल्याण सहायता",
          "बाल गवाहों के पूर्ण संरक्षण के साथ त्वरित अदालती सुनवाई"
        ],
        "profilesRef": [
          "कठुआ की बालिका",
          "अनेने बोयसेन",
          "ऐनी फ्रैंक"
        ]
      },
      {
        "theme": "शिक्षा एवं साक्षरता",
        "whatWeCanImprove": "प्रत्येक बच्चे, विशेषकर बालिकाओं के लिए 12 वर्षों की गुणवत्तापूर्ण शिक्षा और स्वास्थ्य साक्षरता की निर्बाध पहुंच।",
        "actionableInitiatives": [
          "माध्यमिक विद्यालय उपस्थिति में आर्थिक और ढांचागत बाधाओं को पूरी तरह समाप्त करना",
          "विद्यालय-आधारित प्रजनन, मासिक धर्म और मानसिक स्वास्थ्य पाठ्यक्रम की शुरुआत",
          "रूढ़िवादी क्षेत्रों में महिला शिक्षकों और छात्राओं के लिए सामुदायिक सुरक्षा"
        ],
        "profilesRef": [
          "मलाला यूसुफ़ज़ई",
          "ऐनी फ्रैंक",
          "सोफी शोल"
        ]
      },
      {
        "theme": "पत्रकारिता एवं सत्य",
        "whatWeCanImprove": "स्वतंत्र रिपोर्टिंग, एसएलएपीपी (SLAPP) मुकदमों से विधिक सुरक्षा और सार्वजनिक सूचना तक नागरिकों की निर्बाध पहुंच।",
        "actionableInitiatives": [
          "उत्पीड़नकारी मुकदमों के माध्यम से पत्रकारों की आवाज दबाने पर रोक लगाने हेतु एंटी-स्लैप कानून",
          "जोखिम में पड़े खोजी पत्रकारों के लिए आपातकालीन डिजिटल सुरक्षा और सुरक्षित निकासी कोष",
          "सभी सुरक्षा बलों द्वारा 'प्रेस' (PRESS) पहचान चिह्नों का सार्वभौमिक सम्मान"
        ],
        "profilesRef": [
          "डाफने कारुआना गालिज़िया",
          "अन्ना पोलितकोवस्काया",
          "वेरोनिका गुएरिन",
          "शिरीन अबू अकलेह",
          "गौरी लंकेश"
        ]
      },
      {
        "theme": "पर्यावरणीय न्याय",
        "whatWeCanImprove": "विकास, भूमि उपयोग और जलसंभर से जुड़े निर्णयों में स्थानीय व मूलनिवासी समुदायों की सार्थक सहमति सुनिश्चित करना।",
        "actionableInitiatives": [
          "औद्योगिक और खनन स्वीकृतियों से पूर्व स्वतंत्र, पूर्व और सूचित सहमति (FPIC) का अनिवार्य क्रियान्वयन",
          "शांतिपूर्ण पर्यावरण रक्षकों के विरुद्ध आपराधिक कानूनों के दुरुपयोग पर तत्काल रोक",
          "भारी धातुओं के प्रदूषण और जलस्रोतों के क्षरण की समुदाय-आधारित पर्यावरणीय निगरानी"
        ],
        "profilesRef": [
          "बर्टा कासेरेस",
          "मारिएल फ्रेंको",
          "आयसिन बुयुक्नोहुत्चु",
          "एफीजेनिया वास्केज़ अस्तुदिल्लो",
          "एमिल्सेन मन्योमा",
          "लियोनिला तपदासन पेसाडिला",
          "लौरा लियोनोर वास्केज़ पिनेडा",
          "जेन जूलिया डी ओलिवेरा"
        ]
      },
      {
        "theme": "मानवाधिकार एवं गरिमा",
        "whatWeCanImprove": "धर्म, लिंग, नस्ल या पृष्ठभूमि के आधार पर बिना भेदभाव के कानून के समक्ष समान गरिमा और शारीरिक स्वायत्तता।",
        "actionableInitiatives": [
          "नागरिक अधिकारों और सार्वजनिक आवाजाही को दमनकारी नैतिक पहरेदारी से मुक्त करना",
          "हाशिए पर मौजूद सामाजिक और आर्थिक समूहों के लिए राजनीतिक प्रतिनिधित्व की समान पहुंच",
          "सार्वजनिक सेवाओं में धार्मिक और जातिगत भेदभाव के खिलाफ संस्थागत सुरक्षा उपाय"
        ],
        "profilesRef": [
          "महसा अमिनी",
          "सोफी शोल",
          "मारिएल फ्रेंको",
          "कंदील बलोच"
        ]
      },
      {
        "theme": "मानसिक एवं सामाजिक पुनर्वास",
        "whatWeCanImprove": "उत्तरजीवियों और पीड़ित परिवारों के लिए दीर्घकालिक चिकित्सा, मनोसामाजिक और आर्थिक संबल सुनिश्चित करना।",
        "actionableInitiatives": [
          "चिकित्सा और कानूनी सहायता से युक्त समुदाय-आधारित आश्रय स्थल",
          "संघर्ष-संबंधी यौन हिंसा और तस्करी के उत्तरजीवियों के लिए विशिष्ट आघात थेरेपी",
          "पुनर्निर्माण और क्षतिपूर्ति निधियों का उत्तरजीवियों द्वारा प्रत्यक्ष प्रबंधन"
        ],
        "profilesRef": [
          "यनार मोहम्मद",
          "नादिया मुराद",
          "मलाला यूसुफ़ज़ई"
        ]
      },
      {
        "theme": "संस्थागत न्याय",
        "whatWeCanImprove": "कॉरपोरेट या राजनीतिक हस्तक्षेप के बिना पारदर्शी, स्वतंत्र जांच और त्वरित कानूनी प्रक्रियाएं।",
        "actionableInitiatives": [
          "सरकारी अस्पतालों में कार्यस्थल सुरक्षा विफलताओं की समीक्षा हेतु न्यायिक टास्क फोर्स",
          "आपराधिक गतिविधियों से अर्जित अवैध और बेहिसाब संपत्ति की जब्ती",
          "अधिकारियों या पुलिसकर्मियों द्वारा हिंसा में संलिप्तता पर शून्य-सहनशीलता"
        ],
        "profilesRef": [
          "डॉ. मौमिता देबनाथ",
          "अरुणा शानबाग",
          "वेरोनिका गुएरिन",
          "सारा एवरार्ड"
        ]
      },
      {
        "theme": "सामुदायिक उत्तरदायित्व",
        "whatWeCanImprove": "संकट में फंसे व्यक्ति की सहायता के लिए नागरिकों को सुरक्षित हस्तक्षेप करने हेतु प्रेरित करना और चुप्पी तोड़ना।",
        "actionableInitiatives": [
          "स्कूलों, विश्वविद्यालयों और कार्यस्थलों में सक्रिय मूकदर्शक हस्तक्षेप प्रशिक्षण",
          "घरेलू हिंसा के जोखिम से जूझ रहे लोगों के लिए मोहल्ला-स्तरीय परस्पर सहायता नेटवर्क",
          "सार्वजनिक उत्पीड़न को सामान्य मानने की मानसिकता के खिलाफ सामुदायिक जागरूकता अभियान"
        ],
        "profilesRef": [
          "अनेने बोयसेन",
          "ज्योति सिंह",
          "सारा एवरार्ड"
        ]
      }
    ],
    "editorialPromise": [
      "हिंसा या आघात का कोई भी वीभत्स, सनसनीखेज या अवांछित चित्रण नहीं किया जाएगा।",
      "मानवीय त्रासदी के व्यावसायिक दोहन के उद्देश्य से बनाए गए सनसनीखेज शीर्षकों से पूर्ण परहेज़।",
      "कोई असत्यापित आरोप नहीं — सभी ऐतिहासिक, न्यायिक और वैज्ञानिक दावों का प्राथमिक अभिलेखों से मिलान।",
      "प्रमाणित जीवनी तथ्यों, अदालती निष्कर्षों और अल्टीमेटहेल्थ की प्रस्तावित पहलों के बीच स्पष्ट अंतर।",
      "जीवित उत्तरजीवियों (मलाला यूसुफ़ज़ई, नादिया मुराद) को स्मृति प्रोफाइल के बजाय सक्रिय नेतृत्वकर्ताओं के रूप में सम्मान।",
      "अदालती आदेशों (धारा 73 बीएनएस / 228ए आईपीसी एवं निपुण सक्सेना बनाम भारत संघ) के अनुरूप संवेदनशील व्यक्तिगत जानकारी का कड़ा संरक्षण।",
      "संपादकीय सत्यापन स्थिति, ऑडिट तिथियों और प्राथमिक स्रोतों के सीधे लिंक की पारदर्शी प्रस्तुति।",
      "अपुष्ट दावों को स्थापित सत्य के रूप में प्रस्तुत करने के बजाय अनसुलझे मामलों की पारदर्शी स्वीकृति।",
      "किसी भी समुदाय या जनसांख्यिकीय समूह का कोई राजनीतिक या सांप्रदायिक ध्रुवीकरण नहीं।",
      "मानवीय गरिमा, सत्य और सभी के लिए संस्थागत सुरक्षा के प्रति बिना शर्त प्रतिबद्धता।"
    ],
    "endingManifesto": {
      "headline": "दुनिया को केवल और स्मारकों की आवश्यकता नहीं है।\nउसे अधिक मानवीयता की आवश्यकता है।",
      "paragraphs": [
        "कुछ लोग डॉक्टर बनना चाहते थे। कुछ बच्चों को पढ़ाना चाहते थे। कुछ जंगलों की रक्षा करना चाहते थे, सच को सामने लाना चाहते थे, या उन लोगों को आवाज़ देना चाहते थे जिनकी आवाज़ दबा दी गई थी।",
        "उनका जीवन हमें याद दिलाता है कि हर नाम के पीछे सपनों, रिश्तों, जिम्मेदारियों और संभावनाओं से भरा एक इंसान होता है।",
        "हम उनके अतीत को फिर से नहीं लिख सकते। लेकिन हम अपने चारों ओर की प्रणालियों में सुधार करके, असहाय लोगों की रक्षा करके, शिक्षा को बढ़ावा देकर, गरिमा का सम्मान करके और पीड़ा के प्रति मूकदर्शक बने रहने से इनकार करके उनकी कहानियों को सार्थक बना सकते हैं।"
      ],
      "finalCallout": "आइए, हम उन्हें केवल इस बात के लिए याद न रखें कि वे इस दुनिया से कैसे गए। आइए, हम उन्हें इस बात के लिए याद रखें कि वे इस दुनिया को क्या देना चाहते थे।"
    }
  },
  "bn": {
    "survivorVoices": [
      {
        "id": "malala-yousafzai",
        "slug": "malala-yousafzai",
        "name": "মালালা ইউসুফজাই",
        "displayRole": "নোবেল শান্তি পুরস্কার বিজয়ী · শিক্ষা অধিকার কর্মী ও সহ-প্রতিষ্ঠাতা · মালালা ফান্ড",
        "country": "পাকিস্তান",
        "countryFlag": "🇵🇰",
        "eraOrYear": "১৯৯৭–বর্তমান · ২০১২ হামলার সারভাইভার",
        "summary": "চরমপন্থী সহিংসতার সারভাইভার, যিনি নিজের ব্যক্তিগত অভিজ্ঞতাকে কন্যাশিশুদের জন্য বিনামূল্যে, নিরাপদ ও মানসম্মত শিক্ষা এবং আজীবন স্বাস্থ্য সুরক্ষার বিশ্বব্যাপী আন্দোলনে রূপ দিয়েছেন।",
        "livedExperienceAndAdvocacy": "২০১২ সালের ৯ অক্টোবর পাকিস্তানের সোয়াত উপত্যকায় বিবিসি উর্দুতে দিনলিপি লেখার অপরাধে তালেবান বন্দুকধারীরা তাঁর স্কুলবাসে প্রাণঘাতী হামলা চালায়। যুক্তরাজ্যে জরুরি নিউরোসার্জারি ও নিবিড় চিকিৎসার পর তিনি সুস্থ হয়ে ওঠেন। ২০১৩ সালে তিনি 'মালালা ফান্ড' প্রতিষ্ঠা করেন, যা বিশ্বজুড়ে ১২ বছরের বিনামূল্যে ও নিরাপদ শিক্ষা নিশ্চিতে এবং দক্ষিণ এশিয়া, লাতিন আমেরিকা ও আফ্রিকায় শিক্ষাগত অবকাঠামো গড়ে তুলতে তহবিল সরবরাহ করে।",
        "societalReformMessage": "কন্যাশিশুদের জন্য মাধ্যমিক শিক্ষার সর্বজনীন সুযোগ হলো জনস্বাস্থ্য সুরক্ষা, মাতৃকল্যাণ, অর্থনৈতিক আত্মনির্ভরশীলতা এবং দারিদ্র্য দূরীকরণের সবচেয়ে শক্তিশালী হাতিয়ার।",
        "verifiedQuote": {
          "quote": "একটি শিশু, একজন শিক্ষক, একটি বই এবং একটি কলম পুরো বিশ্বকে বদলে দিতে পারে।",
          "source": "জাতিসংঘ যুব সমাবেশে ভাষণ (১২ জুলাই ২০১৩)"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2014 Citation: Malala Yousafzai",
            "url": "https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Malala Fund: Girls' Education and Research Reports",
            "url": "https://malala.org",
            "publisher": "Malala Fund"
          }
        ]
      },
      {
        "id": "nadia-murad",
        "slug": "nadia-murad",
        "name": "নাদিয়া মুরাদ",
        "displayRole": "নোবেল শান্তি পুরস্কার বিজয়ী · জাতিসংঘ শুভেচ্ছা দূত · প্রতিষ্ঠাতা · নাদিয়াজ ইনিশিয়েটিভ",
        "country": "ইরাক",
        "countryFlag": "🇮🇶",
        "eraOrYear": "১৯৯৩–বর্তমান · ২০১৪ ইয়াজিদি গণহত্যার সারভাইভার",
        "summary": "ইয়াজিদি মানবাধিকার কর্মী, যিনি যুদ্ধকালীন বন্দিত্ব থেকে পালিয়ে এসে যুদ্ধাপরাধ হিসেবে যৌন সহিংসতার আন্তর্জাতিক বিচারের আইনি লড়াইয়ে নেতৃত্ব দিয়েছেন এবং গ্রামীণ স্বাস্থ্যসেবার পুনর্গঠন করেছেন।",
        "livedExperienceAndAdvocacy": "২০১৪ সালের আগস্টে আইএসআইএস সিনজার ও তাঁর কোচো গ্রামে গণহত্যা চালিয়ে তাঁর মা ও ছয় ভাইকে হত্যা করে এবং হাজার হাজার নারীকে বন্দি করে। ২০১৪ সালের নভেম্বরে এক স্থানীয় সুন্নি মুসলিম পরিবারের সাহসিকতায় পালিয়ে এসে তিনি জাতিসংঘে সাক্ষ্য দেন, 'দ্য লাস্ট গার্ল' গ্রন্থ রচনা করেন এবং 'নাদিয়াজ ইনিশিয়েটিভ' প্রতিষ্ঠা করেন। তিনি সিনজারে স্কুল ও বিশুদ্ধ পানির ব্যবস্থা করেন এবং ২০২৬ সালের ১৯ ফেব্রুয়ারি সিনজার ফ্রেঞ্চ মেডিকেল সেন্টারের সফল সূচনা ঘটান।",
        "societalReformMessage": "সংঘাতকালীন যৌন সহিংসতার শিকার ব্যক্তিদের সরাসরি আর্থিক ক্ষতিপূরণ, ট্রমা-সচেতন মানসিক স্বাস্থ্যসেবা এবং সমাজ পুনর্গঠনে সরাসরি নেতৃত্ব প্রদানের সুযোগ দিতে হবে।",
        "verifiedQuote": {
          "quote": "আমি বিশ্বের এমন শেষ নারী হতে চাই যাঁর আমার মতো কোনো বীভৎস গল্প থাকবে।",
          "source": "নোবেল বক্তৃতা এবং আন্তর্জাতিক মানবাধিকার সম্মেলন"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/murad/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Nadia's Initiative: Sinjar French Medical Center Opening (2026)",
            "url": "https://www.nadiasinitiative.org/healthcare",
            "publisher": "Nadia's Initiative"
          }
        ]
      }
    ],
    "consentFramework": {
      "title": "সারভাইভার সম্মতি ও গোপনীয়তা সুরক্ষার সাত-ধাপের আচরণবিধি",
      "description": "আল্টিমেটহেলথ একটি মানবিক ও ট্রমা-সচেতন প্রকাশনা নীতি অনুসরণ করে যা ব্যক্তি স্বাধীনতা, স্বায়ত্তশাসন এবং শর্তহীন গোপনীয়তাকে সর্বোচ্চ অগ্রাধিকার দেয়।",
      "steps": [
        {
          "step": 1,
          "title": "অভিজ্ঞতার বিবরণ জমা / নৈতিক মনোনয়ন",
          "detail": "অভিজ্ঞতার বিবরণ শুধুমাত্র সম্পূর্ণ গোপনীয়, এনক্রিপ্ট করা যোগাযোগ মাধ্যম বা অনুমোদিত প্রাতিষ্ঠানিক সুপারিশের মাধ্যমেই গ্রহণ করা হয়। আমরা কোনো উন্মুক্ত বা অনিরাপদ সাবমিশন বোর্ড পরিচালনা করি না।"
        },
        {
          "step": 2,
          "title": "প্রাথমিক সম্পাদকীয় ও নিরাপত্তা যাচাই",
          "detail": "আমাদের সম্পাদকীয় বোর্ড প্রতিটি বিবরণের মানবিক মর্যাদা, শিক্ষামূলক মূল্য ও ব্যক্তিগত নিরাপত্তা যাচাই করে যাতে প্রকাশের ফলে সংশ্লিষ্ট ব্যক্তির কোনো ক্ষতি না হয়।"
        },
        {
          "step": 3,
          "title": "অবহিত সম্মতি ও পরিচয় নির্ধারণ",
          "detail": "তথ্য প্রদানকারী ব্যক্তি নিজেই তাঁর প্রকাশ্য পরিচয় বেছে নেন: পূর্ণ নাম, যাচাইকৃত ছদ্মনাম, অথবা সম্পূর্ণ পরিচয়হীন নাগরিক কণ্ঠস্বর।"
        },
        {
          "step": 4,
          "title": "তথ্য-যাচাই ও আইনি নথিপত্র পর্যালোচনা",
          "detail": "তথ্য প্রদানকারীকে কোনো জেরার মুখোমুখি না করে দালিলিক নথিপত্র এবং নির্ভরযোগ্য পাবলিক রেকর্ড থেকে ঐতিহাসিক তথ্যাদি যাচাই করা হয়।"
        },
        {
          "step": 5,
          "title": "খসড়া আলেখ্য পর্যালোচনা",
          "detail": "প্রকাশের পূর্বে সংশ্লিষ্ট ব্যক্তি চূড়ান্ত খসড়াটি পর্যবেক্ষণ করেন এবং প্রতিটি শব্দ, তারিখ ও বর্ণনার ওপর তাঁর সম্পূর্ণ ভেটো অধিকার থাকে।"
        },
        {
          "step": 6,
          "title": "চূড়ান্ত নীতিগত অনুমোদন",
          "detail": "চূড়ান্ত অনুমোদনে নিশ্চিত করা হয় যে আলেখ্যে কোনো চটকদার ভাষা নেই, সহিংসতার গ্রাফিক বিবরণ সম্পূর্ণ বর্জন করা হয়েছে এবং ব্যক্তিগত সংবেদনশীল তথ্য বাদ দেওয়া হয়েছে।"
        },
        {
          "step": 7,
          "title": "নিয়মিত পরিমার্জন ও প্রত্যাহার করার পূর্ণ অধিকার",
          "detail": "তথ্য প্রদানকারীর যে কোনো সময় তথ্য সংশোধন, পরিচয় পরিবর্তন কিংবা এই উদ্যোগ থেকে তাঁর বিবরণ স্থায়ীভাবে প্রত্যাহার করার শর্তহীন অধিকার সংরক্ষিত থাকে।"
        }
      ],
      "privacyPledge": [
        "কোনো ব্যক্তিগত ফোন নম্বর, আবাসিক ঠিকানা বা রিয়েল-টাইম অবস্থান কখনোই সংরক্ষণ বা প্রদর্শন করা হয় না।",
        "স্পষ্ট সম্মতি ছাড়া পরিবারের সদস্য বা শিশুদের কোনো পরিচয় কখনোই প্রকাশ করা হয় না।",
        "ব্যক্তিগত জীবনের মর্মান্তিক অভিজ্ঞতাকে কোনো বাণিজ্যিক বিজ্ঞাপন বা প্রচারণায় ব্যবহার করা হয় না।"
      ]
    },
    "changemakers": [
      {
        "id": "dr-denis-mukwege",
        "slug": "dr-denis-mukwege",
        "name": "ডা. ডেনিস মুকওয়েগে",
        "roleAndField": "স্ত্রীরোগ বিশেষজ্ঞ সার্জন ও মানবিক চিকিৎসক",
        "organization": "পাঞ্জি হাসপাতাল ও ফাউন্ডেশন",
        "country": "গণতান্ত্রিক কঙ্গো প্রজাতন্ত্র",
        "countryFlag": "🇨🇩",
        "eraOrYear": "১৯৯৯–বর্তমান",
        "focusArea": "সংঘাতকালীন যৌন সহিংসতার শিকার ব্যক্তিদের পুনর্গঠনমূলক সার্জারি ও সামগ্রিক নিরাময়",
        "documentedActions": "১৯৯৯ সালে বুকাভুতে পাঞ্জি হাসপাতাল প্রতিষ্ঠা করেন, যেখানে তিনি যৌন সহিংসতার শিকার হাজার হাজার নারীর জন্য বিশেষায়িত পুনর্গঠনমূলক সার্জারি, মানসিক চিকিৎসা, সামাজিক-অর্থনৈতিক পুনর্বাসন ও আইনি সহায়তার চার-স্তম্ভের সমন্বিত চিকিৎসা মডেল উদ্ভাবন করেছেন।",
        "measurableImpact": "যুদ্ধে যৌন সহিংসতাকে অস্ত্র হিসেবে ব্যবহারের বিরুদ্ধে অবদানের জন্য নাদিয়া মুরাদের সাথে যৌথভাবে ২০১৮ সালে নোবেল শান্তি পুরস্কার লাভ করেন; ২০১৯ সালে 'গ্লোবাল সারভাইভার্স ফান্ড' প্রতিষ্ঠা করেন যা যুদ্ধবিধ্বস্ত অঞ্চলে সরাসরি ক্ষতিপূরণ প্রদান করে।",
        "relevanceToHumanity": "প্রমাণ করেছেন যে চিকিৎসাগত দক্ষতা এবং নৈতিক সাহস একত্রে যুদ্ধবিধ্বস্ত জনপদেও মানবিক মর্যাদা ও শারীরিক সুস্থতা ফিরিয়ে দিতে পারে।",
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/mukwege/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "The Panzi Model of Holistic Healing & Reconstructive Surgery",
            "url": "https://panzifoundation.org",
            "publisher": "Panzi Foundation"
          }
        ]
      },
      {
        "id": "dr-sunitha-krishnan",
        "slug": "dr-sunitha-krishnan",
        "name": "ডা. সুনীতা কৃষ্ণন",
        "roleAndField": "সমাজ সংস্কারক ও মানবপাচার বিরোধী আন্দোলনের অগ্রদূত",
        "organization": "প্রজ্বলা",
        "country": "ভারত",
        "countryFlag": "🇮🇳",
        "eraOrYear": "১৯৯৬–বর্তমান",
        "focusArea": "মানবপাচারের শিকার নারীদের উদ্ধার, মানসিক পুনর্বাসন ও সামাজিক অন্তর্ভুক্তি",
        "documentedActions": "১৯৯৬ সালে হায়দ্রাবাদে 'প্রজ্বলা' প্রতিষ্ঠা করেন, যা বাণিজ্যিক যৌন শোষণ থেকে উদ্ধারকৃত নারীদের প্রতিরোধ, উদ্ধার, মনস্তাত্ত্বিক নিরাময়, শিশু সুরক্ষা এবং অর্থনৈতিক স্বাবলম্বিতার একটি সমন্বিত কাঠামো তৈরি করেছে।",
        "measurableImpact": "২৪,০০০-এর বেশি নারীকে উদ্ধার ও পুনর্বাসন করেছেন; ভারতে মানবপাচার বিরোধী জাতীয় আইনি কাঠামো প্রণয়নে কেন্দ্রীয় ভূমিকা রেখেছেন; ২০১৬ সালে ভারত সরকার কর্তৃক 'পদ্মশ্রী' সম্মানে ভূষিত হন।",
        "relevanceToHumanity": "দেখিয়েছেন যে কেবল উদ্ধারই যথেষ্ট নয়; স্থায়ী মুক্তির জন্য দীর্ঘমেয়াদী মানসিক নিরাময়, অর্থনৈতিক স্বনির্ভরতা এবং আইনি লড়াই সমান জরুরি।",
        "references": [
          {
            "title": "Prajwala Institutional Impact & Survivor Rehabilitation Data",
            "url": "https://prajwalaindia.com",
            "publisher": "Prajwala"
          },
          {
            "title": "Government of India Padma Awards Gazette (2016)",
            "url": "https://padmaawards.gov.in",
            "publisher": "Government of India"
          }
        ]
      },
      {
        "id": "dr-abhay-rani-bang",
        "slug": "dr-abhay-rani-bang",
        "name": "ডা. অভয় ও ডা. রানী বাং",
        "roleAndField": "জনস্বাস্থ্য বিশেষজ্ঞ চিকিৎসক ও ক্লিনিক্যাল গবেষক",
        "organization": "সার্চ (SEARCH)",
        "country": "ভারত",
        "countryFlag": "🇮🇳",
        "eraOrYear": "১৯৮৬–বর্তমান",
        "focusArea": "গৃহ-ভিত্তিক নবজাতক ও শিশু পরিচর্যা (HBNC) এবং গ্রামীণ স্বাস্থ্য সমতা",
        "documentedActions": "মহারাষ্ট্রের প্রত্যন্ত আদিবাসী জেলা গড়চিরোলিতে গৃহ-ভিত্তিক নবজাতক পরিচর্যা মডেল প্রবর্তন করেন, যেখানে গ্রামীণ নারীদের (আরোগ্যদূত) মাধ্যমে নবজাতকের সেপসিস, হাইপোথার্মিয়া ও কম ওজনের চিকিৎসা ঘরে বসেই সফলভাবে নিশ্চিত করা হয়।",
        "measurableImpact": "দ্য ল্যানসেট (১৯৯৯) সাময়িকীতে প্রকাশিত তাঁদের গবেষণায় শিশুমৃত্যুর হার ৬২% হ্রাস পাওয়ার প্রমাণ পাওয়া যায়; এই মডেলটি ভারতের জাতীয় আশা (ASHA) কর্মসূচির মূল ভিত্তি হিসেবে গৃহীত হয় এবং ডব্লিউএইচও/ইউনিসেফ দ্বারা বিশ্বব্যাপী সুপারিশ করা হয়; ২০১৮ সালে পদ্মশ্রী লাভ করেন।",
        "relevanceToHumanity": "জীবনরক্ষাকারী চিকিৎসার জ্ঞান সরাসরি গ্রামীণ নারী ও মাঠপর্যায়ের স্বাস্থ্যকর্মীদের হাতে তুলে দিয়ে বিকেন্দ্রীভূত জনস্বাস্থ্যে এক ঐতিহাসিক বিপ্লব এনেছেন।",
        "references": [
          {
            "title": "The Lancet: Effect of Home-Based Neonatal Care on Neonatal Mortality",
            "url": "https://www.thelancet.com",
            "publisher": "The Lancet (1999)"
          },
          {
            "title": "SEARCH Gadchiroli Field Research and HBNC Architecture",
            "url": "https://searchgadchiroli.org.in",
            "publisher": "SEARCH"
          }
        ]
      }
    ],
    "societalLessons": [
      {
        "theme": "স্বাস্থ্যসেবা নিরাপত্তা",
        "whatWeCanImprove": "বায়োমেট্রিক নজরদারি ও আধুনিক নিরাপত্তা প্রটোকলের মাধ্যমে হাসপাতাল, অন-কল ডিউটি রুম ও জরুরি বিভাগগুলোর কঠোর সুরক্ষা নিশ্চিত করা।",
        "actionableInitiatives": [
          "অন-কল চিকিৎসক ও নার্সিং কর্মীদের জন্য বাধ্যতামূলক সুরক্ষিত, তালাবদ্ধ ও আলোকিত ডিউটি রুম",
          "জরুরি বিভাগ ও ট্রায়াজ জোনে সার্বক্ষণিক প্রশিক্ষিত নিরাপত্তা রক্ষী ও প্যানিক অ্যালার্ম স্থাপন",
          "পুলিশ হেফাজতে থাকা আগ্রাসী ও অনিয়ন্ত্রিত রোগীদের ক্ষেত্রে বাধ্যতামূলক নিরাপত্তা স্ক্রিনিং"
        ],
        "profilesRef": [
          "ডা. মৌমিতা দেবনাথ",
          "অরুনা শানবাগ",
          "ডা. সরিতা তোশনিওয়াল",
          "ডা. বন্দনা দাস",
          "ডা. তামারা ও'নিল"
        ]
      },
      {
        "theme": "নারী নিরাপত্তা",
        "whatWeCanImprove": "গণপরিবহন পরিকাঠামোর উন্নয়ন, পারিবারিক নিয়ন্ত্রণের বিরুদ্ধে জনসচেতনতা এবং সামাজিক পরিসরে কঠোর প্রাতিষ্ঠানিক দায়বদ্ধতা।",
        "actionableInitiatives": [
          "জিপিএস-নজরদারি এবং পর্যাপ্ত আলোযুক্ত গণপরিবহন ব্যবস্থা ও যাচাইকৃত চালক লাইসেন্স",
          "মানসিক জবরদস্তি ও পারিবারিক সহিংসতার প্রাথমিক লক্ষণ শনাক্তে নাগরিক শিক্ষা",
          "রাস্তাঘাট, পার্ক ও নাইট বাসস্ট্যান্ডগুলোর নিয়মিত স্বাধীন নাগরিক নিরাপত্তা অডিট"
        ],
        "profilesRef": [
          "জ্যোতি সিং",
          "সারা এভারার্ড",
          "রিভা স্টিনক্যাম্প",
          "অনেনে বোয়সেন",
          "মাহসা আমিনী"
        ]
      },
      {
        "theme": "শিশু সুরক্ষা",
        "whatWeCanImprove": "আর্থ-সামাজিক ও জাতিগত পরিচয় নির্বিশেষে প্রতিটি শিশুর সার্বজনীন সুরক্ষা, দ্রুত রিপোর্ট গ্রহণ ও বৈষম্যহীন আইনি পদক্ষেপ।",
        "actionableInitiatives": [
          "শিশু চিকিৎসা কেন্দ্র ও প্রাথমিক ক্লিনিকে ট্রমা-সচেতন নিয়মিত স্বাস্থ্য পরীক্ষা",
          "প্রান্তিক অঞ্চলে শিশুদের জন্য নিরাপদ খেলাধুলার উন্মুক্ত স্থান ও শিশুকল্যাণ সহায়তা",
          "শিশু সাক্ষীদের সর্বোচ্চ সুরক্ষার অধীনে ফাস্ট-ট্র্যাক আদালতে দ্রুত বিচার নিশ্চিতকরণ"
        ],
        "profilesRef": [
          "কাঠুয়ার শিশুটি",
          "অনেনে বোয়সেন",
          "আনা ফ্রাঙ্ক"
        ]
      },
      {
        "theme": "শিক্ষা ও স্বাস্থ্য সচেতনতা",
        "whatWeCanImprove": "প্রতিটি শিশুর জন্য ১২ বছরের মানসম্মত শিক্ষা, প্রজনন স্বাস্থ্য সচেতনতা ও অবাধ বিদ্যালয় পরিবেশ নিশ্চিত করা।",
        "actionableInitiatives": [
          "মাধ্যমিক বিদ্যালয়ে উপস্থিতির ক্ষেত্রে সকল অর্থনৈতিক ও কাঠামোগত বাধা দূর করা",
          "বিদ্যালয় পর্যায়ে প্রজনন স্বাস্থ্য, ঋতুস্রাব স্বাস্থ্যবিধি ও মানসিক স্বাস্থ্যের পাঠ্যক্রম অন্তর্ভুক্ত করা",
          "রক্ষণশীল এলাকায় নারী শিক্ষক ও শিক্ষার্থীদের অবাধ যাতায়াতে সামাজিক সুরক্ষা"
        ],
        "profilesRef": [
          "মালালা ইউসুফজাই",
          "আনা ফ্রাঙ্ক",
          "সোফি শোল"
        ]
      },
      {
        "theme": "সাংবাদিকতা ও সত্য",
        "whatWeCanImprove": "স্বাধীন সাংবাদিকতার সুরক্ষা, মামলাবাজির (SLAPP) বিরুদ্ধে আইনি নিরাপত্তা এবং নাগরিক তথ্যের অবাধ প্রবাহ বজায় রাখা।",
        "actionableInitiatives": [
          "অর্থশালী শক্তির মাধ্যমে সাংবাদিকদের মুখ বন্ধ করার উদ্দেশ্যে দায়ের করা মামলা রুখতে আইন প্রণয়ন",
          "ঝুঁকিতে থাকা অনুসন্ধানী সাংবাদিকদের জন্য জরুরি ডিজিটাল নিরাপত্তা ও পুনর্বাসন তহবিল",
          "আইনশৃঙ্খলা রক্ষাকারী বাহিনী কর্তৃক 'প্রেস' (PRESS) চিহ্নের প্রতি সর্বজনীন সম্মান প্রদর্শন"
        ],
        "profilesRef": [
          "দাফনে কারুয়ানা গালিজিয়া",
          "আন্না পলিতকোভস্কায়া",
          "ভেরোনিকা গুয়েরিন",
          "শিরিন আবু আকলেহ",
          "গৌরী লঙ্কেশ"
        ]
      },
      {
        "theme": "পরিবেশগত ন্যায়বিচার",
        "whatWeCanImprove": "উন্নয়ন পরিকল্পনা, ভূমির ব্যবহার ও নদী অববাহিকার সিদ্ধান্তে স্থানীয় আদিবাসী জনগোষ্ঠীর পূর্ণ সম্মতি গ্রহণ।",
        "actionableInitiatives": [
          "কোনো প্রকল্প অনুমোদনের পূর্বে স্বাধীন, পূর্বানুমতি ও অবহিত সম্মতি (FPIC) বাধ্যতামূলক করা",
          "শান্তিপূর্ণ পরিবেশ আন্দোলনকারীদের বিরুদ্ধে মিথ্যা ফৌজদারি মামলার অপব্যবহার বন্ধ করা",
          "ভারী ধাতুর দূষণ এবং পানিসম্পদের ক্ষতি পর্যবেক্ষণে স্থানীয় জনগণের নেতৃত্বে পরিবেশ নিরীক্ষা"
        ],
        "profilesRef": [
          "বের্তা কাসেরেস",
          "মারিয়েল ফ্রাঙ্কো",
          "আয়সিন বুয়ুকনোহুতচু",
          "এফিহেনিয়া ভাসকেস আস্তুদিলো",
          "এমিলসেন মানিয়োমা",
          "লেওনিলা তাপাদাসান পেসাদিয়া",
          "লরা লেওনোর ভাসকেস পিনেদা",
          "জানে জুলিয়া দে অলিভেইরা"
        ]
      },
      {
        "theme": "মানবাধিকার ও মর্যাদা",
        "whatWeCanImprove": "ধর্ম, বর্ণ ও লিঙ্গ নির্বিশেষে আইনের চোখে সবার সমান মর্যাদা এবং শারীরিক স্বায়ত্তশাসনের নিশ্চয়তা।",
        "actionableInitiatives": [
          "নাগরিক অধিকার ও স্বাধীন চলাফেরাকে স্বৈরাচারী নৈতিক নজরদারি থেকে মুক্ত করা",
          "প্রান্তিক জাতিগত ও অর্থনৈতিক জনগোষ্ঠীর জন্য রাজনৈতিক প্রতিনিধিত্বের সমান সুযোগ",
          "সরকারি সেবা প্রাপ্তিতে ধর্মীয় ও জাতিগত বৈষম্যের বিরুদ্ধে প্রাতিষ্ঠানিক রক্ষাকবচ"
        ],
        "profilesRef": [
          "মাহসা আমিনী",
          "সোফি শোল",
          "মারিয়েল ফ্রাঙ্কো",
          "কান্দিল বালুচ"
        ]
      },
      {
        "theme": "মানসিক ও সামাজিক পুনর্বাসন",
        "whatWeCanImprove": "সহিংসতার সারভাইভার এবং শোকাহত পরিবারের জন্য দীর্ঘমেয়াদী চিকিৎসা, মনস্তাত্ত্বিক ও অর্থনৈতিক পুনর্বাসন।",
        "actionableInitiatives": [
          "চিকিৎসা ও আইনি সহায়তা সম্বলিত সুরক্ষিত আশ্রয়কেন্দ্র গড়ে তোলা",
          "সংঘাতকালীন যৌন সহিংসতা ও পাচারের শিকার ব্যক্তিদের জন্য বিশেষায়িত মানসিক ট্রমা নিরাময়",
          "পুনর্গঠন ও ক্ষতিপূরণ তহবিল পরিচালনায় সরাসরি সারভাইভারদের নেতৃত্ব প্রতিষ্ঠা"
        ],
        "profilesRef": [
          "ইয়ানার মোহাম্মদ",
          "নাদিয়া মুরাদ",
          "মালালা ইউসুফজাই"
        ]
      },
      {
        "theme": "প্রাতিষ্ঠানিক বিচারব্যবস্থা",
        "whatWeCanImprove": "রাজনৈতিক বা ব্যবসায়িক প্রভাবমুক্ত স্বচ্ছ, স্বাধীন তদন্ত ও দ্রুত বিচার প্রক্রিয়া নিশ্চিতকরণ।",
        "actionableInitiatives": [
          "সরকারি হাসপাতালে কর্মক্ষেত্রের নিরাপত্তা ব্যর্থতা খতিয়ে দেখতে বিচার বিভাগীয় টাস্কফোর্স",
          "অপরাধমূলক কর্মকাণ্ড থেকে অর্জিত অবৈধ সম্পদ বাজেয়াপ্ত করা",
          "আইনশৃঙ্খলা রক্ষাকারী বাহিনীর কেউ সহিংসতায় জড়ালে কঠোরতম জবাবদিহিতা নিশ্চিত করা"
        ],
        "profilesRef": [
          "ডা. মৌমিতা দেবনাথ",
          "অরুনা শানবাগ",
          "ভেরোনিকা গুয়েরিন",
          "সারা এভারার্ড"
        ]
      },
      {
        "theme": "নাগরিক দায়বদ্ধতা",
        "whatWeCanImprove": "বিপদগ্রস্ত মানুষের সাহায্যে নাগরিকদের নিরাপদে এগিয়ে আসার মানসিকতা তৈরি করা এবং অন্যায়ে নীরবতা বর্জন।",
        "actionableInitiatives": [
          "শিক্ষা প্রতিষ্ঠান ও কর্মক্ষেত্রে সক্রিয় প্রত্যক্ষদর্শী হিসেবে সহায়তার প্রশিক্ষণ প্রদান",
          "পারিবারিক সহিংসতার ঝুঁকিতে থাকা নারীদের সুরক্ষায় পাড়া-মহল্লাভিত্তিক পারস্পরিক সহায়তা নেটওয়ার্ক",
          "প্রকাশ্যে নারীদের হেনস্তাকে স্বাভাবিক মনে করার সামাজিক মানসিকতার বিরুদ্ধে ব্যাপক সচেতনতা"
        ],
        "profilesRef": [
          "অনেনে বোয়সেন",
          "জ্যোতি সিং",
          "সারা এভারার্ড"
        ]
      }
    ],
    "editorialPromise": [
      "সহিংসতা বা আঘাতের কোনো চমকপ্রদ, বীভৎস কিংবা অপ্রয়োজনীয় বিবরণ প্রকাশ করা হবে না।",
      "মানবীয় ট্র্যাজেডিকে পুঁজি করে তৈরি করা কোনো ধরনের চটকদার শিরোনাম সম্পূর্ণ পরিহার করা হবে।",
      "কোনো অপ্রমাণিত অভিযোগ নেই — সকল ঐতিহাসিক, আইনি ও বৈজ্ঞানিক তথ্যাদি আদালতের মূল নথি দ্বারা যাচাইকৃত।",
      "প্রমাণিত জীবনবৃত্তান্ত, আদালতের রায় এবং আল্টিমেটহেলথের প্রস্তাবিত রূপরেখার মধ্যে সুস্পষ্ট পার্থক্য রক্ষা।",
      "জীবিত সারভাইভারদের (মালালা ইউসুফজাই, নাদিয়া মুরাদ) স্মৃতিস্তম্ভের মতো নয়, বরং সক্রিয় পরিবর্তনের অগ্রদূত হিসেবে মর্যাদা প্রদান।",
      "আদালতের নির্দেশনা (বিএনএস ধারা ৭৩ / আইপিসি ২২৮এ এবং নিপুণ সাক্সেনা রায়) মেনে সংবেদনশীল ব্যক্তিগত পরিচয়ের সর্বোচ্চ সুরক্ষা।",
      "সম্পাদকীয় তথ্য যাচাইয়ের তারিখ ও প্রাথমিক আইনি তথ্যের সরাসরি উৎস উন্মুক্ত রাখা।",
      "অপ্রমাণিত কোনো দাবিকে প্রতিষ্ঠিত সত্য হিসেবে না দেখিয়ে বিতর্কিত বিষয়ের স্বচ্ছ উপস্থাপন।",
      "কোনো সম্প্রদায় বা জনগোষ্ঠীর ওপর কোনো রাজনৈতিক বা সাম্প্রদায়িক কটাক্ষ না করা।",
      "সকল মানুষের মর্যাদা, সত্য ও কর্মক্ষেত্রের প্রাতিষ্ঠানিক সুরক্ষার প্রতি শর্তহীন নিবেদন।"
    ],
    "endingManifesto": {
      "headline": "পৃথিবীর কেবল স্মৃতিস্তম্ভের প্রয়োজন নেই।\nপ্রয়োজন আরো বেশি মানবিকতার।",
      "paragraphs": [
        "কেউ হয়তো ডাক্তার হতে চেয়েছিলেন। কেউ হয়তো শিশুদের শিক্ষিত করতে চেয়েছিলেন। কেউ বন রক্ষা করতে চেয়েছিলেন, সত্য তুলে ধরতে চেয়েছিলেন, কিংবা অবহেলিত মানুষের পাশে দাঁড়াতে চেয়েছিলেন।",
        "তাঁদের প্রতিটি জীবন আমাদের মনে করিয়ে দেয় যে প্রতিটি নামের পেছনে এক একটি স্বপ্ন, ভালোবাসা, দায়িত্ব এবং অফুরন্ত সম্ভাবনাময় মানুষ বাস করে।",
        "আমরা তাঁদের অতীত বদলে দিতে পারি না। কিন্তু চারপাশের ব্যবস্থাগুলোর সংস্কার করে, নিরীহ মানুষের পাশে দাঁড়িয়ে, শিক্ষা বিস্তার করে এবং অন্যায়ের সামনে স্তব্ধ না থেকে তাঁদের আত্মত্যাগকে অর্থবহ করে তুলতে পারি।"
      ],
      "finalCallout": "আসুন, আমরা তাঁদের কেবল পৃথিবী থেকে চলে যাওয়ার কষ্টের জন্য মনে না রাখি। আসুন, আমরা তাঁদের মনে রাখি পৃথিবীটাকে তাঁরা কী দিয়ে যেতে চেয়েছিলেন তার জন্য।"
    }
  },
  "ta": {
    "survivorVoices": [
      {
        "id": "malala-yousafzai",
        "slug": "malala-yousafzai",
        "name": "மலாலா யூசுப்சாய்",
        "displayRole": "நோபல் அமைதிப் பரிசு பெற்றவர் · கல்விப் போராளி மற்றும் இணை நிறுவனர் · மலாலா ஃபண்ட்",
        "country": "பாகிஸ்தான்",
        "countryFlag": "🇵🇰",
        "eraOrYear": "1997–தற்போது · 2012 தாக்குதலில் தப்பிப்பிழைத்தவர்",
        "summary": "தீவிரவாத வன்முறையிலிருந்து தப்பிப்பிழைத்து, பெண் குழந்தைகளுக்கான இலவச, பாதுகாப்பான, தரமான கல்வி மற்றும் வாழ்நாள் நலவாழ்வுக்கான உலகளாவிய இயக்கமாக மாற்றியவர்.",
        "livedExperienceAndAdvocacy": "அக்டோபர் 2012-ல் பாகிஸ்தானின் ஸ்வாட் பள்ளத்தாக்கில் பிபிசி உருது வலைப்பதிவு எழுதியதற்காகவும், பெண் கல்விக்காகப் பேசியதற்காகவும் சுடப்பட்டு உயிர் பிழைத்தார். 2013-ல் 'மலாலா ஃபண்ட்' அமைப்பை நிறுவி, அனைத்து குழந்தைகளுக்கும் 12 ஆண்டுகள் இலவசக் கல்வி கிடைப்பதை உறுதிசெய்ய உலகம் முழுவதும் செயல்பட்டு வருகிறார்.",
        "societalReformMessage": "பெண்களுக்கு இடைநிலைக் கல்வி வழங்குவது என்பது பொது சுகாதாரம், மகப்பேறு நலன், பொருளாதார சுயாட்சி மற்றும் வறுமை ஒழிப்புக்கான மிகச் சிறந்த மாற்றத்தை ஏற்படுத்தும் காரணியாகும்.",
        "verifiedQuote": {
          "quote": "ஒரு குழந்தை, ஒரு ஆசிரியர், ஒரு புத்தகம், மற்றும் ஒரு பேனா உலகையே மாற்ற முடியும்.",
          "source": "ஐக்கிய நாடுகள் இளைஞர் அவையில் ஆற்றிய உரை (12 ஜூலை 2013)"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2014 Citation: Malala Yousafzai",
            "url": "https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Malala Fund: Girls' Education and Research Reports",
            "url": "https://malala.org",
            "publisher": "Malala Fund"
          }
        ]
      },
      {
        "id": "nadia-murad",
        "slug": "nadia-murad",
        "name": "நதியா முராத்",
        "displayRole": "நோபல் அமைதிப் பரிசு பெற்றவர் · ஐ.நா. நல்லெண்ணத் தூதர் · நிறுவனர் · நதியாஸ் இனிசியேட்டிவ்",
        "country": "ஈராக்",
        "countryFlag": "🇮🇶",
        "eraOrYear": "1993–தற்போது · 2014 யசிதி இனப்படுகொலையில் தப்பிப்பிழைத்தவர்",
        "summary": "யசிதி மனித உரிமைப் போராளி, போர்க்கால அடிமைத்தனத்திலிருந்து தப்பி, போர்க்கால பாலியல் வன்முறைக்கு எதிரான சர்வதேச நீதிக்கான சட்டப் போராட்டத்திற்கு தலைமை தாங்கியவர்.",
        "livedExperienceAndAdvocacy": "ஆகஸ்ட் 2014-ல் ஐஎஸ்ஐஎஸ் தீவிரவாதிகள் சின்ஜார் பகுதியில் தாக்குதல் நடத்தி இவரது குடும்பத்தாரைக் கொன்று, பெண்களை அடிமைகளாக்கினர். நவம்பர் 2014-ல் தப்பி வந்த நதியா, ஐ.நா.வில் சாட்சியமளித்தார், 'தி லாஸ்ட் கேர்ள்' நூலை எழுதினார், நதியாஸ் இனிசியேட்டிவ் மூலம் பள்ளிகள், குடிநீர் திட்டங்களை அமைத்து 19 பிப்ரவரி 2026-ல் சின்ஜார் பிரெஞ்சு மருத்துவ மையத்தை பொதுமக்களுக்குத் திறந்தார்.",
        "societalReformMessage": "பாலியல் வன்முறையால் பாதிக்கப்பட்டோருக்கு இழப்பீடுகளும், மனநல மறுவாழ்வும், தங்கள் சமூகங்களை மீண்டும் கட்டியெழுப்புவதில் நேரடித் தலைமைப் பொறுப்புகளும் வழங்கப்பட வேண்டும்.",
        "verifiedQuote": {
          "quote": "என்னைப்போன்ற ஒரு துயரக் கதையைக் கொண்ட கடைசிப் பெண்ணாக நான் உலகத்தில் இருக்க விரும்புகிறேன்.",
          "source": "நோபல் உரை மற்றும் சர்வதேச மனித உரிமைப் பிரச்சாரங்கள்"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/murad/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Nadia's Initiative: Sinjar French Medical Center Opening (2026)",
            "url": "https://www.nadiasinitiative.org/healthcare",
            "publisher": "Nadia's Initiative"
          }
        ]
      }
    ],
    "consentFramework": {
      "title": "உயிர் பிழைத்தோர் ஒப்புதல் மற்றும் தனியுரிமைக்கான ஏழு-படி நெறிமுறை",
      "description": "அல்டிமேட்ஹெல்த் தனிநபர் கண்ணியம், சுயாட்சி மற்றும் நிபந்தனையற்ற தனியுரிமையை மதிக்கும் நெறிமுறை சார்ந்த வெளியீட்டுக் கொள்கையைப் பின்பற்றுகிறது.",
      "steps": [
        {
          "step": 1,
          "title": "அனுபவப் பகிர்வு / நெறிமுறை பரிந்துரை",
          "detail": "ரகசிய, மறைகுறியாக்கப்பட்ட தொடர்புகள் அல்லது அங்கீகரிக்கப்பட்ட நிறுவனங்களின் பரிந்துரைகள் மூலம் மட்டுமே கதைகள் ஏற்கப்படுகின்றன."
        },
        {
          "step": 2,
          "title": "ஆரம்பப் பதிப்பு மற்றும் பாதுகாப்பு ஆய்வு",
          "detail": "மனித கண்ணியம், கல்வி நோக்கம் மற்றும் தனிநபர் பாதுகாப்பை உறுதிசெய்யும் வகையில் ஆலோசனைக் குழு ஒவ்வொரு பதிவையும் ஆய்வு செய்கிறது."
        },
        {
          "step": 3,
          "title": "அறிவிக்கப்பட்ட ஒப்புதல் மற்றும் அடையாளத் தேர்வு",
          "detail": "பங்களிப்பாளர்கள் தங்களின் பொது அடையாளத்தை தாங்களே தேர்வு செய்கின்றனர்: முழுப் பெயர், சரிபார்க்கப்பட்ட புனைப்பெயர் அல்லது அநாமதேயக் குரல்."
        },
        {
          "step": 4,
          "title": "தகவல் சரிபார்ப்பு மற்றும் சட்ட ஆவண ஆய்வு",
          "detail": "பங்களிப்பாளர்களுக்கு மன உளைச்சல் தராமல் முதன்மை வரலாற்று மற்றும் சட்ட ஆவணங்கள் மூலம் விவரங்கள் சரிபார்க்கப்படுகின்றன."
        },
        {
          "step": 5,
          "title": "வரைவுப் பதிப்பை பங்களிப்பாளர் ஆய்வு செய்தல்",
          "detail": "வெளியீட்டிற்கு முன் இறுதி உரையை பங்களிப்பாளர் மதிப்பாய்வு செய்து ஒவ்வொரு வார்த்தை மீதும் முழுமையான வீட்டோ அதிகாரத்தைக் கொண்டுள்ளார்."
        },
        {
          "step": 6,
          "title": "இறுதி நெறிமுறை ஒப்புதல்",
          "detail": "எந்தவொரு பரபரப்பூட்டும் விளக்கங்களும் இல்லாமல் கண்ணியமான மொழியில் உரை இருப்பதை உறுதி செய்தல்."
        },
        {
          "step": 7,
          "title": "தகவல் மாற்றம் மற்றும் பதிவை விலக்கிக் கொள்ளும் உரிமை",
          "detail": "பங்களிப்பாளர்கள் எந்த நேரத்திலும் தகவலை மாற்றவோ அல்லது தங்கள் பதிவை நிரந்தரமாக நீக்கவோ முழு உரிமை கொண்டுள்ளனர்."
        }
      ],
      "privacyPledge": [
        "தனிப்பட்ட தொலைபேசி எண்கள், இருப்பிட முகவரிகள் ஒருபோதும் வெளியிடப்படாது.",
        "குடும்ப உறுப்பினர்கள் அல்லது குழந்தைகளின் விவரங்கள் வெளிப்படையான ஒப்புதலின்றி வெளியிடப்படாது.",
        "வாழ்வியல் அனுபவங்கள் எந்தவொரு வணிக விளம்பரத்திற்கும் பயன்படுத்தப்படாது."
      ]
    },
    "changemakers": [
      {
        "id": "dr-denis-mukwege",
        "slug": "dr-denis-mukwege",
        "name": "டாக்டர் டெனிஸ் முக்வேகே",
        "roleAndField": "மகப்பேறு அறுவை சிகிச்சை நிபுணர் மற்றும் மருத்துவர்",
        "organization": "பன்ஸி மருத்துவமனை & அறக்கட்டளை",
        "country": "காங்கோ ஜனநாயகக் குடியரசு",
        "countryFlag": "🇨🇩",
        "eraOrYear": "1999–தற்போது",
        "focusArea": "போர்க்கால பாலியல் வன்முறையால் பாதிக்கப்பட்டோருக்கான அறுவை சிகிச்சை மற்றும் முழுமையான நல்வாழ்வு",
        "documentedActions": "1999-ல் பன்ஸி மருத்துவமனையைத் தொடங்கி, பாதிக்கப்பட்ட பல்லாயிரக்கணக்கான பெண்களுக்கு மருத்துவ சிகிச்சை, உளவியல் ஆலோசனை, பொருளாதார மறுவாழ்வு மற்றும் சட்ட உதவிகளை வழங்கி வருகிறார்.",
        "measurableImpact": "போரில் பாலியல் வன்முறைக்கு எதிராகப் போராடியதற்காக 2018-ல் நோபல் அமைதிப் பரிசு பெற்றார்; 2019-ல் குளோபல் சர்வைவர்ஸ் ஃபண்ட் அமைப்பை நிறுவினார்.",
        "relevanceToHumanity": "மருத்துவத் திறமையும் துணிச்சலும் இணைந்து போரினால் சிதைந்த மனித மாண்பை மீண்டும் மீட்டெடுக்க முடியும் என்பதை நிரூபித்துள்ளார்.",
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/mukwege/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "The Panzi Model of Holistic Healing & Reconstructive Surgery",
            "url": "https://panzifoundation.org",
            "publisher": "Panzi Foundation"
          }
        ]
      },
      {
        "id": "dr-sunitha-krishnan",
        "slug": "dr-sunitha-krishnan",
        "name": "டாக்டர் சுனிதா கிருஷ்ணன்",
        "roleAndField": "சமூக சீர்திருத்தவாதி மற்றும் மனிதக் கடத்தல் எதிர்ப்புப் போராளி",
        "organization": "பிரஜ்வாலா",
        "country": "இந்தியா",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1996–தற்போது",
        "focusArea": "ஆட்கடத்தலில் பாதிக்கப்பட்டோரை மீட்டல், மறுவாழ்வு மற்றும் சமூக ஒருங்கிணைப்பு",
        "documentedActions": "1996-ல் ஹைதராபாத்தில் பிரஜ்வாலா அமைப்பை நிறுவி, பாலியல் சுரண்டலில் இருந்து மீட்கப்பட்ட பெண்களுக்குப் புகலிடம், தொழிற்கல்வி மற்றும் சட்டப் பாதுகாப்பை வழங்கி வருகிறார்.",
        "measurableImpact": "24,000-க்கும் மேற்பட்டோரை மீட்டு மறுவாழ்வு அளித்துள்ளார்; இந்திய அரசின் பத்மஸ்ரீ விருதை 2016-ல் பெற்றார்.",
        "relevanceToHumanity": "மீட்பு என்பது ஒரு தொடக்கமே; நீண்டகால உளவியல் ஆலோசனையும் பொருளாதார சுயாட்சியுமே நிலையான விடுதலையைத் தரும் என்பதை நிரூபித்துள்ளார்.",
        "references": [
          {
            "title": "Prajwala Institutional Impact & Survivor Rehabilitation Data",
            "url": "https://prajwalaindia.com",
            "publisher": "Prajwala"
          },
          {
            "title": "Government of India Padma Awards Gazette (2016)",
            "url": "https://padmaawards.gov.in",
            "publisher": "Government of India"
          }
        ]
      },
      {
        "id": "dr-abhay-rani-bang",
        "slug": "dr-abhay-rani-bang",
        "name": "டாக்டர் அபய் & டாக்டர் ராணி பாங்",
        "roleAndField": "பொது சுகாதார மருத்துவர்கள் மற்றும் மருத்துவ ஆராய்ச்சியாளர்கள்",
        "organization": "சர்ச் (SEARCH)",
        "country": "இந்தியா",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1986–தற்போது",
        "focusArea": "கிராமப்புற பச்சிளங்குழந்தை பராமரிப்பு (HBNC) மற்றும் சுகாதார சமத்துவம்",
        "documentedActions": "மகாராஷ்டிராவின் கட்சிரோலி பழங்குடியினப் பகுதியில் கிராமப் பெண்களைக் கொண்டு பச்சிளங்குழந்தைகளின் தொற்றுகளைக் கண்டறிந்து குணப்படுத்தும் புதிய மருத்துவ முறையை உருவாக்கினர்.",
        "measurableImpact": "லான்செட் இதழில் வெளியான ஆய்வின்படி பச்சிளங்குழந்தை இறப்பு 62% குறைந்தது; இது இந்தியாவின் தேசிய ஆஷா (ASHA) திட்டத்தின் அடிப்படையாக அமைந்தது; 2018-ல் பத்மஸ்ரீ பெற்றனர்.",
        "relevanceToHumanity": "உயிர் காக்கும் மருத்துவ அறிவை நேரடியாக கிராமத்துப் பெண்களின் கைகளில் வழங்கி பொது சுகாதாரத்தில் புரட்சியை ஏற்படுத்தினர்.",
        "references": [
          {
            "title": "The Lancet: Effect of Home-Based Neonatal Care on Neonatal Mortality",
            "url": "https://www.thelancet.com",
            "publisher": "The Lancet (1999)"
          },
          {
            "title": "SEARCH Gadchiroli Field Research and HBNC Architecture",
            "url": "https://searchgadchiroli.org.in",
            "publisher": "SEARCH"
          }
        ]
      }
    ],
    "societalLessons": [
      {
        "theme": "சுகாதாரப் பணியாளர் பாதுகாப்பு",
        "whatWeCanImprove": "மருத்துவமனைகள், மருத்துவர் ஓய்வறைகள் மற்றும் அவசர சிகிச்சைப் பிரிவுகளைப் பயோமெட்ரிக் அமைப்புகள் மூலம் பாதுகாத்தல்.",
        "actionableInitiatives": [
          "மருத்துவர்கள் மற்றும் செவிலியர்களுக்குப் பாதுகாப்பான பூட்டப்பட்ட ஓய்வறைகள்",
          "அவசர சிகிச்சைப் பிரிவுகளில் 24 மணி நேர பாதுகாப்பு காவலர்கள் மற்றும் அபாய எச்சரிக்கை மணிகள்",
          "காவல்துறையால் அழைத்து வரப்படும் வன்முறைக் கைதிகளுக்குக் கட்டாய மருத்துவப் பாதுகாப்பு நெறிமுறைகள்"
        ],
        "profilesRef": [
          "டாக்டர் மௌமிதா தேப்நாத்",
          "அருணா ஷான்பாக்",
          "டாக்டர் சரிதா தோஷ்னிவால்",
          "டாக்டர் வந்தனா தாஸ்",
          "டாக்டர் தமாரா ஓ'நீல்"
        ]
      },
      {
        "theme": "பெண்கள் பாதுகாப்பு",
        "whatWeCanImprove": "பொது இடங்களில் போக்குவரத்து வசதிகள், கண்காணிப்பு மற்றும் நிறுவன ரீதியான பொறுப்புக்கூறல்.",
        "actionableInitiatives": [
          "ஜிபிஎஸ் பொருத்தப்பட்ட வெளிச்சம் நிறைந்த பொதுப் போக்குவரத்து அமைப்புகள்",
          "குடும்பக் கட்டுப்பாடு மற்றும் வன்முறை எச்சரிக்கை அறிகுறிகள் குறித்த விழிப்புணர்வு",
          "இரவு நேர பேருந்து நிறுத்தங்களின் பாதுகாப்பு குறித்த சுதந்திரமான தணிக்கை"
        ],
        "profilesRef": [
          "ஜோதி சிங்",
          "சாரா எவரார்ட்",
          "ரீவா ஸ்டீன்கேம்ப்",
          "அனேனே போய்ஸன்",
          "மஹ்சா அமினி"
        ]
      },
      {
        "theme": "குழந்தைகள் பாதுகாப்பு",
        "whatWeCanImprove": "பின்னணி பாராமல் அனைத்து குழந்தைகளுக்கும் சமமான பாதுகாப்பு மற்றும் விரைவான நீதி.",
        "actionableInitiatives": [
          "குழந்தைகள் நல மருத்துவமனைகளில் மனநலப் பரிசோதனை",
          "பின்தங்கிய பகுதிகளில் பாதுகாப்பான விளையாட்டு மைதானங்கள் மற்றும் குழந்தை நல உதவி",
          "குழந்தை சாட்சிகளுக்குப் பாதுகாப்புடன் கூடிய விரைவு நீதிமன்ற விசாரணைகள்"
        ],
        "profilesRef": [
          "கதுவா சிறுமி",
          "அனேனே போய்ஸன்",
          "ஆன் பிராங்க்"
        ]
      },
      {
        "theme": "கல்வி மற்றும் விழிப்புணர்வு",
        "whatWeCanImprove": "பெண் குழந்தைகளுக்கு 12 ஆண்டுகள் தடையில்லா கல்வி மற்றும் சுகாதார விழிப்புணர்வு.",
        "actionableInitiatives": [
          "இடைநிலைக் கல்விக்கான பொருளாதாரத் தடைகளை நீக்குதல்",
          "பள்ளிகளில் மாதவிடாய் மற்றும் மனநலக் கல்வித் திட்டம்",
          "பிற்போக்கான பகுதிகளில் பெண் ஆசிரியர்களுக்கான பாதுகாப்பு"
        ],
        "profilesRef": [
          "மலாலா யூசுப்சாய்",
          "ஆன் பிராங்க்",
          "சோஃபி ஷோல்"
        ]
      },
      {
        "theme": "பத்திரிகை சுதந்திரம் மற்றும் உண்மை",
        "whatWeCanImprove": "சுதந்திரமான பத்திரிகை நிருபர்களுக்கு சட்டப் பாதுகாப்பு மற்றும் தகவல் அறியும் உரிமை.",
        "actionableInitiatives": [
          "அச்சுறுத்தல் வழக்குகளிலிருந்து பத்திரிகையாளர்களைப் பாதுகாக்கும் சட்டங்கள்",
          "ஆபத்தில் உள்ள புலனாய்வு நிருபர்களுக்கான அவசரப் பாதுகாப்பு நிதி",
          "பாதுகாப்புப் படைகளால் 'PRESS' அடையாளங்களை மதித்தல்"
        ],
        "profilesRef": [
          "டாப்னே கருவானா கலிசியா",
          "அன்னா பொலிட்கோவ்ஸ்காயா",
          "வெரோனிகா கெரின்",
          "ஷிரீன் அபு அக்லே",
          "கௌரி லங்கேஷ்"
        ]
      },
      {
        "theme": "சுற்றுச்சூழல் நீதி",
        "whatWeCanImprove": "வளர்ச்சித் திட்டங்களில் பழங்குடியின மற்றும் உள்ளூர் மக்களின் முழுமையான சம்மதம்.",
        "actionableInitiatives": [
          "சுரங்கத் திட்டங்களுக்கு முன் உள்ளூர் மக்களின் முன் அனுமதி பெறுதல்",
          "சுற்றுச்சூழல் ஆர்வலர்கள் மீதான பொய் வழக்குகளைத் தடுத்தல்",
          "தண்ணீர் மாசுபடுவதைக் கண்காணிக்க உள்ளூர் குழுக்களை அமைத்தல்"
        ],
        "profilesRef": [
          "பெர்டா காசரஸ்",
          "மரியெல்லே பிராங்கோ",
          "அய்சின் புயுக்நோஹுட்சு",
          "எஃபிஜேனியா வாஸ்குவெஸ் அஸ்துதிலா",
          "எமில்சென் மன்யோமா",
          "லியோனிலா தபதாசன் பெசாதிலா",
          "லாரா லியோனோர் வாஸ்குவெஸ் பினேடா",
          "ஜேன் ஜூலியா டி ஒலிவேரா"
        ]
      },
      {
        "theme": "மனித உரிமைகள் மற்றும் கண்ணியம்",
        "whatWeCanImprove": "மதம் மற்றும் பாலினப் பாகுபாடின்றி சட்டத்தின் முன் சமமான மாண்பு.",
        "actionableInitiatives": [
          "தார்மீகக் கண்காணிப்பு என்ற பெயரில் நடக்கும் அடக்குமுறைகளைத் தடுத்தல்",
          "பின்தங்கிய சமூகங்களுக்கு சமமான அரசியல் பிரதிநிதித்துவம்",
          "அரசு சேவைகளில் மதப் பாகுபாடுகளைத் தடுக்கும் பாதுகாப்பு முறைகள்"
        ],
        "profilesRef": [
          "மஹ்சா அமினி",
          "சோஃபி ஷோல்",
          "மரியெல்லே பிராங்கோ",
          "கண்டீல் பலோச்"
        ]
      },
      {
        "theme": "மனநல மற்றும் சமூக மறுவாழ்வு",
        "whatWeCanImprove": "பாதிக்கப்பட்டோருக்கு நீண்டகால மருத்துவ மற்றும் வாழ்வாதார உதவி.",
        "actionableInitiatives": [
          "மருத்துவ மற்றும் சட்ட உதவிகளுடன் கூடிய சமூகப் புகலிடங்கள்",
          "போர்க்கால பாலியல் வன்முறையில் தப்பிப்பிழைத்தோருக்கான சிகிச்சை",
          "மறுவாழ்வு நிதியை பாதிக்கப்பட்டோரே நிர்வகிக்கும் உரிமை"
        ],
        "profilesRef": [
          "யானர் முகமது",
          "நதியா முராத்",
          "மலாலா யூசுப்சாய்"
        ]
      },
      {
        "theme": "நிறுவன நீதி",
        "whatWeCanImprove": "அரசியல் தலையீடற்ற வெளிப்படையான விசாரணை மற்றும் விரைவான நீதிமன்ற நடைமுறைகள்.",
        "actionableInitiatives": [
          "அரசு மருத்துவமனைகளின் பாதுகாப்பை ஆய்வு செய்யும் பணிக்குழு",
          "குற்றவாளிகளின் சட்டவிரோதச் சொத்துக்களைப் பறிமுதல் செய்தல்",
          "காவல்துறை வன்முறைகளுக்கு எதிரான பூஜ்ஜிய சகிப்புத்தன்மை"
        ],
        "profilesRef": [
          "டாக்டர் மௌமிதா தேப்நாத்",
          "அருணா ஷான்பாக்",
          "வெரோனிகா கெரின்",
          "சாரா எவரார்ட்"
        ]
      },
      {
        "theme": "சமூகப் பொறுப்பு",
        "whatWeCanImprove": "துன்பப்படுபவர்களைக் கண்டு ஒதுங்கிப் போகாமல் பாதுகாப்பாகத் தலையிட்டு உதவும் மனப்பான்மை.",
        "actionableInitiatives": [
          "பள்ளிகள் மற்றும் கல்லூரிகளில் உதவி செய்வதற்கான பயிற்சி",
          "குடும்ப வன்முறையை எதிர்கொள்வோருக்கான அண்டைவீட்டார் உதவி வலைப்பின்னல்",
          "தெருவோரக் கேலிவதைத்தல்களுக்கு எதிரான விழிப்புணர்வு"
        ],
        "profilesRef": [
          "அனேனே போய்ஸன்",
          "ஜோதி சிங்",
          "சாரா எவரார்ட்"
        ]
      }
    ],
    "editorialPromise": [
      "வன்முறை பற்றிய தேவையற்ற பரபரப்பூட்டும் தகவல்கள் வெளியிடப்பட மாட்டாது.",
      "மனிதத் துயரங்களை வணிகமாக்கும் தலைப்புகள் முற்றிலும் தவிர்க்கப்படும்.",
      "அனைத்து வரலாற்றுத் தகவல்களும் நீதிமன்ற மற்றும் முதன்மை ஆவணங்களால் சரிபார்க்கப்பட்டவை.",
      "உண்மை வரலாற்றுக்கும் முன்மொழியப்பட்ட திட்டங்களுக்கும் இடையே தெளிவான வேறுபாடு பேணப்படும்.",
      "உயிர் பிழைத்த தலைவர்களை வெறும் நினைவுக் குறிப்புகளாக அல்லாமல் முன்னோடிகளாக மதித்தல்.",
      "நீதிமன்ற உத்தரவுகளுக்கு இணங்க தனியுரிமை விவரங்கள் பாதுகாக்கப்படும்.",
      "சரிபார்க்கப்பட்ட தேதிகள் மற்றும் நேரடி ஆதாரங்கள் வெளிப்படையாக இணைக்கப்படும்.",
      "தீர்க்கப்படாத வழக்குகளை உண்மையாக ஒப்புக்கொள்ளும் வெளிப்படைத்தன்மை.",
      "எந்தவொரு சமூகத்தையும் அரசியல் ரீதியாக குறிவைக்காமல் இருத்தல்.",
      "மனித மாண்பு மற்றும் அனைவருக்கும் பாதுகாப்பான அமைப்புகளை உருவாக்குவதில் அர்ப்பணிப்பு."
    ],
    "endingManifesto": {
      "headline": "இந்த உலகத்திற்கு வெறும் நினைவிடங்கள் மட்டும் போதாது.\nஅதற்கு இன்னும் அதிக மனிதநேயம் தேவை.",
      "paragraphs": [
        "சிலர் மருத்துவர்களாக விரும்பினர். சிலர் குழந்தைகளுக்குக் கற்பிக்க விரும்பினர். சிலர் காடுகளைப் பாதுகாக்கவோ, உண்மையை வெளிக்கொணரவோ அல்லது குரலற்றவர்களுக்குக் குரல் கொடுக்கவோ விரும்பினர்.",
        "ஒவ்வொரு பெயருக்குப் பின்னாலும் கனவுகள், பாசம் மற்றும் எதிர்காலம் கொண்ட ஓர் உன்னத மனிதர் இருந்தார் என்பதை அவர்கள் நமக்கு நினைவூட்டுகிறார்கள்.",
        "அவர்களின் கடந்த காலத்தை நம்மால் மாற்ற முடியாது. ஆனால் நம்மைச் சுற்றியுள்ள அமைப்புகளைச் சீரமைப்பதன் மூலமும், பாதிக்கப்படக்கூடியவர்களைப் பாதுகாப்பதன் மூலமும், மனித மாண்பை மதிப்பதன் மூலமும் அவர்களின் தியாகத்திற்குப் பொருள் சேர்க்க முடியும்."
      ],
      "finalCallout": "அவர்கள் இந்த உலகை எப்படி விட்டுச் சென்றார்கள் என்பதற்காக மட்டுமல்லாமல், இந்த உலகிற்கு அவர்கள் என்ன கொடுக்க விரும்பினார்கள் என்பதற்காக அவர்களை நினைவுகூர்வோம்."
    }
  },
  "or": {
    "survivorVoices": [
      {
        "id": "malala-yousafzai",
        "slug": "malala-yousafzai",
        "name": "ମଲାଲା ୟୁସୁଫଜାଇ",
        "displayRole": "ନୋବେଲ ଶାନ୍ତି ପୁରସ୍କାର ବିଜେତା · ଶିକ୍ଷା ଅଧିକାର କର୍ମୀ ଏବଂ ସହ-ପ୍ରତିଷ୍ଠାତା · ମଲାଲା ଫଣ୍ଡ",
        "country": "ପାକିସ୍ତାନ",
        "countryFlag": "🇵🇰",
        "eraOrYear": "୧୯୯୭–ବର୍ତ୍ତମାନ · ୨୦୧୨ ଆକ୍ରମଣର ସର୍ଭାଇଭର",
        "summary": "ଚରମପନ୍ଥୀ ହିଂସାର ସର୍ଭାଇଭର, ଯିଏ ନିଜ ଜୀବନର ଅନୁଭୂତିକୁ ଝିଅମାନଙ୍କ ମାଗଣା ଓ ଗୁଣାତ୍ମକ ଶିକ୍ଷା ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ଅଧିକାରର ବିଶ୍ୱ ଆନ୍ଦୋଳନରେ ପରିଣତ କରିଛନ୍ତି।",
        "livedExperienceAndAdvocacy": "୨୦୧୨ ଅକ୍ଟୋବର ୯ରେ ପାକିସ୍ତାନର ସ୍ୱାତ ଉପତ୍ୟକାରେ ବାଳିକା ଶିକ୍ଷା ପାଇଁ ସ୍ୱର ଉତ୍ତୋଳନ କରିବାରୁ ତାଙ୍କ ଉପରେ ଆତଙ୍କବାଦୀ ଆକ୍ରମଣ ହୋଇଥିଲା। ବ୍ରିଟେନରେ ଜରୁରୀକାଳୀନ ଚିକିତ୍ସା ପରେ ସେ ସୁସ୍ଥ ହେଲେ। ୨୦୧୩ରେ ସେ 'ମଲାଲା ଫଣ୍ଡ' ପ୍ରତିଷ୍ଠା କଲେ, ଯାହା ସାରା ବିଶ୍ୱରେ ୧୨ ବର୍ଷର ମାଗଣା ଓ ନିରାପଦ ଶିକ୍ଷା ସୁନିଶ୍ଚିତ କରିବା ପାଇଁ କାର୍ଯ୍ୟ କରୁଛି।",
        "societalReformMessage": "ଝିଅମାନଙ୍କ ପାଇଁ ମାଧ୍ୟମିକ ଶିକ୍ଷାର ସାର୍ବଜନୀନ ସୁଯୋଗ ଜନସ୍ୱାସ୍ଥ୍ୟ, ମାତୃକଲ୍ୟାଣ ଏବଂ ଦାରିଦ୍ର୍ୟ ଦୂରୀକରଣର ସବୁଠାରୁ ଶକ୍ତିଶାଳୀ ମାଧ୍ୟମ।",
        "verifiedQuote": {
          "quote": "ଗୋଟିଏ ଶିଶୁ, ଜଣେ ଶିକ୍ଷକ, ଗୋଟିଏ ବହି ଏବଂ ଗୋଟିଏ କଲମ ସମଗ୍ର ବିଶ୍ୱକୁ ବଦଳାଇ ପାରିବ।",
          "source": "ଜାତିସଂଘ ଯୁବ ସଭାରେ ଅଭିଭାଷଣ (୧୨ ଜୁଲାଇ ୨୦୧୩)"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2014 Citation: Malala Yousafzai",
            "url": "https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Malala Fund: Girls' Education and Research Reports",
            "url": "https://malala.org",
            "publisher": "Malala Fund"
          }
        ]
      },
      {
        "id": "nadia-murad",
        "slug": "nadia-murad",
        "name": "ନାଦିଆ ମୁରାଦ",
        "displayRole": "ନୋବେଲ ଶାନ୍ତି ପୁରସ୍କାର ବିଜେତା · ଜାତିସଂଘ ସଦ୍ଭାବନା ରାଷ୍ଟ୍ରଦୂତ · ପ୍ରତିଷ୍ଠାତା · ନାଦିଆଜ ଇନିସିଏଟିଭ",
        "country": "ଇରାକ",
        "countryFlag": "🇮🇶",
        "eraOrYear": "୧୯୯୩–ବର୍ତ୍ତମାନ · ୨୦୧୪ ୟାଜିଦି ନରସଂହାରର ସର୍ଭାଇଭର",
        "summary": "ୟାଜିଦି ମାନବାଧିକାର କର୍ମୀ, ଯିଏ ଯୁଦ୍ଧକାଳୀନ ଦାସତ୍ୱରୁ ଖସିଆସି ଯୁଦ୍ଧରେ ଯୌନ ହିଂସାକୁ ଅନ୍ତର୍ଜାତୀୟ ଅପରାଧ ଭାବେ ଦଣ୍ଡିତ କରିବା ପାଇଁ ଆଇନଗତ ଅଭିଯାନର ନେତୃତ୍ୱ ନେଇଥିଲେ।",
        "livedExperienceAndAdvocacy": "ଅଗଷ୍ଟ ୨୦୧୪ରେ ଆଇଏସଆଇଏସ ତାଙ୍କ ଗାଁ କୋଚୋ ଉପରେ ଆକ୍ରମଣ କରି ପରିବାରବର୍ଗଙ୍କୁ ହତ୍ୟା କରିଥିଲା। ନଭେମ୍ବର ୨୦୧୪ରେ ଏକ ସ୍ଥାନୀୟ ମୁସଲିମ ପରିବାରର ସାହାଯ୍ୟରେ ପଳାୟନ କରି ସେ ଜାତିସଂଘରେ ସାକ୍ଷ୍ୟ ଦେଲେ, 'ଦ ଲାଷ୍ଟ ଗାର୍ଲ' ପୁସ୍ତକ ରଚନା କଲେ ଏବଂ 'ନାଦିଆଜ ଇନିସିଏଟିଭ' ପ୍ରତିଷ୍ଠା କରି ୧୯ ଫେବୃଆରୀ ୨୦୨୬ରେ ସିନଜାର ଫ୍ରେଞ୍ଚ ମେଡିକାଲ ସେଣ୍ଟର ଉଦଘାଟନ କଲେ।",
        "societalReformMessage": "ଯୁଦ୍ଧକାଳୀନ ଯୌନ ହିଂସାର ଶିକାର ହୋଇଥିବା ଲୋକଙ୍କୁ ପ୍ରତ୍ୟକ୍ଷ କ୍ଷତିପୂରଣ, ମାନସିକ ସ୍ୱାସ୍ଥ୍ୟସେବା ଏବଂ ସମାଜ ପୁନର୍ଗଠନରେ ପ୍ରତ୍ୟକ୍ଷ ନେତୃତ୍ୱ ପ୍ରଦାନ କରାଯିବା ଉଚିତ।",
        "verifiedQuote": {
          "quote": "ମୁଁ ଦୁନିଆର ଏପରି ଶେଷ ଝିଅ ହେବାକୁ ଚାହେଁ ଯାହାର ମୋ ଭଳି ଏକ ଯନ୍ତ୍ରଣାଦାୟକ କାହାଣୀ ଥିବ।",
          "source": "ନୋବେଲ ବକ୍ତବ୍ୟ ଏବଂ ଅନ୍ତର୍ଜାତୀୟ ମାନବାଧିକାର ଅଭିଯାନ"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/murad/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Nadia's Initiative: Sinjar French Medical Center Opening (2026)",
            "url": "https://www.nadiasinitiative.org/healthcare",
            "publisher": "Nadia's Initiative"
          }
        ]
      }
    ],
    "consentFramework": {
      "title": "ସର୍ଭାଇଭର ସମ୍ମତି ଏବଂ ଗୋପନୀୟତା ସୁରକ୍ଷାର ସାତ-ପଦକ୍ଷେପ ବିଶିଷ୍ଟ ନିୟମାବଳୀ",
      "description": "ଅଲଟିମେଟହେଲଥ ଏକ ନୈତିକ ତଥା ସମ୍ବେଦନଶୀଳ ପ୍ରକାଶନ ନୀତି ଅନୁସରଣ କରେ ଯାହା ବ୍ୟକ୍ତିଗତ ମର୍ଯ୍ୟାଦା ଏବଂ ନିଃସର୍ତ୍ତ ଗୋପନୀୟତାକୁ ସମ୍ମାନ ଦିଏ।",
      "steps": [
        {
          "step": 1,
          "title": "ଅନୁଭୂତି ଦାଖଲ / ନୈତିକ ମନୋନୟନ",
          "detail": "କାହାଣୀଗୁଡ଼ିକ କେବଳ ଗୋପନୀୟ ଏବଂ ସୁରକ୍ଷିତ ମାଧ୍ୟମ ଦ୍ୱାରା ଗ୍ରହଣ କରାଯାଏ।"
        },
        {
          "step": 2,
          "title": "ପ୍ରାରମ୍ଭିକ ସମ୍ପାଦକୀୟ ଓ ନିରାପତ୍ତା ସମୀକ୍ଷା",
          "detail": "ମାନବୀୟ ମର୍ଯ୍ୟାଦା, ଶିକ୍ଷଣୀୟ ମୂଲ୍ୟ ଏବଂ ନିରାପତ୍ତା ନିଶ୍ଚିତ କରିବା ପାଇଁ ପ୍ରତ୍ୟେକ ବିବରଣୀର ଯାଞ୍ଚ କରାଯାଏ।"
        },
        {
          "step": 3,
          "title": "ଅବଗତ ସମ୍ମତି ଏବଂ ପରିଚୟ ଚୟନ",
          "detail": "ଯୋଗଦାନକାରୀ ନିଜେ ସାର୍ବଜନୀନ ପରିଚୟ ବାଛିଥାନ୍ତି: ପୂର୍ଣ୍ଣ ନାମ, ଛଦ୍ମନାମ କିମ୍ବା ଅଜ୍ଞାତନାମା।"
        },
        {
          "step": 4,
          "title": "ତଥ୍ୟ-ଯାଞ୍ଚ ଏବଂ ଆଇନଗତ ପ୍ରମାଣୀକରଣ",
          "detail": "ପ୍ରାଥମିକ ଦସ୍ତାବିଜ ଏବଂ ସରକାରୀ ରେକର୍ଡରୁ ତଥ୍ୟ ଯାଞ୍ଚ କରାଯାଏ।"
        },
        {
          "step": 5,
          "title": "ପାଠ୍ୟ ସମୀକ୍ଷା",
          "detail": "ପ୍ରକାଶନ ପୂର୍ବରୁ ସମ୍ପୃକ୍ତ ବ୍ୟକ୍ତି ଲେଖାଟି ଯାଞ୍ଚ କରନ୍ତି ଏବଂ ପ୍ରତ୍ୟେକ ଶବ୍ଦ ଉପରେ ତାଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ ଅଧିକାର ଥାଏ।"
        },
        {
          "step": 6,
          "title": "ଚୂଡ଼ାନ୍ତ ନୈତିକ ଅନୁମୋଦନ",
          "detail": "କୌଣସି ଉତ୍ତେଜକ ବର୍ଣ୍ଣନା କିମ୍ବା ହିଂସାର ଭୟଙ୍କର ଚିତ୍ରଣ ସମ୍ପୂର୍ଣ୍ଣ ବର୍ଜନ କରାଯାଏ।"
        },
        {
          "step": 7,
          "title": "ତଥ୍ୟ ପରିବର୍ତ୍ତନ କିମ୍ବା ପ୍ରତ୍ୟାହାରର ଅଧିକାର",
          "detail": "ସୂଚନା ଅଦ୍ୟତନ କରିବା କିମ୍ବା ସ୍ଥାୟୀ ଭାବେ ନିଜ ନାମ ହଟାଇବା ପାଇଁ ଯୋଗଦାନକାରୀଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ ଅଧିକାର ରହିଛି।"
        }
      ],
      "privacyPledge": [
        "କୌଣସି ବ୍ୟକ୍ତିଗତ ଫୋନ ନମ୍ବର କିମ୍ବା ଠିକଣା ପ୍ରଦର୍ଶନ କରାଯାଏ ନାହିଁ।",
        "ସ୍ପଷ୍ଟ ସମ୍ମତି ବିନା ପରିବାର ସଦସ୍ୟ କିମ୍ବା ନାବାଳକଙ୍କ ପରିଚୟ ପ୍ରକାଶ କରାଯାଏ ନାହିଁ।",
        "ବ୍ୟକ୍ତିଗତ ଅନୁଭୂତିକୁ ବାଣିଜ୍ୟିକ ପ୍ରଚାରରେ ବ୍ୟବହାର କରାଯାଏ ନାହିଁ।"
      ]
    },
    "changemakers": [
      {
        "id": "dr-denis-mukwege",
        "slug": "dr-denis-mukwege",
        "name": "ଡାକ୍ତର ଡେନିସ ମୁକୱେଗେ",
        "roleAndField": "ସ୍ତ୍ରୀରୋଗ ବିଶେଷଜ୍ଞ ଶଲ୍ୟ ଚିକିତ୍ସକ ଏବଂ ଚିକିତ୍ସକ",
        "organization": "ପାଞ୍ଜି ହସ୍ପିଟାଲ ଏବଂ ଫାଉଣ୍ଡେସନ",
        "country": "କଙ୍ଗୋ ଗଣତାନ୍ତ୍ରିକ ପ୍ରଜାତନ୍ତ୍ର",
        "countryFlag": "🇨🇩",
        "eraOrYear": "୧୯୯୯–ବର୍ତ୍ତମାନ",
        "focusArea": "ଯୁଦ୍ଧକାଳୀନ ଯୌନ ହିଂସାର ଶିକାର ମହିଳାଙ୍କ ଚିକିତ୍ସା ଏବଂ ସାମଗ୍ରିକ ପୁନର୍ବାସ",
        "documentedActions": "୧୯୯୯ରେ ବୁକାଭୁରେ ପାଞ୍ଜି ହସ୍ପିଟାଲ ପ୍ରତିଷ୍ଠା କରି ଯୌନ ହିଂସାର ଶିକାର ହୋଇଥିବା ହଜାର ହଜାର ମହିଳାଙ୍କ ପାଇଁ ଶଲ୍ୟ ଚିକିତ୍ସା, ମାନସିକ ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ଆଇନଗତ ସହାୟତା ପ୍ରଦାନ କରୁଛନ୍ତି।",
        "measurableImpact": "୨୦୧୮ରେ ନୋବେଲ ଶାନ୍ତି ପୁରସ୍କାରରେ ସମ୍ମାନିତ; ୨୦୧୯ରେ ଗ୍ଲୋବାଲ ସର୍ଭାଇଭର୍ସ ଫଣ୍ଡ ପ୍ରତିଷ୍ଠା କରିଥିଲେ।",
        "relevanceToHumanity": "ଚିକିତ୍ସା ବିଜ୍ଞାନ ଏବଂ ନୈତିକ ସାହସ ମିଳିତ ଭାବେ ମାନବୀୟ ମର୍ଯ୍ୟାଦା ଫେରାଇ ଆଣିପାରିବ ବୋଲି ପ୍ରମାଣ କରିଛନ୍ତି।",
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/mukwege/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "The Panzi Model of Holistic Healing & Reconstructive Surgery",
            "url": "https://panzifoundation.org",
            "publisher": "Panzi Foundation"
          }
        ]
      },
      {
        "id": "dr-sunitha-krishnan",
        "slug": "dr-sunitha-krishnan",
        "name": "ଡାକ୍ତର ସୁନୀତା କୃଷ୍ଣନ",
        "roleAndField": "ସମାଜ ସଂସ୍କାରକ ଏବଂ ମାନବ ଚାଲାଣ ବିରୋଧୀ ଅଗ୍ରଦୂତ",
        "organization": "ପ୍ରଜ୍ୱଳା",
        "country": "ଭାରତ",
        "countryFlag": "🇮🇳",
        "eraOrYear": "୧୯୯୬–ବର୍ତ୍ତମାନ",
        "focusArea": "ମାନବ ଚାଲାଣରୁ ଉଦ୍ଧାର, ମାନସିକ ପୁନର୍ବାସ ଏବଂ ସାମାଜିକ ପୁନଃସ୍ଥାପନ",
        "documentedActions": "୧୯୯୬ରେ ହାଇଦ୍ରାବାଦରେ ପ୍ରଜ୍ୱଳା ପ୍ରତିଷ୍ଠା କରି ଯୌନ ଶୋଷଣରୁ ମୁକ୍ତ ହୋଇଥିବା ନାରୀମାନଙ୍କୁ ଆଶ୍ରୟ, ଚିକିତ୍ସା, କର୍ମସଂସ୍ଥାନ ଏବଂ ଆଇନଗତ ସହାୟତା ଯୋଗାଇ ଦେଉଛନ୍ତି।",
        "measurableImpact": "୨୪,୦୦୦ରୁ ଅଧିକ ମହିଳାଙ୍କୁ ଉଦ୍ଧାର ଓ ପୁନର୍ବାସିତ କରିଛନ୍ତି; ୨୦୧୬ରେ ଭାରତ ସରକାରଙ୍କ ଦ୍ୱାରା ପଦ୍ମଶ୍ରୀ ସମ୍ମାନରେ ସମ୍ମାନିତ।",
        "relevanceToHumanity": "ସ୍ଥାୟୀ ମୁକ୍ତି ପାଇଁ ଦୀର୍ଘକାଳୀନ ମାନସିକ ସୁସ୍ଥତା ଏବଂ ଆର୍ଥିକ ଆତ୍ମନିର୍ଭରଶୀଳତା ଅତ୍ୟନ୍ତ ଜରୁରୀ ବୋଲି ପ୍ରମାଣ କରିଛନ୍ତି।",
        "references": [
          {
            "title": "Prajwala Institutional Impact & Survivor Rehabilitation Data",
            "url": "https://prajwalaindia.com",
            "publisher": "Prajwala"
          },
          {
            "title": "Government of India Padma Awards Gazette (2016)",
            "url": "https://padmaawards.gov.in",
            "publisher": "Government of India"
          }
        ]
      },
      {
        "id": "dr-abhay-rani-bang",
        "slug": "dr-abhay-rani-bang",
        "name": "ଡାକ୍ତର ଅଭୟ ଏବଂ ଡାକ୍ତର ରାଣୀ ବାଙ୍ଗ",
        "roleAndField": "ଜନସ୍ୱାସ୍ଥ୍ୟ ବିଶେଷଜ୍ଞ ଚିକିତ୍ସକ ଏବଂ ଗବେଷକ",
        "organization": "ସର୍ଚ୍ଚ (SEARCH)",
        "country": "ଭାରତ",
        "countryFlag": "🇮🇳",
        "eraOrYear": "୧୯୮୬–ବର୍ତ୍ତମାନ",
        "focusArea": "ଗୃହ-ଭିତ୍ତିକ ନବଜାତକ ଶିଶୁ ଯତ୍ନ (HBNC) ଏବଂ ଗ୍ରାମୀଣ ସ୍ୱାସ୍ଥ୍ୟ ସମାନତା",
        "documentedActions": "ମହାରାଷ୍ଟ୍ରର ଗଡ଼ଚିରୋଲି ଆଦିବାସୀ ଅଞ୍ଚଳରେ ଗ୍ରାମୀଣ ମହିଳାମାନଙ୍କୁ (ଆରୋଗ୍ୟଦୂତ) ତାଲିମ ଦେଇ ଘରେ ଘରେ ନବଜାତକ ଶିଶୁମାନଙ୍କ ଚିକିତ୍ସା କରିବାର ଅଭିନବ ପଦ୍ଧତି ପ୍ରବର୍ତ୍ତନ କରିଥିଲେ।",
        "measurableImpact": "ଲାନସେଟ୍ ପତ୍ରିକାରେ ପ୍ରକାଶିତ ତଥ୍ୟ ଅନୁସାରେ ଶିଶୁ ମୃତ୍ୟୁହାର ୬୨% ହ୍ରାସ ପାଇଥିଲା; ଏହା ଭାରତ ସରକାରଙ୍କ ଜାତୀୟ ଆଶା (ASHA) କାର୍ଯ୍ୟକ୍ରମର ମୂଳଦୁଆ ସାଜିଥିଲା; ୨୦୧୮ରେ ପଦ୍ମଶ୍ରୀ ପ୍ରାପ୍ତ।",
        "relevanceToHumanity": "ଜୀବନରକ୍ଷାକାରୀ ଡାକ୍ତରୀ ଜ୍ଞାନକୁ ଗ୍ରାମୀଣ ମହିଳାମାନଙ୍କ ହାତରେ ଅର୍ପଣ କରି ଜନସ୍ୱାସ୍ଥ୍ୟ କ୍ଷେତ୍ରରେ ବିପ୍ଳବ ଆଣିଛନ୍ତି।",
        "references": [
          {
            "title": "The Lancet: Effect of Home-Based Neonatal Care on Neonatal Mortality",
            "url": "https://www.thelancet.com",
            "publisher": "The Lancet (1999)"
          },
          {
            "title": "SEARCH Gadchiroli Field Research and HBNC Architecture",
            "url": "https://searchgadchiroli.org.in",
            "publisher": "SEARCH"
          }
        ]
      }
    ],
    "societalLessons": [
      {
        "theme": "ସ୍ୱାସ୍ଥ୍ୟସେବା ସୁରକ୍ଷା",
        "whatWeCanImprove": "ଡାକ୍ତରଖାନା, ଡ୍ୟୁଟି ରୁମ୍ ଏବଂ ଜରୁରୀକାଳୀନ ୱାର୍ଡଗୁଡ଼ିକରେ କଡ଼ା ନିରାପତ୍ତା ବ୍ୟବସ୍ଥା ନିଶ୍ଚିତ କରିବା।",
        "actionableInitiatives": [
          "ଡାକ୍ତର ଏବଂ ନର୍ସମାନଙ୍କ ପାଇଁ ସୁରକ୍ଷିତ ଡ୍ୟୁଟି ରୁମ୍",
          "ଜରୁରୀକାଳୀନ ୱାର୍ଡରେ ୨୪ ଘଣ୍ଟିଆ ସୁରକ୍ଷା କର୍ମୀ ଏବଂ ଆଲାର୍ମ",
          "ପୋଲିସ ହେପାଜତରେ ଥିବା ଉତ୍ତେଜିତ ରୋଗୀଙ୍କ ପାଇଁ କଡ଼ା ଯାଞ୍ଚ"
        ],
        "profilesRef": [
          "ଡାକ୍ତର ମୌମିତା ଦେବନାଥ",
          "ଅରୁଣା ଶାନବାଗ",
          "ଡାକ୍ତର ସରିତା ତୋଷନିୱାଲ",
          "ଡାକ୍ତର ବନ୍ଦନା ଦାସ",
          "ଡାକ୍ତର ତାମାରା ଓ'ନିଲ"
        ]
      },
      {
        "theme": "ମହିଳା ସୁରକ୍ଷା",
        "whatWeCanImprove": "ସର୍ବସାଧାରଣ ସ୍ଥାନରେ ଯାତାୟାତ ସୁବିଧା ଏବଂ କଠୋର ଆଇନଗତ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ।",
        "actionableInitiatives": [
          "ଜିପିଏସ ଯୁକ୍ତ ଆଲୋକିତ ପରିବହନ ବ୍ୟବସ୍ଥା",
          "ପାରିବାରିକ ହିଂସାର ପ୍ରାରମ୍ଭିକ ଲକ୍ଷଣ ଚିହ୍ନଟ ପାଇଁ ସଚେତନତା",
          "ରାସ୍ତାଘାଟ ଏବଂ ବସଷ୍ଟାଣ୍ଡଗୁଡ଼ିକର ନିୟମିତ ସୁରକ୍ଷା ଅଡିଟ"
        ],
        "profilesRef": [
          "ଜ୍ୟୋତି ସିଂହ",
          "ସାରା ଏଭରାର୍ଡ",
          "ରିଭା ଷ୍ଟିନକ୍ୟାମ୍ପ",
          "ଅନେନେ ବୋଏସେନ",
          "ମହସା ଅମିନି"
        ]
      },
      {
        "theme": "ଶିଶୁ ସୁରକ୍ଷା",
        "whatWeCanImprove": "ପ୍ରତ୍ୟେକ ଶିଶୁ ପାଇଁ ସୁରକ୍ଷା, ତ୍ୱରିତ ନ୍ୟାୟ ଏବଂ ବୈଷମ୍ୟହୀନ ପଦକ୍ଷେପ।",
        "actionableInitiatives": [
          "ଶିଶୁ ଚିକିତ୍ସାଳୟରେ ମାନସିକ ସ୍ୱାସ୍ଥ୍ୟ ପରୀକ୍ଷା",
          "ପଛୁଆ ଅଞ୍ଚଳରେ ଶିଶୁମାନଙ୍କ ପାଇଁ ସୁରକ୍ଷିତ ପରିବେଶ",
          "ଫାଷ୍ଟ-ଟ୍ରାକ ଅଦାଲତରେ ଶିଶୁ ସାକ୍ଷୀଙ୍କ ସୁରକ୍ଷା"
        ],
        "profilesRef": [
          "କଠୁଆର ଶିଶୁ କନ୍ୟା",
          "ଅନେନେ ବୋଏସେନ",
          "ଆନ୍ନା ଫ୍ରାଙ୍କ"
        ]
      },
      {
        "theme": "ଶିକ୍ଷା ଏବଂ ସଚେତନତା",
        "whatWeCanImprove": "ବାଳିକାମାନଙ୍କ ପାଇଁ ୧୨ ବର୍ଷର ନିରବଚ୍ଛିନ୍ନ ଗୁଣାତ୍ମକ ଶିକ୍ଷା ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ସଚେତନତା।",
        "actionableInitiatives": [
          "ମାଧ୍ୟମିକ ଶିକ୍ଷା କ୍ଷେତ୍ରର ସମସ୍ତ ପ୍ରତିବନ୍ଧକ ଦୂର କରିବା",
          "ବିଦ୍ୟାଳୟରେ ଋତୁସ୍ରାବ ସ୍ୱଚ୍ଛତା ଓ ମାନସିକ ସ୍ୱାସ୍ଥ୍ୟ ଶିକ୍ଷା",
          "ମହିଳା ଶିକ୍ଷୟିତ୍ରୀ ଓ ଛାତ୍ରୀମାନଙ୍କ ପାଇଁ ସାମାଜିକ ସୁରକ୍ଷା"
        ],
        "profilesRef": [
          "ମଲାଲା ୟୁସୁଫଜାଇ",
          "ଆନ୍ନା ଫ୍ରାଙ୍କ",
          "ସୋଫି ସୋଲ"
        ]
      },
      {
        "theme": "ସାମ୍ବାଦିକତା ଏବଂ ସତ୍ୟ",
        "whatWeCanImprove": "ନିରପେକ୍ଷ ସାମ୍ବାଦିକତାର ସୁରକ୍ଷା ଏବଂ ମିଥ୍ୟା ମକଦ୍ଦମାରୁ ସୁରକ୍ଷା।",
        "actionableInitiatives": [
          "ସାମ୍ବାଦିକମାନଙ୍କ ସ୍ୱର ଚାପିବା ପାଇଁ ହେଉଥିବା ମକଦ୍ଦମା ବିରୁଦ୍ଧରେ ଆଇନ",
          "ସାମ୍ବାଦିକମାନଙ୍କ ପାଇଁ ଜରୁରୀକାଳୀନ ସୁରକ୍ଷା ପାଣ୍ଠି",
          "ସୁରକ୍ଷା ବାହିନୀ ଦ୍ୱାରା 'ପ୍ରେସ' (PRESS) ସଙ୍କେତର ସମ୍ମାନ"
        ],
        "profilesRef": [
          "ଡାଫନେ କାରୁଆନା ଗାଲିଜିଆ",
          "ଆନ୍ନା ପୋଲିଟକୋଭସ୍କାୟା",
          "ଭେରୋନିକା ଗୁଏରିନ",
          "ଶିରିନ ଆବୁ ଆକଲେହ",
          "ଗୌରୀ ଲଙ୍କେଶ"
        ]
      },
      {
        "theme": "ପରିବେଶ ନ୍ୟାୟ",
        "whatWeCanImprove": "ବିକାଶ ଯୋଜନାରେ ସ୍ଥାନୀୟ ଆଦିବାସୀ ସମ୍ପ୍ରଦାୟର ପୂର୍ଣ୍ଣ ସମ୍ମତି ଗ୍ରହଣ।",
        "actionableInitiatives": [
          "ପ୍ରକଳ୍ପ ଅନୁମୋଦନ ପୂର୍ବରୁ ସ୍ଥାନୀୟ ଲୋକଙ୍କ ସମ୍ମତି ବାଧ୍ୟତାମୂଳକ କରିବା",
          "ପରିବେଶ ରକ୍ଷକମାନଙ୍କ ଉପରେ ମିଥ୍ୟା ମକଦ୍ଦମା ବନ୍ଦ କରିବା",
          "ପ୍ରଦୂଷଣ ନିୟନ୍ତ୍ରଣ ପାଇଁ ସ୍ଥାନୀୟ କମିଟି ଗଠନ"
        ],
        "profilesRef": [
          "ବର୍ଟା କାସେରେସ",
          "ମାରିଏଲ ଫ୍ରାଙ୍କୋ",
          "ଆୟସିନ ବୁୟୁକନୋହୁତଚୁ",
          "ଏଫିଜେନିଆ ଭାସ୍କେଜ ଆସ୍ତୁଦିଲୋ",
          "ଏମିଲସେନ ମାନୟୋମା",
          "ଲିଓନିଲା ତପଦାସନ ପେସାଦିଲା",
          "ଲୌରା ଲିଓନୋର ଭାସ୍କେଜ ପିନେଡା",
          "ଜେନ ଜୁଲିଆ ଡି ଓଲିଭେରା"
        ]
      },
      {
        "theme": "ମାନବାଧିକାର ଏବଂ ମର୍ଯ୍ୟାଦା",
        "whatWeCanImprove": "ଧର୍ମ ଏବଂ ଲିଙ୍ଗ ନିର୍ବିଶେଷରେ ଆଇନ ଆଗରେ ସମାନ ମର୍ଯ୍ୟାଦା।",
        "actionableInitiatives": [
          "ନାଗରିକ ଅଧିକାରକୁ କଠୋର ନୈତିକ ପୋଲିସିଂରୁ ମୁକ୍ତ କରିବା",
          "ପଛୁଆ ବର୍ଗଙ୍କ ପାଇଁ ରାଜନୈତିକ ପ୍ରତିନିଧିତ୍ୱର ସମାନ ସୁଯୋଗ",
          "ସରକାରୀ ସେବାରେ ଧାର୍ମିକ କିମ୍ବା ଜାତିଗତ ଭେଦଭାବ ବିରୋଧରେ ସୁରକ୍ଷା"
        ],
        "profilesRef": [
          "ମହସା ଅମିନି",
          "ସୋଫି ସୋଲ",
          "ମାରିଏଲ ଫ୍ରାଙ୍କୋ",
          "କନ୍ଦିଲ ବାଲୋଚ"
        ]
      },
      {
        "theme": "ମାନସିକ ଏବଂ ସାମାଜିକ ପୁନର୍ବାସ",
        "whatWeCanImprove": "ପୀଡ଼ିତମାନଙ୍କ ପାଇଁ ଦୀର୍ଘକାଳୀନ ଚିକିତ୍ସା ଏବଂ ଆର୍ଥିକ ପୁନର୍ବାସ।",
        "actionableInitiatives": [
          "ଡାକ୍ତରୀ ଏବଂ ଆଇନଗତ ସହାୟତା ଯୁକ୍ତ ସୁରକ୍ଷିତ ଆଶ୍ରୟସ୍ଥଳ",
          "ଯୌନ ହିଂସାର ଶିକାର ହୋଇଥିବା ଲୋକଙ୍କ ପାଇଁ ମାନସିକ ଚିକିତ୍ସା",
          "ପୁନର୍ବାସ ପାଣ୍ଠି ପରିଚାଳନାରେ ସର୍ଭାଇଭରମାନଙ୍କ ନେତୃତ୍ୱ"
        ],
        "profilesRef": [
          "ୟାନାର ମହମ୍ମଦ",
          "ନାଦିଆ ମୁରାଦ",
          "ମଲାଲା ୟୁସୁଫଜାଇ"
        ]
      },
      {
        "theme": "ସାଂସ୍ଥାଗତ ନ୍ୟାୟ",
        "whatWeCanImprove": "ନିରପେକ୍ଷ ତଦନ୍ତ ଏବଂ ତ୍ୱରିତ ଆଇନଗତ ପ୍ରକ୍ରିୟା।",
        "actionableInitiatives": [
          "ଡାକ୍ତରଖାନା ସୁରକ୍ଷା ତଦାରଖ ପାଇଁ ନ୍ୟାୟିକ ଟାସ୍କଫୋର୍ସ",
          "ଅପରାଧୀଙ୍କ ବେଆଇନ ସମ୍ପତ୍ତି ଜବତ କରିବା",
          "ପୋଲିସ କିମ୍ବା ଅଧିକାରୀଙ୍କ ଦ୍ୱାରା ହିଂସା ବିରୋଧରେ କଠୋର ପଦକ୍ଷେପ"
        ],
        "profilesRef": [
          "ଡାକ୍ତର ମୌମିତା ଦେବନାଥ",
          "ଅରୁଣା ଶାନବାଗ",
          "ଭେରୋନିକା ଗୁଏରିନ",
          "ସାରା ଏଭରାର୍ଡ"
        ]
      },
      {
        "theme": "ସାମାଜିକ ଦାୟିତ୍ୱବୋଧ",
        "whatWeCanImprove": "ବିପଦରେ ଥିବା ଲୋକଙ୍କୁ ସାହାଯ୍ୟ କରିବା ପାଇଁ ଆଗେଇ ଆସିବା ଏବଂ ନୀରବତା ଭାଙ୍ଗିବା।",
        "actionableInitiatives": [
          "ବିଦ୍ୟାଳୟ ଏବଂ କାର୍ଯ୍ୟସ୍ଥଳରେ ସହାୟତା କରିବା ପାଇଁ ତାଲିମ",
          "ଘରୋଇ ହିଂସାର ଶିକାର ହେଉଥିବା ଲୋକଙ୍କ ପାଇଁ ସାମାଜିକ ସହାୟତା",
          "ରାସ୍ତାଘାଟରେ ହେଉଥିବା ନିର୍ଯାତନା ବିରୁଦ୍ଧରେ ସଚେତନତା"
        ],
        "profilesRef": [
          "ଅନେନେ ବୋଏସେନ",
          "ଜ୍ୟୋତି ସିଂହ",
          "ସାରା ଏଭରାର୍ଡ"
        ]
      }
    ],
    "editorialPromise": [
      "କୌଣସି ଉତ୍ତେଜକ କିମ୍ବା ଅବାଞ୍ଛିତ ହିଂସାର ବର୍ଣ୍ଣନା କରାଯିବ ନାହିଁ।",
      "ମାନବୀୟ ଦୁଃଖଦ ଘଟଣାକୁ ନେଇ ଚାଞ୍ଚଲ୍ୟକର ଶିରୋନାମା ସମ୍ପୂର୍ଣ୍ଣ ବର୍ଜନ।",
      "କୌଣସି ଅପ୍ରମାଣିତ ଅଭିଯୋଗ ନାହିଁ — ସମସ୍ତ ତଥ୍ୟ ଅଦାଲତ ଏବଂ ମୂଳ ଦଲିଲ ଦ୍ୱାରା ଯାଞ୍ଚକୃତ।",
      "ପ୍ରମାଣିତ ଜୀବନୀ ତଥ୍ୟ ଏବଂ ଆମର ପ୍ରସ୍ତାବିତ ଯୋଜନା ମଧ୍ୟରେ ସ୍ପଷ୍ଟ ପାର୍ଥକ୍ୟ।",
      "ଜୀବିତ ସର୍ଭାଇଭରମାନଙ୍କୁ ସ୍ମୃତି ଚିହ୍ନ ବଦଳରେ ସକ୍ରିୟ ନେତୃତ୍ୱ ଭାବରେ ସମ୍ମାନ।",
      "ଅଦାଲତଙ୍କ ନିର୍ଦ୍ଦେଶ ଅନୁଯାୟୀ ବ୍ୟକ୍ତିଗତ ପରିଚୟର କଠୋର ସୁରକ୍ଷା।",
      "ସମ୍ପାଦକୀୟ ଯାଞ୍ଚ ସ୍ଥିତି ଏବଂ ମୂଳ ଉତ୍ସର ପ୍ରତ୍ୟକ୍ଷ ଲିଙ୍କ ପ୍ରଦାନ।",
      "ଅପ୍ରମାଣିତ ଦାବିକୁ ସତ୍ୟ ଭାବରେ ଉପସ୍ଥାପନ ନକରି ସ୍ୱଚ୍ଛତା ବଜାୟ ରଖିବା।",
      "କୌଣସି ସମ୍ପ୍ରଦାୟ ଉପରେ ରାଜନୈତିକ କିମ୍ବା ସାମ୍ପ୍ରଦାୟିକ ଆକ୍ଷେପ ନକରିବା।",
      "ମାନବୀୟ ମର୍ଯ୍ୟାଦା, ସତ୍ୟ ଏବଂ ସାଂସ୍ଥାଗତ ସୁରକ୍ଷା ପ୍ରତି ନିଃସର୍ତ୍ତ ପ୍ରତିବଦ୍ଧତା।"
    ],
    "endingManifesto": {
      "headline": "ଦୁନିଆକୁ କେବଳ ସ୍ମୃତିସ୍ତମ୍ଭର ଆବଶ୍ୟକତା ନାହିଁ।\nଏହାକୁ ଆହୁରି ଅଧିକ ମାନବିକତାର ଆବଶ୍ୟକତା ଅଛି।",
      "paragraphs": [
        "କେହି ଡାକ୍ତର ହେବାକୁ ଚାହୁଁଥିଲେ। କେହି ପିଲାମାନଙ୍କୁ ପଢ଼ାଇବାକୁ ଚାହୁଁଥିଲେ। କେହି ଜଙ୍ଗଲ ରକ୍ଷା କରିବାକୁ, ସତ୍ୟ ପ୍ରକାଶ କରିବାକୁ କିମ୍ବା ଅସହାୟ ଲୋକଙ୍କ ସ୍ୱର ହେବାକୁ ଚାହୁଁଥିଲେ।",
        "ସେମାନଙ୍କ ଜୀବନ ଆମକୁ ମନେ ପକାଇଦିଏ ଯେ ପ୍ରତ୍ୟେକ ନାମ ପଛରେ ସ୍ୱପ୍ନ, ସମ୍ପର୍କ, ଦାୟିତ୍ୱ ଏବଂ ଅସୀମ ସମ୍ଭାବନା ଥିବା ଜଣେ ମଣିଷ ଥାଏ।",
        "ଆମେ ସେମାନଙ୍କ ଅତୀତକୁ ବଦଳାଇ ପାରିବା ନାହିଁ। କିନ୍ତୁ ଆମ ଚାରିପାଖର ବ୍ୟବସ୍ଥାରେ ସୁଧାର ଆଣି, ଦୁର୍ବଳ ଲୋକଙ୍କୁ ସୁରକ୍ଷା ଦେଇ, ଶିକ୍ଷାକୁ ପ୍ରୋତ୍ସାହିତ କରି ଏବଂ ଅନ୍ୟାୟ ବିରୁଦ୍ଧରେ ଛିଡ଼ା ହୋଇ ସେମାନଙ୍କ କାହାଣୀକୁ ଅର୍ଥପୂର୍ଣ୍ଣ କରିପାରିବା।"
      ],
      "finalCallout": "ଆସନ୍ତୁ, ସେମାନେ କିପରି ଏ ସଂସାର ଛାଡ଼ି ଚାଲିଗଲେ କେବଳ ସେଥିପାଇଁ ମନେ ନରଖି, ସେମାନେ ଏ ସଂସାରକୁ କ'ଣ ଦେବାକୁ ଚାହୁଁଥିଲେ ତାହା ଚିରଦିନ ମନେ ରଖିବା।"
    }
  },
  "de": {
    "survivorVoices": [
      {
        "id": "malala-yousafzai",
        "slug": "malala-yousafzai",
        "name": "Malala Yousafzai",
        "displayRole": "Friedensnobelpreisträgerin · Bildungsaktivistin & Mitgründerin des Malala Fund",
        "country": "Pakistan",
        "countryFlag": "🇵🇰",
        "eraOrYear": "1997–Gegenwart · Überlebende des Anschlags von 2012",
        "summary": "Überlebende gezielter extremistischer Gewalt, die ihre Erfahrungen in eine weltweite Bewegung für freie, sichere Bildung von Mädchen und deren Verbindung zu lebenslanger Gesundheit verwandelte.",
        "livedExperienceAndAdvocacy": "Wurde am 9. Oktober 2012 im Swat-Tal in Pakistan auf ihrem Schulbus von Taliban-Kämpfern lebensgefährlich verletzt, nachdem sie sich öffentlich für das Recht von Mädchen auf Bildung eingesetzt hatte. Nach Notoperationen in Birmingham, Großbritannien, überlebte sie und gründete 2013 den Malala Fund, der sich weltweit für 12 Jahre freie Bildung für jedes Kind einsetzt.",
        "societalReformMessage": "Der allgemeine Zugang von Mädchen zu weiterführender Bildung ist die wirksamste Maßnahme für die öffentliche Gesundheit, das Wohlergehen von Müttern und die weltweite Armutsbekämpfung.",
        "verifiedQuote": {
          "quote": "Ein Kind, ein Lehrer, ein Buch und ein Stift können die Welt verändern.",
          "source": "Rede vor der Jugendversammlung der Vereinten Nationen (12. Juli 2013)"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2014 Citation: Malala Yousafzai",
            "url": "https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Malala Fund: Girls' Education and Research Reports",
            "url": "https://malala.org",
            "publisher": "Malala Fund"
          }
        ]
      },
      {
        "id": "nadia-murad",
        "slug": "nadia-murad",
        "name": "Nadia Murad",
        "displayRole": "Friedensnobelpreisträgerin · UNODC-Sonderbotschafterin · Gründerin von Nadia's Initiative",
        "country": "Irak",
        "countryFlag": "🇮🇶",
        "eraOrYear": "1993–Gegenwart · Überlebende des Völkermords an den Jesiden 2014",
        "summary": "Jesidische Menschenrechtsverteidigerin, die der Versklavung durch den IS entkam, weltweite rechtliche Schritte gegen konfliktbezogene sexuelle Gewalt anführte und die ländliche Gesundheitsversorgung wiederaufbaute.",
        "livedExperienceAndAdvocacy": "Im August 2014 überfiel der IS ihr Dorf Kocho in Sindschar, ermordete ihre Mutter und sechs ihrer Brüder und verschleppte Tausende Frauen. Nach ihrer Flucht im November 2014 sprach sie vor dem UN-Sicherheitsrat, schrieb 'Ich bin eure Stimme' und gründete Nadia's Initiative. Sie baute Schulen und Trinkwassernetze wieder auf und eröffnete am 19. Februar 2026 das Sinjar French Medical Center.",
        "societalReformMessage": "Überlebende konfliktbezogener sexueller Gewalt müssen materielle Entschädigungen, traumabewusste medizinische Versorgung und führende Rollen beim Wiederaufbau ihrer Gemeinschaften erhalten.",
        "verifiedQuote": {
          "quote": "Ich möchte das letzte Mädchen auf der Welt sein, das eine Geschichte wie meine zu erzählen hat.",
          "source": "Nobelpreisrede & Internationale Menschenrechtsdiplomatie"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/murad/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Nadia's Initiative: Sinjar French Medical Center Opening (2026)",
            "url": "https://www.nadiasinitiative.org/healthcare",
            "publisher": "Nadia's Initiative"
          }
        ]
      }
    ],
    "consentFramework": {
      "title": "Siebenstufiger Rahmenplan für Zustimmung und Privatsphäre von Überlebenden",
      "description": "UltimateHealth folgt einem ethischen, traumabewussten Verhaltenskodex, der die persönliche Autonomie und die bedingungslose Privatsphäre achtet.",
      "steps": [
        {
          "step": 1,
          "title": "Übermittlung der Geschichte / Ethische Nominierung",
          "detail": "Berichte werden ausschließlich über vertrauliche, verschlüsselte Kanäle oder autorisierte institutionelle Empfehlungen angenommen."
        },
        {
          "step": 2,
          "title": "Erste redaktionelle und sicherheitsrelevante Prüfung",
          "detail": "Unser Redaktionsbeirat prüft jeden Bericht auf Menschenwürde, Bildungsziel und Sicherheitsaspekte."
        },
        {
          "step": 3,
          "title": "Informierte Einwilligung und Wahl der Identität",
          "detail": "Beitragende bestimmen selbst ihre bevorzugte Namensnennung: vollständiger Name, verifiziertes Pseudonym oder anonyme Stimme."
        },
        {
          "step": 4,
          "title": "Faktenprüfung und juristischer Abgleich",
          "detail": "Biografische Daten und historische Ereignisse werden anhand primärer öffentlicher Dokumente ohne Belastung der Betroffenen verifiziert."
        },
        {
          "step": 5,
          "title": "Überprüfung des Entwurfs durch die Beteiligten",
          "detail": "Die Betroffenen prüfen den finalen Text vor der Veröffentlichung und behalten ein absolutes Vetorecht über jedes Wort."
        },
        {
          "step": 6,
          "title": "Finale ethische Freigabe",
          "detail": "Gewährleistung, dass keine reißerische Sprache, keine detaillierte Gewaltdarstellung und keine sensiblen persönlichen Metadaten enthalten sind."
        },
        {
          "step": 7,
          "title": "Laufende Korrekturen und bedingungsloses Rücktrittsrecht",
          "detail": "Beitragende haben das dauerhafte Recht, Angaben zu aktualisieren oder die dauerhafte Entfernung ihres Eintrags zu verlangen."
        }
      ],
      "privacyPledge": [
        "Private Telefonnummern, Wohnadressen oder Standortdaten werden niemals erfasst oder veröffentlicht.",
        "Angaben zu Angehörigen oder Minderjährigen werden ohne ausdrückliche Einwilligung nicht offengelegt.",
        "Erfahrungen werden niemals kommerziell vermarktet oder für Werbezwecke missbraucht."
      ]
    },
    "changemakers": [
      {
        "id": "dr-denis-mukwege",
        "slug": "dr-denis-mukwege",
        "name": "Dr. Denis Mukwege",
        "roleAndField": "Gynäkologischer Chirurg & humanitärer Arzt",
        "organization": "Panzi-Krankenhaus & Stiftung",
        "country": "Demokratische Republik Kongo",
        "countryFlag": "🇨🇩",
        "eraOrYear": "1999–Gegenwart",
        "focusArea": "Rekonstruktive Traumachirurgie & ganzheitliche Heilung für Überlebende von Kriegsgewalt",
        "documentedActions": "Gründete 1999 das Panzi-Krankenhaus in Bukavu und entwickelte ein ganzheitliches Vier-Säulen-Behandlungsmodell aus Chirurgie, Psychotherapie, wirtschaftlicher Hilfe und juristischem Beistand für zehntausende Überlebende sexualisierter Gewalt.",
        "measurableImpact": "Gemeinsam mit Nadia Murad Träger des Friedensnobelpreises 2018; Mitgründer des Global Survivors Fund 2019, der direkte Entschädigungen in weltweiten Krisengebieten bereitstellt.",
        "relevanceToHumanity": "Beweist, wie medizinische Spitzenleistung und unerschütterlicher Mut selbst inmitten schwerster humanitärer Krisen die Würde und körperliche Unversehrtheit wiederherstellen können.",
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/mukwege/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "The Panzi Model of Holistic Healing & Reconstructive Surgery",
            "url": "https://panzifoundation.org",
            "publisher": "Panzi Foundation"
          }
        ]
      },
      {
        "id": "dr-sunitha-krishnan",
        "slug": "dr-sunitha-krishnan",
        "name": "Dr. Sunitha Krishnan",
        "roleAndField": "Sozialreformerin & Pionierin gegen Menschenhandel",
        "organization": "Prajwala",
        "country": "Indien",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1996–Gegenwart",
        "focusArea": "Rettung, Rehabilitation & Wiedereingliederung von Opfern des Menschenhandels",
        "documentedActions": "Gründete 1996 Prajwala in Hyderabad und schuf ein integriertes Hilfsnetzwerk aus Prävention, Rettung, psychologischer Begleitung, Kinderschutz und beruflicher Ausbildung für Überlebende sexueller Ausbeutung.",
        "measurableImpact": "Rettete und rehabilitierte über 24.000 Überlebende des Menschenhandels; prägte maßgeblich die indische Gesetzgebung gegen Menschenhandel; 2016 mit dem Orden Padma Shri geehrt.",
        "relevanceToHumanity": "Zeigt, dass Rettung nur der erste Schritt ist; dauerhafte Freiheit erfordert langfristige seelische Heilung, wirtschaftliche Unabhängigkeit und juristischen Beistand.",
        "references": [
          {
            "title": "Prajwala Institutional Impact & Survivor Rehabilitation Data",
            "url": "https://prajwalaindia.com",
            "publisher": "Prajwala"
          },
          {
            "title": "Government of India Padma Awards Gazette (2016)",
            "url": "https://padmaawards.gov.in",
            "publisher": "Government of India"
          }
        ]
      },
      {
        "id": "dr-abhay-rani-bang",
        "slug": "dr-abhay-rani-bang",
        "name": "Dr. Abhay & Dr. Rani Bang",
        "roleAndField": "Ärzte für öffentliche Gesundheit & klinische Forscher",
        "organization": "SEARCH (Society for Education, Action and Research in Community Health)",
        "country": "Indien",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1986–Gegenwart",
        "focusArea": "Häusliche Neugeborenen- und Kinderpflege (HBNC) & ländliche Chancengleichheit",
        "documentedActions": "Entwickelten im abgelegenen Distrikt Gadchiroli das Modell der häuslichen Neugeborenenversorgung (HBNC), indem sie Dorffrauen (Arogyadoot) ausbildeten, um Neugeboreneninfektionen und Unterkühlung direkt vor Ort zu behandeln.",
        "measurableImpact": "Ihre im Fachjournal The Lancet (1999) veröffentlichte Studie wies einen Rückgang der Säuglingssterblichkeit um 62% nach; das Modell wurde als nationale ASHA-Richtlinie Indiens übernommen und von WHO/UNICEF empfohlen; 2018 mit dem Padma Shri ausgezeichnet.",
        "relevanceToHumanity": "Revolutionierten die dezentrale öffentliche Gesundheit, indem sie lebensrettendes Wissen direkt in die Hände von Frauen und Dorfgemeinschaften legten.",
        "references": [
          {
            "title": "The Lancet: Effect of Home-Based Neonatal Care on Neonatal Mortality",
            "url": "https://www.thelancet.com",
            "publisher": "The Lancet (1999)"
          },
          {
            "title": "SEARCH Gadchiroli Field Research and HBNC Architecture",
            "url": "https://searchgadchiroli.org.in",
            "publisher": "SEARCH"
          }
        ]
      }
    ],
    "societalLessons": [
      {
        "theme": "Sicherheit im Gesundheitswesen",
        "whatWeCanImprove": "Krankenhäuser, Bereitschaftsräume und Notaufnahmen durch Einlasskontrollen und Schutzprotokolle sichern.",
        "actionableInitiatives": [
          "Verpflichtende, abgeschlossene und gut beleuchtete Ruheräume für diensthabendes Personal",
          "Notrufknöpfe und geschultes Sicherheitspersonal rund um die Uhr in Notaufnahmen",
          "Verpflichtende polizeiliche Sicherheitskontrollen für gewaltbereite Patienten in Gewahrsam"
        ],
        "profilesRef": [
          "Dr. Moumita Debnath",
          "Aruna Shanbaug",
          "Dr. Sarita Toshniwal",
          "Dr. Vandana Das",
          "Dr. Tamara O'Neal"
        ]
      },
      {
        "theme": "Schutz von Frauen",
        "whatWeCanImprove": "Verkehrsinfrastruktur ausbauen, häusliche Gewalt bekämpfen und institutionelle Verantwortung stärken.",
        "actionableInitiatives": [
          "GPS-überwachte, beleuchtete Nahverkehrsnetze und überprüfte Fahrerdaten",
          "Frühzeitige Aufklärung über Warnsignale häuslicher Einschüchterung und Kontrollverhalten",
          "Unabhängige Bürgerprüfungen für Sicherheit an Haltestellen und Straßen"
        ],
        "profilesRef": [
          "Jyoti Singh",
          "Sarah Everard",
          "Reeva Steenkamp",
          "Anene Booysen",
          "Mahsa Amini"
        ]
      },
      {
        "theme": "Kinderschutz",
        "whatWeCanImprove": "Zugänglicher Schutz, Frühwarnsysteme und diskriminierungsfreie Unterstützung für alle Kinder.",
        "actionableInitiatives": [
          "Traumasensible Vorsorgeuntersuchungen in Kinderarztpraxen",
          "Sichere Spiel- und Begegnungsorte in benachteiligten Wohngebieten",
          "Beschleunigte Gerichtsverfahren mit vollständigem Zeugenschutz für Kinder"
        ],
        "profilesRef": [
          "Das Kind aus Kathua",
          "Anene Booysen",
          "Anne Frank"
        ]
      },
      {
        "theme": "Bildung & Alphabetisierung",
        "whatWeCanImprove": "Chancengleicher Zugang zu 12 Jahren hochwertiger Schulbildung für jedes Mädchen weltweit.",
        "actionableInitiatives": [
          "Beseitigung wirtschaftlicher und baulicher Hürden beim Schulbesuch",
          "Schulische Aufklärung über Menstruationshygiene und seelische Gesundheit",
          "Gemeinschaftlicher Schutz von Lehrerinnen und Schülerinnen in ländlichen Gebieten"
        ],
        "profilesRef": [
          "Malala Yousafzai",
          "Anne Frank",
          "Sophie Scholl"
        ]
      },
      {
        "theme": "Journalismus & Wahrheit",
        "whatWeCanImprove": "Unabhängige Berichterstattung vor Einschüchterungsklagen schützen und Informationsfreiheit bewahren.",
        "actionableInitiatives": [
          "Anti-SLAPP-Gesetze gegen missbräuchliche Klagen zur Einschüchterung von Reportern",
          "Notfallfonds für digitale Sicherheit und Rettung gefährdeter Journalisten",
          "Weltweite Anerkennung und Respektierung der 'PRESS'-Schutzkennzeichnung"
        ],
        "profilesRef": [
          "Daphne Caruana Galizia",
          "Anna Politkovskaya",
          "Veronica Guerin",
          "Shireen Abu Akleh",
          "Gauri Lankesh"
        ]
      },
      {
        "theme": "Umweltgerechtigkeit",
        "whatWeCanImprove": "Indigene und lokale Gemeinschaften bei Land- und Umweltentscheidungen voll einbinden.",
        "actionableInitiatives": [
          "Verbindliche Einholung freier, vorheriger und informierter Zustimmung (FPIC)",
          "Sofortiges Ende missbräuchlicher Strafverfolgung gegen friedliche Umweltschützer",
          "Bürgergeführte Umweltmessungen zu Schadstoffen und Gewässerschutz"
        ],
        "profilesRef": [
          "Berta Cáceres",
          "Marielle Franco",
          "Aysim Büyüknohutçu",
          "Efigenia Vásquez Astudillo",
          "Emilsen Manyoma",
          "Leonila Tapdasan Pesadilla",
          "Laura Leonor Vásquez Pineda",
          "Jane Júlia de Oliveira"
        ]
      },
      {
        "theme": "Menschenrechte & Würde",
        "whatWeCanImprove": "Körperliche Selbstbestimmung und Gleichheit vor dem Gesetz ungeachtet von Herkunft und Geschlecht.",
        "actionableInitiatives": [
          "Entkopplung von Bürgerrechten von autoritärer Sitten- und Moralpolizei",
          "Gleicher Zugang zu politischer Mitbestimmung für marginalisierte Gruppen",
          "Schutzmechanismen gegen religiöse und ethnische Diskriminierung im öffentlichen Dienst"
        ],
        "profilesRef": [
          "Mahsa Amini",
          "Sophie Scholl",
          "Marielle Franco",
          "Qandeel Baloch"
        ]
      },
      {
        "theme": "Seelische & Soziale Rehabilitation",
        "whatWeCanImprove": "Dauerhafte medizinische, psychologische und wirtschaftliche Unterstützung für Überlebende.",
        "actionableInitiatives": [
          "Zufluchtshäuser mit medizinischer und juristischer Betreuung",
          "Spezialisierte Traumatherapie für Überlebende von Kriegsgewalt und Menschenhandel",
          "Direkte Leitung von Hilfsfonds durch die Überlebenden selbst"
        ],
        "profilesRef": [
          "Yanar Mohammed",
          "Nadia Murad",
          "Malala Yousafzai"
        ]
      },
      {
        "theme": "Institutionelle Gerechtigkeit",
        "whatWeCanImprove": "Transparente Untersuchungen und zügige Gerichtsverfahren ohne politische Einflussnahme.",
        "actionableInitiatives": [
          "Unabhängige Kontrollkommissionen für Sicherheitsmängel an Kliniken",
          "Beschlagnahme unrechtmäßig erlangter Vermögenswerte aus kriminellen Handlungen",
          "Null-Toleranz gegenüber Straflosigkeit bei Fehlverhalten von Sicherheitskräften"
        ],
        "profilesRef": [
          "Dr. Moumita Debnath",
          "Aruna Shanbaug",
          "Veronica Guerin",
          "Sarah Everard"
        ]
      },
      {
        "theme": "Gesellschaftliche Verantwortung",
        "whatWeCanImprove": "Mut zum sicheren Eingreifen bei Notfällen und das Brechen von Gleichgültigkeit.",
        "actionableInitiatives": [
          "Trainings für zivilcouragiertes Eingreifen in Schulen und Betrieben",
          "Nachbarschaftliche Hilfsnetzwerke für Betroffene häuslicher Bedrohungen",
          "Aufklärungskampagnen gegen die Verharmlosung von Belästigungen im öffentlichen Raum"
        ],
        "profilesRef": [
          "Anene Booysen",
          "Jyoti Singh",
          "Sarah Everard"
        ]
      }
    ],
    "editorialPromise": [
      "Keine reißerischen oder detaillierten Darstellungen von Gewalt und Leid.",
      "Strikte Vermeidung sensationsheischender Schlagzeilen auf Kosten menschlicher Schicksale.",
      "Keine unbestätigten Anschuldigungen — alle Angaben sind mit Primärquellen belegt.",
      "Klare Trennung zwischen belegbaren Fakten, Gerichtsurteilen und Bildungsinitiativen.",
      "Lebende Überlebende werden als gestaltende Führungspersönlichkeiten geehrt.",
      "Schutz sensibler Daten gemäß gerichtlichen Vorgaben (wie Urteil Nipun Saxena).",
      "Transparente Nachverfolgung des Prüfstatus und direkte Links zu Originalquellen.",
      "Offene Kennzeichnung ungelöster Fragen statt ungeprüfter Behauptungen.",
      "Keine politische oder religiöse Vorverurteilung von Bevölkerungsgruppen.",
      "Bedingungsloser Einsatz für Menschenwürde, Wahrheit und institutionelle Sicherheit."
    ],
    "endingManifesto": {
      "headline": "Die Welt braucht nicht nur Denkmäler.\nSie braucht mehr Menschlichkeit.",
      "paragraphs": [
        "Manche wollten Ärztinnen und Ärzte werden. Manche wollten Kinder unterrichten. Manche wollten Wälder schützen, die Wahrheit aufdecken oder den Schwachen eine Stimme geben.",
        "Ihre Leben erinnern uns daran, dass hinter jedem Namen ein Mensch mit Träumen, Beziehungen, Pflichten und unendlichen Möglichkeiten stand.",
        "Wir können ihre Vergangenheit nicht umschreiben. Aber wir können ihren Schicksalen Sinn verleihen, indem wir die Systeme um uns herum verbessern, Schwache schützen, Bildung fördern, Würde achten und niemals gleichgültig gegenüber dem Leiden bleiben."
      ],
      "finalCallout": "Erinnern wir uns an sie nicht nur dafür, wie sie diese Welt verlassen mussten. Erinnern wir uns an sie dafür, was sie dieser Welt schenken wollten."
    }
  },
  "es": {
    "survivorVoices": [
      {
        "id": "malala-yousafzai",
        "slug": "malala-yousafzai",
        "name": "Malala Yousafzai",
        "displayRole": "Premio Nobel de la Paz · Defensora de la educación y cofundadora de Malala Fund",
        "country": "Pakistán",
        "countryFlag": "🇵🇰",
        "eraOrYear": "1997–Presente · Sobreviviente del atentado de 2012",
        "summary": "Sobreviviente de violencia extremista que convirtió su testimonio en un movimiento global por la educación gratuita, segura y de calidad para las niñas y su vínculo con la salud.",
        "livedExperienceAndAdvocacy": "El 9 de octubre de 2012 fue víctima de un atentado talibán en el valle de Swat tras defender públicamente la escolarización femenina en la BBC Urdu. Tras someterse a neurocirugías en el Reino Unido, cofundó el Malala Fund en 2013, promoviendo 12 años de educación gratuita y segura en América Latina, África y el sur de Asia.",
        "societalReformMessage": "El acceso universal de las niñas a la educación secundaria es la medida más transformadora para la salud pública, el bienestar materno y la erradicación de la pobreza.",
        "verifiedQuote": {
          "quote": "Un niño, un maestro, un libro y un lápiz pueden cambiar el mundo.",
          "source": "Discurso ante la Asamblea de Jóvenes de las Naciones Unidas (12 de julio de 2013)"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2014 Citation: Malala Yousafzai",
            "url": "https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Malala Fund: Girls' Education and Research Reports",
            "url": "https://malala.org",
            "publisher": "Malala Fund"
          }
        ]
      },
      {
        "id": "nadia-murad",
        "slug": "nadia-murad",
        "name": "Nadia Murad",
        "displayRole": "Premio Nobel de la Paz · Embajadora de Buena Voluntad de la UNODC · Fundadora de Nadia's Initiative",
        "country": "Irak",
        "countryFlag": "🇮🇶",
        "eraOrYear": "1993–Presente · Sobreviviente del genocidio yazidí de 2014",
        "summary": "Defensora yazidí de derechos humanos que escapó del cautiverio del ISIS y lideró la cruzada legal para tipificar la violencia sexual bélica como crimen de guerra, reconstruyendo la salud pública en Sinyar.",
        "livedExperienceAndAdvocacy": "En agosto de 2014 el ISIS asaltó Kocho, asesinando a su madre y seis hermanos y esclavizando a miles de mujeres. Huyó en noviembre de 2014 con el auxilio de una familia suní, testificó ante el Consejo de Seguridad de la ONU, fundó Nadia's Initiative, rehabilitó colegios y redes de agua, e inauguró el Sinjar French Medical Center el 19 de febrero de 2026.",
        "societalReformMessage": "Las víctimas de violencia sexual en guerras deben recibir reparaciones materiales, atención psicológica y un papel de liderazgo en la reconstrucción comunitaria.",
        "verifiedQuote": {
          "quote": "Quiero ser la última niña en el mundo con una historia como la mía.",
          "source": "Discurso de Aceptación del Premio Nobel y Foros Globales de Derechos Humanos"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/murad/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Nadia's Initiative: Sinjar French Medical Center Opening (2026)",
            "url": "https://www.nadiasinitiative.org/healthcare",
            "publisher": "Nadia's Initiative"
          }
        ]
      }
    ],
    "consentFramework": {
      "title": "Protocolo de siete pasos sobre consentimiento y privacidad de sobrevivientes",
      "description": "UltimateHealth mantiene una norma editorial ética e informada en el trauma que respeta la autonomía personal y la privacidad incondicional.",
      "steps": [
        {
          "step": 1,
          "title": "Envío de testimonios / Postulación ética",
          "detail": "Las historias se reciben exclusivamente a través de canales confidenciales cifrados o derivaciones institucionales formales."
        },
        {
          "step": 2,
          "title": "Evaluación editorial inicial y de seguridad",
          "detail": "Nuestro consejo editorial analiza cada propuesta para asegurar la dignidad humana y evitar cualquier riesgo personal para los involucrados."
        },
        {
          "step": 3,
          "title": "Consentimiento informado y selección de identidad",
          "detail": "Los colaboradores definen su nivel de atribución pública: nombre completo, seudónimo verificado o voz comunitaria anónima."
        },
        {
          "step": 4,
          "title": "Verificación de hechos y cotejo documental",
          "detail": "Los datos biográficos se corroboran con documentos primarios oficiales sin imponer cargas inquisitivas a los declarantes."
        },
        {
          "step": 5,
          "title": "Revisión final del borrador por el colaborador",
          "detail": "La persona afectada revisa el texto antes de publicarlo y retiene poder de veto absoluto sobre cada palabra y fecha."
        },
        {
          "step": 6,
          "title": "Aprobación ética final",
          "detail": "Se verifica el estricto cumplimiento ético: cero sensacionalismo, ausencia de detalles gráficos y omisión de metadatos privados."
        },
        {
          "step": 7,
          "title": "Actualización continua y derecho de retiro incondicional",
          "detail": "Los colaboradores conservan el derecho perpetuo de actualizar datos o exigir la retirada definitiva de su testimonio."
        }
      ],
      "privacyPledge": [
        "Nunca se registran ni divulgan números de teléfono, domicilios ni datos de ubicación geográfica.",
        "No se revela la identidad de familiares ni menores sin consentimiento independiente explícito.",
        "Los testimonios de vida jamás se monetizan ni se utilizan para promoción publicitaria comercial."
      ]
    },
    "changemakers": [
      {
        "id": "dr-denis-mukwege",
        "slug": "dr-denis-mukwege",
        "name": "Dr. Denis Mukwege",
        "roleAndField": "Cirujano ginecológico y médico humanitario",
        "organization": "Hospital y Fundación Panzi",
        "country": "República Democrática del Congo",
        "countryFlag": "🇨🇩",
        "eraOrYear": "1999–Presente",
        "focusArea": "Cirugía reparadora de trauma y sanación integral para sobrevivientes de violencia bélica",
        "documentedActions": "Fundó el Hospital Panzi en Bukavu (1999), creando un modelo de atención integral de cuatro pilares (médico, psicológico, socioeconómico y legal) que ha atendido a decenas de miles de víctimas de violencia sexual bélica.",
        "measurableImpact": "Premio Nobel de la Paz 2018 junto a Nadia Murad; cofundador del Fondo Global de Sobrevivientes en 2019, que entrega reparaciones inmediatas en múltiples zonas de guerra.",
        "relevanceToHumanity": "Demuestra cómo la excelencia quirúrgica unida al valor ético puede restaurar la dignidad humana y la integridad corporal en crisis humanitarias complejas.",
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/mukwege/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "The Panzi Model of Holistic Healing & Reconstructive Surgery",
            "url": "https://panzifoundation.org",
            "publisher": "Panzi Foundation"
          }
        ]
      },
      {
        "id": "dr-sunitha-krishnan",
        "slug": "dr-sunitha-krishnan",
        "name": "Dra. Sunitha Krishnan",
        "roleAndField": "Reformadora social y pionera contra la trata de personas",
        "organization": "Prajwala",
        "country": "India",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1996–Presente",
        "focusArea": "Rescate, rehabilitación y reintegración de sobrevivientes de trata de personas",
        "documentedActions": "Cofundó Prajwala en Hyderabad en 1996, estableciendo un programa integral de prevención, rescate, apoyo psicológico, protección infantil y capacitación laboral para víctimas de explotación sexual.",
        "measurableImpact": "Ha rescatado y rehabilitado a más de 24.000 sobrevivientes; impulsó reformas legislativas clave contra la trata en la India; condecorada con el Padma Shri en 2016.",
        "relevanceToHumanity": "Demuestra que el rescate solo es el inicio; la verdadera libertad requiere recuperación psicológica, autonomía económica y firme defensa jurídica.",
        "references": [
          {
            "title": "Prajwala Institutional Impact & Survivor Rehabilitation Data",
            "url": "https://prajwalaindia.com",
            "publisher": "Prajwala"
          },
          {
            "title": "Government of India Padma Awards Gazette (2016)",
            "url": "https://padmaawards.gov.in",
            "publisher": "Government of India"
          }
        ]
      },
      {
        "id": "dr-abhay-rani-bang",
        "slug": "dr-abhay-rani-bang",
        "name": "Dr. Abhay y Dra. Rani Bang",
        "roleAndField": "Médicos de salud pública e investigadores clínicos",
        "organization": "SEARCH (Society for Education, Action and Research in Community Health)",
        "country": "India",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1986–Presente",
        "focusArea": "Atención domiciliaria neonatal e infantil (HBNC) y equidad sanitaria rural",
        "documentedActions": "En el distrito tribal de Gadchiroli desarrollaron el modelo de atención domiciliaria neonatal (HBNC), capacitando a mujeres de las aldeas (Arogyadoot) para diagnosticar infecciones y tratar recién nacidos en sus propios hogares.",
        "measurableImpact": "Su ensayo publicado en The Lancet (1999) demostró una reducción del 62% en la mortalidad infantil; el modelo fue adoptado en la India como norma nacional del programa ASHA y recomendado por la OMS/UNICEF; galardonados con el Padma Shri en 2018.",
        "relevanceToHumanity": "Revolucionaron la salud pública basada en evidencias al poner el conocimiento médico vital en manos de las propias mujeres de las comunidades rurales.",
        "references": [
          {
            "title": "The Lancet: Effect of Home-Based Neonatal Care on Neonatal Mortality",
            "url": "https://www.thelancet.com",
            "publisher": "The Lancet (1999)"
          },
          {
            "title": "SEARCH Gadchiroli Field Research and HBNC Architecture",
            "url": "https://searchgadchiroli.org.in",
            "publisher": "SEARCH"
          }
        ]
      }
    ],
    "societalLessons": [
      {
        "theme": "Seguridad en el sector sanitario",
        "whatWeCanImprove": "Fortalecer hospitales, dormitorios de guardia y salas de urgencias mediante controles biométricos y protocolos de seguridad.",
        "actionableInitiatives": [
          "Dormitorios de guardia seguros, cerrados e iluminados para médicos y personal de enfermería",
          "Botones de pánico y seguridad entrenada las 24 horas en áreas de urgencias",
          "Protocolos de contención policial obligatorios para pacientes bajo custodia en estado violento"
        ],
        "profilesRef": [
          "Dra. Moumita Debnath",
          "Aruna Shanbaug",
          "Dra. Sarita Toshniwal",
          "Dra. Vandana Das",
          "Dra. Tamara O'Neal"
        ]
      },
      {
        "theme": "Seguridad para las mujeres",
        "whatWeCanImprove": "Optimizar el transporte público, prevenir el maltrato doméstico e imponer estricta responsabilidad institucional.",
        "actionableInitiatives": [
          "Corredores de transporte público monitoreados por GPS e iluminados con choferes certificados",
          "Educación comunitaria sobre control coercitivo y señales tempranas de violencia intrafamiliar",
          "Auditorías ciudadanas independientes en paradas nocturnas y parques públicos"
        ],
        "profilesRef": [
          "Jyoti Singh",
          "Sarah Everard",
          "Reeva Steenkamp",
          "Anene Booysen",
          "Mahsa Amini"
        ]
      },
      {
        "theme": "Protección de la infancia",
        "whatWeCanImprove": "Garantizar protección accesible, denuncias rápidas y apoyo sin discriminación para cada menor.",
        "actionableInitiatives": [
          "Exámenes pediátricos sistemáticos informados en el trauma en centros de salud",
          "Entornos comunitarios recreativos seguros y bienestar infantil en zonas vulnerables",
          "Juicios en tribunales rápidos con plena protección de identidad para testigos menores"
        ],
        "profilesRef": [
          "La niña de Kathua",
          "Anene Booysen",
          "Ana Frank"
        ]
      },
      {
        "theme": "Educación y alfabetización",
        "whatWeCanImprove": "Acceso universal a 12 años de educación formal y salud integral para todas las niñas.",
        "actionableInitiatives": [
          "Eliminación total de obstáculos socioeconómicos para la asistencia escolar",
          "Contenidos escolares sobre higiene menstrual y salud mental en la adolescencia",
          "Protección vecinal para maestras y estudiantes en áreas rurales tradicionales"
        ],
        "profilesRef": [
          "Malala Yousafzai",
          "Ana Frank",
          "Sophie Scholl"
        ]
      },
      {
        "theme": "Periodismo y verdad",
        "whatWeCanImprove": "Proteger la prensa independiente frente al acoso judicial y asegurar el derecho ciudadano a la información.",
        "actionableInitiatives": [
          "Legislación anti-SLAPP para frenar demandas judiciales intimidatorias contra periodistas",
          "Fondos de evacuación y ciberseguridad para reporteros en situaciones de amenaza",
          "Respeto universal de las fuerzas de seguridad al distintivo protector 'PRESS'"
        ],
        "profilesRef": [
          "Daphne Caruana Galizia",
          "Anna Politkovskaya",
          "Veronica Guerin",
          "Shireen Abu Akleh",
          "Gauri Lankesh"
        ]
      },
      {
        "theme": "Justicia ambiental",
        "whatWeCanImprove": "Asegurar el consentimiento libre, previo e informado de las comunidades indígenas en proyectos de desarrollo.",
        "actionableInitiatives": [
          "Cumplimiento obligatorio del consentimiento informado (FPIC) antes de licencias mineras",
          "Cese inmediato de la criminalización de defensores pacíficos de la tierra",
          "Monitoreo ambiental vecinal para medir contaminación de aguas y metales pesados"
        ],
        "profilesRef": [
          "Berta Cáceres",
          "Marielle Franco",
          "Aysim Büyüknohutçu",
          "Efigenia Vásquez Astudillo",
          "Emilsen Manyoma",
          "Leonila Tapdasan Pesadilla",
          "Laura Leonor Vásquez Pineda",
          "Jane Júlia de Oliveira"
        ]
      },
      {
        "theme": "Derechos humanos y dignidad",
        "whatWeCanImprove": "Garantizar la autonomía corporal y la igualdad jurídica sin distinción de género, fe o raza.",
        "actionableInitiatives": [
          "Desvincular la movilidad pública y los derechos civiles de la vigilancia moral autoritaria",
          "Acceso equitativo a cargos de representación para sectores marginados",
          "Normas institucionales contra el sectarismo y la discriminación en dependencias públicas"
        ],
        "profilesRef": [
          "Mahsa Amini",
          "Sophie Scholl",
          "Marielle Franco",
          "Qandeel Baloch"
        ]
      },
      {
        "theme": "Rehabilitación mental y social",
        "whatWeCanImprove": "Brindar atención médica, psicológica y laboral integral y a largo plazo a sobrevivientes y familias.",
        "actionableInitiatives": [
          "Casas de acogida seguras con servicios médicos y de asesoramiento jurídico",
          "Tratamiento especializado del trauma para víctimas de violencia sexual en conflictos",
          "Gestión directa de los fondos de recuperación por parte de las propias víctimas"
        ],
        "profilesRef": [
          "Yanar Mohammed",
          "Nadia Murad",
          "Malala Yousafzai"
        ]
      },
      {
        "theme": "Justicia institucional",
        "whatWeCanImprove": "Investigaciones transparentes y juicios imparciales sin interferencia económica ni política.",
        "actionableInitiatives": [
          "Comisiones judiciales de inspección sobre fallas de seguridad laboral en hospitales",
          "Incautación de patrimonios ilícitos procedentes de actividades delictivas",
          "Tolerancia cero contra la impunidad en abusos cometidos por agentes del Estado"
        ],
        "profilesRef": [
          "Dra. Moumita Debnath",
          "Aruna Shanbaug",
          "Veronica Guerin",
          "Sarah Everard"
        ]
      },
      {
        "theme": "Responsabilidad comunitaria",
        "whatWeCanImprove": "Fomentar la solidaridad vecinal y la intervención segura para auxiliar a personas en peligro.",
        "actionableInitiatives": [
          "Capacitación en intervención activa de testigos en centros educativos y laborales",
          "Redes barriales de apoyo mutuo para víctimas de amenazas intrafamiliares",
          "Campañas de concientización comunitaria contra el acoso callejero"
        ],
        "profilesRef": [
          "Anene Booysen",
          "Jyoti Singh",
          "Sarah Everard"
        ]
      }
    ],
    "editorialPromise": [
      "Prohibición de imágenes o descripciones morbosas o sensacionalistas de violencia.",
      "Rechazo absoluto de titulares llamativos creados para mercantilizar el dolor ajeno.",
      "Cero acusaciones sin fundamento: cotejo estricto de todos los datos con archivos judiciales.",
      "Distinción clara entre hechos históricos verificados y propuestas de acción institucional.",
      "Reconocimiento de líderes sobrevivientes como sujetos activos de cambio, no como víctimas pasivas.",
      "Cumplimiento riguroso de normativas judiciales sobre confidencialidad (caso Nipun Saxena).",
      "Publicación transparente de estados de verificación, fechas de auditoría y fuentes primarias.",
      "Reconocimiento expreso de aspectos bajo investigación judicial en lugar de darlos por resueltos.",
      "Tratamiento imparcial sin estigmatizaciones políticas, religiosas ni comunitarias.",
      "Compromiso inquebrantable con la verdad, la dignidad humana y la seguridad colectiva."
    ],
    "endingManifesto": {
      "headline": "El mundo no necesita únicamente monumentos.\nNecesita más humanidad.",
      "paragraphs": [
        "Algunas personas querían ser doctoras. Otras querían enseñar a los niños. Algunas querían proteger los bosques, contar la verdad o ser la voz de quienes no la tenían.",
        "Sus vidas nos recuerdan que detrás de cada nombre hay un ser humano lleno de sueños, afectos, responsabilidades y posibilidades truncadas.",
        "No podemos reescribir su pasado. Pero podemos dar sentido a su memoria reformando los sistemas sociales, cuidando a los vulnerables, apoyando la educación y negándonos a ser indiferentes ante el sufrimiento."
      ],
      "finalCallout": "No los recordemos solo por la forma en que tuvieron que dejar este mundo. Recordémoslos por todo aquello que soñaban aportar a la humanidad."
    }
  },
  "fr": {
    "survivorVoices": [
      {
        "id": "malala-yousafzai",
        "slug": "malala-yousafzai",
        "name": "Malala Yousafzai",
        "displayRole": "Prix Nobel de la Paix · Défenseure de l'éducation et cofondatrice du Malala Fund",
        "country": "Pakistan",
        "countryFlag": "🇵🇰",
        "eraOrYear": "1997–Présent · Survivante de l'attaque de 2012",
        "summary": "Survivante de violences extrémistes ayant transformé son épreuve en un plaidoyer mondial pour l'accès des filles à une éducation gratuite, sûre et de qualité liée à la santé.",
        "livedExperienceAndAdvocacy": "Prise pour cible le 9 octobre 2012 dans la vallée de Swat pour avoir tenu un blog sur BBC Urdu défendant la scolarisation des filles, elle a survécu à ses blessures par balle après des soins d'urgence au Royaume-Uni. Elle a cofondé le Malala Fund en 2013, plaidant pour 12 ans de scolarité garantie dans le monde entier.",
        "societalReformMessage": "L'accès universel des filles à l'enseignement secondaire est le levier le plus puissant pour la santé publique, le bien-être maternel et l'éradication de la pauvreté.",
        "verifiedQuote": {
          "quote": "Un enfant, un enseignant, un livre et un stylo peuvent changer le monde.",
          "source": "Discours devant l'Assemblée des jeunes des Nations Unies (12 juillet 2013)"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2014 Citation: Malala Yousafzai",
            "url": "https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Malala Fund: Girls' Education and Research Reports",
            "url": "https://malala.org",
            "publisher": "Malala Fund"
          }
        ]
      },
      {
        "id": "nadia-murad",
        "slug": "nadia-murad",
        "name": "Nadia Murad",
        "displayRole": "Prix Nobel de la Paix · Ambassadrice de bonne volonté de l'ONUDC · Fondatrice de Nadia's Initiative",
        "country": "Irak",
        "countryFlag": "🇮🇶",
        "eraOrYear": "1993–Présent · Survivante du génocide yézidi de 2014",
        "summary": "Militante yézidie des droits humains ayant fui la captivité de Daech pour mener le combat juridique contre les viols de guerre et rebâtir les infrastructures de santé au Sinjar.",
        "livedExperienceAndAdvocacy": "En août 2014, Daech a envahi son village de Kocho, exécutant sa mère et six frères et réduisant en esclavage des milliers de femmes. Évadée en novembre 2014 avec l'aide d'une famille sunnite, elle a témoigné à l'ONU, fondé Nadia's Initiative, réhabilité des écoles et ouvert le Sinjar French Medical Center le 19 février 2026.",
        "societalReformMessage": "Les victimes de violences sexuelles en temps de guerre doivent obtenir des réparations directes, un suivi psychologique digne et un rôle moteur dans la reconstruction de leurs terres.",
        "verifiedQuote": {
          "quote": "Je veux être la dernière jeune fille au monde à avoir une histoire semblable à la mienne.",
          "source": "Discours de réception du Prix Nobel et Plaidoyers Internationaux"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/murad/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Nadia's Initiative: Sinjar French Medical Center Opening (2026)",
            "url": "https://www.nadiasinitiative.org/healthcare",
            "publisher": "Nadia's Initiative"
          }
        ]
      }
    ],
    "consentFramework": {
      "title": "Protocole en sept étapes pour le consentement et la confidentialité des survivants",
      "description": "UltimateHealth applique une charte éditoriale éthique et bienveillante respectant l'autonomie et l'intimité inconditionnelle de chaque personne.",
      "steps": [
        {
          "step": 1,
          "title": "Transmission du témoignage / Proposition éthique",
          "detail": "Les témoignages sont transmis exclusivement par des canaux sécurisés chiffrés ou des partenariats institutionnels formels."
        },
        {
          "step": 2,
          "title": "Examen éditorial initial et évaluation de sécurité",
          "detail": "Notre comité éditorial examine chaque proposition afin de garantir le respect de la dignité et la sécurité des personnes concernées."
        },
        {
          "step": 3,
          "title": "Consentement éclairé et choix de l'attribution",
          "detail": "Les témoins déterminent eux-mêmes leur mode de désignation : identité complète, pseudonyme officiel ou parole anonyme."
        },
        {
          "step": 4,
          "title": "Vérification des faits et recoupement médicolégal",
          "detail": "Les données biographiques sont vérifiées à l'aide d'archives judiciaires publiques sans imposer d'interrogatoire aux victimes."
        },
        {
          "step": 5,
          "title": "Relecture préalable par la personne concernée",
          "detail": "Le texte final est soumis à validation et la personne dispose d'un droit de veto souverain sur chaque terme avant parution."
        },
        {
          "step": 6,
          "title": "Validation éthique finale",
          "detail": "Contrôle strict interdisant tout sensationnalisme, tout détail visuel traumatique et toute métadonnée personnelle non indispensable."
        },
        {
          "step": 7,
          "title": "Droit de modification et de retrait inconditionnel",
          "detail": "Les contributeurs conservent à tout moment le droit inaliénable de corriger leurs données ou d'exiger la suppression définitive de l'article."
        }
      ],
      "privacyPledge": [
        "Aucun numéro de téléphone privé, adresse de domicile ou donnée de localisation n'est collecté ni diffusé.",
        "Aucune identification de proches ou d'enfants mineurs n'est divulguée sans accord préalable exprès.",
        "Les récits vécus ne sont jamais monétisés ni exploités à des fins commerciales ou publicitaires."
      ]
    },
    "changemakers": [
      {
        "id": "dr-denis-mukwege",
        "slug": "dr-denis-mukwege",
        "name": "Dr Denis Mukwege",
        "roleAndField": "Chirurgien gynécologique et médecin humanitaire",
        "organization": "Hôpital et Fondation Panzi",
        "country": "République démocratique du Congo",
        "countryFlag": "🇨🇩",
        "eraOrYear": "1999–Présent",
        "focusArea": "Chirurgie réparatrice des traumatismes et prise en charge globale des victimes de guerre",
        "documentedActions": "A fondé l'hôpital Panzi à Bukavu en 1999, élaborant un modèle thérapeutique complet en quatre volets (médical, psychologique, socio-économique et juridique) ayant soigné des dizaines de milliers de victimes de viols de guerre.",
        "measurableImpact": "Lauréat du Prix Nobel de la Paix 2018 avec Nadia Murad ; cofondateur en 2019 du Fonds mondial pour les survivantes, assurant des réparations d'urgence en zones de crise.",
        "relevanceToHumanity": "Incarnation exemplaire de la façon dont l'excellence chirurgicale alliée au courage moral rétablit la dignité humaine au cœur des pires désastres humanitaires.",
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/mukwege/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "The Panzi Model of Holistic Healing & Reconstructive Surgery",
            "url": "https://panzifoundation.org",
            "publisher": "Panzi Foundation"
          }
        ]
      },
      {
        "id": "dr-sunitha-krishnan",
        "slug": "dr-sunitha-krishnan",
        "name": "Dre Sunitha Krishnan",
        "roleAndField": "Réformatrice sociale et pionnière de la lutte contre la traite",
        "organization": "Prajwala",
        "country": "Inde",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1996–Présent",
        "focusArea": "Secours, réhabilitation et réinsertion des personnes victimes de traite humaine",
        "documentedActions": "A cofondé Prajwala à Hyderabad en 1996, mettant en place un dispositif intégré de prévention, d'extraction, de soins psychologiques et de formation professionnelle pour les personnes libérées de l'exploitation sexuelle.",
        "measurableImpact": "A secouru et accompagné plus de 24 000 personnes ; a influencé les réformes législatives nationales contre la traite en Inde ; honorée du Padma Shri en 2016.",
        "relevanceToHumanity": "Prouve que la libération n'est que la première étape : l'émancipation durable exige une reconstruction psychique, l'autonomie matérielle et un combat judiciaire continu.",
        "references": [
          {
            "title": "Prajwala Institutional Impact & Survivor Rehabilitation Data",
            "url": "https://prajwalaindia.com",
            "publisher": "Prajwala"
          },
          {
            "title": "Government of India Padma Awards Gazette (2016)",
            "url": "https://padmaawards.gov.in",
            "publisher": "Government of India"
          }
        ]
      },
      {
        "id": "dr-abhay-rani-bang",
        "slug": "dr-abhay-rani-bang",
        "name": "Dr Abhay et Dre Rani Bang",
        "roleAndField": "Médecins de santé publique et chercheurs cliniques",
        "organization": "SEARCH (Society for Education, Action and Research in Community Health)",
        "country": "Inde",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1986–Présent",
        "focusArea": "Soins néonatals à domicile (HBNC) et équité des soins en milieu rural",
        "documentedActions": "Ont conçu dans le district forestier de Gadchiroli le programme de soins néonatals communautaires (HBNC), formant des villageoises (Arogyadoot) au diagnostic et au traitement de l'hypothermie et des infections néonatales à domicile.",
        "measurableImpact": "Leur étude publiée dans The Lancet (1999) a mis en évidence une chute de 62 % de la mortalité infantile ; le modèle est devenu la référence du programme national ASHA en Inde et a été adopté par l'OMS et l'UNICEF ; récipiendaires du Padma Shri en 2018.",
        "relevanceToHumanity": "Ont révolutionné la santé publique de terrain en transmettant des savoirs médicaux vitaux directement aux femmes des communautés rurales isolées.",
        "references": [
          {
            "title": "The Lancet: Effect of Home-Based Neonatal Care on Neonatal Mortality",
            "url": "https://www.thelancet.com",
            "publisher": "The Lancet (1999)"
          },
          {
            "title": "SEARCH Gadchiroli Field Research and HBNC Architecture",
            "url": "https://searchgadchiroli.org.in",
            "publisher": "SEARCH"
          }
        ]
      }
    ],
    "societalLessons": [
      {
        "theme": "Sécurité hospitalière",
        "whatWeCanImprove": "Sécuriser les hôpitaux, les salles de garde et les urgences par des accès biométriques et des protocoles de protection stricts.",
        "actionableInitiatives": [
          "Salles de repos sécurisées, verrouillées et éclairées pour les soignants de garde",
          "Boutons d'alerte et présence continue d'agents formés dans les services d'urgence",
          "Contrôles de police systématiques pour les personnes amenées sous contrainte ou agressives"
        ],
        "profilesRef": [
          "Dre Moumita Debnath",
          "Aruna Shanbaug",
          "Dre Sarita Toshniwal",
          "Dre Vandana Das",
          "Dre Tamara O'Neal"
        ]
      },
      {
        "theme": "Protection des femmes",
        "whatWeCanImprove": "Améliorer les réseaux de transport, prévenir les violences conjugales et imposer une responsabilité institutionnelle.",
        "actionableInitiatives": [
          "Réseaux de transports bien éclairés, géolocalisés et chauffeurs certifiés",
          "Sensibilisation précoce aux mécanismes d'emprise et de violence intrafamiliale",
          "Audits citoyens réguliers sur la sécurité nocturne des rues et des arrêts de bus"
        ],
        "profilesRef": [
          "Jyoti Singh",
          "Sarah Everard",
          "Reeva Steenkamp",
          "Anene Booysen",
          "Mahsa Amini"
        ]
      },
      {
        "theme": "Protection de l'enfance",
        "whatWeCanImprove": "Garantir un signalement précoce, une écoute bienveillante et des secours sans distinction d'origine.",
        "actionableInitiatives": [
          "Dépistage systématique des traumatismes infantiles dans les consultations pédiatriques",
          "Espaces de loisirs protégés et interventions d'aide sociale dans les zones défavorisées",
          "Procédures judiciaires accélérées avec protection intégrale des enfants témoins"
        ],
        "profilesRef": [
          "L'enfant de Kathua",
          "Anene Booysen",
          "Anne Frank"
        ]
      },
      {
        "theme": "Éducation et égalité",
        "whatWeCanImprove": "Assurer un cycle complet de 12 années d'enseignement et d'éducation sanitaire à chaque jeune fille.",
        "actionableInitiatives": [
          "Suppression des freins matériels et économiques à l'accès au collège et au lycée",
          "Modules scolaires dédiés à l'hygiène intime et à la santé mentale des adolescentes",
          "Soutien communautaire pour protéger les enseignantes et élèves en zones isolées"
        ],
        "profilesRef": [
          "Malala Yousafzai",
          "Anne Frank",
          "Sophie Scholl"
        ]
      },
      {
        "theme": "Presse libre et vérité",
        "whatWeCanImprove": "Protéger le journalisme d'investigation contre les poursuites bâillons et garantir l'accès aux faits.",
        "actionableInitiatives": [
          "Lois anti-SLAPP pour neutraliser les procès abusifs visant à réduire les journalistes au silence",
          "Mécanismes d'aide d'urgence et sécurité numérique pour les journalistes menacés",
          "Respect strict et universel de la signalétique 'PRESS' par toutes les forces armées"
        ],
        "profilesRef": [
          "Daphne Caruana Galizia",
          "Anna Politkovskaya",
          "Veronica Guerin",
          "Shireen Abu Akleh",
          "Gauri Lankesh"
        ]
      },
      {
        "theme": "Justice écologique",
        "whatWeCanImprove": "Associer étroitement les peuples autochtones et locaux à chaque décision d'aménagement du territoire.",
        "actionableInitiatives": [
          "Application impérative du consentement préalable, libre et éclairé (FPIC)",
          "Arrêt immédiat de l'instrumentalisation du code pénal contre les militants de l'environnement",
          "Suivi participatif citoyen de la pollution de l'eau et des sols par les métaux lourds"
        ],
        "profilesRef": [
          "Berta Cáceres",
          "Marielle Franco",
          "Aysim Büyüknohutçu",
          "Efigenia Vásquez Astudillo",
          "Emilsen Manyoma",
          "Leonila Tapdasan Pesadilla",
          "Laura Leonor Vásquez Pineda",
          "Jane Júlia de Oliveira"
        ]
      },
      {
        "theme": "Droits humains et dignité",
        "whatWeCanImprove": "Garantir l'autonomie corporelle et l'égalité en droit indépendamment de la confession ou du genre.",
        "actionableInitiatives": [
          "Abolition des polices des mœurs attentatoires à la liberté de circulation",
          "Représentation équitable des minorités au sein des institutions civiques",
          "Dispositifs de recours contre les discriminations dans l'accès aux services publics"
        ],
        "profilesRef": [
          "Mahsa Amini",
          "Sophie Scholl",
          "Marielle Franco",
          "Qandeel Baloch"
        ]
      },
      {
        "theme": "Accompagnement et réhabilitation",
        "whatWeCanImprove": "Offrir un accompagnement médical, psychologique et social pérenne aux victimes et aux familles.",
        "actionableInitiatives": [
          "Centres d'hébergement d'urgence avec soutien médical et assistance légale",
          "Prise en charge spécialisée des traumatismes liés aux violences de guerre et au trafic humain",
          "Administration directe des fonds d'aide et de reconstruction par les survivantes"
        ],
        "profilesRef": [
          "Yanar Mohammed",
          "Nadia Murad",
          "Malala Yousafzai"
        ]
      },
      {
        "theme": "Justice institutionnelle",
        "whatWeCanImprove": "Mener des enquêtes indépendantes et des procédures judiciaires rapides à l'abri de toute ingérence.",
        "actionableInitiatives": [
          "Missions d'inspection indépendantes sur la sécurité au sein des centres hospitaliers",
          "Saisie des patrimoines d'origine illicite issus de réseaux de criminalité",
          "Sanctions exemplaires et fin de l'impunité pour les dépositaires de l'autorité publique"
        ],
        "profilesRef": [
          "Dre Moumita Debnath",
          "Aruna Shanbaug",
          "Veronica Guerin",
          "Sarah Everard"
        ]
      },
      {
        "theme": "Responsabilité collective",
        "whatWeCanImprove": "Encourager chacun à intervenir en sécurité pour secourir les personnes vulnérables sans indifférence.",
        "actionableInitiatives": [
          "Formations pratiques à l'intervention des témoins dans les écoles et entreprises",
          "Réseaux d'entraide de quartier pour venir en aide aux personnes menacées chez elles",
          "Sensibilisation publique pour refuser la normalisation du harcèlement de rue"
        ],
        "profilesRef": [
          "Anene Booysen",
          "Jyoti Singh",
          "Sarah Everard"
        ]
      }
    ],
    "editorialPromise": [
      "Refus absolu de toute complaisance ou exhibitionnisme macabre dans le récit de la souffrance.",
      "Bannissement des gros titres racoleurs visant à instrumentaliser les tragédies humaines.",
      "Aucune affirmation non vérifiée : corroboration de tous les éléments avec les archives judiciaires.",
      "Distinction explicite entre faits biographiques avérés et propositions éducatives formulées.",
      "Reconnaissance des figures vivantes comme actrices de leur destin et non comme simples symboles.",
      "Protection stricte de la confidentialité conformément aux ordonnances judiciaires (arrêt Nipun Saxena).",
      "Mise à disposition publique des dates d'audit éditorial et des références documentaires officielles.",
      "Reconnaissance objective des points d'enquête non résolus plutôt qu'affirmation de certitudes infondées.",
      "Rejet de tout parti pris confessionnel ou ciblage politique d'une communauté.",
      "Dévouement total à la dignité de la personne, à la recherche de la vérité et à la sécurité institutionnelle."
    ],
    "endingManifesto": {
      "headline": "Le monde n'a pas seulement besoin de mémoriaux.\nIl a besoin de plus d'humanité.",
      "paragraphs": [
        "Certaines personnes rêvaient de soigner. D'autres voulaient enseigner aux enfants. D'autres souhaitaient préserver les forêts, révéler la vérité ou prêter leur voix aux oubliés.",
        "Leur parcours nous rappelle que derrière chaque nom se tenait un être vivant portant ses espoirs, ses amours, ses devoirs et ses talents en devenir.",
        "Nous ne pouvons pas réécrire leur passé. Mais nous pouvons donner du sens à leur souvenir en réparant nos institutions, en protégeant les plus fragiles, en diffusant le savoir et en refusant de détourner le regard face à l'injustice."
      ],
      "finalCallout": "Ne nous souvenons pas uniquement de la manière dont ces vies ont été brisées. Souvenons-nous de tout ce qu'elles voulaient apporter à l'humanité."
    }
  },
  "hr": {
    "survivorVoices": [
      {
        "id": "malala-yousafzai",
        "slug": "malala-yousafzai",
        "name": "Malala Yousafzai",
        "displayRole": "Dobitnica Nobelove nagrade za mir · Zagovornica obrazovanja i suosnivačica Malala Funda",
        "country": "Pakistan",
        "countryFlag": "🇵🇰",
        "eraOrYear": "1997–Danas · Preživjela napad 2012.",
        "summary": "Preživjela ciljanog ekstremističkog nasilja koja je svoje iskustvo pretvorila u globalni pokret za besplatno i sigurno obrazovanje djevojčica i njihovo zdravlje.",
        "livedExperienceAndAdvocacy": "Pogođena metkom 9. listopada 2012. u školskom autobusu u dolini Swat jer je pisala dnevnik za BBC Urdu i tražila pravo na školovanje. Nakon operacija u Birminghamu, oporavila se i 2013. osnovala Malala Fund, koji se bori za 12 godina besplatnog i kvalitetnog obrazovanja za svu djecu.",
        "societalReformMessage": "Sveopći pristup djevojčica srednjoškolskom obrazovanju najvažniji je temelj za javno zdravstvo, dobrobit majki i smanjenje siromaštva u svijetu.",
        "verifiedQuote": {
          "quote": "Jedno dijete, jedan učitelj, jedna knjiga i jedna olovka mogu promijeniti svijet.",
          "source": "Govor pred Omladinskom skupštinom Ujedinjenih naroda (12. srpnja 2013.)"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2014 Citation: Malala Yousafzai",
            "url": "https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Malala Fund: Girls' Education and Research Reports",
            "url": "https://malala.org",
            "publisher": "Malala Fund"
          }
        ]
      },
      {
        "id": "nadia-murad",
        "slug": "nadia-murad",
        "name": "Nadia Murad",
        "displayRole": "Dobitnica Nobelove nagrade za mir · Ambasadorica UNODC-a · Osnivačica Nadia's Initiative",
        "country": "Irak",
        "countryFlag": "🇮🇶",
        "eraOrYear": "1993–Danas · Preživjela genocid nad Jezidima 2014.",
        "summary": "Jezidska borkinja za ljudska prava koja je pobjegla iz ropstva ISIS-a i predvodila pravnu borbu za proglašenje ratnog seksualnog nasilja međunarodnim zločinom.",
        "livedExperienceAndAdvocacy": "U kolovozu 2014. ISIS je napao njezino selo Kocho, ubio njezinu majku i šestero braće te odveo žene u ropstvo. Nakon bijega u studenom 2014. uz pomoć sunitske obitelji, svjedočila je pred UN-om, napisala 'Posljednju djevojku', osnovala Nadia's Initiative, obnovila škole i vodovod te 19. veljače 2026. otvorila Sinjar French Medical Center.",
        "societalReformMessage": "Preživjeli seksualnog nasilja u sukobima moraju dobiti odštetu, psihološku pomoć i izravnu ulogu u obnovi svojih razorenih zajednica.",
        "verifiedQuote": {
          "quote": "Želim biti posljednja djevojka na svijetu s pričom poput moje.",
          "source": "Nobelovsko predavanje i međunarodni govori o ljudskim pravima"
        },
        "consentProtocol": {
          "identityPreference": "Full Public Attribution",
          "consentVerified": false,
          "withdrawalPermitted": true
        },
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/murad/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "Nadia's Initiative: Sinjar French Medical Center Opening (2026)",
            "url": "https://www.nadiasinitiative.org/healthcare",
            "publisher": "Nadia's Initiative"
          }
        ]
      }
    ],
    "consentFramework": {
      "title": "Okvir u sedam koraka za privolu i zaštitu privatnosti preživjelih",
      "description": "UltimateHealth provodi etički i traumi prilagođen protokol objave koji poštuje osobno dostojanstvo, autonomiju i bezuvjetnu privatnost.",
      "steps": [
        {
          "step": 1,
          "title": "Prijedlog svjedočanstva / Etička nominacija",
          "detail": "Svjedočanstva se zaprimaju isključivo putem povjerljivih, šifriranih kanala ili službenih preporuka ovlaštenih organizacija."
        },
        {
          "step": 2,
          "title": "Početna urednička i sigurnosna provjera",
          "detail": "Naš urednički odbor provjerava svaki unos s aspekta ljudskog dostojanstva, edukativne svrhe i osobne sigurnosti sudionika."
        },
        {
          "step": 3,
          "title": "Informirana privola i odabir identiteta",
          "detail": "Sudionici sami određuju način predstavljanja: puno ime i prezime, provjereni pseudonim ili anonimni glas zajednice."
        },
        {
          "step": 4,
          "title": "Provjera činjenica i pravno usklađivanje",
          "detail": "Biografski podaci i povijesne okolnosti provjeravaju se kroz službene arhive bez nepotrebnog ispitivanja sudionika."
        },
        {
          "step": 5,
          "title": "Pregled nacrta od strane sudionika",
          "detail": "Sudionik pregledava konačni tekst prije objave i zadržava apsolutno pravo veta na svaku riječ, datum i opis."
        },
        {
          "step": 6,
          "title": "Konačno etičko odobrenje",
          "detail": "Završna provjera osigurava uklanjanje senzacionalizma, izostavljanje opisa nasilja i zaštitu osobnih metapodataka."
        },
        {
          "step": 7,
          "title": "Pravo na ispravak i bezuvjetno povlačenje",
          "detail": "Sudionici zadržavaju trajno pravo na izmjenu podataka ili zahtjev za trajnim uklanjanjem svojih podataka u bilo kojem trenutku."
        }
      ],
      "privacyPledge": [
        "Privatni telefonski brojevi, adrese stanovanja ili lokacije nikada se ne prikupljaju niti objavljuju.",
        "Podaci o članovima obitelji ili maloljetnicima ne otkrivaju se bez izričite samostalne privole.",
        "Životna svjedočanstva nikada se ne unovčavaju niti koriste u marketinške i komercijalne svrhe."
      ]
    },
    "changemakers": [
      {
        "id": "dr-denis-mukwege",
        "slug": "dr-denis-mukwege",
        "name": "Dr. Denis Mukwege",
        "roleAndField": "Ginekološki kirurg i humanitarni liječnik",
        "organization": "Bolnica i zaklada Panzi",
        "country": "Demokratska Republika Kongo",
        "countryFlag": "🇨🇩",
        "eraOrYear": "1999–Danas",
        "focusArea": "Rekonstruktivna kirurgija trauma i holističko liječenje preživjelih ratnog nasilja",
        "documentedActions": "Utemeljio bolnicu Panzi u Bukavuu 1999., gdje je stvorio četverostupni model pomoći (medicinska, psihološka, ekonomska i pravna skrb) za desetke tisuća žrtava ratnog seksualnog nasilja.",
        "measurableImpact": "Dobitnik Nobelove nagrade za mir 2018. s Nadijom Murad; suosnivač Globalnog fonda za preživjele 2019., koji osigurava odštete u kriznim žarištima diljem svijeta.",
        "relevanceToHumanity": "Dokazuje kako vrhunska kirurška stručnost u kombinaciji s moralnom hrabrošću može vratiti ljudsko dostojanstvo i tjelesno zdravlje u ratnim zonama.",
        "references": [
          {
            "title": "The Nobel Peace Prize 2018: Denis Mukwege and Nadia Murad",
            "url": "https://www.nobelprize.org/prizes/peace/2018/mukwege/facts/",
            "publisher": "The Nobel Foundation"
          },
          {
            "title": "The Panzi Model of Holistic Healing & Reconstructive Surgery",
            "url": "https://panzifoundation.org",
            "publisher": "Panzi Foundation"
          }
        ]
      },
      {
        "id": "dr-sunitha-krishnan",
        "slug": "dr-sunitha-krishnan",
        "name": "Dr. Sunitha Krishnan",
        "roleAndField": "Društvena reformatorica i borkinja protiv trgovine ljudima",
        "organization": "Prajwala",
        "country": "Indija",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1996–Danas",
        "focusArea": "Spašavanje, rehabilitacija i reintegracija žrtava trgovine ljudima",
        "documentedActions": "Suosnivačica organizacije Prajwala u Hyderabadu (1996.), koja pruža integrirani model prevencije, spašavanja, psihološke pomoći, zaštite djece i profesionalnog osposobljavanja za žrtve seksualnog iskorištavanja.",
        "measurableImpact": "Spasila i rehabilitirala više od 24.000 žrtava; sudjelovala u donošenju ključnih zakona protiv trgovine ljudima u Indiji; odlikovana ordenom Padma Shri 2016.",
        "relevanceToHumanity": "Pokazuje da je spašavanje tek početak; stvarna sloboda zahtijeva dugotrajan psihološki oporavak, ekonomsku samostalnost i trajnu pravnu zaštitu.",
        "references": [
          {
            "title": "Prajwala Institutional Impact & Survivor Rehabilitation Data",
            "url": "https://prajwalaindia.com",
            "publisher": "Prajwala"
          },
          {
            "title": "Government of India Padma Awards Gazette (2016)",
            "url": "https://padmaawards.gov.in",
            "publisher": "Government of India"
          }
        ]
      },
      {
        "id": "dr-abhay-rani-bang",
        "slug": "dr-abhay-rani-bang",
        "name": "Dr. Abhay i dr. Rani Bang",
        "roleAndField": "Liječnici javnog zdravstva i klinički istraživači",
        "organization": "SEARCH (Society for Education, Action and Research in Community Health)",
        "country": "Indija",
        "countryFlag": "🇮🇳",
        "eraOrYear": "1986–Danas",
        "focusArea": "Kućna njega novorođenčadi i djece (HBNC) te zdravstvena jednakost u selima",
        "documentedActions": "U udaljenom okrugu Gadchiroli razvili su model kućne njege novorođenčadi (HBNC), obučavajući lokalne žene (Arogyadoot) da prepoznaju i liječe neonatalne infekcije u seoskim domovima.",
        "measurableImpact": "Istraživanje objavljeno u časopisu The Lancet (1999.) pokazalo je smanjenje smrtnosti novorođenčadi za 62%; model je postao temelj indijskog nacionalnog programa ASHA i preporuka SZO-a i UNICEF-a; odlikovani ordenom Padma Shri 2018.",
        "relevanceToHumanity": "Uveli su revolucionarne promjene u javno zdravstvo prenošenjem životno važnih medicinskih znanja izravno u ruke žena u ruralnim zajednicama.",
        "references": [
          {
            "title": "The Lancet: Effect of Home-Based Neonatal Care on Neonatal Mortality",
            "url": "https://www.thelancet.com",
            "publisher": "The Lancet (1999)"
          },
          {
            "title": "SEARCH Gadchiroli Field Research and HBNC Architecture",
            "url": "https://searchgadchiroli.org.in",
            "publisher": "SEARCH"
          }
        ]
      }
    ],
    "societalLessons": [
      {
        "theme": "Sigurnost u zdravstvu",
        "whatWeCanImprove": "Zaštititi bolnice, sobe za dežurstva i hitne prijeme biometrijskom kontrolom ulaza i sigurnosnim protokolima.",
        "actionableInitiatives": [
          "Obvezne, zaključane i osvijetljene sobe za odmor dežurnih liječnika i medicinskih sestara",
          "Panične tipke i 24-satna prisutnost obučenih zaštitara na hitnim prijemima",
          "Obvezan policijski nadzor agresivnih i opijenih pacijenata pod prismotrom"
        ],
        "profilesRef": [
          "Dr. Moumita Debnath",
          "Aruna Shanbaug",
          "Dr. Sarita Toshniwal",
          "Dr. Vandana Das",
          "Dr. Tamara O'Neal"
        ]
      },
      {
        "theme": "Sigurnost žena",
        "whatWeCanImprove": "Razviti javni prijevoz, rano prepoznati obiteljsko nasilje i osigurati strogu odgovornost institucija.",
        "actionableInitiatives": [
          "Javni prijevoz pod GPS nadzorom i provjereni vozači",
          "Rana edukacija o prisilnoj kontroli i prepoznavanju znakova nasilja",
          "Neovisne građanske provjere sigurnosti na stanicama i ulicama noću"
        ],
        "profilesRef": [
          "Jyoti Singh",
          "Sarah Everard",
          "Reeva Steenkamp",
          "Anene Booysen",
          "Mahsa Amini"
        ]
      },
      {
        "theme": "Zaštita djece",
        "whatWeCanImprove": "Osigurati dostupnu zaštitu, brzu prijavu i podršku bez diskriminacije za svako dijete.",
        "actionableInitiatives": [
          "Pregledi prilagođeni traumi u pedijatrijskim i primarnim ambulantama",
          "Sigurna igrališta i terenski rad socijalnih službi u ranjivim naseljima",
          "Ubrzana sudska suđenja uz potpunu zaštitu djece svjedoka"
        ],
        "profilesRef": [
          "Dijete iz Kathue",
          "Anene Booysen",
          "Anne Frank"
        ]
      },
      {
        "theme": "Obrazovanje i pismenost",
        "whatWeCanImprove": "Osigurati 12 godina kvalitetnog školovanja i zdravstvene pismenosti za svaku djevojčicu.",
        "actionableInitiatives": [
          "Uklanjanje ekonomskih i prostornih prepreka za pohađanje srednje škole",
          "Uvođenje programa menstrualnog i mentalnog zdravlja u škole",
          "Zaštita učiteljica i učenica u konzervativnim sredinama"
        ],
        "profilesRef": [
          "Malala Yousafzai",
          "Anne Frank",
          "Sophie Scholl"
        ]
      },
      {
        "theme": "Novinarstvo i istina",
        "whatWeCanImprove": "Zaštititi neovisne novinare od strateških tužbi (SLAPP) i jamčiti pristup informacijama.",
        "actionableInitiatives": [
          "Zakoni protiv SLAPP tužbi kojima se novinarima pokušava začepiti usta",
          "Fondovi za digitalnu sigurnost i evakuaciju ugroženih reportera",
          "Poštivanje oznake 'PRESS' od strane policije i oružanih snaga"
        ],
        "profilesRef": [
          "Daphne Caruana Galizia",
          "Anna Politkovskaya",
          "Veronica Guerin",
          "Shireen Abu Akleh",
          "Gauri Lankesh"
        ]
      },
      {
        "theme": "Ekološka pravda",
        "whatWeCanImprove": "Uključiti lokalne i autohtone zajednice u sve odluke o zemljištu i vodnim resursima.",
        "actionableInitiatives": [
          "Obvezno traženje slobodnog i prethodnog pristanka (FPIC) prije koncesija",
          "Prekid zlouporabe kaznenog zakona protiv miroljubivih čuvara prirode",
          "Mjerenje zagađenja teškim metalima pod vodstvom samih mještana"
        ],
        "profilesRef": [
          "Berta Cáceres",
          "Marielle Franco",
          "Aysim Büyüknohutçu",
          "Efigenia Vásquez Astudillo",
          "Emilsen Manyoma",
          "Leonila Tapdasan Pesadilla",
          "Laura Leonor Vásquez Pineda",
          "Jane Júlia de Oliveira"
        ]
      },
      {
        "theme": "Ljudska prava i dostojanstvo",
        "whatWeCanImprove": "Osigurati jednako dostojanstvo, tjelesnu autonomiju i jednaka prava pred zakonom.",
        "actionableInitiatives": [
          "Ukidanje moralne policije i zabrana ograničavanja kretanja građana",
          "Jednak pristup političkom odlučivanju za marginalizirane skupine",
          "Zaštitni mehanizmi protiv vjerske i etničke diskriminacije u javnim službama"
        ],
        "profilesRef": [
          "Mahsa Amini",
          "Sophie Scholl",
          "Marielle Franco",
          "Qandeel Baloch"
        ]
      },
      {
        "theme": "Mentalna i socijalna rehabilitacija",
        "whatWeCanImprove": "Pružiti trajnu zdravstvenu, psihološku i materijalnu pomoć preživjelima i obiteljima.",
        "actionableInitiatives": [
          "Sigurna skloništa s integriranom medicinskom i pravnom podrškom",
          "Liječenje trauma za žrtve seksualnog nasilja u sukobima i trgovine ljudima",
          "Upravljanje fondovima za obnovu i odštete pod vodstvom samih preživjelih"
        ],
        "profilesRef": [
          "Yanar Mohammed",
          "Nadia Murad",
          "Malala Yousafzai"
        ]
      },
      {
        "theme": "Institucionalna pravda",
        "whatWeCanImprove": "Neovisne istrage i brzi sudski postupci bez političkog i gospodarskog uplitanja.",
        "actionableInitiatives": [
          "Sudbena povjerenstva za sigurnosne propuste u bolnicama",
          "Oduzimanje nezakonito stečene imovine iz kriminalnih radnji",
          "Nulta tolerancija na nekažnjivost policijskih i javnih službenika"
        ],
        "profilesRef": [
          "Dr. Moumita Debnath",
          "Aruna Shanbaug",
          "Veronica Guerin",
          "Sarah Everard"
        ]
      },
      {
        "theme": "Građanska odgovornost",
        "whatWeCanImprove": "Potaknuti građane na sigurno pomaganje unesrećenima i prekidanje šutnje.",
        "actionableInitiatives": [
          "Radionice aktivnog pružanja pomoći u školama i radnim organizacijama",
          "Mjesne mreže podrške za osobe suočene s obiteljskim prijetnjama",
          "Građanske akcije protiv prihvaćanja uličnog uznemiravanja kao normalnog"
        ],
        "profilesRef": [
          "Anene Booysen",
          "Jyoti Singh",
          "Sarah Everard"
        ]
      }
    ],
    "editorialPromise": [
      "Bez senzacionalističkih i uznemirujućih opisa nasilja ili tjelesnih trauma.",
      "Strogo izbjegavanje naslova stvorenih za iskorištavanje ljudskih tragedija.",
      "Bez neutemeljenih optužbi — sve činjenice provjerene su sa sudskim arhivima.",
      "Jasno razgraničenje između biografskih činjenica i predloženih edukativnih inicijativa.",
      "Živući preživjeli poštuju se kao aktivni predvodnici, a ne kao spomenici.",
      "Stroga zaštita privatnosti i osjetljivih podataka prema sudskim odlukama (presuda Nipun Saxena).",
      "Javno navođenje datuma provjere i izravne poveznice na vjerodostojne izvore.",
      "Iskreno priznavanje nerazjašnjenih činjenica umjesto nagađanja.",
      "Bez političkog i vjerskog etiketiranja bilo koje društvene skupine.",
      "Bespogovorna posvećenost ljudskom dostojanstvu, istini i sigurnosti u društvu."
    ],
    "endingManifesto": {
      "headline": "Svijetu ne trebaju samo spomenici.\nTreba mu više čovječnosti.",
      "paragraphs": [
        "Neki su željeli postati liječnici. Neki su željeli poučavati djecu. Neki su željeli čuvati šume, otkrivati istinu ili biti glas onih koje nitko nije slušao.",
        "Njihovi životi podsjećaju nas da iza svakog imena stoji ljudsko biće sa snovima, obitelji, brigama i prekinutim mogućnostima.",
        "Ne možemo promijeniti njihovu prošlost. Ali možemo dati smisao njihovim pričama poboljšavanjem sustava, zaštitom slabijih, podrškom obrazovanju i odbijanjem da budemo ravnodušni prema tuđoj patnji."
      ],
      "finalCallout": "Nemojmo ih pamtiti samo po tome kako su napustili ovaj svijet. Pamtimo ih po tome što su ovom svijetu željeli darovati."
    }
  }
};

export function getLocalizedSurvivorVoices(locale?: string): SurvivorVoice[] {
  const lang = locale && PILLARS_LOCALIZED_DATA[locale] ? locale : "en";
  return PILLARS_LOCALIZED_DATA[lang].survivorVoices;
}

export function getLocalizedConsentFramework(locale?: string): LocalizedConsentFramework {
  const lang = locale && PILLARS_LOCALIZED_DATA[locale] ? locale : "en";
  return PILLARS_LOCALIZED_DATA[lang].consentFramework;
}

export function getLocalizedChangemakers(locale?: string): Changemaker[] {
  const lang = locale && PILLARS_LOCALIZED_DATA[locale] ? locale : "en";
  return PILLARS_LOCALIZED_DATA[lang].changemakers;
}

export function getLocalizedSocietalLessons(locale?: string): SocietalLesson[] {
  const lang = locale && PILLARS_LOCALIZED_DATA[locale] ? locale : "en";
  return PILLARS_LOCALIZED_DATA[lang].societalLessons;
}

export function getLocalizedEditorialPromise(locale?: string): string[] {
  const lang = locale && PILLARS_LOCALIZED_DATA[locale] ? locale : "en";
  return PILLARS_LOCALIZED_DATA[lang].editorialPromise;
}

export function getLocalizedEndingManifesto(locale?: string): LocalizedEndingManifesto {
  const lang = locale && PILLARS_LOCALIZED_DATA[locale] ? locale : "en";
  return PILLARS_LOCALIZED_DATA[lang].endingManifesto;
}
