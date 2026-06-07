import type { RelatedArticleItem } from '../components/article/types';

/**
 * MOCK ARTICLE HTML CONTENT
 *
 * Demonstrates every content type the ArticleContent renderer supports:
 *   headings H2–H4, paragraphs, bold, italic, inline links,
 *   ordered/unordered lists, blockquotes, images with captions,
 *   and the four callout classes (tip, warning, note, important).
 *
 * Replace with real API content in production.
 */
export const MOCK_ARTICLE_HTML = `
<h2>What Is Blood Pressure?</h2>

<p>
  Blood pressure is the force that your blood exerts against the walls of your
  arteries as your heart pumps it around the body. It is recorded as two numbers:
  <strong>systolic pressure</strong> (the higher number, measured when the heart
  beats) over <strong>diastolic pressure</strong> (the lower number, measured
  between beats).
</p>

<p>
  A reading of <strong>120/80 mmHg</strong> is considered normal for most adults.
  Consistently high readings — a condition called <em>hypertension</em> — can
  damage arteries and raise the risk of heart disease, stroke, and kidney failure.
</p>

<div class="note">
  According to the World Health Organization, an estimated 1.28 billion adults
  aged 30–79 live with hypertension worldwide, and nearly half are unaware of
  their condition.
</div>

<h2>Risk Factors You Can Control</h2>

<p>
  While genetics and age play a role, many risk factors are within your power to
  change:
</p>

<ul>
  <li><strong>Diet</strong> — excess sodium, saturated fats, and processed foods</li>
  <li><strong>Physical inactivity</strong> — sedentary lifestyle increases arterial stiffness</li>
  <li><strong>Obesity</strong> — extra body weight forces the heart to work harder</li>
  <li><strong>Smoking</strong> — damages artery walls and narrows blood vessels</li>
  <li><strong>Alcohol</strong> — heavy drinking raises blood pressure over time</li>
  <li><strong>Stress</strong> — chronic stress triggers hormones that raise BP temporarily</li>
</ul>

<h2>Evidence-Based Lifestyle Changes</h2>

<h3>1. Adopt the DASH Diet</h3>

<p>
  The <em>Dietary Approaches to Stop Hypertension</em> (DASH) diet is the most
  well-studied eating pattern for blood pressure reduction. It emphasises:
</p>

<ol>
  <li>Fruits and vegetables (8–10 servings per day)</li>
  <li>Whole grains over refined carbohydrates</li>
  <li>Low-fat dairy products</li>
  <li>Lean proteins — fish, poultry, legumes</li>
  <li>Nuts and seeds (unsalted)</li>
  <li>Limiting sodium to under 2,300 mg per day</li>
</ol>

<blockquote>
  "The DASH diet can lower systolic blood pressure by 8–14 mmHg in people
  with high blood pressure — comparable to some medications."
  <cite>— New England Journal of Medicine, 2001</cite>
</blockquote>

<h3>2. Exercise Regularly</h3>

<p>
  Aerobic exercise is one of the most powerful tools for managing blood pressure.
  The American Heart Association recommends at least
  <strong>150 minutes of moderate-intensity activity per week</strong>.
</p>

<figure>
  <img
    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
    alt="Person jogging on a tree-lined path at sunrise"
    loading="lazy"
  />
  <figcaption>Regular aerobic exercise strengthens the heart muscle over time.</figcaption>
</figure>

<div class="tip">
  Even brisk walking for 30 minutes a day, five days a week, can lower systolic
  blood pressure by 4–9 mmHg on average.
</div>

<h3>3. Reduce Sodium Intake</h3>

<p>
  Most adults consume far more sodium than recommended. Hidden salt is found in:
</p>

<ul>
  <li>Bread and bakery products</li>
  <li>Canned soups and vegetables</li>
  <li>Deli meats and processed cheeses</li>
  <li>Restaurant meals and fast food</li>
</ul>

<p>
  Reducing daily sodium intake from 3,400 mg to under 2,300 mg can lower
  systolic BP by <strong>2–8 mmHg</strong>. For those over 50 or with existing
  hypertension, dropping to 1,500 mg delivers even greater benefit.
</p>

<h3>4. Manage Stress</h3>

<p>
  Chronic psychological stress activates the sympathetic nervous system and
  raises cortisol levels, both of which drive up blood pressure.
  Techniques shown to help include:
</p>

<ul>
  <li>Mindfulness meditation (20–30 min/day)</li>
  <li>Deep diaphragmatic breathing</li>
  <li>Progressive muscle relaxation</li>
  <li>Yoga and tai chi</li>
</ul>

<h3>5. Limit Alcohol</h3>

<p>
  Heavy alcohol use (more than 3 drinks per day) raises blood pressure and
  reduces the effectiveness of antihypertensive medications.
  Guidelines recommend no more than <strong>one drink per day</strong> for
  women and <strong>two for men</strong>.
</p>

<h2>When to Seek Medical Help</h2>

<div class="warning">
  A blood pressure reading above <strong>180/120 mmHg</strong> is a
  hypertensive crisis. Seek emergency medical care immediately if accompanied
  by chest pain, severe headache, vision changes, or difficulty breathing.
</div>

<p>
  If lifestyle changes alone do not bring blood pressure into the normal range
  within 3–6 months, your doctor may recommend medication alongside these habits.
  Common classes include ACE inhibitors, calcium channel blockers, and diuretics.
</p>

<h2>Monitoring Your Blood Pressure at Home</h2>

<p>
  Home monitoring gives a more accurate picture than occasional clinic readings,
  which can be inflated by "white-coat hypertension." Best practices include:
</p>

<ol>
  <li>Use a validated upper-arm cuff device</li>
  <li>Sit quietly for 5 minutes before measuring</li>
  <li>Take two readings, one minute apart, and record the average</li>
  <li>Measure at the same time each day (morning and evening are ideal)</li>
  <li>Share a log with your doctor at each visit</li>
</ol>

<div class="important">
  Wrist monitors and finger monitors are less accurate than upper-arm cuffs.
  Always confirm your device is validated by an independent body such as the
  British Hypertension Society.
</div>

<h2>Key Takeaways</h2>

<p>
  Lowering blood pressure through lifestyle modification is not a short-term
  fix — it requires <em>consistent, sustainable changes</em>. The good news is
  that even modest improvements in diet, exercise, and stress management can
  significantly reduce your cardiovascular risk and improve overall quality of
  life.
</p>
`;

