import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface TranscriptSegment {
  id: number;
  start: number; // in seconds
  end: number;   // in seconds
  text: string;
}

interface EpisodeNote {
  timestamp?: number;
  timeLabel?: string;
  title: string;
  description: string;
  type?: "takeaway" | "clinical" | "action";
}

// Pre-computed fallback clinical transcripts for default published podcasts
const CURATED_TRANSCRIPTS: Record<
  string,
  {
    title: string;
    transcript: string;
    notes: EpisodeNote[];
    segments: TranscriptSegment[];
  }
> = {
  // Alzheimer's Awareness
  "699fee097709fe91ed2ca995": {
    title: "Alzheimer’s Awareness",
    transcript:
      "Welcome to UltimateHealth Podcast. Today we are discussing Alzheimer’s awareness. Alzheimer’s disease is not simply everyday forgetfulness or normal aging. It is a progressive neurological disorder that gradually impairs synaptic connections, cognitive function, and daily living capabilities. Early warning signs include difficulty completing familiar tasks, disorientation to time and place, and noticeable changes in mood and personality. Supporting a family member through cognitive decline requires empathetic communication, structured daily routines, and timely clinical evaluations. Remember to consult a certified neurologist or geriatrician for accurate differential diagnosis and holistic care planning.",
    notes: [
      {
        timestamp: 0,
        timeLabel: "00:00",
        title: "Introduction to Cognitive Health",
        description: "Distinguishing normal age-related memory shifts from progressive neurodegenerative pathology.",
        type: "clinical",
      },
      {
        timestamp: 25,
        timeLabel: "00:25",
        title: "Key Early Indicators",
        description: "Disorientation to familiar spatial environments, executive function decline, and subtle language difficulties.",
        type: "takeaway",
      },
      {
        timestamp: 50,
        timeLabel: "00:50",
        title: "Caregiver & Family Support Strategies",
        description: "Structuring predictable daily routines, reducing sensory overstimulation, and adopting compassionate validation techniques.",
        type: "action",
      },
      {
        timestamp: 70,
        timeLabel: "01:10",
        title: "Clinical Consultation Milestones",
        description: "When to seek formalized neuropsychological testing, biomarker imaging, and supportive geriatric evaluation.",
        type: "clinical",
      },
    ],
    segments: [
      { id: 1, start: 0, end: 12, text: "Welcome to UltimateHealth Podcast. Today we are discussing Alzheimer’s awareness." },
      { id: 2, start: 12, end: 26, text: "Alzheimer’s disease is not simply everyday forgetfulness or normal aging." },
      { id: 3, start: 26, end: 42, text: "It is a progressive neurological disorder that gradually impairs synaptic connections, cognitive function, and daily living capabilities." },
      { id: 4, start: 42, end: 58, text: "Early warning signs include difficulty completing familiar tasks, disorientation to time and place, and noticeable changes in mood and personality." },
      { id: 5, start: 58, end: 72, text: "Supporting a family member through cognitive decline requires empathetic communication, structured daily routines, and timely clinical evaluations." },
      { id: 6, start: 72, end: 85, text: "Remember to consult a certified neurologist or geriatrician for accurate differential diagnosis and holistic care planning." },
    ],
  },
  // Power of Small Daily Rituals
  "699d9665962fdeac82d85270": {
    title: "Power of Small Daily Rituals",
    transcript:
      "Welcome to this episode on the power of small daily rituals. Lasting physiological and mental wellness is rarely built through sporadic, drastic lifestyle shifts. Instead, sustainable health is anchored in consistent micro-habits practiced daily. Beginning your morning with 10 minutes of direct sunlight exposure helps calibrate your suprachiasmatic nucleus, synchronizing cortisol and melatonin cycles. Pairing simple hydration with light mobility exercises lowers resting vascular resistance and primes cognitive clarity. Focus on friction reduction: make beneficial choices effortless and track small milestones rather than perfection.",
    notes: [
      {
        timestamp: 0,
        timeLabel: "00:00",
        title: "The Compounding Effect of Micro-Habits",
        description: "Why micro-interventions outperform drastic, unsustainable overhauls in long-term behavioral adherence.",
        type: "takeaway",
      },
      {
        timestamp: 30,
        timeLabel: "00:30",
        title: "Circadian Alignment & Morning Sunlight",
        description: "Activating retinal photoreceptors within 60 minutes of waking to anchor the circadian cortisol surge.",
        type: "clinical",
      },
      {
        timestamp: 65,
        timeLabel: "01:05",
        title: "Hydration & Endothelial Elasticity",
        description: "Rehydrating post-sleep with balanced electrolytes to mitigate early morning vascular stiffening.",
        type: "clinical",
      },
      {
        timestamp: 95,
        timeLabel: "01:35",
        title: "Friction Reduction Architecture",
        description: "Designing your home and work environment to make positive health decisions the path of least resistance.",
        type: "action",
      },
    ],
    segments: [
      { id: 1, start: 0, end: 15, text: "Welcome to this episode on the power of small daily rituals." },
      { id: 2, start: 15, end: 32, text: "Lasting physiological and mental wellness is rarely built through sporadic, drastic lifestyle shifts." },
      { id: 3, start: 32, end: 48, text: "Instead, sustainable health is anchored in consistent micro-habits practiced daily." },
      { id: 4, start: 48, end: 68, text: "Beginning your morning with 10 minutes of direct sunlight exposure helps calibrate your suprachiasmatic nucleus, synchronizing cortisol and melatonin cycles." },
      { id: 5, start: 68, end: 95, text: "Pairing simple hydration with light mobility exercises lowers resting vascular resistance and primes cognitive clarity." },
      { id: 6, start: 95, end: 124, text: "Focus on friction reduction: make beneficial choices effortless and track small milestones rather than perfection." },
    ],
  },
};

