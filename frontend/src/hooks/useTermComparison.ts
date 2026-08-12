import { useState } from 'react';

export type ComparisonField = {
  label: string;
  termA: string;
  termB: string;
};

export type ComparisonResult = {
  fields: ComparisonField[];
  loading: boolean;
  error: string | null;
};

const COMPARISON_FIELDS = [
  'Definition',
  'Symptoms',
  'Causes',
  'Risk Factors',
  'Diagnosis',
  'Treatment',
  'Prevention',
];

export function useTermComparison() {
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [fields, setFields]     = useState<ComparisonField[]>([]);

  const compare = async (termA: string, termB: string) => {
    if (!termA || !termB) return;

    setLoading(true);
    setError(null);
    setFields([]);

    try {
      const prompt = `
You are a medical educator. Compare these two health terms in a structured way.

Term A: ${termA}
Term B: ${termB}

Return a valid JSON array with exactly these 7 objects (one per field):
${COMPARISON_FIELDS.map(f => `{"label":"${f}","termA":"...","termB":"..."}`).join(',\n')}

Rules:
- Be concise (1-3 sentences per cell)
- If a field doesn't apply, write "Not applicable"
- Return ONLY the JSON array, no markdown, no extra text
`.trim();

      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
        }),
      });

      const json = await response.json();
      const raw  = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

      // Strip markdown code fences if present
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed: ComparisonField[] = JSON.parse(cleaned);

      setFields(parsed);
    } catch (e: any) {
      setError('Failed to generate comparison. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { fields, loading, error, compare };
}
