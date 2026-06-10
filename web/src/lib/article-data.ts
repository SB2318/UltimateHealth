import type { Article } from "@/types/article";

/** Health and medical terms available for interactive glossary tooltips */
export const defaultGlossaryTerms: Record<string, string> = {
  cardiovascular:
    "Relating to the heart and blood vessels that make up the circulatory system.",
  hypertension:
    "A condition in which blood pressure is consistently 130/80 mmHg or higher, increasing risk of heart disease and stroke.",
  atherosclerosis:
    "A disease in which plaque builds up inside the arteries, narrowing them and reducing blood flow over time.",
  triglycerides:
    "A type of fat (lipid) found in the blood. Elevated levels are associated with increased cardiovascular risk.",
  dyslipidemia:
    "Abnormal levels of lipids — including cholesterol and triglycerides — in the bloodstream.",
  "endothelial function":
    "The ability of the inner lining of blood vessels (endothelium) to regulate blood flow and vascular health.",
  "omega-3 fatty acids":
    "Essential polyunsaturated fats found in fatty fish and certain plant foods with documented anti-inflammatory and cardiovascular benefits.",
  cortisol:
    "The body's primary stress hormone, released by the adrenal glands. Chronically elevated cortisol can raise blood pressure and blood sugar.",
  "insulin resistance":
    "A condition in which cells don't respond effectively to insulin, forcing the pancreas to produce more. Precursor to type 2 diabetes.",
  inflammation:
    "The body's immune response to injury or infection. Chronic low-grade inflammation is linked to cardiovascular disease, diabetes, and other conditions.",
};