/**
 * Helper to build notes from transcript segments
 */
function buildNotesFromSegments(segments: TranscriptSegment[], overallText: string): EpisodeNote[] {
  if (!segments || segments.length === 0) {
    return [
      {
        timestamp: 0,
        timeLabel: "00:00",
        title: "Episode Overview",
        description: overallText.slice(0, 180) + (overallText.length > 180 ? "..." : ""),
        type: "takeaway",
      },
    ];
  }

  // Group into ~3-4 sensible notes based on time spacing
  const step = Math.max(1, Math.floor(segments.length / 4));
  const notes: EpisodeNote[] = [];

  for (let i = 0; i < segments.length; i += step) {
    const seg = segments[i];
    const mins = Math.floor(seg.start / 60);
    const secs = Math.floor(seg.start % 60);
    const timeLabel = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

    notes.push({
      timestamp: Math.round(seg.start),
      timeLabel,
      title: `Discussion Topic at ${timeLabel}`,
      description: seg.text.trim(),
      type: i === 0 ? "clinical" : i % 2 === 0 ? "takeaway" : "action",
    });
    if (notes.length >= 5) break;
  }

  return notes;
}

const MAX_AUDIO_FILE_SIZE = 25 * 1024 * 1024; // 25 MB max for Whisper API

const ALLOWED_AUDIO_HOSTS = new Set([
  "ultimatehealth.blog",
  "uhsocial.in",
  "soundhelix.com",
  "www.soundhelix.com",
]);

function isAllowedAudioUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
    const lower = parsed.hostname.toLowerCase();
    if (ALLOWED_AUDIO_HOSTS.has(lower)) return true;
    if (process.env.NODE_ENV === "development" && (lower === "localhost" || lower === "127.0.0.1")) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { audioUrl, podcastId, language } = body;

    const customKey = request.headers.get("x-groq-key");
    const groqApiKey = (customKey || process.env.GROQ_API_KEY || "").trim();

    // 1. If Groq API Key is available, transcribe via Groq Whisper API
    if (groqApiKey && audioUrl) {
      let resolvedAudio = String(audioUrl).trim();

      // If it's a proxy URL, extract raw target
      if (resolvedAudio.includes("/api/proxy-audio?url=")) {
        const u = new URL(resolvedAudio, "http://localhost:3000");
        resolvedAudio = decodeURIComponent(u.searchParams.get("url") || resolvedAudio);
      } else if (!resolvedAudio.startsWith("http")) {
        resolvedAudio = `https://ultimatehealth.blog/api/getFile/${resolvedAudio}`;
      }

      // Security: Validate target host to prevent SSRF and relay abuse
      if (!isAllowedAudioUrl(resolvedAudio)) {
        return NextResponse.json(
          { success: false, error: "Audio host is not permitted" },
          { status: 403 }
        );
      }

      // Download audio binary with size validation
      const audioRes = await fetch(resolvedAudio, { redirect: "error" });
      if (!audioRes.ok) {
        throw new Error(`Failed to download audio file: ${audioRes.statusText}`);
      }

      const contentLength = parseInt(audioRes.headers.get("content-length") || "0", 10);
      if (contentLength > MAX_AUDIO_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: "Audio file exceeds maximum 25MB limit" },
          { status: 413 }
        );
      }

      const audioBuffer = await audioRes.arrayBuffer();
      if (audioBuffer.byteLength > MAX_AUDIO_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: "Audio file exceeds maximum 25MB limit" },
          { status: 413 }
        );
      }
      const audioBlob = new Blob([audioBuffer], { type: "audio/mpeg" });

      const formData = new FormData();
      formData.append("file", audioBlob, "podcast.mp3");
      formData.append("model", "whisper-large-v3-turbo");
      formData.append("response_format", "verbose_json");
      if (language) {
        formData.append("language", language.split("-")[0]);
      }

      const groqRes = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: formData,
      });

      if (!groqRes.ok) {
        const errText = await groqRes.text();
        console.error("Groq Whisper API returned error:", groqRes.status, errText);
        throw new Error(`Groq API error (${groqRes.status}): ${errText}`);
      }

      const groqData = await groqRes.json();
      const rawSegments = Array.isArray(groqData.segments) ? groqData.segments : [];
      const segments: TranscriptSegment[] = rawSegments.map((s: any, idx: number) => ({
        id: idx + 1,
        start: Number(s.start || 0),
        end: Number(s.end || 0),
        text: String(s.text || "").trim(),
      }));

      const fullText = groqData.text || segments.map((s) => s.text).join(" ");
      const notes = buildNotesFromSegments(segments, fullText);

      return NextResponse.json({
        success: true,
        source: "groq-whisper",
        model: "whisper-large-v3-turbo",
        duration: groqData.duration || 0,
        transcript: fullText,
        segments,
        notes,
      });
    }

    // 2. If no key, check if we have pre-computed clinical transcript for this podcast ID
    if (podcastId && CURATED_TRANSCRIPTS[podcastId]) {
      const curated = CURATED_TRANSCRIPTS[podcastId];
      return NextResponse.json({
        success: true,
        source: "curated",
        transcript: curated.transcript,
        segments: curated.segments,
        notes: curated.notes,
        requiresGroqKey: false,
      });
    }

    // 3. Fallback for custom podcasts when no key is set
    return NextResponse.json({
      success: true,
      source: "demo",
      requiresGroqKey: true,
      transcript:
        "This episode's full audio transcript is ready to be transcribed using Groq's high-speed Whisper Large v3 model. Add your free GROQ_API_KEY in .env.local or enter it in the Transcription Settings to generate live sentence-level timestamps and executive clinical notes for this track.",
      notes: [
        {
          timestamp: 0,
          timeLabel: "00:00",
          title: "Full Notes & Transcription Ready",
          description: "Connect your free Groq API key to automatically extract verified sentence timestamps, medical terms, and clinical takeaways.",
          type: "action",
        },
      ],
      segments: [
        {
          id: 1,
          start: 0,
          end: 15,
          text: "Connect your free Groq API key to transcribe this audio in under 2 seconds.",
        },
      ],
    });
  } catch (error: any) {
    console.error("Transcribe API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Transcription Error" },
      { status: 500 }
    );
  }
}