/**
 * Mock author details shared across articles.
 */
export const MOCK_AUTHORS = {
  drPatel: {
    name: 'Dr. Priya Patel',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80',
  },
  drChen: {
    name: 'Dr. James Chen',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80',
  },
  sarahNutrition: {
    name: 'Sarah Mitchell, RD',
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80',
  },
};

/**
 * MOCK RELATED ARTICLES
 *
 * Used as a fallback when the real API returns no related articles.
 * IDs are arbitrary strings — replace with real _id values from the API.
 */
export const MOCK_RELATED_ARTICLES: RelatedArticleItem[] = [
  {
    id: 'mock-related-1',
    articleId: 1001,
    title: 'Understanding Cholesterol: Good, Bad, and What You Can Do',
    excerpt:
      'Learn the difference between HDL and LDL cholesterol and discover evidence-based strategies to improve your lipid profile naturally.',
    category: 'Heart Health',
    image:
      'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&q=80',
    imageAlt: 'Close-up of a heart-shaped bowl filled with fresh vegetables',
    readingTime: '6 min read',
    authorName: 'Dr. James Chen',
    recordId: '',
  },
  {
    id: 'mock-related-2',
    articleId: 1002,
    title: 'The DASH Diet: A Complete Beginner\'s Guide',
    excerpt:
      'A step-by-step guide to starting the Dietary Approaches to Stop Hypertension eating plan, including sample meal plans and shopping lists.',
    category: 'Nutrition',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
    imageAlt: 'Colourful salad bowl filled with leafy greens and vegetables',
    readingTime: '8 min read',
    authorName: 'Sarah Mitchell, RD',
    recordId: '',
  },
  {
    id: 'mock-related-3',
    articleId: 1003,
    title: 'Mindfulness and Heart Health: What the Science Says',
    excerpt:
      'New research suggests regular mindfulness meditation can lower systolic blood pressure by up to 5 mmHg. Here\'s how to get started.',
    category: 'Mental Wellness',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
    imageAlt: 'Person meditating outdoors in a peaceful natural setting',
    readingTime: '5 min read',
    authorName: 'Dr. Priya Patel',
    recordId: '',
  },
  {
    id: 'mock-related-4',
    articleId: 1004,
    title: '10 Heart-Healthy Foods Backed by Research',
    excerpt:
      'From fatty fish to dark leafy greens, these foods have strong clinical evidence behind their cardiovascular benefits.',
    category: 'Nutrition',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    imageAlt: 'Assortment of colourful healthy foods on a wooden table',
    readingTime: '7 min read',
    authorName: 'Sarah Mitchell, RD',
    recordId: '',
  },
  {
    id: 'mock-related-5',
    articleId: 1005,
    title: 'Exercise and Blood Pressure: How Much Is Enough?',
    excerpt:
      'Cardiologists explain the optimal type, duration, and intensity of exercise for hypertension management based on current guidelines.',
    category: 'Fitness',
    image:
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80',
    imageAlt: 'Person running on a scenic trail in the mountains',
    readingTime: '6 min read',
    authorName: 'Dr. James Chen',
    recordId: '',
  },
  {
    id: 'mock-related-6',
    articleId: 1006,
    title: 'Sleep and Hypertension: The Hidden Connection',
    excerpt:
      'Poor sleep quality is an under-recognised risk factor for high blood pressure. Learn how to optimise your sleep for cardiovascular health.',
    category: 'Sleep Health',
    image:
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80',
    imageAlt: 'Person sleeping peacefully in a dark, comfortable bedroom',
    readingTime: '5 min read',
    authorName: 'Dr. Priya Patel',
    recordId: '',
  },
];

/**
 * Utility: estimate reading time from raw HTML or plain text.
 * Strips HTML tags, counts words, assumes 200 WPM average reading speed.
 */
export const estimateReadingTime = (htmlContent: string): string => {
  const plainText = htmlContent
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const wordCount = plainText.split(' ').filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return minutes === 1 ? '1 min read' : `${minutes} min read`;
};