export const articles: Article[] = [
  // ─── Featured article (full content) ─────────────────────────────────────
  {
    id: "cardiovascular-health-guide",
    title:
      "Understanding Heart Health: A Comprehensive Guide to Cardiovascular Wellness",
    subtitle:
      "Evidence-based strategies for protecting your most vital organ through lifestyle, nutrition, and proactive care",
    excerpt:
      "Learn how to protect your cardiovascular system with proven lifestyle strategies, dietary choices, and early warning signs you should never ignore.",
    imageUrl: "/assets/ultimate-health-about.jpeg",
    imageAlt:
      "Healthcare professionals reviewing cardiovascular health data and diagnostic information",
    author: {
      name: "Dr. Sarah Mitchell",
      role: "Cardiologist, MD",
      avatarInitials: "SM",
      avatarColor: "#667eea",
    },
    publishedAt: "2026-01-15",
    updatedAt: "2026-04-02",
    readingTime: "12 min read",
    category: "Cardiovascular Health",
    tags: [
      "heart health",
      "cardiovascular",
      "prevention",
      "diet",
      "hypertension",
      "cholesterol",
    ],
    content: {
      blocks: [
        {
          type: "paragraph",
          html: "Cardiovascular disease remains the leading cause of death globally, accounting for approximately 17.9 million deaths each year. Yet the majority of cardiovascular conditions are preventable through informed lifestyle choices, early detection, and consistent medical care.",
        },
        {
          type: "paragraph",
          html: "In this comprehensive guide, we explore the science behind heart health, the modifiable risk factors you can address today, and the evidence-based strategies that cardiologists recommend to their patients.",
        },
        {
          type: "heading",
          level: 2,
          id: "what-is-cardiovascular-health",
          text: "What Is Cardiovascular Health?",
        },
        {
          type: "paragraph",
          html: "Cardiovascular health refers to the overall condition of your heart and blood vessels. A healthy cardiovascular system efficiently pumps oxygenated blood throughout your body, nourishes every organ and tissue, and removes metabolic waste products.",
        },
        {
          type: "paragraph",
          html: "The cardiovascular system consists of three primary components: the <strong>heart</strong> (a muscular pump), the <strong>blood vessels</strong> (arteries, veins, and capillaries), and <strong>blood</strong> itself. When any of these components become compromised, serious health consequences can follow.",
        },
        {
          type: "image",
          src: "/assets/article-detail-screen.jpeg",
          alt: "UltimateHealth app showing cardiovascular health tracking and monitoring features",
          caption:
            "The UltimateHealth app provides tools to monitor and track your cardiovascular health metrics over time. (Placeholder — production images from API)",
        },
        {
          type: "heading",
          level: 2,
          id: "risk-factors",
          text: "Key Risk Factors for Cardiovascular Disease",
        },
        {
          type: "paragraph",
          html: "Understanding your risk factors is the first step toward prevention. Risk factors fall into two categories: those you cannot change (age, genetics, family history), and those you can actively modify through lifestyle and medical intervention.",
        },
        {
          type: "heading",
          level: 3,
          id: "modifiable-risk-factors",
          text: "Modifiable Risk Factors",
        },
        {
          type: "list",
          listType: "unordered",
          items: [
            "<strong>Hypertension (High Blood Pressure)</strong> — Consistently elevated blood pressure damages arterial walls over time, accelerating atherosclerosis and increasing risk of heart attack and stroke.",
            "<strong>High LDL Cholesterol</strong> — Elevated LDL cholesterol contributes to plaque buildup in arteries, narrowing them and restricting blood flow to the heart and brain.",
            "<strong>Type 2 Diabetes</strong> — Chronically high blood glucose damages blood vessels and nerves, significantly elevating cardiovascular risk across all organs.",
            "<strong>Physical Inactivity</strong> — A sedentary lifestyle weakens the heart muscle and promotes weight gain, hypertension, and insulin resistance simultaneously.",
            "<strong>Smoking and Tobacco Use</strong> — Nicotine and other tobacco compounds directly damage blood vessel linings and dramatically promote clot formation.",
            "<strong>Poor Diet</strong> — Diets high in saturated fats, trans fats, sodium, and refined sugars contribute to multiple cardiovascular risk factors at once.",
            "<strong>Excess Weight and Obesity</strong> — Being overweight strains the heart and correlates strongly with hypertension, diabetes, and dyslipidemia.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Know Your Numbers",
          text: 'High blood pressure and elevated cholesterol often cause no noticeable symptoms. Regular health screenings — at least once a year — are essential for detecting these "silent" risk factors early. Target blood pressure: below 120/80 mmHg. Target LDL cholesterol: below 100 mg/dL for most adults.',
        },
        {
          type: "heading",
          level: 2,
          id: "role-of-diet",
          text: "The Critical Role of Diet in Heart Health",
        },
        {
          type: "paragraph",
          html: "Decades of nutritional research have consistently shown that dietary patterns profoundly influence cardiovascular outcomes. The <strong>Mediterranean diet</strong>, the <strong>DASH diet</strong>, and whole-food plant-based eating patterns have the strongest evidence base for reducing cardiovascular disease risk.",
        },
        {
          type: "blockquote",
          text: "Let food be thy medicine and medicine be thy food. The evidence is now overwhelming: what we eat is among the most powerful influences on cardiovascular health we have.",
          attribution: "Dr. Dean Ornish, preventive medicine physician and researcher",
        },
        {
          type: "heading",
          level: 3,
          id: "heart-healthy-foods",
          text: "Heart-Healthy Foods to Prioritize",
        },
        {
          type: "list",
          listType: "ordered",
          items: [
            "<strong>Fatty fish</strong> (salmon, sardines, mackerel) — Rich in omega-3 fatty acids that reduce triglycerides and systemic inflammation.",
            "<strong>Leafy greens</strong> (spinach, kale, arugula) — Provide nitrates that lower blood pressure and antioxidants that protect arterial health.",
            "<strong>Berries</strong> (blueberries, strawberries) — Contain flavonoids linked to reduced blood pressure and improved endothelial function.",
            "<strong>Whole grains</strong> (oats, quinoa, brown rice) — Lower LDL cholesterol and support healthy blood sugar regulation through soluble fiber.",
            "<strong>Nuts and seeds</strong> (walnuts, flaxseeds, chia seeds) — Provide healthy unsaturated fats, fiber, and plant sterols that naturally lower cholesterol.",
            "<strong>Legumes</strong> (lentils, chickpeas, black beans) — Excellent source of soluble fiber and plant protein with minimal saturated fat.",
            "<strong>Olive oil</strong> — High in monounsaturated fats and polyphenols that reduce inflammation and improve cholesterol profiles.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Simple Dietary Swap",
          text: "Replace refined grains with whole grains, and swap saturated fats (butter, red meat) for unsaturated fats (olive oil, avocado, nuts). These two changes alone can meaningfully reduce your LDL cholesterol within 8–12 weeks without any medication.",
        },
        {
          type: "heading",
          level: 2,
          id: "exercise-heart-health",
          text: "Exercise and Heart Health",
        },
        {
          type: "paragraph",
          html: "Regular physical activity is one of the most powerful interventions for cardiovascular health. Exercise strengthens the heart muscle, lowers blood pressure, improves cholesterol profiles, reduces inflammation, and supports healthy body weight — addressing multiple risk factors simultaneously.",
        },
        {
          type: "paragraph",
          html: "The American Heart Association recommends at least <strong>150 minutes of moderate-intensity aerobic activity</strong> per week, or <strong>75 minutes of vigorous activity</strong>, combined with two sessions of muscle-strengthening exercises targeting all major muscle groups.",
        },
        {
          type: "callout",
          variant: "note",
          title: "Starting an Exercise Program",
          text: "If you have existing cardiovascular conditions or have been sedentary for a long time, consult your physician before beginning a new exercise regimen. A gradual approach — starting with 10–15 minute walks and progressively increasing duration and intensity — is safe and sustainable for most people.",
        },
        {
          type: "heading",
          level: 3,
          id: "types-of-exercise",
          text: "Types of Exercise for Heart Health",
        },
        {
          type: "list",
          listType: "unordered",
          items: [
            "<strong>Aerobic exercise</strong> — Walking, jogging, swimming, cycling. Directly strengthens the heart muscle and improves cardiovascular efficiency.",
            "<strong>Resistance training</strong> — Weightlifting, bodyweight exercises. Improves insulin resistance, body composition, and resting metabolic rate.",
            "<strong>High-Intensity Interval Training (HIIT)</strong> — Short bursts of intense activity followed by recovery periods. Highly time-efficient with strong cardiovascular and metabolic benefits.",
            "<strong>Yoga and stretching</strong> — Reduces psychological stress, improves flexibility, and may lower blood pressure through parasympathetic nervous system activation.",
          ],
        },
        {
          type: "heading",
          level: 2,
          id: "stress-and-sleep",
          text: "Stress, Sleep, and Your Heart",
        },
        {
          type: "paragraph",
          html: "Chronic psychological stress activates the fight-or-flight response, elevating cortisol and adrenaline levels that increase blood pressure and heart rate. Over time, unmanaged stress contributes directly to hypertension, inflammation, and unhealthy coping behaviors such as overeating, smoking, and alcohol consumption.",
        },
        {
          type: "paragraph",
          html: "Sleep deprivation is equally damaging. Adults sleeping fewer than 6 hours nightly have significantly higher risk of hypertension, obesity, diabetes, and cardiac events. The American Heart Association now formally recognizes <strong>healthy sleep</strong> (7–9 hours of quality sleep per night) as a core pillar of cardiovascular health alongside diet and exercise.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Evidence-Based Stress Reduction",
          text: "Effective stress management techniques include mindfulness meditation (even 10 minutes daily measurably reduces cortisol), progressive muscle relaxation, diaphragmatic breathing exercises, regular social connection, and time in nature. These approaches have direct, measurable cardiovascular benefits — not merely subjective relief.",
        },
        {
          type: "divider",
        },
        {
          type: "heading",
          level: 2,
          id: "warning-signs",
          text: "Warning Signs That Require Immediate Attention",
        },
        {
          type: "paragraph",
          html: "Recognizing the warning signs of a cardiac emergency can save your life or the life of someone nearby. The following symptoms warrant <strong>immediate emergency medical care</strong> — call emergency services; do not drive yourself to the hospital.",
        },
        {
          type: "list",
          listType: "unordered",
          items: [
            "<strong>Chest pain, pressure, tightness, or discomfort</strong> — May radiate to the left arm, jaw, neck, or back. Can feel like squeezing or heaviness.",
            "<strong>Sudden shortness of breath</strong> — Especially when occurring at rest or with minimal physical exertion.",
            "<strong>Unexplained sweating, nausea, or lightheadedness</strong> — Common heart attack symptoms, particularly prevalent in women and diabetic patients.",
            "<strong>Sudden numbness or weakness on one side of the body</strong> — Including the face, arm, or leg — classic stroke warning signs.",
            '<strong>Sudden severe headache</strong> — Often described as "the worst headache of my life" and may indicate hemorrhagic stroke.',
            "<strong>Heart palpitations with dizziness or fainting</strong> — May indicate a dangerous cardiac arrhythmia requiring urgent evaluation.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Emergency Action Required",
          text: 'If you or someone nearby experiences these symptoms, call emergency services (911 in the US) immediately. Every minute of delay during a heart attack causes additional irreversible heart muscle damage. "Time is muscle" — early treatment dramatically improves survival and recovery outcomes.',
        },
        {
          type: "heading",
          level: 2,
          id: "preventive-care",
          text: "Preventive Screenings and Regular Monitoring",
        },
        {
          type: "paragraph",
          html: "Proactive monitoring is essential for cardiovascular health, especially as we age. Work with your healthcare provider to establish a personalized schedule for the following evidence-based screenings:",
        },
        {
          type: "list",
          listType: "ordered",
          items: [
            "<strong>Blood pressure</strong> — At least annually for all adults; more frequently if hypertensive, on medications, or at elevated risk.",
            "<strong>Lipid panel</strong> — Every 4–6 years for average-risk adults; annually for those with known dyslipidemia or cardiovascular history.",
            "<strong>Blood glucose / HbA1c</strong> — Every 3 years from age 35–45; annually with risk factors for insulin resistance or diabetes.",
            "<strong>Body weight and BMI</strong> — Regular monitoring helps identify gradual weight gain before it compounds other risks.",
            "<strong>Electrocardiogram (ECG)</strong> — Baseline assessment at age 40, or earlier if symptomatic or with significant family history.",
            "<strong>Coronary artery calcium (CAC) score</strong> — Recommended for intermediate-risk adults to guide treatment and lifestyle decisions.",
          ],
        },
        {
          type: "divider",
        },
        {
          type: "heading",
          level: 2,
          id: "conclusion",
          text: "The Bottom Line",
        },
        {
          type: "paragraph",
          html: "Cardiovascular disease is not inevitable. The evidence is unambiguous: most cases are preventable through consistent, intentional attention to lifestyle — a nutrient-dense diet, regular physical activity, effective stress management, quality sleep, and avoiding tobacco.",
        },
        {
          type: "paragraph",
          html: "Begin with small, sustainable changes rather than attempting an overnight transformation. Adding one serving of vegetables per day, taking a 20-minute walk, or practicing five minutes of mindful breathing are meaningful steps that compound into significant health benefits over months and years.",
        },
        {
          type: "paragraph",
          html: "Partner with your healthcare provider, know your numbers, and treat your cardiovascular health as the long-term investment it truly is. Your heart has worked tirelessly for you every second of your life — it deserves your focused, informed attention.",
        },
      ],
    },
  },

  // ─── Related articles (metadata only — full content served by API) ─────────
  {
    id: "managing-type-2-diabetes",
    title: "Managing Type 2 Diabetes: Lifestyle Changes That Transform Outcomes",
    subtitle:
      "How diet, exercise, and self-monitoring can help you achieve better blood sugar control",
    excerpt:
      "Evidence-based lifestyle strategies that help people with type 2 diabetes achieve tighter blood sugar control, reduce medication dependence, and improve long-term quality of life.",
    imageUrl: null,
    imageAlt: "Person monitoring blood glucose with a modern continuous glucose monitor",
    author: {
      name: "Dr. James Park",
      role: "Endocrinologist, MD, PhD",
      avatarInitials: "JP",
      avatarColor: "#764ba2",
    },
    publishedAt: "2026-02-08",
    readingTime: "9 min read",
    category: "Diabetes Management",
    tags: ["diabetes", "blood sugar", "insulin resistance", "lifestyle", "nutrition"],
    content: { blocks: [] },
  },
  {
    id: "sleep-and-heart-health",
    title: "The Sleep-Heart Connection: Why Rest Is Non-Negotiable",
    subtitle:
      "New research recognizes sleep quality as a pillar of cardiovascular health equal to diet and exercise",
    excerpt:
      "Sleep deprivation silently damages the cardiovascular system in measurable ways. Discover the science behind the sleep-heart connection and practical strategies for restorative rest.",
    imageUrl: null,
    imageAlt:
      "Peaceful sleeping environment representing the connection between quality sleep and heart health",
    author: {
      name: "Dr. Priya Nair",
      role: "Sleep Medicine Specialist",
      avatarInitials: "PN",
      avatarColor: "#10b981",
    },
    publishedAt: "2026-03-12",
    readingTime: "7 min read",
    category: "Cardiovascular Health",
    tags: ["sleep", "heart health", "cardiovascular", "wellness", "sleep apnea"],
    content: { blocks: [] },
  },
  {
    id: "stress-and-your-heart",
    title: "Stress and Your Heart: The Hidden Cardiovascular Risk Factor",
    subtitle:
      "Chronic stress is as damaging as smoking for your heart — here is what the science reveals",
    excerpt:
      "Understand how chronic psychological stress affects cardiovascular health at the cellular level and discover evidence-based techniques to protect your heart.",
    imageUrl: null,
    imageAlt:
      "Abstract representation of psychological stress and its physiological impact on the heart",
    author: {
      name: "Dr. Emily Torres",
      role: "Psychiatrist & Integrative Medicine Specialist",
      avatarInitials: "ET",
      avatarColor: "#f59e0b",
    },
    publishedAt: "2026-03-28",
    readingTime: "8 min read",
    category: "Mental Health",
    tags: ["stress", "heart health", "cortisol", "mental health", "prevention"],
    content: { blocks: [] },
  },
  {
    id: "plant-based-diet-and-heart",
    title: "Plant-Based Diet and Heart Disease: What the Latest Research Shows",
    subtitle:
      "Comprehensive review of how plant-forward eating patterns protect the cardiovascular system",
    excerpt:
      "The scientific evidence is compelling: plant-based dietary patterns consistently and significantly reduce cardiovascular disease risk across diverse populations.",
    imageUrl: null,
    imageAlt:
      "Vibrant colorful array of heart-healthy plant-based whole foods",
    author: {
      name: "Dr. Sarah Mitchell",
      role: "Cardiologist, MD",
      avatarInitials: "SM",
      avatarColor: "#667eea",
    },
    publishedAt: "2026-04-10",
    readingTime: "10 min read",
    category: "Cardiovascular Health",
    tags: [
      "plant-based diet",
      "heart health",
      "Mediterranean diet",
      "nutrition",
      "cholesterol",
    ],
    content: { blocks: [] },
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getRelatedArticles(articleId: string, count = 3): Article[] {
  const article = getArticleById(articleId);
  if (!article) return articles.filter((a) => a.id !== articleId).slice(0, count);

  return articles
    .filter((a) => a.id !== articleId)
    .sort((a, b) => {
      const scoreA =
        (a.category === article.category ? 2 : 0) +
        (a.author.name === article.author.name ? 1 : 0) +
        a.tags.filter((t) => article.tags.includes(t)).length;
      const scoreB =
        (b.category === article.category ? 2 : 0) +
        (b.author.name === article.author.name ? 1 : 0) +
        b.tags.filter((t) => article.tags.includes(t)).length;
      return scoreB - scoreA;
    })
    .slice(0, count);
}
